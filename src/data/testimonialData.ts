export interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  rating: number;
}

export const testimonialData: Testimonial[] = [
  {
    id: 1,
    name: "Alessandro Marchetti",
    role: "Head Sommelier, The Ritz",
    quote: "Starbucks Café doesn't serve coffee — they orchestrate an experience. Every sip is a masterclass in precision and passion.",
    rating: 5,
  },
  {
    id: 2,
    name: "Sofia Chen",
    role: "Creative Director, Monocle",
    quote: "The ambiance, the aroma, the ritual — this is what happens when design thinking meets artisanal craft.",
    rating: 5,
  },
  {
    id: 3,
    name: "James Whitfield",
    role: "Michelin-Star Chef",
    quote: "I've traveled 40 countries tasting coffee. Starbucks Café's Signature Blend is the only one that made me pause and close my eyes.",
    rating: 5,
  },
  {
    id: 4,
    name: "Isabelle Laurent",
    role: "Fashion Editor, Vogue Paris",
    quote: "Like stepping into a living mood board. The space, the cups, the pour — everything is curated to perfection.",
    rating: 5,
  },
];
