export interface FoodItem {
  id: string;
  name: string;
  category: "breakfast" | "lunch" | "snacks" | "drinks";
  price: number;
  prepTime: string;
  availableQuantity: number;
  isVeg: boolean;
  status: "available" | "out-of-stock" | "preparing" | "ready" | "live";
  image?: string;
  description?: string;
}

export interface CartItem extends FoodItem {
  quantity: number;
}

export interface Order {
  id: string;
  token: string;
  items: CartItem[];
  status: "preparing" | "ready" | "picked-up";
  pickupTime: string;
  total: number;
  date: string;
}

export interface User {
  name: string;
  course: string;
  rollNo: string;
  walletBalance: number;
  avatar?: string;
}

export const currentUser: User = {
  name: "Rahul Sharma",
  course: "CSE - 3rd Year",
  rollNo: "2021CSE10",
  walletBalance: 450,
};

export const foodItems: FoodItem[] = [
  {
    id: "1",
    name: "Chicken Roll",
    category: "snacks",
    price: 60,
    prepTime: "10 mins",
    availableQuantity: 8,
    isVeg: false,
    status: "available",
    description: "Spicy chicken wrapped in soft paratha",
    image: "/assets/chicken roll.jpeg",
  },
  {
    id: "2",
    name: "Paneer Tikka Rice",
    category: "lunch",
    price: 60,
    prepTime: "10 mins",
    availableQuantity: 0,
    isVeg: true,
    status: "out-of-stock",
    description: "Grilled paneer with aromatic rice",
    image:"/assets/paneer tika.jpeg"
  },
  {
    id: "3",
    name: "Samosa Platter",
    category: "snacks",
    price: 60,
    prepTime: "10 mins",
    availableQuantity: 15,
    isVeg: false,
    status: "preparing",
    description: "Crispy samosas with chutney",
  },
  {
    id: "4",
    name: "Chicken Kathi Roll",
    category: "snacks",
    price: 60,
    prepTime: "10 mins",
    availableQuantity: 15,
    isVeg: false,
    status: "ready",
    description: "Classic kathi roll with chicken",
  },
  {
    id: "5",
    name: "Veg Spring Roll",
    category: "snacks",
    price: 60,
    prepTime: "10 mins",
    availableQuantity: 0,
    isVeg: true,
    status: "out-of-stock",
    description: "Crispy veggie spring rolls",
  },
  {
    id: "6",
    name: "Rajma Chawal",
    category: "lunch",
    price: 60,
    prepTime: "10 mins",
    availableQuantity: 12,
    isVeg: true,
    status: "ready",
    description: "Kidney beans curry with steamed rice",
    image: "/assets/rice.jpeg",
  },
  {
    id: "7",
    name: "Veg Pakoda",
    category: "snacks",
    price: 60,
    prepTime: "10 mins",
    availableQuantity: 20,
    isVeg: true,
    status: "ready",
    description: "Assorted vegetable fritters",
  },
  {
    id: "8",
    name: "Chilli Chicken",
    category: "lunch",
    price: 60,
    prepTime: "10 mins",
    availableQuantity: 0,
    isVeg: false,
    status: "out-of-stock",
    description: "Indo-Chinese style chilli chicken",
    image: "/assets/chilli chiken.jpeg",
  },
  {
    id: "9",
    name: "Veg Roll",
    category: "snacks",
    price: 60,
    prepTime: "10 mins",
    availableQuantity: 0,
    isVeg: true,
    status: "out-of-stock",
    description: "Mixed vegetable roll",
  },
  {
    id: "10",
    name: "French Fries",
    category: "snacks",
    price: 60,
    prepTime: "10 mins",
    availableQuantity: 15,
    isVeg: true,
    status: "ready",
    description: "Crispy golden french fries",
  },
  {
    id: "11",
    name: "Veg Pizza",
    category: "snacks",
    price: 60,
    prepTime: "15 mins",
    availableQuantity: 10,
    isVeg: true,
    status: "preparing",
    description: "Cheesy vegetable pizza",
  },
  {
    id: "12",
    name: "Fish & Chips",
    category: "lunch",
    price: 60,
    prepTime: "10 mins",
    availableQuantity: 8,
    isVeg: false,
    status: "live",
    description: "Battered fish with potato chips",
    image: "/assets/fish& fry.jpeg",
  },
  {
    id: "13",
    name: "Aloo Paratha",
    category: "breakfast",
    price: 40,
    prepTime: "8 mins",
    availableQuantity: 20,
    isVeg: true,
    status: "available",
    description: "Stuffed potato paratha with curd",
    image: "/assets/aloo paratha.jpeg",
  },
  {
    id: "14",
    name: "Poha",
    category: "breakfast",
    price: 35,
    prepTime: "5 mins",
    availableQuantity: 25,
    isVeg: true,
    status: "available",
    description: "Flattened rice with spices and peanuts",
    image: "/assets/poha.jpeg",
  },
  {
    id: "15",
    name: "Egg Roll",
    category: "breakfast",
    price: 50,
    prepTime: "8 mins",
    availableQuantity: 12,
    isVeg: false,
    status: "available",
    description: "Scrambled egg roll with sauces",
    image: "/assets/egg roll.jpeg",
  },
  {
    id: "16",
    name: "Masala Dosa",
    category: "breakfast",
    price: 55,
    prepTime: "10 mins",
    availableQuantity: 18,
    isVeg: true,
    status: "available",
    description: "Crispy dosa with potato filling",
    image: "/assets/masala dosa.jpeg",
  },
  {
    id: "17",
    name: "Butter Chicken",
    category: "lunch",
    price: 120,
    prepTime: "15 mins",
    availableQuantity: 10,
    isVeg: false,
    status: "available",
    description: "Creamy tomato-based chicken curry",
    image: "/assets/butter chicken.jpeg",
    },
  {
    id: "18",
    name: "Dal Makhani",
    category: "lunch",
    price: 80,
    prepTime: "12 mins",
    availableQuantity: 15,
    isVeg: true,
    status: "available",
    description: "Creamy black lentils",
    image: "/assets/dal makhani.jpeg",
  },
  {
    id: "19",
    name: "Cold Coffee",
    category: "drinks",
    price: 45,
    prepTime: "3 mins",
    availableQuantity: 30,
    isVeg: true,
    status: "available",
    description: "Chilled coffee with ice cream",
  },
  {
    id: "20",
    name: "Fresh Lime Soda",
    category: "drinks",
    price: 30,
    prepTime: "2 mins",
    availableQuantity: 30,
    isVeg: true,
    status: "available",
    description: "Refreshing lime soda",
    image: "/assets/drinks.jpeg",
  },
];

export const orders: Order[] = [
  {
    id: "ORD-2026-001",
    token: "A102",
    items: [
      { ...foodItems[0], quantity: 1 },
      { ...foodItems[2], quantity: 2 },
    ],
    status: "preparing",
    pickupTime: "12:45 PM",
    total: 180,
    date: "2026-05-06",
  },
  {
    id: "ord-2",
    token: "A098",
    items: [
      { ...foodItems[5], quantity: 1 },
    ],
    status: "ready",
    pickupTime: "1:00 PM",
    total: 60,
    date: "2026-05-06",
  },
  {
    id: "ORD-2026-003",
    token: "A095",
    items: [
      { ...foodItems[1], quantity: 1 },
      { ...foodItems[6], quantity: 1 },
    ],
    status: "picked-up",
    pickupTime: "11:30 AM",
    total: 120,
    date: "2026-05-05",
  },
];

export const analyticsData = [
  { name: "Mon", orders: 24, spending: 1200 },
  { name: "Tue", orders: 18, spending: 950 },
  { name: "Wed", orders: 32, spending: 1800 },
  { name: "Thu", orders: 27, spending: 1400 },
  { name: "Fri", orders: 35, spending: 2100 },
  { name: "Sat", orders: 20, spending: 1100 },
  { name: "Sun", orders: 15, spending: 800 },
];
