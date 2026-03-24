import { Layout } from "@/components/layout/Layout";
import { blogPosts, blogCategories } from "@/data/blog";
import { BookOpen } from "lucide-react";

const Blog = () => {
  return (
    <Layout>
      <section className="py-16 md:py-24 bg-card border-b border-border">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Fitness <span className="text-primary">Blog</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Debunk fitness myths, avoid common mistakes, and learn about recovery.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          {blogCategories.map((category) => (
            <div key={category.id} className="mb-12">
              <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-2">
                <span>{category.icon}</span> {category.name}
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {blogPosts.filter((p) => p.category === category.id).map((post) => (
                  <div key={post.id} className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all">
                    <BookOpen className="w-8 h-8 text-primary mb-4" />
                    <h3 className="font-display text-lg font-semibold mb-2">{post.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{post.excerpt}</p>
                    <div className="text-sm text-muted-foreground space-y-2">
                      {post.content.slice(0, 2).map((p, i) => <p key={i}>{p}</p>)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
