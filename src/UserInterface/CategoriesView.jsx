import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CategoriesView = () => {
    const categories = useSelector((state) => state.categories.data);
    const navigate = useNavigate();

    if (!categories || categories.length === 0) {
        return (
            <section className="p-6 bg-gray-900 rounded-xl shadow-md mt-5">
                <h2 className="text-whiteText text-2xl font-bold mb-4 text-center">Categories</h2>
                <div className="flex items-center justify-center">
                    <p className="text-lightText">Loading categories...</p>
                </div>
            </section>
        );
    }

    return (
        <section className="p-6 bg-gray-900 rounded-xl shadow-md mt-5">
            <h2 className="text-whiteText text-2xl font-bold mb-4 text-center">Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {categories.map((category) => (
                    <div
                        key={category.slug}
                        onClick={() => navigate(`/category/${category.slug}`)}
                        className="cursor-pointer bg-roseText text-whiteText px-6 py-4 rounded-lg hover:bg-rose-600 hover:shadow-lg transition duration-300"
                    >
                        <h3 className="text-lg font-semibold text-center capitalize">
                            {category.name}
                        </h3>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CategoriesView;
