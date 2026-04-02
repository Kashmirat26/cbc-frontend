import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { BsGraphUp } from "react-icons/bs";
import { FaBoxOpen, FaShoppingCart, FaUsers } from "react-icons/fa";
import AdminProductPage from "./admin/adminProductPage";
import AddProductForm from "./admin/addProductForm";
import EditProductForm from "./admin/editProductForm";
import AdminOrdersPage from "./admin/adminOrderPage";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminHomePage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(()=>{
    const token = localStorage.getItem("token")
    if(!token){
      navigate("/login")
      return;
    }
    axios.get(import.meta.env.VITE_BACKEND_URL + "/api/users", {
      headers : {
        Authorization : `Bearer ${token}`
      }
    }).then((res)=>{
      console.log(res.data)
      if(res.data.type != "admin"){
        toast.error("Unauthorized access")
        navigate("/login")
      }else{
        setUser(res.data)
      }

    }).catch((err)=>{
      console.error(err)
      toast.error("Failed to fetch user data")
      navigate("/login")
    })
  },[]);
  return (
    <div className="flex w-full h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="w-[240px] bg-blue-600 text-white flex flex-col p-5 gap-6">

        <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>

        <Link 
          to="/admin/dashboard" 
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-700 transition"
        >
          <BsGraphUp size={20} />
          <span>Dashboard</span>
        </Link>

        <Link 
          to="/admin/products" 
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-700 transition"
        >
          <FaBoxOpen size={20} />
          <span>Products</span>
        </Link>

        <Link 
          to="/admin/orders" 
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-700 transition"
        >
          <FaShoppingCart size={20} />
          <span>Orders</span>
        </Link>

        <Link 
          to="/admin/customers" 
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-700 transition"
        >
          <FaUsers size={20} />
          <span>Customers</span>
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="bg-white rounded-2xl shadow p-6 h-full">
          {user!=null&&<Routes path="/*">
            <Route path="/" element={<h1>Dashboard</h1>}/>
            <Route path="/products" element={<AdminProductPage/>}/>
            <Route path="/products/addProduct" element={<AddProductForm/>}/>
            <Route path="/products/editProduct" element={<EditProductForm/>}/>
             <Route path="/orders" element={<AdminOrdersPage/>}/>
            <Route path="/customers" element={<h1>Customers</h1>}/>
            <Route path="/*" element={<h1>404 - Page Not Found</h1>}/>
          </Routes>}
          {
            user == null && <div className="w-full h-full flex justify-center items-center">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-accent"></div>
            </div>
          }
        </div>
      </div>

    </div>
  );
}