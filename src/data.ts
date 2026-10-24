import type { RoomId } from "./i18n";

export function photo(id: string, w = 1600) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
}

/** Stable Unsplash IDs — mediterranean / hospitality */
export const IMAGES = {
  hero: photo("photo-1499793983690-e29da59ef1c2", 2000),
  pool: photo("photo-1571896349842-33c89424de2d"),
  facade: photo("photo-1600596542815-ffad4c1539a9"),
  cala: photo("photo-1507525428034-b723cf961d3e"),
  suite: photo("photo-1582719478250-c89cae4dc85b"),
  water: photo("photo-1566073771259-6a8506099945"),
  linen: photo("photo-1618221195710-dd6b41faaea6"),
  terrace: photo("photo-1540541338287-41700207dee6"),
  limewash: photo("photo-1615874959474-d609969a20ed"),
  interior: photo("photo-1631049307264-da0ec9d70304"),
} as const;

export type Room = {
  id: RoomId;
  sizeM2: number;
  capacity: number;
  price: number;
  image: string;
  images: string[];
};

export const rooms: Room[] = [
  {
    id: "sea-suite",
    sizeM2: 48,
    capacity: 2,
    price: 420,
    image: IMAGES.suite,
    images: [IMAGES.suite, IMAGES.cala, IMAGES.linen],
  },
  {
    id: "patio",
    sizeM2: 32,
    capacity: 2,
    price: 280,
    image: IMAGES.facade,
    images: [IMAGES.facade, IMAGES.interior, IMAGES.water],
  },
  {
    id: "pine-loft",
    sizeM2: 40,
    capacity: 3,
    price: 340,
    image: IMAGES.limewash,
    images: [IMAGES.limewash, IMAGES.linen, IMAGES.pool],
  },
  {
    id: "cala",
    sizeM2: 56,
    capacity: 4,
    price: 490,
    image: IMAGES.terrace,
    images: [IMAGES.terrace, IMAGES.hero, IMAGES.cala],
  },
  {
    id: "terraza",
    sizeM2: 36,
    capacity: 2,
    price: 310,
    image: IMAGES.interior,
    images: [IMAGES.interior, IMAGES.pool, IMAGES.water],
  },
];

export function getRoom(id: string) {
  return rooms.find((room) => room.id === id);
}

export type GalleryItem = {
  id: keyof typeof IMAGES;
  src: string;
  wide?: boolean;
};

export const gallery: GalleryItem[] = [
  { id: "hero", src: IMAGES.hero, wide: true },
  { id: "suite", src: IMAGES.suite },
  { id: "cala", src: IMAGES.cala },
  { id: "terrace", src: IMAGES.terrace, wide: true },
  { id: "linen", src: IMAGES.linen },
  { id: "pool", src: IMAGES.pool },
  { id: "interior", src: IMAGES.interior, wide: true },
  { id: "water", src: IMAGES.water },
];

export const PLACE = {
  cala: "Cala Maré, Costa Brava",
  email: "stay@casamare.demo",
  phone: "+34 600 000 000",
};
