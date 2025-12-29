import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import CustomerHome from "./pages/customer/Home";
import VendorDashboard from "./pages/vendor/VendorDashboard";
import AdminDashboard from "./pages/admin/Dashboard";
import DeliveryOrders from "./pages/delivery/Orders";
import Register from "./pages/Register";
import Cart from "./pages/customer/Cart";
import Checkout from "./pages/customer/Checkout";
import Success from "./pages/customer/Success";
import MyOrders from "./pages/customer/MyOrders";
import DeliveryHome from "./pages/delivery/DeliveryHome";
//import VendorDashboard from "./pages/vendor/VendorDashboard";
import AddProduct from "./pages/vendor/AddProduct";
import MyProducts from "./pages/vendor/MyProducts";
import EditProduct from "./pages/vendor/EditProduct";
import VendorOrders from "./pages/vendor/VendorOrders";
import PendingProducts from "./pages/admin/PendingProducts";
import Vendors from "./pages/admin/Vendors";
import Customers from "./pages/admin/Customers";
import Orders from "./pages/admin/Orders";
import DeliveryAgents from "./pages/admin/DeliveryAgents";
import VendorLayout from "./layouts/VendorLayout";
import AdminLayout from "./layouts/AdminLayout";
import VerifyOTP from "./pages/delivery/VerifyOTP";










import toast, { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster />
      <Routes>

        {/* LOGIN */}
        <Route path="/" element={<Login />} />

        {/* CUSTOMER */}
        <Route path="/customer/home" element={<CustomerHome />} />

        {/* VENDOR
        <Route path="/vendor/dashboard" element={<VendorDashboard />} /> */}

        {/* ADMIN
        <Route path="/admin/dashboard" element={<AdminDashboard />} /> */}

        {/* DELIVERY AGENT */}
        <Route path="/delivery/orders" element={<DeliveryOrders />} />

        {/* register */}
        <Route path="/register" element={<Register />} />

        {/* Add Cart */}
        <Route path="/customer/cart" element={<Cart />} />

        {/* Add Checkout */}
        <Route path="/customer/checkout" element={<Checkout />} />

        {/* Success Page */}
        <Route path="/customer/success" element={<Success />} />

        {/* My Orders*/}
        <Route path="/customer/orders" element={<MyOrders />} />

        {/* Delivery Agents*/}
        <Route path="/delivery/home" element={<DeliveryHome />} />
        
        {/* Vendor Routes */}
<Route
  path="/vendor/dashboard"
  element={
    <VendorLayout>
      <VendorDashboard />
    </VendorLayout>
  }
/>

<Route
  path="/vendor/add-product"
  element={
    <VendorLayout>
      <AddProduct />
    </VendorLayout>
  }
/>

<Route
  path="/vendor/products"
  element={
    <VendorLayout>
      <MyProducts />
    </VendorLayout>
  }
/>

<Route
  path="/vendor/edit/:id"
  element={
    <VendorLayout>
      <EditProduct />
    </VendorLayout>
  }
/>

<Route
  path="/vendor/orders"
  element={
    <VendorLayout>
      <VendorOrders />
    </VendorLayout>
  }
/>


         {/* ADMIN Routes */}
  <Route element={<AdminLayout />}>
  <Route path="/admin/dashboard" element={<AdminDashboard />} />
  <Route path="/admin/pending-products" element={<PendingProducts />} />
  <Route path="/admin/vendors" element={<Vendors />} />
  <Route path="/admin/customers" element={<Customers />} />
  <Route path="/admin/orders" element={<Orders />} />
  <Route path="/admin/delivery-agents" element={<DeliveryAgents />} />
</Route>



{/* OTP VERIFICATION */}
<Route path="/delivery/verify/:orderId" element={<VerifyOTP />} />










      </Routes>
    </>
  );
}

export default App;
