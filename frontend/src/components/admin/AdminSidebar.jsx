import { Link, useNavigate } from "react-router-dom";

export default function AdminSidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <aside className="w-64 bg-white shadow-lg h-screen p-6 fixed">
      <h1 className="text-2xl font-bold text-purple-600 mb-8">
        Admin Panel
      </h1>

      <nav className="space-y-3">
        <SidebarLink to="/admin/dashboard" label="🏠 Dashboard" />
        <SidebarLink to="/admin/pending-products" label="📦 Pending Products" />
        <SidebarLink to="/admin/vendors" label="🏪 Vendors" />
        <SidebarLink to="/admin/customers" label="👤 Customers" />
        <SidebarLink to="/admin/delivery-agents" label="🚚 Delivery Agents" />
        <SidebarLink to="/admin/orders" label="🛒 Orders" />

        <button
          onClick={logout}
          className="block p-2 text-lg rounded hover:bg-red-100 text-left w-full mt-6"
        >
          ⎋ Logout
        </button>
      </nav>
    </aside>
  );
}

function SidebarLink({ to, label }) {
  return (
    <Link
      to={to}
      className="block p-2 text-lg rounded hover:bg-purple-100"
    >
      {label}
    </Link>
  );
}
