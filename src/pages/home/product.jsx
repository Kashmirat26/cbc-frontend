import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import ProductCard from "../../components/productCard"

export default function ProductPage() {
    const [products, setProducts] = useState([])
    const [loadingStatus, setLoadingStatus] = useState('loading') // loaded, loading, error
    const [query, setQuery] = useState("")
    useEffect(() => {
        if (loadingStatus === 'loading') {
            axios.get(import.meta.env.VITE_BACKEND_URL + '/api/products').
                then(
                    (res) => {
                        console.log(res.data)
                        setProducts(res.data)
                        setLoadingStatus("loaded")
                    }
                ).catch(
                    (err) => toast.error('Failed to fetch products')
                )
        }
    }, [])

    function search(e) {
        const query = e.target.value
        setQuery(query)
        setLoadingStatus("loading");
        if (query == "") {
            axios.get(import.meta.env.VITE_BACKEND_URL + '/api/products').
                then(
                    (res) => {
                        console.log(res.data)
                        setProducts(res.data)
                        setLoadingStatus("loaded")
                    }
                ).catch(
                    (err) => toast.error('Failed to fetch products')
                )
        } else {
            axios.get(import.meta.env.VITE_BACKEND_URL + '/api/products/search/' + query).
                then(
                    (res) => {
                        console.log(res.data)
                        setProducts(res.data)
                        setLoadingStatus("loaded")
                    }
                ).catch(
                    (err) => toast.error('Failed to fetch products')
                )
        }
    }

    return (
        <div className="w-full h-full relative pt-4  bg-gray-200">
              <div className="w-full flex justify-center mb-6">
                    <input
                        type="text"
                        className="w-1/2 max-w-xl p-3 rounded-lg border border-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 z-50"
                        placeholder="Search Products...." onChange={search}
                        value={query}
                    />
                </div>
            {loadingStatus == "loaded" && <div className="w-full min-h-screen bg-gray-200 flex flex-col items-center pt-6">

                {/* Search Bar */}
              

                {/* Products Grid */}
                <div className="w-full px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
                    {
                        products.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))
                    }
                </div>

            </div>}
            {loadingStatus == "loading" && <div className="w-full h-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-2
                border-gray-500 border-b-accent border-b-4"></div>
            </div>}
        </div>
    )
}