import React, { useState } from 'react';
import { X, Plus, Trash2, Image, Sparkles, ChefHat, Tag, Users } from 'lucide-react';

export default function RecipeEditorModal({
  onClose,
  onSaveRecipe
}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [coverPhoto, setCoverPhoto] = useState('https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80');
  const [prepTime, setPrepTime] = useState(15);
  const [cookTime, setCookTime] = useState(20);
  const [servings, setServings] = useState(4);
  const [tagsInput, setTagsInput] = useState('Under 30 Mins, Family Favorite');

  // Ingredients builder state
  const [ingredients, setIngredients] = useState([
    { id: 'ing-1', name: 'Olive Oil', amount: 2, unit: 'tbsp', allergyWarning: '' },
    { id: 'ing-2', name: 'Garlic (minced)', amount: 3, unit: 'cloves', allergyWarning: '' }
  ]);

  // Steps builder state
  const [steps, setSteps] = useState([
    {
      stepNumber: 1,
      title: 'Prep Ingredients',
      text: 'Chop vegetables into bite-sized pieces and set aside.',
      roleTag: 'Helper Friendly',
      suggestedRole: 'Junior Helper (Kids)'
    },
    {
      stepNumber: 2,
      title: 'Sauté in Skillet',
      text: 'Heat olive oil in a pan over medium heat and sauté garlic for 2 mins.',
      roleTag: 'Advanced',
      suggestedRole: 'Main Cook'
    }
  ]);

  // Add ingredient line
  const handleAddIngredient = () => {
    setIngredients([
      ...ingredients,
      { id: `ing-${Date.now()}`, name: '', amount: 1, unit: 'unit', allergyWarning: '' }
    ]);
  };

  // Remove ingredient line
  const handleRemoveIngredient = (id) => {
    setIngredients(ingredients.filter(ing => ing.id !== id));
  };

  // Add step line
  const handleAddStep = () => {
    setSteps([
      ...steps,
      {
        stepNumber: steps.length + 1,
        title: '',
        text: '',
        roleTag: 'Helper Friendly',
        suggestedRole: 'Junior Helper (Kids)'
      }
    ]);
  };

  // Remove step line
  const handleRemoveStep = (index) => {
    const updated = steps.filter((_, idx) => idx !== index).map((st, i) => ({
      ...st,
      stepNumber: i + 1
    }));
    setSteps(updated);
  };

  // Preset Unsplash cover photos for quick selection
  const photoOptions = [
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1621996346565-e3def6164286?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80'
  ];

  // Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newRecipe = {
      id: `rec-${Date.now()}`,
      title: title.slice(0, 60),
      description,
      coverPhoto,
      prepTime: Number(prepTime),
      cookTime: Number(cookTime),
      servings: Number(servings),
      author: {
        name: "The Miller Family",
        handle: "@millerhouse",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
      },
      tags: tagsInput.split(',').map(t => t.trim()).filter(Boolean),
      isBookmarked: false,
      ingredients,
      steps,
      cookedItPosts: []
    };

    onSaveRecipe(newRecipe);
    onClose();
  };

  return (
    <div className="modal-overlay animate-fade-in z-50">
      <div className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 w-full max-w-3xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col relative border border-slate-200 dark:border-slate-800 animate-slide-up">
        
        {/* Header */}
        <div className="p-6 bg-slate-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-600 flex items-center justify-center font-bold">
              <ChefHat className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold">Simple Recipe Editor</h2>
              <p className="text-xs text-slate-400">Strict structured format designed to skip lengthy blog clutter.</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          
          {/* Title input (Strict max 60 chars) */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Recipe Title <span className="text-orange-600">*</span>
              </label>
              <span className={`text-xs font-bold ${title.length > 55 ? 'text-rose-500' : 'text-slate-400'}`}>
                {title.length}/60
              </span>
            </div>
            <input
              type="text"
              maxLength={60}
              placeholder="e.g. 20-Min Honey Garlic Sesame Salmon"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500/40 text-slate-900 dark:text-slate-100"
            />
          </div>

          {/* Description (Tweet-style) */}
          <div>
            <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-1">
              Short Description (Tweet-Style)
            </label>
            <textarea
              maxLength={160}
              rows={2}
              placeholder="Quick summary highlighting why your household loves this recipe..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/40 text-slate-900 dark:text-slate-100"
            />
          </div>

          {/* Cover Photo Picker */}
          <div>
            <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-2">
              Recipe Cover Photo (1:1 Aspect Ratio)
            </label>
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {photoOptions.map((photo, i) => (
                <div
                  key={i}
                  onClick={() => setCoverPhoto(photo)}
                  className={`w-20 h-20 rounded-2xl overflow-hidden cursor-pointer border-2 transition ${
                    coverPhoto === photo ? 'border-orange-600 ring-2 ring-orange-500/30 scale-105' : 'border-slate-200 dark:border-slate-700 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={photo} alt="option" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Times & Servings */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Prep Time (mins)</label>
              <input
                type="number"
                value={prepTime}
                onChange={(e) => setPrepTime(e.target.value)}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold text-slate-900 dark:text-slate-100"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Cook Time (mins)</label>
              <input
                type="number"
                value={cookTime}
                onChange={(e) => setCookTime(e.target.value)}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold text-slate-900 dark:text-slate-100"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Base Servings</label>
              <input
                type="number"
                value={servings}
                onChange={(e) => setServings(e.target.value)}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold text-slate-900 dark:text-slate-100"
              />
            </div>
          </div>

          {/* Ingredients Builder */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300">Ingredients</label>
              <button
                type="button"
                onClick={handleAddIngredient}
                className="text-xs font-bold text-orange-600 dark:text-orange-400 hover:underline flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Ingredient</span>
              </button>
            </div>

            <div className="space-y-2">
              {ingredients.map((ing, idx) => (
                <div key={ing.id} className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Amount"
                    value={ing.amount}
                    onChange={(e) => {
                      const updated = [...ingredients];
                      updated[idx].amount = e.target.value;
                      setIngredients(updated);
                    }}
                    className="w-20 p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100"
                  />
                  <input
                    type="text"
                    placeholder="Unit"
                    value={ing.unit}
                    onChange={(e) => {
                      const updated = [...ingredients];
                      updated[idx].unit = e.target.value;
                      setIngredients(updated);
                    }}
                    className="w-24 p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100"
                  />
                  <input
                    type="text"
                    placeholder="Ingredient Name"
                    value={ing.name}
                    onChange={(e) => {
                      const updated = [...ingredients];
                      updated[idx].name = e.target.value;
                      setIngredients(updated);
                    }}
                    className="flex-1 p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-slate-100"
                  />
                  <input
                    type="text"
                    placeholder="Allergy Warning"
                    value={ing.allergyWarning || ''}
                    onChange={(e) => {
                      const updated = [...ingredients];
                      updated[idx].allergyWarning = e.target.value;
                      setIngredients(updated);
                    }}
                    className="w-32 p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-amber-600 dark:text-amber-400"
                  />
                  {ingredients.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveIngredient(ing.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step-by-Step Builder with Role Tagging */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Step Instructions & Role Tagging
              </label>
              <button
                type="button"
                onClick={handleAddStep}
                className="text-xs font-bold text-orange-600 dark:text-orange-400 hover:underline flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Step</span>
              </button>
            </div>

            <div className="space-y-3">
              {steps.map((st, idx) => (
                <div key={idx} className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-slate-900 dark:text-slate-100">Step {st.stepNumber}</span>
                    
                    {/* Role Tagging Component */}
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Role Tag:</span>
                      <select
                        value={st.roleTag}
                        onChange={(e) => {
                          const updated = [...steps];
                          updated[idx].roleTag = e.target.value;
                          updated[idx].suggestedRole = e.target.value === 'Helper Friendly' ? 'Junior Helper (Kids)' : 'Main Cook';
                          setSteps(updated);
                        }}
                        className="text-xs font-bold p-1 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-100"
                      >
                        <option value="Helper Friendly">Helper Friendly (Kids / Partner)</option>
                        <option value="Advanced">Advanced (Main Cook)</option>
                      </select>

                      {steps.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveStep(idx)}
                          className="p-1 text-slate-400 hover:text-rose-500 ml-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  <input
                    type="text"
                    placeholder="Step Title (e.g., Toss Salad Greens)"
                    value={st.title}
                    onChange={(e) => {
                      const updated = [...steps];
                      updated[idx].title = e.target.value;
                      setSteps(updated);
                    }}
                    className="w-full p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-900 dark:text-slate-100"
                  />

                  <textarea
                    rows={2}
                    placeholder="Clear instruction description..."
                    value={st.text}
                    onChange={(e) => {
                      const updated = [...steps];
                      updated[idx].text = e.target.value;
                      setSteps(updated);
                    }}
                    className="w-full p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="btn-secondary py-2.5 px-5 text-xs">
              Cancel
            </button>
            <button type="submit" className="btn-primary py-2.5 px-6 text-xs font-extrabold">
              Publish Recipe to Feed
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
