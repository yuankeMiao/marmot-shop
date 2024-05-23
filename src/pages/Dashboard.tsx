import useGetCurrentUser from "../appHooks/useGetCurrentUser";
import { Link, Outlet, useLocation } from "react-router-dom";

function Dashboard() {
  const { currentUser } = useGetCurrentUser();

  if (currentUser?.role !== "Admin")
    return <div>You are not authorized to access this page</div>;

  return (
    <div className="p-8 flex flex-col md:flex-row gap-8 relative">
      <div className="md:sticky top-28 min-w-56 flex flex-col bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden h-full text-lg *:border-b-2 dark:*:border-gray-500 *:p-4 hover:*:bg-gray-200 dark:hover:*:bg-gray-600">
        <Link to="./products">Products Center</Link>
        <Link to="./orders">Order Center</Link>
        <Link to="./users">User Center</Link>
      </div>

      <Outlet />
    </div>
  );
}

export default Dashboard;
