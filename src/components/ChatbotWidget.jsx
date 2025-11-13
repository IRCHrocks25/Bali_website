import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Send, X, Bot, User } from 'lucide-react'; // Removed MessageSquare
import { usePageContent } from '@/hooks/usePageContent';
import { openWhatsApp } from '@/utils/helpers';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const WEBHOOK_URL = 'https://katalyst-crm.fly.dev/webhook/bali-chat'; // ⬅️ put your real webhook here

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const { content } = usePageContent();

  useEffect(() => {
    if (isOpen) {
      setMessages([
        {
          id: 1,
          text: "Hello! I'm The Club's virtual assistant. How can I help you today? You can ask me about bookings, our menu, or opening hours.",
          sender: 'bot',
        },
      ]);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async () => {
    if (inputValue.trim() === '' || isLoading) return;

    const userText = inputValue;
    const userMessage = {
      id: Date.now(),
      text: userText,
      sender: 'user',
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userText,
          // Optional: pass structured context to your AI if you want
          context: {
            opening_hours: content?.contact_hours_desc,
            address: content?.contact_address,
          },
        }),
      });

      if (!res.ok) {
        throw new Error(`Webhook error: ${res.status}`);
      }

      const data = await res.json();

      // Expecting: { "Response": "AI answer here" }
      const botText =
        data.output ||
        data.response ||
        "Sorry, I couldn't read the AI response. Please try again.";

      const botMessage = {
        id: Date.now() + 1,
        text: botText,
        sender: 'bot',
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 2,
          text:
            "Hmm… I’m having trouble reaching the server right now. You can also contact us directly via WhatsApp.",
          sender: 'bot',
          action: { text: 'Contact Us on WhatsApp', handler: openWhatsApp },
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const widgetVariants = {
    closed: { opacity: 0, y: 20, scale: 0.95 },
    open: { opacity: 1, y: 0, scale: 1 },
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                onClick={() => setIsOpen(!isOpen)}
                className={`group rounded-full w-16 h-16 shadow-xl transition-all duration-200 ${
                  isOpen
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                    : 'bg-gradient-to-br from-amber-300 via-amber-400 to-orange-500 text-white hover:from-amber-400 hover:via-amber-500 hover:to-orange-600'
                }`}
                aria-label={isOpen ? "Close Chatbot" : "Open Chatbot"}
              >
                {isOpen ? (
                  <X className="w-8 h-8 text-primary-foreground" />
                ) : (
                  <i
                    className="fa-solid fa-message text-3xl drop-shadow-lg transition-transform duration-200 group-hover:scale-105"
                    aria-hidden="true"
                  />
                )}
              </Button>
            </motion.div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{isOpen ? "Close Chat" : "Open Chat"}</p>
          </TooltipContent>
        </Tooltip>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={widgetVariants}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] max-w-sm"
          >
            <Card className="shadow-2xl border-border/50 bg-card/80 backdrop-blur-lg">
              <CardHeader className="flex-row items-center justify-between pb-4">
                <div className="flex items-center gap-3">
                  <Bot className="w-6 h-6 text-primary" />
                  <CardTitle className="font-cormorant text-2xl">The Club Assistant</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="h-96 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex items-end gap-2 ${
                      msg.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {msg.sender === 'bot' && (
                      <Bot className="w-6 h-6 text-primary flex-shrink-0" />
                    )}
                    <div
                      className={`max-w-[80%] rounded-xl px-4 py-2 ${
                        msg.sender === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                      {msg.action && (
                        <Button
                          onClick={msg.action.handler}
                          variant="link"
                          className="p-0 h-auto mt-2 text-sm text-current underline"
                        >
                          {msg.action.text}
                        </Button>
                      )}
                    </div>
                    {msg.sender === 'user' && (
                      <User className="w-6 h-6 text-muted-foreground flex-shrink-0" />
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex items-end gap-2 justify-start">
                    <Bot className="w-6 h-6 text-primary flex-shrink-0" />
                    <div className="max-w-[80%] rounded-xl px-4 py-2 bg-muted">
                      <div className="flex items-center gap-1">
                        <span className="h-2 w-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                        <span className="h-2 w-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                        <span className="h-2 w-2 bg-primary rounded-full animate-bounce"></span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </CardContent>
              <CardFooter className="pt-4">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex w-full items-center space-x-2"
                >
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type a message..."
                    className="bg-background/50"
                    autoComplete="off"
                  />
                  <Button type="submit" size="icon" disabled={isLoading}>
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatbotWidget;