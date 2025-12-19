import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { menuItems } from '@/utils/constants';

const MenuModal = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.98 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="relative bg-card text-foreground rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-border"
          >
            <div className="sticky top-0 bg-card/80 backdrop-blur-sm z-10 flex items-center justify-between p-6 border-b border-border">
              <h3 className="font-playfair text-3xl font-medium">
                Our Menu
              </h3>
               <button
                onClick={onClose}
                className="bg-muted hover:bg-accent rounded-full p-2 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8">
              {menuItems.map((category, categoryIndex) => (
                <motion.div
                  key={categoryIndex}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                  className="mb-10"
                >
                  <h4 className="font-playfair text-2xl font-medium text-primary mb-6">
                    {category.category}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    {category.items.map((item, itemIndex) => (
                      <div key={itemIndex}>
                          <div className="flex justify-between items-baseline">
                            <h5 className="font-semibold text-foreground text-base">
                              {item.name}
                            </h5>
                            <p className="font-medium text-foreground text-base">
                              {item.price}
                            </p>
                          </div>
                          {item.description && (
                            <p className="text-muted-foreground text-sm mt-1">
                              {item.description}
                            </p>
                          )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default MenuModal;