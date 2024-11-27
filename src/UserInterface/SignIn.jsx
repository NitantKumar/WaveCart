import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase.js";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignIn = () => {
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const displayTemporaryError = (message) => {
        setError(message);
        setTimeout(() => setError(''), 3000);
    };

    // Validation schema using Yup
    const schema = yup.object().shape({
        email: yup
            .string()
            .required("Email is required")
            .email("Enter a valid email address."),
        password: yup.string().required("Password is required"),
    });

    // React Hook Form setup
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
    });

    // Form submission handler
    const onSubmit = async (data) => {
        console.log(data);
        const { email, password } = data;

        try {
            // Firebase Login
            const userCredential = await signInWithEmailAndPassword(auth, email, password);

            // Dispatch user info to Redux store
            dispatch(
                addUser({
                    uid: userCredential.user.uid,
                    email: userCredential.user.email,
                    displayName: userCredential.user.displayName || "User",
                })
            );

            // Reset form after successful login
            reset();
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            displayTemporaryError(errorCode + ": " + errorMessage);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center bg-gray-900">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-gray-800 p-8 rounded-sm w-full max-w-sm text-gray-200"
            >
                <h2 className="text-2xl font-bold text-center mb-6 text-rose-400">Log In</h2>

                {/* Email Field */}
                <div className="mb-4">
                    <label className="block font-medium mb-2" htmlFor="email">
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        className={`w-full p-2 bg-gray-700 border rounded-lg text-gray-200 focus:outline-none focus:ring ${errors.email ? "border-rose-500 focus:ring-rose-400" : "border-gray-600 focus:ring-blue-500"
                            }`}
                        {...register("email")}
                    />
                    {errors.email && (
                        <p className="text-rose-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                </div>

                {/* Password Field */}
                <div className="mb-4 relative">
                    <label className="block font-medium mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        className={`w-full p-2 bg-gray-700 border rounded-lg text-gray-200 focus:outline-none focus:ring ${errors.password ? "border-rose-500 focus:ring-rose-400" : "border-gray-600 focus:ring-blue-500"
                            }`}
                        {...register("password")}
                    />
                    <button
                        type="button"
                        className="absolute top-11 right-2 flex items-center text-gray-400"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                    {errors.password && (
                        <p className="text-rose-500 text-sm mt-1">{errors.password.message}</p>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-rose-500 text-white py-2 rounded-lg hover:bg-rose-600 transition duration-200"
                >
                    Log In
                </button>
            </form>
            <p className="bg-gray-800 text-roseText">{error}</p>
        </div>
    );
};

export default SignIn;
