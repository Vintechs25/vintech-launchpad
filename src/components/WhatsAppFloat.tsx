import { MessageCircle } from "lucide-react";

const WhatsAppFloat = () => (
  <a
    href="https://wa.me/1234567890?text=Hi%20Vintech%2C%20I%27d%20like%20to%20discuss%20a%20project"
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110"
    style={{ background: "#25D366" }}
    aria-label="Chat on WhatsApp"
  >
    <MessageCircle size={26} className="text-accent-foreground" />
  </a>
);

export default WhatsAppFloat;
