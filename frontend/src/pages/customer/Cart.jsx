import { useEffect, useState } from "react";
import API from "../../utils/api";
import CartBar from "../../components/CartBar";
import { toast } from "react-hot-toast";
import { FiPlus, FiMinus } from "react-icons/fi";

export default function Cart() {
  const [cart, setCart] = useState(null);

  const fetchCart = async () => {
    try {
      const res = await API.get("/cart");
      setCart(res.data);
    } catch {
      toast.error("Failed to load cart");
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // ✅ FILTER INVALID PRODUCTS (IMPORTANT)
  const validItems =
    cart?.items?.filter((item) => item.product !== null) || [];

  const updateQty = async (productId, change, currentQty) => {
    if (currentQty === 1 && change === -1) return;

    try {
      await API.post("/cart/add", {
        productId,
        quantity: change,
      });
      fetchCart();
    } catch {
      toast.error("Failed to update cart");
    }
  };

  if (!cart || validItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-500">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
          className="w-40 mb-4"
          alt="Empty cart"
        />
        <h2 className="text-xl font-semibold">Your cart is empty</h2>
        <p>Add products to continue</p>
      </div>
    );
  }

  const totalItems = validItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-100 pb-28">
      <h1 className="text-2xl font-bold p-4">My Cart</h1>

      <div className="space-y-4 px-4">
        {validItems.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-xl p-4 shadow flex items-center gap-4"
          >
            <img
              src={item.product.image}
              alt={item.product.name}
              className="w-20 h-20 object-cover rounded"
            />

            <div className="flex-1">
              <h3 className="font-semibold">{item.product.name}</h3>
              <p className="text-sm text-gray-500">
                ₹{item.priceAtPurchase}
              </p>
              <p className="font-bold text-green-600">
                ₹{item.priceAtPurchase * item.quantity}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                disabled={item.quantity === 1}
                onClick={() =>
                  updateQty(item.product._id, -1, item.quantity)
                }
                className={`p-2 rounded ${
                  item.quantity === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                <FiMinus />
              </button>

              <span className="font-bold px-2">
                {item.quantity}
              </span>

              <button
                onClick={() =>
                  updateQty(item.product._id, 1, item.quantity)
                }
                className="p-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                <FiPlus />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ PASS SAFE DATA */}
      <CartBar total={cart.totalAmount} totalItems={totalItems} />
    </div>
  );
}
