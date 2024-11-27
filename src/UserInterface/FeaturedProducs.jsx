import React from "react";
import { Link } from "react-router-dom";

const FeaturedProducts = ({ products }) => {
  // Select a subset of featured products (e.g., first 6)
  const displayedProducts = products.slice(0, 6);

  return (
    <section className="p-6 bg-gray-900 rounded-xl shadow-md mt-5">
      <h2 className="text-whiteText text-2xl font-bold mb-4 text-center">
        Featured Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {displayedProducts.map((product) => (
          <div
            key={product.id}
            className="bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300"
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-lg font-semibold text-whiteText mb-2">
              {product.title}
            </h3>
            <p className="text-lightText mb-2">
              ${product.price.toFixed(2)} |{" "}
              <span className="text-yellow-400">
                {product.rating.toFixed(1)} ⭐
              </span>
            </p>
            <div className="flex gap-2">
              <button
                className="bg-roseText text-whiteText py-2 px-4 rounded-lg hover:bg-rose-600 transition"
              >
                Add to Cart
              </button>
              <Link
                to={`/product/${product.id}`}
              >
                <button
                  className="bg-gray-700 text-whiteText py-2 px-4 rounded-lg hover:bg-gray-600 transition"
                >
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
