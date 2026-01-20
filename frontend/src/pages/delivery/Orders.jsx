import { useEffect, useState } from "react";
import API from "../../utils/api";
import { toast } from "react-hot-toast";

export default function DeliveryOrders() {
  const [orders, setOrders] = useState([]);
  const [otpMap, setOtpMap] = useState({});

  // Fetch assigned orders
  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders/delivery/my-orders");
      setOrders(res.data);
    } catch (error) {
      toast.error("Failed to load assigned orders");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Update status (picked / out_for_delivery)
  const updateStatus = async (orderId, status) => {
    try {
      await API.put(`/orders/delivery/update-status/${orderId}`, {
        status
      });
      toast.success(`Order marked as ${status}`);
      fetchOrders();
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  // Mark Delivered (OTP required)
  const markDelivered = async (orderId) => {
    const otp = otpMap[orderId];

    if (!otp) {
      toast.error("Please enter OTP");
      return;
    }

    try {
      await API.put(`/orders/delivery/update-status/${orderId}`, {
        status: "delivered",
        otp
      });
      toast.success("Order delivered successfully");
      fetchOrders();
    } catch (err) {
      toast.error("Invalid OTP");
    }
  };

  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        No assigned orders yet
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-green-700">
        🚚 My Deliveries
      </h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-xl shadow p-6 border"
          >
            <h2 className="font-bold text-lg mb-2">
              Order #{order._id.slice(-6)}
            </h2>

            <p className="text-sm text-gray-600 mb-1">
              📍 {order.address.street}, {order.address.city} -{" "}
              {order.address.pincode}
            </p>

            <p className="text-sm text-gray-600 mb-3">
              📞 {order.address.phone}
            </p>

            <p className="font-semibold mb-2">
              Total: ₹{order.totalAmount}
            </p>

            <p className="mb-4">
              Status:{" "}
              <span className="font-bold text-blue-600">
                {order.orderStatus}
              </span>
            </p>

            {/* Order Items */}
            <div className="bg-gray-100 rounded p-3 mb-4">
              <p className="font-semibold mb-2">Items:</p>
              {order.items.map((item, idx) => (
                <p key={idx}>
                  {item.name} × {item.quantity}
                </p>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row gap-3">

              {order.orderStatus === "confirmed" && (
                <button
                  onClick={() => updateStatus(order._id, "picked")}
                  className="bg-yellow-500 text-white px-4 py-2 rounded"
                >
                  Picked
                </button>
              )}

              {order.orderStatus === "picked" && (
                <button
                  onClick={() => updateStatus(order._id, "out_for_delivery")}
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Out for Delivery
                </button>
              )}

              {order.orderStatus === "out_for_delivery" && (
                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    className="border p-2 rounded w-32"
                    onChange={(e) =>
                      setOtpMap({
                        ...otpMap,
                        [order._id]: e.target.value
                      })
                    }
                  />
                  <button
                    onClick={() => markDelivered(order._id)}
                    className="bg-green-600 text-white px-4 py-2 rounded"
                  >
                    Deliver
                  </button>
                </div>
              )}

              {order.orderStatus === "delivered" && (
                <span className="text-green-700 font-bold">
                  ✅ Delivered
                </span>
              )}

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

