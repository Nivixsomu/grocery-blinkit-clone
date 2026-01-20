import { useEffect, useState } from "react";
import API from "../../utils/api";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function MyProducts() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products/vendor");
      setProducts(res.data);
    } catch {
      toast.error("Failed to load products");
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await API.delete(`/products/${id}`);
      toast.success("Product deleted");
      fetchProducts();
    } catch {
      toast.error("Delete failed");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-green-700 mb-6">My Products</h1>

      <input
        className="border p-2 mb-6 w-full rounded"
        placeholder="Search product..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filtered.length === 0 ? (
        <p>No products found</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {filtered.map((p) => (
            <div key={p._id} className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-xl font-bold">{p.name}</h2>
              <p>₹{p.price} | Stock: {p.stock}</p>

              <span className={`inline-block mt-2 px-3 py-1 text-white rounded 
                ${p.approved ? "bg-green-600" : "bg-yellow-500"}`}>
                {p.approved ? "Approved" : "Pending"}
              </span>

              <div className="flex gap-4 mt-4">
                <Link
                  to={`/vendor/edit/${p._id}`}
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Edit
                </Link>

                <button
                  onClick={() => deleteProduct(p._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded"
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
