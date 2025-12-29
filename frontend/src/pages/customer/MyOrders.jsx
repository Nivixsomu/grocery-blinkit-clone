import { useEffect, useState } from "react";
import API from "../../utils/api";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders/my-orders");
      setOrders(res.data);
    } catch (error) {
      console.log("Error loading orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (!orders.length) {
    return (
      <div className="p-4 text-center">
        <h2 className="text-xl font-semibold">No orders found.</h2>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="border p-4 rounded shadow-sm bg-white"
          >
            <h2 className="font-bold text-lg">
              Order ID: {order._id.slice(-6).toUpperCase()}
            </h2>

            <p className="text-gray-600">Status: {order.orderStatus}</p>
            <p className="text-gray-600">Payment: {order.paymentStatus}</p>
            <p className="text-gray-600">
              Placed On: {new Date(order.createdAt).toLocaleString()}
            </p>

            <h3 className="font-semibold mt-3">Items:</h3>
            <ul className="list-disc ml-5">
              {order.items.map((item) => (
                <li key={item.product}>
                  {item.name} × {item.quantity} — ₹{item.price}
                </li>
              ))}
            </ul>

            <h3 className="font-bold text-xl mt-3">
              Total: ₹{order.totalAmount}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}
