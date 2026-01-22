import { useEffect, useState } from "react";
import API from "../../utils/api";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [newAddress, setNewAddress] = useState({
    street: "",
    city: "",
    pincode: "",
    phone: "",
    label: "",
  });

  const fetchCart = async () => {
    try {
      const res = await API.get("/cart");
      setCart(res.data);
    } catch {
      toast.error("Failed to load cart");
    }
  };

  const fetchAddresses = async () => {
    const res = await API.get("/address");
    setAddresses(res.data);
  };

  useEffect(() => {
    fetchCart();
    fetchAddresses();
  }, []);

  // ✅ FILTER INVALID PRODUCTS
  const validItems =
    cart?.items?.filter((item) => item.product !== null) || [];

  const addAddress = async () => {
    try {
      const res = await API.post("/address/add", newAddress);
      toast.success("Address added!");
      setSelectedAddress(res.data._id);
      fetchAddresses();
    } catch {
      toast.error("Error adding address");
    }
  };

  const placeOrder = async () => {
    if (!selectedAddress) {
      toast.error("Please select an address");
      return;
    }

    try {
      await API.post("/orders/place", {
        addressId: selectedAddress,
      });
      toast.success("Order placed successfully!");
      navigate("/customer/success");
    } catch {
      toast.error("❌ Sorry, we do not deliver to this area yet");
    }
  };

  const payWithStripe = async () => {
    if (!selectedAddress) {
      toast.error("Please select an address");
      return;
    }

    try {
      const orderRes = await API.post("/orders/place", {
        addressId: selectedAddress,
      });

      const stripeRes = await API.post("/stripe/create-session", {
        orderId: orderRes.data.order._id,
      });

      window.location.href = stripeRes.data.url;
    } catch {
      toast.error("Stripe payment failed");
    }
  };

  if (!cart) return <p className="p-4">Loading checkout...</p>;

  if (validItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-500">
        <h2 className="text-xl font-semibold">Your cart is empty</h2>
        <p>Please add products again</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      {/* ORDER SUMMARY */}
      <div className="mb-6 border p-4 rounded bg-white">
        <h2 className="text-lg font-semibold mb-2">Order Summary</h2>

        {validItems.map((item) => (
          <div key={item._id} className="flex justify-between">
            <span>
              {item.product.name} × {item.quantity}
            </span>
            <span>₹{item.priceAtPurchase * item.quantity}</span>
          </div>
        ))}

        <hr className="my-2" />
        <h2 className="font-bold text-xl">
          Total: ₹{cart.totalAmount}
        </h2>
      </div>

      {/* ADDRESS SELECTION */}
      <h2 className="text-lg font-bold mb-2">Choose Delivery Address</h2>

      {addresses.map((addr) => (
        <label key={addr._id} className="flex items-center mb-2">
          <input
            type="radio"
            className="mr-2"
            checked={selectedAddress === addr._id}
            onChange={() => setSelectedAddress(addr._id)}
          />
          <div>
            {addr.label}: {addr.street}, {addr.city} - {addr.pincode}
          </div>
        </label>
      ))}

      {/* ADD ADDRESS */}
      <h2 className="text-lg font-bold mt-4">Add New Address</h2>

      <div className="grid gap-2 mt-2">
        {["street", "city", "pincode", "phone", "label"].map((field) => (
          <input
            key={field}
            className="border p-2 rounded"
            placeholder={field}
            value={newAddress[field]}
            onChange={(e) =>
              setNewAddress({ ...newAddress, [field]: e.target.value })
            }
          />
        ))}

        <button
          className="bg-blue-600 text-white py-2 rounded"
          onClick={addAddress}
        >
          Add Address
        </button>
      </div>

      {/* PAYMENTS */}
      <button
        className="w-full mt-6 bg-gray-500 text-white py-3 rounded"
        onClick={placeOrder}
      >
        Place Order (Cash on Delivery)
      </button>

      <button
        className="w-full mt-4 bg-green-600 text-white py-3 rounded"
        onClick={payWithStripe}
      >
        Pay with Card (Stripe)
      </button>
    </div>
  );
}
