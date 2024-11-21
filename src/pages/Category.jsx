import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Container from "../UserInterface/Container.jsx";
import ProductCard from "../UserInterface/ProductCard.jsx";
import { fetchAllProducts, fetchProductsByCategory } from "../constants/apis.js";
import ShimmerPlaceholder from "../UserInterface/ShimmerPlaceholder.jsx";

const ITEMS_PER_PAGE = 12;

const Category = () => {
  const { id } = useParams(); // 'id' is the category id or "all"
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState("price"); // Default sorting by price
  const [sortOrder, setSortOrder] = useState("asc"); // Default ascending order

  const fetchProducts = async (page = 1) => {
    setIsLoading(true);

    try {
      const skip = (page - 1) * ITEMS_PER_PAGE;
      if (id === "all") {
        const response = await fetchAllProducts(ITEMS_PER_PAGE, skip, sortBy, sortOrder);
        setProducts(response.products);
        setTotalProducts(response.total);
      } else {
        const response = await fetchProductsByCategory(id, ITEMS_PER_PAGE, skip, sortBy, sortOrder);
        setProducts(response.products);
        setTotalProducts(response.products.length);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [id, currentPage, sortBy, sortOrder]);

  const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSortChange = (event) => {
    const [newSortBy, newSortOrder] = event.target.value.split("|");
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
  };

  return (
    <Container>
      <h1 className="text-2xl font-bold mb-6 text-center capitalize">
        {id === "all" ? "All Products" : `${id} Products`}
      </h1>

      {/* Sorting Dropdown */}
      <div className="mb-6 flex items-center">
        <label
          htmlFor="sort"
          className="text-lg font-medium text-white bg-gray-900 px-4 rounded-l-xl h-12 flex items-center"
        >
          Sort By:
        </label>
        <select
          id="sort"
          onChange={handleSortChange}
          className="px-4 border-0 rounded-r-xl bg-gray-900 text-white hover:text-roseText transition duration-200 ease-in-out h-12 flex items-center"
        >
          <option value="price|asc">Price (Low to High)</option>
          <option value="price|desc">Price (High to Low)</option>
          <option value="rating|asc">Rating (Low to High)</option>
          <option value="rating|desc">Rating (High to Low)</option>
          <option value="discount|asc">Discount (Low to High)</option>
          <option value="discount|desc">Discount (High to Low)</option>
        </select>
      </div>



      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: ITEMS_PER_PAGE }, (_, i) => (
            <ShimmerPlaceholder key={i} />
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="mt-8 flex justify-center items-center gap-2">
            <button
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded ${currentPage === 1 ? "bg-gray-200 text-gray-500" : "bg-gray-300 text-gray-900"}`}
            >
              &laquo; {/* << */}
            </button>

            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded ${currentPage === 1 ? "bg-gray-200 text-gray-500" : "bg-gray-300 text-gray-900"}`}
            >
              &lt; {/* < */}
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`px-4 py-2 rounded ${currentPage === i + 1 ? "bg-rose-500 text-white" : "bg-gray-200 text-gray-800"}`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded ${currentPage === totalPages ? "bg-gray-200 text-gray-500" : "bg-gray-300 text-gray-900"}`}
            >
              &gt; {/* > */}
            </button>

            <button
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded ${currentPage === totalPages ? "bg-gray-200 text-gray-500" : "bg-gray-300 text-gray-900"}`}
            >
              &raquo; {/* >> */}
            </button>
          </div>
        </>
      )}
    </Container>
  );
};

export default Category;
