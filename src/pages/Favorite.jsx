import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clear } from "../store/favoriteSlice.js";
import ProductCard from "../UserInterface/ProductCard.jsx"; // Assuming the ProductCard is in the components folder
import { toast } from "react-toastify";

const Favorite = () => {
  const dispatch = useDispatch();
  const favoriteItems = useSelector((state) => state.favorites.items);

  const handleClearFavorites = () => {
    if (favoriteItems.length === 0) {
      toast.warning("No favorite items to clear!");
      return;
    }

    dispatch(clear());
    toast.success("All favorite items cleared!");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-roseText">Your Favorites</h1>
          <button
            onClick={handleClearFavorites}
            className="bg-roseText text-white px-4 py-2 rounded-lg hover:bg-rose-600 transition"
          >
            Clear All Favorites
          </button>
        </div>

        {favoriteItems.length === 0 ? (
          <p className="text-center text-gray-400">No favorite items found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {favoriteItems.map((product) => (
              <div className="border-[1px] border-roseText p-1 rounded-lg">
                <ProductCard key={product.id} product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorite;
