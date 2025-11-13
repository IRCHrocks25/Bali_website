import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { format, parseISO } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { Calendar, Clock, MapPin, Star, Ticket, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/customSupabaseClient';
import { handleEventReservation } from '@/utils/helpers';

const FeaturedEventCard = ({ event }) => {
  const handleReserve = () => {
    handleEventReservation(event.title, event.event_date);
  };

  return (
    <motion.div
      className="col-span-1 md:col-span-2 lg:col-span-3 rounded-2xl overflow-hidden shadow-2xl group bg-card"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
    >
      <div className="relative">
        <div className="absolute top-4 left-4 z-10 bg-primary/90 text-primary-foreground px-4 py-1.5 rounded-full flex items-center text-sm font-semibold">
          <Star className="w-4 h-4 mr-2 fill-current" />
          Featured Event
        </div>
        <div className="relative h-80 md:h-[500px] w-full">
          <img src={event.image_url} alt={`Poster for ${event.title}`} className="w-full h-full object-cover transition-transform duration-500 md:group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent md:hidden"></div>
          <div className="absolute bottom-0 left-0 p-6 text-white md:hidden">
            <span className="text-sm uppercase font-semibold tracking-wider bg-white/20 px-3 py-1 rounded-full text-white/90">{event.category}</span>
            <h3 className="font-cormorant text-4xl font-bold mt-4 mb-2 text-shadow-lg">{event.title}</h3>
          </div>
        </div>
      </div>

      <div className="p-6 md:p-8">
        <div className="hidden md:block mb-4">
          <span className="text-sm uppercase font-semibold tracking-wider bg-primary/20 text-primary px-3 py-1 rounded-full">{event.category}</span>
          <h3 className="font-cormorant text-5xl font-bold mt-4 mb-3 text-foreground">{event.title}</h3>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-lg text-muted-foreground">
          <div className="flex items-center gap-2"><Calendar className="w-5 h-5 text-primary" /> {format(parseISO(event.event_date), "EEEE d MMMM", { locale: enUS })}</div>
          <div className="flex items-center gap-2"><Clock className="w-5 h-5 text-primary" /> {event.event_time}</div>
          <div className="flex items-center gap-2"><MapPin className="w-5 h-5 text-primary" /> {event.location}</div>
        </div>
        <p className="mt-4 max-w-2xl text-foreground/70 line-clamp-2">{event.description}</p>
        <div className="mt-6 flex flex-wrap gap-4">
          <Button onClick={handleReserve} size="lg" variant="primary">
            <Ticket className="w-5 h-5 mr-2" /> Reserve via WhatsApp
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

const OtherEventCardDesktop = ({ event }) => {
  const handleReserve = () => {
    handleEventReservation(event.title, event.event_date);
  };

  return (
    <motion.div
      className="bg-card rounded-2xl overflow-hidden shadow-lg group flex flex-col"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative overflow-hidden">
        <img src={event.image_url} alt={`Poster for ${event.title}`} className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105" />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs uppercase font-semibold tracking-wider bg-primary/20 text-primary px-3 py-1 rounded-full">{event.category}</span>
          <div className="flex items-center gap-2 text-sm text-muted-foreground"><Calendar className="w-4 h-4" /> {format(parseISO(event.event_date), "d MMM yyyy", { locale: enUS })}</div>
        </div>
        <h3 className="font-cormorant text-2xl font-bold mb-3 flex-grow text-foreground">{event.title}</h3>
        <div className="space-y-2 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary" /> {event.event_time}</div>
          <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> {event.location}</div>
        </div>
        <p className="text-foreground/70 text-sm mb-6 line-clamp-3">{event.description}</p>
        <div className="mt-auto pt-4 border-t border-border">
          <Button onClick={handleReserve} className="w-full" variant="primary">
            <Ticket className="w-4 h-4 mr-2" />Reserve
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

const OtherEventCardMobile = ({ event }) => {
  const handleReserve = () => {
    handleEventReservation(event.title, event.event_date);
  };

  return (
    <motion.div
      className="flex items-center gap-4 bg-card/50 p-4 rounded-xl"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5 }}
    >
      <img src={event.image_url} alt={event.title} className="w-24 h-24 object-cover rounded-lg" />
      <div className="flex-1">
        <p className="text-sm text-primary font-semibold">{format(parseISO(event.event_date), "d MMM", { locale: enUS })} - {event.event_time}</p>
        <h4 className="font-cormorant text-xl font-bold text-foreground mt-1">{event.title}</h4>
        <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1.5"><MapPin className="w-3 h-3" /> {event.location}</p>
        <Button onClick={handleReserve} size="sm" variant="outline" className="mt-3 text-xs">
          <Ticket className="w-3 h-3 mr-1.5" /> Reserve
        </Button>
      </div>
    </motion.div>
  );
};

const EventsSection = ({ content }) => {
  const { toast } = useToast();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('event_date', { ascending: true });

    if (error) {
      toast({ variant: 'destructive', title: 'Error', description: 'Could not fetch events.' });
      setEvents([]);
    } else {
      setEvents(data);
    }
    setLoading(false);
  }, [toast]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  if (!content) return null;
  
  const today = new Date().toISOString().split('T')[0];
  const upcomingEvents = events.filter(e => e.event_date >= today);
  const featuredEvent = upcomingEvents.find(e => e.is_featured);
  const otherEvents = upcomingEvents.filter(e => !e.is_featured);

  return (
    <section id="events" className="section-padding bg-background">
      <div className="container">
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
          }}
        >
          <h2 className="font-cormorant text-5xl md:text-6xl font-medium text-foreground">{content.events_title}</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/70">
            {content.events_subtitle}
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-12 h-12 animate-spin text-primary" />
          </div>
        ) : upcomingEvents.length === 0 ? (
          <div className="text-center text-foreground/70 py-10">
            <p>There are no upcoming events at the moment. Please check back later!</p>
          </div>
        ) : (
          <div className="space-y-8">
            {featuredEvent && <FeaturedEventCard event={featuredEvent} />}

            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherEvents.map(event => (
                <OtherEventCardDesktop key={event.id} event={event} />
              ))}
            </div>

            <div className="md:hidden space-y-4">
              {otherEvents.length > 0 && <h3 className="font-cormorant text-3xl font-bold text-center pt-8">Upcoming Events</h3>}
              {otherEvents.map(event => (
                <OtherEventCardMobile key={event.id} event={event} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default EventsSection;