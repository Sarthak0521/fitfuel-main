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

type Supplement = Tables<"supplements">;

const categories = ["protein", "pre-workout", "post-workout", "vitamins", "amino-acids", "weight-management", "general-health"];

export default function AdminSupplements() {
  const [supplements, setSupplements] = useState<Supplement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSupplement, setEditingSupplement] = useState<Supplement | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const [form, setForm] = useState({
    name: "",
    category: "",
    what_is_it: "",
    benefits: "",
    how_to_consume: "",
    dosage: "",
    who_should_take: "",
    who_should_avoid: "",
    side_effects: "",
    disclaimer: "Consult a healthcare professional before use.",
  });

  const fetchSupplements = async () => {
    const { data, error } = await supabase
      .from("supplements")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setSupplements(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchSupplements();
  }, []);

  const resetForm = () => {
    setForm({
      name: "",
      category: "",
      what_is_it: "",
      benefits: "",
      how_to_consume: "",
      dosage: "",
      who_should_take: "",
      who_should_avoid: "",
      side_effects: "",
      disclaimer: "Consult a healthcare professional before use.",
    });
    setEditingSupplement(null);
  };

  const openEditDialog = (supplement: Supplement) => {
    setEditingSupplement(supplement);
    setForm({
      name: supplement.name,
      category: supplement.category,
      what_is_it: supplement.what_is_it,
      benefits: supplement.benefits.join("\n"),
      how_to_consume: supplement.how_to_consume,
      dosage: supplement.dosage,
      who_should_take: supplement.who_should_take.join("\n"),
      who_should_avoid: supplement.who_should_avoid.join("\n"),
      side_effects: supplement.side_effects.join("\n"),
      disclaimer: supplement.disclaimer || "Consult a healthcare professional before use.",
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const supplementData = {
      name: form.name,
      category: form.category,
      what_is_it: form.what_is_it,
      benefits: form.benefits.split("\n").filter(Boolean),
      how_to_consume: form.how_to_consume,
      dosage: form.dosage,
      who_should_take: form.who_should_take.split("\n").filter(Boolean),
      who_should_avoid: form.who_should_avoid.split("\n").filter(Boolean),
      side_effects: form.side_effects.split("\n").filter(Boolean),
      disclaimer: form.disclaimer,
    };

    if (editingSupplement) {
      const { error } = await supabase
        .from("supplements")
        .update(supplementData)
        .eq("id", editingSupplement.id);

      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Success", description: "Supplement updated successfully" });
        setIsDialogOpen(false);
        resetForm();
        fetchSupplements();
      }
    } else {
      const { error } = await supabase.from("supplements").insert(supplementData);

      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Success", description: "Supplement created successfully" });
        setIsDialogOpen(false);
        resetForm();
        fetchSupplements();
      }
    }
    setIsSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this supplement?")) return;

    const { error } = await supabase.from("supplements").delete().eq("id", id);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Supplement deleted successfully" });
      fetchSupplements();
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Supplements</h1>
            <p className="text-muted-foreground mt-1">Manage supplement information</p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" /> Add Supplement
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingSupplement ? "Edit Supplement" : "Add New Supplement"}
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
                            {cat.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="what_is_it">What Is It</Label>
                  <Textarea
                    id="what_is_it"
                    value={form.what_is_it}
                    onChange={(e) => setForm({ ...form, what_is_it: e.target.value })}
                    rows={2}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="benefits">Benefits (one per line)</Label>
                  <Textarea
                    id="benefits"
                    value={form.benefits}
                    onChange={(e) => setForm({ ...form, benefits: e.target.value })}
                    rows={3}
                    placeholder="Benefit 1&#10;Benefit 2&#10;Benefit 3"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="how_to_consume">How to Consume</Label>
                    <Input
                      id="how_to_consume"
                      value={form.how_to_consume}
                      onChange={(e) => setForm({ ...form, how_to_consume: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="dosage">Dosage</Label>
                    <Input
                      id="dosage"
                      value={form.dosage}
                      onChange={(e) => setForm({ ...form, dosage: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="who_should_take">Who Should Take (one per line)</Label>
                  <Textarea
                    id="who_should_take"
                    value={form.who_should_take}
                    onChange={(e) => setForm({ ...form, who_should_take: e.target.value })}
                    rows={2}
                  />
                </div>

                <div>
                  <Label htmlFor="who_should_avoid">Who Should Avoid (one per line)</Label>
                  <Textarea
                    id="who_should_avoid"
                    value={form.who_should_avoid}
                    onChange={(e) => setForm({ ...form, who_should_avoid: e.target.value })}
                    rows={2}
                  />
                </div>

                <div>
                  <Label htmlFor="side_effects">Side Effects (one per line)</Label>
                  <Textarea
                    id="side_effects"
                    value={form.side_effects}
                    onChange={(e) => setForm({ ...form, side_effects: e.target.value })}
                    rows={2}
                  />
                </div>

                <div>
                  <Label htmlFor="disclaimer">Disclaimer</Label>
                  <Input
                    id="disclaimer"
                    value={form.disclaimer}
                    onChange={(e) => setForm({ ...form, disclaimer: e.target.value })}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isSaving}>
                  {isSaving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  {editingSupplement ? "Update Supplement" : "Create Supplement"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Supplements ({supplements.length})</CardTitle>
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
                    <TableHead>Dosage</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {supplements.map((supplement) => (
                    <TableRow key={supplement.id}>
                      <TableCell className="font-medium">{supplement.name}</TableCell>
                      <TableCell className="capitalize">
                        {supplement.category.split("-").join(" ")}
                      </TableCell>
                      <TableCell>{supplement.dosage}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEditDialog(supplement)}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(supplement.id)}
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
