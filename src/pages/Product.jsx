import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchSingleProduct } from "../constants/apis";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5; // Number of reviews per page

  useEffect(() => {
    if (!id) {
      setError("Invalid product ID");
      setLoading(false);
      return;
    }

    (async () => {
      try {
        setLoading(true);
        const response = await fetchSingleProduct(id);
        setProduct(response);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  // Paginate reviews based on the current page
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = product ? product.reviews.slice(indexOfFirstReview, indexOfLastReview) : [];

  // Handle pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Render stars for rating
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;

    return (
      <>
        {[...Array(fullStars)].map((_, index) => (
          <span key={`full-${index}`} className="text-yellow-400">&#9733;</span>
        ))}
        {[...Array(halfStars)].map((_, index) => (
          <span key={`half-${index}`} className="text-yellow-400">&#9733;</span>
        ))}
        {[...Array(emptyStars)].map((_, index) => (
          <span key={`empty-${index}`} className="text-gray-500">&#9733;</span>
        ))}
      </>
    );
  };

  return (
    <div className="bg-gray-900 text-whiteText min-h-screen p-6">
      <div className="max-w-5xl mx-auto bg-gray-800 p-6 rounded-lg shadow-md">
        {/* Product Title */}
        {loading ? (
          // Shimmer Effect for Loading
          <div className="space-y-4">
            <div className="h-10 bg-gray-700 animate-pulse rounded w-3/4"></div>
            <div className="h-4 bg-gray-700 animate-pulse rounded w-full"></div>
            <div className="h-6 bg-gray-700 animate-pulse rounded w-1/3"></div>
            <div className="h-4 bg-gray-700 animate-pulse rounded w-1/2"></div>
          </div>
        ) : (
          <>
            <h1 className="text-4xl font-bold text-roseText mb-4">{product.title}</h1>
            <p className="text-lightText mb-4">{product.description}</p>

            {/* Price, Rating, Stock, Add to Cart */}
            <div className="flex justify-between items-center mb-6">
              {/* Left side: Price, Rating, Stock */}
              <div>
                <p className="text-xl font-semibold text-greenText mb-2">Price: ${product.price}</p>
                <div className="flex items-center mb-2">
                  <div className="mr-2">{renderStars(product.rating)}</div>
                  <span className="text-lightText">({product.reviews.length} Reviews)</span>
                </div>
                <p className="text-lightText">Stock: {product.availabilityStatus}</p>
              </div>

              {/* Right side: Add to Cart button */}
              <button className="bg-roseText hover:bg-rose-600 text-white font-bold py-2 px-4 rounded">
                Add to Cart
              </button>
            </div>

            {/* Product Images */}
            <div className="mt-6">
              <h3 className="text-roseText text-2xl mb-2">Images:</h3>
              <div className="flex gap-4 overflow-x-auto">
                {/* Thumbnail */}
                <div className="relative h-48 w-48 rounded-lg border-2 border-roseText flex-shrink-0">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="h-full w-full object-cover rounded-lg z-10"
                  />
                  <div className="absolute top-1 left-1 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-30">
                    Thumbnail
                  </div>
                </div>
                {/* Additional Images */}
                {product.images.map((image, index) => (
                  <div
                    key={index}
                    className={`relative h-48 w-48 rounded-lg flex-shrink-0 border-2 ${index % 2 === 1 ? 'border-roseText' : 'border-skyText'
                      }`}
                  >
                    <img
                      src={image}
                      alt={`${product.title} ${index}`}
                      className="h-full w-full object-cover rounded-md"
                    />
                    {/* Image Index Overlay */}
                    <div className="absolute top-1 left-1 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-30">
                      {`Image ${index + 1}`}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews Section */}
            <div className="mt-8">
              <h3 className="text-roseText text-2xl mb-4">Reviews:</h3>
              {currentReviews.length ? (
                <div className="space-y-4">
                  {currentReviews.map((review, index) => (
                    <div key={index} className="bg-gray-700 p-4 rounded-lg shadow-md">
                      <p className="text-lightText">
                        <strong className="text-roseText">{review.reviewerName}</strong>:{" "}
                        {review.comment}
                      </p>
                      <p className="text-greenText">Rating: {renderStars(review.rating)}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-lightText">No reviews available.</p>
              )}

              {/* Pagination for reviews */}
              <div className="flex justify-center mt-4 items-center">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  className={`px-4 py-2 bg-gray-700 text-white rounded-lg mr-2 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>

                {/* Page Number */}
                <span className="text-lightText mx-4">{`Page ${currentPage}`}</span>

                <button
                  onClick={() => paginate(currentPage + 1)}
                  className={`px-4 py-2 bg-gray-700 text-white rounded-lg ml-2 ${indexOfLastReview >= product.reviews.length ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={indexOfLastReview >= product.reviews.length}
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Product;
