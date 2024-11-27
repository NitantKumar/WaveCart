import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { addUser, removeUser } from "../store/userSlice";
import { useNavigate } from 'react-router-dom';
import SignIn from '../UserInterface/SignIn';
import SignUp from '../UserInterface/SignUp';
import Profile from '../UserInterface/Profile';

const Account = () => {
  const [userExist, setUserExist] = useState(true);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        if (!isLoggedIn) {
          dispatch(
            addUser({
              uid: userCredential.user.uid,
              email: userCredential.user.email,
              displayName: username,
            })
          );
        }
      } else {
        if(isLoggedIn){
          dispatch(removeUser());
        }
      }
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, [auth, dispatch]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-whiteText">
      {
        isLoggedIn ? (
          <Profile />
        ) : (
          <div className="bg-gray-800 p-6 md:p-8 rounded-lg shadow-lg w-full max-w-md">
            {userExist ? <SignIn /> : <SignUp />}

            <p
              className="mt-4 text-center text-sm md:text-base hover:cursor-pointer hover:underline text-lightText hover:text-skyText transition-all duration-200"
              onClick={() => setUserExist(!userExist)}
            >
              {userExist
                ? `Don't have an account? `
                : `Already have an account? `}
              <span className="text-roseText font-semibold">
                {userExist ? `Sign Up here.` : `Sign In here.`}
              </span>
            </p>
          </div>
        )
      }
    </div>
  );
};

export default Account;