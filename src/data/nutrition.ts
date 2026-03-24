export interface Meal {
  time: string;
  name: string;
  description: string;
  macros: {
    protein: number;
    carbs: number;
    fats: number;
    calories: number;
  };
}

export interface MealPlan {
  id: string;
  name: string;
  goal: 'weight-loss' | 'muscle-gain' | 'maintenance';
  description: string;
  dailyCalories: number;
  macroRatio: {
    protein: number;
    carbs: number;
    fats: number;
  };
  vegMeals: Meal[];
  nonVegMeals: Meal[];
}

export const mealPlans: MealPlan[] = [
  {
    id: 'weight-loss',
    name: 'Weight Loss Plan',
    goal: 'weight-loss',
    description: 'A calorie-deficit diet focused on high protein and fiber to keep you full while losing fat.',
    dailyCalories: 1800,
    macroRatio: { protein: 40, carbs: 30, fats: 30 },
    nonVegMeals: [
      {
        time: '7:00 AM',
        name: 'Breakfast',
        description: 'Scrambled eggs (3 whites, 1 whole) with spinach and whole grain toast',
        macros: { protein: 25, carbs: 20, fats: 8, calories: 280 }
      },
      {
        time: '10:00 AM',
        name: 'Mid-Morning Snack',
        description: 'Greek yogurt with berries and a handful of almonds',
        macros: { protein: 15, carbs: 18, fats: 10, calories: 220 }
      },
      {
        time: '1:00 PM',
        name: 'Lunch',
        description: 'Grilled chicken breast with quinoa and roasted vegetables',
        macros: { protein: 40, carbs: 35, fats: 12, calories: 420 }
      },
      {
        time: '4:00 PM',
        name: 'Afternoon Snack',
        description: 'Protein shake with banana',
        macros: { protein: 25, carbs: 25, fats: 3, calories: 230 }
      },
      {
        time: '7:00 PM',
        name: 'Dinner',
        description: 'Baked salmon with steamed broccoli and sweet potato',
        macros: { protein: 35, carbs: 30, fats: 18, calories: 430 }
      },
      {
        time: '9:00 PM',
        name: 'Evening Snack',
        description: 'Cottage cheese with cucumber slices',
        macros: { protein: 20, carbs: 5, fats: 5, calories: 150 }
      }
    ],
    vegMeals: [
      {
        time: '7:00 AM',
        name: 'Breakfast',
        description: 'Tofu scramble with vegetables and whole grain toast',
        macros: { protein: 20, carbs: 25, fats: 10, calories: 280 }
      },
      {
        time: '10:00 AM',
        name: 'Mid-Morning Snack',
        description: 'Plant-based yogurt with berries and walnuts',
        macros: { protein: 12, carbs: 20, fats: 12, calories: 230 }
      },
      {
        time: '1:00 PM',
        name: 'Lunch',
        description: 'Chickpea salad with quinoa and mixed greens',
        macros: { protein: 25, carbs: 40, fats: 14, calories: 400 }
      },
      {
        time: '4:00 PM',
        name: 'Afternoon Snack',
        description: 'Plant protein shake with banana',
        macros: { protein: 22, carbs: 28, fats: 4, calories: 240 }
      },
      {
        time: '7:00 PM',
        name: 'Dinner',
        description: 'Lentil curry with brown rice and steamed vegetables',
        macros: { protein: 30, carbs: 45, fats: 10, calories: 400 }
      },
      {
        time: '9:00 PM',
        name: 'Evening Snack',
        description: 'Hummus with carrot and celery sticks',
        macros: { protein: 8, carbs: 15, fats: 8, calories: 160 }
      }
    ]
  },
  {
    id: 'muscle-gain',
    name: 'Muscle Gain Plan',
    goal: 'muscle-gain',
    description: 'A calorie-surplus diet with high protein to support muscle growth and recovery.',
    dailyCalories: 3000,
    macroRatio: { protein: 35, carbs: 45, fats: 20 },
    nonVegMeals: [
      {
        time: '7:00 AM',
        name: 'Breakfast',
        description: 'Oatmeal with whole eggs, banana, and peanut butter',
        macros: { protein: 30, carbs: 60, fats: 20, calories: 540 }
      },
      {
        time: '10:00 AM',
        name: 'Mid-Morning Snack',
        description: 'Protein smoothie with oats, banana, and whole milk',
        macros: { protein: 35, carbs: 50, fats: 12, calories: 450 }
      },
      {
        time: '1:00 PM',
        name: 'Lunch',
        description: 'Double chicken breast with rice, avocado, and vegetables',
        macros: { protein: 55, carbs: 65, fats: 22, calories: 680 }
      },
      {
        time: '4:00 PM',
        name: 'Pre-Workout',
        description: 'Turkey sandwich with whole grain bread and fruit',
        macros: { protein: 30, carbs: 45, fats: 10, calories: 390 }
      },
      {
        time: '7:00 PM',
        name: 'Post-Workout Dinner',
        description: 'Lean beef steak with mashed potatoes and asparagus',
        macros: { protein: 50, carbs: 55, fats: 18, calories: 580 }
      },
      {
        time: '9:30 PM',
        name: 'Before Bed',
        description: 'Casein shake with almond butter',
        macros: { protein: 35, carbs: 15, fats: 15, calories: 330 }
      }
    ],
    vegMeals: [
      {
        time: '7:00 AM',
        name: 'Breakfast',
        description: 'Oatmeal with plant protein, banana, almond butter, and seeds',
        macros: { protein: 28, carbs: 65, fats: 22, calories: 560 }
      },
      {
        time: '10:00 AM',
        name: 'Mid-Morning Snack',
        description: 'Protein smoothie with soy milk, oats, and mixed berries',
        macros: { protein: 30, carbs: 55, fats: 10, calories: 430 }
      },
      {
        time: '1:00 PM',
        name: 'Lunch',
        description: 'Tempeh stir-fry with brown rice and mixed vegetables',
        macros: { protein: 40, carbs: 70, fats: 18, calories: 600 }
      },
      {
        time: '4:00 PM',
        name: 'Pre-Workout',
        description: 'Whole grain toast with hummus, avocado, and fruit',
        macros: { protein: 18, carbs: 55, fats: 16, calories: 430 }
      },
      {
        time: '7:00 PM',
        name: 'Post-Workout Dinner',
        description: 'Black bean burrito bowl with quinoa, guacamole, and salsa',
        macros: { protein: 35, carbs: 75, fats: 20, calories: 620 }
      },
      {
        time: '9:30 PM',
        name: 'Before Bed',
        description: 'Casein alternative shake with peanut butter',
        macros: { protein: 30, carbs: 18, fats: 16, calories: 340 }
      }
    ]
  },
  {
    id: 'maintenance',
    name: 'Maintenance Plan',
    goal: 'maintenance',
    description: 'A balanced diet to maintain current weight while supporting an active lifestyle.',
    dailyCalories: 2400,
    macroRatio: { protein: 30, carbs: 40, fats: 30 },
    nonVegMeals: [
      {
        time: '7:00 AM',
        name: 'Breakfast',
        description: 'Eggs with whole grain toast, avocado, and fruit',
        macros: { protein: 22, carbs: 35, fats: 18, calories: 390 }
      },
      {
        time: '10:00 AM',
        name: 'Mid-Morning Snack',
        description: 'Greek yogurt with granola and honey',
        macros: { protein: 18, carbs: 30, fats: 8, calories: 260 }
      },
      {
        time: '1:00 PM',
        name: 'Lunch',
        description: 'Grilled fish with sweet potato and salad',
        macros: { protein: 40, carbs: 45, fats: 15, calories: 475 }
      },
      {
        time: '4:00 PM',
        name: 'Afternoon Snack',
        description: 'Apple with almond butter and protein bar',
        macros: { protein: 20, carbs: 30, fats: 14, calories: 320 }
      },
      {
        time: '7:00 PM',
        name: 'Dinner',
        description: 'Chicken thighs with roasted vegetables and rice',
        macros: { protein: 42, carbs: 50, fats: 20, calories: 550 }
      },
      {
        time: '9:00 PM',
        name: 'Evening Snack',
        description: 'Cottage cheese with mixed nuts',
        macros: { protein: 20, carbs: 8, fats: 15, calories: 245 }
      }
    ],
    vegMeals: [
      {
        time: '7:00 AM',
        name: 'Breakfast',
        description: 'Tofu scramble with whole grain toast and avocado',
        macros: { protein: 20, carbs: 38, fats: 18, calories: 390 }
      },
      {
        time: '10:00 AM',
        name: 'Mid-Morning Snack',
        description: 'Coconut yogurt with granola and fresh fruit',
        macros: { protein: 12, carbs: 35, fats: 12, calories: 290 }
      },
      {
        time: '1:00 PM',
        name: 'Lunch',
        description: 'Falafel bowl with hummus, tabbouleh, and pita',
        macros: { protein: 25, carbs: 55, fats: 18, calories: 480 }
      },
      {
        time: '4:00 PM',
        name: 'Afternoon Snack',
        description: 'Trail mix with dried fruit and protein bar',
        macros: { protein: 18, carbs: 35, fats: 16, calories: 350 }
      },
      {
        time: '7:00 PM',
        name: 'Dinner',
        description: 'Paneer tikka with naan and vegetable curry',
        macros: { protein: 35, carbs: 50, fats: 22, calories: 535 }
      },
      {
        time: '9:00 PM',
        name: 'Evening Snack',
        description: 'Edamame with a handful of cashews',
        macros: { protein: 18, carbs: 12, fats: 14, calories: 240 }
      }
    ]
  }
];

export const macroInfo = {
  protein: {
    name: 'Protein',
    color: 'primary',
    description: 'Essential for muscle repair and growth. Aim for 1.6-2.2g per kg of body weight for muscle building.',
    sources: ['Chicken', 'Fish', 'Eggs', 'Greek Yogurt', 'Tofu', 'Lentils', 'Whey Protein']
  },
  carbs: {
    name: 'Carbohydrates',
    color: 'accent',
    description: 'Your body\'s primary energy source. Choose complex carbs for sustained energy.',
    sources: ['Oats', 'Brown Rice', 'Sweet Potato', 'Quinoa', 'Whole Grain Bread', 'Fruits']
  },
  fats: {
    name: 'Healthy Fats',
    color: 'secondary',
    description: 'Essential for hormone production and nutrient absorption. Focus on unsaturated fats.',
    sources: ['Avocado', 'Nuts', 'Olive Oil', 'Salmon', 'Chia Seeds', 'Eggs']
  }
};
