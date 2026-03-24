import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { User, Scale, Dumbbell, Flame, Target, Activity, TrendingUp } from "lucide-react";

const PersonalizedPlan = () => {
  const { user, getBMI, getDailyProtein, getPersonalizedCalories } = useAuth();

  if (!user) return null;

  const bmi = getBMI();
  const dailyProtein = getDailyProtein();
  const dailyCalories = getPersonalizedCalories();

  const getBmiCategory = (bmi: number) => {
    if (bmi < 18.5) return { label: "Underweight", color: "text-accent", advice: "Focus on calorie surplus with nutrient-dense foods" };
    if (bmi < 25) return { label: "Normal", color: "text-primary", advice: "Maintain your current eating habits with balanced macros" };
    if (bmi < 30) return { label: "Overweight", color: "text-accent", advice: "Focus on calorie deficit while maintaining protein intake" };
    return { label: "Obese", color: "text-destructive", advice: "Consult a healthcare provider for a personalized plan" };
  };

  const getIntensityLabel = (intensity: string) => {
    switch (intensity) {
      case "light": return "1-2 workouts/week";
      case "moderate": return "3-4 workouts/week";
      case "intense": return "5+ workouts/week";
      default: return intensity;
    }
  };

  const getMacroSplit = () => {
    switch (user.goal) {
      case "lose":
        return { protein: 40, carbs: 30, fats: 30 };
      case "gain":
        return { protein: 30, carbs: 45, fats: 25 };
      default:
        return { protein: 30, carbs: 40, fats: 30 };
    }
  };

  const macros = getMacroSplit();
  const bmiData = bmi ? getBmiCategory(bmi) : null;

  return (
    <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
          <User className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h3 className="font-display text-xl font-bold">Your Personalized Plan</h3>
          <p className="text-sm text-muted-foreground">Based on your profile, {user.name}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="p-4 rounded-xl bg-card border border-border text-center">
          <Scale className="w-6 h-6 mx-auto mb-2 text-primary" />
          <p className="text-2xl font-bold">{bmi}</p>
          <p className={`text-sm font-medium ${bmiData?.color}`}>{bmiData?.label}</p>
          <p className="text-xs text-muted-foreground">BMI</p>
        </div>
        <div className="p-4 rounded-xl bg-card border border-border text-center">
          <Flame className="w-6 h-6 mx-auto mb-2 text-accent" />
          <p className="text-2xl font-bold">{dailyCalories}</p>
          <p className="text-sm text-muted-foreground">Daily Calories</p>
        </div>
        <div className="p-4 rounded-xl bg-card border border-border text-center">
          <Dumbbell className="w-6 h-6 mx-auto mb-2 text-primary" />
          <p className="text-2xl font-bold">{dailyProtein}g</p>
          <p className="text-sm text-muted-foreground">Daily Protein</p>
        </div>
        <div className="p-4 rounded-xl bg-card border border-border text-center">
          <Activity className="w-6 h-6 mx-auto mb-2 text-accent" />
          <p className="text-lg font-bold capitalize">{user.workoutIntensity}</p>
          <p className="text-xs text-muted-foreground">{getIntensityLabel(user.workoutIntensity)}</p>
        </div>
      </div>

      {/* Recommended Macro Split */}
      <div className="p-4 rounded-xl bg-card border border-border mb-6">
        <h4 className="font-semibold mb-3 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-primary" />
          Recommended Daily Macros
        </h4>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm">Protein</span>
              <span className="text-sm font-semibold text-primary">{macros.protein}%</span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div className="h-full bg-primary" style={{ width: `${macros.protein}%` }} />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              ~{Math.round((dailyCalories || 0) * macros.protein / 100 / 4)}g
            </p>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm">Carbs</span>
              <span className="text-sm font-semibold text-accent">{macros.carbs}%</span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div className="h-full bg-accent" style={{ width: `${macros.carbs}%` }} />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              ~{Math.round((dailyCalories || 0) * macros.carbs / 100 / 4)}g
            </p>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm">Fats</span>
              <span className="text-sm font-semibold">{macros.fats}%</span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div className="h-full bg-muted-foreground" style={{ width: `${macros.fats}%` }} />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              ~{Math.round((dailyCalories || 0) * macros.fats / 100 / 9)}g
            </p>
          </div>
        </div>
      </div>

      {/* Personalized Advice */}
      <div className="p-4 rounded-xl bg-muted/50 border border-border">
        <h4 className="font-semibold mb-2 flex items-center gap-2">
          <Target className="w-4 h-4 text-primary" />
          Your Nutrition Strategy
        </h4>
        <p className="text-sm text-muted-foreground">
          {user.goal === "lose" && (
            <>With your goal to <span className="text-primary font-medium">lose weight</span> and {user.workoutIntensity} intensity workouts, focus on a moderate calorie deficit while keeping protein high to preserve muscle mass.</>
          )}
          {user.goal === "gain" && (
            <>With your goal to <span className="text-primary font-medium">build muscle</span> and {user.workoutIntensity} intensity workouts, eat in a slight surplus with emphasis on protein timing around workouts.</>
          )}
          {user.goal === "maintain" && (
            <>With your goal to <span className="text-primary font-medium">maintain</span> your current physique, keep calories balanced and focus on consistent protein intake throughout the day.</>
          )}
        </p>
        {bmiData && (
          <p className="text-sm text-muted-foreground mt-2">
            <span className="font-medium">BMI Insight:</span> {bmiData.advice}
          </p>
        )}
      </div>
    </div>
  );
};

export default PersonalizedPlan;
