import React from 'react';

export default function HowItWorks() {
  return (
    <section id="how" className="px-6 sm:px-12 lg:px-[72px] pb-24 sm:pb-32 flex flex-col items-center gap-11 bg-white">
      
      {/* Section Header */}
      <div className="flex flex-col items-center gap-3 text-center">
        <h2 className="margin-0 text-[32px] sm:text-[40px] font-extrabold tracking-tight uppercase text-[#1E1E1E]">
          Snap. Scan. Cook.
        </h2>
        <p className="margin-0 text-[15px] leading-[1.6] text-[#8A908A] max-w-[460px]">
          Three steps between an awkward-looking fridge and dinner on the table.
        </p>
      </div>

      {/* 3 Step Cards */}
      <div className="flex gap-6 w-full max-w-[1160px] flex-wrap">
        
        {/* Step 1 */}
        <div className="flex-1 min-w-[280px] bg-white border border-[#EEF1EB] rounded-[18px] p-8 sm:p-[34px_30px] flex flex-col gap-4 shadow-[0_10px_32px_rgba(30,30,30,0.05)] hover:shadow-xl transition-shadow">
          <div className="w-[54px] h-[54px] rounded-[15px] bg-[#EAF3DF] flex items-center justify-center">
            <div className="w-[26px] h-[20px] border-[2.5px] border-[#4E8B3A] rounded-[5px] box-border relative">
              <div className="absolute top-[4px] left-[7px] w-[9px] h-[9px] border-[2.5px] border-[#4E8B3A] rounded-full box-border" />
            </div>
          </div>
          <h3 className="margin-0 text-[19px] font-bold text-[#1E1E1E]">
            Snap the shelf
          </h3>
          <p className="margin-0 text-[14px] leading-[1.6] text-[#5B615A]">
            One photo of the fridge door, the veg drawer, the back of the cupboard. Blurry jars are fine.
          </p>
        </div>

        {/* Step 2 */}
        <div className="flex-1 min-w-[280px] bg-white border border-[#EEF1EB] rounded-[18px] p-8 sm:p-[34px_30px] flex flex-col gap-4 shadow-[0_10px_32px_rgba(30,30,30,0.05)] hover:shadow-xl transition-shadow">
          <div className="w-[54px] h-[54px] rounded-[15px] bg-[#EAF3DF] relative">
            <div className="absolute top-[15px] left-[14px] w-[20px] h-[20px] border-[2.5px] border-[#4E8B3A] rounded-full box-border" />
            <div className="absolute top-[16px] left-[32px] w-[11px] h-[2.5px] rounded-full bg-[#4E8B3A] transform -rotate-45 origin-[0_50%]" />
          </div>
          <h3 className="margin-0 text-[19px] font-bold text-[#1E1E1E]">
            We read the pantry
          </h3>
          <p className="margin-0 text-[14px] leading-[1.6] text-[#5B615A]">
            Items get recognised, counted and remembered — so tomorrow you only add what changed.
          </p>
        </div>

        {/* Step 3 */}
        <div className="flex-1 min-w-[280px] bg-white border border-[#EEF1EB] rounded-[18px] p-8 sm:p-[34px_30px] flex flex-col gap-4 shadow-[0_10px_32px_rgba(30,30,30,0.05)] hover:shadow-xl transition-shadow">
          <div className="w-[54px] h-[54px] rounded-[15px] bg-[#EAF3DF] flex items-center justify-center">
            <div className="flex flex-col items-center gap-[3px]">
              <div className="w-[30px] h-[4px] rounded-full bg-[#4E8B3A]" />
              <div className="w-[24px] h-[12px] rounded-b-full bg-[#4E8B3A]" />
            </div>
          </div>
          <h3 className="margin-0 text-[19px] font-bold text-[#1E1E1E]">
            Cook tonight
          </h3>
          <p className="margin-0 text-[14px] leading-[1.6] text-[#5B615A]">
            Ranked by what you already have, how long it takes, and what needs using up first.
          </p>
        </div>

      </div>
    </section>
  );
}
