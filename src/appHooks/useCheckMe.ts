/*
check if user is login
if no, return false;
if yes, return user
*/

import { useGetCurrentUserQuery } from "../redux/slices/userApi";

export default function useCheckMe() {
  const token = localStorage.getItem("token") || null;
  const { data: currentUser, error, isLoading } = useGetCurrentUserQuery(token, {
    skip: !token, // so it will not run if token is null
  });

  const isAdmin = currentUser?.id === 1;

  return { currentUser, error, isLoading, isAdmin};
}

export function logout() {
  localStorage.removeItem("token");
  window.location.reload();
}
