import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { UtensilsCrossed } from 'lucide-react';
import { supabase } from '@/lib/customSupabaseClient';
import { usePageContent } from '@/hooks/usePageContent';

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
        <h2 className="text-5xl md:text-6xl font-cormorant font-bold text-primary mb-2">
          {content?.menu_title || 'Our Menu'}
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {content?.menu_subtitle || 'A symphony of French elegance and Balinese soul.'}
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-12"
      >
        {menuCategories.map((category) => (
          <motion.div key={category} variants={itemVariants}>
            <h3 className="text-3xl font-cormorant font-semibold text-primary-foreground mb-6 border-b-2 border-primary pb-2">
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