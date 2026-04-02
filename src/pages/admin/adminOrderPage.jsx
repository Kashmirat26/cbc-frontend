import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [updateModal, setUpdateModal] = useState(false);
    const [updateData, setUpdateData] = useState({
        status: "",
        notes: ""
    });

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        axios.get(import.meta.env.VITE_BACKEND_URL + "/api/orders", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => {
            if (Array.isArray(res.data)) {
                setOrders(res.data);
            } else if (Array.isArray(res.data.orders)) {
                setOrders(res.data.orders);
            } else {
                setOrders([]);
            }
        })
        .catch(() => {
            toast.error("Failed to fetch orders.");
        });
    }, []);

    const calculateTotal = (items) => {
        return items?.reduce((total, item) => {
            return total + item.price * item.quantity;
        }, 0) || 0;
    };

    // 🔥 HANDLE UPDATE
    const handleUpdateOrder = () => {
        const token = localStorage.getItem("token");

        axios.put(
            `${import.meta.env.VITE_BACKEND_URL}/api/orders/${selectedOrder.orderId}`,
            updateData,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        .then(() => {
            toast.success("Order updated");

            setOrders((prev) =>
                prev.map((o) =>
                    o.orderId === selectedOrder.orderId
                        ? { ...o, ...updateData }
                        : o
                )
            );

            setSelectedOrder({
                ...selectedOrder,
                ...updateData
            });

            setUpdateModal(false);
        })
        .catch(() => {
            toast.error("Update failed");
        });
    };

    return (
        <div className="w-full h-full flex flex-col items-center p-6">
            <h1 className="text-2xl font-bold mb-4">Orders List</h1>

            <table className="w-full max-w-5xl border border-gray-300 rounded-lg overflow-hidden">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="p-3 text-left">Order ID</th>
                        <th className="p-3 text-left">Status</th>
                        <th className="p-3 text-left">Date</th>
                        <th className="p-3 text-left">Total (Rs)</th>
                        <th className="p-3 text-center">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {orders.length > 0 ? (
                        orders.map((order) => (
                            <tr key={order.orderId} className="border-t">
                                <td className="p-3">{order.orderId}</td>

                                <td className="p-3 capitalize">
                                    {order.status}
                                </td>

                                <td className="p-3">
                                    {order.date
                                        ? new Date(order.date).toLocaleString()
                                        : "No Date"}
                                </td>

                                <td className="p-3 font-semibold">
                                    Rs. {calculateTotal(order.orderedItems).toFixed(2)}
                                </td>

                                {/* 🔥 ACTIONS */}
                                <td className="p-3 flex gap-2 justify-center">
                                    <button
                                        onClick={() => setSelectedOrder(order)}
                                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                                    >
                                        View
                                    </button>

                                    <button
                                        onClick={() => {
                                            setSelectedOrder(order);
                                            setUpdateData({
                                                status: order.status,
                                                notes: order.notes || ""
                                            });
                                            setUpdateModal(true);
                                        }}
                                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                    >
                                        Update
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center p-4">
                                No orders found 😢
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* 🔥 VIEW MODAL */}
            {selectedOrder && !updateModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-xl p-6 w-[90%] max-w-2xl max-h-[80vh] overflow-y-auto">

                        <h2 className="text-xl font-bold mb-4">
                            Order Details - {selectedOrder.orderId}
                        </h2>

                        <div className="mb-4">
                            <p><strong>Name:</strong> {selectedOrder.name}</p>
                            <p><strong>Phone:</strong> {selectedOrder.phone}</p>
                            <p><strong>Address:</strong> {selectedOrder.address}</p>
                        </div>

                        <h3 className="font-semibold mb-2">Items</h3>
                        <div className="space-y-3">
                            {selectedOrder.orderedItems?.map((item, index) => (
                                <div key={index} className="flex items-center gap-4 border p-2 rounded-lg">
                                    <img src={item.image} className="w-16 h-16 rounded" />
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

                        {selectedOrder.notes && (
                            <div className="mt-4">
                                <h3 className="font-semibold">Notes</h3>
                                <p>{selectedOrder.notes}</p>
                            </div>
                        )}

                        <div className="mt-4 text-right font-bold">
                            Total: Rs. {calculateTotal(selectedOrder.orderedItems).toFixed(2)}
                        </div>

                        <button
                            onClick={() => setSelectedOrder(null)}
                            className="mt-4 w-full bg-red-500 text-white py-2 rounded"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {/* 🔥 UPDATE MODAL */}
            {updateModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-xl p-6 w-[90%] max-w-md">

                        <h2 className="text-xl font-bold mb-4">Update Order</h2>

                        <label className="block mb-2 font-semibold">Status</label>
                        <select
                            value={updateData.status}
                            onChange={(e) =>
                                setUpdateData({ ...updateData, status: e.target.value })
                            }
                            className="w-full p-2 border rounded mb-4"
                        >
                            <option value="pending">Pending</option>
                            <option value="paused">Paused</option>
                            <option value="completed">Completed</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                        </select>

                        <label className="block mb-2 font-semibold">Notes</label>
                        <textarea
                            value={updateData.notes}
                            onChange={(e) =>
                                setUpdateData({ ...updateData, notes: e.target.value })
                            }
                            className="w-full p-2 border rounded mb-4"
                        />

                        <div className="flex gap-2">
                            <button
                                onClick={handleUpdateOrder}
                                className="flex-1 bg-green-500 text-white py-2 rounded"
                            >
                                Save
                            </button>

                            <button
                                onClick={() => setUpdateModal(false)}
                                className="flex-1 bg-gray-400 text-white py-2 rounded"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}