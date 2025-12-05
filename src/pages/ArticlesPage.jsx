import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { format, parseISO } from "date-fns";
import { enUS } from "date-fns/locale";
import { Calendar, ArrowRight, Loader2, BookOpen, Filter } from "lucide-react";
import { supabase } from "@/lib/customSupabaseClient";
import { usePageContent } from "@/hooks/usePageContent";
import { staticArticles } from "@/data/articles";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";

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
const ArticlesPage = () => {
  const { content, loading: contentLoading } = usePageContent();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState("all");

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

  if (contentLoading) {
    return <Preloader />;
  }

  // Combine bali articles with fetched articles
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

  // Get unique months from articles
  const getUniqueMonths = () => {
    const monthsMap = new Map();
    for (const article of sortedArticles) {
      if (article.published_at) {
        const date =
          typeof article.published_at === "string"
            ? parseISO(article.published_at)
            : new Date(article.published_at);
        const monthKey = format(date, "yyyy-MM");
        const monthLabel = format(date, "MMMM yyyy", { locale: enUS });
        if (!monthsMap.has(monthKey)) {
          monthsMap.set(monthKey, monthLabel);
        }
      }
    }
    return Array.from(monthsMap.entries()).sort((a, b) =>
      b[0].localeCompare(a[0])
    ); // Sort descending
  };

  const availableMonths = getUniqueMonths();

  // Filter articles by selected month
  const getFilteredArticles = () => {
    if (selectedMonth === "all") {
      return sortedArticles;
    }
    return sortedArticles.filter((article) => {
      if (!article.published_at) return false;
      const date =
        typeof article.published_at === "string"
          ? parseISO(article.published_at)
          : new Date(article.published_at);
      const monthKey = format(date, "yyyy-MM");
      return monthKey === selectedMonth;
    });
  };

  const filteredArticles = getFilteredArticles();

  return (
    <>
      <Helmet>
        <title>
          {content?.articles_page_title ||
            "Articles - The Club Bali | Latest Stories & Insights"}
        </title>
        <meta
          name="description"
          content={
            content?.articles_page_description ||
            "Discover the latest articles, stories, and insights from The Club Bali. Learn about our nightlife, fine dining experiences, and pool party events in Bali."
          }
        />
      </Helmet>

      <div className="bg-background text-foreground font-sans min-h-screen">
        <Navbar />
        <main className="pt-20">
          <section className="section-padding bg-card/30">
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
                  <h1 className="font-cormorant text-5xl md:text-6xl font-medium text-foreground">
                    {content?.articles_page_title || "All Articles"}
                  </h1>
                </div>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/70">
                  {content?.articles_page_subtitle ||
                    "Discover our latest stories, insights, and updates about The Club Bali"}
                </p>
              </motion.div>

              {/* Month Filter */}
              {availableMonths.length > 0 && (
                <motion.div
                  className="flex items-center justify-center gap-4 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Filter className="w-5 h-5 text-primary" />
                  <label
                    htmlFor="month-filter"
                    className="text-foreground/80 font-medium"
                  >
                    Filter by Month:
                  </label>
                  <select
                    id="month-filter"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="px-4 py-2 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  >
                    <option value="all">All Months</option>
                    {availableMonths.map(([monthKey, monthLabel]) => (
                      <option key={monthKey} value={monthKey}>
                        {monthLabel}
                      </option>
                    ))}
                  </select>
                </motion.div>
              )}

              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <Loader2 className="w-12 h-12 animate-spin text-primary" />
                </div>
              ) : filteredArticles.length === 0 ? (
                <div className="text-center text-foreground/70 py-10">
                  <p>
                    {selectedMonth === "all"
                      ? "No articles available at the moment. Please check back later!"
                      : "No articles found for the selected month."}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredArticles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              )}
            </div>
          </section>
        </main>
        <Footer content={content} />
      </div>
    </>
  );
};

export default ArticlesPage;
