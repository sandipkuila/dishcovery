import React from 'react';
import { Clock, Heart, Users, Sparkles, ChefHat, Play, ShieldAlert } from 'lucide-react';

export default function CookFeed({
  recipes,
  selectedCategory,
  setSelectedCategory,
  onToggleBookmark,
  onSelectRecipe,
  onStartCookMode,
  household
}) {
  const categories = ["All", "Under 30 Mins", "5 Ingredients", "Vegetarian", "Family Favorite", "Kid Friendly"];

  // Helper to check if recipe contains allergens present in active household
  const checkHouseholdAllergenWarnings = (recipe) => {
    if (!household || !household.allergiesAndDiets) return [];
    const warnings = [];
    const activeAllergies = household.allergiesAndDiets.map(a => a.allergy.toLowerCase());
    
    recipe.ingredients.forEach(ing => {
      if (ing.allergyWarning) {
        const ingWarn = ing.allergyWarning.toLowerCase();
        activeAllergies.forEach(allergy => {
          if (ingWarn.includes(allergy) || allergy.includes(ingWarn)) {
            warnings.push(`${ing.name} contains ${ing.allergyWarning}`);
          }
        });
      }
    });
    return warnings;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      
      {/* Hero Banner with Reference Green Theme */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#5ca828] via-[#74c637] to-teal-700 text-white p-6 sm:p-10 mb-8 shadow-xl shadow-[#74c637]/20">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full mb-3 border border-white/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Multi-Player Family Cooking Engine</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight mb-3">
            Turn Daily Meals Into a Shared Family Event
          </h1>
          <p className="text-white/90 text-sm sm:text-base font-medium leading-relaxed mb-6">
            Dishcovery breaks down complex recipes into role-tagged tasks. Let kids tear greens while parents handle heat — with real-time live step synchronization!
          </p>
          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm font-semibold text-white/95">
            <div className="flex items-center gap-2 bg-black/20 px-3.5 py-2 rounded-xl backdrop-blur-sm">
              <Users className="w-4 h-4 text-teal-200" />
              <span>Role-Tagged Tasks (Helper & Advanced)</span>
            </div>
            <div className="flex items-center gap-2 bg-black/20 px-3.5 py-2 rounded-xl backdrop-blur-sm">
              <Clock className="w-4 h-4 text-amber-300" />
              <span>Live Done → Next Task Queue</span>
            </div>
          </div>
        </div>
        {/* Subtle decorative grid background pattern */}
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-12 translate-y-12">
          <ChefHat className="w-96 h-96 text-white" />
        </div>
      </div>

      {/* Filter Chips Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 mr-2 flex items-center gap-1">
          Filter:
        </span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all shadow-sm ${
              selectedCategory === cat
                ? 'bg-[#74c637] text-white scale-105 shadow-md shadow-[#74c637]/30'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Recipe Cards Grid */}
      {recipes.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <ChefHat className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-700 dark:text-slate-200">No recipes matched your filter</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Try clearing your search or picking a different category chip above.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {recipes.map((recipe) => {
            const allergenWarnings = checkHouseholdAllergenWarnings(recipe);
            const totalTime = Number(recipe.prepTime || 0) + Number(recipe.cookTime || 0);

            return (
              <div
                key={recipe.id}
                className="group bg-white dark:bg-slate-800 rounded-3xl border border-slate-200/80 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden transform hover:-translate-y-1 cursor-pointer"
                onClick={() => onSelectRecipe(recipe)}
              >
                {/* 1:1 Aspect Ratio Image Container */}
                <div className="relative w-full aspect-square overflow-hidden bg-slate-100 dark:bg-slate-900">
                  <img
                    src={recipe.coverPhoto}
                    alt={recipe.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  
                  {/* Glass Top Bar with One-Tap Save & Prep Time */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <span className="bg-black/60 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-white/20">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      {totalTime} mins
                    </span>

                    {/* Bookmark Heart Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleBookmark(recipe.id);
                      }}
                      className="pointer-events-auto w-10 h-10 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md flex items-center justify-center text-slate-700 dark:text-slate-200 hover:text-rose-500 shadow-md transition transform hover:scale-110 active:scale-95"
                      title={recipe.isBookmarked ? "Remove from Cookbook" : "Save to Household Cookbook"}
                    >
                      <Heart
                        className={`w-5 h-5 transition-colors ${
                          recipe.isBookmarked ? 'fill-rose-500 text-rose-500' : 'text-slate-600 dark:text-slate-300 hover:text-rose-500'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Allergen Warning Banner if matching household profile */}
                  {allergenWarnings.length > 0 && (
                    <div className="absolute bottom-3 left-3 right-3 bg-amber-500/90 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 border border-amber-300">
                      <ShieldAlert className="w-4 h-4 shrink-0 text-amber-100" />
                      <span className="truncate">Household Alert: Allergy replacement available</span>
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-2.5">
                      {recipe.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="badge-tag">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-extrabold text-slate-900 dark:text-slate-100 group-hover:text-[#74c637] transition line-clamp-1 mb-1.5">
                      {recipe.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed mb-4">
                      {recipe.description}
                    </p>
                  </div>

                  {/* Footer with Creator Avatar & Family Cook CTA */}
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-700/80 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <img
                        src={recipe.author.avatar}
                        alt={recipe.author.name}
                        className="w-7 h-7 rounded-full object-cover border border-slate-200 dark:border-slate-600"
                      />
                      <div>
                        <p className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-none">{recipe.author.name}</p>
                        <p className="text-[10px] text-slate-400 font-medium">{recipe.author.handle}</p>
                      </div>
                    </div>

                    {/* Launch Family Cook Mode Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onStartCookMode(recipe);
                      }}
                      className="btn-accent py-1.5 px-3 text-xs rounded-xl flex items-center gap-1"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>Cook Mode</span>
                    </button>
                  </div>

                </div>

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
