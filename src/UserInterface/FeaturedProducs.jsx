import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItem, decreaseQuantity } from "../store/cartSlice";
import { add, remove } from "../store/favoriteSlice"; 
import { toast } from "react-toastify";
import { FaStar } from "react-icons/fa"; 

const FeaturedProducts = ({ products }) => {
  const displayedProducts = products.slice(0, 6);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((store) => store.user.isLoggedIn);
  const cartItems = useSelector((state) => state.cart.items);
  const favoriteItems = useSelector((state) => state.favorites.items);

  const getQuantity = (id) => {
    const item = cartItems.find((item) => item.id === id);
    return item ? item.quantity : 0;
  };

  const isFavorite = (id) => {
    return favoriteItems.some((item) => item.id === id);
  };

  const handleAddToCart = (product) => {
    const quantity = getQuantity(product.id);
    if (!isLoggedIn) {
      toast.error("Please log in to add items to the cart!");
    } else if (product.stock <= quantity) {
      toast.error("Cannot add more than available stock!");
    } else {
      dispatch(
        addItem({
          id: product.id,
          title: product.title,
          price: product.price,
          stock: product.stock,
          thumbnail: product.thumbnail,
          discountPercentage: product.discountPercentage,
        })
      );
    }
  };

  const handleRemoveFromCart = (product) => {
    dispatch(decreaseQuantity({ id: product.id }));
  };

  const handleToggleFavorite = (product) => {
    if (!isLoggedIn) {
      toast.error("Please log in to add items to favorites!");
      return;
    }

    if (isFavorite(product.id)) {
      dispatch(remove({ id: product.id }));
    } else {
      dispatch(add(product));
    }
  };

  return (
    <section className="p-6 bg-gray-900 rounded-xl shadow-md mt-5">
      <h2 className="text-whiteText text-2xl font-bold mb-4 text-center">
        Featured Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {displayedProducts.map((product) => {
          const quantity = getQuantity(product.id);

          return (
            <div
              key={product.id}
              className="relative bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300"
            >
              {/* Favorite Star */}
              <button
                onClick={() => handleToggleFavorite(product)}
                className={`absolute top-2 right-2 text-2xl ${
                  isFavorite(product.id)
                    ? "text-roseText"
                    : "text-gray-400 hover:text-rose-400"
                }`}
              >
                <FaStar />
              </button>

              {/* Product Thumbnail */}
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />

              {/* Product Details */}
              <h3 className="text-lg font-semibold text-whiteText mb-2">
                {product.title}
              </h3>
              <p className="text-lightText mb-2">
                ${product.price.toFixed(2)} |{" "}
                <span className="text-yellow-400">
                  {product.rating.toFixed(1)} ⭐
                </span>
              </p>

              {/* Cart Controls */}
              <div className="flex gap-2">
                {isLoggedIn && quantity > 0 ? (
                  <div className="flex items-center">
                    <button
                      onClick={() => handleRemoveFromCart(product)}
                      className="bg-gray-700 text-whiteText py-2 px-3 rounded-lg hover:bg-gray-600 transition"
                    >
                      -
                    </button>
                    <span className="px-2 text-whiteText mx-2">{quantity}</span>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="bg-roseText text-whiteText py-2 px-3 rounded-lg hover:bg-rose-600 transition"
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-roseText text-whiteText py-2 px-4 rounded-lg hover:bg-rose-600 transition"
                  >
                    Add to Cart
                  </button>
                )}
                <Link to={`/product/${product.id}`}>
                  <button
                    className="bg-gray-700 text-whiteText py-2 px-4 ml-2 rounded-lg hover:bg-gray-600 transition"
                  >
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FeaturedProducts;
