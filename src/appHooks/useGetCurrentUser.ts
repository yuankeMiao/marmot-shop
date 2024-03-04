/*
check if user is login
if no, return false;
if yes, return user
*/

import { useEffect } from "react";
import { useAppDispatch } from "./reduxHooks";
import { fetchCurrentUserWithGoogle, fetchCurrentUser } from "../redux/slices/currentUserSlice";

export default function useGetCurrentUser() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem("token") || null;
      const tokenGoogle = localStorage.getItem("googleToken") || null;
      if (tokenGoogle) {
        dispatch(fetchCurrentUserWithGoogle(tokenGoogle));
      } else if (token) {
        dispatch(fetchCurrentUser(token));
      }
    };

    // Listen for changes to localStorage
    window.addEventListener("storage", handleStorageChange);

    // Call the function once to fetch the current user when the component mounts
    // otherwise when user reload the page, the user will be logged out
    // even though the localstorage still has a valid token
    handleStorageChange();

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [dispatch]);

}

