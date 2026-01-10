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
      value: 'The Club Bali - Le Restaurant, Jl. Batu Belig Gg. Daksina No.1, Kerobokan, Kuta Utara, Badung Regency, Bali 80361, Indonesia',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+62 823-4249-2401',
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'bookings@theclubbali.com',
    },
    {
      icon: Clock,
      label: 'Hours',
      value: 'Open Tuesday to Sunday at 9am to 11pm, Monday closed',
    },
  ];

  const mapEmbedUrl =
    content.contact_map_embed_url ||
    'https://www.google.com/maps/embed?pb=!1m12!1m8!1m3!1d15776.588806733329!2d115.1459455!3d-8.6775484!3m2!1i1024!2i768!4f13.1!2m1!1sthe%20club%20bali!5e0!3m2!1sen!2sch!4v1767801762877!5m2!1sen!2sch';

  return (
    <section 
      id="contact" 
      className="py-20 relative bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url(/images/hero/background2.png)'
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-script font-bold text-white mb-4">
            {content.contact_title || 'Get In Touch'}
          </h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            {content.contact_subtitle || "We'd love to hear from you. Whether it's for a reservation, a special event, or just to say hello, here's how you can reach us."}
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
                className="flex items-start gap-4 p-4 rounded-lg bg-card/30 hover:bg-card/50 transition-colors duration-300 border border-border/30"
              >
                <div className="p-3 rounded-full bg-primary/10">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">{item.label}</h3>
                  <p className="text-white/80">{item.value}</p>
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
            className="overflow-hidden shadow-2xl h-[400px] lg:h-full border border-border/30"
          >
            <iframe
              src={mapEmbedUrl}
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