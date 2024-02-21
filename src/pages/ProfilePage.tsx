import { useNavigate } from "react-router-dom";
import { useGetCurrentUserQuery } from "../redux/slices/apiQuery";
import { useEffect } from "react";

/* 
my plan for this page:
if user logout on this page, it should be able to recognize the token is gone, then redirect to home page

*/

function ProfilePage() {
  const token = localStorage.getItem("token");
  const { data: currentUser, error, isLoading } = useGetCurrentUserQuery(token);

  const navigate = useNavigate();

  // I will handle them later properly, now it is just a check
  useEffect(() => {
    if (!token) navigate("/");
  }, [token, navigate]);

  if (isLoading) return <div>Loading...</div>;
  if (error && token)
    return <div>Sorry, your login status is expired, please log in again!</div>;
  if (!currentUser)
    return <div>Sorry, sonthing wrong happened, please log in again!</div>;

  // console.log(currentUser);

  return (
    <div className="p-8 flex flex-col lg:flex-row gap-8">
      <div className="relative min-w-56 flex flex-col bg-gray-100 rounded-xl overflow-hidden h-full text-lg *:border-b-2 *:p-4 hover:*:bg-gray-200">
        <a href="#overview">Account overview</a>
        <a href="#orders">My orders</a>
        <a href="#address">My address</a>
        <a href="#change">Change my info</a>
        <span className="border-none">Logout</span>
      </div>

      <div>
        <div className="flex h-16 items-center gap-4">
          <img
            src={currentUser.image}
            alt={currentUser.username}
            className="rounded-xl h-full bg-teal-500"
          />
          <h1 className="text-3xl font-semibold">{currentUser.username}</h1>
        </div>

        <div>
          <h2>{`Hi! ${currentUser.firstName}, ${currentUser.lastName}`}</h2>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
