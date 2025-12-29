import { useEffect, useState } from "react";
import API from "../../helpers/API";
import { toast } from "react-hot-toast";

export default function Customers() {
  const [customers, setCustomers] = useState([]);

  const fetchCustomers = async () => {
    try {
      const res = await API.get("/admin/customers");
      setCustomers(res.data);
    } catch (err) {
      toast.error("Unable to load customers");
    }
  };

  const toggleBlock = async (id) => {
    try {
      const res = await API.put(`/admin/customer/block/${id}`);
      toast.success(res.data.message);
      fetchCustomers();
    } catch (err) {
      toast.error("Error updating customer status");
    }
  };

  const deleteCustomer = async (id) => {
    try {
      await API.delete(`/admin/customer/${id}`);
      toast.success("Customer deleted");
      fetchCustomers();
    } catch (err) {
      toast.error("Error deleting customer");
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div className="ml-64 p-10 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-purple-700 mb-6">Customers</h1>

      {customers.length === 0 ? (
        <p>No customers found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {customers.map((c) => (
            <div
              key={c._id}
              className="bg-white shadow-lg p-6 rounded-xl border border-gray-200"
            >
              <h2 className="text-xl font-bold">{c.name}</h2>
              <p className="text-gray-600">📧 {c.email}</p>
              <p className="text-gray-600">📞 {c.phone}</p>

              <p className="mt-2">
                <span
                  className={`px-3 py-1 rounded text-white ${
                    c.blocked ? "bg-red-600" : "bg-green-600"
                  }`}
                >
                  {c.blocked ? "Blocked" : "Active"}
                </span>
              </p>

              <div className="flex gap-4 mt-6">

                <button
                  onClick={() => toggleBlock(c._id)}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  {c.blocked ? "Unblock" : "Block"}
                </button>

                <button
                  onClick={() => deleteCustomer(c._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Delete
                </button>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
