import { useEffect, useState } from "react";
import API from "../../utils/api";
import { toast } from "react-hot-toast";

export default function Vendors() {
  const [vendors, setVendors] = useState([]);

  // Fetch all vendors
  const fetchVendors = async () => {
    try {
      const res = await API.get("/admin/vendors");
      setVendors(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Unable to load vendors");
    }
  };

  // Approve Vendor
  const approveVendor = async (id) => {
    try {
      await API.put(`/admin/vendor/approve/${id}`);
      toast.success("Vendor approved");
      fetchVendors();
    } catch (error) {
      toast.error("Error approving vendor");
    }
  };

  // Reject Vendor
  const rejectVendor = async (id) => {
    try {
      await API.delete(`/admin/vendor/${id}`);
      toast.success("Vendor removed");
      fetchVendors();
    } catch (error) {
      toast.error("Error rejecting vendor");
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  return (
    <div className="ml-64 p-10 bg-gray-100 min-h-screen">

      <h1 className="text-3xl font-bold text-purple-700 mb-6">
        Vendor Management
      </h1>

      {vendors.length === 0 ? (
        <p className="text-gray-600 text-lg">No vendors found.</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {vendors.map((vendor) => (
            <div
              key={vendor._id}
              className="bg-white shadow-lg rounded-xl p-6 border border-gray-200"
            >
              <h2 className="text-xl font-bold mb-2">{vendor.name}</h2>
              <p className="text-gray-600 mb-1">📧 {vendor.email}</p>
              <p className="text-gray-600 mb-1">📞 {vendor.phone}</p>

              <p className="mt-2">
                <span
                  className={`px-3 py-1 rounded text-white text-sm ${
                    vendor.approved ? "bg-green-600" : "bg-red-600"
                  }`}
                >
                  {vendor.approved ? "Approved" : "Pending Approval"}
                </span>
              </p>

              <div className="flex gap-4 mt-6">

                {!vendor.approved && (
                  <button
                    onClick={() => approveVendor(vendor._id)}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Approve
                  </button>
                )}

                <button
                  onClick={() => rejectVendor(vendor._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Remove
                </button>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
