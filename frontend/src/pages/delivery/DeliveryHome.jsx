import { useEffect, useState } from "react";
import API from "../../utils/api";
import { toast } from "react-hot-toast";

export default function DeliveryHome() {
  const [orders, setOrders] = useState([]);
  const [otpMap, setOtpMap] = useState({}); // store OTP per order

  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders/delivery/my-orders");
      setOrders(res.data);
    } catch (error) {
      console.log("Error loading delivery orders:", error.response?.data);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (orderId, status) => {
    try {
      const payload = { status };

      // attach OTP only when delivering
      if (status === "delivered") {
        payload.otp = otpMap[orderId];
      }

      await API.put(`/orders/delivery/update-status/${orderId}`, payload);
      toast.success("Status updated");
      fetchOrders();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed");
    }
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-green-700">
        🚚 Assigned Deliveries
      </h1>

      {orders.length === 0 ? (
        <p>No orders assigned yet.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="bg-white p-4 rounded-xl shadow mb-4"
          >
            <h2 className="font-bold">
              Order #{order._id.slice(-6).toUpperCase()}
            </h2>

            <p className="text-gray-700 mt-2">
              <strong>Address:</strong>{" "}
              {order.address.street}, {order.address.city} -{" "}
              {order.address.pincode}
            </p>

            <p className="text-gray-700">
              <strong>Phone:</strong> {order.address.phone}
            </p>

            <p className="mt-2">
              <strong>Status:</strong>{" "}
              <span className="font-semibold text-blue-600">
                {order.orderStatus}
              </span>
            </p>

            <h3 className="font-semibold mt-3">Items:</h3>
            <ul className="list-disc ml-5 mb-3">
              {order.items.map((i) => (
                <li key={i._id}>
                  {i.name} × {i.quantity}
                </li>
              ))}
            </ul>

            {/* ===== ACTION BUTTONS (FLOW CONTROLLED) ===== */}

            {order.orderStatus === "confirmed" && (
              <button
                onClick={() => updateStatus(order._id, "picked")}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Pick Order
              </button>
            )}

            {order.orderStatus === "picked" && (
              <button
                onClick={() => updateStatus(order._id, "out_for_delivery")}
                className="px-4 py-2 bg-yellow-500 text-white rounded"
              >
                Out for Delivery
              </button>
            )}

            {order.orderStatus === "out_for_delivery" && (
              <div className="mt-3 space-y-2">
                <input
                  type="text"
                  placeholder="Enter 4-digit OTP"
                  maxLength={4}
                  className="border p-2 rounded w-full"
                  value={otpMap[order._id] || ""}
                  onChange={(e) =>
                    setOtpMap({
                      ...otpMap,
                      [order._id]: e.target.value,
                    })
                  }
                />

                <button
                  onClick={() => updateStatus(order._id, "delivered")}
                  className="px-4 py-2 bg-green-600 text-white rounded w-full"
                >
                  Confirm Delivery
                </button>
              </div>
            )}

            {order.orderStatus === "delivered" && (
              <p className="text-green-600 font-bold mt-3">
                ✅ Delivered Successfully
              </p>
            )}
          </div>
        ))
      )}
    </div>
  );
}
