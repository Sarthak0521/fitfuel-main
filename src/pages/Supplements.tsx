import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supplements, supplementCategories, type Supplement } from "@/data/supplements";
import { AlertTriangle, CheckCircle2, XCircle, ChevronDown, ChevronUp, Pill, Shield } from "lucide-react";

const Supplements = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredSupplements = selectedCategory
    ? supplements.filter((s) => s.category === selectedCategory)
    : supplements;

  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 md:py-24 bg-card border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Supplement <span className="text-primary">Guide</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Learn about popular fitness supplements, their benefits, proper dosages, 
              and who should or shouldn't take them.
            </p>
          </div>
        </div>
      </section>

      {/* Disclaimer Banner */}
      <section className="bg-destructive/10 border-y border-destructive/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-destructive shrink-0" />
            <p className="text-sm">
              <span className="font-semibold text-destructive">Medical Disclaimer:</span>{" "}
              <span className="text-muted-foreground">
                The information provided is for educational purposes only. Always consult a healthcare 
                professional before starting any supplement regimen.
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-background border-b border-border sticky top-16 md:top-20 z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(null)}
            >
              All Supplements
            </Button>
            {supplementCategories.map((cat) => (
              <Button
                key={cat.id}
                variant={selectedCategory === cat.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
              >
                <span className="mr-1">{cat.icon}</span>
                {cat.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Supplements List */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="space-y-6">
            {filteredSupplements.map((supplement) => (
              <SupplementCard
                key={supplement.id}
                supplement={supplement}
                isExpanded={expandedId === supplement.id}
                onToggle={() => setExpandedId(expandedId === supplement.id ? null : supplement.id)}
              />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

interface SupplementCardProps {
  supplement: Supplement;
  isExpanded: boolean;
  onToggle: () => void;
}

function SupplementCard({ supplement, isExpanded, onToggle }: SupplementCardProps) {
  const category = supplementCategories.find((c) => c.id === supplement.category);

  return (
    <div className="rounded-2xl bg-card border border-border hover:border-primary/30 transition-all overflow-hidden">
      {/* Header */}
      <button
        onClick={onToggle}
        className="w-full p-6 flex items-center justify-between text-left"
      >
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center shrink-0">
            <Pill className="w-7 h-7 text-primary-foreground" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-display text-xl font-semibold">{supplement.name}</h3>
              <Badge variant="outline" className="text-xs">
                {category?.icon} {category?.name}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-1">
              {supplement.whatIsIt}
            </p>
          </div>
        </div>
        <div className="ml-4 shrink-0">
          {isExpanded ? (
            <ChevronUp className="w-6 h-6 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-6 h-6 text-muted-foreground" />
          )}
        </div>
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="px-6 pb-6 border-t border-border pt-6 space-y-6 animate-fade-in">
          {/* What Is It */}
          <div>
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <span className="w-6 h-6 rounded bg-primary/20 flex items-center justify-center text-sm">📖</span>
              What Is It?
            </h4>
            <p className="text-muted-foreground">{supplement.whatIsIt}</p>
          </div>

          {/* Benefits */}
          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded bg-primary/20 flex items-center justify-center text-sm">✨</span>
              Benefits
            </h4>
            <ul className="grid sm:grid-cols-2 gap-2">
              {supplement.benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* How to Consume & Dosage */}
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="p-4 rounded-xl bg-muted/50">
              <h4 className="font-semibold mb-2">How to Consume</h4>
              <p className="text-sm text-muted-foreground">{supplement.howToConsume}</p>
            </div>
            <div className="p-4 rounded-xl bg-muted/50">
              <h4 className="font-semibold mb-2">Recommended Dosage</h4>
              <p className="text-sm text-muted-foreground">{supplement.dosage}</p>
            </div>
          </div>

          {/* Side Effects */}
          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-accent" />
              Possible Side Effects
            </h4>
            <ul className="space-y-1">
              {supplement.sideEffects.map((effect, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <span className="text-accent">•</span>
                  <span className="text-muted-foreground">{effect}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Who Should / Shouldn't Take */}
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                Who Should Take
              </h4>
              <ul className="space-y-2">
                {supplement.whoShouldTake.map((who, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <span className="text-primary">✓</span>
                    <span className="text-muted-foreground">{who}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <XCircle className="w-5 h-5 text-destructive" />
                Who Should Avoid
              </h4>
              <ul className="space-y-2">
                {supplement.whoShouldAvoid.map((who, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <span className="text-destructive">✗</span>
                    <span className="text-muted-foreground">{who}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Supplements;
