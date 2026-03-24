import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dumbbell, Target, Layers, Lightbulb, AlertCircle } from "lucide-react";
import type { Workout } from "@/hooks/useWorkouts";

interface WorkoutDetailModalProps {
  workout: Workout | null;
  relatedWorkouts: Workout[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectWorkout: (workout: Workout) => void;
}

export const WorkoutDetailModal = ({
  workout,
  relatedWorkouts,
  open,
  onOpenChange,
  onSelectWorkout,
}: WorkoutDetailModalProps) => {
  if (!workout) return null;

  const getLevelColor = (level: string) => {
    switch (level) {
      case "beginner":
        return "bg-primary/20 text-primary border-primary/30";
      case "intermediate":
        return "bg-accent/20 text-accent border-accent/30";
      case "advanced":
        return "bg-destructive/20 text-destructive border-destructive/30";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] p-0">
        <ScrollArea className="max-h-[90vh]">
          <div className="p-6">
            <DialogHeader>
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center shrink-0">
                  <Dumbbell className="w-7 h-7 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <DialogTitle className="font-display text-2xl font-bold mb-2">
                    {workout.name}
                  </DialogTitle>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="outline" className={getLevelColor(workout.level)}>
                      {workout.level}
                    </Badge>
                    <Badge variant="secondary">{workout.category}</Badge>
                  </div>
                </div>
              </div>
            </DialogHeader>

            {/* Description */}
            {workout.description && (
              <div className="mt-6">
                <p className="text-muted-foreground leading-relaxed">
                  {workout.description}
                </p>
              </div>
            )}

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 mt-6 p-4 rounded-xl bg-muted/50">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                  <Target className="w-4 h-4" />
                  <span className="text-xs uppercase tracking-wide">Target</span>
                </div>
                <p className="font-semibold">{workout.target_muscle}</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                  <Layers className="w-4 h-4" />
                  <span className="text-xs uppercase tracking-wide">Sets</span>
                </div>
                <p className="font-semibold">{workout.sets}</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                  <Dumbbell className="w-4 h-4" />
                  <span className="text-xs uppercase tracking-wide">Reps</span>
                </div>
                <p className="font-semibold">{workout.reps}</p>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Form Tips */}
            {workout.tips && (
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="w-5 h-5 text-primary" />
                  <h3 className="font-display font-semibold text-lg">Form Tips</h3>
                </div>
                <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                  <p className="text-muted-foreground leading-relaxed">{workout.tips}</p>
                </div>
              </div>
            )}

            {/* Exercise Instructions */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <AlertCircle className="w-5 h-5 text-accent" />
                <h3 className="font-display font-semibold text-lg">How to Perform</h3>
              </div>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/20 text-primary text-sm font-semibold flex items-center justify-center shrink-0">1</span>
                  <p className="text-muted-foreground">Start in the proper position for {workout.name.toLowerCase()}. Ensure your form is correct before adding weight.</p>
                </div>
                <div className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/20 text-primary text-sm font-semibold flex items-center justify-center shrink-0">2</span>
                  <p className="text-muted-foreground">Perform {workout.sets} sets of {workout.reps} repetitions, focusing on controlled movements.</p>
                </div>
                <div className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/20 text-primary text-sm font-semibold flex items-center justify-center shrink-0">3</span>
                  <p className="text-muted-foreground">Rest 60-90 seconds between sets. Focus on engaging your {workout.target_muscle.toLowerCase()} throughout the movement.</p>
                </div>
              </div>
            </div>

            {/* Related Exercises */}
            {relatedWorkouts.length > 0 && (
              <>
                <Separator className="my-6" />
                <div>
                  <h3 className="font-display font-semibold text-lg mb-4">Related Exercises</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {relatedWorkouts.map((related) => (
                      <button
                        key={related.id}
                        onClick={() => onSelectWorkout(related)}
                        className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border hover:border-primary/50 transition-all text-left group"
                      >
                        <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center shrink-0">
                          <Dumbbell className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate group-hover:text-primary transition-colors">
                            {related.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {related.target_muscle} • {related.level}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
