import React from 'react';
import DishcoveryLogo from './DishcoveryLogo';

export default function DarkCtaBanner({ onGetAppClick, onBrowserClick }) {
  return (
    <section id="kitchen" className="px-6 sm:px-12 lg:px-[72px] py-16 sm:py-24 flex justify-center bg-white">
      <div className="w-full max-w-[1160px] bg-[#1E1E1E] rounded-[28px] p-8 sm:p-14 lg:p-[60px] flex items-center justify-between gap-12 flex-wrap shadow-2xl">
        
        {/* Left Column */}
        <div className="flex-1 min-w-[300px] max-w-[460px] flex flex-col gap-5 items-start">
          <DishcoveryLogo variant="lg" className="self-start" />
          
          <p className="margin-0 text-[16px] sm:text-[17px] leading-[1.6] text-[#B9BEB4]">
            Free while we’re in beta. Bring a full cupboard and an empty plan.
          </p>

          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            <button
              onClick={onGetAppClick}
              className="bg-[#7DBE4A] hover:bg-[#6ba63d] text-white text-[15px] font-semibold px-[30px] py-[15px] rounded-full shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              Get the app
            </button>
            <button
              onClick={onBrowserClick}
              className="border-[1.5px] border-[#4A4A46] text-white hover:bg-white/10 text-[15px] font-semibold px-[28px] py-[14px] rounded-full transition-all cursor-pointer"
            >
              Use it in the browser
            </button>
          </div>
        </div>

        {/* Right Column: Circular Plated Dish Image */}
        <div className="flex-none w-full sm:w-auto flex justify-center">
          <div className="w-[220px] h-[220px] sm:w-[260px] sm:h-[260px] rounded-full border-[8px] sm:border-[10px] border-[#7DBE4A] box-border overflow-hidden bg-white shadow-2xl">
            <img 
              src="/images/cta-dish.jpg" 
              alt="Plated dish close up" 
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
