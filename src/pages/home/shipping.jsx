import { useLocation, useNavigate } from "react-router-dom"
import CartCard from "../../components/cartCard"
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast"; 

export default function ShippingPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const cart = location.state?.items || [];

    const [total, setTotal] = useState(0)
    const [labeledTotal, setLabeledTotal] = useState(0)

    // 🆕 user inputs
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!cart || cart.length === 0) {
            toast.error("Cart is empty");
            navigate("/cart");
            return;
        }

        axios.post(import.meta.env.VITE_BACKEND_URL + "/api/orders/quote", {
            orderedItems: cart
        }).then((res) => {
            if (res.data.total != null) {
                setTotal(res.data.total)
                setLabeledTotal(res.data.labeledTotal)
            }
        }).catch(() => {
            toast.error("Failed to calculate totals");
        });

    }, []);

    function validateForm() {
        if (!name.trim()) {
            toast.error("Name is required");
            return false;
        }
        if (!address.trim()) {
            toast.error("Address is required");
            return false;
        }
        if (!phone.trim()) {
            toast.error("Phone number is required");
            return false;
        }
        if (phone.length < 10) {
            toast.error("Invalid phone number");
            return false;
        }
        return true;
    }

    function createOrder() {
        const token = localStorage.getItem("token")
        if (!token) {
            toast.error("Please login first");
            return;
        }

        if (!validateForm()) return;

        setLoading(true);

        axios.post(import.meta.env.VITE_BACKEND_URL + "/api/orders",
            {
                orderedItems: cart,
                name,
                address,
                phone
            },
            {
                headers: {
                    Authorization: "Bearer " + token
                },
            }
        ).then((res) => {
            toast.success("Order placed successfully 🎉");
            navigate("/"); // redirect after success
        }).catch((err) => {
            toast.error(err.response?.data?.message || "Order failed");
        }).finally(() => {
            setLoading(false);
        });
    }

   return (
    <div className="w-full min-h-screen bg-gray-300 flex justify-center items-center p-6">

        <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-6">

            {/* 🔹 TITLE */}
            <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>

            {/* 🔹 FORM */}
            <div className="flex flex-col gap-3 mb-6">

                <div>
                    <label className="text-sm text-gray-600">Name</label>
                    <input
                        type="text"
                        placeholder="Enter your name"
                        className="w-full border rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div>
                    <label className="text-sm text-gray-600">Address</label>
                    <textarea
                        placeholder="Enter your address"
                        className="w-full border rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>

                <div>
                    <label className="text-sm text-gray-600">Phone</label>
                    <input
                        type="text"
                        placeholder="Enter your phone number"
                        className="w-full border rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>

            </div>

            {/* 🔹 ORDER SUMMARY */}
            <h3 className="text-lg font-semibold mb-3">Order Summary</h3>

            <table className="w-full text-sm mb-4">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-2">Image</th>
                        <th>Product</th>
                        <th>ID</th>
                        <th>Qty</th>
                        <th>Price</th>
                        <th>Total</th>
                    </tr>
                </thead>

                <tbody>
                    {cart.map((item) => (
                        <CartCard
                            key={item.productId}
                            productId={item.productId}
                            qty={item.qty}
                        />
                    ))}
                </tbody>
            </table>

            {/* 🔹 TOTALS */}
            <div className="text-sm text-gray-700 mb-4">
                <p>Total: LKR. {labeledTotal.toFixed(2)}</p>
                <p>Discount: LKR. {(labeledTotal - total).toFixed(2)}</p>
                <p className="font-semibold text-black">
                    Grand Total: LKR. {total.toFixed(2)}
                </p>
            </div>

            {/* 🔹 BUTTON */}
            <button
                onClick={createOrder}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition disabled:opacity-50"
            >
                {loading ? "Processing..." : "Checkout"}
            </button>

        </div>
    </div>
);
}