import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function MyOrdersPage() {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        axios.get(import.meta.env.VITE_BACKEND_URL + "/api/orders", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => {
            setOrders(res.data);
        })
        .catch(() => {
            toast.error("Failed to fetch orders.");
        });
    }, []);

    const calculateTotal = (items) => {
        return items.reduce((total, item) => {
            return total + item.price * item.quantity;
        }, 0);
    };

    return (
        <div className="w-full h-full flex flex-col items-center p-6">
            <h1 className="text-2xl font-bold mb-4">My Orders</h1>

            <table className="w-full max-w-4xl border border-gray-300 rounded-lg overflow-hidden">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="p-3 text-left">Order ID</th>
                        <th className="p-3 text-left">Status</th>
                        <th className="p-3 text-left">Date</th>
                        <th className="p-3 text-left">Total (Rs)</th>
                    </tr>
                </thead>

                <tbody>
                    {orders.map((order) => (
                        <tr
                            key={order.orderId}
                            className="border-t cursor-pointer hover:bg-gray-100"
                            onClick={() => setSelectedOrder(order)}
                        >
                            <td className="p-3">{order.orderId}</td>
                            <td className="p-3 capitalize">{order.status}</td>
                            <td className="p-3">
                                {order.date
                                    ? new Date(order.date).toLocaleString()
                                    : "No Date"}
                            </td>
                            <td className="p-3 font-semibold">
                                Rs. {calculateTotal(order.orderedItems).toFixed(2)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* 🔥 MODAL */}
            {selectedOrder && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-xl p-6 w-[90%] max-w-2xl max-h-[80vh] overflow-y-auto">

                        <h2 className="text-xl font-bold mb-4">
                            Order Details - {selectedOrder.orderId}
                        </h2>

                        {/* Customer Info */}
                        <div className="mb-4">
                            <p><strong>Name:</strong> {selectedOrder.name}</p>
                            <p><strong>Phone:</strong> {selectedOrder.phone}</p>
                            <p><strong>Address:</strong> {selectedOrder.address}</p>
                        </div>

                        {/* Items */}
                        <h3 className="font-semibold mb-2">Items</h3>
                        <div className="space-y-3">
                            {selectedOrder.orderedItems.map((item, index) => (
                                <div key={index} className="flex items-center gap-4 border p-2 rounded-lg">
                                    <img 
                                        src={item.image} 
                                        alt={item.name}
                                        className="w-16 h-16 object-cover rounded"
                                    />
                                    <div className="flex-1">
                                        <p className="font-semibold">{item.name}</p>
                                        <p>Qty: {item.quantity}</p>
                                        <p>Rs. {item.price}</p>
                                    </div>
                                    <div className="font-bold">
                                        Rs. {(item.price * item.quantity).toFixed(2)}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Notes */}
                        {selectedOrder.notes && (
                            <div className="mt-4">
                                <h3 className="font-semibold">Notes</h3>
                                <p className="text-gray-600">{selectedOrder.notes}</p>
                            </div>
                        )}

                        {/* Total */}
                        <div className="mt-4 text-right font-bold text-lg">
                            Total: Rs. {calculateTotal(selectedOrder.orderedItems).toFixed(2)}
                        </div>

                        {/* Close button */}
                        <button
                            onClick={() => setSelectedOrder(null)}
                            className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}