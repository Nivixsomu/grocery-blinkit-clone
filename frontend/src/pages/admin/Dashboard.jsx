import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <>
      <h1 className="text-4xl font-bold text-purple-700 mb-4">
        Admin Dashboard
      </h1>

      <p className="text-gray-600 text-lg mb-10">
        Manage products, vendors, customers, orders, and delivery agents.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        <DashboardCard
          to="/admin/pending-products"
          title="📦 Pending Products"
          desc="Review and approve vendor product submissions."
        />

        <DashboardCard
          to="/admin/vendors"
          title="🏪 Vendors"
          desc="Manage vendor approvals and accounts."
        />

        <DashboardCard
          to="/admin/orders"
          title="🛒 Orders"
          desc="Assign delivery agents and track orders."
        />

      </div>
    </>
  );
}

function DashboardCard({ to, title, desc }) {
  return (
    <Link
      to={to}
      className="bg-white p-6 rounded-xl shadow border hover:shadow-xl transition"
    >
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p>{desc}</p>
    </Link>
  );
}
