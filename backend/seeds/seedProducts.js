const mongoose = require("mongoose");
require("dotenv").config();

const Product = require("../models/Product");

mongoose.connect(process.env.MONGO_URI);

// ✅ YOUR APPROVED VENDOR ID
const vendorId = new mongoose.Types.ObjectId("69354a40601ff5826cf289b4");

// 🔥 PRODUCT DATA
const rawProducts = [
  // ===== VEGETABLES =====
  { name: "Fresh Tomato", category: "Vegetables", price: 30, stock: 100, image: "https://images.unsplash.com/photo-1592928302636-70c3f8045c91" },
  { name: "Onion", category: "Vegetables", price: 28, stock: 120, image: "https://images.unsplash.com/photo-1587049352846-4a222e7849b1" },
  { name: "Potato", category: "Vegetables", price: 25, stock: 150, image: "https://images.unsplash.com/photo-1582515073490-dc84a1e8f4a2" },
  { name: "Carrot", category: "Vegetables", price: 40, stock: 90, image: "https://images.unsplash.com/photo-1582515073490-39981397c445" },
  { name: "Green Capsicum", category: "Vegetables", price: 50, stock: 80, image: "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2" },
  { name: "Cabbage", category: "Vegetables", price: 35, stock: 60, image: "https://images.unsplash.com/photo-1615484477778-ca3b77940c25" },
  { name: "Cauliflower", category: "Vegetables", price: 45, stock: 70, image: "https://images.unsplash.com/photo-1604909053271-19c42f1a5f9a" },
  { name: "Spinach", category: "Vegetables", price: 20, stock: 50, image: "https://images.unsplash.com/photo-1601004890684-3f58c1c69a2a" },
  { name: "Green Peas", category: "Vegetables", price: 60, stock: 40, image: "https://images.unsplash.com/photo-1587049352846-cdc9e2b4a1d1" },
  { name: "Brinjal", category: "Vegetables", price: 35, stock: 65, image: "https://images.unsplash.com/photo-1615484477778-cc2a5c7b7c2a" },

  // ===== FRUITS =====
  { name: "Apple", category: "Fruits", price: 120, stock: 80, image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce" },
  { name: "Banana", category: "Fruits", price: 40, stock: 150, image: "https://images.unsplash.com/photo-1574226516831-e1dff420e43e" },
  { name: "Orange", category: "Fruits", price: 70, stock: 90, image: "https://images.unsplash.com/photo-1587049352846-98c6b1d2f5c6" },
  { name: "Mango", category: "Fruits", price: 150, stock: 60, image: "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2" },
  { name: "Grapes", category: "Fruits", price: 90, stock: 70, image: "https://images.unsplash.com/photo-1574226516831-9c9c7c6e8f24" },
  { name: "Pineapple", category: "Fruits", price: 85, stock: 40, image: "https://images.unsplash.com/photo-1582515073490-8c2d9c1d0b6d" },
  { name: "Papaya", category: "Fruits", price: 60, stock: 55, image: "https://images.unsplash.com/photo-1601004890684-2c4cdeaa4c4d" },
  { name: "Strawberry", category: "Fruits", price: 180, stock: 30, image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6" },
  { name: "Watermelon", category: "Fruits", price: 50, stock: 45, image: "https://images.unsplash.com/photo-1582515073490-39981397c445" },
  { name: "Kiwi", category: "Fruits", price: 140, stock: 35, image: "https://images.unsplash.com/photo-1587049352846-45f1b0c5b1b2" },

  // ===== DAIRY =====
  { name: "Milk 1L", category: "Dairy", price: 60, stock: 200, image: "https://images.unsplash.com/photo-1580910051074-7c7b5c6a1d24" },
  { name: "Curd", category: "Dairy", price: 45, stock: 120, image: "https://images.unsplash.com/photo-1604908177522-4725c3a4c1de" },
  { name: "Butter", category: "Dairy", price: 110, stock: 80, image: "https://images.unsplash.com/photo-1589987607627-616cacb7b97c" },
  { name: "Cheese Slices", category: "Dairy", price: 130, stock: 60, image: "https://images.unsplash.com/photo-1589987607627-92a3b5f7d2c4" },
  { name: "Paneer", category: "Dairy", price: 90, stock: 70, image: "https://images.unsplash.com/photo-1625944230945-1b7dd3c2c6a4" },
  { name: "Fresh Cream", category: "Dairy", price: 75, stock: 50, image: "https://images.unsplash.com/photo-1604908177522-bd8c7f1a0d4e" },
  { name: "Yogurt Cup", category: "Dairy", price: 35, stock: 90, image: "https://images.unsplash.com/photo-1615484477778-c6f0e5b8a4a2" },
  { name: "Ghee", category: "Dairy", price: 250, stock: 40, image: "https://images.unsplash.com/photo-1625944230945-9e8a2a4f3d21" },
  { name: "Flavored Milk", category: "Dairy", price: 30, stock: 100, image: "https://images.unsplash.com/photo-1580910051074-6d7c8b9a1e21" },
  { name: "Condensed Milk", category: "Dairy", price: 85, stock: 55, image: "https://images.unsplash.com/photo-1589987607627-4b9f8c6a3d1e" }
];

const seedProducts = async () => {
  try {
    const products = rawProducts.map(p => ({
      ...p,
      description: `Fresh ${p.name}`,
      vendor: vendorId,
      approved: true
    }));

    await Product.deleteMany();
    await Product.insertMany(products);

    console.log(`✅ ${products.length} products seeded successfully`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed", error);
    process.exit(1);
  }
};

seedProducts();
