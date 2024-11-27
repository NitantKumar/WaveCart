import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../store/userSlice";
import { getAuth } from "firebase/auth";

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const auth = getAuth();
  const currentUser = auth.currentUser;

  // Handle logout
  const handleLogout = () => {
    dispatch(removeUser());
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-start p-6 bg-gray-900 text-white rounded-md w-screen h-screen">
      {/* Left Section: User Info */}
      <div className="w-full md:w-2/3 mb-6 md:mb-0">
        <h2 className="text-2xl font-bold mb-4">Profile</h2>
        <div className="mb-4">
          <strong>Name: </strong>
          <span>{user.displayName || currentUser?.displayName || "N/A"}</span>
        </div>
        <div className="mb-4">
          <strong>Email: </strong>
          <span>{user.email || currentUser?.email || "N/A"}</span>
        </div>
      </div>

      {/* Right Section: Logout Button */}
      <div className="w-full md:w-1/3 flex justify-center md:justify-end">
        <button
          onClick={handleLogout}
          className="bg-roseText text-white px-6 py-2 rounded-md hover:bg-rose-500"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
