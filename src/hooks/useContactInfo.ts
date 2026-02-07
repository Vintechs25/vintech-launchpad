import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface ContactInfo {
  email: string | null;
  phone: string | null;
  address: string | null;
  whatsapp: string | null;
  website: string | null;
  company_name: string | null;
}

const defaults: ContactInfo = {
  email: "info@vin-tech.top",
  phone: null,
  address: null,
  whatsapp: null,
  website: "https://vin-tech.top",
  company_name: "Vintech Consulting",
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
          }
        : defaults;
    },
  });
}
