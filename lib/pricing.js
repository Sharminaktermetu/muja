
export const PACKAGES = {
  1: {
    label: "১ জোড়া",
    pairs: 1,
    price: 690,
    tag: "",
  },
  2: {
    label: "২ জোড়া",
    pairs: 2,
    price: 1290,
    tag: "জনপ্রিয়",
  },
  3: {
    label: "৩ জোড়া",
    pairs: 3,
    price: 1490,
    tag: "সেরা অফার",
  },
};

export const SIZES = [
  "39",
  "40",
  "41",
  "42",
  "43",
  "44",
  "39",
  "40",
  "41",
  "42",
  "43",
  "44",
];

export function deliveryFee(pairs, area) {
  if (pairs >= 2) return 0;

  return area === "inside" ? 60 : 100;
}
