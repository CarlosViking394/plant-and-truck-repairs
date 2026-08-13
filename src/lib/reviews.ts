/**
 * Google reviews shown in the social-proof section.
 *
 * PLACEHOLDER DATA — replace each entry with real reviews copied from the
 * Google Business Profile, and update GOOGLE_RATING to match the live
 * average and count. Keep review text verbatim from Google.
 */
export interface GoogleReview {
  id: string;
  author: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  /** Month + year as shown on Google, e.g. "July 2026" */
  date: string;
  /** Optional short label for the kind of job, e.g. "Excavator repair" */
  jobType?: string;
}

export const GOOGLE_RATING = {
  average: 5.0, // TODO: set to the real profile average
  count: 12, // TODO: set to the real review count
} as const;

export const reviews: GoogleReview[] = [
  {
    id: "placeholder-1",
    author: "Sample Customer",
    rating: 5,
    text: "PLACEHOLDER — copy a real Google review here. Fast response, had our excavator back running the same day.",
    date: "July 2026",
    jobType: "Excavator repair",
  },
  {
    id: "placeholder-2",
    author: "Sample Customer",
    rating: 5,
    text: "PLACEHOLDER — copy a real Google review here. Turned up on site within the hour and sorted the truck's electrical fault.",
    date: "June 2026",
    jobType: "Auto electrical",
  },
  {
    id: "placeholder-3",
    author: "Sample Customer",
    rating: 5,
    text: "PLACEHOLDER — copy a real Google review here. Honest, knows his stuff, and doesn't muck around. Our go-to mechanic now.",
    date: "May 2026",
    jobType: "Truck servicing",
  },
];
