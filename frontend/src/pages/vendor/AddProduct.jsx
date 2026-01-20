import { useState } from "react";
import API from "../../utils/api";
import { toast } from "react-hot-toast";

export default function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    category: "Vegetables",
    image: "",
    description: ""
  });

  const submit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.price || !form.stock) {
      toast.error("Fill all required fields");
      return;
    }

    try {
      await API.post("/products/add", form);
      toast.success("Product sent for approval");
      setForm({
        name: "", price: "", stock: "",
        category: "Vegetables", image: "", description: ""
      });
    } catch {
      toast.error("Error adding product");
    }
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-green-700 mb-6">Add Product</h1>

      <form onSubmit={submit} className="bg-white p-6 rounded-xl shadow max-w-xl">

        <input className="border p-2 w-full mb-3"
          placeholder="Product Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />

        <input className="border p-2 w-full mb-3"
          placeholder="Price"
          type="number"
          value={form.price}
          onChange={e => setForm({ ...form, price: e.target.value })}
        />

        <input className="border p-2 w-full mb-3"
          placeholder="Stock"
          type="number"
          value={form.stock}
          onChange={e => setForm({ ...form, stock: e.target.value })}
        />

        <select className="border p-2 w-full mb-3"
          value={form.category}
          onChange={e => setForm({ ...form, category: e.target.value })}
        >
          <option>Staples</option>
          <option>Atta, Rice & Dal</option>
          <option>Edible Oil & Ghee</option>
          <option>Packaged Food</option>
          <option>Beverages</option>
          <option>Personal Care</option>
          <option>Household & Cleaning</option>
        </select>

        <input className="border p-2 w-full mb-3"
          placeholder="Image URL"
          value={form.image}
          onChange={e => setForm({ ...form, image: e.target.value })}
        />

        <textarea className="border p-2 w-full mb-3"
          placeholder="Description"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
        />

        <button className="bg-green-600 text-white px-6 py-2 rounded">
          Submit Product
        </button>
      </form>
    </div>
  );
}
