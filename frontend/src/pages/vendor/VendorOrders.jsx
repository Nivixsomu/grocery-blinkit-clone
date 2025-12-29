import { useEffect, useState } from "react";
import API from "../../helpers/API";

export default function VendorOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    API.get("/orders/vendor").then(res => setOrders(res.data));
  }, []);

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-green-700 mb-6">Orders</h1>

      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        <div className="space-y-6">
          {orders.map(o => (
            <div key={o._id} className="bg-white p-6 rounded-xl shadow">
              <p className="font-bold">Order ID: {o._id.slice(0, 6)}</p>
              <p>Status: {o.orderStatus}</p>

              <div className="mt-2">
                {o.items.map((i, idx) => (
                  <p key={idx}>
                    {i.name} × {i.quantity} — ₹{i.price}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
