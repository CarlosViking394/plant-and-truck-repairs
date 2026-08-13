import { Star } from "lucide-react";
import Reveal from "./motion/Reveal";
import { reviews, GOOGLE_RATING } from "@/lib/reviews";
import { LINKS } from "@/lib/constants";

function Stars({ rating, className }: { rating: number; className?: string }) {
  return (
    <div className={`flex gap-0.5 ${className ?? ""}`} aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={`h-5 w-5 ${
            n <= rating ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"
          }`}
        />
      ))}
    </div>
  );
}

export default function ReviewsSection({ id }: { id?: string }) {
  return (
    <section id={id} className="py-20 md:py-28 px-4 bg-gradient-to-b from-gray-100 to-gray-50 relative overflow-clip">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>

      <div className="container mx-auto relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Section header with aggregate rating */}
          <Reveal className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              <span className="text-gray-800">What Operators </span>
              <span className="bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">Say</span>
            </h2>
            <div className="inline-flex items-center gap-4 bg-white rounded-2xl shadow-lg border border-gray-100 px-6 py-4">
              <span className="text-4xl sm:text-5xl font-bold text-gray-800 tabular-nums">
                {GOOGLE_RATING.average.toFixed(1)}
              </span>
              <div className="text-left">
                <Stars rating={Math.round(GOOGLE_RATING.average)} />
                <p className="text-sm text-gray-500 mt-1">
                  {GOOGLE_RATING.count} Google reviews
                </p>
              </div>
            </div>
          </Reveal>

          {/* Review cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review, i) => (
              <Reveal key={review.id} delay={i * 0.08} className="h-full">
                <figure className="h-full flex flex-col bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300">
                  <Stars rating={review.rating} className="mb-4" />
                  <blockquote className="text-gray-600 leading-relaxed flex-1">
                    &ldquo;{review.text}&rdquo;
                  </blockquote>
                  <figcaption className="mt-5 pt-4 border-t border-gray-100">
                    <span className="font-semibold text-gray-800">{review.author}</span>
                    <span className="block text-sm text-gray-500 mt-0.5">
                      {review.jobType ? `${review.jobType} · ` : ""}
                      {review.date}
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>

          {/* Link out to the profile */}
          <Reveal delay={0.2} className="text-center mt-10">
            <a
              href={LINKS.GOOGLE_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-semibold text-amber-700 hover:text-amber-800 underline underline-offset-4"
            >
              Read all reviews on Google
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
