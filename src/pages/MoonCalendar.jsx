/**

 * Displays a dynamic monthly calendar with:
 * - Moon phase and illumination for each day
 * - Localized month title and weekdays
 * - Navigation between months
 *
 * Uses:
 * - SunCalc for moon illumination and phase
 * - react-i18next for translation
 * - Responsive styles and animated moon visuals
 */

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import SunCalc from "suncalc";
import "../styles/calendar.css";

function MoonCalendar() {
  const { i18n, t } = useTranslation();

  // Holds the current calendar view date (month/year)
  const [currentDate, setCurrentDate] = useState(new Date());

  // Stores list of days (each with moon data or null for padding)
  const [days, setDays] = useState([]);

  /**
   * Whenever the month changes, regenerate the calendar data
   */
  useEffect(() => {
    generateCalendar(currentDate);
  }, [currentDate]);

  /**
   * Generates day objects with moon data:
   * - Adds padding days for alignment
   * - For each real day, calculates illumination & phase
   */
  const generateCalendar = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    const calendarDays = [];

    // Padding for first row (empty slots before 1st of the month)
    for (let i = 0; i < firstDay; i++) calendarDays.push(null);

    // Loop through actual days of the month
    for (let d = 1; d <= totalDays; d++) {
      const sampleTime = new Date(year, month, d, 12); // midday sample
      const moon = SunCalc.getMoonIllumination(sampleTime);

      calendarDays.push({
        day: d,
        illumination: +(moon.fraction * 100).toFixed(1),
        phase: moon.phase,
      });
    }

    setDays(calendarDays);
  };

  /**
   * Maps moon illumination and phase to phase name using translations
   */
  const getPhaseName = (illum, phase) => {
    if (illum <= 1) return t("phasesName.new");
    if (illum >= 99) return t("phasesName.full");

    if (illum >= 49 && illum <= 51)
      return phase < 0.5
        ? t("phasesName.firstQuarter")
        : t("phasesName.lastQuarter");

    if (phase < 0.5)
      return illum < 50
        ? t("phasesName.waxingCrescent")
        : t("phasesName.waxingGibbous");

    return illum < 50
      ? t("phasesName.waningCrescent")
      : t("phasesName.waningGibbous");
  };

  // Moon image used as base for overlay (can be dynamic later)
  const getMoonImage = () => "/moon-images/fullmoon.png";

  const monthName = currentDate.toLocaleString(i18n.language, { month: "long" });
  const year = currentDate.getFullYear();
  const today = new Date();

  return (
    <main className="min-h-screen px-4 py-12 max-w-6xl mx-auto text-white">
      
      {/* Localized title with current month/year */}
      <h2 className="text-lg sm:text-4xl font-bold mb-4 text-yellow-300 text-center">
        {t("moonCalendarTitle", { month: monthName, year })}
      </h2>

      {/* Main calendar grid */}
      <div className="bg-black/30 p-2 sm:p-4 rounded-xl border border-purple-500/30 shadow-lg">
        <div className="grid grid-cols-7 gap-1 sm:gap-2">

          {/* Weekday names (translated) */}
          {t("weekdays", { returnObjects: true }).map((day, idx) => (
            <div key={idx} className="text-center font-bold text-purple-300 text-xs sm:text-sm">
              {day}
            </div>
          ))}

          {/* Calendar day blocks (with moon phase per day) */}
          {days.map((day, idx) => {
            if (!day) return <div key={idx} />;

            const isToday =
              day.day === today.getDate() &&
              currentDate.getMonth() === today.getMonth() &&
              currentDate.getFullYear() === today.getFullYear();

            const { illumination, phase } = day;
            const darkPercent = 100 - illumination;

            return (
              <div
                key={idx}
                className={`w-full aspect-square p-1 sm:p-2 cursor-pointer rounded-lg flex flex-col items-center justify-start border transition-all duration-300 ${
                  isToday
                    ? 'bg-purple-800/50 border-purple-400 scale-105'
                    : 'bg-black/30 border-purple-500/20 hover:bg-purple-600/30 hover:scale-105'
                }`}
              >
                {/* Day number */}
                <div className="text-base sm:text-lg font-bold mb-1 sm:mb-2">
                  {day.day}
                </div>

                {/* Moon image + shadow overlay to simulate illumination */}
                <div className="relative w-8 h-8 sm:w-12 sm:h-12 rounded-full overflow-hidden mb-1 sm:mb-2">
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `url(${getMoonImage()})`,
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: 'cover',
                      transform: 'scale(1.8)',
                      transformOrigin: 'center center',
                    }}
                  />
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      backgroundColor: 'rgba(0,0,0,0.7)',
                      clipPath: `ellipse(${darkPercent}% 100% at ${
                        phase < 0.5 ? '0% 50%' : '100% 50%'
                      })`,
                    }}
                  />
                </div>

                {/* Phase name */}
                <div className="text-[4px] sm:text-xs text-gray-300 capitalize">
                  {getPhaseName(illumination, phase)}
                </div>

                {/* Illumination percentage */}
                <div className="text-[4px] sm:text-xs mt-1 text-yellow-300">
                  {t("illumination", { percent: illumination })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Month navigation buttons */}
      <div className="mt-6 flex justify-between text-sm sm:text-base">
        <button
          onClick={() => setCurrentDate(new Date(year, currentDate.getMonth() - 1, 1))}
          className="text-purple-300 hover:text-purple-500"
        >
          ◀ {t("prevMonth")}
        </button>
        <button
          onClick={() => setCurrentDate(new Date(year, currentDate.getMonth() + 1, 1))}
          className="text-purple-300 hover:text-purple-500"
        >
          {t("nextMonth")} ▶
        </button>
      </div>
    </main>
  );
}

export default MoonCalendar;
