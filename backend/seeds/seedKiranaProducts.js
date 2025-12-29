// backend/seeds/seedKiranaProducts.js

const mongoose = require("mongoose");
require("dotenv").config();

const Product = require("../models/Product");
const User = require("../models/User");

mongoose.connect(process.env.MONGO_URI);

const vendorId = "69354a40601ff5826cf289b4"; // YOUR APPROVED VENDOR ID

const products = [

/* ================= STAPLES ================= */
{ name:"Sugar 1kg", category:"Staples", price:45, stock:200, image:"https://images.unsplash.com/photo-1627485937980-221c88ac04c0", description:"Refined white sugar", vendor:vendorId, approved:true },
{ name:"Salt 1kg", category:"Staples", price:20, stock:300, image:"https://images.unsplash.com/photo-1601004890684-3b1f9b4e0b2d", description:"Iodized salt", vendor:vendorId, approved:true },
{ name:"Poha", category:"Staples", price:35, stock:150, image:"https://images.unsplash.com/photo-1633945274405-b6c8069047b0", description:"Flattened rice", vendor:vendorId, approved:true },
{ name:"Sabudana", category:"Staples", price:80, stock:100, image:"https://images.unsplash.com/photo-1615484477778-3f0d62b4a39a", description:"Tapioca pearls", vendor:vendorId, approved:true },
{ name:"Besan", category:"Staples", price:90, stock:120, image:"https://images.unsplash.com/photo-1601050690597-3c7ec4a1b4b5", description:"Gram flour", vendor:vendorId, approved:true },
{ name:"Maida", category:"Staples", price:55, stock:180, image:"https://images.unsplash.com/photo-1601315379732-4c7e51f7fba6", description:"Refined wheat flour", vendor:vendorId, approved:true },
{ name:"Suji", category:"Staples", price:50, stock:160, image:"https://images.unsplash.com/photo-1623065422902-30a2d299d6d0", description:"Semolina", vendor:vendorId, approved:true },
{ name:"Rava", category:"Staples", price:45, stock:140, image:"https://images.unsplash.com/photo-1626193081932-bcc0e9f4b6e0", description:"Wheat rava", vendor:vendorId, approved:true },
{ name:"Soya Chunks", category:"Staples", price:65, stock:130, image:"https://images.unsplash.com/photo-1606755962773-0a74a4a0c3b7", description:"Protein rich soya", vendor:vendorId, approved:true },
{ name:"Tamarind", category:"Staples", price:70, stock:90, image:"https://images.unsplash.com/photo-1625944230945-8a9f5b0c4b2a", description:"Imli", vendor:vendorId, approved:true },
{ name:"Dry Red Chilli", category:"Staples", price:120, stock:70, image:"https://images.unsplash.com/photo-1601004890684-dc9a8c1f0b3e", description:"Whole red chilli", vendor:vendorId, approved:true },
{ name:"Coriander Seeds", category:"Staples", price:85, stock:60, image:"https://images.unsplash.com/photo-1615484477778-68a44c7bdb43", description:"Dhaniya", vendor:vendorId, approved:true },
{ name:"Jeera", category:"Staples", price:140, stock:50, image:"https://images.unsplash.com/photo-1615484477778-947fd7d1e0a1", description:"Cumin seeds", vendor:vendorId, approved:true },
{ name:"Mustard Seeds", category:"Staples", price:60, stock:80, image:"https://images.unsplash.com/photo-1601315379732-3e7d2b0c4f21", description:"Rai", vendor:vendorId, approved:true },
{ name:"Black Pepper", category:"Staples", price:220, stock:40, image:"https://images.unsplash.com/photo-1615484477778-b7b4e9f92e6f", description:"Whole pepper", vendor:vendorId, approved:true },

/* ================= ATTA, RICE & DAL ================= */
{ name:"Aashirvaad Atta", category:"Atta, Rice & Dal", price:360, stock:100, image:"https://images.unsplash.com/photo-1626078436899-4b5a5a6f9a7a", description:"Whole wheat atta", vendor:vendorId, approved:true },
{ name:"Basmati Rice", category:"Atta, Rice & Dal", price:520, stock:80, image:"https://images.unsplash.com/photo-1586201375761-83865001e31b", description:"Premium basmati", vendor:vendorId, approved:true },
{ name:"Kolam Rice", category:"Atta, Rice & Dal", price:280, stock:90, image:"https://images.unsplash.com/photo-1604335399105-a0c585fd81a1", description:"Daily use rice", vendor:vendorId, approved:true },
{ name:"Toor Dal", category:"Atta, Rice & Dal", price:160, stock:70, image:"https://images.unsplash.com/photo-1615484477778-88c5e2e61c94", description:"Arhar dal", vendor:vendorId, approved:true },
{ name:"Moong Dal", category:"Atta, Rice & Dal", price:140, stock:65, image:"https://images.unsplash.com/photo-1625944230945-77e16df1d4b3", description:"Green gram", vendor:vendorId, approved:true },
{ name:"Masoor Dal", category:"Atta, Rice & Dal", price:120, stock:75, image:"https://images.unsplash.com/photo-1626193081932-77b42f20c4bb", description:"Red lentils", vendor:vendorId, approved:true },
{ name:"Chana Dal", category:"Atta, Rice & Dal", price:130, stock:70, image:"https://images.unsplash.com/photo-1625944230945-ff4f8e03e0c2", description:"Split Bengal gram", vendor:vendorId, approved:true },
{ name:"Urad Dal", category:"Atta, Rice & Dal", price:150, stock:60, image:"https://images.unsplash.com/photo-1625944230945-4d98b1b45b39", description:"Black gram", vendor:vendorId, approved:true },
{ name:"Rajma", category:"Atta, Rice & Dal", price:180, stock:50, image:"https://images.unsplash.com/photo-1625944230945-9f3b1a1f0c8d", description:"Kidney beans", vendor:vendorId, approved:true },
{ name:"Kabuli Chana", category:"Atta, Rice & Dal", price:140, stock:60, image:"https://images.unsplash.com/photo-1625944230945-7a6f9a4c9d32", description:"Chickpeas", vendor:vendorId, approved:true },
{ name:"Idli Rice", category:"Atta, Rice & Dal", price:90, stock:85, image:"https://images.unsplash.com/photo-1586201375761-777d5e4d71f3", description:"Rice for idli", vendor:vendorId, approved:true },
{ name:"Wheat Daliya", category:"Atta, Rice & Dal", price:60, stock:110, image:"https://images.unsplash.com/photo-1626193081932-5fcbcd1c6b1a", description:"Broken wheat", vendor:vendorId, approved:true },
{ name:"Bajra Atta", category:"Atta, Rice & Dal", price:75, stock:90, image:"https://images.unsplash.com/photo-1626078436899-2c7c69d8a8e7", description:"Pearl millet flour", vendor:vendorId, approved:true },
{ name:"Jowar Atta", category:"Atta, Rice & Dal", price:80, stock:85, image:"https://images.unsplash.com/photo-1626078436899-b44fd8a03c38", description:"Sorghum flour", vendor:vendorId, approved:true },
{ name:"Rice Flour", category:"Atta, Rice & Dal", price:55, stock:120, image:"https://images.unsplash.com/photo-1626193081932-9f8a4c8c6e9b", description:"Rice flour", vendor:vendorId, approved:true },

/* ================= EDIBLE OIL & GHEE ================= */
{ name:"Sunflower Oil 1L", category:"Edible Oil & Ghee", price:160, stock:120, image:"https://images.unsplash.com/photo-1604908177522-0a1c2b3d4e5f", description:"Refined sunflower oil", vendor:vendorId, approved:true },
{ name:"Mustard Oil 1L", category:"Edible Oil & Ghee", price:190, stock:90, image:"https://images.unsplash.com/photo-1625944230945-5b0f4a8e7c6d", description:"Pure mustard oil", vendor:vendorId, approved:true },
{ name:"Soyabean Oil 1L", category:"Edible Oil & Ghee", price:155, stock:100, image:"https://images.unsplash.com/photo-1604908177522-5f8b3d9c0a12", description:"Refined soyabean oil", vendor:vendorId, approved:true },
{ name:"Groundnut Oil 1L", category:"Edible Oil & Ghee", price:220, stock:80, image:"https://images.unsplash.com/photo-1626078436899-bb8b45d76e2c", description:"Peanut oil", vendor:vendorId, approved:true },
{ name:"Palm Oil 1L", category:"Edible Oil & Ghee", price:140, stock:110, image:"https://images.unsplash.com/photo-1625944230945-8c5a1b7f6e3d", description:"Palm oil", vendor:vendorId, approved:true },
{ name:"Rice Bran Oil 1L", category:"Edible Oil & Ghee", price:175, stock:90, image:"https://images.unsplash.com/photo-1604908177522-9d8f7b5c4a1e", description:"Healthy rice bran oil", vendor:vendorId, approved:true },
{ name:"Coconut Oil 500ml", category:"Edible Oil & Ghee", price:130, stock:70, image:"https://images.unsplash.com/photo-1615484477778-35e8b2c8b4a7", description:"Pure coconut oil", vendor:vendorId, approved:true },
{ name:"Desi Ghee 500g", category:"Edible Oil & Ghee", price:320, stock:50, image:"https://images.unsplash.com/photo-1625944230945-4f5a8d9b3c1e", description:"Cow ghee", vendor:vendorId, approved:true },
{ name:"Vanaspati 1kg", category:"Edible Oil & Ghee", price:165, stock:85, image:"https://images.unsplash.com/photo-1604908177522-c5e8d7a9b3f2", description:"Vegetable fat", vendor:vendorId, approved:true },
{ name:"Olive Oil 250ml", category:"Edible Oil & Ghee", price:240, stock:40, image:"https://images.unsplash.com/photo-1626078436899-6e3d7f4b8c2a", description:"Extra virgin olive oil", vendor:vendorId, approved:true },
{ name:"Til Oil", category:"Edible Oil & Ghee", price:210, stock:45, image:"https://images.unsplash.com/photo-1625944230945-99e4b0f2d1c6", description:"Sesame oil", vendor:vendorId, approved:true },
{ name:"Cottonseed Oil", category:"Edible Oil & Ghee", price:150, stock:60, image:"https://images.unsplash.com/photo-1604908177522-0b8e7c4d2a6f", description:"Cottonseed oil", vendor:vendorId, approved:true },
{ name:"Groundnut Ghee", category:"Edible Oil & Ghee", price:260, stock:35, image:"https://images.unsplash.com/photo-1625944230945-f8a3b9d5c1e4", description:"Vegetarian ghee", vendor:vendorId, approved:true },
{ name:"Blended Oil", category:"Edible Oil & Ghee", price:170, stock:95, image:"https://images.unsplash.com/photo-1604908177522-4e3d8b2c1f9a", description:"Mixed edible oil", vendor:vendorId, approved:true },
{ name:"Organic Ghee", category:"Edible Oil & Ghee", price:390, stock:25, image:"https://images.unsplash.com/photo-1625944230945-6b7a4d3f9c1e", description:"Organic cow ghee", vendor:vendorId, approved:true },

/* ================= PACKAGED FOOD ================= */
{ name:"Parle-G Biscuits", category:"Packaged Food", price:10, stock:300, image:"https://images.unsplash.com/photo-1589987607627-616cacb7b97c", description:"Glucose biscuits", vendor:vendorId, approved:true },
{ name:"Marie Gold", category:"Packaged Food", price:30, stock:200, image:"https://images.unsplash.com/photo-1604909053271-7a6c9b2e4f5d", description:"Marie biscuits", vendor:vendorId, approved:true },
{ name:"Good Day", category:"Packaged Food", price:35, stock:180, image:"https://images.unsplash.com/photo-1615484477778-5c9e4f3a7b2d", description:"Butter cookies", vendor:vendorId, approved:true },
{ name:"Maggi Noodles", category:"Packaged Food", price:14, stock:250, image:"https://images.unsplash.com/photo-1586201375761-83865001e31b", description:"Instant noodles", vendor:vendorId, approved:true },
{ name:"Yippee Noodles", category:"Packaged Food", price:15, stock:200, image:"https://images.unsplash.com/photo-1606755962773-b3f2a8c9e5d4", description:"Instant noodles", vendor:vendorId, approved:true },
{ name:"Lays Chips", category:"Packaged Food", price:20, stock:180, image:"https://images.unsplash.com/photo-1592928302636-70c3f8045c91", description:"Potato chips", vendor:vendorId, approved:true },
{ name:"Kurkure", category:"Packaged Food", price:20, stock:170, image:"https://images.unsplash.com/photo-1606755962773-8a5c2b9e4f6d", description:"Crunchy snacks", vendor:vendorId, approved:true },
{ name:"Haldiram Bhujia", category:"Packaged Food", price:85, stock:120, image:"https://images.unsplash.com/photo-1626193081932-bc3f9d7a5e8b", description:"Namkeen", vendor:vendorId, approved:true },
{ name:"Aloo Bhujia", category:"Packaged Food", price:75, stock:110, image:"https://images.unsplash.com/photo-1626193081932-7f3c5b9d4a8e", description:"Spicy snack", vendor:vendorId, approved:true },
{ name:"Cornflakes", category:"Packaged Food", price:140, stock:80, image:"https://images.unsplash.com/photo-1626078436899-9b4f3d7e2a8c", description:"Breakfast cereal", vendor:vendorId, approved:true },
{ name:"Oats", category:"Packaged Food", price:130, stock:90, image:"https://images.unsplash.com/photo-1626078436899-3e4c9b2a8f7d", description:"Healthy oats", vendor:vendorId, approved:true },
{ name:"Peanut Butter", category:"Packaged Food", price:180, stock:60, image:"https://images.unsplash.com/photo-1625944230945-9d5b8f3a2e1c", description:"Crunchy peanut butter", vendor:vendorId, approved:true },
{ name:"Jam", category:"Packaged Food", price:95, stock:85, image:"https://images.unsplash.com/photo-1580910051074-7c7b5c6a1d24", description:"Mixed fruit jam", vendor:vendorId, approved:true },
{ name:"Tomato Ketchup", category:"Packaged Food", price:90, stock:100, image:"https://images.unsplash.com/photo-1625944230945-b4c2e1f9d7a8", description:"Tomato sauce", vendor:vendorId, approved:true },
{ name:"Mayonnaise", category:"Packaged Food", price:110, stock:70, image:"https://images.unsplash.com/photo-1626078436899-1c5b8f3e4a7d", description:"Veg mayo", vendor:vendorId, approved:true },

/* ================= BEVERAGES ================= */
{ name:"Tea Powder", category:"Beverages", price:180, stock:120, image:"https://images.unsplash.com/photo-1509042239860-f550ce710b93", description:"Strong tea", vendor:vendorId, approved:true },
{ name:"Coffee Powder", category:"Beverages", price:220, stock:80, image:"https://images.unsplash.com/photo-1509042239860-2c5f7d8a9e4b", description:"Filter coffee", vendor:vendorId, approved:true },
{ name:"Instant Coffee", category:"Beverages", price:190, stock:70, image:"https://images.unsplash.com/photo-1511920170033-f8396924c348", description:"Instant coffee", vendor:vendorId, approved:true },
{ name:"Green Tea", category:"Beverages", price:160, stock:60, image:"https://images.unsplash.com/photo-1509042239860-6a7f8c5d9e4b", description:"Healthy green tea", vendor:vendorId, approved:true },
{ name:"Soft Drink", category:"Beverages", price:40, stock:150, image:"https://images.unsplash.com/photo-1592928302636-0c5b9d7f3a8e", description:"Carbonated drink", vendor:vendorId, approved:true },
{ name:"Fruit Juice", category:"Beverages", price:60, stock:140, image:"https://images.unsplash.com/photo-1571079889330-20b96d72d4c6", description:"Mixed fruit juice", vendor:vendorId, approved:true },
{ name:"Energy Drink", category:"Beverages", price:110, stock:90, image:"https://images.unsplash.com/photo-1626078436899-3d5f8a7c2e9b", description:"Energy booster", vendor:vendorId, approved:true },
{ name:"Cold Coffee", category:"Beverages", price:50, stock:130, image:"https://images.unsplash.com/photo-1511920170033-3c7b8d9e4a5f", description:"Chilled coffee", vendor:vendorId, approved:true },
{ name:"Milkshake", category:"Beverages", price:55, stock:120, image:"https://images.unsplash.com/photo-1577805947697-89e18249d767", description:"Flavored milkshake", vendor:vendorId, approved:true },
{ name:"Buttermilk", category:"Beverages", price:20, stock:160, image:"https://images.unsplash.com/photo-1589987607627-92a3b5f7d2c4", description:"Chaas", vendor:vendorId, approved:true },
{ name:"Lassi", category:"Beverages", price:30, stock:150, image:"https://images.unsplash.com/photo-1589987607627-4b9f8c6a3d1e", description:"Sweet lassi", vendor:vendorId, approved:true },
{ name:"Soda", category:"Beverages", price:20, stock:180, image:"https://images.unsplash.com/photo-1592928302636-7b8d9f3c5a4e", description:"Soda water", vendor:vendorId, approved:true },
{ name:"Glucose Drink", category:"Beverages", price:45, stock:130, image:"https://images.unsplash.com/photo-1626078436899-5b9e4a7c3d8f", description:"Instant energy", vendor:vendorId, approved:true },
{ name:"Herbal Tea", category:"Beverages", price:170, stock:55, image:"https://images.unsplash.com/photo-1509042239860-b7c5f8d4e9a3", description:"Herbal tea", vendor:vendorId, approved:true },
{ name:"Flavoured Water", category:"Beverages", price:35, stock:140, image:"https://images.unsplash.com/photo-1592928302636-9d8f7a5c4b3e", description:"Infused water", vendor:vendorId, approved:true },

/* ================= PERSONAL CARE ================= */
{ name:"Bath Soap", category:"Personal Care", price:35, stock:200, image:"https://images.unsplash.com/photo-1604908177522-4725c3a4c1de", description:"Bathing soap", vendor:vendorId, approved:true },
{ name:"Shampoo", category:"Personal Care", price:120, stock:120, image:"https://images.unsplash.com/photo-1604908177522-bd8c7f1a0d4e", description:"Hair shampoo", vendor:vendorId, approved:true },
{ name:"Conditioner", category:"Personal Care", price:130, stock:100, image:"https://images.unsplash.com/photo-1604908177522-8f4c3b2a9e7d", description:"Hair conditioner", vendor:vendorId, approved:true },
{ name:"Toothpaste", category:"Personal Care", price:85, stock:180, image:"https://images.unsplash.com/photo-1604908177522-3a9d7c5b8e4f", description:"Dental care", vendor:vendorId, approved:true },
{ name:"Toothbrush", category:"Personal Care", price:45, stock:160, image:"https://images.unsplash.com/photo-1589987607627-616cacb7b97c", description:"Soft toothbrush", vendor:vendorId, approved:true },
{ name:"Face Wash", category:"Personal Care", price:140, stock:90, image:"https://images.unsplash.com/photo-1604908177522-6e7b5a3c9d4f", description:"Face cleanser", vendor:vendorId, approved:true },
{ name:"Handwash", category:"Personal Care", price:65, stock:140, image:"https://images.unsplash.com/photo-1589987607627-92a3b5f7d2c4", description:"Liquid handwash", vendor:vendorId, approved:true },
{ name:"Body Lotion", category:"Personal Care", price:180, stock:70, image:"https://images.unsplash.com/photo-1604908177522-9c4b5f7a3d8e", description:"Skin lotion", vendor:vendorId, approved:true },
{ name:"Hair Oil", category:"Personal Care", price:110, stock:110, image:"https://images.unsplash.com/photo-1625944230945-1b7dd3c2c6a4", description:"Hair nourishment oil", vendor:vendorId, approved:true },
{ name:"Face Cream", category:"Personal Care", price:190, stock:60, image:"https://images.unsplash.com/photo-1604908177522-4d5a9b3f8c7e", description:"Moisturizing cream", vendor:vendorId, approved:true },
{ name:"Sanitary Pads", category:"Personal Care", price:120, stock:100, image:"https://images.unsplash.com/photo-1604908177522-1f9b8c5a3e7d", description:"Hygiene pads", vendor:vendorId, approved:true },
{ name:"Shaving Cream", category:"Personal Care", price:95, stock:85, image:"https://images.unsplash.com/photo-1604908177522-5a3f7d8b9e4c", description:"Smooth shaving", vendor:vendorId, approved:true },
{ name:"Razor", category:"Personal Care", price:45, stock:130, image:"https://images.unsplash.com/photo-1589987607627-4b9f8c6a3d1e", description:"Disposable razor", vendor:vendorId, approved:true },
{ name:"Talc Powder", category:"Personal Care", price:90, stock:90, image:"https://images.unsplash.com/photo-1604908177522-8d7c5a3b9e4f", description:"Cooling talc", vendor:vendorId, approved:true },
{ name:"Hand Cream", category:"Personal Care", price:125, stock:70, image:"https://images.unsplash.com/photo-1604908177522-b5f9c8a3e4d7", description:"Moisturizing hand cream", vendor:vendorId, approved:true },

/* ================= HOUSEHOLD & CLEANING ================= */
{ name:"Washing Powder", category:"Household & Cleaning", price:95, stock:150, image:"https://images.unsplash.com/photo-1589987607627-616cacb7b97c", description:"Laundry detergent", vendor:vendorId, approved:true },
{ name:"Dishwash Liquid", category:"Household & Cleaning", price:85, stock:140, image:"https://images.unsplash.com/photo-1604908177522-4725c3a4c1de", description:"Dish cleaning liquid", vendor:vendorId, approved:true },
{ name:"Dishwash Bar", category:"Household & Cleaning", price:30, stock:180, image:"https://images.unsplash.com/photo-1589987607627-92a3b5f7d2c4", description:"Utensil cleaner", vendor:vendorId, approved:true },
{ name:"Floor Cleaner", category:"Household & Cleaning", price:110, stock:100, image:"https://images.unsplash.com/photo-1604908177522-bd8c7f1a0d4e", description:"Floor disinfectant", vendor:vendorId, approved:true },
{ name:"Phenyl", category:"Household & Cleaning", price:75, stock:120, image:"https://images.unsplash.com/photo-1604908177522-3a9d7c5b8e4f", description:"Surface cleaner", vendor:vendorId, approved:true },
{ name:"Room Freshener", category:"Household & Cleaning", price:90, stock:90, image:"https://images.unsplash.com/photo-1604908177522-6e7b5a3c9d4f", description:"Air freshener", vendor:vendorId, approved:true },
{ name:"Mosquito Repellent", category:"Household & Cleaning", price:85, stock:110, image:"https://images.unsplash.com/photo-1604908177522-9c4b5f7a3d8e", description:"Mosquito protection", vendor:vendorId, approved:true },
{ name:"Garbage Bags", category:"Household & Cleaning", price:60, stock:130, image:"https://images.unsplash.com/photo-1604908177522-4d5a9b3f8c7e", description:"Waste disposal bags", vendor:vendorId, approved:true },
{ name:"Scrubber", category:"Household & Cleaning", price:35, stock:160, image:"https://images.unsplash.com/photo-1589987607627-4b9f8c6a3d1e", description:"Cleaning scrubber", vendor:vendorId, approved:true },
{ name:"Cleaning Cloth", category:"Household & Cleaning", price:40, stock:150, image:"https://images.unsplash.com/photo-1589987607627-616cacb7b97c", description:"Multipurpose cloth", vendor:vendorId, approved:true },
{ name:"Glass Cleaner", category:"Household & Cleaning", price:85, stock:95, image:"https://images.unsplash.com/photo-1604908177522-1f9b8c5a3e7d", description:"Glass cleaning spray", vendor:vendorId, approved:true },
{ name:"Toilet Cleaner", category:"Household & Cleaning", price:110, stock:100, image:"https://images.unsplash.com/photo-1604908177522-5a3f7d8b9e4c", description:"Toilet hygiene", vendor:vendorId, approved:true },
{ name:"Hand Gloves", category:"Household & Cleaning", price:60, stock:140, image:"https://images.unsplash.com/photo-1589987607627-92a3b5f7d2c4", description:"Cleaning gloves", vendor:vendorId, approved:true },
{ name:"Detergent Bar", category:"Household & Cleaning", price:25, stock:190, image:"https://images.unsplash.com/photo-1589987607627-4b9f8c6a3d1e", description:"Laundry bar", vendor:vendorId, approved:true },
{ name:"Insect Spray", category:"Household & Cleaning", price:130, stock:75, image:"https://images.unsplash.com/photo-1604908177522-8d7c5a3b9e4f", description:"Insect killer spray", vendor:vendorId, approved:true },

];

async function seed() {
  try {
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log("✅ Kirana products seeded:", products.length);
    process.exit();
  } catch (err) {
    console.error("❌ Seeding failed", err);
    process.exit(1);
  }
}

seed();
