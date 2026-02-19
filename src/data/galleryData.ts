export interface GalleryItem {
  id: number;
  src: string;
  alt: string;
  category: string;
  span?: string; // tailwind col/row span class
}

export const galleryData: GalleryItem[] = [
  { id: 1, src: "/images/coffee/gallery_custom_1.jpg", alt: "Signature Roast Coffee Cup", category: "Classic" },
  { id: 2, src: "/images/coffee/gallery_macchiato.jpg", alt: "Caramel Macchiato Swirl", category: "Handcrafted" },
  { id: 3, src: "/images/coffee/gallery_latte.jpg", alt: "Artisan Caffè Latte", category: "Classic" },
  { id: 4, src: "/images/coffee/gallery_hotcup.jpg", alt: "Artisan Pour Over Brew", category: "Brewed" },
  { id: 5, src: "/images/coffee/gallery_americano.jpg", alt: "Iced Caffè Americano", category: "Iced" },
  { id: 6, src: "/images/coffee/gallery_custom_2.jpg", alt: "Nitro Cold Brew Infusion", category: "Cold Brew" },
];
