import React from 'react';
import { useLocation } from '@/context/LocationContext';

export default function FoundersLetter() {
  const { location } = useLocation();
  const locationName = location?.placeName ? location.placeName.split(',')[0] : '🇮🇳 India';

  return (
    <section className="section bg-[#f8fafc] py-16 md:py-32 px-4 md:px-5">
      <div className="container flex justify-center mx-auto">

        <div className="card w-full max-w-[700px] p-8 md:p-14 bg-white text-left border border-gray-200 shadow-xl rounded-2xl">

          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Greetings to you,
          </h3>
          <p className="text-gray-600 text-lg mb-8">
            wanderer from {locationName}.
          </p>

          <div className="flex flex-col gap-5 text-gray-600 text-base leading-relaxed">
            <p>
              Every mobile user should have access to transparent network data. It's essential.
            </p>
            <p>
              But it's not always easy to find the truth. For us, it was either relying on biased marketing, or using overly complex technical tools. That's why we've cherry-picked the most important performance metrics and carefully crafted them into <strong>one minimalistic tool</strong>, Best SIM.
            </p>
            <p>
              Think of <strong className="text-gray-900">Speedtest.net</strong>, but actually localized and actionable.<br />
              A tool you'll actually use before buying your next SIM card.
            </p>
            <p>
              If you're interested in trying out our platform but not sure where to start, feel free to explore the interactive map or reach out to us via <a href="#" className="text-cyan-500 no-underline hover:underline">twitter</a> or <a href="#" className="text-cyan-500 no-underline hover:underline">email</a>.
            </p>
            <p>
              Looking forward to having you on board!
            </p>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-gray-600 mb-2 text-base">Gratefully,</p>

            {/* Signature Simulation */}
            <div className="text-3xl md:text-4xl text-gray-900 mb-6 tracking-tight" style={{ fontFamily: '"Caveat", "Dancing Script", cursive' }}>
              The Team <span className="text-lg md:text-xl text-gray-500 ml-2" style={{ fontFamily: 'var(--font-inter)' }}>from Best SIM</span>
            </div>

            <p className="text-gray-400 text-sm">
              P.S. Best SIM is completely <span className="text-cyan-500">free</span> to use.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
