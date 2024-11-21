import React from "react";

const HighlightedProduct = ({ product }) => {
  if (!product) {
    return (
      <section className="bg-gray-900 p-8 rounded-xl shadow-md animate-pulse">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="bg-gray-700 w-48 h-48 rounded-lg"></div>
          <div className="flex-1 space-y-4">
            <div className="h-6 bg-gray-700 rounded w-3/4"></div>
            <div className="h-4 bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-700 rounded w-5/6"></div>
            <div className="h-6 bg-gray-700 rounded w-1/4 mt-4"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-900 text-whiteText p-8 rounded-xl shadow-md">
      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* Product Image */}
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-48 h-48 object-cover rounded-lg shadow-md"
        />

        {/* Product Info */}
        <div className="flex-1">
          <h3 className="text-xl font-semibold">{product.title}</h3>
          <p className="text-lightText mt-2">{product.description}</p>
          <p className="text-whiteText mt-4 font-bold">
            ${product.price.toFixed(2)}
          </p>

          {/* Additional Info */}
          <div className="flex items-center gap-4 mt-4">
            {/* Rating */}
            <div className="flex items-center">
              {[...Array(Math.round(product.rating || 0))].map((_, i) => (
                <span key={i} className="text-yellow-500 text-sm">★</span>
              ))}
              {[...Array(5 - Math.round(product.rating || 0))].map((_, i) => (
                <span key={i} className="text-gray-600 text-sm">★</span>
              ))}
            </div>
            <p className="text-lightText text-sm">
              {product.stock} in stock
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-6">
            <button className="bg-roseText text-whiteText px-4 py-2 rounded-lg hover:bg-rose-600 transition">
              Add to Cart
            </button>
            <button className="bg-gray-700 text-whiteText px-4 py-2 rounded-lg hover:bg-gray-600 transition">
              View More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HighlightedProduct;
