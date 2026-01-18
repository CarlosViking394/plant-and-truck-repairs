import Link from 'next/link';
import { CONTACT } from '@/lib/constants';

export const metadata = {
  title: "Booking Confirmed | M.P.T.R Mobile Plant & Truck Repairs",
  description: "Thank you for booking with M.P.T.R Mobile Plant & Truck Repairs. We'll confirm your appointment shortly.",
};

// Golden ratio spacing: 8, 13, 21, 34, 55, 89, 144
// φ ≈ 1.618

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-start justify-center px-5 pt-36 pb-24 md:pt-44 md:pb-36">
      <div className="max-w-xl w-full">
        {/* Success Card */}
        <div className="bg-white rounded-3xl shadow-2xl px-8 py-14 md:px-14 md:py-20 text-center border border-gray-200">
          {/* Green Checkmark - 89px container, 55px icon */}
          <div className="mb-8 flex justify-center">
            <div className="bg-gradient-to-br from-green-100 to-green-50 p-5 md:p-6 rounded-full shadow-lg shadow-green-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-14 w-14 md:h-16 md:w-16 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          {/* Heading - mb-5 (21px) */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-5">
            Booking Confirmed!
          </h1>

          {/* Description - mb-8 (34px) */}
          <p className="text-gray-600 mb-10 text-lg md:text-xl leading-relaxed max-w-md mx-auto">
            Thank you for choosing M.P.T.R Mobile Plant & Truck Repairs. We&apos;ve received your booking request.
          </p>

          {/* What Happens Next Section - p-8 (34px), mb-10 (55px) */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 md:p-8 mb-10 text-left border border-gray-200">
            <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-6 flex items-center">
              <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              What happens next?
            </h2>
            {/* List item spacing - 21px */}
            <ol className="space-y-5">
              <li className="flex items-start">
                <span className="flex-shrink-0 w-9 h-9 bg-gradient-to-br from-amber-500 to-amber-600 text-white rounded-full flex items-center justify-center font-bold text-sm mr-4 shadow-md">
                  1
                </span>
                <div className="pt-1">
                  <p className="font-semibold text-gray-800 text-base md:text-lg">We review your request</p>
                  <p className="text-sm md:text-base text-gray-600 mt-1">Our team will check your booking details and service requirements.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-9 h-9 bg-gradient-to-br from-amber-500 to-amber-600 text-white rounded-full flex items-center justify-center font-bold text-sm mr-4 shadow-md">
                  2
                </span>
                <div className="pt-1">
                  <p className="font-semibold text-gray-800 text-base md:text-lg">We call to confirm</p>
                  <p className="text-sm md:text-base text-gray-600 mt-1">You&apos;ll receive a call to confirm the appointment time and discuss any details.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-9 h-9 bg-gradient-to-br from-amber-500 to-amber-600 text-white rounded-full flex items-center justify-center font-bold text-sm mr-4 shadow-md">
                  3
                </span>
                <div className="pt-1">
                  <p className="font-semibold text-gray-800 text-base md:text-lg">Our mechanic arrives</p>
                  <p className="text-sm md:text-base text-gray-600 mt-1">A qualified mobile mechanic will arrive at your location at the scheduled time.</p>
                </div>
              </li>
            </ol>
          </div>

          {/* Action Buttons - py-4 (13px+), px-8 (34px) */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/"
              className="flex-1 inline-flex items-center justify-center gap-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-4 px-8 rounded-xl transition-all duration-300 border border-gray-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Back to Home
            </Link>

            <a
              href={`tel:${CONTACT.PHONE}`}
              className="flex-1 inline-flex items-center justify-center gap-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:-translate-y-0.5"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call {CONTACT.PHONE_DISPLAY}
            </a>
          </div>
        </div>

        {/* Additional Info - mt-8 (34px) */}
        <p className="text-center text-gray-500 text-base mt-8">
          Questions? Call us at{' '}
          <a href={`tel:${CONTACT.PHONE}`} className="text-amber-600 hover:text-amber-700 font-semibold">
            {CONTACT.PHONE_DISPLAY}
          </a>
        </p>
      </div>
    </div>
  );
}
