export interface Bike {
  slug: string;
  name: string;
  tagline: string;
  blurb: string;
  query: string;
  specs: Array<{ k: string; v: string }>;
}

export const BIKES: Bike[] = [
  {
    slug: "heybike-villain",
    name: "Heybike Villain",
    tagline: "Fat-tire moto build",
    blurb:
      "Grips, bar hardware and controls sized for the Heybike Villain. Direct fit on the stock 22.2mm bars, no shimming.",
    query: "villain",
    specs: [
      { k: "Bars", v: "22.2mm standard" },
      { k: "Tire", v: "20 x 4.0 fat" },
      { k: "Fit", v: "Stock throttle + brake levers" },
    ],
  },
  {
    slug: "yozma",
    name: "Yozma",
    tagline: "Light electric platform",
    blurb:
      "Replacement grips, bar ends and small hardware for Yozma electric bikes. Built to survive daily riding.",
    query: "yozma",
    specs: [
      { k: "Bars", v: "22.2mm standard" },
      { k: "Grips", v: "Lock-on compatible" },
      { k: "Hardware", v: "Stainless clamps" },
    ],
  },
  {
    slug: "valtinsu",
    name: "Valtinsu",
    tagline: "Commuter and trail",
    blurb:
      "Parts and accessories that bolt straight onto Valtinsu e-bikes — grips, clamps and finishing hardware.",
    query: "valtinsu",
    specs: [
      { k: "Bars", v: "22.2mm standard" },
      { k: "Grips", v: "Single clamp" },
      { k: "Dispatch", v: "48h" },
    ],
  },
];

export const BIKE_LIST = BIKES.map((b) => ({ slug: b.slug, name: b.name }));

export function getBike(slug: string) {
  return BIKES.find((b) => b.slug === slug);
}