import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { Dumbbell, Pill, Utensils, Quote, ChevronRight, Target, TrendingUp, Heart } from "lucide-react";
import heroImage from "@/assets/hero-gym.jpg";

const features = [
  {
    icon: Dumbbell,
    title: "Workout Plans",
    description: "Expert-designed routines for all fitness levels from beginner to advanced.",
    link: "/workouts",
    color: "primary",
  },
  {
    icon: Pill,
    title: "Supplement Guide",
    description: "Comprehensive information on supplements, their benefits, and safe usage.",
    link: "/supplements",
    color: "accent",
  },
  {
    icon: Utensils,
    title: "Nutrition Tips",
    description: "Meal plans and macro breakdowns to fuel your fitness goals.",
    link: "/nutrition",
    color: "primary",
  },
];

const testimonials = [
  {
    name: "Raj Sharma",
    role: "Fitness Enthusiast",
    quote: "FitFuel transformed my approach to fitness. The workout guides are incredibly detailed and the supplement info helped me make informed choices.",
    avatar: "AJ",
  },
  {
    name: "Vaishnavi Patil",
    role: "Beginner Lifter",
    quote: "As a complete beginner, I was overwhelmed by all the gym info out there. FitFuel made everything simple and easy to understand.",
    avatar: "VP",
  },
  {
    name: "Sarthak Patil",
    role: "Intermediate Athlete",
    quote: "The nutrition plans are spot on! I've seen amazing results following the muscle gain meal plan and workout routines.",
    avatar: "SP",
  },
];

const stats = [
  { value: "50+", label: "Workout Exercises" },
  { value: "8+", label: "Supplements Covered" },
  { value: "3", label: "Meal Plan Goals" },
  { value: "100%", label: "Free Access" },
];

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Modern gym interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/70" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-fade-in">
              Fuel Your
              <span className="text-primary text-glow block">Fitness Journey</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed animate-fade-in" style={{ animationDelay: '0.15s' }}>
              Your complete guide to workouts, supplements, and nutrition. 
              Whether you're just starting or pushing limits, we've got you covered.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <Button asChild variant="hero" size="xl">
                <Link to="/workouts">
                  Explore Workouts
                  <ChevronRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="hero-outline" size="xl">
                <Link to="/supplements">Learn Supplements</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="font-display text-4xl md:text-5xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground text-sm md:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16 animate-fade-in">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to
              <span className="text-primary"> Succeed</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Comprehensive resources designed for beginners and intermediate gym-goers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Link
                key={index}
                to={feature.link}
                className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/50 hover-lift card-glow animate-slide-up"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div
                  className={`w-14 h-14 rounded-xl ${
                    feature.color === "primary" ? "gradient-primary" : "gradient-accent"
                  } flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                >
                  <feature.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why FitFuel Section */}
      <section className="py-20 md:py-28 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
                Why Choose <span className="text-primary">FitFuel</span>?
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center shrink-0">
                    <Target className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Beginner Friendly</h4>
                    <p className="text-muted-foreground">
                      Every exercise and supplement comes with easy-to-understand explanations and tips.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg gradient-accent flex items-center justify-center shrink-0">
                    <TrendingUp className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Progress at Your Pace</h4>
                    <p className="text-muted-foreground">
                      Filter workouts by difficulty level and progress as you get stronger.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center shrink-0">
                    <Heart className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Safety First</h4>
                    <p className="text-muted-foreground">
                      We include important disclaimers and guidance for safe supplement usage.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="p-6 rounded-2xl bg-background border border-border h-40 flex flex-col justify-center">
                  <Dumbbell className="w-8 h-8 text-primary mb-3" />
                  <p className="text-sm text-muted-foreground">Chest • Back • Legs • Arms • Core • Cardio</p>
                </div>
                <div className="p-6 rounded-2xl bg-primary/10 border border-primary/20 h-48 flex flex-col justify-center">
                  <p className="font-display text-2xl font-bold text-primary">BMI & Protein</p>
                  <p className="text-sm text-muted-foreground mt-2">Calculator included</p>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="p-6 rounded-2xl bg-accent/20 border border-accent/30 h-48 flex flex-col justify-center">
                  <p className="font-display text-2xl font-bold text-accent">Meal Plans</p>
                  <p className="text-sm text-muted-foreground mt-2">Veg & Non-Veg options</p>
                </div>
                <div className="p-6 rounded-2xl bg-background border border-border h-40 flex flex-col justify-center">
                  <Pill className="w-8 h-8 text-accent mb-3" />
                  <p className="text-sm text-muted-foreground">Protein • Creatine • BCAAs • Vitamins</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              What People Are <span className="text-primary">Saying</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Real feedback from fitness enthusiasts who use FitFuel
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all animate-slide-up"
                style={{ animationDelay: `${index * 0.12}s` }}
              >
                <Quote className="w-10 h-10 text-primary/30 mb-4" />
                <p className="text-muted-foreground mb-6 italic">"{testimonial.quote}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-semibold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your <span className="text-primary text-glow">Transformation</span>?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Explore our comprehensive guides and take the first step towards a healthier, stronger you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="hero" size="xl">
                <Link to="/workouts">
                  Start Training
                  <ChevronRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="accent" size="xl">
                <Link to="/calculator">
                  Calculate Your Macros
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
