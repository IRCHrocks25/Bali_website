import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { format, parseISO } from "date-fns";
import { enUS } from "date-fns/locale";
import { Calendar, ArrowLeft, FileQuestion } from "lucide-react";
import { supabase } from "@/lib/customSupabaseClient";
import { usePageContent } from "@/hooks/usePageContent";
import { staticArticles } from "@/data/articles";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
// Articles are now imported from @/data/articles

const ArticleDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { content, loading: contentLoading } = usePageContent();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);

      // Check if it's a bali article
      const staticArticle = staticArticles.find((a) => a.id === id);
      if (staticArticle) {
        setArticle(staticArticle);
        setLoading(false);
        return;
      }

      // Try to fetch from Supabase
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching article:", error);
        setArticle(null);
      } else {
        setArticle(data);
      }
      setLoading(false);
    };

    fetchArticle();
  }, [id]);

  if (contentLoading || loading) {
    return <Preloader />;
  }

  if (!article) {
    return (
      <>
        <Helmet>
          <title>Article Not Found | The Club Bali</title>
          <meta
            name="description"
            content="The article you're looking for doesn't exist. Browse our collection of articles about fine dining, nightlife, and experiences at The Club Bali."
          />
        </Helmet>
        <div className="bg-background text-foreground font-sans min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1 flex items-center justify-center px-4 min-h-screen">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-md w-full text-center"
            >
              <div className="mb-6 flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl"></div>
                  <div className="relative bg-card border border-border rounded-full p-6">
                    <FileQuestion className="w-16 h-16 text-primary" />
                  </div>
                </div>
              </div>
              <h1 className="font-cormorant text-4xl md:text-5xl font-bold mb-4 text-foreground">
                Article Not Found
              </h1>
              <p className="text-foreground/70 mb-8 text-lg">
                The article you're looking for doesn't exist or may have been
                moved.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild variant="default" className="group">
                  <Link to="/articles">
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Articles
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/">Go to Home</Link>
                </Button>
              </div>
            </motion.div>
          </main>
          <Footer content={content} />
        </div>
      </>
    );
  }

  const publishedDate = article.published_at
    ? typeof article.published_at === "string"
      ? parseISO(article.published_at)
      : article.published_at
    : null;

  return (
    <>
      <Helmet>
        <title>{article.title} | The Club Bali</title>
        <meta
          name="description"
          content={article.excerpt || article.description || ""}
        />
        <meta property="og:title" content={article.title} />
        <meta
          property="og:description"
          content={article.excerpt || article.description || ""}
        />
        {article.image_url && (
          <meta property="og:image" content={article.image_url} />
        )}
      </Helmet>

      <div className="bg-background text-foreground font-sans min-h-screen">
        <Navbar />
        <main className="pt-20">
          <article className="section-padding">
            <div className="container mx-auto px-4 max-w-4xl">
              {/* Back Button */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                <Button
                  asChild
                  variant="ghost"
                  className="group"
                  onClick={() => navigate(-1)}
                >
                  <Link to="/articles">
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Back to Articles
                  </Link>
                </Button>
              </motion.div>

              {/* Article Header */}
              <motion.header
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                {article.category && (
                  <div className="mb-4">
                    <span className="text-sm uppercase font-semibold tracking-wider bg-primary/20 text-primary px-4 py-2 rounded-full">
                      {article.category}
                    </span>
                  </div>
                )}
                <h1 className="font-cormorant text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
                  {article.title}
                </h1>
                {publishedDate && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-5 h-5 text-primary" />
                    <time dateTime={article.published_at}>
                      {format(publishedDate, "EEEE, d MMMM yyyy", {
                        locale: enUS,
                      })}
                    </time>
                  </div>
                )}
              </motion.header>

              {/* Featured Image */}
              {article.image_url && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="mb-12 rounded-2xl overflow-hidden"
                >
                  <img
                    src={article.image_url}
                    alt={article.title}
                    className="w-full h-auto object-cover"
                  />
                </motion.div>
              )}

              {/* Article Content */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="article-content prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{
                  __html: article.fullContent || article.description || "",
                }}
              />
            </div>
          </article>
        </main>
        <Footer content={content} />
      </div>
    </>
  );
};

export default ArticleDetailPage;
