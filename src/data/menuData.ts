export interface MenuItem {
  id: number;
  name: string;
  subtitle: string;
  description: string;
  price: string;
  image: string;
  video?: string;
}

export const menuData: MenuItem[] = [
  {
    id: 1,
    name: "Caramel Frappuccino",
    subtitle: "Blended Perfection",
    description: "Our iconic buttery caramel syrup blended with coffee, milk, and ice. Finished with whipped cream.",
    price: "$6.50",
    image: "/images/coffee/menu_frap_highres.jpg",
  },
  {
    id: 2,
    name: "Caramel Macchiato",
    subtitle: "Artfully Layered",
    description: "Freshly steamed milk with vanilla-flavored syrup marked with espresso and topped with caramel drizzle.",
    price: "$5.95",
    image: "/images/coffee/menu_custom_2.jpg",
  },
  {
    id: 3,
    name: "Pumpkin Spice Latte",
    subtitle: "Seasonal Icon",
    description: "Our signature espresso and steamed milk with the celebrated flavor combination of pumpkin and cinnamon.",
    price: "$6.25",
    image: "/images/coffee/menu_custom_3.jpg",
  },
  {
    id: 4,
    name: "Nitro Cold Brew",
    subtitle: "Velvet Pour",
    description: "Our small-batch cold brew is infused with nitrogen to create a naturally sweet flavor and cascading cream.",
    price: "$5.50",
    image: "/images/coffee/menu_custom_4.jpg",
  },
  {
    id: 5,
    name: "The Signature Flat White",
    subtitle: "Bold & Smooth",
    description: "Smooth Ristretto shots of espresso and perfectly steamed whole milk to create a bold, velvety finish.",
    price: "$5.75",
    image: "/images/coffee/menu_custom_5.jpg",
  },
];
