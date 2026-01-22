import { useNavigate } from "react-router-dom";

export default function CartBar({ total, totalItems }) {
  const navigate = useNavigate();

  if (!totalItems || totalItems === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-green-600 text-white px-4 py-3 flex justify-between items-center z-50">
      <div>
        <p className="text-sm">
          {totalItems} item{totalItems > 1 ? "s" : ""}
        </p>
        <p className="font-bold text-lg">₹{total}</p>
      </div>

      <button
        onClick={() => navigate("/customer/checkout")}
        className="bg-white text-green-700 font-bold px-4 py-2 rounded-lg"
      >
        Checkout →
      </button>
    </div>
  );
}
