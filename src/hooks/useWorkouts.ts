import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export type Workout = Tables<"workouts">;

export const categories = [
  { id: 'chest', name: 'Chest', icon: '💪' },
  { id: 'back', name: 'Back', icon: '🔙' },
  { id: 'legs', name: 'Legs', icon: '🦵' },
  { id: 'arms', name: 'Arms', icon: '💪' },
  { id: 'core', name: 'Core', icon: '🎯' },
  { id: 'cardio', name: 'Cardio', icon: '❤️' }
] as const;

export const levels = [
  { id: 'beginner', name: 'Beginner' },
  { id: 'intermediate', name: 'Intermediate' },
  { id: 'advanced', name: 'Advanced' }
] as const;

export const WORKOUTS_PER_PAGE = 12;

interface UseWorkoutsParams {
  page: number;
  category?: string | null;
  level?: string | null;
  search?: string;
}

interface WorkoutsResponse {
  workouts: Workout[];
  totalCount: number;
  totalPages: number;
}

export const useWorkouts = ({ page, category, level, search }: UseWorkoutsParams) => {
  return useQuery({
    queryKey: ['workouts', page, category, level, search],
    queryFn: async (): Promise<WorkoutsResponse> => {
      const from = (page - 1) * WORKOUTS_PER_PAGE;
      const to = from + WORKOUTS_PER_PAGE - 1;

      let query = supabase
        .from('workouts')
        .select('*', { count: 'exact' });

      // Apply filters
      if (category) {
        query = query.eq('category', category);
      }
      if (level) {
        query = query.eq('level', level);
      }
      if (search) {
        query = query.or(`name.ilike.%${search}%,target_muscle.ilike.%${search}%,description.ilike.%${search}%`);
      }

      // Apply pagination and ordering
      query = query.order('name', { ascending: true }).range(from, to);

      const { data, error, count } = await query;

      if (error) throw error;

      const totalCount = count ?? 0;
      const totalPages = Math.ceil(totalCount / WORKOUTS_PER_PAGE);

      return {
        workouts: data as Workout[],
        totalCount,
        totalPages,
      };
    },
  });
};
