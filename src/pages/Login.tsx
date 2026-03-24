import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { LogIn, UserPlus, Dumbbell, Activity, Target, Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [workoutIntensity, setWorkoutIntensity] = useState<"light" | "moderate" | "intense">("moderate");
  const [goal, setGoal] = useState<"lose" | "maintain" | "gain">("maintain");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, register, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (isLogin) {
        const result = await login(email, password);
        if (result.success) {
          toast({ title: "Welcome back!", description: "You've logged in successfully." });
          navigate("/nutrition");
        } else {
          toast({ title: "Login failed", description: result.error || "Invalid email or password.", variant: "destructive" });
        }
      } else {
        if (!name) {
          toast({ title: "Missing info", description: "Please enter your name.", variant: "destructive" });
          setIsSubmitting(false);
          return;
        }
        
        const result = await register(email, password, name, {
          height: height ? parseFloat(height) : undefined,
          weight: weight ? parseFloat(weight) : undefined,
          age: age ? parseInt(age) : undefined,
          workoutIntensity,
          goal,
        });
        
        if (result.success) {
          toast({ title: "Account created!", description: "Welcome to FitFuel." });
          navigate("/nutrition");
        } else {
          toast({ title: "Registration failed", description: result.error || "Could not create account.", variant: "destructive" });
        }
      }
    } catch (error) {
      toast({ title: "Error", description: "Something went wrong. Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (error) {
      toast({ title: "Error", description: "Could not sign in with Google.", variant: "destructive" });
    }
  };

  return (
    <Layout>
      <section className="py-16 md:py-24 min-h-[80vh] flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4">
                <Dumbbell className="w-8 h-8 text-primary-foreground" />
              </div>
              <h1 className="font-display text-3xl font-bold mb-2">
                {isLogin ? "Welcome Back" : "Join FitFuel"}
              </h1>
              <p className="text-muted-foreground">
                {isLogin
                  ? "Sign in to access your personalized diet plan"
                  : "Create an account for personalized nutrition"}
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-card border border-border">
              {/* Toggle */}
              <div className="flex gap-2 mb-6">
                <Button
                  variant={isLogin ? "default" : "outline"}
                  className="flex-1"
                  onClick={() => setIsLogin(true)}
                >
                  <LogIn className="w-4 h-4 mr-2" /> Login
                </Button>
                <Button
                  variant={!isLogin ? "default" : "outline"}
                  className="flex-1"
                  onClick={() => setIsLogin(false)}
                >
                  <UserPlus className="w-4 h-4 mr-2" /> Register
                </Button>
              </div>

              {/* Google OAuth */}
              <Button
                type="button"
                variant="outline"
                className="w-full mb-4"
                onClick={handleGoogleLogin}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </Button>

              <div className="relative my-6">
                <Separator />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">
                  or continue with email
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div>
                    <Label>Full Name</Label>
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      required={!isLogin}
                    />
                  </div>
                )}

                <div>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div>
                  <Label>Password</Label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    minLength={6}
                  />
                </div>

                {!isLogin && (
                  <>
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <Label>Height (cm)</Label>
                        <Input
                          type="number"
                          value={height}
                          onChange={(e) => setHeight(e.target.value)}
                          placeholder="170"
                        />
                      </div>
                      <div>
                        <Label>Weight (kg)</Label>
                        <Input
                          type="number"
                          value={weight}
                          onChange={(e) => setWeight(e.target.value)}
                          placeholder="70"
                        />
                      </div>
                      <div>
                        <Label>Age</Label>
                        <Input
                          type="number"
                          value={age}
                          onChange={(e) => setAge(e.target.value)}
                          placeholder="25"
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="flex items-center gap-2 mb-2">
                        <Activity className="w-4 h-4" /> Workout Intensity
                      </Label>
                      <div className="flex gap-2">
                        {(["light", "moderate", "intense"] as const).map((i) => (
                          <Button
                            key={i}
                            type="button"
                            variant={workoutIntensity === i ? "default" : "outline"}
                            size="sm"
                            onClick={() => setWorkoutIntensity(i)}
                            className="flex-1 capitalize"
                          >
                            {i}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label className="flex items-center gap-2 mb-2">
                        <Target className="w-4 h-4" /> Fitness Goal
                      </Label>
                      <div className="flex gap-2">
                        {(["lose", "maintain", "gain"] as const).map((g) => (
                          <Button
                            key={g}
                            type="button"
                            variant={goal === g ? "default" : "outline"}
                            size="sm"
                            onClick={() => setGoal(g)}
                            className="flex-1"
                          >
                            {g === "lose" ? "🔥 Lose" : g === "gain" ? "💪 Gain" : "⚖️ Maintain"}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      {isLogin ? "Signing In..." : "Creating Account..."}
                    </>
                  ) : (
                    isLogin ? "Sign In" : "Create Account"
                  )}
                </Button>
              </form>
            </div>

            <p className="text-center text-sm text-muted-foreground mt-6">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-primary hover:underline font-medium"
              >
                {isLogin ? "Register" : "Login"}
              </button>
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Login;
