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
    slug: "surron",
    name: "Sur-Ron",
    tagline: "Light Bee X / Ultra Bee",
    blurb:
      "Grips, bar hardware and controls for Sur-Ron Light Bee X and Ultra Bee. Direct fit on stock 22.2mm bars.",
    query: "surron",
    specs: [
      { k: "Bars", v: "22.2mm standard" },
      { k: "Fit", v: "Light Bee X / Ultra Bee" },
      { k: "Grips", v: "Lock-on compatible" },
    ],
  },
  {
    slug: "talaria",
    name: "Talaria",
    tagline: "Sting / XXX",
    blurb:
      "Replacement grips and finishing hardware for Talaria Sting and XXX builds. Built for hard riding.",
    query: "talaria",
    specs: [
      { k: "Bars", v: "22.2mm standard" },
      { k: "Fit", v: "Sting / XXX" },
      { k: "Hardware", v: "Stainless clamps" },
    ],
  },
  {
    slug: "strike",
    name: "Strike",
    tagline: "Electric moto platform",
    blurb:
      "Parts and accessories that bolt straight onto Strike electric bikes — grips, clamps and bar ends.",
    query: "strike",
    specs: [
      { k: "Bars", v: "22.2mm standard" },
      { k: "Grips", v: "Single clamp" },
      { k: "Dispatch", v: "48h" },
    ],
  },
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