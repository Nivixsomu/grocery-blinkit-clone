import VendorSidebar from "../components/vendor/VendorSidebar";

export default function VendorLayout({ children }) {
  return (
    <div className="flex">
      <VendorSidebar />
      <main className="flex-1 min-h-screen bg-gray-100 p-6">
        {children}
      </main>
    </div>
  );
}
