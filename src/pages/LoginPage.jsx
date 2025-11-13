import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("signin");

  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { error } = await signIn(email, password);
    if (error) {
      let description = "Email ou mot de passe incorrect.";
      if (error.message.includes("Email not confirmed")) {
        description = "Veuillez confirmer votre adresse e-mail avant de vous connecter. Consultez votre boîte de réception.";
      } else {
        description = error.message;
      }
      
      toast({
        variant: "destructive",
        title: "Erreur de connexion",
        description: description,
      });
    } else {
      toast({
        title: "Connexion réussie!",
        description: "Vous allez être redirigé vers le panneau d'administration.",
      });
      navigate('/admin');
    }
    setIsLoading(false);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    
    if (password.length < 6) {
      toast({
        variant: "destructive",
        title: "Erreur d'inscription",
        description: "Le mot de passe doit contenir au moins 6 caractères.",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Erreur d'inscription",
        description: "Les mots de passe ne correspondent pas.",
      });
      return;
    }

    setIsLoading(true);
    const { error } = await signUp(email, password);
    if (error) {
      toast({
        variant: "destructive",
        title: "Erreur d'inscription",
        description: error.message || "Impossible de créer le compte.",
      });
    } else {
      toast({
        title: "Inscription réussie!",
        description: "Veuillez vérifier votre email pour confirmer votre compte avant de vous connecter.",
      });
      setActiveTab("signin"); // Switch to sign-in tab after successful sign-up
    }
    setIsLoading(false);
  };

  return (
    <>
      <Helmet>
        <title>Login - Admin - The Club Bali</title>
      </Helmet>
      <div className="w-full h-screen flex items-center justify-center bg-background font-sans p-4">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="text-center mb-6">
                <h1 className="text-4xl font-cormorant font-bold text-foreground">
                Admin Access
                </h1>
                <p className="text-muted-foreground mt-2">Accès au Club des Admins</p>
            </div>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Se connecter</TabsTrigger>
              <TabsTrigger value="signup">S'inscrire</TabsTrigger>
            </TabsList>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <TabsContent value="signin">
                  <div className="glass-card p-8">
                    <form onSubmit={handleSignIn} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="email-signin">Email</Label>
                        <Input id="email-signin" type="email" placeholder="admin@theclub.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="bg-input" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password-signin">Mot de passe</Label>
                        <Input id="password-signin" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="bg-input" />
                      </div>
                      <Button type="submit" variant="primary" className="w-full" disabled={isLoading}>
                        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                        {isLoading ? 'Connexion...' : 'Se connecter'}
                      </Button>
                    </form>
                  </div>
                </TabsContent>
                <TabsContent value="signup">
                  <div className="glass-card p-8">
                    <form onSubmit={handleSignUp} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="email-signup">Email</Label>
                        <Input id="email-signup" type="email" placeholder="nouveau.admin@theclub.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="bg-input" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password-signup">Mot de passe</Label>
                        <Input id="password-signup" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="bg-input" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password-signup">Confirmer le mot de passe</Label>
                        <Input id="confirm-password-signup" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="bg-input" />
                      </div>
                      <Button type="submit" variant="primary" className="w-full" disabled={isLoading}>
                        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                        {isLoading ? 'Inscription...' : "S'inscrire"}
                      </Button>
                    </form>
                  </div>
                </TabsContent>
              </motion.div>
            </AnimatePresence>
          </Tabs>
        </motion.div>
      </div>
    </>
  );
};

export default LoginPage;