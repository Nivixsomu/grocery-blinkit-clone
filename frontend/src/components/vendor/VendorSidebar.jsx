import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiPlusCircle,
  FiBox,
  FiShoppingCart,
  FiLogOut
} from "react-icons/fi";

export default function VendorSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const menu = [
    { name: "Dashboard", path: "/vendor/dashboard", icon: <FiHome /> },
    { name: "Add Product", path: "/vendor/add-product", icon: <FiPlusCircle /> },
    { name: "My Products", path: "/vendor/products", icon: <FiBox /> },
    { name: "Orders", path: "/vendor/orders", icon: <FiShoppingCart /> },
  ];

  return (
    <div className="h-screen w-64 bg-slate-900 text-white flex flex-col">
      <div className="p-5 text-2xl font-bold border-b border-slate-700">
        🛒 GroceryPro
        <p className="text-sm font-normal text-slate-400">Vendor Panel</p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menu.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition
              ${
                location.pathname === item.path
                  ? "bg-green-600"
                  : "hover:bg-slate-800"
              }`}
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
      </nav>

      <button
        onClick={() => {
          localStorage.clear();
          navigate("/");
        }}
        className="m-4 flex items-center gap-3 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700"
      >
        <FiLogOut />
        Logout
      </button>
    </div>
  );
}
