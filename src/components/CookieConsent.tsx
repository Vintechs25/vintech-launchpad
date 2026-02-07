import { useState, useEffect } from "react";
import { X } from "lucide-react";

const COOKIE_KEY = "vintech_cookie_consent";

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY);
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(COOKIE_KEY, "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem(COOKIE_KEY, "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-in slide-in-from-bottom duration-500">
      <div className="max-w-5xl mx-auto bg-card border border-border rounded-xl shadow-lg px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="text-sm text-foreground flex-1">
          We use cookies to improve your experience and track site analytics.
          By continuing, you agree to our{" "}
          <a href="/privacy" className="text-accent underline underline-offset-2 hover:opacity-80">
            Privacy Policy
          </a>.
        </p>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={decline}
            className="px-4 py-2 text-sm rounded-lg border border-border text-muted-foreground hover:bg-secondary transition-colors"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="px-4 py-2 text-sm rounded-lg bg-accent text-accent-foreground font-medium hover:opacity-90 transition-opacity"
          >
            Accept
          </button>
          <button onClick={decline} className="p-1 text-muted-foreground hover:text-foreground ml-1">
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
