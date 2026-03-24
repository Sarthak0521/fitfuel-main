import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { User, Activity, Target, Ruler, Weight, Calendar, Loader2, Save, ArrowLeft } from "lucide-react";

const Profile = () => {
  const { user, isAuthenticated, isLoading: authLoading, updateProfile, getBMI, getDailyProtein, getPersonalizedCalories } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [name, setName] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [workoutIntensity, setWorkoutIntensity] = useState<"light" | "moderate" | "intense">("moderate");
  const [goal, setGoal] = useState<"lose" | "maintain" | "gain">("maintain");
  const [isSaving, setIsSaving] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [authLoading, isAuthenticated, navigate]);

  // Populate form with user data
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setHeight(user.height?.toString() || "");
      setWeight(user.weight?.toString() || "");
      setAge(user.age?.toString() || "");
      setWorkoutIntensity(user.workoutIntensity || "moderate");
      setGoal(user.goal || "maintain");
    }
  }, [user]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const result = await updateProfile({
        name,
        height: height ? parseFloat(height) : null,
        weight: weight ? parseFloat(weight) : null,
        age: age ? parseInt(age) : null,
        workoutIntensity,
        goal,
      });

      if (result.success) {
        toast({ title: "Profile updated!", description: "Your fitness metrics have been saved." });
      } else {
        toast({ title: "Update failed", description: result.error || "Could not update profile.", variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Error", description: "Something went wrong. Please try again.", variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  };

  if (authLoading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!user) return null;

  const bmi = getBMI();
  const dailyProtein = getDailyProtein();
  const dailyCalories = getPersonalizedCalories();

  return (
    <Layout>
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back
              </Button>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h1 className="font-display text-3xl font-bold">Profile Settings</h1>
                  <p className="text-muted-foreground">{user.email}</p>
                </div>
              </div>
            </div>

            {/* Stats Overview */}
            {(bmi || dailyProtein || dailyCalories) && (
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="text-lg">Your Personalized Stats</CardTitle>
                  <CardDescription>Based on your current metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    {bmi && (
                      <div className="p-4 rounded-lg bg-primary/5">
                        <p className="text-2xl font-bold text-primary">{bmi}</p>
                        <p className="text-sm text-muted-foreground">BMI</p>
                      </div>
                    )}
                    {dailyProtein && (
                      <div className="p-4 rounded-lg bg-primary/5">
                        <p className="text-2xl font-bold text-primary">{dailyProtein}g</p>
                        <p className="text-sm text-muted-foreground">Daily Protein</p>
                      </div>
                    )}
                    {dailyCalories && (
                      <div className="p-4 rounded-lg bg-primary/5">
                        <p className="text-2xl font-bold text-primary">{dailyCalories}</p>
                        <p className="text-sm text-muted-foreground">Daily Calories</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Profile Form */}
            <Card>
              <CardHeader>
                <CardTitle>Edit Your Information</CardTitle>
                <CardDescription>Update your fitness metrics for personalized recommendations</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSave} className="space-y-6">
                  {/* Basic Info */}
                  <div>
                    <Label htmlFor="name" className="flex items-center gap-2 mb-2">
                      <User className="w-4 h-4" /> Full Name
                    </Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                    />
                  </div>

                  <Separator />

                  {/* Physical Metrics */}
                  <div>
                    <h3 className="font-medium mb-4">Physical Metrics</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="height" className="flex items-center gap-2 mb-2">
                          <Ruler className="w-4 h-4" /> Height (cm)
                        </Label>
                        <Input
                          id="height"
                          type="number"
                          value={height}
                          onChange={(e) => setHeight(e.target.value)}
                          placeholder="170"
                          min="100"
                          max="250"
                        />
                      </div>
                      <div>
                        <Label htmlFor="weight" className="flex items-center gap-2 mb-2">
                          <Weight className="w-4 h-4" /> Weight (kg)
                        </Label>
                        <Input
                          id="weight"
                          type="number"
                          value={weight}
                          onChange={(e) => setWeight(e.target.value)}
                          placeholder="70"
                          min="30"
                          max="300"
                        />
                      </div>
                      <div>
                        <Label htmlFor="age" className="flex items-center gap-2 mb-2">
                          <Calendar className="w-4 h-4" /> Age
                        </Label>
                        <Input
                          id="age"
                          type="number"
                          value={age}
                          onChange={(e) => setAge(e.target.value)}
                          placeholder="25"
                          min="13"
                          max="120"
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Workout Intensity */}
                  <div>
                    <Label className="flex items-center gap-2 mb-3">
                      <Activity className="w-4 h-4" /> Workout Intensity
                    </Label>
                    <div className="flex gap-2">
                      {(["light", "moderate", "intense"] as const).map((intensity) => (
                        <Button
                          key={intensity}
                          type="button"
                          variant={workoutIntensity === intensity ? "default" : "outline"}
                          onClick={() => setWorkoutIntensity(intensity)}
                          className="flex-1 capitalize"
                        >
                          {intensity === "light" && "🚶 "}
                          {intensity === "moderate" && "🏃 "}
                          {intensity === "intense" && "🔥 "}
                          {intensity}
                        </Button>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      {workoutIntensity === "light" && "1-2 workouts per week"}
                      {workoutIntensity === "moderate" && "3-4 workouts per week"}
                      {workoutIntensity === "intense" && "5+ workouts per week"}
                    </p>
                  </div>

                  <Separator />

                  {/* Fitness Goal */}
                  <div>
                    <Label className="flex items-center gap-2 mb-3">
                      <Target className="w-4 h-4" /> Fitness Goal
                    </Label>
                    <div className="flex gap-2">
                      {(["lose", "maintain", "gain"] as const).map((g) => (
                        <Button
                          key={g}
                          type="button"
                          variant={goal === g ? "default" : "outline"}
                          onClick={() => setGoal(g)}
                          className="flex-1"
                        >
                          {g === "lose" && "🔥 Lose Weight"}
                          {g === "maintain" && "⚖️ Maintain"}
                          {g === "gain" && "💪 Build Muscle"}
                        </Button>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      {goal === "lose" && "Calorie deficit for fat loss"}
                      {goal === "maintain" && "Balance calories for maintenance"}
                      {goal === "gain" && "Calorie surplus for muscle growth"}
                    </p>
                  </div>

                  <Separator />

                  {/* Submit */}
                  <Button type="submit" size="lg" className="w-full" disabled={isSaving}>
                    {isSaving ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Profile;
