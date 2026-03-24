import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Target, 
  Flame, 
  Dumbbell, 
  Apple, 
  TrendingUp, 
  User,
  ArrowRight,
  Activity,
  Scale
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface WorkoutRecommendation {
  id: string;
  name: string;
  category: string;
  level: string;
  target_muscle: string;
  sets: number;
  reps: string;
}

interface MealPlanRecommendation {
  id: string;
  name: string;
  goal: string;
  daily_calories: number;
  macro_protein: number;
  macro_carbs: number;
  macro_fats: number;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { 
    user, 
    isAuthenticated, 
    isLoading: authLoading, 
    getBMI, 
    getDailyProtein, 
    getPersonalizedCalories 
  } = useAuth();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [authLoading, isAuthenticated, navigate]);

  const userLevel = user?.workoutIntensity === "light" 
    ? "beginner" 
    : user?.workoutIntensity === "moderate" 
      ? "intermediate" 
      : "advanced";

  const { data: recommendedWorkouts, isLoading: workoutsLoading } = useQuery({
    queryKey: ["dashboard-workouts", userLevel],
    queryFn: async () => {
      const levels = userLevel === "beginner" 
        ? ["beginner"] 
        : userLevel === "intermediate" 
          ? ["beginner", "intermediate"] 
          : ["intermediate", "advanced"];
      
      const { data, error } = await supabase
        .from("workouts")
        .select("id, name, category, level, target_muscle, sets, reps")
        .in("level", levels)
        .limit(6);

      if (error) throw error;
      return data as WorkoutRecommendation[];
    },
    enabled: isAuthenticated && !!user?.workoutIntensity,
  });

  const { data: recommendedMealPlan, isLoading: mealPlanLoading } = useQuery({
    queryKey: ["dashboard-mealplan", user?.goal],
    queryFn: async () => {
      const goalMap: Record<string, string> = {
        lose: "weight-loss",
        maintain: "maintenance", 
        gain: "muscle-gain",
      };
      
      const { data, error } = await supabase
        .from("meal_plans")
        .select("id, name, goal, daily_calories, macro_protein, macro_carbs, macro_fats")
        .eq("goal", goalMap[user?.goal || "maintain"])
        .single();

      if (error && error.code !== "PGRST116") throw error;
      return data as MealPlanRecommendation | null;
    },
    enabled: isAuthenticated && !!user?.goal,
  });

  const bmi = getBMI();
  const dailyProtein = getDailyProtein();
  const dailyCalories = getPersonalizedCalories();

  const getBmiStatus = (bmi: number) => {
    if (bmi < 18.5) return { label: "Underweight", color: "text-yellow-500" };
    if (bmi < 25) return { label: "Normal", color: "text-green-500" };
    if (bmi < 30) return { label: "Overweight", color: "text-orange-500" };
    return { label: "Obese", color: "text-red-500" };
  };

  const getGoalLabel = (goal: string | null) => {
    switch (goal) {
      case "lose": return "Weight Loss";
      case "maintain": return "Maintenance";
      case "gain": return "Muscle Gain";
      default: return "Not set";
    }
  };

  const getLevelBadgeVariant = (level: string) => {
    switch (level) {
      case "beginner": return "default";
      case "intermediate": return "secondary";
      case "advanced": return "destructive";
      default: return "outline";
    }
  };

  const isProfileComplete = user?.height && user?.weight && user?.age && user?.workoutIntensity && user?.goal;

  if (authLoading) {
    return (
      <Layout>
        <section className="py-12">
          <div className="container mx-auto px-4">
            <Skeleton className="h-10 w-64 mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-32" />
              ))}
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
              Welcome back, <span className="text-primary">{user?.name?.split(" ")[0]}</span>! 
            </h1>
            <p className="text-muted-foreground">
              Here's your personalized fitness dashboard based on your profile.
            </p>
          </div>

          {/* Profile Completion Warning */}
          {!isProfileComplete && (
            <Card className="mb-8 border-primary/50 bg-primary/5">
              <CardContent className="py-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <User className="w-8 h-8 text-primary" />
                    <div>
                      <p className="font-medium">Complete your profile for personalized recommendations</p>
                      <p className="text-sm text-muted-foreground">
                        Add your fitness metrics to unlock tailored workout and nutrition plans.
                      </p>
                    </div>
                  </div>
                  <Link to="/profile">
                    <Button>
                      Complete Profile <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Scale className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">BMI</p>
                    {bmi ? (
                      <div className="flex items-center gap-2">
                        <p className="text-2xl font-bold">{bmi}</p>
                        <span className={`text-sm ${getBmiStatus(bmi).color}`}>
                          {getBmiStatus(bmi).label}
                        </span>
                      </div>
                    ) : (
                      <p className="text-lg text-muted-foreground">—</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Flame className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Daily Calories</p>
                    {dailyCalories ? (
                      <p className="text-2xl font-bold">{dailyCalories.toLocaleString()}</p>
                    ) : (
                      <p className="text-lg text-muted-foreground">—</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Apple className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Daily Protein</p>
                    {dailyProtein ? (
                      <p className="text-2xl font-bold">{dailyProtein}g</p>
                    ) : (
                      <p className="text-lg text-muted-foreground">—</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Current Goal</p>
                    <p className="text-xl font-bold">{getGoalLabel(user?.goal || null)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Workout Recommendations */}
            <Card className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Dumbbell className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle>Recommended Workouts</CardTitle>
                      <CardDescription>
                        Based on your {user?.workoutIntensity || "fitness"} level
                      </CardDescription>
                    </div>
                  </div>
                  <Link to="/workouts">
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                {workoutsLoading ? (
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <Skeleton key={i} className="h-16" />
                    ))}
                  </div>
                ) : recommendedWorkouts && recommendedWorkouts.length > 0 ? (
                  <div className="space-y-3">
                    {recommendedWorkouts.map((workout) => (
                      <div
                        key={workout.id}
                        className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{workout.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {workout.target_muscle} • {workout.sets} sets × {workout.reps}
                          </p>
                        </div>
                        <Badge variant={getLevelBadgeVariant(workout.level)}>
                          {workout.level}
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Activity className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>Complete your profile to get workout recommendations</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Nutrition Recommendations */}
            <Card className="animate-fade-in" style={{ animationDelay: '0.45s' }}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Apple className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle>Recommended Meal Plan</CardTitle>
                      <CardDescription>
                        Optimized for {getGoalLabel(user?.goal || null).toLowerCase()}
                      </CardDescription>
                    </div>
                  </div>
                  <Link to="/nutrition">
                    <Button variant="outline" size="sm">
                      View Plan
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                {mealPlanLoading ? (
                  <div className="space-y-4">
                    <Skeleton className="h-20" />
                    <Skeleton className="h-8" />
                    <Skeleton className="h-8" />
                  </div>
                ) : recommendedMealPlan ? (
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-muted/50">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{recommendedMealPlan.name}</h4>
                        <Badge variant="outline">
                          {recommendedMealPlan.daily_calories} kcal/day
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Tailored to support your {getGoalLabel(user?.goal || null).toLowerCase()} goals
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Protein</span>
                          <span className="font-medium">{recommendedMealPlan.macro_protein}%</span>
                        </div>
                        <Progress value={recommendedMealPlan.macro_protein} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Carbs</span>
                          <span className="font-medium">{recommendedMealPlan.macro_carbs}%</span>
                        </div>
                        <Progress value={recommendedMealPlan.macro_carbs} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Fats</span>
                          <span className="font-medium">{recommendedMealPlan.macro_fats}%</span>
                        </div>
                        <Progress value={recommendedMealPlan.macro_fats} className="h-2" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <TrendingUp className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>Complete your profile to get nutrition recommendations</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link to="/workouts">
                <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
                  <CardContent className="pt-6 text-center">
                    <Dumbbell className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <p className="font-medium">Browse Workouts</p>
                  </CardContent>
                </Card>
              </Link>
              <Link to="/nutrition">
                <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
                  <CardContent className="pt-6 text-center">
                    <Apple className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <p className="font-medium">Meal Plans</p>
                  </CardContent>
                </Card>
              </Link>
              <Link to="/calculator">
                <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
                  <CardContent className="pt-6 text-center">
                    <Flame className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <p className="font-medium">Calorie Calculator</p>
                  </CardContent>
                </Card>
              </Link>
              <Link to="/profile">
                <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
                  <CardContent className="pt-6 text-center">
                    <User className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <p className="font-medium">Edit Profile</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
