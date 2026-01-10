import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { format, parseISO } from "date-fns";
import { enUS } from "date-fns/locale";
import { Calendar, ArrowRight, Loader2 } from "lucide-react";
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
      className="bg-[#1a1a1a] rounded-lg overflow-hidden group flex flex-col h-full cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100, damping: 15 }}
      whileHover={{ y: -8, scale: 1.02 }}
    >
      {/* Thumbnail Image */}
      {article.image_url && (
        <div className="relative w-full h-48 overflow-hidden">
          <img
            src={article.image_url}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      )}
      <div className="p-6 flex flex-col flex-grow">
        {article.category && (
          <div className="mb-4">
            <span className="text-xs uppercase font-semibold tracking-wider bg-primary text-primary-foreground px-3 py-1.5 rounded">
              {article.category}
            </span>
          </div>
        )}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
          {publishedDate && (
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="font-sans">
                {format(publishedDate, "d MMM yyyy", {
                  locale: enUS,
                })}
              </span>
            </div>
          )}
        </div>
        <h3 className="font-playfair text-xl md:text-2xl font-semibold mb-4 flex-grow text-white leading-tight">
          {article.title}
        </h3>
        <p className="text-gray-300 text-sm md:text-base mb-6 line-clamp-3 font-sans leading-relaxed">
          {article.excerpt || article.description || ""}
        </p>
        <div className="mt-auto">
          {article.external_url ? (
            <a
              href={article.external_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-primary text-primary px-4 py-2 rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors font-sans text-sm font-medium group/btn"
            >
              READ MORE
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </a>
          ) : (
            <Link
              to={articleUrl}
              className="inline-flex items-center gap-2 border border-primary text-primary px-4 py-2 rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors font-sans text-sm font-medium group/btn"
            >
              READ MORE
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          )}
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
    <section id="articles" className="py-16 md:py-20 lg:py-24 bg-[#000000]">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12 md:mb-16"
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
          <h2 className="font-script text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-4">
            {content.articles_title || "Latest from The Bali Club"}
          </h2>
          <p className="text-gray-300 text-base md:text-lg font-sans">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {sortedArticles.slice(0, 3).map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
            {sortedArticles.length > 3 && (
              <motion.div
                className="flex justify-center mt-12 md:mt-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Link
                  to="/articles"
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-lg transition-transform transform hover:scale-105 font-sans font-semibold text-base md:text-lg uppercase"
                >
                  VIEW MORE ARTICLES
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default ArticleSection;
