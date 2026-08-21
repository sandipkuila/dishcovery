import React from 'react';
import { Mic, ArrowRight } from 'lucide-react';

export default function HeroSection({ onHandsFreeClick, onHowItWorksClick }) {
  return (
    <section className="relative overflow-hidden pb-12 sm:pb-20 pt-0 bg-white">
      {/* Background Decorative Circles */}
      <div 
        className="absolute -top-[300px] -right-[160px] w-[600px] h-[600px] sm:w-[760px] sm:h-[760px] rounded-full bg-[#7DBE4A] z-0 pointer-events-none"
      />
      <div 
        className="absolute top-[300px] right-[90px] w-[180px] h-[180px] sm:w-[210px] sm:h-[210px] rounded-full bg-[#EAF3DF] z-0 pointer-events-none"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 lg:px-[72px] pt-8 sm:pt-14 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-10">
        
        {/* Left Column: Copy & Actions */}
        <div className="flex-1 flex flex-col gap-6 items-flex-start text-left max-w-xl">
          <div className="inline-flex self-start bg-white border border-[#E6EAE2] rounded-full px-4 py-2 text-[13px] font-medium text-[#5B615A] shadow-sm">
            Nothing to cook?
          </div>
          
          <h1 className="margin-0 text-[42px] sm:text-[54px] lg:text-[62px] font-extrabold leading-[1.04] tracking-tight uppercase text-[#1E1E1E]">
            Dinner is already <br /> in your kitchen
          </h1>
          
          <p className="text-[15px] sm:text-[16px] leading-[1.65] text-[#5B615A] max-w-[440px]">
            Snap your fridge and cupboards, or just type what you have. Dishcovery finds the dishes you can actually make tonight — no extra shopping trip.
          </p>
          
          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            <button
              onClick={onHandsFreeClick}
              className="bg-[#7DBE4A] hover:bg-[#6ba63d] text-white text-[15px] font-semibold px-[30px] py-[15px] rounded-full shadow-lg shadow-green-600/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center gap-2.5"
            >
              <Mic className="w-5 h-5 animate-pulse" />
              <span>Hands-free cooking</span>
            </button>
            <button
              onClick={onHowItWorksClick}
              className="border-[1.5px] border-[#1E1E1E] text-[#1E1E1E] hover:bg-black/5 text-[15px] font-semibold px-[28px] py-[14px] rounded-full transition-all flex items-center gap-2.5 cursor-pointer"
            >
              <span>How it works</span>
              <span className="w-[18px] h-[2px] bg-[#1E1E1E] rounded-full inline-block" />
            </button>
          </div>

          {/* Social Proof */}
          <div className="flex items-center gap-4 pt-3">
            <div className="flex items-center -space-x-3">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80" 
                alt="User" 
                className="w-[34px] h-[34px] rounded-full border-2 border-white object-cover" 
              />
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80" 
                alt="User" 
                className="w-[34px] h-[34px] rounded-full border-2 border-white object-cover" 
              />
              <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80" 
                alt="User" 
                className="w-[34px] h-[34px] rounded-full border-2 border-white object-cover" 
              />
            </div>
            <span className="text-[13px] text-[#5B615A] font-medium">
              12,400 dinners rescued this week
            </span>
          </div>
        </div>

        {/* Right Column: Hero Graphic with Image Circles */}
        <div className="flex-none relative w-full max-w-[480px] sm:max-w-[520px] h-[440px] sm:h-[520px] flex items-center justify-center">
          
          {/* Main Dish Center Circle */}
          <div className="absolute top-[20px] sm:top-[30px] left-[20px] sm:left-[30px] w-[340px] h-[340px] sm:w-[440px] sm:h-[440px] rounded-full border-[10px] sm:border-[12px] border-white/60 box-border overflow-hidden shadow-2xl z-1 bg-white">
            <img 
              src="/images/hero-dish.jpg" 
              alt="Chickpea & spinach stew" 
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" 
            />
          </div>

          {/* Floating Ingredient Circle 1: Tomatoes */}
          <div className="absolute top-0 left-0 w-[80px] h-[80px] sm:w-[96px] sm:h-[96px] rounded-full border-[4px] sm:border-[5px] border-white box-border overflow-hidden shadow-xl z-10 bg-white transform hover:rotate-6 transition-transform">
            <img 
              src="/images/tomatoes.jpg" 
              alt="Tomatoes" 
              className="w-full h-full object-cover" 
            />
          </div>

          {/* Floating Ingredient Circle 2: Eggs */}
          <div className="absolute bottom-[34px] left-0 w-[72px] h-[72px] sm:w-[84px] sm:h-[84px] rounded-full border-[4px] sm:border-[5px] border-white box-border overflow-hidden shadow-xl z-10 bg-white transform -rotate-6 transition-transform">
            <img 
              src="/images/eggs.jpg" 
              alt="Eggs" 
              className="w-full h-full object-cover" 
            />
          </div>

          {/* Floating Ingredient Circle 3: Pasta */}
          <div className="absolute bottom-0 right-[40px] sm:right-[60px] w-[86px] h-[86px] sm:w-[104px] sm:h-[104px] rounded-full border-[4px] sm:border-[5px] border-white box-border overflow-hidden shadow-xl z-10 bg-white transform rotate-3 transition-transform">
            <img 
              src="/images/pasta.jpg" 
              alt="Pasta" 
              className="w-full h-full object-cover" 
            />
          </div>

          {/* Floating Match Card */}
          <div className="absolute top-[120px] sm:top-[130px] right-0 bg-white rounded-2xl p-3.5 sm:p-4 sm:px-[18px] shadow-2xl border border-[#EEF1EB] flex flex-col gap-1 z-20 animate-bounce-subtle">
            <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-[#7DBE4A] font-semibold">
              match
            </span>
            <span className="text-[20px] sm:text-[22px] font-extrabold tracking-tight text-[#1E1E1E] leading-none">
              7 of 8 items
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}
