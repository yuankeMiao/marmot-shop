/*
check if user is login
if no, return false;
if yes, return user
*/

import { useEffect } from "react";
import { useLazyGetCurrentUserQuery } from "../redux/slices/userApi";

export default function useCheckMe() {
  const token = localStorage.getItem("token") || null;
  const [getCurrentUserTrigger, { data: currentUser, error, isLoading }] = useLazyGetCurrentUserQuery();

  useEffect(() => {
  if (token) getCurrentUserTrigger(token);
  }, [token, getCurrentUserTrigger]);

  const isAdmin = currentUser?.id === 1;

  return { currentUser, error, isLoading, isAdmin};
}

export function logout() {
  localStorage.removeItem("token");
  window.location.reload();
}
