import { Link, useNavigate } from "react-router-dom";
import { Button, Modal, Table } from "flowbite-react";

import { useAppDispatch, useAppSelector } from "../appHooks/reduxHooks";
import UpdateForm from "../components/user/UpdateForm";
import AddressCard from "../components/user/AddressCard";

import { useLogoutMutation } from "../redux/slices/authApi";
import useGetCurrentUser from "../appHooks/useGetCurrentUser";
import MyOrders from "../components/user/MyOrders";
import AnimeLoader from "../components/skeleton/AnimeLoader";
import { useGetAddressBookByUserIdQuery } from "../redux/slices/userApi";
import { useState } from "react";

function ProfilePage() {
  const navigate = useNavigate();

  const [logoutTrigger, { error: logoutError }] = useLogoutMutation();
  const { currentUser, userIsLoading } = useGetCurrentUser();
  const {
    data: addressBook,
    error: addressBookError,
    isLoading: addressBookIsLoading,
    isFetching: addressBookIsFetching,
  } = useGetAddressBookByUserIdQuery();

  const [showAddModal, setShowAddModal] = useState(false);

  if (userIsLoading) return <AnimeLoader message="User is loading ..." />;

  if (!currentUser)
    return (
      <div className="py-20">
        <p className="text-center text-xl dark:text-gray-100">
          Please log in to chcek your profile!
        </p>
      </div>
    );

  const handleLogout = () => {
    navigate("/");
    logoutTrigger(null);
  };

  return (
    <div className="p-8 flex flex-col md:flex-row gap-8 relative">
      <div className="md:sticky top-28 min-w-56 flex flex-col bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden h-full text-lg *:border-b-2 dark:*:border-gray-500 *:p-4 hover:*:bg-gray-200 dark:hover:*:bg-gray-600">
        <a href="#overview">Account overview</a>
        <a href="#orders">My orders</a>
        <a href="#address">My addresses</a>
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
          <MyOrders user={currentUser} />
        </div>

        <div id="address">
          <h2 className="text-xl font-semibold my-8">My addresses</h2>
          {(addressBookIsFetching || addressBookIsLoading) && (
            <p>Address book is loading ...</p>
          )}
          {addressBookError && (
            <p>Something wrong with addresses, please refresh</p>
          )}
          <div className="flex flex-wrap gap-4">
            {addressBook?.map((address) => (
              <AddressCard key={address.id} address={address} />
            ))}
            <div
              className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 flex items-center justify-center cursor-pointer"
              onClick={() => setShowAddModal(true)}
            >
              <span className="text-7xl text-gray-500 dark:text-gray-400">
                +
              </span>
            </div>
          </div>
        </div>

        <div id="change">
          <div className="invisible h-20 -mt-20"></div>
          <h2 className="text-xl font-semibold my-8">Change my info</h2>
          <UpdateForm userInfo={{ ...currentUser }} />
        </div>
      </div>

      <Modal show={showAddModal} onClose={() => setShowAddModal(false)} dismissible>
        <Modal.Header>Add New Address</Modal.Header>
        <Modal.Body>
          <p className="dark:text-gray-200">Placeholder for add address form.</p>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ProfilePage;
