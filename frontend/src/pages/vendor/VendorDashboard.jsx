import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../helpers/API";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import {
  FiBox,
  FiClock,
  FiCheckCircle,
  FiTrendingUp,
  FiAlertTriangle,
} from "react-icons/fi";

export default function VendorDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    API.get("/vendor/stats")
      .then((res) => setStats(res.data))
      .catch(() => console.error("Failed to load vendor stats"));
  }, []);

  const chartData = [
    { name: "Mon", orders: 12, revenue: 1200 },
    { name: "Tue", orders: 18, revenue: 1800 },
    { name: "Wed", orders: 9, revenue: 900 },
    { name: "Thu", orders: 22, revenue: 2200 },
    { name: "Fri", orders: 15, revenue: 1500 },
    { name: "Sat", orders: 25, revenue: 2500 },
    { name: "Sun", orders: 20, revenue: 2000 },
  ];

  if (!stats) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-28 bg-gray-200 rounded-xl animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-green-700 mb-8">
        Vendor Dashboard
      </h1>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <StatCard icon={<FiBox />} label="Total Products" value={stats.totalProducts} bg="bg-blue-100" />
        <StatCard icon={<FiCheckCircle />} label="Approved Products" value={stats.approvedProducts} bg="bg-green-100" />
        <StatCard icon={<FiClock />} label="Pending Products" value={stats.pendingProducts} bg="bg-yellow-100" />
        <StatCard icon={<FiAlertTriangle />} label="Out of Stock" value={stats.outOfStock} bg="bg-red-100" />
        <StatCard icon={<FiTrendingUp />} label="Total Orders" value={stats.totalOrders} bg="bg-purple-100" />
        <StatCard icon={<FiTrendingUp />} label="Revenue" value={`₹${stats.revenue}`} bg="bg-green-200" />
      </div>

      {/* CHART */}
      <div className="mt-12 bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4">Weekly Analytics</h2>
        <div className="h-72">
          <ResponsiveContainer>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line dataKey="orders" stroke="#22c55e" strokeWidth={3} />
              <Line dataKey="revenue" stroke="#3b82f6" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Action to="/vendor/add-product" title="➕ Add Product" />
        <Action to="/vendor/products" title="📦 My Products" />
        <Action to="/vendor/orders" title="🛒 Orders" />
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, bg }) {
  return (
    <div className={`rounded-xl p-6 shadow flex items-center gap-4 ${bg}`}>
      <div className="text-2xl">{icon}</div>
      <div>
        <p className="text-sm text-gray-600">{label}</p>
        <h2 className="text-xl font-bold">{value}</h2>
      </div>
    </div>
  );
}

function Action({ to, title }) {
  return (
    <Link to={to} className="bg-white p-6 rounded-xl shadow hover:bg-gray-50">
      <h2 className="text-xl font-bold">{title}</h2>
    </Link>
  );
}
