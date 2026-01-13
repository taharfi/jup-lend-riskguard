interface WhatIfSliderProps {
  disabled?: boolean;
}

export default function WhatIfSlider({ disabled }: WhatIfSliderProps) {
  return (
    <div
      className={`rounded-xl p-6 border border-white/10 ${
        disabled ? "opacity-50 pointer-events-none" : ""
      }`}
    >
      <p className="text-sm font-semibold mb-2">
        What-if Simulation
      </p>

      {/* Example slider – keep or replace with your real sliders */}
      <input
        type="range"
        min={0}
        max={100}
        disabled={disabled}
        className="w-full"
      />
    </div>
  );
}
