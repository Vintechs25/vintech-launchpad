import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppFloat from "./WhatsAppFloat";
import CookieConsent from "./CookieConsent";
import { usePageTracking } from "@/hooks/usePageTracking";

const Layout = ({ children }: { children: ReactNode }) => {
  usePageTracking();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppFloat />
      <CookieConsent />
    </div>
  );
};

export default Layout;
