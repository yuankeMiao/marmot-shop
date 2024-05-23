import { useEffect, useState } from "react";
import { useLazyGetProfileQuery, useLazyRefreshTokenQuery } from "../redux/slices/authApi";

export default function useGetCurrentUser() {

  const [getCurrentUserError, setGetCurrentUserError] = useState(false);
  
  const [getProfileTrigger, { data: currentUser, error: userError, isLoading: userIsLoading }] =
    useLazyGetProfileQuery();
  const [refreshTokenTrigger] = useLazyRefreshTokenQuery();

  const accessToken = localStorage.getItem("accessToken") || null;

  useEffect(() => {
    const handleStorageChange = () => {
      if (accessToken) getProfileTrigger();
    };

    // Listen for changes to localStorage
    window.addEventListener("storage", handleStorageChange);
    handleStorageChange();

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [getProfileTrigger, accessToken]);

  useEffect(() => {
    if (userError) {
      // console.log(userError);
      if ("status" in userError && userError.status === 401) {
        const refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken) {
          const refreshAccessToken = async () => {
            try {
              const result = await refreshTokenTrigger({ refreshToken }).unwrap();
              localStorage.setItem("accessToken", result.accessToken);
              getProfileTrigger();
            } catch (error) {
              setGetCurrentUserError(true);
              localStorage.removeItem("refreshToken");
              localStorage.removeItem("accessToken");
            }
          };
          refreshAccessToken();
        } else {
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("accessToken");
        }
      }
    }
  }, [userError, getProfileTrigger, refreshTokenTrigger]);

  return { currentUser, getCurrentUserError, userIsLoading};
}
