import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator as CalcIcon, Scale, Dumbbell } from "lucide-react";

const Calculator = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [goal, setGoal] = useState<"lose" | "maintain" | "gain">("maintain");
  const [results, setResults] = useState<{ bmi: number; protein: number } | null>(null);

  const calculate = () => {
    const h = parseFloat(height) / 100;
    const w = parseFloat(weight);
    if (h > 0 && w > 0) {
      const bmi = w / (h * h);
      const proteinMultiplier = goal === "gain" ? 2.2 : goal === "lose" ? 1.8 : 1.6;
      const protein = w * proteinMultiplier;
      setResults({ bmi: Math.round(bmi * 10) / 10, protein: Math.round(protein) });
    }
  };

  const getBmiCategory = (bmi: number) => {
    if (bmi < 18.5) return { label: "Underweight", color: "text-accent" };
    if (bmi < 25) return { label: "Normal", color: "text-primary" };
    if (bmi < 30) return { label: "Overweight", color: "text-accent" };
    return { label: "Obese", color: "text-destructive" };
  };

  return (
    <Layout>
      <section className="py-16 md:py-24 bg-card border-b border-border">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            BMI & Protein <span className="text-primary">Calculator</span>
          </h1>
          <p className="text-muted-foreground text-lg">Calculate your BMI and daily protein needs.</p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="p-8 rounded-2xl bg-card border border-border">
            <div className="grid gap-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div><Label>Height (cm)</Label><Input type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="170" /></div>
                <div><Label>Weight (kg)</Label><Input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="70" /></div>
              </div>
              <div><Label>Age</Label><Input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="25" /></div>
              <div>
                <Label>Goal</Label>
                <div className="flex gap-2 mt-2">
                  {(["lose", "maintain", "gain"] as const).map((g) => (
                    <Button key={g} variant={goal === g ? "default" : "outline"} size="sm" onClick={() => setGoal(g)} className="flex-1">
                      {g === "lose" ? "🔥 Lose" : g === "gain" ? "💪 Gain" : "⚖️ Maintain"}
                    </Button>
                  ))}
                </div>
              </div>
              <Button variant="hero" size="lg" onClick={calculate}><CalcIcon className="w-5 h-5" /> Calculate</Button>
            </div>

            {results && (
              <div className="mt-8 pt-8 border-t border-border grid sm:grid-cols-2 gap-6">
                <div className="p-6 rounded-xl bg-muted/50 text-center">
                  <Scale className="w-10 h-10 mx-auto mb-3 text-primary" />
                  <p className="text-3xl font-bold">{results.bmi}</p>
                  <p className={`font-medium ${getBmiCategory(results.bmi).color}`}>{getBmiCategory(results.bmi).label}</p>
                  <p className="text-xs text-muted-foreground mt-1">BMI</p>
                </div>
                <div className="p-6 rounded-xl bg-muted/50 text-center">
                  <Dumbbell className="w-10 h-10 mx-auto mb-3 text-accent" />
                  <p className="text-3xl font-bold">{results.protein}g</p>
                  <p className="text-sm text-muted-foreground">Daily Protein</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Calculator;
