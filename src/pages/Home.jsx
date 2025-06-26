/**
 
 * Homepage component that shows:
 * - A glowing full moon image
 * - The date of the next full moon
 * - Number of days remaining until the full moon
 * - A button to navigate to the moon calendar
 *
 * It uses SunCalc to calculate moon phases,
 * and react-i18next for translation.
 */

import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SunCalc from "suncalc";
import "../styles/animations.css";

export default function Home() {
  const { t } = useTranslation();

  // Stores the date of the next full moon
  const [nextFullMoonDate, setNextFullMoonDate] = useState(null);

  // Stores number of days remaining until next full moon
  const [daysUntilFullMoon, setDaysUntilFullMoon] = useState(0);

  /**
   * Runs once on mount:
   * - Loops through next 60 days
   * - Finds the date closest to full moon (phase ≈ 0.5)
   * - Updates state with date and day difference
   */
  useEffect(() => {
    const now = new Date();

    let found = null;
    for (let d = 0; d < 60; d++) {
      const date = new Date(now);
      date.setDate(now.getDate() + d);

      const { phase } = SunCalc.getMoonIllumination(date);

      if (Math.abs(phase - 0.5) < 0.02) {
        found = date;
        break;
      }
    }

    if (found) {
      setNextFullMoonDate(found);

      const diff = found - now;
      const daysLeft = Math.ceil(diff / (1000 * 60 * 60 * 24));
      setDaysUntilFullMoon(Math.max(0, daysLeft));
    }
  }, []);

  // Format the full moon date for display, only if it's been calculated
  const formattedDate = nextFullMoonDate
    ? nextFullMoonDate.toLocaleDateString(undefined, {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "...";

  return (
    <div className="relative min-h-screen bg-midnight-blue overflow-hidden">
      
      {/* Animated star background (assumes custom CSS exists) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="stars"></div>
      </div>

      {/* Main content: moon + text */}
      <main className="relative z-10 flex flex-col md:flex-row items-center justify-center py-16 px-4 gap-12">
        
        {/* Glowing full moon image */}
        <div className="moon-glow w-64 sm:w-80 md:w-96 lg:w-[400px]">
          <img
            src="/moon-images/fullmoon.png"
            alt="Full Moon"
            className="w-full rounded-full"
          />
        </div>

        {/* Text info and CTA button */}
        <div className="text-center md:text-left space-y-4 max-w-md">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            {t("nextFullMoon")}
          </h1>
          <p className="text-2xl text-yellow-300">
            {formattedDate}
          </p>
          <p className="text-lg text-gray-300">
            {t("description")}{" "}
            <span className="text-yellow-400 font-semibold">
              {daysUntilFullMoon}
            </span>{" "}
            {t("days")}
          </p>

          {/* CTA to open calendar */}
          <Link
            to="/calendar"
            className="inline-block mt-4 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full transition-transform transform hover:scale-105"
          >
            {t("track")}
          </Link>
        </div>
      </main>
    </div>
  );
}
