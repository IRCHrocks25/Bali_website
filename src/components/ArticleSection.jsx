import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { format, parseISO } from "date-fns";
import { enUS } from "date-fns/locale";
import { Calendar, ArrowRight, Loader2, BookOpen } from "lucide-react";
import { supabase } from "@/lib/customSupabaseClient";
import { usePageContent } from "@/hooks/usePageContent";
import { staticArticles } from "@/data/articles";

const ArticleCard = ({ article }) => {
  const publishedDate = article.published_at
    ? typeof article.published_at === "string"
      ? parseISO(article.published_at)
      : article.published_at
    : null;

  const articleUrl = article.external_url || `/articles/${article.id}`;

  return (
    <motion.div
      className="bg-card rounded-2xl overflow-hidden shadow-lg group flex flex-col h-full"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5 }}
    >
      {article.category && (
        <div className="px-6 pt-6">
          <span className="text-xs uppercase font-semibold tracking-wider bg-primary/20 text-primary px-3 py-1 rounded-full">
            {article.category}
          </span>
        </div>
      )}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          {publishedDate && (
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4 text-primary" />
              {format(publishedDate, "d MMM yyyy", {
                locale: enUS,
              })}
            </div>
          )}
        </div>
        <h3 className="font-cormorant text-2xl font-bold mb-3 flex-grow text-foreground">
          {article.title}
        </h3>
        <p className="text-foreground/70 text-sm mb-6 line-clamp-3">
          {article.excerpt || article.description || ""}
        </p>
        <div className="mt-auto pt-4 border-t border-border">
          <Button asChild variant="outline" className="w-full group/btn">
            {article.external_url ? (
              <a
                href={article.external_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Read More
                <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
              </a>
            ) : (
              <Link to={articleUrl}>
                Read More
                <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

// Articles are now imported from @/data/articles

const ArticleSection = () => {
  const { content, loading: contentLoading } = usePageContent();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchArticles = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .order("published_at", { ascending: false });

    if (error) {
      // If table doesn't exist, just set empty array (graceful degradation)
      if (
        error.code === "PGRST116" ||
        error.message.includes("does not exist")
      ) {
        console.log(
          "Articles table does not exist yet. You can create it in Supabase."
        );
        setArticles([]);
      } else {
        console.error("Error fetching articles:", error);
        setArticles([]);
      }
    } else {
      setArticles(data || []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  if (contentLoading || !content) {
    return null;
  }

  // Combine static articles with fetched articles
  const allArticles = [...staticArticles, ...articles];

  // Sort articles by date in descending order (newest first)
  const sortedArticles = [...allArticles].sort((a, b) => {
    const getDate = (article) => {
      if (!article.published_at) return new Date(0);
      return typeof article.published_at === "string"
        ? parseISO(article.published_at)
        : new Date(article.published_at);
    };
    const dateA = getDate(a);
    const dateB = getDate(b);
    return dateB - dateA; // Descending order (newest first)
  });

  return (
    <section id="articles" className="section-padding bg-card/30">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.8, ease: "easeOut" },
            },
          }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="h-8 w-8 text-primary" />
            <h2 className="font-cormorant text-5xl md:text-6xl font-medium text-foreground">
              {content.articles_title || "Latest Articles"}
            </h2>
          </div>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/70">
            {content.articles_subtitle ||
              "Discover our latest stories, insights, and updates"}
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-12 h-12 animate-spin text-primary" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedArticles.slice(0, 3).map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
            {sortedArticles.length > 3 && (
              <motion.div
                className="flex justify-center mt-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Button asChild variant="primary" size="lg" className="group">
                  <Link to="/articles">
                    View More Articles
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </motion.div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default ArticleSection;
