import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { supabase } from '@/lib/customSupabaseClient';
import { usePageContent } from '@/hooks/usePageContent';

const ReviewsSection = () => {
  const { content, loading: contentLoading } = usePageContent();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [meta, setMeta] = useState({
    rating: null,
    user_ratings_total: null,
    source: null,
  });

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);

      const hydrateFromGoogle = async () => {
        try {
          const res = await fetch('/google-reviews.json', { cache: 'no-store' });

          if (!res.ok) {
            return false;
          }

          const data = await res.json();
          if (!data || !Array.isArray(data.reviews) || data.reviews.length === 0) {
            return false;
          }

          setReviews(
            data.reviews.map((review) => ({
              id: review.id,
              author_name: review.author_name,
              profile_photo_url: review.profile_photo_url,
              rating: review.rating,
              relative_time_description: review.relative_time_description,
              text: review.text,
            }))
          );
          setMeta({
            rating: data.rating ?? null,
            user_ratings_total: data.user_ratings_total ?? null,
            source: 'Google',
          });
          return true;
        } catch (error) {
          console.warn('Unable to load google reviews:', error);
          return false;
        }
      };

      const hydrateFromSupabase = async () => {
        const { data, error } = await supabase
          .from('reviews')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(6);

        if (error) {
          console.error('Error fetching reviews from Supabase:', error);
          setReviews([]);
          setMeta({
            rating: null,
            user_ratings_total: null,
            source: null,
          });
        } else {
          setReviews(data || []);
          setMeta({
            rating: null,
            user_ratings_total: data?.length || null,
            source: 'Community',
          });
        }
      };

      const hydratedFromGoogle = await hydrateFromGoogle();
      if (!hydratedFromGoogle) {
        await hydrateFromSupabase();
      }

      setLoading(false);
    };

    fetchReviews();
  }, []);

  if (contentLoading || !content) {
    return null;
  }

  return (
    <section id="reviews" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 space-y-4"
        >
          <div>
            <p className="font-script text-3xl md:text-4xl text-primary mb-2">
              {content.reviews_label || 'Testimonials'}
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-cormorant font-bold text-white mb-4">
              {content.reviews_title || 'What Our Guests Say'}
            </h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              {content.reviews_subtitle || 'Hear from those who have experienced our hospitality'}
            </p>
          </div>

          {meta.rating && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="flex items-center gap-3 bg-background/70 px-5 py-3 rounded-full shadow-lg border border-white/10">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      className={`h-5 w-5 ${
                        index < Math.round(meta.rating)
                          ? 'text-primary fill-primary'
                          : 'text-muted-foreground'
                      }`}
                    />
                  ))}
                </div>
                <div className="text-left">
                  <p className="text-2xl font-semibold text-foreground leading-none">
                    {meta.rating.toFixed(1)}
                  </p>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">
                    {meta.user_ratings_total || 0} reviews on {meta.source}
                  </p>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No reviews yet. Be the first to share your experience!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <motion.div
                key={review.id ?? `${review.author_name}-${index}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < (review.rating || 0)
                              ? 'text-primary fill-primary'
                              : 'text-muted-foreground'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-muted-foreground italic line-clamp-4">
                      "{review.text || 'Great experience!'}"
                    </p>
                    <div className="flex items-center gap-3 pt-2 border-t border-border">
                      {review.profile_photo_url ? (
                        <img
                          src={review.profile_photo_url}
                          alt={review.author_name || 'Guest'}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                          <span className="text-primary font-semibold">
                            {(review.author_name || 'G')[0].toUpperCase()}
                          </span>
                        </div>
                      )}
                      <div>
                        <p className="font-semibold text-foreground">
                          {review.author_name || 'Anonymous Guest'}
                        </p>
                        {review.relative_time_description && (
                          <p className="text-sm text-muted-foreground">
                            {review.relative_time_description}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ReviewsSection;