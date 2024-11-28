import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addItem, decreaseQuantity, removeItem, clearCart } from "../store/cartSlice";
import { addOrder } from "../store/orderSlice";
import { FiTrash2 } from "react-icons/fi";
import { toast } from 'react-toastify';

const Cart = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      toast.error("You are not logged in! Please Log in to use the cart");
      navigate("/account");
    }
  }, [isLoggedIn, navigate]);

  // Early return to avoid rendering the cart UI for unauthenticated users
  if (!isLoggedIn) {
    return null;
  }

  const dispatch = useDispatch();
  const cartItems = useSelector((store) => store.cart.items);

  const handleAddItem = (item) => {
    if (item.stock <= item.quantity) {
      toast.error("Cannot add more than available stock!");
    } else {
      const updatedItem = {
        ...item,
        quantity: 1,
      };
      dispatch(addItem(updatedItem));
    }
  };

  const handleDecreaseItem = (item) => {
    dispatch(decreaseQuantity({ id: item.id }));
  };

  const handleRemoveItem = (item) => {
    dispatch(removeItem({ id: item.id }));
  }

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear the cart?')) {
      dispatch(clearCart());
    }
  }

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + ((item.price - (item.price * (item.discountPercentage || 0) / 100)) * item.quantity),
      0
    );
  };

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    if (window.confirm("Are you sure you want to place this order?")) {
      const totalAmount = calculateTotal();
      const productTitles = cartItems.map((item) => item.title);

      dispatch(addOrder({ totalAmount: parseFloat(totalAmount), productTitles }));

      dispatch(clearCart());

      toast.success("Order placed successfully!");

      // Rickroll the user
      const newTab = window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank");
      if (newTab) newTab.focus();

      navigate('/orders');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {cartItems.length === 0 ? (
        <div className='flex flex-col items-center my-5'>
          <p className="text-gray-500 text-xl my-5">Your cart is empty. Start shopping!</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 my-5 bg-rose-500 text-white rounded-md shadow hover:bg-rose-600"
          >
            Shop now!
          </button>
        </div>
      ) : (
        <>
          <div className="grid gap-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center border border-gray-300 rounded-lg p-4 shadow-sm bg-white"
              >
                {/* Thumbnail */}
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-24 h-24 object-cover rounded-md"
                />
                {/* Details */}
                <div className="flex flex-1 flex-col ml-4">
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <div className="text-sm text-gray-500 line-through">
                    ${item.price}
                  </div>
                  <div className="text-lg font-bold text-roseText">
                    ${(item.price - (item.price * (item.discountPercentage / 100))).toFixed(2)}
                  </div>
                </div>
                {/* Quantity Controls */}
                <div className="flex items-center gap-2">
                  <button
                    className="px-2 py-1 border rounded bg-gray-200 hover:bg-gray-300 text-gray-800"
                    onClick={() => handleDecreaseItem(item)}
                  >
                    -
                  </button>
                  <span className="px-4">{item.quantity}</span>
                  <button
                    className="px-2 py-1 border rounded bg-gray-200 hover:bg-gray-300 text-gray-800"
                    onClick={() => handleAddItem(item)}
                  >
                    +
                  </button>
                </div>
                {/* Remove Item */}
                <button
                  className="ml-4 text-gray-500 hover:text-rose-500"
                  onClick={() => handleRemoveItem(item)}
                >
                  <FiTrash2 size={20} />
                </button>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center mt-6">
            <button
              className="px-6 py-2 bg-rose-500 text-white rounded-md shadow hover:bg-rose-600"
              onClick={() => handleClearCart()}
            >
              Clear Cart
            </button>
            <div className="flex flex-col items-end">
              <p className="text-lg font-semibold text-roseText mb-5">Total: ${calculateTotal().toFixed(2)}</p>
              <button
                className="px-6 py-2 bg-green-500 text-white rounded-md shadow hover:bg-green-600"
                onClick={() => handlePlaceOrder()}
              >
                Place Order
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
