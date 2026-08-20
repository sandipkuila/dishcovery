import React, { useState } from 'react';
import { Camera, Plus, X, Search } from 'lucide-react';

export default function PantryBar({ 
  selectedIngredients = ['chickpeas', 'spinach', 'feta'], 
  onIngredientsChange, 
  onFindDishes 
}) {
  const [newIngredient, setNewIngredient] = useState('');
  const [showInput, setShowInput] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault();
    if (newIngredient.trim() && onIngredientsChange) {
      const ing = newIngredient.trim().toLowerCase();
      if (!selectedIngredients.includes(ing)) {
        onIngredientsChange([...selectedIngredients, ing]);
      }
      setNewIngredient('');
      setShowInput(false);
    }
  };

  const handleRemove = (ing) => {
    if (onIngredientsChange) {
      onIngredientsChange(selectedIngredients.filter(item => item !== ing));
    }
  };

  return (
    <div id="pantry" className="px-6 sm:px-12 lg:px-[72px] pb-16 sm:pb-24 flex justify-center bg-white">
      <div className="w-full max-w-[1100px] bg-white border border-[#E6EAE2] rounded-[22px] shadow-[0_14px_44px_rgba(30,30,30,0.06)] p-6 sm:p-[26px_28px] flex items-center gap-5 flex-wrap">
        
        {/* Camera / Scan Icon */}
        <div className="w-[52px] h-[52px] rounded-[14px] bg-[#EAF3DF] relative flex-none flex items-center justify-center">
          <div className="w-[28px] h-[20px] rounded-[5px] border-[2.5px] border-[#4E8B3A] box-border relative">
            <div className="absolute top-[3px] left-[6px] w-[12px] h-[12px] rounded-full border-[2.5px] border-[#4E8B3A] box-border" />
            <div className="absolute -top-[5px] left-[7px] w-[10px] h-[4px] rounded-t-[3px] bg-[#4E8B3A]" />
          </div>
        </div>

        {/* Text Header */}
        <div className="flex-1 min-w-[260px] flex flex-col gap-1">
          <h3 className="margin-0 text-[16px] font-bold text-[#1E1E1E]">
            What’s in your kitchen?
          </h3>
          <p className="margin-0 text-[14px] text-[#8A908A]">
            Photograph a shelf, or type it — half a cabbage, two eggs, rice…
          </p>
        </div>

        {/* Ingredient Chips */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {selectedIngredients.map((ing) => (
            <span
              key={ing}
              className="bg-[#F2F6ED] hover:bg-[#e4edd9] transition border border-[#d9e6cc] rounded-full px-4 py-2 text-[13px] font-medium text-[#4E8B3A] flex items-center gap-1.5 cursor-pointer group"
              onClick={() => handleRemove(ing)}
              title="Click to remove"
            >
              <span>{ing}</span>
              <X className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 text-[#4E8B3A]" />
            </span>
          ))}

          {showInput ? (
            <form onSubmit={handleAdd} className="flex items-center gap-1">
              <input
                type="text"
                value={newIngredient}
                onChange={(e) => setNewIngredient(e.target.value)}
                placeholder="Add ingredient..."
                autoFocus
                className="bg-[#F2F6ED] border border-[#7DBE4A] rounded-full px-3 py-1.5 text-[13px] text-[#1E1E1E] outline-none w-36"
              />
              <button 
                type="submit" 
                className="bg-[#7DBE4A] text-white text-[12px] font-semibold px-3 py-1.5 rounded-full hover:bg-[#6ba63d]"
              >
                Add
              </button>
            </form>
          ) : (
            <button
              onClick={() => setShowInput(true)}
              className="bg-[#F2F6ED] hover:bg-[#e4edd9] border border-dashed border-[#4E8B3A]/40 rounded-full px-3.5 py-2 text-[13px] font-medium text-[#4E8B3A] flex items-center gap-1 cursor-pointer transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add item</span>
            </button>
          )}
        </div>

        {/* Action Button */}
        <button
          onClick={onFindDishes}
          className="bg-[#7DBE4A] hover:bg-[#6ba63d] text-white text-[14px] font-semibold px-6 py-3.5 rounded-full shadow-md shadow-green-600/15 transition-all transform hover:-translate-y-0.5 cursor-pointer flex-none"
        >
          Find dishes
        </button>

      </div>
    </div>
  );
}
