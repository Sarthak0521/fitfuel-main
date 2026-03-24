import { Layout } from "@/components/layout/Layout";
import { Target, Heart, Users } from "lucide-react";

const About = () => (
  <Layout>
    <section className="py-16 md:py-24 bg-card border-b border-border">
      <div className="container mx-auto px-4 max-w-3xl text-center">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">About <span className="text-primary">FitFuel</span></h1>
        <p className="text-muted-foreground text-lg">Empowering fitness enthusiasts with knowledge and tools to achieve their goals.</p>
      </div>
    </section>
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            { icon: Target, title: "Our Mission", desc: "To provide accurate, accessible fitness education for everyone." },
            { icon: Heart, title: "Our Values", desc: "Safety first, evidence-based information, and community support." },
            { icon: Users, title: "Our Community", desc: "Beginners to advanced athletes all finding value in our resources." },
          ].map((item, i) => (
            <div key={i} className="p-8 rounded-2xl bg-card border border-border text-center">
              <div className="w-16 h-16 rounded-xl gradient-primary mx-auto mb-4 flex items-center justify-center">
                <item.icon className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default About;
