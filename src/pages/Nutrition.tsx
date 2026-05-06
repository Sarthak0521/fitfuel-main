import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { mealPlans, macroInfo, type MealPlan } from "@/data/nutrition";
import { Utensils, Leaf, Drumstick, Clock, Flame, LogIn } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import PersonalizedPlan from "@/components/nutrition/PersonalizedPlan";

const Nutrition = () => {
  const { isAuthenticated, user } = useAuth();
  const [selectedGoal, setSelectedGoal] = useState<MealPlan["goal"]>("muscle-gain");
  const [isVeg, setIsVeg] = useState(false);

  // Use user's goal if authenticated
  const effectiveGoal = isAuthenticated && user ? 
    (user.goal === "lose" ? "weight-loss" : user.goal === "gain" ? "muscle-gain" : "maintenance") as MealPlan["goal"] 
    : selectedGoal;

  const activePlan = mealPlans.find((p) => p.goal === effectiveGoal) || mealPlans[0];
  const meals = isVeg ? activePlan.vegMeals : activePlan.nonVegMeals;

  const macroData = [
    { name: "Protein", value: activePlan.macroRatio.protein, color: "hsl(142, 76%, 46%)" },
    { name: "Carbs", value: activePlan.macroRatio.carbs, color: "hsl(30, 100%, 55%)" },
    { name: "Fats", value: activePlan.macroRatio.fats, color: "hsl(0, 27.70%, 39.60%)" },
  ];

  const goalIcons = {
    "weight-loss": "🔥",
    "muscle-gain": "💪",
    maintenance: "⚖️",
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 md:py-24 bg-card border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Nutrition <span className="text-primary">Plans</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Fuel your goals with our carefully crafted meal plans. Choose your goal, 
              dietary preference, and get a complete daily schedule.
            </p>
          </div>
        </div>
      </section>

      {/* Personalized Plan Section */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          {isAuthenticated ? (
            <PersonalizedPlan />
          ) : (
            <div className="p-6 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="font-display text-xl font-bold mb-1">Get Your Personalized Diet Plan</h3>
                  <p className="text-muted-foreground">
                    Login or create an account to get a diet plan tailored to your BMI, goals, and workout intensity.
                  </p>
                </div>
                <Link to="/login">
                  <Button variant="hero">
                    <LogIn className="w-4 h-4 mr-2" /> Login / Register
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-background border-b border-border sticky top-16 md:top-20 z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Goal Selection */}
            <div className="flex flex-wrap gap-3">
              {mealPlans.map((plan) => (
                <Button
                  key={plan.goal}
                  variant={effectiveGoal === plan.goal ? "default" : "outline"}
                  onClick={() => setSelectedGoal(plan.goal)}
                  disabled={isAuthenticated}
                >
                  <span className="mr-2">{goalIcons[plan.goal]}</span>
                  {plan.name.replace(" Plan", "")}
                  {isAuthenticated && effectiveGoal === plan.goal && (
                    <span className="ml-2 text-xs opacity-70">(Your Goal)</span>
                  )}
                </Button>
              ))}
            </div>

            {/* Veg Toggle */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border">
              <Drumstick className={`w-5 h-5 ${!isVeg ? "text-primary" : "text-muted-foreground"}`} />
              <Switch checked={isVeg} onCheckedChange={setIsVeg} />
              <Leaf className={`w-5 h-5 ${isVeg ? "text-primary" : "text-muted-foreground"}`} />
              <span className="text-sm font-medium">{isVeg ? "Vegetarian" : "Non-Veg"}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Plan Overview */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Plan Info */}
            <div className="lg:col-span-2">
              <div className="p-6 rounded-2xl bg-card border border-border mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-xl gradient-primary flex items-center justify-center">
                    <Utensils className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div>
                    <h2 className="font-display text-2xl font-bold">{activePlan.name}</h2>
                    <p className="text-muted-foreground">{activePlan.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-lg">
                  <Flame className="w-5 h-5 text-accent" />
                  <span className="font-semibold">{activePlan.dailyCalories}</span>
                  <span className="text-muted-foreground">calories/day</span>
                </div>
              </div>

              {/* Meal Schedule */}
              <h3 className="font-display text-xl font-semibold mb-6">Daily Meal Schedule</h3>
              <div className="space-y-4">
                {meals.map((meal, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center shrink-0">
                          <Clock className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm text-primary font-medium">{meal.time}</span>
                            <span className="text-muted-foreground">•</span>
                            <span className="font-semibold">{meal.name}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{meal.description}</p>
                        </div>
                      </div>
                      <div className="flex gap-4 text-sm">
                        <div className="text-center">
                          <p className="font-semibold text-primary">{meal.macros.protein}g</p>
                          <p className="text-xs text-muted-foreground">Protein</p>
                        </div>
                        <div className="text-center">
                          <p className="font-semibold text-accent">{meal.macros.carbs}g</p>
                          <p className="text-xs text-muted-foreground">Carbs</p>
                        </div>
                        <div className="text-center">
                          <p className="font-semibold">{meal.macros.fats}g</p>
                          <p className="text-xs text-muted-foreground">Fats</p>
                        </div>
                        <div className="text-center border-l border-border pl-4">
                          <p className="font-semibold">{meal.macros.calories}</p>
                          <p className="text-xs text-muted-foreground">kcal</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Macro Chart */}
              <div className="p-6 rounded-2xl bg-card border border-border">
                <h3 className="font-display text-lg font-semibold mb-4">Macro Breakdown</h3>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={macroData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={70}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {macroData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-4">
                  {macroData.map((macro) => (
                    <div key={macro.name} className="text-center">
                      <p className="font-semibold">{macro.value}%</p>
                      <p className="text-xs text-muted-foreground">{macro.name}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Macro Info Cards */}
              {Object.entries(macroInfo).map(([key, info]) => (
                <div key={key} className="p-6 rounded-2xl bg-card border border-border">
                  <h4 className="font-semibold mb-2">{info.name}</h4>
                  <p className="text-sm text-muted-foreground mb-4">{info.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {info.sources.slice(0, 4).map((source) => (
                      <span
                        key={source}
                        className="px-2 py-1 text-xs rounded-full bg-muted text-muted-foreground"
                      >
                        {source}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Nutrition;
