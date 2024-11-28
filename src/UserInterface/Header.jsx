import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoriesThunk } from "../store/categorySlice";
import { WaveCartLogo } from "../assets";
import { IoClose, IoSearchOutline } from "react-icons/io5";
import { FiShoppingBag, FiStar, FiUser } from "react-icons/fi";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import Container from "./Container";
import useDebounce from '../hooks/useDebounce.js'
import { searchProducts } from '../constants/apis.js'

const bottomNavigation = [
  { title: "Home", link: "/" },
  { title: "Shop", link: "/product" },
  { title: "Cart", link: "/cart" },
  { title: "Orders", link: "/orders" },
  { title: "My Account", link: "/account" },
  { title: "Blog", link: "/blog" },
];

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const defaultCategory = { name: "All Categories", slug: "" };
  const { data: categories, status } = useSelector((store) => store.categories);

  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchDropdown, setShowSearchDropDown] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(defaultCategory);

  const debouncedSearchText = useDebounce(searchText, 1000);

  const cartItems = useSelector((store) => store.cart.items);
  const cartSize = cartItems.reduce((total, item) => total + item.quantity, 0);
  const favoriteSize = useSelector((store) => store.favorites.items).length;

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCategoriesThunk());
    }
  }, [dispatch, status]);

  useEffect(() => {
    const currentPath = location.pathname;
    const matchedCategory =
      categories.find((category) => `/category/${category.slug}` === currentPath) || defaultCategory;

    setSelectedCategory(matchedCategory);
  }, [location, categories]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setShowDropDown(false);
    navigate(category.slug ? `/category/${category.slug}` : "/category/all");
  };

  useEffect(() => {
    (async () => {
      if (debouncedSearchText) {
        try {
          const results = await searchProducts(debouncedSearchText);
          setSearchResults(results.products || []);
          setShowSearchDropDown(true);
        } catch (error) {
          console.error("Error fetching search results:", error);
        }
      } else {
        setSearchResults([]);
        setShowSearchDropDown(false);
      }
    })();
  }, [debouncedSearchText]);

  const handleResultClick = (productId) => {
    setSearchText("");
    setSearchResults([]);
    setShowSearchDropDown(false);
    navigate(`/product/${productId}`);
  };

  const handleSearchCancel = () => {
    setSearchText("");
    setSearchResults([]);
    setShowSearchDropDown(false);
  };

  return (
    <header className="w-full bg-darkText text-white border-b-2 border-black/10 shadow-sm">
      {/* Top Header */}
      <Container className="h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to={"/"}>
          <div className="flex items-center gap-2">
            <img src={WaveCartLogo} alt="logo" className="w-12" />
            <p className="text-2xl font-bold tracking-wide text-white hover:text-roseText duration-300">
              WaveCart
            </p>
          </div>
        </Link>

        {/* Search Bar */}
        <div className="relative flex-1 max-w-xl mx-auto mt-4">
        <input
          type="text"
          placeholder="Search Products"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-roseText"
        />
        {searchText ? (
          <IoClose
            onClick={() => handleSearchCancel()}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-400 hover:text-roseText duration-300 cursor-pointer"
          />
        ) : (
          <IoSearchOutline className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-400" />
        )}

        {/* Dropdown for search results */}
        {showSearchDropdown && (
          <ul className="absolute z-10 top-full left-0 w-full bg-gray-900 text-white rounded-lg shadow-lg max-h-60 overflow-y-auto mt-2">
            {searchResults.length > 0 ? (
              searchResults.map((product) => (
                <li
                  key={product.id}
                  onClick={() => handleResultClick(product.id)}
                  className="p-3 hover:bg-gray-700 cursor-pointer"
                >
                  {product.title}
                </li>
              ))
            ) : (
              <li className="p-3 text-gray-400">No results found</li>
            )}
          </ul>
        )}
      </div>

        {/* Menu Icons */}
        <div className="flex items-center gap-6">
          <Link to={"/account"}>
            <FiUser className="hover:text-roseText duration-300 cursor-pointer" />
          </Link>
          <Link to={"/favorite"}>
            <div className="relative">
              <FiStar className="hover:text-roseText duration-300 cursor-pointer" />
              <span className="absolute -top-1 -right-2 bg-roseText text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                {favoriteSize}
              </span>
            </div>
          </Link>
          <Link to={"/cart"}>
            <div className="relative">
              <FiShoppingBag className="hover:text-roseText duration-300 cursor-pointer" />
              <span className="absolute -top-1 -right-2 bg-roseText text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                {cartSize}
              </span>
            </div>
          </Link>
        </div>
      </Container>

      {/* Bottom Navigation */}
      <div className="bg-gray-900">
        <Container className="flex items-center justify-between">
          <div
            className="relative flex items-center gap-2 cursor-pointer hover:text-roseText duration-300"
            onClick={() => setShowDropDown(!showDropDown)}
            role="button"
            aria-haspopup="true"
            aria-expanded={showDropDown}
          >
            <p>{selectedCategory.name}</p>
            {showDropDown ? <FaChevronUp /> : <FaChevronDown />}
            {showDropDown && (
              <ul className="absolute top-full left-0 mt-2 bg-gray-900 text-white rounded-lg shadow-lg p-3 z-10 max-h-60 overflow-y-auto">
                <li
                  onClick={() => handleCategorySelect(defaultCategory)}
                  className={`py-1 px-3 hover:bg-gray-700 rounded cursor-pointer whitespace-nowrap ${selectedCategory.slug === "" ? "bg-gray-700" : ""
                    }`}
                >
                  All Categories
                </li>
                {status === "loading" && <li>Loading...</li>}
                {status === "succeeded" &&
                  categories.map((category) => (
                    <li
                      key={category.slug}
                      onClick={() => handleCategorySelect(category)}
                      className={`py-1 px-3 hover:bg-gray-700 rounded cursor-pointer whitespace-nowrap ${selectedCategory.slug === category.slug ? "bg-gray-700" : ""
                        }`}
                    >
                      {category.name}
                    </li>
                  ))}
              </ul>
            )}
          </div>

          <nav className="hidden md:flex gap-6">
            {bottomNavigation.map(({ title, link }) => (
              <Link
                to={link}
                key={title}
                className="text-sm uppercase font-semibold text-gray-300 hover:text-white relative group"
              >
                {title}
                <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-roseText group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>
        </Container>
      </div>
    </header>
  );
};

export default Header;
