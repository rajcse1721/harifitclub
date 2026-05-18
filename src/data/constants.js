export const PRIMARY = "#FF6B00";

export const NAV_LINKS = [
  "programs",
  "classes",
  "booking",
  "membership",
  "nutrition",
];

export const STATS = [
  { num: "1200+", label: "Members" },
  { num: "15+", label: "Expert Trainers" },
  { num: "98%", label: "Satisfaction Rate" },
  { num: "8 Yrs", label: "Experience" },
];

export const PROGRAMS = [
  {
    emoji: "🏋️",
    bg: "linear-gradient(135deg,#1a0a00,#3d1500)",
    badge: "Strength",
    badgeBg: "#2a1000",
    badgeColor: PRIMARY,
    title: "Power & Strength",
    desc: "Build raw strength with progressive overload — deadlifts, squats, bench press and compound lifts.",
    meta: ["⏱ 60 min", "🔥 Advanced", "👥 6 max"],
  },
  {
    emoji: "🏃",
    bg: "linear-gradient(135deg,#001a1a,#003d3d)",
    badge: "Cardio",
    badgeBg: "#002a2a",
    badgeColor: "#00cccc",
    title: "Endurance & Cardio",
    desc: "Boost cardiovascular capacity with interval training, treadmill circuits, and rowing.",
    meta: ["⏱ 45 min", "🔥 All levels", "👥 12 max"],
  },
  {
    emoji: "⚡",
    bg: "linear-gradient(135deg,#1a1500,#3d3000)",
    badge: "HIIT",
    badgeBg: "#2a2200",
    badgeColor: "#ffcc00",
    title: "HIIT & Fat Burn",
    desc: "High-intensity interval training to torch fat and build lean muscle. Max burn, min time.",
    meta: ["⏱ 30 min", "🔥 Intermediate", "👥 10 max"],
  },
];

export const CLASSES = [
  {
    icon: "🎯",
    iconBg: "#2a1000",
    title: "Personal Training",
    desc: "One-on-one sessions focused entirely on your goals, form, and progress.",
    features: [
      "Customized workout plan",
      "Real-time form correction",
      "Nutrition guidance included",
      "Progress tracking & reports",
      "Flexible scheduling",
    ],
    type: "Personal Training",
  },
  {
    icon: "📱",
    iconBg: "#001533",
    title: "Live Online Classes",
    desc: "Join live-streamed group sessions from home. Interactive, energetic, effective.",
    features: [
      "HD live video sessions",
      "Chat with trainer in real-time",
      "Session recordings available",
      "Small groups (max 20)",
      "Works on any device",
    ],
    type: "Live Online Class",
  },
  {
    icon: "🏠",
    iconBg: "#001a00",
    title: "Home Visit Classes",
    desc: "Your certified trainer comes to you with professional equipment.",
    features: [
      "Trainer visits your location",
      "Equipment provided (optional)",
      "Available across Bengaluru",
      "Morning & evening slots",
      "Same trainer every session",
    ],
    type: "Home Visit",
  },
];

export const TIME_SLOTS = [
  { time: "6:00 AM" },
  { time: "7:00 AM" },
  { time: "8:00 AM", full: true },
  { time: "9:00 AM" },
  { time: "10:00 AM" },
  { time: "11:00 AM" },
  { time: "5:00 PM", full: true },
  { time: "6:00 PM" },
  { time: "7:00 PM" },
  { time: "8:00 PM" },
  { time: "9:00 PM" },
];

export const PLANS = [
  {
    name: "Starter",
    price: "1,499",
    desc: "Perfect for beginners getting started",
    popular: false,
    features: [
      { t: "Gym access (weekdays)", y: true },
      { t: "4 group classes/month", y: true },
      { t: "Fitness assessment", y: true },
      { t: "Personal training", y: false },
      { t: "Nutrition plan", y: false },
      { t: "Home visits", y: false },
    ],
  },
  {
    name: "Pro",
    price: "3,499",
    desc: "For serious fitness enthusiasts",
    popular: true,
    features: [
      { t: "Unlimited gym access", y: true },
      { t: "Unlimited group classes", y: true },
      { t: "4 personal sessions/mo", y: true },
      { t: "Custom nutrition plan", y: true },
      { t: "Live online classes", y: true },
      { t: "Home visits", y: false },
    ],
  },
  {
    name: "Elite",
    price: "5,999",
    desc: "The all-in-one premium experience",
    popular: false,
    features: [
      { t: "Everything in Pro", y: true },
      { t: "8 personal sessions/mo", y: true },
      { t: "4 home visits/month", y: true },
      { t: "Priority booking", y: true },
      { t: "Meal planning + tracking", y: true },
      { t: "Dedicated trainer", y: true },
    ],
  },
];

export const NUTRITION_CARDS = [
  {
    icon: "🥗",
    title: "Custom Meal Plans",
    text: "Personalized to your body type, goals, and food preferences.",
  },
  {
    icon: "💊",
    title: "Supplement Guide",
    text: "Expert advice on safe, effective supplements for your training.",
  },
  {
    icon: "📊",
    title: "Macro Tracking",
    text: "Weekly check-ins and macro breakdowns to keep you on track.",
  },
  {
    icon: "🍳",
    title: "Healthy Recipes",
    text: "50+ tasty, high-protein recipes updated monthly for members.",
  },
];

export const TESTIMONIALS = [
  {
    stars: 5,
    text: "Lost 12 kgs in 3 months with the HIIT program and nutrition plan. Home visit classes were a game changer!",
    initials: "PK",
    bg: "#cc3300",
    name: "Priya Krishnamurthy",
    meta: "HSR Layout • 3 months",
  },
  {
    stars: 5,
    text: "Personal training sessions are incredibly focused. Went from 60 kg bench to 100 kg in 5 months!",
    initials: "RV",
    bg: "#006699",
    name: "Rohit Verma",
    meta: "Koramangala • 5 months",
  },
  {
    stars: 5,
    text: "Live online classes let me train from home while kids are asleep. Booking system is so smooth!",
    initials: "AS",
    bg: "#006633",
    name: "Anusha Sharma",
    meta: "Whitefield • 6 months",
  },
];
