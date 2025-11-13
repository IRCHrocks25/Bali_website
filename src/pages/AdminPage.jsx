import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { Button } from '@/components/ui/button';
import { Helmet } from 'react-helmet-async';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import { usePageContent } from '@/hooks/usePageContent';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Save, Undo, LogOut, PlusCircle, Edit, Trash2, FileText, Calendar, Star, Upload, UtensilsCrossed } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from '@/lib/customSupabaseClient';
import { TooltipProvider } from "@/components/ui/tooltip";

const AdminPage = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const { content: initialContent, loading: contentLoading, updateContent } = usePageContent();
  
  const [editableContent, setEditableContent] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  
  const [events, setEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);

  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [currentReview, setCurrentReview] = useState(null);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);

  const [menuItems, setMenuItems] = useState([]);
  const [loadingMenu, setLoadingMenu] = useState(true);
  const [currentMenuItem, setCurrentMenuItem] = useState(null);
  const [isMenuDialogOpen, setIsMenuDialogOpen] = useState(false);

  const [heroImages, setHeroImages] = useState([]);
  const [loadingHeroImages, setLoadingHeroImages] = useState(true);
  const heroImageUploadRef = useRef(null);

  const fileInputRef = useRef({});

  useEffect(() => {
    if (initialContent) {
      setEditableContent(JSON.parse(JSON.stringify(initialContent)));
    }
  }, [initialContent]);

  const fetchData = useCallback(async (table, setter, toastErrorMsg, order = 'created_at') => {
    const { data, error } = await supabase.from(table).select('*').order(order, { ascending: order === 'order' || order === 'created_at' });
    if (error) {
      toast({ variant: "destructive", title: "Erreur", description: toastErrorMsg });
    } else {
      setter(data);
    }
    return { data, error };
  }, [toast]);

  const fetchHeroImages = useCallback(async () => {
    setLoadingHeroImages(true);
    const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .eq('type', 'hero')
        .order('order', { ascending: true });

    if (error) {
        toast({ variant: "destructive", title: "Erreur", description: "Impossible de charger les images du carrousel." });
    } else {
        setHeroImages(data);
    }
    setLoadingHeroImages(false);
  }, [toast]);

  useEffect(() => {
    const fetchAllData = async () => {
      setLoadingEvents(true);
      setLoadingReviews(true);
      setLoadingMenu(true);
      await Promise.all([
        fetchData('events', setEvents, "Impossible de charger les événements.", "event_date"),
        fetchData('reviews', setReviews, "Impossible de charger les avis."),
        fetchData('menu_items', setMenuItems, "Impossible de charger le menu.", 'order'),
        fetchHeroImages()
      ]);
      setLoadingEvents(false);
      setLoadingReviews(false);
      setLoadingMenu(false);
    };
    fetchAllData();
  }, [fetchData, fetchHeroImages]);

  const handleLogout = async () => {
    await signOut();
    toast({ title: 'Déconnexion réussie', description: 'Vous avez été déconnecté.' });
  };

  const handleContentChange = (e) => {
    const { name, value } = e.target;
    setEditableContent(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = async () => {
    setIsSaving(true);
    const { error } = await updateContent(editableContent);
    if (error) {
      toast({ variant: "destructive", title: "Erreur de sauvegarde", description: "Vos modifications n'ont pas pu être enregistrées." });
    } else {
      toast({ title: "Succès !", description: "Le contenu du site a été mis à jour." });
    }
    setIsSaving(false);
  };
  
  const handleDiscardChanges = () => {
    setEditableContent(JSON.parse(JSON.stringify(initialContent)));
    toast({ title: "Modifications annulées", description: "Le contenu a été réinitialisé." });
  };
  
  const uploadFile = async (file, bucket) => {
    const fileName = `${Date.now()}_${file.name}`;
    const { error } = await supabase.storage.from(bucket).upload(fileName, file);
    
    if (error) {
      let description = `Une erreur est survenue: ${error.message}`;
      if (error.message.includes("Payload too large") || error.message.includes("The object exceeded the maximum allowed size")) {
        description = "L'image est trop volumineuse. Veuillez la compresser ou en choisir une autre (max 5MB).";
      }
      toast({ variant: "destructive", title: "Erreur d'upload", description });
      return { error };
    }
    
    const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(fileName);
    return { publicUrl };
  };

  const handleReplaceImage = async (e, key) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsSaving(true);
    const { publicUrl, error } = await uploadFile(file, 'website_images');
    
    if (error) {
        setIsSaving(false);
        return;
    }

    const newContent = { ...editableContent, [key]: publicUrl };
    
    const { error: updateError } = await updateContent(newContent);
    
    if (updateError) {
      toast({ variant: "destructive", title: "Erreur de sauvegarde", description: "Vos modifications d'image n'ont pas pu être enregistrées." });
    } else {
      toast({ title: "Succès !", description: "L'image de la section a été mise à jour." });
      setEditableContent(newContent);
    }

    setIsSaving(false);
  };
  
  function createCrudHandlers(stateName, setState, dialogSetter, formSetter, initialState, order) {
    return {
      openNew: () => {
        formSetter(initialState);
        dialogSetter(true);
      },
      openEdit: (item) => {
        formSetter(item);
        dialogSetter(true);
      },
      handleFormChange: (e) => {
        const { name, value, type, checked } = e.target;
        formSetter(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : (type === 'number' ? parseInt(value, 10) : value) }));
      },
      handleSubmit: async (e, currentItem) => {
        e.preventDefault();
        setIsSaving(true);
        const { id, created_at, ...itemToSave } = currentItem;
        
        let payload = {};
        for (const key in initialState) {
          if (itemToSave.hasOwnProperty(key)) {
            payload[key] = itemToSave[key];
          }
        }
        
        const { error } = id
          ? await supabase.from(stateName).update(payload).eq('id', id)
          : await supabase.from(stateName).insert(payload);
  
        if (error) {
          toast({ variant: "destructive", title: "Erreur", description: `Impossible de sauvegarder. ${error.message}` });
        } else {
          toast({ title: "Succès", description: `Élément ${id ? 'mis à jour' : 'créé'}.` });
          dialogSetter(false);
          fetchData(stateName, setState, `Impossible de recharger les ${stateName}.`, order);
        }
        setIsSaving(false);
      },
      handleDelete: async (itemId) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cet élément ?")) {
          const { error } = await supabase.from(stateName).delete().eq('id', itemId);
          if (error) {
            toast({ variant: "destructive", title: "Erreur", description: "Impossible de supprimer l'élément." });
          } else {
            toast({ title: "Succès", description: "Élément supprimé." });
            fetchData(stateName, setState, `Impossible de recharger les ${stateName}.`, order);
          }
        }
      },
    };
  }

  const eventHandlers = createCrudHandlers(
    'events', setEvents, setIsEventDialogOpen, setCurrentEvent,
    { title: '', description: '', event_date: '', event_time: '', location: '', category: '', image_url: '', is_featured: false },
    'event_date'
  );

  const reviewHandlers = createCrudHandlers(
    'reviews', setReviews, setIsReviewDialogOpen, setCurrentReview,
    { author_name: '', text: '', rating: 3 }
  );

  const menuHandlers = createCrudHandlers(
    'menu_items', setMenuItems, setIsMenuDialogOpen, setCurrentMenuItem,
    { category: '', name: '', price: '', description: '', order: 0 },
    'order'
  );

  const handleAddHeroImage = async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      setIsSaving(true);
      const { publicUrl, error: uploadError } = await uploadFile(file, 'website_images');
      if (uploadError) {
          setIsSaving(false);
          return;
      }

      const newOrder = heroImages.length > 0 ? Math.max(...heroImages.map(img => img.order)) + 1 : 0;
      
      const { error: insertError } = await supabase
          .from('gallery_images')
          .insert({ image_url: publicUrl, type: 'hero', order: newOrder });

      if (insertError) {
          toast({ variant: "destructive", title: "Erreur", description: "Impossible d'ajouter l'image au carrousel." });
      } else {
          toast({ title: "Succès!", description: "Image ajoutée au carrousel." });
          fetchHeroImages();
      }
      setIsSaving(false);
      if (heroImageUploadRef.current) heroImageUploadRef.current.value = '';
  };

  const handleReplaceHeroImage = async (e, imageId) => {
      const file = e.target.files[0];
      if (!file) return;

      setIsSaving(true);
      const { publicUrl, error: uploadError } = await uploadFile(file, 'website_images');
      if (uploadError) {
          setIsSaving(false);
          return;
      }

      const { error: updateError } = await supabase
          .from('gallery_images')
          .update({ image_url: publicUrl })
          .eq('id', imageId);

      if (updateError) {
          toast({ variant: "destructive", title: "Erreur", description: "Impossible de remplacer l'image." });
      } else {
          toast({ title: "Succès!", description: "Image du carrousel remplacée." });
          fetchHeroImages();
      }
      setIsSaving(false);
  };

  const handleDeleteHeroImage = async (imageId) => {
      if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette image du carrousel ?")) return;

      const { error } = await supabase.from('gallery_images').delete().eq('id', imageId);

      if (error) {
          toast({ variant: "destructive", title: "Erreur", description: "Impossible de supprimer l'image." });
      } else {
          toast({ title: "Succès", description: "Image supprimée du carrousel." });
          fetchHeroImages();
      }
  };

  const contentSections = {
    "Meta & Nav": { texts: ['meta_title', 'meta_description', 'nav_about', 'nav_menu', 'nav_events', 'nav_contact'] },
    "Section Héros": { 
      texts: ['hero_title', 'hero_subtitle', 'hero_cta_text'], 
      links: ['hero_cta_link'], 
      hero_gallery: true 
    },
    "Section À Propos": { texts: ['about_title', 'about_subtitle', 'about_description'], image: 'about_image_url' },
    "Section Menu": { texts: ['menu_title', 'menu_subtitle'], image: 'menu_image_url' },
    "Section UGC": { texts: ['ugc_title', 'ugc_subtitle'], image: 'ugc_image_url' },
    "Section Avis": { texts: ['reviews_title', 'reviews_subtitle'] },
    "Section Événements": { texts: ['events_title', 'events_subtitle'] },
    "Section Contact": { texts: ['contact_title', 'contact_subtitle', 'contact_address', 'contact_phone', 'contact_email', 'contact_hours', 'contact_hours_desc'] },
    "Pied de page": { texts: ['footer_title', 'footer_subtitle', 'footer_newsletter_title', 'footer_copyright'] },
  };

  const menuCategories = [...new Set(menuItems.map(item => item.category))].sort((a, b) => {
    const orderA = menuItems.find(item => item.category === a)?.order || 0;
    const orderB = menuItems.find(item => item.category === b)?.order || 0;
    return orderA - orderB;
  });

  if (contentLoading) {
    return <div className="min-h-screen bg-background flex items-center justify-center"><Loader2 className="h-12 w-12 animate-spin text-primary" /></div>;
  }

  return (
    <>
      <Helmet><title>Admin Dashboard - The Club Bali</title></Helmet>
      <TooltipProvider>
      <div className="min-h-screen bg-background text-foreground p-4 sm:p-6 lg:p-8">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="container mx-auto">
          <header className="flex flex-wrap gap-4 justify-between items-center mb-8 pb-4 border-b border-border">
            <div>
              <h1 className="text-3xl sm:text-4xl font-cormorant font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground">Bienvenue, <span className="text-primary">{user?.email}</span></p>
            </div>
            <Button onClick={handleLogout} variant="outline" size="sm"><LogOut className="h-4 w-4 mr-2" />Déconnexion</Button>
          </header>
          
          <Tabs defaultValue="content" className="w-full">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 md:grid-cols-4 mb-6">
              <TabsTrigger value="content"><FileText className="h-4 w-4 mr-2" />Contenu</TabsTrigger>
              <TabsTrigger value="menu"><UtensilsCrossed className="h-4 w-4 mr-2" />Menu</TabsTrigger>
              <TabsTrigger value="events"><Calendar className="h-4 w-4 mr-2" />Événements</TabsTrigger>
              <TabsTrigger value="reviews"><Star className="h-4 w-4 mr-2" />Avis</TabsTrigger>
            </TabsList>

            <div className="glass-card p-6 md:p-8">
              <TabsContent value="content">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-cormorant font-bold">Contenu du Site</h2>
                   <div className="flex items-center gap-2">
                    <Button onClick={handleSaveChanges} variant="primary" size="sm" disabled={isSaving}>
                      {isSaving ? <Loader2 className="h-4 w-4 mr-2 animate-spin"/> : <Save className="h-4 w-4 mr-2"/>}
                      Sauvegarder
                    </Button>
                    <Button onClick={handleDiscardChanges} variant="secondary" size="sm" disabled={isSaving}>
                      <Undo className="h-4 w-4 mr-2"/> Annuler
                    </Button>
                  </div>
                </div>
                <div className="space-y-8">
                   {Object.entries(contentSections).map(([sectionTitle, { texts, image, links, hero_gallery }]) => editableContent && (
                    <Card key={sectionTitle}>
                      <CardHeader><CardTitle>{sectionTitle}</CardTitle></CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                               {texts.map(key => editableContent.hasOwnProperty(key) && (
                                <div key={key} className="space-y-2">
                                  <Label htmlFor={key} className="capitalize">{key.replace(/_/g, ' ')}</Label>
                                  <Textarea id={key} name={key} value={editableContent[key] || ''} onChange={handleContentChange} className="bg-background/50" rows={editableContent[key]?.length > 100 ? 4 : 2} />
                                </div>
                              ))}
                              {links && links.map(key => editableContent.hasOwnProperty(key) && (
                                <div key={key} className="space-y-2 md:col-span-2">
                                  <Label htmlFor={key} className="capitalize">{key.replace(/_/g, ' ')}</Label>
                                  <Input id={key} name={key} value={editableContent[key] || ''} onChange={handleContentChange} className="bg-background/50" />
                                </div>
                              ))}
                            </div>
                            {image && editableContent.hasOwnProperty(image) && (
                               <div className="space-y-4">
                                <Label className="capitalize">{image.replace(/_url|_image/g, '').replace(/_/g, ' ')}</Label>
                                <div className="relative">
                                   <img src={editableContent[image]} alt={image} className="rounded-md aspect-video object-cover w-full bg-muted" />
                                   {isSaving && <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-md"><Loader2 className="h-8 w-8 animate-spin text-white"/></div>}
                                </div>
                                <Button variant="outline" size="sm" onClick={() => fileInputRef.current[image].click()} disabled={isSaving}>
                                  <Upload className="h-4 w-4 mr-2" /> Remplacer
                                </Button>
                                <Input type="file" accept="image/*" ref={el => fileInputRef.current[image] = el} onChange={(e) => handleReplaceImage(e, image)} className="hidden" />
                              </div>
                            )}
                        </div>
                        {hero_gallery && (
                            <div className="mt-8 pt-6 border-t">
                                <h3 className="text-lg font-semibold mb-4">Images du Carrousel d'Accueil</h3>
                                {loadingHeroImages ? <Loader2 className="h-6 w-6 animate-spin" /> : (
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                        {heroImages.map((img) => (
                                            <Card key={img.id}>
                                                <CardContent className="p-2 space-y-2">
                                                    <img src={img.image_url} alt={`Hero ${img.order + 1}`} className="rounded-md aspect-video object-cover w-full bg-muted" />
                                                    <div className="flex gap-1">
                                                        <Button variant="outline" size="sm" className="flex-1" onClick={() => document.getElementById(`replace-hero-${img.id}`).click()}>
                                                            <Upload className="h-4 w-4 mr-1" /> Remplacer
                                                        </Button>
                                                        <Input type="file" accept="image/*" id={`replace-hero-${img.id}`} className="hidden" onChange={(e) => handleReplaceHeroImage(e, img.id)} />
                                                        <Button variant="destructive" size="icon" onClick={() => handleDeleteHeroImage(img.id)}><Trash2 className="h-4 w-4" /></Button>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                        <Button variant="outline" className="h-full aspect-video flex-col gap-2" onClick={() => heroImageUploadRef.current?.click()}>
                                            <PlusCircle className="h-8 w-8 text-muted-foreground" />
                                            <span className="text-muted-foreground">Ajouter une image</span>
                                        </Button>
                                        <Input type="file" accept="image/*" ref={heroImageUploadRef} onChange={handleAddHeroImage} className="hidden" />
                                    </div>
                                )}
                            </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="menu">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-cormorant font-bold">Gestion du Menu</h2>
                  <Dialog open={isMenuDialogOpen} onOpenChange={setIsMenuDialogOpen}>
                    <DialogTrigger asChild><Button onClick={() => menuHandlers.openNew()}><PlusCircle className="h-4 w-4 mr-2" />Ajouter un plat</Button></DialogTrigger>
                    <DialogContent className="sm:max-w-[525px] bg-card">
                      <DialogHeader><DialogTitle>{currentMenuItem?.id ? "Modifier" : "Ajouter"} un plat</DialogTitle></DialogHeader>
                      <form onSubmit={(e) => menuHandlers.handleSubmit(e, currentMenuItem)} className="grid gap-4 py-4">
                        <Input name="name" value={currentMenuItem?.name || ''} onChange={menuHandlers.handleFormChange} placeholder="Nom du plat" required />
                        <Input name="category" value={currentMenuItem?.category || ''} onChange={menuHandlers.handleFormChange} placeholder="Catégorie" required />
                        <Input name="price" value={currentMenuItem?.price || ''} onChange={menuHandlers.handleFormChange} placeholder="Prix (ex: 150K)" />
                        <Textarea name="description" value={currentMenuItem?.description || ''} onChange={menuHandlers.handleFormChange} placeholder="Description" />
                        <Input name="order" type="number" value={currentMenuItem?.order || 0} onChange={menuHandlers.handleFormChange} placeholder="Ordre d'affichage" />
                        <DialogFooter>
                          <DialogClose asChild><Button type="button" variant="secondary">Annuler</Button></DialogClose>
                          <Button type="submit" disabled={isSaving}>{isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Sauvegarder'}</Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
                {loadingMenu ? <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" /> : (
                  <div className="space-y-6">
                    {menuCategories.map(category => (
                      <Card key={category}>
                        <CardHeader><CardTitle>{category}</CardTitle></CardHeader>
                        <CardContent className="space-y-2">
                          {menuItems.filter(item => item.category === category).sort((a,b) => a.order - b.order).map(item => (
                            <div key={item.id} className="flex items-center justify-between p-3 rounded-lg bg-background/50">
                              <div>
                                <p className="font-semibold">{item.name} <span className="text-muted-foreground font-normal">- {item.price}</span></p>
                                <p className="text-sm text-muted-foreground">{item.description}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button variant="ghost" size="icon" onClick={() => menuHandlers.openEdit(item)}><Edit className="h-4 w-4" /></Button>
                                <Button variant="ghost" size="icon" onClick={() => menuHandlers.handleDelete(item.id)} className="text-destructive hover:text-destructive"><Trash2 className="h-4 w-4" /></Button>
                              </div>
                            </div>
                          ))}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="events">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-cormorant font-bold">Gestion des Événements</h2>
                  <Dialog open={isEventDialogOpen} onOpenChange={setIsEventDialogOpen}>
                    <DialogTrigger asChild><Button onClick={() => eventHandlers.openNew()}><PlusCircle className="h-4 w-4 mr-2" />Ajouter</Button></DialogTrigger>
                    <DialogContent className="sm:max-w-[525px] bg-card">
                      <DialogHeader><DialogTitle>{currentEvent?.id ? "Modifier" : "Ajouter"} un événement</DialogTitle></DialogHeader>
                      <form onSubmit={(e) => eventHandlers.handleSubmit(e, currentEvent)} className="grid gap-4 py-4">
                        <Input name="title" value={currentEvent?.title || ''} onChange={eventHandlers.handleFormChange} placeholder="Titre de l'événement" required />
                        <Input name="category" value={currentEvent?.category || ''} onChange={eventHandlers.handleFormChange} placeholder="Catégorie (ex: Live Music)" />
                        <Textarea name="description" value={currentEvent?.description || ''} onChange={eventHandlers.handleFormChange} placeholder="Description" />
                        <Input name="event_date" type="date" value={currentEvent?.event_date || ''} onChange={eventHandlers.handleFormChange} required />
                        <Input name="event_time" value={currentEvent?.event_time || ''} onChange={eventHandlers.handleFormChange} placeholder="Heure (ex: 9:00 PM)" />
                        <Input name="location" value={currentEvent?.location || ''} onChange={eventHandlers.handleFormChange} placeholder="Lieu (ex: Main Stage)" />
                        <div className="flex items-center space-x-2">
                            <input type="checkbox" id="is_featured" name="is_featured" checked={!!currentEvent?.is_featured} onChange={eventHandlers.handleFormChange} className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
                            <Label htmlFor="is_featured">Événement en vedette</Label>
                        </div>
                        <div className="space-y-2">
                            <Label>Image de l'événement</Label>
                            {currentEvent?.image_url && <img src={currentEvent.image_url} alt="Aperçu" className="w-full h-auto rounded-md object-cover mt-2 max-h-48"/>}
                            <Input type="file" accept="image/*" onChange={async (e) => {
                                const file = e.target.files[0];
                                if (!file) return;
                                setIsSaving(true);
                                const {publicUrl, error} = await uploadFile(file, 'website_images');
                                if(!error && publicUrl) setCurrentEvent(p => ({...p, image_url: publicUrl}))
                                setIsSaving(false);
                            }} className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"/>
                        </div>
                        <DialogFooter>
                          <DialogClose asChild><Button type="button" variant="secondary">Annuler</Button></DialogClose>
                          <Button type="submit" disabled={isSaving}>{isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Sauvegarder'}</Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
                {loadingEvents ? <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" /> : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {events.map(event => (
                      <Card key={event.id} className="flex flex-col relative">
                        {event.is_featured && <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-full z-10">Featured</div>}
                        <img src={event.image_url} alt={event.title} className="w-full h-40 object-cover rounded-t-lg bg-muted"/>
                        <CardHeader className="flex-grow">
                          <CardTitle className="text-lg">{event.title}</CardTitle>
                          <p className="text-sm text-muted-foreground">{new Date(event.event_date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" onClick={() => eventHandlers.openEdit(event)}><Edit className="h-4 w-4 mr-2" />Modifier</Button>
                            <Button variant="destructive" size="sm" onClick={() => eventHandlers.handleDelete(event.id)}><Trash2 className="h-4 w-4 mr-2" />Supprimer</Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="reviews">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-cormorant font-bold">Gestion des Avis</h2>
                  <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
                    <DialogTrigger asChild><Button onClick={() => reviewHandlers.openNew()}><PlusCircle className="h-4 w-4 mr-2" />Ajouter</Button></DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] bg-card">
                      <DialogHeader><DialogTitle>{currentReview?.id ? "Modifier" : "Ajouter"} un avis</DialogTitle></DialogHeader>
                      <form onSubmit={(e) => reviewHandlers.handleSubmit(e, currentReview)} className="grid gap-4 py-4">
                        <Input name="author_name" value={currentReview?.author_name || ''} onChange={reviewHandlers.handleFormChange} placeholder="Nom de l'auteur" required />
                        <Textarea name="text" value={currentReview?.text || ''} onChange={reviewHandlers.handleFormChange} placeholder="Texte de l'avis" required />
                        <Input name="rating" type="number" min="1" max="5" value={currentReview?.rating || ''} onChange={reviewHandlers.handleFormChange} placeholder="Note (1-5)" required/>
                        <DialogFooter>
                          <DialogClose asChild><Button type="button" variant="secondary">Annuler</Button></DialogClose>
                          <Button type="submit" disabled={isSaving}>{isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Sauvegarder'}</Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
                {loadingReviews ? <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" /> : (
                  <div className="space-y-4">
                    {reviews.map(review => (
                      <div key={review.id} className="flex items-center justify-between p-4 rounded-lg bg-background/50">
                        <div><p className="font-semibold">{review.author_name}</p><div className="flex">{[...Array(review.rating)].map((_,i)=><Star key={i} className="h-4 w-4 text-primary fill-primary"/>)}</div></div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon" onClick={() => reviewHandlers.openEdit(review)}><Edit className="h-4 w-4" /></Button>
                          <Button variant="ghost" size="icon" onClick={() => reviewHandlers.handleDelete(review.id)} className="text-destructive hover:text-destructive"><Trash2 className="h-4 w-4" /></Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
            </div>
          </Tabs>
        </motion.div>
      </div>
      </TooltipProvider>
    </>
  );
};

export default AdminPage;