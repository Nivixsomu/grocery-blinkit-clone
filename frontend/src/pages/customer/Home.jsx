import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API, { addToCart } from "../../utils/api";
import { toast } from "react-hot-toast";
import ProductCard from "../../components/ProductCard";
import CartBar from "../../components/CartBar";
import { FiSearch, FiShoppingCart } from "react-icons/fi";

/* ===== KIRANA STORE CATEGORIES ===== */
const CATEGORIES = [
  "All",
  "Staples",
  "Atta, Rice & Dal",
  "Edible Oil & Ghee",
  "Packaged Food",
  "Beverages",
  "Personal Care",
  "Household & Cleaning",
];

export default function CustomerHome() {
  const navigate = useNavigate(); // ✅ FIX
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  /* ===== FETCH PRODUCTS ===== */
  const fetchProducts = async () => {
    try {
      const res = await API.get("/products/public/all");
      setProducts(res.data);
    } catch {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  /* ===== FETCH CART ===== */
  const fetchCart = async () => {
    try {
      const res = await API.get("/cart");
      setCart(res.data);
    } catch {}
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  /* ===== ADD TO CART ===== */
  const handleAddToCart = async (productId) => {
    try {
      await addToCart(productId);
      toast.success("Added to cart");
      fetchCart();
    } catch {
      toast.error("Could not add to cart");
    }
  };

  /* ===== FILTER LOGIC ===== */
  const filteredProducts = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === "All" || p.category === category;
    return matchSearch && matchCategory;
  });

  const totalItems =
    cart?.items?.reduce((sum, i) => sum + i.quantity, 0) || 0;

  return (
    <div className="pb-28 bg-gray-100 min-h-screen">

      {/* ===== HEADER ===== */}
      <div className="sticky top-0 z-40 backdrop-blur bg-white/90 shadow p-4">
        <div className="flex justify-between items-center mb-3">
          <h1 className="text-2xl font-bold">🏪 Kirana Store</h1>

          {/* TOP RIGHT BUTTONS */}
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/customer/orders")} // ✅ FIX
              className="bg-gray-800 text-white px-4 py-2 rounded hover:scale-105 active:scale-95 transition"
            >
              My Orders
            </button>

            <button
              onClick={() => navigate("/customer/cart")} // ✅ FIX
              className="relative bg-green-600 text-white px-4 py-2 rounded flex items-center gap-1 hover:scale-105 active:scale-95 transition"
            >
              <FiShoppingCart />
              Cart
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-xs text-white rounded-full px-2">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* SEARCH BAR */}
        <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
          <FiSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Search kirana items..."
            className="bg-transparent w-full ml-2 outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* ===== CATEGORY PILLS ===== */}
      <div className="flex gap-3 overflow-x-auto px-4 py-4 bg-white">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm border whitespace-nowrap transition ${
              category === cat
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ===== PRODUCTS ===== */}
      <div className="p-4">
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="h-48 bg-gray-200 rounded-xl animate-pulse"
              />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">
            No products found
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filteredProducts.map((item) => (
              <ProductCard
                key={item._id}
                product={item}
                onAdd={handleAddToCart}
              />
            ))}
          </div>
        )}
      </div>

      {/* ===== STICKY CART BAR ===== */}
      {totalItems > 0 && (
        <CartBar total={cart.totalAmount} totalItems={totalItems} />
      )}
    </div>
  );
}
