/**
 * Creates a fixed, full-screen animated starfield using absolutely positioned divs.
 * Each star has randomized position, size, color, drift direction, and animation timing.
 * This background can be imported and used on any page (e.g., the homepage).
 */

import { useState } from "react";

const NUM_STARS = 80;

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

export default function AnimatedBackground() {
  const [stars] = useState(() =>
    Array.from({ length: NUM_STARS }).map(() => ({
      xPct: getRandom(0, 100),
      yPct: getRandom(0, 100),
      driftX: `${getRandom(-80, 80)}px`,
      driftY: `${getRandom(-80, 80)}px`,
      size: getRandom(1.5, 4),
      color: ["gold", "silver", "white"][Math.floor(getRandom(0, 3))],
      delay: getRandom(0, 5),
      duration: getRandom(8, 12),
    }))
  );

  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden"
      style={{
        background: `linear-gradient(to bottom, hsl(240,60%,8%), hsl(260,40%,12%))`,
      }}
    >
      <div className="absolute inset-0 bg-black/30 pointer-events-none" />

      {stars.map((s, i) => (
        <div
          key={i}
          className="absolute rounded-full will-change-transform"
          style={{
            left: `${s.xPct}%`,
            top: `${s.yPct}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            backgroundColor: s.color,
            boxShadow: `0 0 ${s.size * 2}px ${s.color}`,
            "--drift-x": s.driftX,
            "--drift-y": s.driftY,
            animation: `drift ${s.duration}s ease-in-out ${s.delay}s infinite alternate`,
          }}
        />
      ))}
    </div>
  );
}
