# scroll-world hero — M.P.T.R

Scroll-scrubbed continuous camera flight (scroll-world skill, architecture A:
one forward take, frame-locked seams). Interview outcomes (2026-08-13):

- **Budget**: Showcase envelope approved (~17–22 gens ceiling); executed as the
  approved 4-beat journey + previz pass + re-roll buffer (~12–16 gens actual).
- **Art direction**: cinematic photoreal Aussie job sites (style preamble is
  byte-identical across every prompt in `prompts/` — do not vary it per scene).
- **Journey**: site (dead excavator at dawn) → callout (M.P.T.R ute on the
  highway) → fix (engine bay, on-site repair) → finale (machine back at work,
  Call CTA).
- **Mobile tier**: mobile encodes (720p `-g 4` siblings + posters, no extra credits).
- **Video model**: `seedance_2_0` final; `seedance_2_0_mini` previz.

## Run order (after `higgsfield auth login`)

```bash
cd scroll-world
./pipeline.sh anchor    # 1 gen — STOP: show work/still_site.png to Carlos/Callum
./pipeline.sh stills    # batch remaining 3 after anchor approval
VMODEL=seedance_2_0_mini ./pipeline.sh legs    # previz chain (4 gens, sequential)
./pipeline.sh encode && ./pipeline.sh posters && ./pipeline.sh seams
# review the assembled page from previz clips, then:
rm -f work/leg_*.mp4 work/last_*.png
./pipeline.sh legs      # final chain on seedance_2_0 (4 gens, sequential)
./pipeline.sh encode && ./pipeline.sh posters && ./pipeline.sh seams && ./pipeline.sh mobile
```

Gotchas: legs are strictly sequential (each starts from the previous leg's actual
last frame); eyeball each `work/last_<i>.png` before the next leg; the engine-bay
scene (`fix`) is the NSFW-filter risk — re-roll up to 3×, then strip trigger words,
then `VMODEL=kling3_0` for that one leg. Full doctrine: the scroll-world SKILL.md.

## Wiring

`src/components/ScrollWorldHero.tsx` mounts `src/lib/scroll-world/scrub-engine.js`
with the section copy + asset paths (`public/scroll-world/`). Once assets exist and
seams pass, replace `<Hero …/>` in `src/app/page.tsx` with `<ScrollWorldHero />`
(keep the rest of the page below it).

`work/` is gitignored (raw gens, boundary frames); the encoded webp/mp4 under
`public/scroll-world/` are committed.
