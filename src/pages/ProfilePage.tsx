import { Link, useNavigate } from "react-router-dom";
import { Table } from "flowbite-react";

import { useAppDispatch, useAppSelector } from "../appHooks/reduxHooks";
import UpdateForm from "../components/user/UpdateForm";
import AddressTable from "../components/user/AddressTable";

import { useLogoutMutation } from "../redux/slices/authApi";
import useGetCurrentUser from "../appHooks/useGetCurrentUser";

function ProfilePage() {
  const navigate = useNavigate();

  const [logoutTrigger, {error: logoutError}] = useLogoutMutation();

  // const { user: currentUser, isLoading: currentUserIsLoading } = useAppSelector((state) => state.currentUser);
  const {currentUser} = useGetCurrentUser();

  // if(currentUserIsLoading) return (
  //   <div className="py-20">
  //     <p className="text-center text-xl dark:text-gray-100">Loading...</p>
  //   </div>
  // )

  if(!currentUser) return (
    <div className="py-20">
      <p className="text-center text-xl dark:text-gray-100">Please log in to chcek your profile!</p>
    </div>
  )

  const handleLogout = () => {
    navigate("/");
    logoutTrigger(null);
  };

  return (
    <div className="p-8 flex flex-col md:flex-row gap-8 relative">
      <div className="md:sticky top-28 min-w-56 flex flex-col bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden h-full text-lg *:border-b-2 dark:*:border-gray-500 *:p-4 hover:*:bg-gray-200 dark:hover:*:bg-gray-600">
        <a href="#overview">Account overview</a>
        <a href="#orders">My orders</a>
        <a href="#address">My address</a>
        <a href="#change">Change my info</a>
        <span className="border-none" onClick={handleLogout}>
          Logout
        </span>
      </div>

      <div className="w-full *:mb-12">
        <div className="flex h-16 items-center gap-4">
          <img
            src={currentUser.avatar}
            alt={currentUser.firstname}
            className="rounded-xl h-full bg-teal-500"
          />
          <h1 className="text-3xl font-semibold">{currentUser.firstname}</h1>
        </div>

        <div id="overview">
          <div className="invisible h-20 -mt-20"></div>
          <h2 className="text-xl font-semibold my-8">Acount Overveiw</h2>
          <Table>
            <Table.Body className="divide-y dark:bg-gray-800">
              <Table.Row>
                <Table.Cell className="font-bold">Name</Table.Cell>
                <Table.Cell>{`${currentUser.firstname} ${currentUser.lastname}`}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell className="font-bold">E-mail</Table.Cell>
                <Table.Cell>{currentUser.email}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>

        <div id="orders">
          <div className="invisible h-20 -mt-20"></div>
          <h2 className="text-xl font-semibold my-8">My orders</h2>
          <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-xl flex flex-col items-center gap-8">
            <p>You don't have any order yet, checkout your items now!</p>
            <button className="btn-primary w-40">
              <Link to="/cart">Go to cart</Link>
            </button>
          </div>
        </div>

        {/* <div id="address">
          <div className="invisible h-20 -mt-20"></div>
          <h2 className="text-xl font-semibold my-8">My address</h2>
          {currentUser.address &&
            <AddressTable address={currentUser.address} />
          }
        </div>

        <div id="change">
          <div className="invisible h-20 -mt-20"></div>
          <h2 className="text-xl font-semibold my-8">Change my info</h2>
          <UpdateForm userInfo={{ ...currentUser }}/>
        </div> */}
      </div>
    </div>
  );
}

export default ProfilePage;
