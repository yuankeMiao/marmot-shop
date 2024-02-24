
import { Link, useNavigate } from "react-router-dom";
import { Table } from "flowbite-react";

import useCheckMe, { logout } from "../appHooks/useCheckMe";
import UserInfoForm from "../components/user/UserInfoForm";


/* 
my plan for this page:
if user logout on this page, it should be able to recognize the token is gone, then redirect to home page
*/

function ProfilePage() {
  const { currentUser, error, isLoading } = useCheckMe()
  const navigate = useNavigate()
  const handleLogout = () => {
    navigate("/")
    logout();
  }

  if (!currentUser)
    return <div>Sorry, Please log in to chcek your profile!</div>;


return (
    <div className="p-8 flex flex-col lg:flex-row gap-8">
      <div className="relative min-w-56 flex flex-col bg-gray-100 rounded-xl overflow-hidden h-full text-lg *:border-b-2 *:p-4 hover:*:bg-gray-200">
        <a href="#overview">Account overview</a>
        <a href="#orders">My orders</a>
        <a href="#address">My address</a>
        <a href="#change">Change my info</a>
        <span className="border-none" onClick={handleLogout}>Logout</span>
      </div>

      <div className="w-full *:mb-12">
        <div className="flex h-16 items-center gap-4">
          <img
            src={currentUser.image}
            alt={currentUser.username}
            className="rounded-xl h-full bg-teal-500"
          />
          <h1 className="text-3xl font-semibold">{currentUser.username}</h1>
        </div>

        <div id="overview">
          <div className="invisible h-20 -mt-20"></div>
          <h2 className="text-xl font-semibold my-8">Acount Overveiw</h2>
          <Table>
            <Table.Body className="divide-y">
              <Table.Row>
                <Table.Cell className="font-bold">Name</Table.Cell>
                <Table.Cell>{`${currentUser.firstName} ${currentUser.lastName}`}</Table.Cell>
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
          <div className="bg-gray-100 p-8 rounded-xl flex flex-col items-center gap-8">
            <p>You don't have any order yet, checkout your items now!</p>
            <button className="btn-primary w-40">
              <Link to="/cart">Go to cart</Link>
            </button>
          </div>
        </div>

        <div id="address">
          <div className="invisible h-20 -mt-20"></div>
          <h2 className="text-xl font-semibold my-8">My address</h2>
          <div>
            <Table>
              <Table.Body className="divide-y">
                <Table.Row>
                  <Table.Cell className="font-bold">Address</Table.Cell>
                  <Table.Cell>{currentUser.address?.address}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell className="font-bold">City</Table.Cell>
                  <Table.Cell>{currentUser.address?.city}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell className="font-bold">State</Table.Cell>
                  <Table.Cell>{currentUser.address?.state}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell className="font-bold">Postal code</Table.Cell>
                  <Table.Cell>{currentUser.address?.postalCode}</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
            <iframe
              loading="lazy"
              width="100%"
              height="300px"
              className="rounded-xl my-8"
              title="Google map"
              src={`https://maps.google.com/maps?q=${currentUser.address?.coordinates.lat},${currentUser.address?.coordinates.lng}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
            />
          </div>
        </div>

        <div id="change">
          <div className="invisible h-20 -mt-20"></div>
          <h2 className="text-xl font-semibold my-8">Change my info</h2>
          <UserInfoForm userInfo ={{...currentUser}} formType="update"/>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
