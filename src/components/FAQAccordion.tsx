import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQAccordion = ({ items }: { items: FAQItem[] }) => (
  <Accordion type="single" collapsible className="w-full">
    {items.map((item, i) => (
      <AccordionItem key={i} value={`item-${i}`} className="border-border">
        <AccordionTrigger className="font-heading font-medium text-left hover:text-accent">
          {item.question}
        </AccordionTrigger>
        <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
          {item.answer}
        </AccordionContent>
      </AccordionItem>
    ))}
  </Accordion>
);

export default FAQAccordion;
