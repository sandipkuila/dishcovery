import React from 'react';

export default function DishcoveryLogo({ variant = 'default', className = '' }) {
  const isDark = variant === 'dark' || variant === 'white';
  const textColor = isDark ? 'text-white' : 'text-[#1E1E1E]';
  const subtextColor = isDark ? 'text-[#7DBE4A]' : 'text-[#7DBE4A]';

  if (variant === 'lg') {
    return (
      <div className={`flex flex-col items-center gap-2 ${className}`}>
        <div className={`flex items-center font-sans font-extrabold text-[38px] sm:text-[44px] tracking-tight ${textColor} leading-none select-none`}>
          <span>Dishc</span>
          <span className="relative w-[30px] h-[42px] inline-block">
            <span 
              className="absolute top-[10px] left-[2px] w-[25px] h-[25px] border-[7px] border-[#7DBE4A] rounded-full box-border block" 
            />
            <span 
              className="absolute top-[11px] left-[23px] w-[14px] h-[6px] rounded-full bg-[#7DBE4A] transform -rotate-45 origin-[0_50%] block" 
            />
          </span>
          <span>very</span>
        </div>
        <div className={`flex justify-center gap-3 font-sans font-bold text-[12px] tracking-widest uppercase ${subtextColor}`}>
          <span>Snap</span>
          <span>•</span>
          <span>Scan</span>
          <span>•</span>
          <span>Cook</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center font-sans font-extrabold text-[24px] sm:text-[26px] tracking-tight ${textColor} leading-none select-none ${className}`}>
      <span>Dishc</span>
      <span className="relative w-[19px] h-[26px] inline-block">
        <span 
          className="absolute top-[6px] left-[2px] w-[16px] h-[16px] border-[4px] border-[#7DBE4A] rounded-full box-border block" 
        />
        <span 
          className="absolute top-[7px] left-[15px] w-[9px] h-[3px] rounded-full bg-[#7DBE4A] transform -rotate-45 origin-[0_50%] block" 
        />
      </span>
      <span>very</span>
    </div>
  );
}
