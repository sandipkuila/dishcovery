import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import PantryBar from './components/PantryBar';
import HowItWorks from './components/HowItWorks';
import TonightsMatches from './components/TonightsMatches';
import CookFeed from './components/CookFeed';
import DarkCtaBanner from './components/DarkCtaBanner';
import Footer from './components/Footer';
import RecipeDetailModal from './components/RecipeDetailModal';
import FamilyCookMode from './components/FamilyCookMode';
import RecipeEditorModal from './components/RecipeEditorModal';
import SmartImportModal from './components/SmartImportModal';
import AuthModal from './components/AuthModal';
import HouseholdHub from './components/HouseholdHub';
import { INITIAL_RECIPES, INITIAL_HOUSEHOLD } from './data/mockData';
import { ShoppingCart, Trash2, Heart, Utensils } from 'lucide-react';

export default function App() {
  const [recipes, setRecipes] = useState(INITIAL_RECIPES);
  const [household, setHousehold] = useState(INITIAL_HOUSEHOLD);
  const [activeTab, setActiveTab] = useState('feed'); // 'feed' | 'saved' | 'household'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [pantryIngredients, setPantryIngredients] = useState(['chickpeas', 'spinach', 'feta']);

  // Current User / Auth State
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Dark Mode State
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('dishcovery_dark') === 'true';
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('dishcovery_dark', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('dishcovery_dark', 'false');
    }
  }, [isDarkMode]);

  // Modals state
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [activeCookModeRecipe, setActiveCookModeRecipe] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  // Household Shopping List State
  const [shoppingList, setShoppingList] = useState([
    "Crushed Peanut Topping",
    "Tamari Soy Sauce"
  ]);

  // Bookmark Handler
  const handleToggleBookmark = (recipeId) => {
    setRecipes(prev => prev.map(rec => {
      if (rec.id === recipeId) {
        return { ...rec, isBookmarked: !rec.isBookmarked };
      }
      return rec;
    }));
  };

  const handleSaveNewRecipe = (newRecipe) => {
    setRecipes([newRecipe, ...recipes]);
    if (selectedRecipe && selectedRecipe.id === newRecipe.id) {
      setSelectedRecipe(newRecipe);
    }
  };

  const handleAuthSuccess = (userObj) => {
    setCurrentUser(userObj);
  };

  // Scroll to pantry or trigger search
  const handleFindDishes = () => {
    if (pantryIngredients.length > 0) {
      setSearchQuery(pantryIngredients[0]);
    }
    const element = document.getElementById('tonight');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filter recipes based on category, activeTab, & searchQuery
  const filteredRecipes = recipes.filter(recipe => {
    if (activeTab === 'saved' && !recipe.isBookmarked) {
      return false;
    }

    if (selectedCategory !== 'All') {
      const matchCategory = recipe.tags.some(t => t.toLowerCase() === selectedCategory.toLowerCase());
      if (!matchCategory) return false;
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = recipe.title.toLowerCase().includes(q);
      const matchTag = recipe.tags.some(t => t.toLowerCase().includes(q));
      const matchIngredient = recipe.ingredients.some(ing => ing.name.toLowerCase().includes(q));
      return matchTitle || matchTag || matchIngredient;
    }

    return true;
  });

  const savedCount = recipes.filter(r => r.isBookmarked).length;

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 flex flex-col font-sans text-[#1E1E1E] dark:text-slate-100 antialiased selection:bg-[#7DBE4A] selection:text-white transition-colors duration-300">
      
      {/* Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenCreateModal={() => setIsCreateModalOpen(true)}
        onOpenImportModal={() => setIsImportModalOpen(true)}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        currentUser={currentUser}
        savedCount={savedCount}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />

      {/* Main Content Body */}
      <main className="flex-1">
        
        {/* Full-Page Landing & Discovery Sections */}
        {activeTab === 'feed' && (
          <>
            {/* Hero Section */}
            <HeroSection
              onScanClick={() => setIsImportModalOpen(true)}
              onHowItWorksClick={() => {
                const el = document.getElementById('how');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* Interactive Pantry Bar */}
            <PantryBar
              selectedIngredients={pantryIngredients}
              onIngredientsChange={setPantryIngredients}
              onFindDishes={handleFindDishes}
            />

            {/* How It Works (3 Steps) */}
            <HowItWorks />

            {/* Tonight's Matches (Showcase Dish Cards) */}
            <TonightsMatches
              onStartCookMode={(rec) => setActiveCookModeRecipe(rec)}
              onSelectRecipe={(rec) => setSelectedRecipe(rec)}
            />

            {/* Complete Recipe Explorer Feed */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="text-center mb-8">
                <h3 className="text-2xl sm:text-3xl font-extrabold uppercase text-[#1E1E1E] dark:text-white">
                  Explore All Recipes
                </h3>
                <p className="text-sm text-[#8A908A] mt-1">
                  Filter by category, dietary preferences, or search your favorite dishes.
                </p>
              </div>

              <CookFeed
                recipes={filteredRecipes}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                onToggleBookmark={handleToggleBookmark}
                onSelectRecipe={(rec) => setSelectedRecipe(rec)}
                onStartCookMode={(rec) => setActiveCookModeRecipe(rec)}
                household={household}
              />
            </div>

            {/* Dark CTA Banner */}
            <DarkCtaBanner
              onGetAppClick={() => setIsAuthModalOpen(true)}
              onBrowserClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </>
        )}

        {/* TAB: Saved Household Cookbook */}
        {activeTab === 'saved' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
            <div className="bg-gradient-to-r from-[#7DBE4A] via-emerald-600 to-teal-600 text-white rounded-3xl p-6 sm:p-8 shadow-xl mb-8">
              <div className="flex items-center gap-3 mb-2">
                <Heart className="w-8 h-8 fill-white" />
                <h2 className="text-2xl sm:text-3xl font-black">Saved Household Cookbook</h2>
              </div>
              <p className="text-green-100 text-sm max-w-xl">
                Your curated private recipe collection. Click "Cook this" on any dish to start interactive family cooking mode!
              </p>
            </div>

            <CookFeed
              recipes={filteredRecipes}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              onToggleBookmark={handleToggleBookmark}
              onSelectRecipe={(rec) => setSelectedRecipe(rec)}
              onStartCookMode={(rec) => setActiveCookModeRecipe(rec)}
              household={household}
            />
          </div>
        )}

        {/* TAB: Household Hub & Profiles */}
        {activeTab === 'household' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <HouseholdHub
              household={household}
              setHousehold={setHousehold}
              savedRecipes={recipes.filter(r => r.isBookmarked)}
            />
          </div>
        )}

      </main>

      {/* Floating Shopping List Drawer */}
      {shoppingList.length > 0 && (
        <div className="fixed bottom-4 right-4 z-40 max-w-xs w-full bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 p-4 animate-slide-up">
          <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-100 dark:border-slate-700">
            <div className="flex items-center gap-2 text-slate-900 dark:text-slate-100 font-extrabold text-xs">
              <ShoppingCart className="w-4 h-4 text-[#7DBE4A]" />
              <span>Grocery List ({shoppingList.length})</span>
            </div>
            <button
              onClick={() => setShoppingList([])}
              className="text-[10px] text-slate-400 hover:text-rose-500 font-bold cursor-pointer"
            >
              Clear All
            </button>
          </div>

          <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
            {shoppingList.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-700/60 p-2 rounded-xl border border-slate-100 dark:border-slate-700">
                <span className="truncate">{item}</span>
                <button
                  onClick={() => setShoppingList(shoppingList.filter((_, i) => i !== idx))}
                  className="text-slate-400 hover:text-rose-500 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />

      {/* MODAL 1: Recipe Detail View */}
      {selectedRecipe && (
        <RecipeDetailModal
          recipe={selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
          onToggleBookmark={handleToggleBookmark}
          onStartCookMode={(rec) => {
            setSelectedRecipe(null);
            setActiveCookModeRecipe(rec);
          }}
          household={household}
          shoppingList={shoppingList}
          setShoppingList={setShoppingList}
        />
      )}

      {/* MODAL 2: Signature Family Cook Mode */}
      {activeCookModeRecipe && (
        <FamilyCookMode
          recipe={activeCookModeRecipe}
          onClose={() => setActiveCookModeRecipe(null)}
          household={household}
        />
      )}

      {/* MODAL 3: Simple Recipe Editor */}
      {isCreateModalOpen && (
        <RecipeEditorModal
          onClose={() => setIsCreateModalOpen(false)}
          onSaveRecipe={handleSaveNewRecipe}
        />
      )}

      {/* MODAL 4: Smart Link Importer */}
      {isImportModalOpen && (
        <SmartImportModal
          onClose={() => setIsImportModalOpen(false)}
          onImportComplete={handleSaveNewRecipe}
        />
      )}

      {/* MODAL 5: Auth / Sign Up & Social Login Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />

    </div>
  );
}
