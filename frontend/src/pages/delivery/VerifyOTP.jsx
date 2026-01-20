import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../utils/api";
import { toast } from "react-hot-toast";

export default function VerifyOTP() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  const submitOtp = async () => {
    try {
      await API.put(`/orders/delivery/update-status/${orderId}`, {
        status: "delivered",
        otp
      });

      toast.success("Order Delivered!");
      navigate("/delivery/home");
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow w-80">
        <h2 className="text-xl font-bold mb-4 text-center">
          Enter Delivery OTP
        </h2>

        <input
          type="text"
          maxLength={4}
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="border p-3 w-full text-center text-lg rounded mb-4"
          placeholder="4-digit OTP"
        />

        <button
          onClick={submitOtp}
          className="w-full bg-green-600 text-white py-2 rounded"
        >
          Confirm Delivery
        </button>
      </div>
    </div>
  );
}
