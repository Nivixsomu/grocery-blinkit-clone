import { FiPlus } from "react-icons/fi";

export default function ProductCard({ product, onAdd }) {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border p-3 flex flex-col">

      <img
        src={product.image}
        alt={product.name}
        className="h-28 w-full object-cover rounded-lg"
      />

      <div className="mt-2 flex-1">
        <h3 className="font-semibold text-sm truncate">
          {product.name}
        </h3>

        <p className="text-xs text-gray-500">
          {product.category}
        </p>
      </div>

      <div className="mt-2 flex justify-between items-center">
        <span className="font-bold text-green-700">
          ₹{product.price}
        </span>

        <button
          onClick={() => onAdd(product._id)}
          className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-full transition"
        >
          <FiPlus />
        </button>
      </div>
    </div>
  );
}
