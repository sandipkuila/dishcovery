export const INITIAL_RECIPES = [
  {
    id: "rec-1",
    title: "Sheet Pan Honey Garlic Chicken & Veggies",
    description: "Crispy chicken thighs baked with roasted carrots and broccoli in a 15-minute sticky glaze.",
    coverPhoto: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=600&q=80",
    prepTime: 15,
    cookTime: 25,
    servings: 4,
    author: {
      name: "Chef Elena R.",
      handle: "@elenacooks",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
    },
    tags: ["Under 30 Mins", "Family Favorite", "High Protein"],
    isBookmarked: true,
    ingredients: [
      { id: "i1", name: "Boneless Chicken Thighs", amount: 1.5, unit: "lbs", category: "Poultry" },
      { id: "i2", name: "Carrots (sliced)", amount: 3, unit: "medium", category: "Produce" },
      { id: "i3", name: "Broccoli Florets", amount: 2, unit: "cups", category: "Produce" },
      { id: "i4", name: "Honey", amount: 3, unit: "tbsp", category: "Pantry" },
      { id: "i5", name: "Soy Sauce (or Tamari)", amount: 2, unit: "tbsp", category: "Pantry", allergyWarning: "Gluten" },
      { id: "i6", name: "Garlic (minced)", amount: 4, unit: "cloves", category: "Produce" },
      { id: "i7", name: "Sesame Oil", amount: 1, unit: "tbsp", category: "Pantry", allergyWarning: "Sesame" },
      { id: "i8", name: "Crushed Peanut Topping", amount: 0.25, unit: "cup", category: "Nuts", allergyWarning: "Peanuts" }
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Prep Veggies & Toss",
        text: "Wash, peel, and slice carrots into thin round coins. Break broccoli into small florets.",
        roleTag: "Helper Friendly",
        suggestedRole: "Junior Helper (Kids)"
      },
      {
        stepNumber: 2,
        title: "Whisk Honey Garlic Sauce",
        text: "Measure and whisk together honey, soy sauce, minced garlic, and sesame oil in a small bowl until blended.",
        roleTag: "Helper Friendly",
        suggestedRole: "Sous Chef / Partner"
      },
      {
        stepNumber: 3,
        title: "Sear & Arrange Sheet Pan",
        text: "Preheat oven to 400°F (200°C). Arrange chicken thighs and vegetables in a single layer on a parchment-lined baking pan.",
        roleTag: "Advanced",
        suggestedRole: "Main Cook"
      },
      {
        stepNumber: 4,
        title: "Glaze & Roast",
        text: "Pour honey garlic glaze evenly over chicken and vegetables. Roast in oven for 22-25 minutes until chicken hits 165°F.",
        roleTag: "Advanced",
        suggestedRole: "Main Cook"
      },
      {
        stepNumber: 5,
        title: "Garnish & Serve",
        text: "Sprinkle sesame seeds or crushed peanuts (if allergen-safe) over the warm tray and transfer to dinner plates.",
        roleTag: "Helper Friendly",
        suggestedRole: "Junior Helper (Kids)"
      }
    ],
    cookedItPosts: [
      {
        id: "c1",
        user: "The Martinez Family",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
        date: "2 days ago",
        photoUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=500&q=80",
        comment: "Kids loved helping toss the veggies! We skipped the peanut topping for safety and it was still 10/10 delicious."
      },
      {
        id: "c2",
        user: "Sarah & Ben",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
        date: "Yesterday",
        photoUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=500&q=80",
        comment: "Great quick weeknight dinner! Family Cook Mode made dinner prep take half the time."
      }
    ]
  },
  {
    id: "rec-2",
    title: "Creamy Tuscan Sun-Dried Tomato Pasta",
    description: "Rich 20-minute vegetarian pasta coated in garlic, spinach, parmesan, and sun-dried tomato sauce.",
    coverPhoto: "https://images.unsplash.com/photo-1621996346565-e3def6164286?auto=format&fit=crop&w=600&q=80",
    prepTime: 10,
    cookTime: 15,
    servings: 4,
    author: {
      name: "Marco Vance",
      handle: "@marcovance",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
    },
    tags: ["Under 30 Mins", "Vegetarian", "5 Ingredients"],
    isBookmarked: false,
    ingredients: [
      { id: "i21", name: "Penne Pasta", amount: 12, unit: "oz", category: "Pantry", allergyWarning: "Gluten" },
      { id: "i22", name: "Heavy Cream", amount: 1, unit: "cup", category: "Dairy", allergyWarning: "Lactose / Dairy" },
      { id: "i23", name: "Sun-Dried Tomatoes (chopped)", amount: 0.5, unit: "cup", category: "Pantry" },
      { id: "i24", name: "Fresh Baby Spinach", amount: 3, unit: "cups", category: "Produce" },
      { id: "i25", name: "Grated Parmesan Cheese", amount: 0.75, unit: "cup", category: "Dairy", allergyWarning: "Lactose / Dairy" }
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Boil Pasta",
        text: "Bring a large pot of salted water to a rolling boil. Add pasta and cook for 10 minutes until al dente.",
        roleTag: "Advanced",
        suggestedRole: "Main Cook"
      },
      {
        stepNumber: 2,
        title: "Wash & Tear Spinach",
        text: "Rinse baby spinach leaves under cold water and pat dry. Tear any oversized leaves in half.",
        roleTag: "Helper Friendly",
        suggestedRole: "Junior Helper (Kids)"
      },
      {
        stepNumber: 3,
        title: "Simmer Tuscan Cream Sauce",
        text: "In a skillet, combine heavy cream, chopped sun-dried tomatoes, and garlic over medium heat. Bring to a gentle simmer for 3 mins.",
        roleTag: "Advanced",
        suggestedRole: "Main Cook"
      },
      {
        stepNumber: 4,
        title: "Stir in Cheese & Greens",
        text: "Fold grated parmesan and baby spinach into the simmering cream sauce until cheese melts and greens wilt.",
        roleTag: "Helper Friendly",
        suggestedRole: "Sous Chef / Partner"
      },
      {
        stepNumber: 5,
        title: "Combine & Garnish",
        text: "Drain pasta, toss directly into sauce, and serve warm with extra cracked black pepper.",
        roleTag: "Helper Friendly",
        suggestedRole: "Sous Chef / Partner"
      }
    ],
    cookedItPosts: []
  },
  {
    id: "rec-3",
    title: "Rainbow Fiesta Taco Bowls",
    description: "Customizable taco bowls packed with seasoned black beans, sweet corn, avocado, and fresh cilantro salsa.",
    coverPhoto: "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=600&q=80",
    prepTime: 15,
    cookTime: 10,
    servings: 4,
    author: {
      name: "Sofia Chen",
      handle: "@sofiacooking",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"
    },
    tags: ["Vegetarian", "Under 30 Mins", "Kid Friendly"],
    isBookmarked: true,
    ingredients: [
      { id: "i31", name: "Jasmine Rice", amount: 2, unit: "cups", category: "Pantry" },
      { id: "i32", name: "Black Beans (drained)", amount: 1, unit: "can (15oz)", category: "Pantry" },
      { id: "i33", name: "Sweet Corn Kernels", amount: 1, unit: "cup", category: "Produce" },
      { id: "i34", name: "Ripe Avocados (diced)", amount: 2, unit: "whole", category: "Produce" },
      { id: "i35", name: "Tortilla Chips", amount: 2, unit: "cups", category: "Snacks" },
      { id: "i36", name: "Shredded Cheddar Cheese", amount: 1, unit: "cup", category: "Dairy", allergyWarning: "Lactose / Dairy" }
    ],
    steps: [
      {
        stepNumber: 1,
        title: "Rice Cooker Setup",
        text: "Rinse jasmine rice in water, add to rice cooker with 2 cups water, and press start.",
        roleTag: "Helper Friendly",
        suggestedRole: "Junior Helper (Kids)"
      },
      {
        stepNumber: 2,
        title: "Heat Seasoned Beans & Corn",
        text: "Warm black beans with cumin and garlic powder in a small saucepan until steaming hot.",
        roleTag: "Advanced",
        suggestedRole: "Main Cook"
      },
      {
        stepNumber: 3,
        title: "Dice Avocados & Limes",
        text: "Carefully dice avocados and slice limes into wedges for squeezing.",
        roleTag: "Helper Friendly",
        suggestedRole: "Sous Chef / Partner"
      },
      {
        stepNumber: 4,
        title: "Build the DIY Fiesta Bowls",
        text: "Lay out bowls with rice base, then let everyone customize their toppings with beans, corn, avocado, and chips!",
        roleTag: "Helper Friendly",
        suggestedRole: "Junior Helper (Kids)"
      }
    ],
    cookedItPosts: []
  }
];

export const INITIAL_HOUSEHOLD = {
  familyName: "The Miller Household",
  members: [
    {
      id: "m1",
      name: "Sarah (Mom)",
      role: "Main Cook",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      isPresent: true,
      bio: "Master of weeknight 30-minute meals."
    },
    {
      id: "m2",
      name: "David (Dad)",
      role: "Sous Chef / Partner",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      isPresent: true,
      bio: "Chop master and glaze manager."
    },
    {
      id: "m3",
      name: "Leo (Age 9)",
      role: "Junior Helper (Kids)",
      avatar: "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?auto=format&fit=crop&w=200&q=80",
      isPresent: true,
      bio: "Loves measuring spices and plating bowls."
    },
    {
      id: "m4",
      name: "Mia (Age 6)",
      role: "Junior Helper (Kids)",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
      isPresent: false,
      bio: "Chief official taste tester!"
    }
  ],
  allergiesAndDiets: [
    { memberId: "m3", memberName: "Leo", allergy: "Peanuts", severity: "Severe (Anaphylactic)" },
    { memberId: "m4", memberName: "Mia", allergy: "Lactose / Dairy", severity: "Moderate" }
  ]
};

export const CULINARY_SUBSTITUTIONS = {
  Peanuts: [
    { original: "Crushed Peanut Topping", replacement: "Toasted Sunflower Seeds or Roasted Pumpkin Seeds", note: "Provides identical crunch without nut allergens." },
    { original: "Peanut Butter", replacement: "SunButter (Sunflower Seed Butter) or Tahini", note: "Great 1:1 flavor profile in sauces and glazes." }
  ],
  "Lactose / Dairy": [
    { original: "Heavy Cream", replacement: "Full-Fat Coconut Milk or Oat Cream", note: "Achieves identical rich, creamy sauce texture." },
    { original: "Parmesan Cheese", replacement: "Nutritional Yeast Flakes or Vegan Parmesan", note: "Delivers savory, umami cheesy note without dairy." },
    { original: "Shredded Cheddar Cheese", replacement: "Dairy-Free Shredded Mozzarella / Cheddar", note: "Melts easily over taco bowls." }
  ],
  Gluten: [
    { original: "Soy Sauce", replacement: "Tamari (Gluten-Free) or Coconut Aminos", note: "Rich umami flavor with zero wheat." },
    { original: "Penne Pasta", replacement: "Gluten-Free Brown Rice Penne or Chickpea Pasta", note: "Holds sauce beautifully while gluten-free." }
  ],
  Sesame: [
    { original: "Sesame Oil", replacement: "Toasted Avocado Oil or Olive Oil", note: "Mild oil base safe for sesame sensitivity." }
  ]
};
