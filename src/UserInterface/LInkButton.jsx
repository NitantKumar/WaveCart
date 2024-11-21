import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

const LinkButton = ({ showButton, link, className }) => {
  const newClassName = twMerge(
    "bg-roseText hover:bg-roseText/80 text-whiteText py-2.5 px-6 rounded-full flex items-center gap-2 duration-200",
    className
  );

  return (
    <Link to={link || "/products"} className={newClassName}>
      {showButton && <FaArrowLeft />} Start Shopping
    </Link>
  );
};

export default LinkButton;