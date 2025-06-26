/**

 * Renders a responsive footer with:
 * - Language switch buttons (EN / AR)
 * - Localized copyright text
 * - Contact icons (GitHub & LinkedIn)
 * 
 * It uses `react-i18next` for translation and reads the current language.
 */

import { useTranslation } from "react-i18next";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  // Get translation function `t` and current language from i18n instance
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  // Function to change language between "en" and "ar"
  const switchLang = (lng) => i18n.changeLanguage(lng);

  // Get the current year (for dynamic copyright)
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black/30 backdrop-blur-sm text-purple-100 text-[10px] sm:text-xs px-4 py-2 sm:py-3">
      <div className="max-w-6xl mx-auto flex items-center">
        
        {/* LANGUAGE SWITCH: Buttons to toggle between EN and AR */}
        <div className="flex gap-2 text-[8px] sm:text-xs mr-4">
          <button
            onClick={() => switchLang("en")}
            className={`transition ${
              lang === "en"
                ? "font-semibold text-white" // Active language style
                : "opacity-60 hover:opacity-100 text-purple-300"
            }`}
          >
            EN
          </button>
          <button
            onClick={() => switchLang("ar")}
            className={`transition ${
              lang === "ar"
                ? "font-semibold text-white"
                : "opacity-60 hover:opacity-100 text-purple-300"
            }`}
          >
            AR
          </button>
        </div>

        {/* TRANSLATED TEXT: Centered footer message (e.g., "© 2025 YourSite") */}
        <div className="flex-1 text-center">
          {t("footer", { year })}
        </div>

        {/* SOCIAL ICONS: GitHub and LinkedIn contact links */}
        <div className="flex items-center gap-3 ml-4">
          <span className="hidden sm:inline text-xs">
            {t("contact")} {/* Translates "Contact" or equivalent */}
          </span>
          <a
            href="https://github.com/Maram-Qais"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-lg sm:text-2xl hover:text-white transition"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/maramqais/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-lg sm:text-2xl hover:text-white transition"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
}
