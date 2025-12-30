import React from "react";
import { Sparkles } from "lucide-react";

// Terima 'step' sebagai props agar progress bar berfungsi
const Header = ({ step }) => {
  return (
    <header className="max-w-7xl mx-auto mb-6 md:mb-8 flex flex-col md:flex-row justify-between items-center bg-white p-5 md:p-6 rounded-3xl shadow-sm border border-slate-200 gap-4">
      {/* Bagian Logo & Judul */}
      <div className="text-center md:text-left">
        <h1 className="text-xl md:text-2xl font-black text-blue-600 flex items-center justify-center md:justify-start gap-2">
          <Sparkles className="fill-blue-600 w-5 h-5 md:w-6 md:h-6" />
          SIMAJAR (MODUL AJAR AI)
        </h1>
        <p className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">
          GPT-5 Powered Assistant
        </p>
      </div>

      {/* Progress Bar Responsive */}
      <div className="flex gap-1.5 md:gap-2 w-full md:w-auto justify-center">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
          <div
            key={i}
            className={`h-1.5 md:h-2 rounded-full transition-all duration-500 ${
              step >= i ? "bg-blue-600 w-4 md:w-8" : "bg-slate-100 w-2 md:w-6"
            }`}
            title={`Step ${i}`}
          />
        ))}
      </div>
    </header>
  );
};

export default Header;
