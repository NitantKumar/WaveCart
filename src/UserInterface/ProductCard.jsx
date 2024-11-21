const ProductCard = ({ product }) => {
    const discountPrice = product.discountPercentage
      ? product.price - (product.price * product.discountPercentage) / 100
      : product.price;
  
    return (
      <div className="rounded shadow-md bg-gray-900 p-4 text-white">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-48 object-cover mb-4"
        />
        <h3 className="text-lg font-bold">{product.title}</h3>
  
        <div className="flex items-center mb-2">
          {/* Displaying Rating */}
          <span className="text-yellow-500 mr-2">
            {Array.from({ length: 5 }, (_, index) => (
              <svg
                key={index}
                xmlns="http://www.w3.org/2000/svg"
                fill={index < product.rating ? "currentColor" : "none"}
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-4 h-4 inline-block"
              >
                <path
                  fillRule="evenodd"
                  d="M12 17.618l-5.485 3.03 1.048-5.62L2 8.547l5.657-.492L12 2l2.343 5.055L20 8.547l-5.563 6.481 1.048 5.62L12 17.618z"
                />
              </svg>
            ))}
          </span>
          {/* Displaying Rating Value */}
          <span className="text-sm text-gray-300">{product.rating}</span>
        </div>
  
        <div className="mb-4">
          {/* Price Display */}
          {product.discountPercentage ? (
            <div className="flex items-baseline gap-2">
              <p className="text-gray-500 line-through text-sm">
                ${product.price.toFixed(2)}
              </p>
              <p className="text-roseText text-lg font-bold">
                ${discountPrice.toFixed(2)}
              </p>
              <span className="text-xs text-gray-300">
                ({product.discountPercentage.toFixed(0)}% off)
              </span>
            </div>
          ) : (
            <p className="text-rose-500 text-lg font-bold">
              ${product.price.toFixed(2)}
            </p>
          )}
        </div>
  
        <div className="flex justify-between items-center">
          {/* Add to Cart and View More buttons */}
          <div className="flex justify-between items-center gap-2">
            <button className="bg-rose-500 text-white py-1 px-3 rounded hover:bg-rose-600">
              Add to Cart
            </button>
            <button className="border border-rose-500 text-rose-500 py-1 px-3 rounded hover:bg-rose-500 hover:text-white">
              View More
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default ProductCard;
  