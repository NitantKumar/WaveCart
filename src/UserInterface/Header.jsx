import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoriesThunk } from "../store/categorySlice";
import { WaveCartLogo } from "../assets";
import { IoClose, IoSearchOutline } from "react-icons/io5";
import { FiShoppingBag, FiStar, FiUser } from "react-icons/fi";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import Container from "./Container";

const bottomNavigation = [
  { title: "Home", link: "/" },
  { title: "Shop", link: "/product" },
  { title: "Cart", link: "/cart" },
  { title: "Orders", link: "/orders" },
  { title: "My Account", link: "/profile" },
  { title: "Blog", link: "/blog" },
];

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const defaultCategory = { name: "All Categories", slug: "" };
  const { data: categories, status } = useSelector((store) => store.categories);

  const [searchText, setSearchText] = useState("");
  const [showDropDown, setShowDropDown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(defaultCategory);

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

  return (
    <header className="w-full bg-darkText text-white">
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
        <div className="relative flex-1 max-w-xl">
          <input
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
            type="text"
            placeholder="Search Products"
            className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-roseText"
          />
          {searchText ? (
            <IoClose
              onClick={() => setSearchText("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-400 hover:text-roseText duration-300 cursor-pointer"
            />
          ) : (
            <IoSearchOutline className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-400" />
          )}
        </div>

        {/* Menu Icons */}
        <div className="flex items-center gap-6">
          <Link to={"/profile"}>
            <FiUser className="hover:text-roseText duration-300 cursor-pointer" />
          </Link>
          <Link to={"/favorite"}>
            <div className="relative">
              <FiStar className="hover:text-roseText duration-300 cursor-pointer" />
              <span className="absolute -top-1 -right-2 bg-roseText text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                0
              </span>
            </div>
          </Link>
          <Link to={"/cart"}>
            <div className="relative">
              <FiShoppingBag className="hover:text-roseText duration-300 cursor-pointer" />
              <span className="absolute -top-1 -right-2 bg-roseText text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                0
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
