import { useEffect, useState } from "react";
import API from "../../helpers/API";
import { toast } from "react-hot-toast";

export default function DeliveryAgents() {
  const [agents, setAgents] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });

  const fetchAgents = async () => {
    try {
      const res = await API.get("/admin/delivery-agents");
      setAgents(res.data);
    } catch (err) {
      toast.error("Unable to load delivery agents");
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await API.post("/admin/delivery-agents", form);
      toast.success("Delivery agent added");
      setForm({ name: "", email: "", phone: "", password: "" });
      fetchAgents();
    } catch (err) {
      toast.error("Error adding agent");
    }
  };

  const toggleBlock = async (id) => {
    try {
      const res = await API.put(`/admin/delivery-agents/block/${id}`);
      toast.success(res.data.message);
      fetchAgents();
    } catch (err) {
      toast.error("Couldn't update status");
    }
  };

  const deleteAgent = async (id) => {
    try {
      await API.delete(`/admin/delivery-agents/${id}`);
      toast.success("Agent removed");
      fetchAgents();
    } catch (err) {
      toast.error("Error deleting agent");
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  return (
    <div className="ml-64 p-10 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-purple-700 mb-6">Delivery Agents</h1>

      {/* Add Agent Form */}
      <form onSubmit={handleAdd} className="bg-white p-6 rounded-xl shadow-md mb-6">
        <h2 className="text-xl font-bold mb-4">Add New Delivery Agent</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
          <input className="border p-2 rounded" placeholder="Name"
            value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />

          <input className="border p-2 rounded" placeholder="Email"
            value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />

          <input className="border p-2 rounded" placeholder="Phone"
            value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />

          <input className="border p-2 rounded" placeholder="Password" type="password"
            value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />

        </div>

        <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Add Agent
        </button>
      </form>

      {/* Agents List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {agents.map((a) => (
          <div key={a._id} className="bg-white shadow-md rounded-xl p-6 border">
            <h2 className="text-xl font-bold">{a.name}</h2>
            <p className="text-gray-600">{a.email}</p>
            <p className="text-gray-600">{a.phone}</p>

            <p className="mt-2">
              Status:
              <span className={`ml-2 px-3 py-1 rounded text-white ${a.blocked ? "bg-red-600" : "bg-green-600"}`}>
                {a.blocked ? "Blocked" : "Active"}
              </span>
            </p>

            <div className="flex gap-4 mt-4">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded"
                onClick={() => toggleBlock(a._id)}
              >
                {a.blocked ? "Unblock" : "Block"}
              </button>

              <button
                className="bg-red-600 text-white px-4 py-2 rounded"
                onClick={() => deleteAgent(a._id)}
              >
                Delete
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
