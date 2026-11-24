
"use client";

import { useCallback, useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const STATUSES = [
  "Pending",
  "Confirmed",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-700",
  Confirmed: "bg-blue-100 text-blue-700",
  Processing: "bg-purple-100 text-purple-700",
  Shipped: "bg-indigo-100 text-indigo-700",
  Delivered: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updating, setUpdating] = useState("");

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(`${API_URL}/api/orders`, {
        cache: "no-store",
        
      });

      const data = await res.json();
      console.log(data,'data all')

      if (!res.ok) {
        throw new Error(data.message || "Failed to load orders");
      }

      setOrders(data.data || []);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Update order status
  const updateStatus = async (orderId, orderStatus) => {
    try {
      setUpdating(orderId);

      const res = await fetch(
        `${API_URL}/api/orders/${orderId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ orderStatus }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Status update failed");
      }

      setOrders((prev) =>
        prev.map((order) =>
          order.orderId === orderId
            ? { ...order, orderStatus: data.data.orderStatus }
            : order
        )
      );

      if (selectedOrder?.orderId === orderId) {
        setSelectedOrder(data.data);
      }
    } catch (err) {
      alert(err.message);
    } finally {
      setUpdating("");
    }
  };

  // Search orders
  const filteredOrders = orders.filter((order) => {
    const value = search.toLowerCase();

    return (
      order.orderId?.toLowerCase().includes(value) ||
      order.customer?.name?.toLowerCase().includes(value) ||
      order.customer?.phone?.includes(value)
    );
  });

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleString("en-BD", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const printAllOrders = () => {
    setSelectedOrder(null);
    setTimeout(() => window.print(), 100);
  };

  const printSingleOrder = (order) => {
    setSelectedOrder(order);
    setTimeout(() => window.print(), 100);
  };

  const totalRevenue = orders
    .filter((order) => order.orderStatus !== "Cancelled")
    .reduce((sum, order) => sum + (order.total || 0), 0);

  return (
    <main className="min-h-screen bg-slate-100 p-4 md:p-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Administration
            </p>
            <h1 className="mt-1 text-3xl font-bold text-slate-900">
              Order Management
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Manage customer orders and print order documents.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={fetchOrders}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Refresh
            </button>

            <button
              onClick={printAllOrders}
              disabled={!orders.length}
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 disabled:opacity-50"
            >
              Print All Orders
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Total Orders</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              {orders.length}
            </h2>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Pending Orders</p>
            <h2 className="mt-2 text-3xl font-bold text-yellow-600">
              {orders.filter((o) => o.orderStatus === "Pending").length}
            </h2>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">
              Total Order Value (excluding cancelled)
            </p>
            <h2 className="mt-2 text-3xl font-bold text-green-600">
              ৳{totalRevenue.toLocaleString("en-BD")}
            </h2>
          </div>
        </div>

        {/* Search */}
        <div className="mb-5 flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 sm:flex-row">
          <input
            type="text"
            placeholder="Search by order ID, customer name or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500"
          />

          <span className="self-center whitespace-nowrap text-sm text-slate-500">
            {filteredOrders.length} orders found
          </span>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-5 rounded-lg bg-red-50 p-4 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Orders Table */}
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          {loading ? (
            <div className="p-12 text-center text-slate-500">
              Loading orders...
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="p-12 text-center text-slate-500">
              No orders found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                  <tr>
                    <th className="px-5 py-4">Order ID</th>
                    <th className="px-5 py-4">Customer</th>
                    <th className="px-5 py-4">Total</th>
                    <th className="px-5 py-4">Date</th>
                    <th className="px-5 py-4">Status</th>
                    <th className="px-5 py-4">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {filteredOrders.map((order) => (
                    <tr key={order._id} className="hover:bg-slate-50">
                      <td className="px-5 py-4 font-semibold text-slate-900">
                        {order.orderId}
                      </td>

                      <td className="px-5 py-4">
                        <p className="font-semibold text-slate-800">
                          {order.customer?.name}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {order.customer?.phone}
                        </p>
                      </td>

                      <td className="px-5 py-4 font-semibold">
                        ৳{order.total?.toLocaleString("en-BD")}
                      </td>

                      <td className="px-5 py-4 text-slate-500">
                        {formatDate(order.createdAt)}
                      </td>

                      <td className="px-5 py-4">
                        <select
                          value={order.orderStatus}
                          disabled={updating === order.orderId}
                          onChange={(e) =>
                            updateStatus(order.orderId, e.target.value)
                          }
                          className={`rounded-lg border-0 px-3 py-2 text-xs font-semibold outline-none ${
                            statusColors[order.orderStatus] ||
                            "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {STATUSES.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>

                        {updating === order.orderId && (
                          <span className="ml-2 text-xs text-slate-400">
                            Saving...
                          </span>
                        )}
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="rounded-lg bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700 hover:bg-blue-100"
                          >
                            Details
                          </button>

                          <button
                            onClick={() => printSingleOrder(order)}
                            className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200"
                          >
                            Print
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Order Details Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Order Details
                  </h2>
                  <p className="text-sm text-slate-500">
                    {selectedOrder.orderId}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedOrder(null)}
                  className="rounded-lg bg-slate-100 px-3 py-2 text-sm hover:bg-slate-200"
                >
                  Close
                </button>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="rounded-xl bg-slate-50 p-4">
                  <h3 className="mb-3 font-bold">Customer Information</h3>
                  <p className="text-sm">
                    Name: {selectedOrder.customer?.name}
                  </p>
                  <p className="mt-2 text-sm">
                    Phone: {selectedOrder.customer?.phone}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <h3 className="mb-3 font-bold">Shipping Address</h3>
                  <p className="text-sm">
                    {selectedOrder.shippingAddress?.address}
                  </p>
                  <p className="mt-2 text-sm">
                    Area: {selectedOrder.shippingAddress?.area || "-"}
                  </p>
                </div>
              </div>

              <div className="mt-5">
                <h3 className="mb-3 font-bold">Products</h3>

                <div className="overflow-x-auto rounded-xl border border-slate-200">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="p-3 text-left">Product</th>
                        <th className="p-3 text-left">Price</th>
                        <th className="p-3 text-left">Quantity</th>
                        <th className="p-3 text-left">Sizes</th>
                      </tr>
                    </thead>

                    <tbody>
                      {selectedOrder.items?.map((item, index) => (
                        <tr key={index} className="border-t">
                          <td className="p-3">{item.name}</td>
                          <td className="p-3">৳{item.price}</td>
                          <td className="p-3">{item.quantity}</td>
                          <td className="p-3">
                            {item.sizes?.join(", ") || "-"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mt-5 space-y-2 rounded-xl bg-slate-50 p-4 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <strong>৳{selectedOrder.subtotal}</strong>
                </div>

                <div className="flex justify-between">
                  <span>Shipping Charge</span>
                  <strong>৳{selectedOrder.shippingCharge}</strong>
                </div>

                <div className="flex justify-between border-t pt-3 text-base">
                  <strong>Total</strong>
                  <strong className="text-green-600">
                    ৳{selectedOrder.total}
                  </strong>
                </div>

                <div className="flex justify-between pt-2">
                  <span>Payment Method</span>
                  <strong>{selectedOrder.paymentMethod}</strong>
                </div>

                <div className="flex justify-between">
                  <span>Order Status</span>
                  <strong>{selectedOrder.orderStatus}</strong>
                </div>

                <div className="flex justify-between">
                  <span>Order Date</span>
                  <strong>{formatDate(selectedOrder.createdAt)}</strong>
                </div>
              </div>

              <button
                onClick={() => printSingleOrder(selectedOrder)}
                className="mt-5 w-full rounded-lg bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-slate-700"
              >
                Print This Order
              </button>
            </div>
          </div>
        )}

        {/* Print Documents */}
        <div className="print-area">
          {(selectedOrder ? [selectedOrder] : orders).map((order) => (
            <div key={order._id} className="print-order">
              <div className="mb-6 border-b-2 border-black pb-4">
                <h1 className="text-2xl font-bold">DAILY HUT</h1>
                <p className="text-sm">Customer Order Invoice</p>
              </div>

              <div className="mb-5 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p><strong>Order ID:</strong> {order.orderId}</p>
                  <p><strong>Date:</strong> {formatDate(order.createdAt)}</p>
                  <p><strong>Status:</strong> {order.orderStatus}</p>
                </div>

                <div>
                  <p><strong>Customer:</strong> {order.customer?.name}</p>
                  <p><strong>Phone:</strong> {order.customer?.phone}</p>
                  <p>
                    <strong>Address:</strong>{" "}
                    {order.shippingAddress?.address}
                  </p>
                </div>
              </div>

              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    <th className="border border-black p-2 text-left">Product</th>
                    <th className="border border-black p-2">Price</th>
                    <th className="border border-black p-2">Quantity</th>
                    <th className="border border-black p-2">Sizes</th>
                  </tr>
                </thead>

                <tbody>
                  {order.items?.map((item, index) => (
                    <tr key={index}>
                      <td className="border border-black p-2">{item.name}</td>
                      <td className="border border-black p-2 text-center">
                        ৳{item.price}
                      </td>
                      <td className="border border-black p-2 text-center">
                        {item.quantity}
                      </td>
                      <td className="border border-black p-2 text-center">
                        {item.sizes?.join(", ") || "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="ml-auto mt-5 max-w-xs space-y-2 text-sm">
                <p className="flex justify-between">
                  Subtotal: <strong>৳{order.subtotal}</strong>
                </p>
                <p className="flex justify-between">
                  Delivery: <strong>৳{order.shippingCharge}</strong>
                </p>
                <p className="flex justify-between border-t border-black pt-2 text-base">
                  Total: <strong>৳{order.total}</strong>
                </p>
                <p className="flex justify-between">
                  Payment: <strong>{order.paymentMethod}</strong>
                </p>
              </div>

              <p className="mt-10 text-center text-xs">
                Thank you for ordering from Daily Hut.
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        .print-area {
          display: none;
        }

        @media print {
          @page {
            size: A4;
            margin: 15mm;
          }

          body {
            background: white !important;
          }

          body * {
            visibility: hidden;
          }

          .print-area,
          .print-area * {
            visibility: visible;
          }

          .print-area {
            display: block !important;
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            color: black;
            background: white;
          }

          .print-order {
            display: block;
            width: 100%;
            min-height: 240mm;
            padding: 5mm;
            page-break-after: always;
            break-after: page;
          }

          .print-order:last-child {
            page-break-after: auto;
            break-after: auto;
          }

          button,
          input,
          select {
            display: none !important;
          }
        }
      `}</style>
    </main>
  );
}
