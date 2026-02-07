import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const getDeviceType = (): string => {
  const w = window.innerWidth;
  if (w < 768) return "mobile";
  if (w < 1024) return "tablet";
  return "desktop";
};

const TIMEZONE_COUNTRY_MAP: Record<string, string> = {
  "Africa/Abidjan": "CI", "Africa/Accra": "GH", "Africa/Addis_Ababa": "ET",
  "Africa/Algiers": "DZ", "Africa/Cairo": "EG", "Africa/Casablanca": "MA",
  "Africa/Dar_es_Salaam": "TZ", "Africa/Johannesburg": "ZA", "Africa/Lagos": "NG",
  "Africa/Nairobi": "KE", "Africa/Tunis": "TN", "America/Anchorage": "US",
  "America/Argentina/Buenos_Aires": "AR", "America/Bogota": "CO",
  "America/Chicago": "US", "America/Denver": "US", "America/Halifax": "CA",
  "America/Lima": "PE", "America/Los_Angeles": "US", "America/Mexico_City": "MX",
  "America/New_York": "US", "America/Phoenix": "US", "America/Santiago": "CL",
  "America/Sao_Paulo": "BR", "America/Toronto": "CA", "America/Vancouver": "CA",
  "Asia/Baghdad": "IQ", "Asia/Bangkok": "TH", "Asia/Colombo": "LK",
  "Asia/Dhaka": "BD", "Asia/Dubai": "AE", "Asia/Ho_Chi_Minh": "VN",
  "Asia/Hong_Kong": "HK", "Asia/Istanbul": "TR", "Asia/Jakarta": "ID",
  "Asia/Karachi": "PK", "Asia/Kolkata": "IN", "Asia/Kuala_Lumpur": "MY",
  "Asia/Manila": "PH", "Asia/Riyadh": "SA", "Asia/Seoul": "KR",
  "Asia/Shanghai": "CN", "Asia/Singapore": "SG", "Asia/Taipei": "TW",
  "Asia/Tehran": "IR", "Asia/Tokyo": "JP", "Atlantic/Reykjavik": "IS",
  "Australia/Melbourne": "AU", "Australia/Perth": "AU", "Australia/Sydney": "AU",
  "Europe/Amsterdam": "NL", "Europe/Athens": "GR", "Europe/Belgrade": "RS",
  "Europe/Berlin": "DE", "Europe/Brussels": "BE", "Europe/Bucharest": "RO",
  "Europe/Budapest": "HU", "Europe/Copenhagen": "DK", "Europe/Dublin": "IE",
  "Europe/Helsinki": "FI", "Europe/Kiev": "UA", "Europe/Lisbon": "PT",
  "Europe/London": "GB", "Europe/Madrid": "ES", "Europe/Milan": "IT",
  "Europe/Moscow": "RU", "Europe/Oslo": "NO", "Europe/Paris": "FR",
  "Europe/Prague": "CZ", "Europe/Rome": "IT", "Europe/Stockholm": "SE",
  "Europe/Vienna": "AT", "Europe/Warsaw": "PL", "Europe/Zurich": "CH",
  "Pacific/Auckland": "NZ", "Pacific/Honolulu": "US",
};

const getCountryFromTimezone = (): string | null => {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return TIMEZONE_COUNTRY_MAP[tz] || null;
  } catch {
    return null;
  }
};

export const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith("/admin")) return;

    const track = async () => {
      try {
        await supabase.from("page_views").insert({
          path: location.pathname,
          referrer: document.referrer || null,
          user_agent: navigator.userAgent,
          device_type: getDeviceType(),
          country: getCountryFromTimezone(),
        });
      } catch {
        // silently fail
      }
    };

    track();
  }, [location.pathname]);
};
