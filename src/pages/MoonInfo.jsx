/**
 
 * A detailed information page for all 8 moon phases.
 * - Slideshow of moon phase images with emojis, descriptions, and info
 * - Dynamic text in multiple languages using i18next
 * - History, spiritual meaning, astronomical facts for each phase
 * - Expandable Q&A section per phase
 */

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/animations.css';
import { BsMoon, BsMoonFill } from 'react-icons/bs';

export default function MoonInfo() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  // All 8 moon phases with associated image paths
  const phases = [
    { key: 'newMoon', image: '/moon-phases/newMoonp.png' },
    { key: 'waxingCrescent', image: '/moon-phases/Waningcres.png' },
    { key: 'firstQuarter', image: '/moon-phases/last_quarte.png' },
    { key: 'waxingGibbous', image: '/moon-phases/WaxingGibbous.png' },
    { key: 'fullMoon', image: '/moon-phases/fullmoon.png' },
    { key: 'waningGibbous', image: '/moon-phases/WaningGibbous.png' },
    { key: 'lastQuarter', image: '/moon-phases/lstquarter.png' },
    { key: 'waningCrescent', image: '/moon-phases/WaxingCrescent.png' },
  ];

  const [current, setCurrent] = useState(0);              // current slide index
  const [openMap, setOpenMap] = useState({});             // manages open Q&A per phase
  const length = phases.length;
  const phaseKey = phases[current].key;                   // current phase key

  // Navigate slider
  const prevSlide = () => setCurrent(current === 0 ? length - 1 : current - 1);
  const nextSlide = () => setCurrent(current === length - 1 ? 0 : current + 1);

  // Get current FAQs array for the selected phase
  const faqs = t(`moonInfo.phases.${phaseKey}.faqs`, { returnObjects: true });

  return (
    <div className="px-4 py-12 max-w-4xl mx-auto">
      
      {/* Title with emoji and localized phase name */}
      <h2 className="text-3xl font-bold text-center text-white mb-6">
        {t(`moonInfo.phases.${phaseKey}.emoji`)}{' '}
        {t(`moonInfo.phases.${phaseKey}.name`)}
      </h2>

      {/* Image slider */}
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {phases.map(({ key, image }) => (
            <div
              key={key}
              className="w-full flex-shrink-0 flex flex-col items-center text-center px-4"
            >
              <img
                src={image}
                alt={t(`moonInfo.phases.${key}.name`)}
                className="w-32 h-32 sm:w-48 sm:h-48 object-contain mb-4"
              />
              <p className="text-gray-300 text-sm sm:text-base">
                {t(`moonInfo.phases.${key}.desc`)}
              </p>
              <p className="text-gray-200 text-xs sm:text-sm mt-2">
                {t(`moonInfo.phases.${key}.info`)}
              </p>
            </div>
          ))}
        </div>

        {/* Navigation arrows */}
        <button
          onClick={prevSlide}
          aria-label={t('moonInfo.prev')}
          className="absolute top-1/2 left-2 transform -translate-y-1/2 text-white text-2xl"
        >
          ‹
        </button>
        <button
          onClick={nextSlide}
          aria-label={t('moonInfo.next')}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 text-white text-2xl"
        >
          ›
        </button>
      </div>

      {/* Emoji dots navigation */}
      <div className="flex justify-center items-center space-x-2 mt-4">
        {phases.map((p, idx) => (
          <button
            key={p.key}
            onClick={() => setCurrent(idx)}
            className={`text-2xl focus:outline-none transition-transform duration-200 ${
              idx === current ? 'scale-125 text-yellow-300' : 'text-gray-500'
            }`}
          >
            {t(`moonInfo.phases.${p.key}.emoji`)}
          </button>
        ))}
      </div>

      {/* Phase details: history, spiritual, astronomy, Q&A */}
      <div
        className={`mt-8 space-y-8 text-white ${
          currentLang === 'ar' ? 'text-right' : 'text-left'
        }`}
      >
        <section>
          <h3 className="text-2xl font-semibold mb-2">
            {t('moonInfo.history')}
          </h3>
          <p className="text-gray-300">
            {t(`moonInfo.phases.${phaseKey}.history`)}
          </p>
        </section>

        <section>
          <h3 className="text-2xl font-semibold mb-2">
            {t('moonInfo.spiritual')}
          </h3>
          <p className="text-gray-300">
            {t(`moonInfo.phases.${phaseKey}.spiritual`)}
          </p>
        </section>

        <section>
          <h3 className="text-2xl font-semibold mb-2">
            {t('moonInfo.astronomy')}
          </h3>
          <p className="text-gray-300">
            {t(`moonInfo.phases.${phaseKey}.astronomy`)}
          </p>
        </section>

        {/* Expandable FAQ section */}
        <section>
          <h3 className="text-2xl font-semibold mb-4">
            {t('moonInfo.qna')}
          </h3>
          <div className="space-y-4">
            {faqs.map((item, idx) => (
              <div key={idx}>
                <button
                  onClick={() =>
                    setOpenMap(prev => {
                      const openIdx = prev[phaseKey] === idx ? null : idx;
                      return { ...prev, [phaseKey]: openIdx };
                    })
                  }
                  className={`w-full ${
                    currentLang === 'ar' ? 'text-right' : 'text-left'
                  } text-lg text-yellow-300 hover:underline`}
                >
                  {item.q}
                </button>
                <div
                  className={`accordion-content ${
                    openMap[phaseKey] === idx ? 'open' : ''
                  }`}
                >
                  <p className="mt-1 text-gray-300">{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
