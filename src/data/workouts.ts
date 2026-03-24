export interface Workout {
  id: string;
  name: string;
  category: 'chest' | 'back' | 'legs' | 'arms' | 'core' | 'cardio';
  level: 'beginner' | 'intermediate' | 'advanced';
  targetMuscle: string;
  sets: number;
  reps: string;
  tips: string;
  description: string;
}

export const workouts: Workout[] = [
  // Chest
  {
    id: 'push-ups',
    name: 'Push-Ups',
    category: 'chest',
    level: 'beginner',
    targetMuscle: 'Chest, Shoulders, Triceps',
    sets: 3,
    reps: '10-15',
    tips: 'Keep your body in a straight line. Lower yourself until your chest nearly touches the floor.',
    description: 'A classic bodyweight exercise that builds upper body strength.'
  },
  {
    id: 'bench-press',
    name: 'Barbell Bench Press',
    category: 'chest',
    level: 'intermediate',
    targetMuscle: 'Chest, Shoulders, Triceps',
    sets: 4,
    reps: '8-12',
    tips: 'Keep your feet flat on the floor and maintain a slight arch in your lower back.',
    description: 'The king of chest exercises for building mass and strength.'
  },
  {
    id: 'incline-dumbbell-press',
    name: 'Incline Dumbbell Press',
    category: 'chest',
    level: 'intermediate',
    targetMuscle: 'Upper Chest, Shoulders',
    sets: 3,
    reps: '10-12',
    tips: 'Set the bench at 30-45 degrees. Focus on squeezing at the top.',
    description: 'Targets the upper chest for a fuller, more developed look.'
  },
  {
    id: 'cable-flyes',
    name: 'Cable Flyes',
    category: 'chest',
    level: 'advanced',
    targetMuscle: 'Chest',
    sets: 3,
    reps: '12-15',
    tips: 'Keep a slight bend in your elbows throughout the movement.',
    description: 'Isolation exercise for maximum chest contraction.'
  },

  // Back
  {
    id: 'pull-ups',
    name: 'Pull-Ups',
    category: 'back',
    level: 'intermediate',
    targetMuscle: 'Lats, Biceps, Upper Back',
    sets: 3,
    reps: '6-10',
    tips: 'Start from a dead hang and pull until your chin is over the bar.',
    description: 'The ultimate back builder using your body weight.'
  },
  {
    id: 'lat-pulldown',
    name: 'Lat Pulldown',
    category: 'back',
    level: 'beginner',
    targetMuscle: 'Lats, Biceps',
    sets: 3,
    reps: '10-12',
    tips: 'Pull the bar to your upper chest, not behind your neck.',
    description: 'Great for building lat width and beginner-friendly.'
  },
  {
    id: 'bent-over-row',
    name: 'Bent Over Barbell Row',
    category: 'back',
    level: 'intermediate',
    targetMuscle: 'Upper Back, Lats, Rear Delts',
    sets: 4,
    reps: '8-10',
    tips: 'Keep your back flat and pull the bar to your lower chest.',
    description: 'Compound movement for overall back thickness.'
  },
  {
    id: 'deadlift',
    name: 'Conventional Deadlift',
    category: 'back',
    level: 'advanced',
    targetMuscle: 'Lower Back, Glutes, Hamstrings',
    sets: 4,
    reps: '5-8',
    tips: 'Keep the bar close to your body and drive through your heels.',
    description: 'The king of all exercises for full posterior chain development.'
  },

  // Legs
  {
    id: 'squats',
    name: 'Barbell Back Squat',
    category: 'legs',
    level: 'intermediate',
    targetMuscle: 'Quads, Glutes, Hamstrings',
    sets: 4,
    reps: '8-12',
    tips: 'Keep your chest up and knees tracking over your toes.',
    description: 'The fundamental lower body exercise for strength and size.'
  },
  {
    id: 'leg-press',
    name: 'Leg Press',
    category: 'legs',
    level: 'beginner',
    targetMuscle: 'Quads, Glutes',
    sets: 3,
    reps: '12-15',
    tips: 'Don\'t lock out your knees at the top of the movement.',
    description: 'Machine exercise great for safely building leg strength.'
  },
  {
    id: 'lunges',
    name: 'Walking Lunges',
    category: 'legs',
    level: 'beginner',
    targetMuscle: 'Quads, Glutes, Hamstrings',
    sets: 3,
    reps: '10 each leg',
    tips: 'Keep your torso upright and take controlled steps.',
    description: 'Functional exercise for balance and leg development.'
  },
  {
    id: 'romanian-deadlift',
    name: 'Romanian Deadlift',
    category: 'legs',
    level: 'intermediate',
    targetMuscle: 'Hamstrings, Glutes, Lower Back',
    sets: 3,
    reps: '10-12',
    tips: 'Push your hips back while keeping a slight bend in your knees.',
    description: 'Excellent for hamstring development and hip hinge pattern.'
  },

  // Arms
  {
    id: 'bicep-curls',
    name: 'Dumbbell Bicep Curls',
    category: 'arms',
    level: 'beginner',
    targetMuscle: 'Biceps',
    sets: 3,
    reps: '10-12',
    tips: 'Keep your elbows pinned to your sides and avoid swinging.',
    description: 'Classic isolation exercise for bicep development.'
  },
  {
    id: 'tricep-dips',
    name: 'Tricep Dips',
    category: 'arms',
    level: 'intermediate',
    targetMuscle: 'Triceps, Chest, Shoulders',
    sets: 3,
    reps: '8-12',
    tips: 'Keep your elbows pointing backward, not flared out.',
    description: 'Compound bodyweight movement for tricep strength.'
  },
  {
    id: 'hammer-curls',
    name: 'Hammer Curls',
    category: 'arms',
    level: 'beginner',
    targetMuscle: 'Biceps, Forearms',
    sets: 3,
    reps: '10-12',
    tips: 'Keep your palms facing each other throughout the movement.',
    description: 'Targets the brachialis for overall arm thickness.'
  },
  {
    id: 'skull-crushers',
    name: 'Skull Crushers',
    category: 'arms',
    level: 'intermediate',
    targetMuscle: 'Triceps',
    sets: 3,
    reps: '10-12',
    tips: 'Keep your upper arms stationary and only move your forearms.',
    description: 'Effective isolation exercise for tricep long head.'
  },

  // Core
  {
    id: 'planks',
    name: 'Plank Hold',
    category: 'core',
    level: 'beginner',
    targetMuscle: 'Core, Shoulders, Back',
    sets: 3,
    reps: '30-60 sec',
    tips: 'Keep your body in a straight line from head to heels.',
    description: 'Isometric exercise for core stability and endurance.'
  },
  {
    id: 'crunches',
    name: 'Crunches',
    category: 'core',
    level: 'beginner',
    targetMuscle: 'Abs',
    sets: 3,
    reps: '15-20',
    tips: 'Focus on contracting your abs, not pulling your neck.',
    description: 'Classic ab exercise targeting the rectus abdominis.'
  },
  {
    id: 'hanging-leg-raises',
    name: 'Hanging Leg Raises',
    category: 'core',
    level: 'advanced',
    targetMuscle: 'Lower Abs, Hip Flexors',
    sets: 3,
    reps: '10-15',
    tips: 'Control the movement and avoid swinging.',
    description: 'Advanced exercise for lower ab development.'
  },
  {
    id: 'russian-twists',
    name: 'Russian Twists',
    category: 'core',
    level: 'intermediate',
    targetMuscle: 'Obliques, Abs',
    sets: 3,
    reps: '20 total',
    tips: 'Keep your chest lifted and rotate from your core.',
    description: 'Rotational exercise for oblique strength.'
  },

  // Cardio
  {
    id: 'jump-rope',
    name: 'Jump Rope',
    category: 'cardio',
    level: 'beginner',
    targetMuscle: 'Full Body, Calves',
    sets: 3,
    reps: '1-2 min',
    tips: 'Land softly on the balls of your feet and keep wrists relaxed.',
    description: 'High-calorie burning cardio that improves coordination.'
  },
  {
    id: 'burpees',
    name: 'Burpees',
    category: 'cardio',
    level: 'intermediate',
    targetMuscle: 'Full Body',
    sets: 3,
    reps: '10-15',
    tips: 'Maintain a steady pace and focus on form over speed.',
    description: 'Full body conditioning exercise that burns serious calories.'
  },
  {
    id: 'mountain-climbers',
    name: 'Mountain Climbers',
    category: 'cardio',
    level: 'beginner',
    targetMuscle: 'Core, Shoulders, Legs',
    sets: 3,
    reps: '30 sec',
    tips: 'Keep your hips down and drive your knees toward your chest.',
    description: 'Dynamic exercise combining cardio with core work.'
  },
  {
    id: 'hiit-sprints',
    name: 'HIIT Sprints',
    category: 'cardio',
    level: 'advanced',
    targetMuscle: 'Legs, Cardiovascular System',
    sets: 6,
    reps: '30 sec sprint / 30 sec rest',
    tips: 'Warm up properly and gradually increase intensity.',
    description: 'High-intensity interval training for maximum fat burn.'
  }
];

export const categories = [
  { id: 'chest', name: 'Chest', icon: '💪' },
  { id: 'back', name: 'Back', icon: '🔙' },
  { id: 'legs', name: 'Legs', icon: '🦵' },
  { id: 'arms', name: 'Arms', icon: '💪' },
  { id: 'core', name: 'Core', icon: '🎯' },
  { id: 'cardio', name: 'Cardio', icon: '❤️' }
] as const;

export const levels = [
  { id: 'beginner', name: 'Beginner', color: 'primary' },
  { id: 'intermediate', name: 'Intermediate', color: 'accent' },
  { id: 'advanced', name: 'Advanced', color: 'destructive' }
] as const;
