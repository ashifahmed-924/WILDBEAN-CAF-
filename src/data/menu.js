/**
 * Menu data for Wildbean Café — Dandenong South.
 *
 * Uber Eats store confirmed for this outlet (categories visible):
 * Drinks, Pantry, Bakery, Prepared Food, Snacks
 * https://www.ubereats.com/au/store/wildbean-cafe-by-bp-dandenong-south/Z2TfyLoCWU6P-ql2VcL3Aw
 *
 * Item-level prices for this specific branch were not publicly extractable
 * at check date (delivery unavailable / menu detail blocked). Prices remain null
 * and are never shown as confirmed in the UI.
 *
 * Product names reflect standard Wildbean Café AU range (BP official menu
 * categories) available at Wildbean outlets; treat as development listings
 * for this branch until local prices are verified.
 */

export const menuCategories = [
  { id: "coffee", label: "Coffee", gateway: "COFFEE" },
  { id: "hot-food", label: "Hot Food", gateway: "HOT FOOD" },
  { id: "bakery", label: "Bakery", gateway: "BAKERY" },
  { id: "cold-drinks", label: "Cold Drinks", gateway: "COLD DRINKS" },
  { id: "snacks", label: "Snacks", gateway: "SNACKS" },
];

export const menuItems = [
  {
    id: "latte",
    name: "Latte",
    category: "coffee",
    description:
      "Smooth espresso with steamed milk — a Wildbean classic for every stop.",
    price: null,
    priceVerified: false,
    sizes: ["Regular", "Large", "Maxi"],
    sourceUrl:
      "https://www.ubereats.com/au/store/wildbean-cafe-by-bp-dandenong-south/Z2TfyLoCWU6P-ql2VcL3Aw",
    image: "/images/menu/latte.jpg",
    featured: true,
    dateChecked: "2026-10-12",
  },
  {
    id: "flat-white",
    name: "Flat White",
    category: "coffee",
    description: "Velvety microfoam over a rich double shot.",
    price: null,
    priceVerified: false,
    sizes: ["Regular", "Large", "Maxi"],
    sourceUrl:
      "https://www.ubereats.com/au/store/wildbean-cafe-by-bp-dandenong-south/Z2TfyLoCWU6P-ql2VcL3Aw",
    image: "/images/menu/flat-white.jpg",
    featured: true,
    dateChecked: "2026-10-12",
  },
  {
    id: "cappuccino",
    name: "Cappuccino",
    category: "coffee",
    description: "Espresso, steamed milk and a generous foam finish.",
    price: null,
    priceVerified: false,
    sizes: ["Regular", "Large", "Maxi"],
    sourceUrl:
      "https://www.ubereats.com/au/store/wildbean-cafe-by-bp-dandenong-south/Z2TfyLoCWU6P-ql2VcL3Aw",
    image: "/images/menu/cappuccino.jpg",
    featured: true,
    dateChecked: "2026-10-12",
  },
  {
    id: "mocha",
    name: "Mocha",
    category: "coffee",
    description: "Chocolate and espresso blended with steamed milk.",
    price: null,
    priceVerified: false,
    sizes: ["Regular", "Large", "Maxi"],
    sourceUrl:
      "https://www.ubereats.com/au/store/wildbean-cafe-by-bp-dandenong-south/Z2TfyLoCWU6P-ql2VcL3Aw",
    image: "/images/menu/mocha.jpg",
    featured: false,
    dateChecked: "2026-10-12",
  },
  {
    id: "long-black",
    name: "Long Black",
    category: "coffee",
    description: "Bold espresso lengthened with hot water.",
    price: null,
    priceVerified: false,
    sizes: ["Regular", "Large", "Maxi"],
    sourceUrl:
      "https://www.ubereats.com/au/store/wildbean-cafe-by-bp-dandenong-south/Z2TfyLoCWU6P-ql2VcL3Aw",
    image: "/images/menu/long-black.jpg",
    featured: false,
    dateChecked: "2026-10-12",
  },
  {
    id: "hot-chocolate",
    name: "Hot Chocolate",
    category: "coffee",
    description: "Rich cocoa with steamed milk — cosy on the go.",
    price: null,
    priceVerified: false,
    sizes: ["Regular", "Large", "Maxi"],
    sourceUrl:
      "https://www.ubereats.com/au/store/wildbean-cafe-by-bp-dandenong-south/Z2TfyLoCWU6P-ql2VcL3Aw",
    image: "/images/menu/hot-choc.jpg",
    featured: false,
    dateChecked: "2026-10-12",
  },
  {
    id: "meat-pie",
    name: "Classic Meat Pie",
    category: "hot-food",
    description: "Flaky pastry filled with seasoned meat — a proper Aussie bite.",
    price: null,
    priceVerified: false,
    sizes: [],
    sourceUrl:
      "https://www.ubereats.com/au/store/wildbean-cafe-by-bp-dandenong-south/Z2TfyLoCWU6P-ql2VcL3Aw",
    image: "/images/menu/pie.jpg",
    featured: true,
    dateChecked: "2026-10-12",
  },
  {
    id: "toastie",
    name: "Ham & Cheese Toastie",
    category: "hot-food",
    description: "Grilled until golden with melted cheese and ham.",
    price: null,
    priceVerified: false,
    sizes: [],
    sourceUrl:
      "https://www.ubereats.com/au/store/wildbean-cafe-by-bp-dandenong-south/Z2TfyLoCWU6P-ql2VcL3Aw",
    image: "/images/menu/toastie.jpg",
    featured: true,
    dateChecked: "2026-10-12",
  },
  {
    id: "brekkie-wrap",
    name: "Breakfast Wrap",
    category: "hot-food",
    description: "A filling wrap ready for the road.",
    price: null,
    priceVerified: false,
    sizes: [],
    sourceUrl:
      "https://www.ubereats.com/au/store/wildbean-cafe-by-bp-dandenong-south/Z2TfyLoCWU6P-ql2VcL3Aw",
    image: "/images/menu/wrap.jpg",
    featured: false,
    dateChecked: "2026-10-12",
  },
  {
    id: "sausage-roll",
    name: "Sausage Roll",
    category: "hot-food",
    description: "Golden pastry wrapped around seasoned sausage filling.",
    price: null,
    priceVerified: false,
    sizes: [],
    sourceUrl:
      "https://www.ubereats.com/au/store/wildbean-cafe-by-bp-dandenong-south/Z2TfyLoCWU6P-ql2VcL3Aw",
    image: "/images/menu/pie.jpg",
    featured: false,
    dateChecked: "2026-10-12",
  },
  {
    id: "sandwich",
    name: "Fresh Sandwich",
    category: "hot-food",
    description: "Prepared food for a quick lunch stop.",
    price: null,
    priceVerified: false,
    sizes: [],
    sourceUrl:
      "https://www.ubereats.com/au/store/wildbean-cafe-by-bp-dandenong-south/Z2TfyLoCWU6P-ql2VcL3Aw",
    image: "/images/menu/sandwich.jpg",
    featured: false,
    dateChecked: "2026-10-12",
  },
  {
    id: "croissant",
    name: "Butter Croissant",
    category: "bakery",
    description: "Flaky, buttery layers — perfect with coffee.",
    price: null,
    priceVerified: false,
    sizes: [],
    sourceUrl:
      "https://www.ubereats.com/au/store/wildbean-cafe-by-bp-dandenong-south/Z2TfyLoCWU6P-ql2VcL3Aw",
    image: "/images/menu/croissant.jpg",
    featured: true,
    dateChecked: "2026-10-12",
  },
  {
    id: "blueberry-muffin",
    name: "Blueberry Muffin",
    category: "bakery",
    description: "Soft bakery muffin studded with blueberries.",
    price: null,
    priceVerified: false,
    sizes: [],
    sourceUrl:
      "https://www.ubereats.com/au/store/wildbean-cafe-by-bp-dandenong-south/Z2TfyLoCWU6P-ql2VcL3Aw",
    image: "/images/menu/muffin.jpg",
    featured: true,
    dateChecked: "2026-10-12",
  },
  {
    id: "banana-bread",
    name: "Banana Bread",
    category: "bakery",
    description: "Moist banana bread — toast it for extra comfort.",
    price: null,
    priceVerified: false,
    sizes: [],
    sourceUrl:
      "https://www.ubereats.com/au/store/wildbean-cafe-by-bp-dandenong-south/Z2TfyLoCWU6P-ql2VcL3Aw",
    image: "/images/menu/banana-bread.jpg",
    featured: false,
    dateChecked: "2026-10-12",
  },
  {
    id: "cookie",
    name: "Chocolate Cookie",
    category: "bakery",
    description: "A sweet bakery treat for the road.",
    price: null,
    priceVerified: false,
    sizes: [],
    sourceUrl:
      "https://www.ubereats.com/au/store/wildbean-cafe-by-bp-dandenong-south/Z2TfyLoCWU6P-ql2VcL3Aw",
    image: "/images/menu/cookie.jpg",
    featured: false,
    dateChecked: "2026-10-12",
  },
  {
    id: "iced-latte",
    name: "Iced Latte",
    category: "cold-drinks",
    description: "Chilled espresso and milk over ice.",
    price: null,
    priceVerified: false,
    sizes: ["Regular", "Large"],
    sourceUrl:
      "https://www.ubereats.com/au/store/wildbean-cafe-by-bp-dandenong-south/Z2TfyLoCWU6P-ql2VcL3Aw",
    image: "/images/menu/iced-latte.jpg",
    featured: true,
    dateChecked: "2026-10-12",
  },
  {
    id: "milkshake",
    name: "Milkshake",
    category: "cold-drinks",
    description: "Thick, chilled milkshake in classic café flavours.",
    price: null,
    priceVerified: false,
    sizes: [],
    sourceUrl:
      "https://www.ubereats.com/au/store/wildbean-cafe-by-bp-dandenong-south/Z2TfyLoCWU6P-ql2VcL3Aw",
    image: "/images/menu/milkshake.jpg",
    featured: false,
    dateChecked: "2026-10-12",
  },
  {
    id: "cold-brew",
    name: "Iced Coffee",
    category: "cold-drinks",
    description: "A refreshing cold coffee for warmer drives.",
    price: null,
    priceVerified: false,
    sizes: [],
    sourceUrl:
      "https://www.ubereats.com/au/store/wildbean-cafe-by-bp-dandenong-south/Z2TfyLoCWU6P-ql2VcL3Aw",
    image: "/images/menu/iced-latte.jpg",
    featured: false,
    dateChecked: "2026-10-12",
  },
  {
    id: "snack-chips",
    name: "Snack Pack",
    category: "snacks",
    description: "Grab-and-go snacks from the Wildbean pantry selection.",
    price: null,
    priceVerified: false,
    sizes: [],
    sourceUrl:
      "https://www.ubereats.com/au/store/wildbean-cafe-by-bp-dandenong-south/Z2TfyLoCWU6P-ql2VcL3Aw",
    image: "/images/menu/cookie.jpg",
    featured: false,
    dateChecked: "2026-10-12",
  },
  {
    id: "brownie",
    name: "Brownie Bite",
    category: "snacks",
    description: "A rich chocolate treat for a quick sweet fix.",
    price: null,
    priceVerified: false,
    sizes: [],
    sourceUrl:
      "https://www.ubereats.com/au/store/wildbean-cafe-by-bp-dandenong-south/Z2TfyLoCWU6P-ql2VcL3Aw",
    image: "/images/menu/muffin.jpg",
    featured: false,
    dateChecked: "2026-10-12",
  },
];

export function getItemsByCategory(categoryId) {
  return menuItems.filter((item) => item.category === categoryId);
}

export function getFeaturedItems() {
  return menuItems.filter((item) => item.featured);
}

export function formatPrice(item) {
  if (!item?.priceVerified || item.price == null) return null;
  return `A$${Number(item.price).toFixed(2)}`;
}
