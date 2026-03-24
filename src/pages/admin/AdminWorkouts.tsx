import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type Workout = Tables<"workouts">;

const categories = ["chest", "back", "legs", "shoulders", "arms", "core", "cardio", "full-body"];
const levels = ["beginner", "intermediate", "advanced"];

export default function AdminWorkouts() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingWorkout, setEditingWorkout] = useState<Workout | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const [form, setForm] = useState({
    name: "",
    category: "",
    target_muscle: "",
    level: "",
    sets: 3,
    reps: "10-12",
    description: "",
    tips: "",
  });

  const fetchWorkouts = async () => {
    const { data, error } = await supabase
      .from("workouts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setWorkouts(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const resetForm = () => {
    setForm({
      name: "",
      category: "",
      target_muscle: "",
      level: "",
      sets: 3,
      reps: "10-12",
      description: "",
      tips: "",
    });
    setEditingWorkout(null);
  };

  const openEditDialog = (workout: Workout) => {
    setEditingWorkout(workout);
    setForm({
      name: workout.name,
      category: workout.category,
      target_muscle: workout.target_muscle,
      level: workout.level,
      sets: workout.sets,
      reps: workout.reps,
      description: workout.description || "",
      tips: workout.tips || "",
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const workoutData = {
      name: form.name,
      category: form.category,
      target_muscle: form.target_muscle,
      level: form.level,
      sets: form.sets,
      reps: form.reps,
      description: form.description || null,
      tips: form.tips || null,
    };

    if (editingWorkout) {
      const { error } = await supabase
        .from("workouts")
        .update(workoutData)
        .eq("id", editingWorkout.id);

      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Success", description: "Workout updated successfully" });
        setIsDialogOpen(false);
        resetForm();
        fetchWorkouts();
      }
    } else {
      const { error } = await supabase.from("workouts").insert(workoutData);

      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Success", description: "Workout created successfully" });
        setIsDialogOpen(false);
        resetForm();
        fetchWorkouts();
      }
    }
    setIsSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this workout?")) return;

    const { error } = await supabase.from("workouts").delete().eq("id", id);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Workout deleted successfully" });
      fetchWorkouts();
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Workouts</h1>
            <p className="text-muted-foreground mt-1">Manage workout exercises</p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" /> Add Workout
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingWorkout ? "Edit Workout" : "Add New Workout"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={form.category}
                      onValueChange={(value) => setForm({ ...form, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="target_muscle">Target Muscle</Label>
                    <Input
                      id="target_muscle"
                      value={form.target_muscle}
                      onChange={(e) => setForm({ ...form, target_muscle: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="level">Level</Label>
                    <Select
                      value={form.level}
                      onValueChange={(value) => setForm({ ...form, level: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        {levels.map((lvl) => (
                          <SelectItem key={lvl} value={lvl}>
                            {lvl.charAt(0).toUpperCase() + lvl.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="sets">Sets</Label>
                    <Input
                      id="sets"
                      type="number"
                      value={form.sets}
                      onChange={(e) => setForm({ ...form, sets: parseInt(e.target.value) || 3 })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="reps">Reps</Label>
                    <Input
                      id="reps"
                      value={form.reps}
                      onChange={(e) => setForm({ ...form, reps: e.target.value })}
                      placeholder="e.g., 10-12"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="tips">Tips</Label>
                  <Textarea
                    id="tips"
                    value={form.tips}
                    onChange={(e) => setForm({ ...form, tips: e.target.value })}
                    rows={2}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isSaving}>
                  {isSaving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  {editingWorkout ? "Update Workout" : "Create Workout"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Workouts ({workouts.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Target</TableHead>
                    <TableHead>Level</TableHead>
                    <TableHead>Sets x Reps</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {workouts.map((workout) => (
                    <TableRow key={workout.id}>
                      <TableCell className="font-medium">{workout.name}</TableCell>
                      <TableCell className="capitalize">{workout.category}</TableCell>
                      <TableCell>{workout.target_muscle}</TableCell>
                      <TableCell className="capitalize">{workout.level}</TableCell>
                      <TableCell>{workout.sets} x {workout.reps}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEditDialog(workout)}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(workout.id)}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
