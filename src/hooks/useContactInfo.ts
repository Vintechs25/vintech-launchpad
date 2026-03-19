import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface ContactInfo {
  email: string | null;
  phone: string | null;
  address: string | null;
  whatsapp: string | null;
  website: string | null;
  company_name: string | null;
  privacy_policy: string | null;
  terms_conditions: string | null;
}

const defaults: ContactInfo = {
  email: "info@vintechsystems.store",
  phone: null,
  address: null,
  whatsapp: null,
  website: "https://vintechsystems.store",
  company_name: "Vintech Systems and Consulting",
  privacy_policy: null,
  terms_conditions: null,
};

export function useContactInfo() {
  return useQuery({
    queryKey: ["contact_info"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contact_info")
        .select("*")
        .limit(1)
        .maybeSingle();
      if (error) throw error;
      return data
        ? {
            email: data.email,
            phone: data.phone,
            address: data.address,
            whatsapp: data.whatsapp,
            website: (data as any).website ?? defaults.website,
            company_name: (data as any).company_name ?? defaults.company_name,
            privacy_policy: (data as any).privacy_policy ?? null,
            terms_conditions: (data as any).terms_conditions ?? null,
          }
        : defaults;
    },
  });
}
