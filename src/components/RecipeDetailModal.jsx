import React, { useState } from 'react';
import {
  X, Clock, Users, Heart, Play, ShieldAlert, Check, Plus, Minus,
  Sun, Camera, Send, RefreshCw, ShoppingCart
} from 'lucide-react';
import { CULINARY_SUBSTITUTIONS } from '../data/mockData';

export default function RecipeDetailModal({
  recipe,
  onClose,
  onToggleBookmark,
  onStartCookMode,
  household,
  shoppingList,
  setShoppingList
}) {
  if (!recipe) return null;

  // Servings State (Auto-Scaling)
  const baseServings = recipe.servings || 4;
  const [servings, setServings] = useState(baseServings);

  // Ingredients Strikethrough Checklist State
  const [checkedIngredients, setCheckedIngredients] = useState({});

  // Resolution Fork Modal State
  const [activeResolutionItem, setActiveResolutionItem] = useState(null);

  // Wake Lock API State
  const [wakeLockActive, setWakeLockActive] = useState(false);
  const [wakeLockSentinel, setWakeLockSentinel] = useState(null);

  // "Cooked It" Social Validator State
  const [cookedItPosts, setCookedItPosts] = useState(recipe.cookedItPosts || []);
  const [newComment, setNewComment] = useState('');
  const [newPhotoUrl, setNewPhotoUrl] = useState('');

  // Scaling Multiplier
  const multiplier = servings / baseServings;

  // Format ingredient quantities
  const formatAmount = (origAmount) => {
    if (!origAmount) return '';
    const scaled = origAmount * multiplier;
    if (scaled % 1 === 0) return scaled.toString();
    if (scaled === 0.5) return '1/2';
    if (scaled === 0.25) return '1/4';
    if (scaled === 0.75) return '3/4';
    if (scaled === 0.33 || (scaled > 0.32 && scaled < 0.34)) return '1/3';
    return scaled.toFixed(1).replace(/\.0$/, '');
  };

  // Toggle Ingredient Check
  const toggleCheck = (ingId) => {
    setCheckedIngredients(prev => ({
      ...prev,
      [ingId]: !prev[ingId]
    }));
  };

  // Handle Screen Wake Lock
  const toggleWakeLock = async () => {
    if ('wakeLock' in navigator) {
      try {
        if (!wakeLockActive) {
          const sentinel = await navigator.wakeLock.request('screen');
          setWakeLockSentinel(sentinel);
          setWakeLockActive(true);
        } else {
          if (wakeLockSentinel) {
            await wakeLockSentinel.release();
          }
          setWakeLockActive(false);
          setWakeLockSentinel(null);
        }
      } catch (err) {
        console.warn('Wake Lock error:', err);
        setWakeLockActive(!wakeLockActive);
      }
    } else {
      setWakeLockActive(!wakeLockActive);
    }
  };

  // Check ingredient allergies against active household
  const getIngredientAllergyDetails = (ing) => {
    if (!ing.allergyWarning || !household || !household.allergiesAndDiets) return null;
    const ingWarn = ing.allergyWarning.toLowerCase();
    
    const matchedAllergies = household.allergiesAndDiets.filter(item => {
      const allergy = item.allergy.toLowerCase();
      return ingWarn.includes(allergy) || allergy.includes(ingWarn);
    });

    return matchedAllergies.length > 0 ? matchedAllergies : null;
  };

  // Handle Add to Shopping List
  const addToShoppingList = (item) => {
    if (!shoppingList.includes(item.name)) {
      setShoppingList([...shoppingList, item.name]);
    }
    setActiveResolutionItem(null);
  };

  // Submit "Cooked It" Validation
  const handleCookedItSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const newPost = {
      id: `c-${Date.now()}`,
      user: household.familyName || "Our Household",
      avatar: household.members?.[0]?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      date: "Just now",
      photoUrl: newPhotoUrl || "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=500&q=80",
      comment: newComment
    };

    setCookedItPosts([newPost, ...cookedItPosts]);
    setNewComment('');
    setNewPhotoUrl('');
  };

  return (
    <div className="modal-overlay animate-fade-in">
      <div className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col relative animate-slide-up border border-slate-200 dark:border-slate-800">
        
        {/* Header / Banner */}
        <div className="relative h-64 sm:h-80 w-full shrink-0 bg-slate-950">
          <img
            src={recipe.coverPhoto}
            alt={recipe.title}
            className="w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          
          {/* Close & Bookmark buttons */}
          <div className="absolute top-4 right-4 flex items-center gap-3">
            <button
              onClick={() => onToggleBookmark(recipe.id)}
              className="w-11 h-11 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md flex items-center justify-center text-slate-700 dark:text-slate-200 hover:text-rose-500 shadow-lg transition transform hover:scale-105"
            >
              <Heart className={`w-6 h-6 ${recipe.isBookmarked ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>

            <button
              onClick={onClose}
              className="w-11 h-11 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/80 transition"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Banner Details */}
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <div className="flex flex-wrap gap-2 mb-2">
              {recipe.tags.map(t => (
                <span key={t} className="bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full border border-white/30">
                  {t}
                </span>
              ))}
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-2">
              {recipe.title}
            </h2>
            <div className="flex items-center gap-4 text-xs sm:text-sm font-semibold text-slate-200">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-400" />
                Prep: {recipe.prepTime}m | Cook: {recipe.cookTime}m
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-teal-400" />
                Base Servings: {recipe.servings}
              </span>
            </div>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
          
          {/* Action Bar: Cook Mode & Screen Wake Lock */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-orange-500/10 rounded-2xl border border-orange-500/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-600 text-white flex items-center justify-center font-bold">
                <Play className="w-5 h-5 fill-white" />
              </div>
              <div>
                <h4 className="font-extrabold text-slate-900 dark:text-slate-100 text-sm sm:text-base">Ready to cook with the household?</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300">Dynamic task assignment & live step sync across family members.</p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              {/* Screen Wake Lock Toggle */}
              <button
                onClick={toggleWakeLock}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 border ${
                  wakeLockActive
                    ? 'bg-amber-500 text-white border-amber-600 shadow-md shadow-amber-500/20'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-700 hover:bg-slate-50'
                }`}
                title="Keep phone screen awake while cooking"
              >
                <Sun className={`w-4 h-4 ${wakeLockActive ? 'animate-spin' : 'text-amber-500'}`} />
                <span>{wakeLockActive ? 'Screen Lock Active' : 'Enable Wake Lock'}</span>
              </button>

              <button
                onClick={() => onStartCookMode(recipe)}
                className="btn-primary py-2.5 px-5 text-sm flex-1 sm:flex-initial"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Start Family Cook Mode</span>
              </button>
            </div>
          </div>

          {/* Section: Ingredients with Auto-Scaling Servings */}
          <div>
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-200 dark:border-slate-800">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <span>Ingredients Checklist</span>
                  <span className="text-xs font-medium text-slate-400">(Tap item to strike through)</span>
                </h3>
              </div>

              {/* Servings Adjuster */}
              <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700">
                <span className="text-xs font-bold text-slate-600 dark:text-slate-300 pl-2">Servings:</span>
                <div className="flex items-center gap-1 bg-white dark:bg-slate-900 rounded-xl shadow-sm p-0.5 border border-slate-200 dark:border-slate-700">
                  <button
                    onClick={() => setServings(Math.max(1, servings - 1))}
                    className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center text-sm font-extrabold text-slate-900 dark:text-slate-100">
                    {servings}
                  </span>
                  <button
                    onClick={() => setServings(servings + 1)}
                    className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Ingredients List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {recipe.ingredients.map((ing) => {
                const isChecked = checkedIngredients[ing.id];
                const allergyMatches = getIngredientAllergyDetails(ing);

                return (
                  <div
                    key={ing.id}
                    className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between ${
                      isChecked
                        ? 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 opacity-60'
                        : allergyMatches
                        ? 'bg-amber-500/10 border-amber-500/30'
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    <div
                      className="flex items-center gap-3 cursor-pointer flex-1"
                      onClick={() => toggleCheck(ing.id)}
                    >
                      <div className={`w-5 h-5 rounded-lg border flex items-center justify-center transition ${
                        isChecked ? 'bg-orange-600 border-orange-600 text-white' : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900'
                      }`}>
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>

                      <span className={`text-sm font-medium ${
                        isChecked ? 'line-through text-slate-400' : 'text-slate-800 dark:text-slate-200'
                      }`}>
                        <strong className="text-slate-900 dark:text-slate-100 font-bold mr-1">
                          {formatAmount(ing.amount)} {ing.unit}
                        </strong>
                        {ing.name}
                      </span>
                    </div>

                    {/* Resolution Fork Trigger Button if item has allergy warning */}
                    {ing.allergyWarning && (
                      <button
                        onClick={() => setActiveResolutionItem(ing)}
                        className="ml-2 p-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-700 dark:text-amber-300 text-xs font-bold transition flex items-center gap-1 border border-amber-500/30"
                        title="View safe substitutes or add to shopping list"
                      >
                        <ShieldAlert className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                        <span className="hidden sm:inline">Options</span>
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section: Step-by-Step Instructions with Role Tagging */}
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4 pb-2 border-b border-slate-200 dark:border-slate-800">
              Step-by-Step Instructions & Roles
            </h3>

            <div className="space-y-4">
              {recipe.steps.map((step) => (
                <div
                  key={step.stepNumber}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col sm:flex-row items-start gap-4"
                >
                  <div className="w-8 h-8 rounded-full bg-slate-900 dark:bg-slate-700 text-white font-extrabold text-sm flex items-center justify-center shrink-0">
                    {step.stepNumber}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold text-slate-900 dark:text-slate-100 text-base">{step.title}</h4>
                      <span className={step.roleTag === 'Helper Friendly' ? 'badge-helper' : 'badge-advanced'}>
                        {step.roleTag}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-2">
                      {step.text}
                    </p>
                    <p className="text-xs font-semibold text-slate-400">
                      Suggested Role: <span className="text-slate-700 dark:text-slate-300">{step.suggestedRole}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: "Cooked It" Social Validator */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-2">
              <Camera className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              <span>"Cooked It" Social Validation</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              Households who cooked this recipe share active proof-of-cooking photos and tips!
            </p>

            {/* Submit Proof Form */}
            <form onSubmit={handleCookedItSubmit} className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 mb-6 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">Post Household Proof</h4>
              <textarea
                placeholder="How did your household like cooking this dish? Share tips or role feedback..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows={2}
                className="w-full p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/40 text-slate-900 dark:text-slate-100"
              />
              <div className="flex flex-wrap items-center justify-between gap-3">
                <input
                  type="url"
                  placeholder="Optional photo URL (e.g., https://images.unsplash.com/...)"
                  value={newPhotoUrl}
                  onChange={(e) => setNewPhotoUrl(e.target.value)}
                  className="flex-1 p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-orange-500/40 text-slate-900 dark:text-slate-100"
                />
                <button type="submit" className="btn-primary py-2 px-4 text-xs">
                  <Send className="w-3.5 h-3.5" />
                  <span>Post Proof</span>
                </button>
              </div>
            </form>

            {/* Posts Grid */}
            <div className="space-y-4">
              {cookedItPosts.length === 0 ? (
                <p className="text-xs text-slate-400 italic">No proof photos posted yet. Be the first household to cook this!</p>
              ) : (
                cookedItPosts.map((post) => (
                  <div key={post.id} className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex gap-4">
                    <img
                      src={post.avatar}
                      alt={post.user}
                      className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-600 shrink-0"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-xs text-slate-900 dark:text-slate-100">{post.user}</span>
                        <span className="text-[10px] text-slate-400">{post.date}</span>
                      </div>
                      <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-2">{post.comment}</p>
                      {post.photoUrl && (
                        <img
                          src={post.photoUrl}
                          alt="Cooked proof"
                          className="w-32 h-24 object-cover rounded-xl border border-slate-200 dark:border-slate-700"
                        />
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

          </div>

        </div>
      </div>

      {/* RESOLUTION FORK MODAL */}
      {activeResolutionItem && (
        <div className="modal-overlay z-60 animate-fade-in">
          <div className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 w-full max-w-md rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 animate-slide-up space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-extrabold text-base">
                <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                <span>Ingredient Resolution Fork</span>
              </div>
              <button
                onClick={() => setActiveResolutionItem(null)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:bg-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-amber-500/10 p-3.5 rounded-2xl border border-amber-500/30">
              <p className="text-xs text-amber-900 dark:text-amber-300 font-bold mb-1">
                Selected Item: {activeResolutionItem.name}
              </p>
              <p className="text-xs text-amber-800 dark:text-amber-400">
                Contains potential allergen: <strong>{activeResolutionItem.allergyWarning}</strong>
              </p>
            </div>

            {/* Substitution Options */}
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-1.5">
                <RefreshCw className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                <span>Safe Culinary Substitutions</span>
              </h5>

              {CULINARY_SUBSTITUTIONS[activeResolutionItem.allergyWarning] ? (
                <div className="space-y-2">
                  {CULINARY_SUBSTITUTIONS[activeResolutionItem.allergyWarning].map((sub, idx) => (
                    <div key={idx} className="p-3 bg-teal-500/10 rounded-xl border border-teal-500/30">
                      <p className="text-xs font-bold text-teal-900 dark:text-teal-300 mb-0.5">{sub.replacement}</p>
                      <p className="text-[11px] text-teal-700 dark:text-teal-400 leading-snug">{sub.note}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-500 italic">No preset substitute found. Consider omitting or using olive oil.</p>
              )}
            </div>

            {/* Push to Household Shopping List Button */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex gap-2">
              <button
                onClick={() => addToShoppingList(activeResolutionItem)}
                className="btn-accent w-full justify-center py-2.5 text-xs"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add {activeResolutionItem.name} to Shopping List</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
