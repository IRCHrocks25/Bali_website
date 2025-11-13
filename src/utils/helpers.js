const WHATSAPP_URL = 'https://wa.me/6282342492401';

export const openWhatsApp = () => {
  const message = `Hello, I'd like to book a table.`;
  const whatsappUrlWithMessage = `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrlWithMessage, '_blank', 'noopener,noreferrer');
};

export const handleEventReservation = (eventName, eventDate) => {
  const formattedDate = new Date(eventDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const message = `Hello, I'd like to make a reservation for the event: "${eventName}" on ${formattedDate}.`;
  const whatsappUrlWithMessage = `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrlWithMessage, '_blank', 'noopener,noreferrer');
};