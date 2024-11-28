import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItem, decreaseQuantity } from "../store/cartSlice";
import { add, remove } from "../store/favoriteSlice"; 
import { toast } from "react-toastify";
import { FaStar } from "react-icons/fa";

const ProductCard = ({ product }) => {
  const discountPrice = product.discountPercentage
    ? product.price - (product.price * product.discountPercentage) / 100
    : product.price;
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((store) => store.user.isLoggedIn);
  const cartItems = useSelector((state) => state.cart.items);
  const favoriteItems = useSelector((state) => state.favorites.items);

  const getQuantity = (id) => {
    const item = cartItems.find((item) => item.id === id);
    return item ? item.quantity : 0;
  };

  const isFavorite = (id) => favoriteItems.some((item) => item.id === id);

  const quantity = getQuantity(product.id);

  const handleAddToCart = (product) => {
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
    <div className="relative rounded shadow-md bg-gray-900 p-4 text-white">
      {/* Favorite Button */}
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

      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-48 object-cover mb-4"
      />
      <h3 className="text-lg font-bold">{product.title}</h3>

      <div className="flex items-center mb-2">
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
        <span className="text-sm text-gray-300">{product.rating}</span>
      </div>

      <div className="mb-4">
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
        <div className="flex justify-between items-center gap-2">
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
            <button className="border border-rose-500 text-rose-500 py-1 px-3 rounded hover:bg-rose-500 hover:text-white">
              View More
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
