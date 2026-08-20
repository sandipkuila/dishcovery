import React, { useState } from 'react';
import { X, Mail, Lock, User, CheckCircle2, ArrowRight } from 'lucide-react';
import DishcoveryLogo from './DishcoveryLogo';

export default function AuthModal({ isOpen, onClose, onAuthSuccess }) {
  const [mode, setMode] = useState('signup'); // 'signin' | 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [socialLoading, setSocialLoading] = useState(null); // 'google' | 'facebook' | 'instagram'
  const [successMessage, setSuccessMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;

    const userObj = {
      name: name.trim() || email.split('@')[0],
      email: email.trim(),
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80'
    };

    setSuccessMessage(mode === 'signup' ? 'Account created successfully! Welcome to Dishcovery 🎉' : 'Signed in successfully! Welcome back 👋');
    setTimeout(() => {
      if (onAuthSuccess) onAuthSuccess(userObj);
      onClose();
      setSuccessMessage('');
    }, 1500);
  };

  const handleSocialLogin = (provider) => {
    setSocialLoading(provider);
    setTimeout(() => {
      const providerNames = { google: 'Google', facebook: 'Facebook', instagram: 'Instagram' };
      const userObj = {
        name: `${providerNames[provider]} Chef`,
        email: `user@${provider}.com`,
        avatar: provider === 'google' 
          ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80'
          : provider === 'facebook'
          ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80'
          : 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80'
      };
      setSocialLoading(null);
      setSuccessMessage(`Connected via ${providerNames[provider]}! Welcome to Dishcovery 🎉`);
      setTimeout(() => {
        if (onAuthSuccess) onAuthSuccess(userObj);
        onClose();
        setSuccessMessage('');
      }, 1500);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white dark:bg-[#1E1E1E] w-full max-w-md rounded-3xl shadow-2xl border border-[#EEF1EB] dark:border-slate-800 overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#F5F5F3] dark:bg-slate-800 text-[#5B615A] dark:text-slate-300 hover:text-[#1E1E1E] hover:bg-[#EAF3DF] transition flex items-center justify-center cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="p-8 pb-4 text-center flex flex-col items-center gap-3">
          <DishcoveryLogo />
          
          {/* Mode Switcher Toggle */}
          <div className="bg-[#F2F6ED] dark:bg-slate-800 p-1 rounded-full flex w-full mt-2">
            <button
              onClick={() => setMode('signup')}
              className={`flex-1 py-2 text-[14px] font-semibold rounded-full transition-all cursor-pointer ${
                mode === 'signup'
                  ? 'bg-[#7DBE4A] text-white shadow-md'
                  : 'text-[#5B615A] dark:text-slate-400 hover:text-[#1E1E1E]'
              }`}
            >
              Sign Up
            </button>
            <button
              onClick={() => setMode('signin')}
              className={`flex-1 py-2 text-[14px] font-semibold rounded-full transition-all cursor-pointer ${
                mode === 'signin'
                  ? 'bg-[#7DBE4A] text-white shadow-md'
                  : 'text-[#5B615A] dark:text-slate-400 hover:text-[#1E1E1E]'
              }`}
            >
              Sign In
            </button>
          </div>
        </div>

        {/* Feedback Alert */}
        {successMessage ? (
          <div className="p-8 text-center flex flex-col items-center gap-3 animate-scale-up">
            <CheckCircle2 className="w-14 h-14 text-[#7DBE4A]" />
            <h3 className="text-lg font-bold text-[#1E1E1E] dark:text-white">
              {successMessage}
            </h3>
          </div>
        ) : (
          <div className="px-8 pb-8 flex flex-col gap-5">
            
            {/* Social Logins */}
            <div className="flex flex-col gap-2.5">
              
              {/* Google */}
              <button
                onClick={() => handleSocialLogin('google')}
                disabled={!!socialLoading}
                className="w-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/80 text-[#1E1E1E] dark:text-white text-[14px] font-semibold py-3 px-4 rounded-full flex items-center justify-center gap-3 transition cursor-pointer shadow-sm"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>{socialLoading === 'google' ? 'Connecting...' : 'Continue with Google'}</span>
              </button>

              {/* Facebook */}
              <button
                onClick={() => handleSocialLogin('facebook')}
                disabled={!!socialLoading}
                className="w-full bg-[#1877F2] hover:bg-[#166fe5] text-white text-[14px] font-semibold py-3 px-4 rounded-full flex items-center justify-center gap-3 transition cursor-pointer shadow-sm"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span>{socialLoading === 'facebook' ? 'Connecting...' : 'Continue with Facebook'}</span>
              </button>

              {/* Instagram */}
              <button
                onClick={() => handleSocialLogin('instagram')}
                disabled={!!socialLoading}
                className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:opacity-95 text-white text-[14px] font-semibold py-3 px-4 rounded-full flex items-center justify-center gap-3 transition cursor-pointer shadow-sm"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                <span>{socialLoading === 'instagram' ? 'Connecting...' : 'Continue with Instagram'}</span>
              </button>

            </div>

            {/* Divider */}
            <div className="flex items-center my-1">
              <div className="flex-1 border-t border-slate-200 dark:border-slate-700" />
              <span className="px-3 text-[12px] font-medium text-[#8A908A] uppercase tracking-wider">
                or with email
              </span>
              <div className="flex-1 border-t border-slate-200 dark:border-slate-700" />
            </div>

            {/* Email Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
              
              {mode === 'signup' && (
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name"
                    required
                    className="w-full bg-[#F5F5F3] dark:bg-slate-800 border border-transparent focus:border-[#7DBE4A] rounded-full py-2.5 pl-11 pr-4 text-[14px] text-[#1E1E1E] dark:text-white outline-none transition"
                  />
                </div>
              )}

              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  required
                  className="w-full bg-[#F5F5F3] dark:bg-slate-800 border border-transparent focus:border-[#7DBE4A] rounded-full py-2.5 pl-11 pr-4 text-[14px] text-[#1E1E1E] dark:text-white outline-none transition"
                />
              </div>

              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                  className="w-full bg-[#F5F5F3] dark:bg-slate-800 border border-transparent focus:border-[#7DBE4A] rounded-full py-2.5 pl-11 pr-4 text-[14px] text-[#1E1E1E] dark:text-white outline-none transition"
                />
              </div>

              {/* Options Row */}
              <div className="flex items-center justify-between text-[12px] px-1 text-[#5B615A] dark:text-slate-400">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-slate-300 text-[#7DBE4A] focus:ring-[#7DBE4A]"
                  />
                  <span>Remember me</span>
                </label>
                {mode === 'signin' && (
                  <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-[#7DBE4A] transition font-medium">
                    Forgot password?
                  </a>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#7DBE4A] hover:bg-[#6ba63d] text-white text-[15px] font-semibold py-3.5 px-6 rounded-full shadow-lg shadow-green-600/20 transition-all transform hover:-translate-y-0.5 cursor-pointer mt-1 flex items-center justify-center gap-2"
              >
                <span>{mode === 'signup' ? 'Create Account' : 'Sign In'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </form>

          </div>
        )}

      </div>
    </div>
  );
}
