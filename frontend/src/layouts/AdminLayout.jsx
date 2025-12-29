import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar";

export default function AdminLayout() {
  return (
    <div className="min-h-screen flex bg-gray-100">
      <AdminSidebar />
      <main className="ml-64 p-10 w-full">
        <Outlet />
      </main>
    </div>
  );
}
