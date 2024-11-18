import React, { useState } from "react";
import { WaveCartLogo } from "../assets";
import { IoClose, IoSearchOutline } from "react-icons/io5";
import { FiShoppingBag, FiStar, FiUser } from "react-icons/fi";
import { FaChevronDown } from "react-icons/fa6";
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
  const [searchText, setSearchText] = useState("");

  return (
    <header className="w-full bg-darkText text-white">
      {/* Top Header */}
      <Container className="h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src={WaveCartLogo} alt="logo" className="w-12" />
          <p className="text-2xl font-bold tracking-wide text-white hover:text-roseText duration-200">
            WaveCart
          </p>
        </div>

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
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-400 hover:text-roseText cursor-pointer"
            />
          ) : (
            <IoSearchOutline className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-400" />
          )}
        </div>

        {/* Menu Icons */}
        <div className="flex items-center gap-6">
          <FiUser className="hover:text-roseText cursor-pointer" />
          <div className="relative">
            <FiStar className="hover:text-roseText cursor-pointer" />
            <span className="absolute -top-1 -right-2 bg-roseText text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
              0
            </span>
          </div>
          <div className="relative">
            <FiShoppingBag className="hover:text-roseText cursor-pointer" />
            <span className="absolute -top-1 -right-2 bg-roseText text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
              0
            </span>
          </div>
        </div>
      </Container>

      {/* Bottom Navigation */}
      <div className="bg-gray-900">
        <Container className="flex items-center justify-between">
          <p className="flex items-center gap-2 cursor-pointer hover:text-roseText">
            Select Category <FaChevronDown />
          </p>
          <nav className="hidden md:flex gap-6">
            {bottomNavigation.map(({ title, link }) => (
              <a
                key={title}
                href={link}
                className="text-sm uppercase font-semibold text-gray-300 hover:text-white relative group"
              >
                {title}
                <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-roseText group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>
        </Container>
      </div>
    </header>
  );
};

export default Header;
