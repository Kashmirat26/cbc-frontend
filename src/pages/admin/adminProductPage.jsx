import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import { FaPlus, FaTrash } from "react-icons/fa"
import { FaPencil } from "react-icons/fa6"
import { Link, useNavigate } from "react-router-dom";

export default function AdminProductPage() {

    const [products, setProducts] = useState([])
    const [productsLoaded, setProductsLoaded] = useState(false)

    useEffect(() => {
        if (!productsLoaded) {
            axios.get(import.meta.env.VITE_BACKEND_URL +"/api/products")
                .then((res) => {
                    setProducts(res.data)
                    setProductsLoaded(true)
                });
        }
    }, [productsLoaded])

    const navigate = useNavigate();

    return (
        <div className="w-full h-full flex flex-col relative">
            <div className="mb-4">
                <h1 className="text-2xl font-bold text-gray-800">
                    Product Management
                </h1>
            </div>
            {
                productsLoaded ? (
                    <>
                        <Link to="/admin/products/addProduct" className="absolute bottom-6 right-6 flex items-center justify-center w-12 h-12 border-2 border-blue-600 text-blue-600 rounded-xl hover:rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md">
                            <FaPlus className="text-lg" />
                        </Link>

                        <div className="flex-1 bg-gray-50 rounded-xl p-4 overflow-hidden">

                            <div className="w-full h-full bg-white rounded-xl shadow overflow-hidden flex flex-col">

                                <div className="flex-1 overflow-auto">

                                    <table className="w-full table-fixed text-sm text-left">

                                        <thead className="bg-gray-200 text-gray-700 uppercase text-xs sticky top-0 z-10">
                                            <tr>
                                                <th className="px-4 py-3 w-[100px]">ID</th>
                                                <th className="px-4 py-3 w-[180px]">Name</th>
                                                <th className="px-4 py-3 w-[120px]">Price</th>
                                                <th className="px-4 py-3 w-[120px]">Last Price</th>
                                                <th className="px-4 py-3 w-[100px]">Stock</th>
                                                <th className="px-4 py-3">Description</th>
                                                <th className="px-4 py-3 w-[100px] text-center">Actions</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {products.map((product) => (
                                                <tr
                                                    key={product._id}
                                                    className="border-b hover:bg-gray-50 transition"
                                                >
                                                    <td className="px-4 py-3 font-medium">
                                                        {product.productId}
                                                    </td>

                                                    <td className="px-4 py-3">
                                                        {product.productName}
                                                    </td>

                                                    <td className="px-4 py-3 text-green-600 font-semibold">
                                                        Rs. {product.price}
                                                    </td>

                                                    <td className="px-4 py-3 font-semibold text-gray-600">
                                                        Rs. {product.lastPrice}
                                                    </td>

                                                    <td className="px-4 py-3">
                                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700}`}>
                                                            {product.stock}
                                                        </span>
                                                    </td>

                                                    <td className="px-4 py-3 break-words">
                                                        <p className="line-clamp-2">
                                                            {product.description}
                                                        </p>
                                                    </td>

                                                    <td className="px-4 py-3 flex justify-center gap-3">
                                                        <button className="text-blue-500 hover:text-blue-700"
                                                            title="Edit"
                                                            onClick={()=>{
                                                                navigate("/admin/products/editProduct", {state: {product : product}});
                                                            }}
                                                        >
                                                            <FaPencil />
                                                        </button>
                                                        <button className="text-red-500 hover:text-red-700"
                                                            onClick={() => {
                                                                alert(product.productId)
                                                                const token = localStorage.getItem("token")

                                                                axios.delete(import.meta.env.VITE_BACKEND_URL +`/api/products/${product.productId}`, {
                                                                    headers: {
                                                                        Authorization: "Bearer " + token
                                                                    },
                                                                }).then((res) => {
                                                                    console.log(res.data)
                                                                    toast.success("Product deleted successfully!")
                                                                    setProductsLoaded(false)
                                                                });
                                                            }}>
                                                            <FaTrash />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>

                                    </table>
                                </div>

                            </div>
                        </div>
                    </>
                ) : <div className="w-full h-full flex justify-center items-center">
                    <div className="w-[60px] h-[60px] border-[4px] border-gray-200 border-b-[#3b82f6] animate-spin rounded-full">

                    </div>
                </div>
            }

        </div>

    )
}