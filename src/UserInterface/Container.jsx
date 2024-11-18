import React from "react";
import { twMerge } from "tailwind-merge";

const Container = ({ children, className }) => {
  const newClassName = twMerge(
    "max-w-screen-xl mx-auto py-10 px-6 md:px-10 lg:px-16",
    className
  );
  return <div className={newClassName}>{children}</div>;
};

export default Container;
