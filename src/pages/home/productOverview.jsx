import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import ProductNotFound from "./productNotFound";
import ImageSlider from "../../components/imageSlider";
import { addToCart } from "../../utils/cartFunction";
import toast from "react-hot-toast";

export default function ProductOverview() {

    const params = useParams();
    const productId = params.id;
    const [product, setProduct] = useState(null);
    const [status, setStatus] = useState("loading"); //loading, not found, found

    useEffect(
        ()=>{
            console.log(productId)
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/products/" + productId).
            then((res)=>{
                console.log(res.data)

                if(res.data == null){
                    setStatus("not found")
                }

                if(res.data != null){
                    setProduct(res.data)
                    setStatus("found")
                }
            })
        }
        ,[])

    function onAddToCartClick(){
        addToCart(product.productId, 1)
        toast.success(product.productId + " added to cart!")
    }

    return (
        <div className="w-full h-[calc(100vh-100px)]">
           {
            status == "loading"&&(
                <div className="w-full h-full flex items-center justify-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-2 
                    border-gray-500 border-b-accent border-b-4">
                    </div>
                </div>
            )
           }
           {
            status == "not found"&&(
                <ProductNotFound/>
            )
           }
           {
            status == "found"&&(
                <div className="w-full h-full flex flex-col md:flex-row lg:flex-row items-center justify-center">
                    <h1 className="text-3xl font-bold text-gray-800 lg:hidden">{product.productName}</h1>
                     <p className="text-xl text-gray-600 lg:hidden">{
                            (product.price > product.lastPrice)&&
                            <span className="line-through text-red-500">LKR.{product.price}</span>
                            } <span>{"LKR." + product.lastPrice}</span></p>
                    <div className="w-[100%] lg:w-[35%] border-[3px] border-blue-900 lg:h-full">
                        <ImageSlider images={product.images}/>
                    </div>
                    <div className="w-full lg:w-[65%] p-4">
                        <h1 className="text-3xl font-bold text-gray-800 hidden lg:block">{product.productName}</h1>
                        <h1 className="text-3xl font-bold text-gray-500">{product.altNames.join(" | ")}</h1>
                        <p className="text-xl text-gray-600 hidden lg:block">{
                            (product.price > product.lastPrice)&&
                            <span className="line-through text-red-500">LKR.{product.price}</span>
                            } <span>{"LKR." + product.lastPrice}</span></p>
                        <p className="text-lg text-gray-600 line-clamp-3">{product.description}</p>
                        <button className="bg-accent text-white p-2 rounded-lg" onClick={onAddToCartClick}>Add to Cart</button>
                    </div>
                </div>
            )
           }
        </div>
    )
}