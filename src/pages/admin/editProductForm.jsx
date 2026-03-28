import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import uploadMediaToSupabase from "../../utils/mediaUpload";

export default function EditProductForm() {
    const location = useLocation();
    const navigate = useNavigate();

    const product = location.state.product

    const altNames = product.altNames.join(",")

    if(product == null){
        navigate("admin/products")
    }

    const [productId, setProductId] = useState(product.productId);
    const [productName, setProductName] = useState(product.productName);
    const [alternativeNames, setAlternativeNames] = useState(altNames);
    const [imageFiles, setImageFiles] = useState([]);
    const [price, setPrice] = useState(product.price);
    const [lastPrice, setLastPrice] = useState(product.lastPrice);
    const [stock, setStock] = useState(product.stock);
    const [description, setDescription] = useState(product.description);

    async function editProduct() {
        const altNames = alternativeNames.split(",")
        const promisesArray = []
        let imgUrls = product.images
        
        if(imageFiles.length > 0){
            for(let i=0; i<imageFiles.length; i++){
                promisesArray[i] = uploadMediaToSupabase(imageFiles[i])
            }

            imgUrls = await Promise.all(promisesArray)
        }
        
        const productData = {
            productId : productId,
            productName : productName,
            altNames : altNames,    
            images : imgUrls,
            price : price,
            lastPrice : lastPrice,
            stock : stock,
            description : description
        }

        const token = localStorage.getItem("token");

        try {
            await axios.put(import.meta.env.VITE_BACKEND_URL + "/api/products/" + product.productId, productData, {
            headers: {
                Authorization: "Bearer "+token
            }
        })
        navigate("/admin/products")
        toast.success("Product updated successfully!")
        } catch (error) {
            toast.error("Fail to update product!")
        }
        
    }

    return (
        <div className="w-full h-full flex flex-col">

            <div className="mb-4">
                <h1 className="text-2xl font-bold text-gray-800">
                    Edit Product
                </h1>
                <p className="text-sm text-gray-500">
                    Update the details of the product
                </p>
            </div>

            <div className="flex-1 bg-gray-50 rounded-xl p-4 overflow-auto">
                <div className="w-full bg-white rounded-xl shadow p-6">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                        <div className="flex flex-col">
                            <label className="text-sm text-gray-600 mb-1">Product ID</label>
                            <input
                                disabled
                                type="text"
                                placeholder="Enter Product ID"
                                className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={productId}
                                onChange={(e) => setProductId(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm text-gray-600 mb-1">Product Name</label>
                            <input
                                type="text"
                                placeholder="Enter Product Name"
                                className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col md:col-span-2">
                            <label className="text-sm text-gray-600 mb-1">Alternative Names</label>
                            <input
                                type="text"
                                placeholder="Enter Alternative Names"
                                className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={alternativeNames}
                                onChange={(e) => setAlternativeNames(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col md:col-span-2">
                            <label className="text-sm text-gray-600 mb-1">Image URLs</label>
                            <input
                                type="file"
                                placeholder="Enter Image URLs"
                                className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={(e) => {
                                    setImageFiles(e.target.files)
                                }}
                                multiple
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm text-gray-600 mb-1">Price</label>
                            <input
                                type="number"
                                placeholder="Enter Price"
                                className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm text-gray-600 mb-1">Last Price</label>
                            <input
                                type="number"
                                placeholder="Enter Last Price"
                                className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={lastPrice}
                                onChange={(e) => setLastPrice(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm text-gray-600 mb-1">Stock</label>
                            <input
                                type="number"
                                placeholder="Enter Stock Quantity"
                                className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col md:col-span-2">
                            <label className="text-sm text-gray-600 mb-1">Description</label>
                            <textarea
                                rows="4"
                                placeholder="Enter Product Description"
                                className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        <div className="md:col-span-2 flex justify-end mt-4">
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
                            onClick={editProduct}>
                                Edit Product
                            </button>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}