import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";   // ✅ IMPORTANT
import { Link } from "react-router-dom";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      toast.success("Login Successful!");

      // save token & role
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      // redirect based on role
      if (res.data.role === "customer") {
        navigate("/customer/home");
      } else if (res.data.role === "vendor") {
        navigate("/vendor/dashboard");
      } else if (res.data.role === "admin") {
        navigate("/admin/dashboard");
      } else if (res.data.role === "delivery") {
        navigate("/delivery/home");
      }

    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Login failed!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Enter Email"
            className="w-full border p-3 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter Password"
            className="w-full border p-3 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-4">
  Don't have an account?{" "}
  <Link to="/register" className="text-blue-600 underline">
    Register
  </Link>
</p>

      </div>
    </div>
  );
}
