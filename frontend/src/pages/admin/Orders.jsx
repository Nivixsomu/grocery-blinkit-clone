import { useEffect, useState } from "react";
import API from "../../helpers/API";
import { toast } from "react-hot-toast";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [agents, setAgents] = useState([]);

  // Fetch all orders
  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders/all");
      setOrders(res.data);
    } catch (err) {
      toast.error("Unable to load orders");
    }
  };

  // Fetch delivery agents
  const fetchAgents = async () => {
  try {
    const res = await API.get("/admin/delivery-agents");
    setAgents(res.data);
  } catch (err) {
    toast.error("Unable to load delivery agents");
  }
};


  // Assign delivery agent
  const assignDelivery = async (orderId, agentId) => {
    try {
      await API.put(`/orders/assign-delivery/${orderId}`, {
  deliveryAgentId: agentId,
});

      toast.success("Delivery agent assigned");
      fetchOrders();
    } catch (err) {
      toast.error("Failed to assign agent");
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchAgents();
  }, []);

  return (
    <div className="ml-64 p-10 bg-gray-100 min-h-screen">

      <h1 className="text-3xl font-bold text-purple-700 mb-6">All Orders</h1>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-6">

          {orders.map((o) => (
            <div
              key={o._id}
              className="bg-white shadow-lg rounded-xl p-6 border border-gray-200"
            >
              <h2 className="text-xl font-bold">
                Order #{o._id.substring(0, 6)}
              </h2>

              <p className="text-gray-600 mb-2">
                Customer: {o.address?.label} ({o.address?.phone})
              </p>

              <p className="font-semibold text-green-700 mb-2">
                Total: ₹{o.totalAmount}
              </p>

              <p className="text-gray-700 mb-4">
                Status:{" "}
                <span className="font-bold text-blue-600">{o.orderStatus}</span>
              </p>

              {/* Order Items */}
              <div className="bg-gray-100 rounded p-3 mb-4">
                <p className="font-semibold mb-2">Items:</p>
                {o.items.map((it, index) => (
                  <p key={index}>
                    {it.name} x {it.quantity} — ₹{it.price}
                  </p>
                ))}
              </div>

              {/* Delivery Agent Assign */}
              <div className="flex items-center gap-4">
                <select
                  className="border p-2 rounded"
                  onChange={(e) => assignDelivery(o._id, e.target.value)}
                  defaultValue=""
                >
                  <option value="" disabled>Select Delivery Agent</option>

                  {agents.map((a) => (
                    <option key={a._id} value={a._id}>
                      {a.name} ({a.email})
                    </option>
                  ))}
                </select>
              </div>

            </div>
          ))}

        </div>
      )}
    </div>
  );
}
