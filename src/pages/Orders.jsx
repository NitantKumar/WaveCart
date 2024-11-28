import React from "react";
import { useSelector } from "react-redux";

const Orders = () => {
  const orders = useSelector((state) => state.orders.orders); 

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Your Orders</h1>
      {orders.length === 0 ? (
        <div className="flex flex-col items-center my-5">
          <p className="text-gray-500 text-xl my-5">
            You haven't placed any orders yet. Start shopping now!
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {orders.map((order, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-lg p-4 shadow-sm bg-gray-900 text-roseText"
            >
              <h2 className="text-xl font-semibold mb-2">
                Order #{index + 1}
              </h2>
              <p className="text-gray-400 mb-2">
                <span className="font-semibold">Total Amount:</span> ${order.totalAmount.toFixed(2)}
              </p>
              <p className="text-gray-400">
                <span className="font-semibold">Items:</span>{" "}
                {order.productTitles.join(", ")}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
