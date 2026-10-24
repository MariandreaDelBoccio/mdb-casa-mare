import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Lang = "en" | "es";

export type RoomId = "sea-suite" | "patio" | "pine-loft" | "cala" | "terraza";

type RoomCopy = { name: string; short: string; description: string };

const en = {
  nav: {
    stay: "Stay",
    rooms: "Rooms",
    gallery: "Gallery",
    booking: "Book",
    contact: "Contact",
    menu: "Menu",
    close: "Close",
  },
  lang: { group: "Language" },
  hero: {
    kicker: "Cala Maré · Mediterranean",
    title: "Sun, shade & stillness.",
    lead: "A small casa of limewash, pine, and linen — five rooms, one cala, evenings that refuse to hurry.",
  },
  bookingBar: {
    checkIn: "Check-in",
    checkOut: "Check-out",
    guests: "Guests",
    guest: "guest",
    guestsPlural: "guests",
    cta: "Check availability",
    checking: "Checking…",
    room: "Room",
    anyRoom: "Any room",
    unavailable: "Those nights are full — try other dates. (Demo availability.)",
  },
  home: {
    introKicker: "The casa",
    introTitle: "Sun, shade, and the kind of quiet that smells of salt and pine.",
    introText:
      "CASA MARÉ sits above a small cala. Limewashed walls hold the afternoon. Terraces catch the last light. Dinner is late, water is close, and nothing asks you to rush.",
    ritualTitle: "A slower day",
    rituals: [
      { name: "Morning", text: "Coffee on the terraza. The sea is still. Pine needles click in the heat." },
      { name: "Afternoon", text: "Shade in the patio. A swim. Linen that has been in the sun." },
      { name: "Evening", text: "Terracotta light on white walls. Wine, salt air, a long table." },
    ],
    roomsKicker: "Sleep",
    roomsTitle: "Five rooms, all facing the water or the pines.",
    roomsCta: "See all rooms",
    galleryCta: "Open the gallery",
  },
  rooms: {
    kicker: "Rooms",
    title: "Where you sleep.",
    lead: "White walls, pine, and linen. Each room is named for the light it keeps.",
    from: "from",
    night: "/ night",
    size: "m²",
    guests: "guests",
    view: "View room",
    book: "Book this room",
    notFoundTitle: "This room has already been given away to the light.",
    notFoundText: "We couldn’t find that room. Choose another, or return home.",
    back: "All rooms",
  },
  roomCopy: {
    "sea-suite": {
      name: "Suite Maré",
      short: "The sea at the foot of the bed.",
      description:
        "Our largest sea-facing suite. Limewash, a wide bed dressed in linen, and a terrace that looks straight onto the cala. Late afternoon is the point.",
    },
    patio: {
      name: "Habitación Patio",
      short: "Shade, citrus, a quiet courtyard.",
      description:
        "A smaller room opening onto the inner patio. Fig leaves, terracotta, and the sound of water in the fountain. Made for two people who like the shade.",
    },
    "pine-loft": {
      name: "Loft del Pino",
      short: "High timber, resin, and sky.",
      description:
        "A loft under the pines. Pale wood, a long window, and room for a third guest. The air smells of resin after the heat breaks.",
    },
    cala: {
      name: "Suite Cala",
      short: "Family light, water below.",
      description:
        "A generous suite for four, with a sitting room and a view down to the rocks. White architecture, sea air, and a terrace large enough for breakfast that lasts.",
    },
    terraza: {
      name: "Habitación Terraza",
      short: "Open air, linen, evening gold.",
      description:
        "A room that lives on its terraza. Cream interiors, a writing table, and the last light of the day poured over the sea.",
    },
  } satisfies Record<RoomId, RoomCopy>,
  gallery: {
    kicker: "Gallery",
    title: "Limewash, pine, and the sea.",
    lead: "A slow look at the casa — water, white walls, linen in late light.",
    captions: {
      hero: "The pool at golden hour",
      limewash: "White architecture above the cala",
      pool: "Still water, late afternoon",
      cala: "The sea, close enough to hear",
      suite: "Linen and shade",
      water: "A swim before dinner",
      linen: "Rooms dressed in cream",
      terrace: "Terraza light",
      facade: "The casa from the pines",
      interior: "Evening inside",
    },
  },
  booking: {
    kicker: "Stay with us",
    title: "Request a stay.",
    lead: "Tell us the dates. We will write back with availability — this is a casa, not a machine.",
    name: "Full name",
    email: "Email",
    notes: "Notes (optional)",
    notesPh: "Early arrival, a quiet room, a table on the terraza…",
    submit: "Request stay",
    sending: "Sending…",
    successTitle: "Your request is with us.",
    successText: "We will confirm by email. Until then — imagine limewash and late light.",
    another: "Make another request",
    summary: "Your stay",
    nights: "nights",
    night: "night",
    total: "Estimated total",
    errors: {
      checkIn: "Choose a check-in date.",
      checkOut: "Choose a check-out date after check-in.",
      past: "Check-in cannot be in the past.",
      guests: "Tell us how many guests.",
      guestsMax: "That room holds fewer guests.",
      name: "We need a name.",
      email: "A valid email, please.",
      form: "Please fix the fields below.",
    },
  },
  contact: {
    kicker: "Contact",
    title: "Write to the casa.",
    lead: "Questions about the cala, dinner, or a longer stay. We read everything.",
    name: "Name",
    email: "Email",
    message: "Message",
    messagePh: "A table, a room, a question about the pines…",
    submit: "Send message",
    successTitle: "Message received.",
    successText: "We will write back from the casa. Thank you for finding us.",
    another: "Send another",
    address: "Cala Maré, Costa Brava",
    hours: "Reception 8:00–22:00",
    errors: {
      name: "Please add your name.",
      email: "A valid email is required.",
      message: "Write a short message so we know how to help.",
      form: "Please complete the highlighted fields.",
    },
  },
  notFound: {
    title: "This path leads into the pines.",
    text: "The page isn’t here. Come back to the casa.",
    cta: "Return home",
  },
  footer: {
    tagline: "Sun, shade, and calm.",
    demo: "A demo by m.d.b.",
    rights: "Fictional hotel. All photography via Unsplash.",
  },
};

const es: typeof en = {
  nav: {
    stay: "Casa",
    rooms: "Habitaciones",
    gallery: "Galería",
    booking: "Reservar",
    contact: "Contacto",
    menu: "Menú",
    close: "Cerrar",
  },
  lang: { group: "Idioma" },
  hero: {
    kicker: "Cala Maré · Mediterráneo",
    title: "Sol, sombra y calma.",
    lead: "Una casa pequeña de cal, pino y lino — cinco habitaciones, una cala, tardes que no tienen prisa.",
  },
  bookingBar: {
    checkIn: "Llegada",
    checkOut: "Salida",
    guests: "Huéspedes",
    guest: "huésped",
    guestsPlural: "huéspedes",
    cta: "Ver disponibilidad",
    checking: "Comprobando…",
    room: "Habitación",
    anyRoom: "Cualquiera",
    unavailable: "Esas noches están completas — prueba otras fechas. (Disponibilidad demo.)",
  },
  home: {
    introKicker: "La casa",
    introTitle: "Sol, sombra y un silencio que huele a sal y a pino.",
    introText:
      "CASA MARÉ mira una cala pequeña. Los muros de cal guardan la tarde. Las terrazas atrapan la última luz. La cena es tarde, el agua está cerca, y nada te pide prisa.",
    ritualTitle: "Un día más lento",
    rituals: [
      { name: "Mañana", text: "Café en la terraza. El mar todavía quieto. Las agujas de pino en el calor." },
      { name: "Tarde", text: "Sombra en el patio. Un baño. Lino que ha estado al sol." },
      { name: "Noche", text: "Luz de terracota sobre cal. Vino, aire salado, una mesa larga." },
    ],
    roomsKicker: "Dormir",
    roomsTitle: "Cinco habitaciones, todas al agua o a los pinos.",
    roomsCta: "Ver habitaciones",
    galleryCta: "Abrir la galería",
  },
  rooms: {
    kicker: "Habitaciones",
    title: "Dónde se duerme.",
    lead: "Muros blancos, pino y lino. Cada habitación lleva el nombre de la luz que guarda.",
    from: "desde",
    night: "/ noche",
    size: "m²",
    guests: "huéspedes",
    view: "Ver habitación",
    book: "Reservar esta habitación",
    notFoundTitle: "Esa habitación ya se la llevó la luz.",
    notFoundText: "No encontramos esa habitación. Elige otra, o vuelve a casa.",
    back: "Todas las habitaciones",
  },
  roomCopy: {
    "sea-suite": {
      name: "Suite Maré",
      short: "El mar al pie de la cama.",
      description:
        "Nuestra suite más amplia frente al mar. Cal, una cama ancha de lino y una terraza que mira de frente a la cala. La tarde es el punto.",
    },
    patio: {
      name: "Habitación Patio",
      short: "Sombra, cítricos, un patio quieto.",
      description:
        "Una habitación más pequeña que abre al patio interior. Hojas de higuera, terracota y el agua de la fuente. Para dos personas que prefieren la sombra.",
    },
    "pine-loft": {
      name: "Loft del Pino",
      short: "Madera alta, resina y cielo.",
      description:
        "Un loft bajo los pinos. Madera clara, una ventana larga y sitio para un tercer huésped. El aire huele a resina cuando baja el calor.",
    },
    cala: {
      name: "Suite Cala",
      short: "Luz de familia, agua abajo.",
      description:
        "Una suite generosa para cuatro, con estar y vista a las rocas. Arquitectura blanca, aire de mar y una terraza grande para un desayuno largo.",
    },
    terraza: {
      name: "Habitación Terraza",
      short: "Aire abierto, lino, oro de tarde.",
      description:
        "Una habitación que vive en su terraza. Interiores crema, una mesa de escribir y la última luz del día sobre el mar.",
    },
  },
  gallery: {
    kicker: "Galería",
    title: "Cal, pino y mar.",
    lead: "Una mirada lenta a la casa — agua, muros blancos, lino a última hora.",
    captions: {
      hero: "La piscina a la hora dorada",
      limewash: "Arquitectura blanca sobre la cala",
      pool: "Agua quieta, tarde lenta",
      cala: "El mar, lo bastante cerca",
      suite: "Lino y sombra",
      water: "Un baño antes de cenar",
      linen: "Habitaciones en crema",
      terrace: "Luz de terraza",
      facade: "La casa desde los pinos",
      interior: "La noche adentro",
    },
  },
  booking: {
    kicker: "Quedarse",
    title: "Pide una estancia.",
    lead: "Cuéntanos las fechas. Te escribimos con disponibilidad — esto es una casa, no una máquina.",
    name: "Nombre completo",
    email: "Correo",
    notes: "Notas (opcional)",
    notesPh: "Llegada temprana, una habitación quieta, mesa en la terraza…",
    submit: "Pedir estancia",
    sending: "Enviando…",
    successTitle: "Tu petición ya está con nosotras.",
    successText: "Confirmaremos por correo. Mientras tanto — imagina cal y luz de tarde.",
    another: "Hacer otra petición",
    summary: "Tu estancia",
    nights: "noches",
    night: "noche",
    total: "Total estimado",
    errors: {
      checkIn: "Elige una fecha de llegada.",
      checkOut: "Elige una salida posterior a la llegada.",
      past: "La llegada no puede ser en el pasado.",
      guests: "Dinos cuántas personas.",
      guestsMax: "Esa habitación admite menos huéspedes.",
      name: "Necesitamos un nombre.",
      email: "Un correo válido, por favor.",
      form: "Corrige los campos de abajo.",
    },
  },
  contact: {
    kicker: "Contacto",
    title: "Escribe a la casa.",
    lead: "Preguntas sobre la cala, la cena o una estancia más larga. Leemos todo.",
    name: "Nombre",
    email: "Correo",
    message: "Mensaje",
    messagePh: "Una mesa, una habitación, una pregunta sobre los pinos…",
    submit: "Enviar mensaje",
    successTitle: "Mensaje recibido.",
    successText: "Te escribiremos desde la casa. Gracias por encontrarnos.",
    another: "Enviar otro",
    address: "Cala Maré, Costa Brava",
    hours: "Recepción 8:00–22:00",
    errors: {
      name: "Añade tu nombre.",
      email: "Hace falta un correo válido.",
      message: "Escribe un mensaje breve para saber cómo ayudarte.",
      form: "Completa los campos marcados.",
    },
  },
  notFound: {
    title: "Este camino se mete entre los pinos.",
    text: "La página no está. Vuelve a la casa.",
    cta: "Volver al inicio",
  },
  footer: {
    tagline: "Sol, sombra y calma.",
    demo: "A demo by m.d.b.",
    rights: "Hotel ficticio. Fotografía de Unsplash.",
  },
};

const dicts = { en, es };

type I18nValue = {
  lang: Lang;
  t: typeof en;
  setLang: (lang: Lang) => void;
};

const I18nContext = createContext<I18nValue | null>(null);

function readLang(): Lang {
  if (typeof window === "undefined") return "es";
  const saved = window.localStorage.getItem("casamare-lang");
  if (saved === "en" || saved === "es") return saved;
  return navigator.language.toLowerCase().startsWith("es") ? "es" : "en";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readLang);

  const setLang = (next: Lang) => {
    window.localStorage.setItem("casamare-lang", next);
    setLangState(next);
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo(() => ({ lang, t: dicts[lang], setLang }), [lang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}
