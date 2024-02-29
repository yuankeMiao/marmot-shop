/*
check if user is login
if no, return false;
if yes, return user
*/

import { useGetCurrentUserQuery } from "../redux/slices/userApi";

export default function useCheckMe() {
  const token = localStorage.getItem("token") || null;
  const { data: currentUser, error, isLoading } = useGetCurrentUserQuery(token);

  const isAdmin = currentUser?.id === 1;
  
  if(!currentUser) return { currentUser: null, error, isLoading, isAdmin: false};

  return { currentUser, error, isLoading, isAdmin};
}

export function logout() {
  localStorage.removeItem("token");
  window.location.reload();
}
