#!/bin/bash
# scroll-world pipeline for M.P.T.R — architecture A (continuous forward take).
# bash 3.2 safe. Idempotent: every step skips outputs that already exist, so a
# crash or re-roll never repays for finished work. Delete a file to re-roll it.
#
# Usage:
#   ./pipeline.sh anchor      # generate ONE anchor still (site) for style approval
#   ./pipeline.sh stills      # batch the remaining stills (after anchor approval)
#   ./pipeline.sh legs        # sequential camera legs (VMODEL=seedance_2_0_mini for previz)
#   ./pipeline.sh encode      # scrub-friendly encodes -> public/scroll-world/vid
#   ./pipeline.sh posters     # extract posters from ENCODED clips (+ stills -> webp)
#   ./pipeline.sh seams       # SSIM seam gate (>=0.90 pass)
#   ./pipeline.sh mobile      # 720p -g4 mobile encodes + mobile posters
#   ./pipeline.sh status      # where the run stands

set -u
DIR="$(cd "$(dirname "$0")" && pwd)"
WORK="${WORK:-$DIR/work}"
ASSETS="$DIR/../public/scroll-world"
PROMPTS="$DIR/prompts"
mkdir -p "$WORK" "$ASSETS/vid"

NAMES="site callout fix finale"   # ordered section ids; finale carries the CTA

VMODEL="${VMODEL:-seedance_2_0}"
case "$VMODEL" in
  kling3_0)          VOPTS="--mode std --sound off";        LEG_DUR=10 ;;
  seedance_2_0_mini) VOPTS="--mode std --resolution 720p";  LEG_DUR=8  ;;
  *)                 VOPTS="--mode std --resolution 1080p"; LEG_DUR=8  ;;
esac

# --- stills (photoreal: NO --image style lock; cohesion comes from the preamble) ---
gen_still() { # name
  [ -s "$WORK/still_$1.png" ] && { echo "still $1 cached"; return 0; }
  higgsfield generate create gpt_image_2 --prompt "$(cat "$PROMPTS/still_$1.txt")" \
    --aspect_ratio 3:2 --resolution 2k --quality high --wait --wait-timeout 15m --json \
    > "$WORK/still_$1.json" 2> "$WORK/still_$1.err"
  url=$(jq -r '.[0].result_url // empty' "$WORK/still_$1.json")
  [ -n "$url" ] && curl -fsSL "$url" -o "$WORK/still_$1.png" && echo "still $1 ok" || echo "still $1 FAIL"
}

# --- legs: STRICTLY SEQUENTIAL; each starts from the previous leg's ACTUAL last frame ---
gen_leg() { # index startImage
  [ -s "$WORK/leg_$1.mp4" ] && { echo "leg $1 cached"; return 0; }
  higgsfield generate create "$VMODEL" --prompt "$(cat "$PROMPTS/leg_$1.txt")" \
    --start-image "$2" $VOPTS --aspect_ratio 16:9 --duration "$LEG_DUR" \
    --wait --wait-timeout 20m --json > "$WORK/leg_$1.json" 2> "$WORK/leg_$1.err"
  url=$(jq -r '.[0].result_url // empty' "$WORK/leg_$1.json")
  [ -n "$url" ] && curl -fsSL "$url" -o "$WORK/leg_$1.mp4" && echo "leg $1 ok" || { echo "leg $1 FAIL"; return 1; }
}
last_frame() { ffmpeg -v error -y -sseof -0.15 -i "$1" -frames:v 1 -q:v 2 "$2"; }

enc()  { ffmpeg -v error -y -i "$1" -an -vf "unsharp=5:5:0.8:5:5:0.0" \
  -c:v libx264 -preset slow -crf 20 -pix_fmt yuv420p \
  -g 8 -keyint_min 8 -sc_threshold 0 -movflags +faststart "$2"; echo "enc $2 $(du -h "$2"|cut -f1)"; }
encm() { ffmpeg -v error -y -i "$1" -an -vf "scale=-2:720,unsharp=5:5:0.6:5:5:0.0" \
  -c:v libx264 -preset slow -crf 23 -pix_fmt yuv420p \
  -g 4 -keyint_min 4 -sc_threshold 0 -movflags +faststart "$2"; echo "encm $2 $(du -h "$2"|cut -f1)"; }

seam_ssim() { # fileA fileB
  ffmpeg -v error -y -sseof -0.05 -i "$1" -frames:v 1 "$WORK/_sa.png"
  ffmpeg -v error -y -ss 0      -i "$2" -frames:v 1 "$WORK/_sb.png"
  ffmpeg -v info -i "$WORK/_sa.png" -i "$WORK/_sb.png" -lavfi ssim -f null - 2>&1 \
    | grep -o 'All:[0-9.]*' | cut -d: -f2
}

case "${1:-status}" in
  anchor)
    gen_still site ;;
  stills)
    [ -s "$WORK/still_site.png" ] || { echo "anchor (site) not approved/generated yet"; exit 1; }
    for n in $NAMES; do gen_still "$n" & done; wait ;;
  legs)
    # leg 0 starts from the site still; every later leg from the previous leg's last frame
    start="$WORK/still_site.png"
    i=0
    for n in $NAMES; do
      gen_leg "$i" "$start" || exit 1
      last_frame "$WORK/leg_$i.mp4" "$WORK/last_$i.png"
      echo ">> eyeball $WORK/last_$i.png before trusting leg $((i+1)) (should read as a calm forward glide)"
      start="$WORK/last_$i.png"
      i=$((i+1))
    done ;;
  encode)
    i=0; for n in $NAMES; do enc "$WORK/leg_$i.mp4" "$ASSETS/vid/$n.mp4"; i=$((i+1)); done ;;
  posters)
    for n in $NAMES; do
      ffmpeg -v error -y -ss 0 -i "$ASSETS/vid/$n.mp4" -frames:v 1 -q:v 2 "$WORK/poster_$n.png"
      cwebp -quiet -q 84 "$WORK/poster_$n.png" -o "$ASSETS/$n-poster.webp" 2>/dev/null \
        || sips -s format webp "$WORK/poster_$n.png" --out "$ASSETS/$n-poster.webp" >/dev/null
      cwebp -quiet -q 84 -resize 1800 0 "$WORK/still_$n.png" -o "$ASSETS/$n.webp" 2>/dev/null \
        || sips -s format webp -Z 1800 "$WORK/still_$n.png" --out "$ASSETS/$n.webp" >/dev/null
    done; echo "posters + stills -> $ASSETS" ;;
  seams)
    prev=""
    for n in $NAMES; do
      if [ -n "$prev" ]; then
        s=$(seam_ssim "$ASSETS/vid/$prev.mp4" "$ASSETS/vid/$n.mp4")
        awk -v s="${s:-0}" -v l="$prev>$n" 'BEGIN{
          if (s>=0.90) print "PASS  " l "  ssim=" s;
          else if (s>=0.75) print "WARN  " l "  ssim=" s " (eyeball the crossfade)";
          else print "FAIL  " l "  ssim=" s " — redo this leg handoff" }'
      fi; prev="$n"
    done ;;
  mobile)
    i=0; for n in $NAMES; do
      encm "$WORK/leg_$i.mp4" "$ASSETS/vid/$n-m.mp4"; i=$((i+1))
      ffmpeg -v error -y -ss 0 -i "$ASSETS/vid/$n-m.mp4" -frames:v 1 -q:v 2 "$WORK/poster_${n}_m.png"
      cwebp -quiet -q 84 "$WORK/poster_${n}_m.png" -o "$ASSETS/$n-poster-m.webp" 2>/dev/null \
        || sips -s format webp "$WORK/poster_${n}_m.png" --out "$ASSETS/$n-poster-m.webp" >/dev/null
    done ;;
  status)
    i=0; for n in $NAMES; do
      printf '%-8s still:%s leg%d:%s\n' "$n" \
        "$([ -s "$WORK/still_$n.png" ] && echo ok || echo --)" "$i" \
        "$([ -s "$WORK/leg_$i.mp4" ] && echo ok || echo --)"
      i=$((i+1))
    done ;;
  *) echo "unknown step: $1"; exit 1 ;;
esac
