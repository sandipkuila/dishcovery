import React, { useState } from 'react';
import { X, Link as LinkIcon, Sparkles, CheckCircle, ArrowRight, Loader2 } from 'lucide-react';

export default function SmartImportModal({
  onClose,
  onImportComplete
}) {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [importedRecipe, setImportedRecipe] = useState(null);

  // Preset sample scraped external blog recipes
  const sampleScrapedData = {
    title: "Crispy Garlic Butter Steak Bites & Potatoes",
    description: "Tender sirloin steak bites pan-seared in rich garlic butter with crispy golden baby potatoes.",
    coverPhoto: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80",
    prepTime: 15,
    cookTime: 20,
    servings: 4,
    author: {
      name: "Scraped from FoodBlog.com",
      handle: "@externalblog",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
    },
    tags: ["Under 30 Mins", "High Protein", "Smart Imported"],
    ingredients: [
      { id: "s1", name: "Sirloin Steak (cubed)", amount: 1.5, unit: "lbs" },
      { id: "s2", name: "Baby Red Potatoes (halved)", amount: 1, unit: "lb" },
      { id: "s3", name: "Unsalted Butter", amount: 4, unit: "tbsp", allergyWarning: "Lactose / Dairy" },
      { id: "s4", name: "Garlic (minced)", amount: 5, unit: "cloves" }
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Halve Potatoes",
        text: "Wash baby potatoes and slice them cleanly in half.",
        roleTag: "Helper Friendly",
        suggestedRole: "Junior Helper (Kids)"
      },
      {
        stepNumber: 2,
        title: "Sear Steak Bites",
        text: "Melt butter in a skillet over high heat and sear steak cubes for 3 minutes until golden brown.",
        roleTag: "Advanced",
        suggestedRole: "Main Cook"
      }
    ]
  };

  const handleStartScrape = (e) => {
    e.preventDefault();
    if (!url.trim()) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setImportedRecipe(sampleScrapedData);
    }, 1200);
  };

  return (
    <div className="modal-overlay animate-fade-in z-50">
      <div className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 w-full max-w-xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 animate-slide-up space-y-6">
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-600 text-white flex items-center justify-center font-bold">
              <LinkIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-slate-100">Smart Link Importer</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Bypass blog clutter & long life stories instantly.</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-500 flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!importedRecipe ? (
          <form onSubmit={handleStartScrape} className="space-y-4">
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Paste any external URL from a recipe blog. Our parser extracts the ingredients, timing, and images automatically into Dishcovery's multi-player format!
            </p>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Recipe Blog URL</label>
              <input
                type="url"
                placeholder="e.g. https://allrecipes.com/recipe/21908/garlic-butter-steak"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
                className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/40 text-slate-900 dark:text-slate-100"
              />
            </div>

            {/* Quick Demo Paste Helper */}
            <button
              type="button"
              onClick={() => setUrl("https://foodblog.example.com/recipes/garlic-butter-steak-bites")}
              className="text-xs text-teal-600 dark:text-teal-400 font-bold hover:underline"
            >
              + Paste Demo Sample Recipe URL
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-accent w-full justify-center py-3 text-sm font-extrabold"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Parsing Web Page...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Extract Recipe Data</span>
                </>
              )}
            </button>
          </form>
        ) : (
          <div className="space-y-4 animate-fade-in">
            <div className="p-4 bg-teal-500/10 rounded-2xl border border-teal-500/30 flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-teal-600 dark:text-teal-400 shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-teal-900 dark:text-teal-300">Extraction Complete!</h4>
                <p className="text-xs text-teal-700 dark:text-teal-400">Parsed title, ingredients, and role-tagged steps successfully.</p>
              </div>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center gap-3">
              <img src={importedRecipe.coverPhoto} alt="Scraped" className="w-16 h-16 rounded-xl object-cover" />
              <div>
                <h5 className="text-sm font-bold text-slate-900 dark:text-slate-100">{importedRecipe.title}</h5>
                <p className="text-xs text-slate-500 dark:text-slate-400">{importedRecipe.ingredients.length} ingredients | {importedRecipe.steps.length} steps</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setImportedRecipe(null)}
                className="btn-secondary flex-1 justify-center py-2.5 text-xs"
              >
                Try Another URL
              </button>
              <button
                type="button"
                onClick={() => {
                  onImportComplete(importedRecipe);
                  onClose();
                }}
                className="btn-primary flex-1 justify-center py-2.5 text-xs font-extrabold"
              >
                <span>Save to Cookbook</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
