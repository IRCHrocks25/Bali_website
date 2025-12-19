import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { UtensilsCrossed, FileText, Sparkles } from 'lucide-react';
import { supabase } from '@/lib/customSupabaseClient';
import { usePageContent } from '@/hooks/usePageContent';
import { Button } from './ui/button';

const Menu = () => {
  const { content, loading: contentLoading } = usePageContent();
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenuItems = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .order('order', { ascending: true });

      if (error) {
        console.error('Error fetching menu items:', error);
      } else {
        setMenuItems(data);
      }
      setLoading(false);
    };

    fetchMenuItems();
  }, []);

  const menuCategories = [...new Set(menuItems.map(item => item.category))].sort((a, b) => {
    const orderA = menuItems.find(item => item.category === a)?.order || 0;
    const orderB = menuItems.find(item => item.category === b)?.order || 0;
    return orderA - orderB;
  });

  const menuPdfCards = [
    {
      title: content?.menu_pdf_primary_title || 'New Menu Food',
      subtitle:
        content?.menu_pdf_primary_subtitle ||
        'Explore the latest culinary creations from our chef.',
      url:
        content?.menu_pdf_primary_url ||
        'https://res.cloudinary.com/dcuswyfur/image/upload/v1763057740/New_Menu_Food_A3_-2_qg42to.pdf',
      cta: content?.menu_pdf_primary_cta || 'Download Menu',
    },
    {
      title: content?.menu_pdf_secondary_title || 'Signature Drinks & Bites',
      subtitle:
        content?.menu_pdf_secondary_subtitle ||
        'Sip and savor our lounge favourites and handcrafted cocktails.',
      url:
        content?.menu_pdf_secondary_url ||
        'https://res.cloudinary.com/dcuswyfur/image/upload/v1763057741/menu_12_h2hnfu.pdf',
      cta: content?.menu_pdf_secondary_cta || 'View Menu',
    },
  ].filter((card) => Boolean(card.url));


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  if (contentLoading || loading) {
    return (
      <div className="text-center p-10">
        <UtensilsCrossed className="animate-spin h-8 w-8 mx-auto text-primary" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-8 bg-card/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-5xl md:text-6xl font-playfair font-bold text-primary mb-2">
          {content?.menu_title || 'Our Menu'}
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {content?.menu_subtitle || 'A symphony of French elegance and Balinese soul.'}
        </p>
      </motion.div>

      {menuPdfCards.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
        >
          {menuPdfCards.map((card, index) => (
            <div
              key={`${card.title}-${index}`}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-primary/10 via-background/60 to-background/30 p-[1px]"
            >
              <div className="relative h-full rounded-3xl bg-background/90 p-6 sm:p-8 backdrop-blur flex flex-col gap-6">
                <div className="absolute -top-16 -right-12 h-44 w-44 rounded-full bg-primary/30 blur-3xl pointer-events-none" />
                <div className="absolute top-4 right-4 text-primary drop-shadow-md">
                  <Sparkles className="h-6 w-6" />
                </div>
                <div className="flex items-center gap-4">
                  <div className="rounded-2xl bg-primary/15 p-3">
                    <FileText className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-[0.35em] text-primary/70 mb-1">
                      Chef’s Selection
                    </p>
                    <h3 className="text-2xl font-semibold text-foreground">{card.title}</h3>
                  </div>
                </div>
                <p className="text-muted-foreground/90 leading-relaxed">
                  {card.subtitle}
                </p>
                <div className="mt-auto flex flex-wrap items-center gap-4 pt-2">
                  <Button
                    asChild
                    size="lg"
                    className="shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-shadow"
                  >
                    <a href={card.url} target="_blank" rel="noopener noreferrer">
                      {card.cta}
                    </a>
                  </Button>
                  <a
                    href={card.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary/80 hover:text-primary underline underline-offset-4 transition-colors duration-200"
                  >
                    Preview in new tab
                  </a>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      )}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-12"
      >
        {menuCategories.map((category) => (
          <motion.div key={category} variants={itemVariants}>
            <h3 className="text-3xl font-playfair font-semibold text-primary-foreground mb-6 border-b-2 border-primary pb-2">
              {category}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {menuItems
                .filter((item) => item.category === category)
                .map((item) => (
                  <motion.div key={item.id} variants={itemVariants} className="group">
                    <div className="flex justify-between items-baseline">
                      <h4 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                        {item.name}
                      </h4>
                      <span className="text-lg font-bold text-primary ml-4">
                        {item.price}
                      </span>
                    </div>
                    <p className="text-muted-foreground mt-1">
                      {item.description}
                    </p>
                  </motion.div>
                ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Menu;