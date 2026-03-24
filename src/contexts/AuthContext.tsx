import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  height: number | null;
  weight: number | null;
  age: number | null;
  workoutIntensity: "light" | "moderate" | "intense" | null;
  goal: "lose" | "maintain" | "gain" | null;
  avatarUrl: string | null;
}

interface AuthContextType {
  user: UserProfile | null;
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (email: string, password: string, name: string, metadata?: Partial<UserProfile>) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<{ success: boolean; error?: string }>;
  getBMI: () => number | null;
  getDailyProtein: () => number | null;
  getPersonalizedCalories: () => number | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProfile = async (userId: string): Promise<UserProfile | null> => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error || !data) {
      console.error("Error fetching profile:", error);
      return null;
    }

    return {
      id: data.id,
      email: data.email,
      name: data.name,
      height: data.height ? Number(data.height) : null,
      weight: data.weight ? Number(data.weight) : null,
      age: data.age,
      workoutIntensity: data.workout_intensity as UserProfile["workoutIntensity"],
      goal: data.goal as UserProfile["goal"],
      avatarUrl: data.avatar_url,
    };
  };

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        setSession(currentSession);
        
        if (currentSession?.user) {
          // Use setTimeout to avoid potential deadlock with Supabase auth
          setTimeout(async () => {
            const profile = await fetchProfile(currentSession.user.id);
            setUser(profile);
            setIsLoading(false);
          }, 0);
        } else {
          setUser(null);
          setIsLoading(false);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session: existingSession } }) => {
      setSession(existingSession);
      if (existingSession?.user) {
        fetchProfile(existingSession.user.id).then((profile) => {
          setUser(profile);
          setIsLoading(false);
        });
      } else {
        setIsLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  };

  const register = async (
    email: string,
    password: string,
    name: string,
    metadata?: Partial<UserProfile>
  ): Promise<{ success: boolean; error?: string }> => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin,
        data: {
          name,
          full_name: name,
        },
      },
    });

    if (error) {
      return { success: false, error: error.message };
    }

    // Update profile with additional metadata if provided
    if (metadata && (metadata.height || metadata.weight || metadata.age || metadata.workoutIntensity || metadata.goal)) {
      // Wait a bit for the profile to be created by the trigger
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      if (currentUser) {
        await supabase
          .from("profiles")
          .update({
            height: metadata.height,
            weight: metadata.weight,
            age: metadata.age,
            workout_intensity: metadata.workoutIntensity,
            goal: metadata.goal,
          })
          .eq("user_id", currentUser.id);
      }
    }

    return { success: true };
  };

  const loginWithGoogle = async (): Promise<void> => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/nutrition`,
      },
    });
  };

  const logout = async (): Promise<void> => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
  };

  const updateProfile = async (updates: Partial<UserProfile>): Promise<{ success: boolean; error?: string }> => {
    if (!session?.user) {
      return { success: false, error: "Not authenticated" };
    }

    const { error } = await supabase
      .from("profiles")
      .update({
        name: updates.name,
        height: updates.height,
        weight: updates.weight,
        age: updates.age,
        workout_intensity: updates.workoutIntensity,
        goal: updates.goal,
        avatar_url: updates.avatarUrl,
      })
      .eq("user_id", session.user.id);

    if (error) {
      return { success: false, error: error.message };
    }

    // Refetch profile
    const profile = await fetchProfile(session.user.id);
    setUser(profile);

    return { success: true };
  };

  const getBMI = (): number | null => {
    if (!user || !user.height || !user.weight) return null;
    const heightM = user.height / 100;
    return Math.round((user.weight / (heightM * heightM)) * 10) / 10;
  };

  const getDailyProtein = (): number | null => {
    if (!user || !user.weight || !user.workoutIntensity || !user.goal) return null;
    const intensityMultiplier = {
      light: 1.4,
      moderate: 1.8,
      intense: 2.2,
    };
    const goalMultiplier = {
      lose: 1.0,
      maintain: 1.1,
      gain: 1.2,
    };
    return Math.round(user.weight * intensityMultiplier[user.workoutIntensity] * goalMultiplier[user.goal]);
  };

  const getPersonalizedCalories = (): number | null => {
    if (!user || !user.weight || !user.height || !user.age || !user.workoutIntensity || !user.goal) return null;
    
    // Mifflin-St Jeor equation (using male formula as default)
    const bmr = 10 * user.weight + 6.25 * user.height - 5 * user.age + 5;
    
    const activityMultiplier = {
      light: 1.375,
      moderate: 1.55,
      intense: 1.725,
    };
    
    const tdee = bmr * activityMultiplier[user.workoutIntensity];
    
    const goalAdjustment = {
      lose: -500,
      maintain: 0,
      gain: 400,
    };
    
    return Math.round(tdee + goalAdjustment[user.goal]);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isAuthenticated: !!session,
        isLoading,
        login,
        register,
        loginWithGoogle,
        logout,
        updateProfile,
        getBMI,
        getDailyProtein,
        getPersonalizedCalories,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
