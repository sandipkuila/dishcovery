import React from 'react';

export default function TonightsMatches({ onStartCookMode, onSelectRecipe }) {
  const matches = [
    {
      id: 'chickpea-stew-1',
      title: 'Chickpea & spinach stew',
      image: '/images/chickpea-stew.jpg',
      matchBadge: 'uses 7 of 9',
      prepTime: '25 min',
      tip: 'Uses up the spinach before it turns.',
      recipeData: {
        id: 'chickpea-stew-1',
        title: 'Chickpea & Spinach Stew',
        image: '/images/chickpea-stew.jpg',
        time: '25 mins',
        servings: 4,
        difficulty: 'Easy',
        tags: ['Pantry Rescue', 'Vegetarian', 'Gluten-Free'],
        isBookmarked: true,
        ingredients: [
          { name: 'Chickpeas (canned)', amount: '2 cans (800g)', status: 'have' },
          { name: 'Fresh Spinach', amount: '150g', status: 'have' },
          { name: 'Diced Tomatoes', amount: '1 can (400g)', status: 'have' },
          { name: 'Feta Cheese', amount: '100g crumble', status: 'have' },
          { name: 'Garlic & Onion', amount: '1 each', status: 'have' },
          { name: 'Olive Oil & Cumin', amount: '2 tbsp', status: 'have' },
          { name: 'Crusty Bread', amount: 'For serving', status: 'optional' }
        ],
        steps: [
          { step: 1, text: 'Sauté onion and garlic in olive oil until translucent (approx 4 mins).' },
          { step: 2, text: 'Add cumin, diced tomatoes, and rinsed chickpeas. Simmer for 15 minutes.' },
          { step: 3, text: 'Stir in fresh spinach until wilted. Top with crumbled feta cheese and serve warm.' }
        ]
      }
    },
    {
      id: 'egg-fried-rice-2',
      title: 'Egg fried rice',
      image: '/images/egg-fried-rice.jpg',
      matchBadge: 'uses 6 of 9',
      prepTime: '15 min',
      tip: 'Yesterday’s rice is the whole point.',
      recipeData: {
        id: 'egg-fried-rice-2',
        title: 'Egg Fried Rice',
        image: '/images/egg-fried-rice.jpg',
        time: '15 mins',
        servings: 3,
        difficulty: 'Easy',
        tags: ['Quick 15m', 'Pantry Rescue'],
        isBookmarked: true,
        ingredients: [
          { name: 'Cooked Rice (chilled)', amount: '3 cups', status: 'have' },
          { name: 'Eggs', amount: '3 large', status: 'have' },
          { name: 'Green Onions & Peas', amount: '1/2 cup', status: 'have' },
          { name: 'Soy Sauce & Sesame Oil', amount: '2 tbsp', status: 'have' }
        ],
        steps: [
          { step: 1, text: 'Scramble eggs in a hot wok or skillet, then remove.' },
          { step: 2, text: 'Add cold rice, breaking up clumps with soy sauce and sesame oil.' },
          { step: 3, text: 'Fold eggs, green onions, and peas back in for 2 minutes.' }
        ]
      }
    },
    {
      id: 'cabbage-pasta-3',
      title: 'Buttered cabbage pasta',
      image: '/images/cabbage-pasta.jpg',
      matchBadge: 'uses 5 of 9',
      prepTime: '20 min',
      tip: 'Four ingredients, one pan, no shopping.',
      recipeData: {
        id: 'cabbage-pasta-3',
        title: 'Buttered Cabbage Pasta',
        image: '/images/cabbage-pasta.jpg',
        time: '20 mins',
        servings: 4,
        difficulty: 'Easy',
        tags: ['Pantry Rescue', 'Vegetarian'],
        isBookmarked: false,
        ingredients: [
          { name: 'Penne or Fettuccine Pasta', amount: '350g', status: 'have' },
          { name: 'Savoy or Green Cabbage', amount: '1/2 head, sliced', status: 'have' },
          { name: 'Unsalted Butter', amount: '4 tbsp', status: 'have' },
          { name: 'Parmesan & Black Pepper', amount: '1/2 cup', status: 'have' }
        ],
        steps: [
          { step: 1, text: 'Boil pasta in salted water until al dente.' },
          { step: 2, text: 'In a skillet, melt butter and caramelize cabbage slices until tender and golden.' },
          { step: 3, text: 'Toss pasta with buttered cabbage, splash of pasta water, and parmesan.' }
        ]
      }
    }
  ];

  return (
    <section id="tonight" className="px-6 sm:px-12 lg:px-[72px] pb-24 sm:pb-32 flex flex-col items-center gap-14 bg-[#FBFCFA] pt-20 border-t border-[#EEF1EB]">
      
      {/* Header */}
      <div className="flex flex-col items-center gap-3 text-center">
        <h2 className="margin-0 text-[32px] sm:text-[40px] font-extrabold tracking-tight uppercase text-[#1E1E1E]">
          Tonight’s matches
        </h2>
        <p className="margin-0 text-[15px] leading-[1.6] text-[#8A908A] max-w-[480px]">
          From the nine things currently in your kitchen. No shopping list required.
        </p>
      </div>

      {/* Cards Container */}
      <div className="flex gap-7 w-full max-w-[1160px] flex-wrap justify-center">
        {matches.map((item) => (
          <div 
            key={item.id} 
            className="flex-1 min-w-[280px] max-w-[360px] relative pt-[70px] group"
          >
            {/* Overlapping Top Circular Image */}
            <div 
              onClick={() => onSelectRecipe && onSelectRecipe(item.recipeData)}
              className="absolute top-0 left-1/2 -ml-[70px] w-[140px] h-[140px] rounded-full border-[7px] border-[#7DBE4A] box-border overflow-hidden z-10 bg-white shadow-xl cursor-pointer transition-transform duration-500 group-hover:scale-105"
            >
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Card Body */}
            <div className="bg-white border border-[#EEF1EB] rounded-[18px] p-6 pt-[86px] pb-7 flex flex-col items-center gap-3 shadow-[0_12px_34px_rgba(30,30,30,0.06)] hover:shadow-xl transition-shadow text-center">
              <h3 
                onClick={() => onSelectRecipe && onSelectRecipe(item.recipeData)}
                className="margin-0 text-[19px] font-bold text-[#1E1E1E] hover:text-[#7DBE4A] transition cursor-pointer"
              >
                {item.title}
              </h3>

              <div className="flex items-center gap-2 flex-wrap justify-center">
                <span className="bg-[#EAF3DF] color-[#4E8B3A] text-[#4E8B3A] text-[12px] font-semibold px-3 py-1.5 rounded-full">
                  {item.matchBadge}
                </span>
                <span className="bg-[#F5F5F3] text-[#5B615A] text-[12px] font-semibold px-3 py-1.5 rounded-full">
                  {item.prepTime}
                </span>
              </div>

              <p className="margin-0 text-[13px] leading-[1.55] text-[#8A908A] text-center min-h-[40px]">
                {item.tip}
              </p>

              <button
                onClick={() => onStartCookMode && onStartCookMode(item.recipeData)}
                className="bg-[#7DBE4A] hover:bg-[#6ba63d] text-white text-[13px] font-semibold px-6 py-2.5 rounded-full mt-1 shadow-sm transition-all transform hover:scale-105 cursor-pointer"
              >
                Cook this
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Carousel Indicator Dots */}
      <div className="flex gap-2.5">
        <span className="w-2.5 h-2.5 rounded-full bg-[#7DBE4A]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#D7DED0]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#D7DED0]" />
      </div>

    </section>
  );
}
