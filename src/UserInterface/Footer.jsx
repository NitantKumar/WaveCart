import React from "react";
import Container from "./Container";
import { FiTruck, FiShield, FiRefreshCw } from "react-icons/fi";

const Footer = () => {
  const incentives = [
    {
      name: "Fast Shipping",
      icon: <FiTruck className="h-10 w-10 text-rose-500" />,
      description: "Get your orders delivered quickly with our priority shipping service.",
    },
    {
      name: "Secure Payments",
      icon: <FiShield className="h-10 w-10 text-rose-500" />,
      description: "Shop confidently with encrypted and safe payment options.",
    },
    {
      name: "Easy Returns",
      icon: <FiRefreshCw className="h-10 w-10 text-rose-500" />,
      description: "Not satisfied? Return within 30 days for a hassle-free process.",
    },
  ];

  return (
    <footer className="bg-gray-900 w-full">
      <Container className="p-0">
        <div className="rounded-2xl bg-gray-900 px-6 py-16 sm:p-16">
          <div className="mx-auto max-w-xl lg:max-w-none">
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                Why Shop With Us?
              </h2>
              <p className="mt-4 text-sm text-gray-400">
                Our commitment to quality and service sets us apart.
              </p>
            </div>
          </div>
          <div className="mx-auto mt-12 grid max-w-sm grid-cols-1 gap-8 sm:max-w-none lg:grid-cols-3">
            {incentives.map((item) => (
              <div
                key={item.name}
                className="text-center sm:flex sm:text-left lg:block lg:text-center"
              >
                <div className="sm:flex-shrink-0">
                  <div className="flex justify-center">{item.icon}</div>
                </div>
                <div className="mt-3 sm:ml-6 lg:ml-0">
                  <h3 className="text-lg font-medium text-white">{item.name}</h3>
                  <p className="mt-2 text-sm text-gray-400">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
