import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { openWhatsApp } from '@/utils/helpers';
import { usePageContent } from '@/hooks/usePageContent';

const ContactSection = () => {
  const { content, loading } = usePageContent();

  if (loading || !content) {
    return null;
  }

  const contactInfo = [
    {
      icon: MapPin,
      label: 'Address',
      value: content.contact_address || 'Bali, Indonesia',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: content.contact_phone || '+62 XXX XXX XXX',
    },
    {
      icon: Mail,
      label: 'Email',
      value: content.contact_email || 'info@theclubali.com',
    },
    {
      icon: Clock,
      label: content.contact_hours || 'Hours',
      value: content.contact_hours_desc || 'Open Daily',
    },
  ];

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-cormorant font-bold text-primary mb-4">
            {content.contact_title || 'Get In Touch'}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {content.contact_subtitle || 'We would love to hear from you'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {contactInfo.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start gap-4 p-4 rounded-lg bg-card/50 hover:bg-card transition-colors duration-300"
              >
                <div className="p-3 rounded-full bg-primary/10">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{item.label}</h3>
                  <p className="text-muted-foreground">{item.value}</p>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="pt-6"
            >
              <Button onClick={openWhatsApp} variant="primary" size="lg" className="w-full sm:w-auto">
                Book a Table via WhatsApp
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden shadow-2xl h-[400px] lg:h-full"
          >
            <iframe
              src="https://www.openstreetmap.org/export/embed.html?bbox=115.08%2C-8.65%2C115.30%2C-8.45&layer=mapnik&marker=-8.55%2C115.19"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Location Map"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;