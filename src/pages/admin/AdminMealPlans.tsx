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

type MealPlan = Tables<"meal_plans">;

const goals = ["lose", "maintain", "gain"];

export default function AdminMealPlans() {
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<MealPlan | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const [form, setForm] = useState({
    name: "",
    goal: "",
    description: "",
    daily_calories: 2000,
    macro_protein: 30,
    macro_carbs: 40,
    macro_fats: 30,
    veg_meals: "",
    non_veg_meals: "",
  });

  const fetchMealPlans = async () => {
    const { data, error } = await supabase
      .from("meal_plans")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setMealPlans(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchMealPlans();
  }, []);

  const resetForm = () => {
    setForm({
      name: "",
      goal: "",
      description: "",
      daily_calories: 2000,
      macro_protein: 30,
      macro_carbs: 40,
      macro_fats: 30,
      veg_meals: "",
      non_veg_meals: "",
    });
    setEditingPlan(null);
  };

  const openEditDialog = (plan: MealPlan) => {
    setEditingPlan(plan);
    setForm({
      name: plan.name,
      goal: plan.goal,
      description: plan.description || "",
      daily_calories: plan.daily_calories,
      macro_protein: plan.macro_protein,
      macro_carbs: plan.macro_carbs,
      macro_fats: plan.macro_fats,
      veg_meals: JSON.stringify(plan.veg_meals, null, 2),
      non_veg_meals: JSON.stringify(plan.non_veg_meals, null, 2),
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    let vegMeals, nonVegMeals;
    try {
      vegMeals = form.veg_meals ? JSON.parse(form.veg_meals) : [];
      nonVegMeals = form.non_veg_meals ? JSON.parse(form.non_veg_meals) : [];
    } catch {
      toast({ title: "Error", description: "Invalid JSON format for meals", variant: "destructive" });
      setIsSaving(false);
      return;
    }

    const planData = {
      name: form.name,
      goal: form.goal,
      description: form.description || null,
      daily_calories: form.daily_calories,
      macro_protein: form.macro_protein,
      macro_carbs: form.macro_carbs,
      macro_fats: form.macro_fats,
      veg_meals: vegMeals,
      non_veg_meals: nonVegMeals,
    };

    if (editingPlan) {
      const { error } = await supabase
        .from("meal_plans")
        .update(planData)
        .eq("id", editingPlan.id);

      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Success", description: "Meal plan updated successfully" });
        setIsDialogOpen(false);
        resetForm();
        fetchMealPlans();
      }
    } else {
      const { error } = await supabase.from("meal_plans").insert(planData);

      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Success", description: "Meal plan created successfully" });
        setIsDialogOpen(false);
        resetForm();
        fetchMealPlans();
      }
    }
    setIsSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this meal plan?")) return;

    const { error } = await supabase.from("meal_plans").delete().eq("id", id);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Meal plan deleted successfully" });
      fetchMealPlans();
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Meal Plans</h1>
            <p className="text-muted-foreground mt-1">Manage nutrition meal plans</p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" /> Add Meal Plan
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingPlan ? "Edit Meal Plan" : "Add New Meal Plan"}
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
                    <Label htmlFor="goal">Goal</Label>
                    <Select
                      value={form.goal}
                      onValueChange={(value) => setForm({ ...form, goal: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select goal" />
                      </SelectTrigger>
                      <SelectContent>
                        {goals.map((g) => (
                          <SelectItem key={g} value={g}>
                            {g === "lose" ? "Lose Weight" : g === "maintain" ? "Maintain Weight" : "Gain Muscle"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    rows={2}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="daily_calories">Daily Calories</Label>
                    <Input
                      id="daily_calories"
                      type="number"
                      value={form.daily_calories}
                      onChange={(e) => setForm({ ...form, daily_calories: parseInt(e.target.value) || 2000 })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="macro_protein">Protein %</Label>
                    <Input
                      id="macro_protein"
                      type="number"
                      value={form.macro_protein}
                      onChange={(e) => setForm({ ...form, macro_protein: parseInt(e.target.value) || 30 })}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="macro_carbs">Carbs %</Label>
                    <Input
                      id="macro_carbs"
                      type="number"
                      value={form.macro_carbs}
                      onChange={(e) => setForm({ ...form, macro_carbs: parseInt(e.target.value) || 40 })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="macro_fats">Fats %</Label>
                    <Input
                      id="macro_fats"
                      type="number"
                      value={form.macro_fats}
                      onChange={(e) => setForm({ ...form, macro_fats: parseInt(e.target.value) || 30 })}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="veg_meals">Veg Meals (JSON array)</Label>
                  <Textarea
                    id="veg_meals"
                    value={form.veg_meals}
                    onChange={(e) => setForm({ ...form, veg_meals: e.target.value })}
                    rows={4}
                    placeholder='[{"name": "Meal 1", "calories": 500}]'
                  />
                </div>

                <div>
                  <Label htmlFor="non_veg_meals">Non-Veg Meals (JSON array)</Label>
                  <Textarea
                    id="non_veg_meals"
                    value={form.non_veg_meals}
                    onChange={(e) => setForm({ ...form, non_veg_meals: e.target.value })}
                    rows={4}
                    placeholder='[{"name": "Meal 1", "calories": 500}]'
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isSaving}>
                  {isSaving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  {editingPlan ? "Update Meal Plan" : "Create Meal Plan"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Meal Plans ({mealPlans.length})</CardTitle>
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
                    <TableHead>Goal</TableHead>
                    <TableHead>Calories</TableHead>
                    <TableHead>Macros (P/C/F)</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mealPlans.map((plan) => (
                    <TableRow key={plan.id}>
                      <TableCell className="font-medium">{plan.name}</TableCell>
                      <TableCell className="capitalize">{plan.goal}</TableCell>
                      <TableCell>{plan.daily_calories}</TableCell>
                      <TableCell>{plan.macro_protein}/{plan.macro_carbs}/{plan.macro_fats}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEditDialog(plan)}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(plan.id)}
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
