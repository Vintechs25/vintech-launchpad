INSERT INTO public.services (title, slug, description, icon, sort_order, tagline, image_url, features, benefits, process, faq)
VALUES (
  'POS Systems',
  'pos-systems',
  'Streamline your retail, restaurant, or service business with our modern Point of Sale solutions. We supply, install, and support POS hardware and software tailored for Kenyan businesses — from inventory tracking and sales reporting to M-Pesa integration and multi-branch management. Whether you run a single shop or a chain, our POS systems help you sell smarter, faster, and with full visibility into your operations.',
  'Monitor',
  7,
  'Sell Smarter with Modern Point of Sale Technology',
  null,
  '["Touch-screen POS terminals & hardware supply","Barcode scanning & receipt printing","Real-time inventory management","Sales analytics & daily reports","Multi-branch & multi-user support","Cloud-based data backup & access"]'::jsonb,
  '["Faster checkout and reduced queues","Accurate stock tracking — eliminate shrinkage","M-Pesa, card & cash payments in one system","Make data-driven decisions with real-time reports","Scale from one outlet to many without hassle","24/7 local support from our Kenya-based team"]'::jsonb,
  '[{"step":"Needs Assessment","desc":"We visit your business, understand your workflow, and recommend the right POS setup."},{"step":"Installation & Setup","desc":"We supply hardware, install software, configure products, and integrate payment methods."},{"step":"Staff Training","desc":"Hands-on training for your team so they are confident from day one."},{"step":"Ongoing Support","desc":"Continuous monitoring, updates, and 24/7 technical support to keep you running."}]'::jsonb,
  '[{"question":"Which businesses benefit from a POS system?","answer":"Retailers, restaurants, supermarkets, pharmacies, salons, and any business that processes sales transactions. Our systems are customised for Kenyan market needs."},{"question":"Does the POS support M-Pesa payments?","answer":"Yes. Our POS solutions integrate with M-Pesa, card terminals, and cash — giving your customers flexible payment options at checkout."},{"question":"Can I manage multiple branches from one system?","answer":"Absolutely. Our cloud-based POS lets you monitor sales, inventory, and staff performance across all your outlets from a single dashboard."},{"question":"What happens if the internet goes down?","answer":"Our POS systems work offline and automatically sync data once connectivity is restored — so your business never stops."}]'::jsonb
);