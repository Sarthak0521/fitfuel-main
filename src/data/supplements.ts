export interface Supplement {
  id: string;
  name: string;
  category: 'protein' | 'creatine' | 'bcaa' | 'multivitamins' | 'omega3';
  whatIsIt: string;
  benefits: string[];
  howToConsume: string;
  dosage: string;
  sideEffects: string[];
  whoShouldTake: string[];
  whoShouldAvoid: string[];
}

export const supplements: Supplement[] = [
  // Protein
  {
    id: 'whey-protein',
    name: 'Whey Protein',
    category: 'protein',
    whatIsIt: 'A fast-digesting protein derived from milk during cheese production. It contains all essential amino acids and is quickly absorbed by the body.',
    benefits: [
      'Promotes muscle growth and recovery',
      'Convenient source of high-quality protein',
      'Helps meet daily protein requirements',
      'May support weight management',
      'Contains branched-chain amino acids (BCAAs)'
    ],
    howToConsume: 'Mix one scoop (25-30g) with water, milk, or blend into smoothies. Best consumed within 30 minutes post-workout or as a snack between meals.',
    dosage: '25-50g per day, depending on protein needs',
    sideEffects: [
      'Bloating or gas in some individuals',
      'May cause digestive issues for lactose-intolerant people',
      'Possible kidney stress with excessive intake'
    ],
    whoShouldTake: [
      'Anyone struggling to meet protein needs through food',
      'Athletes and regular gym-goers',
      'People looking to build muscle mass',
      'Those wanting convenient post-workout nutrition'
    ],
    whoShouldAvoid: [
      'People with dairy allergies or severe lactose intolerance',
      'Those with kidney disease (consult doctor)',
      'Individuals with liver conditions'
    ]
  },
  {
    id: 'casein-protein',
    name: 'Casein Protein',
    category: 'protein',
    whatIsIt: 'A slow-digesting protein that makes up 80% of milk protein. It forms a gel in the stomach, providing sustained amino acid release over several hours.',
    benefits: [
      'Sustained protein release for hours',
      'Excellent for overnight muscle recovery',
      'Helps reduce muscle breakdown',
      'Keeps you feeling full longer',
      'Complete amino acid profile'
    ],
    howToConsume: 'Mix one scoop with water or milk. Best taken before bed or between meals when you need sustained protein release.',
    dosage: '25-40g per serving, typically once daily before bed',
    sideEffects: [
      'Slower digestion may cause discomfort for some',
      'Not suitable for lactose intolerant individuals',
      'May cause bloating'
    ],
    whoShouldTake: [
      'Those looking for overnight muscle recovery',
      'People who need to go long periods without eating',
      'Athletes in muscle-building phases'
    ],
    whoShouldAvoid: [
      'Dairy allergic individuals',
      'Those needing quick protein absorption post-workout',
      'People with digestive sensitivities'
    ]
  },
  {
    id: 'plant-protein',
    name: 'Plant-Based Protein',
    category: 'protein',
    whatIsIt: 'Protein derived from plants like pea, rice, hemp, or soy. Often blended to provide a complete amino acid profile similar to animal proteins.',
    benefits: [
      'Suitable for vegans and vegetarians',
      'Easier to digest than dairy proteins',
      'Environmentally sustainable',
      'Often hypoallergenic',
      'Contains fiber and other plant nutrients'
    ],
    howToConsume: 'Mix one scoop (25-30g) with water, plant milk, or add to smoothies. Can be used any time of day.',
    dosage: '25-50g per day based on individual needs',
    sideEffects: [
      'May have grainier texture than whey',
      'Some blends may have strong taste',
      'Possible digestive issues with certain plant sources'
    ],
    whoShouldTake: [
      'Vegans and vegetarians',
      'Those with dairy allergies or lactose intolerance',
      'Anyone seeking sustainable protein sources',
      'People with sensitive stomachs'
    ],
    whoShouldAvoid: [
      'Those allergic to specific plants (soy, pea)',
      'People who prefer smoother texture proteins'
    ]
  },

  // Creatine
  {
    id: 'creatine-monohydrate',
    name: 'Creatine Monohydrate',
    category: 'creatine',
    whatIsIt: 'A naturally occurring compound found in muscle cells that helps produce energy during high-intensity exercise. The most researched and proven supplement for strength and power.',
    benefits: [
      'Increases strength and power output',
      'Enhances muscle mass and size',
      'Improves high-intensity exercise performance',
      'Speeds up muscle recovery',
      'May support brain function'
    ],
    howToConsume: 'Mix 3-5g with water, juice, or your protein shake. Take daily at any time - consistency matters more than timing.',
    dosage: '3-5g daily (loading phase optional: 20g/day for 5-7 days)',
    sideEffects: [
      'Initial water retention and weight gain',
      'Possible stomach cramping if taken without enough water',
      'Rare reports of muscle cramping'
    ],
    whoShouldTake: [
      'Strength and power athletes',
      'Anyone looking to increase muscle mass',
      'High-intensity sports participants',
      'Those seeking improved workout performance'
    ],
    whoShouldAvoid: [
      'People with kidney disease (consult doctor first)',
      'Those with liver issues',
      'Individuals under 18 (generally advised)'
    ]
  },

  // BCAA
  {
    id: 'bcaa',
    name: 'BCAA (Branched-Chain Amino Acids)',
    category: 'bcaa',
    whatIsIt: 'Three essential amino acids - leucine, isoleucine, and valine - that play key roles in muscle protein synthesis and energy production during exercise.',
    benefits: [
      'Reduces muscle soreness after exercise',
      'Decreases exercise fatigue',
      'Supports muscle protein synthesis',
      'May help preserve muscle during caloric deficit',
      'Provides energy during long workouts'
    ],
    howToConsume: 'Mix 5-10g with water and sip during workouts, or take before/after training. Can be consumed on rest days as well.',
    dosage: '5-10g per day, ideally around workouts',
    sideEffects: [
      'Generally well-tolerated',
      'May cause nausea if taken on empty stomach',
      'Possible fatigue with excessive use'
    ],
    whoShouldTake: [
      'Those training in a fasted state',
      'Athletes with intense training schedules',
      'People on calorie-restricted diets',
      'Endurance athletes'
    ],
    whoShouldAvoid: [
      'Those already getting sufficient protein from whole foods',
      'People with ALS or maple syrup urine disease',
      'Pregnant or breastfeeding women (consult doctor)'
    ]
  },

  // Multivitamins
  {
    id: 'multivitamin',
    name: 'Multivitamin for Athletes',
    category: 'multivitamins',
    whatIsIt: 'A comprehensive supplement containing essential vitamins and minerals formulated for active individuals with higher nutrient demands.',
    benefits: [
      'Fills nutritional gaps in diet',
      'Supports immune system function',
      'Aids energy metabolism',
      'Promotes recovery and overall health',
      'Supports bone and joint health'
    ],
    howToConsume: 'Take 1-2 tablets/capsules with a meal containing fat for better absorption. Usually once or twice daily.',
    dosage: 'Follow product label - typically 1-2 servings daily with meals',
    sideEffects: [
      'Possible nausea if taken on empty stomach',
      'Some vitamins may cause bright urine color',
      'Risk of overdose with excessive intake'
    ],
    whoShouldTake: [
      'Anyone with dietary restrictions',
      'Athletes with high training volumes',
      'Those who struggle to eat a varied diet',
      'Vegetarians and vegans'
    ],
    whoShouldAvoid: [
      'Those already taking individual vitamin supplements (risk of overdose)',
      'People with certain medical conditions (consult doctor)'
    ]
  },

  // Omega-3
  {
    id: 'fish-oil',
    name: 'Omega-3 Fish Oil',
    category: 'omega3',
    whatIsIt: 'Essential fatty acids (EPA and DHA) derived from fatty fish. These cannot be produced by the body and must be obtained through diet or supplementation.',
    benefits: [
      'Reduces inflammation and joint pain',
      'Supports heart health',
      'Improves brain function and mood',
      'May enhance muscle protein synthesis',
      'Supports eye health'
    ],
    howToConsume: 'Take capsules with meals to reduce fishy burps and improve absorption. Can be taken any time of day.',
    dosage: '1-3g of combined EPA/DHA daily',
    sideEffects: [
      'Fishy aftertaste or burps',
      'Possible digestive upset',
      'May thin blood (caution with blood thinners)'
    ],
    whoShouldTake: [
      'Those who don\'t eat fatty fish regularly',
      'Athletes looking to reduce inflammation',
      'Anyone seeking cardiovascular benefits',
      'People with joint discomfort'
    ],
    whoShouldAvoid: [
      'Those allergic to fish or shellfish',
      'People on blood-thinning medications (consult doctor)',
      'Those scheduled for surgery (may increase bleeding)'
    ]
  },
  {
    id: 'algae-omega3',
    name: 'Algae-Based Omega-3',
    category: 'omega3',
    whatIsIt: 'A plant-based source of EPA and DHA derived from algae. Fish get their omega-3s from algae, making this a direct and sustainable vegan alternative.',
    benefits: [
      'Same EPA/DHA benefits as fish oil',
      'Vegan and vegetarian friendly',
      'Sustainable and environmentally conscious',
      'No risk of ocean contaminants',
      'No fishy taste or smell'
    ],
    howToConsume: 'Take capsules with a meal. Follow product label for specific dosing.',
    dosage: '250-500mg of combined EPA/DHA daily',
    sideEffects: [
      'Generally well-tolerated',
      'Rare digestive discomfort',
      'May thin blood slightly'
    ],
    whoShouldTake: [
      'Vegans and vegetarians',
      'Those with fish allergies',
      'Anyone preferring sustainable options',
      'People who dislike fish oil taste'
    ],
    whoShouldAvoid: [
      'Those on blood thinners (consult doctor)',
      'People with algae allergies'
    ]
  }
];

export const supplementCategories = [
  { id: 'protein', name: 'Protein', icon: '🥛', description: 'Essential for muscle building and recovery' },
  { id: 'creatine', name: 'Creatine', icon: '⚡', description: 'Boost strength and power output' },
  { id: 'bcaa', name: 'BCAA', icon: '💊', description: 'Branch-chain amino acids for muscle support' },
  { id: 'multivitamins', name: 'Multivitamins', icon: '🌈', description: 'Fill nutritional gaps in your diet' },
  { id: 'omega3', name: 'Omega-3', icon: '🐟', description: 'Essential fatty acids for overall health' }
] as const;
