import React from 'react';
import DishcoveryLogo from './DishcoveryLogo';
import { Search, Moon, Sun, Heart, Sparkles, UserCheck, User } from 'lucide-react';

export default function Navbar({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  onOpenCreateModal,
  onOpenImportModal,
  onOpenAuthModal,
  currentUser,
  savedCount,
  isDarkMode,
  setIsDarkMode
}) {
  return (
    <header className="relative z-30 bg-white dark:bg-[#1E1E1E] transition-colors border-b border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-[72px] pt-6 pb-4 flex items-center justify-between gap-6 sm:gap-10">
        
        {/* Brand Logo */}
        <a href="#" onClick={() => setActiveTab('feed')} className="flex items-center">
          <DishcoveryLogo variant={isDarkMode ? 'dark' : 'default'} />
        </a>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-[14px] font-medium">
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); setActiveTab('feed'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className={`transition ${activeTab === 'feed' ? 'color-[#7DBE4A] font-semibold text-[#7DBE4A]' : 'text-[#1E1E1E] dark:text-slate-200 hover:text-[#7DBE4A]'}`}
          >
            Home
          </a>
          <a
            href="#how"
            className="text-[#1E1E1E] dark:text-slate-200 hover:text-[#7DBE4A] transition"
          >
            How it works
          </a>
          <a
            href="#tonight"
            className="text-[#1E1E1E] dark:text-slate-200 hover:text-[#7DBE4A] transition"
          >
            Tonight
          </a>
          <a
            href="#pantry"
            className="text-[#1E1E1E] dark:text-slate-200 hover:text-[#7DBE4A] transition"
          >
            My pantry
          </a>
          <button
            onClick={() => setActiveTab('saved')}
            className={`transition flex items-center gap-1.5 cursor-pointer ${activeTab === 'saved' ? 'text-[#7DBE4A] font-semibold' : 'text-[#1E1E1E] dark:text-slate-200 hover:text-[#7DBE4A]'}`}
          >
            <span>Saved</span>
            {savedCount > 0 && (
              <span className="bg-[#7DBE4A] text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
                {savedCount}
              </span>
            )}
          </button>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          
          {/* Quick Smart AI Import */}
          <button
            onClick={onOpenImportModal}
            className="hidden sm:flex items-center gap-1.5 bg-[#EAF3DF] dark:bg-slate-800 text-[#4E8B3A] dark:text-[#7DBE4A] hover:bg-[#dcecd0] text-[13px] font-semibold px-3.5 py-2 rounded-full transition cursor-pointer"
            title="Import Recipe via AI Link"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Import</span>
          </button>

          {/* Dark Mode Switcher */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 shadow-[0_3px_12px_rgba(30,30,30,0.10)] dark:shadow-none border border-slate-200 dark:border-slate-700 flex items-center justify-center text-[#1E1E1E] dark:text-slate-200 hover:text-[#7DBE4A] transition cursor-pointer"
            title="Toggle Dark/Light Mode"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* User Sign In / Account / Sign Up Button */}
          {currentUser ? (
            <button
              onClick={() => setActiveTab('household')}
              className="flex items-center gap-2 bg-[#EAF3DF] dark:bg-slate-800 text-[#4E8B3A] dark:text-[#7DBE4A] text-[13px] font-bold px-4 py-2 rounded-full border border-[#7DBE4A]/30 hover:shadow-md transition cursor-pointer"
            >
              <img src={currentUser.avatar} alt={currentUser.name} className="w-5 h-5 rounded-full object-cover" />
              <span>{currentUser.name}</span>
            </button>
          ) : (
            <button
              onClick={onOpenAuthModal}
              className="bg-[#FFFFFF] dark:bg-slate-800 text-[#1E1E1E] dark:text-white text-[14px] font-semibold px-6 py-2.5 rounded-full shadow-[0_3px_12px_rgba(30,30,30,0.10)] border border-slate-200 dark:border-slate-700 hover:border-[#7DBE4A] transition-all cursor-pointer flex items-center gap-2"
            >
              <User className="w-4 h-4 text-[#7DBE4A]" />
              <span>Sign up</span>
            </button>
          )}

          {/* Create Recipe Button */}
          <button
            onClick={onOpenCreateModal}
            className="hidden lg:flex bg-[#7DBE4A] hover:bg-[#6ba63d] text-white text-[13px] font-semibold px-4 py-2.5 rounded-full shadow-md transition cursor-pointer"
          >
            + Recipe
          </button>
        </div>

      </div>
    </header>
  );
}
