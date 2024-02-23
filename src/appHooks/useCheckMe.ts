/*
check if user is login
if no, return false;
if yes, return user
*/




import { useGetCurrentUserQuery } from "../redux/slices/userApi";

export default function useCheckMe() {
  const token = localStorage.getItem("token") || null;
  const { data: currentUser, error, isLoading } = useGetCurrentUserQuery(token);

  if (isLoading) return { isLoading: true };
  if (error && "status" in error && error.status === 401) {
    return {
      isLoading: false,
      error: "Sorry, your login status is expired, please log in again!",
    };
  }

  if (!currentUser)
    return {
      isLoading: false,
      error: "Sorry, sonthing wrong happened, please log in again!",
    };

  return { isLoading: false, currentUser };
}
