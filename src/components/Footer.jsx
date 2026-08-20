import React, { useState } from 'react';
import DishcoveryLogo from './DishcoveryLogo';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-[#EAF3DF] px-6 sm:px-12 lg:px-[72px] pt-16 pb-11 flex flex-col gap-11 text-[#5B615A]">
      
      <div className="flex gap-[48px] flex-wrap justify-between">
        
        {/* Brand Info */}
        <div className="flex-1 min-w-[240px] max-w-[280px] flex flex-col gap-4">
          <DishcoveryLogo />
          <p className="margin-0 text-[14px] leading-[1.65] text-[#5B615A]">
            Cook what you already have. Waste less, shop less, eat better.
          </p>
        </div>

        {/* Product Links */}
        <div className="flex-1 min-w-[140px] flex flex-col gap-3">
          <h4 className="margin-0 text-[16px] font-bold text-[#1E1E1E]">Product</h4>
          <a href="#how" className="text-[14px] text-[#5B615A] hover:text-[#7DBE4A] transition">How it works</a>
          <a href="#tonight" className="text-[14px] text-[#5B615A] hover:text-[#7DBE4A] transition">Tonight’s matches</a>
          <a href="#pantry" className="text-[14px] text-[#5B615A] hover:text-[#7DBE4A] transition">My pantry</a>
        </div>

        {/* Company Links */}
        <div className="flex-1 min-w-[140px] flex flex-col gap-3">
          <h4 className="margin-0 text-[16px] font-bold text-[#1E1E1E]">Company</h4>
          <a href="#kitchen" className="text-[14px] text-[#5B615A] hover:text-[#7DBE4A] transition">About</a>
          <a href="#kitchen" className="text-[14px] text-[#5B615A] hover:text-[#7DBE4A] transition">Privacy</a>
          <a href="#kitchen" className="text-[14px] text-[#5B615A] hover:text-[#7DBE4A] transition">Contact</a>
        </div>

        {/* Newsletter Form */}
        <div className="flex-1 min-w-[280px] max-w-[380px] flex flex-col gap-3.5">
          <h4 className="margin-0 text-[16px] font-bold text-[#1E1E1E]">One dish a week, by email</h4>
          
          {subscribed ? (
            <div className="bg-[#7DBE4A] text-white text-[13px] font-semibold px-5 py-3 rounded-full animate-fade-in">
              Thanks for subscribing! Check your inbox soon. 🎉
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex items-center gap-2 bg-white rounded-full p-[6px_6px_6px_20px] shadow-sm">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@kitchen.com"
                required
                className="flex-1 bg-transparent border-none text-[14px] text-[#1E1E1E] outline-none placeholder-[#A6ABA2]"
              />
              <button
                type="submit"
                className="bg-[#7DBE4A] hover:bg-[#6ba63d] text-white text-[13px] font-semibold px-[22px] py-[11px] rounded-full transition cursor-pointer"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#D5E2C6] pt-[22px] flex justify-between items-center gap-5 flex-wrap">
        <span className="font-['DM_Mono',monospace] text-[12px] text-[#7E8879]">
          © 2026 Dishcovery
        </span>
        <span className="font-['DM_Mono',monospace] text-[12px] text-[#7E8879]">
          Snap • Scan • Cook
        </span>
      </div>

    </footer>
  );
}
