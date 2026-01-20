import { useEffect, useState } from "react";
import API from "../../utils/api";
import { toast } from "react-hot-toast";

export default function PendingProducts() {
  const [products, setProducts] = useState([]);

  // Fetch all products where approved = false
  const fetchPending = async () => {
    try {
      const res = await API.get("/products/all"); 
      const pending = res.data.filter((p) => p.approved === false);
      setProducts(pending);
    } catch (err) {
      console.log(err);
      toast.error("Unable to load pending products");
    }
  };

  // Approve a product
  const approveProduct = async (id) => {
    try {
      await API.put(`/products/approve/${id}`);
      toast.success("Product approved!");
      fetchPending();
    } catch (err) {
      console.log(err);
      toast.error("Error approving product");
    }
  };

  // Reject / Delete a product
  const rejectProduct = async (id) => {
    try {
      await API.delete(`/products/${id}`);
      toast.success("Product rejected & deleted");
      fetchPending();
    } catch (err) {
      console.log(err);
      toast.error("Error rejecting product");
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  return (
    <div className="ml-64 p-10 bg-gray-100 min-h-screen">

      <h1 className="text-3xl font-bold text-purple-700 mb-6">
        Pending Products
      </h1>

      {products.length === 0 ? (
        <p className="text-gray-600 text-lg">No pending products!</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {products.map((p) => (
            <div
              key={p._id}
              className="bg-white shadow-lg rounded-xl p-6 border border-gray-200"
            >
              <div className="flex gap-6">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-32 h-32 rounded-lg object-cover"
                />

                <div>
                  <h2 className="text-xl font-bold">{p.name}</h2>
                  <p className="text-gray-600">{p.category}</p>
                  <p className="text-gray-600 mb-2">{p.description}</p>
                  <p className="font-semibold text-green-700">
                    ₹ {p.price} — Stock: {p.stock}
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-6">

                <button
                  onClick={() => approveProduct(p._id)}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Approve
                </button>

                <button
                  onClick={() => rejectProduct(p._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Reject
                </button>

              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  );
}
