import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Modal, Dropdown, Avatar } from "flowbite-react";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Badge from "./utils/Bagde";
import Search from "./produtcs/Search";

import { useAppSelector } from "../appHooks/reduxHooks";

import Login from "./user/Login";
import ToggleDarkMode from "./utils/ToggleDarkMode";
import Register from "./user/Register";

import { useLoginContext } from "../appHooks/useLoginContext";
import useGetCurrentUser from "../appHooks/useGetCurrentUser";
import {
  useLogoutMutation,
} from "../redux/slices/authApi";

function Header() {
  const { pathname } = useLocation();
  const [logoutTrigger, { error: logourError }] = useLogoutMutation();
  const { currentUser, getCurrentUserError} = useGetCurrentUser();

  const { openLoginModal, setOpenLoginModal } = useLoginContext();
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [openReLoginModal, setOpenReLoginModal] = useState(false);

  const cartAmount = useAppSelector((state) => state.cart.totalQuantity);

  const handleLogout = () => {
    logoutTrigger(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.reload();
  };

  useEffect(() => {
    if (getCurrentUserError) {
      setOpenReLoginModal(true);
    }
  }, [getCurrentUserError]);

  return (
    <header className="fixed z-20 top-0 start-0 w-full h-20 bg-primary flex justify-between items-center px-4 lg:px-12">
      <div className="flex items-center gap-2">
        <Link to="/">
          <span className="hidden sm:inline text-3xl font-bold">
            Marmot Shop
          </span>
        </Link>
        <Dropdown
          label={
            <FontAwesomeIcon
              icon={faBars}
              className="block lg:hidden w-6 h-6"
            />
          }
          dismissOnClick={true}
          inline
          arrowIcon={false}
        >
          <Dropdown.Item as={Link} to="/">
            Home
          </Dropdown.Item>
          <Dropdown.Item as={Link} to="/all-products">
            All Products
          </Dropdown.Item>
        </Dropdown>
      </div>

      <nav className="justify-self-start">
        <ul className="hidden lg:flex gap-8 hover:*:underline">
          <li>
            <Link to="/" className={`${pathname === "/" && "font-bold"}`}>
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/all-products"
              className={`${pathname === "/all-products" && "font-bold"}`}
            >
              All Products
            </Link>
          </li>
        </ul>
      </nav>

      <Search />

      <div className="flex gap-4 items-center">
        <ToggleDarkMode />
        <Badge amount={cartAmount} />

        {currentUser ? (
          <div className="flex gap-2 items-center">
            <Dropdown
              label={
                <Avatar alt="user setting" img={currentUser.avatar} rounded />
              }
              dismissOnClick={true}
              inline
              arrowIcon={false}
            >
              <Dropdown.Header>
                <span className="block text-sm font-semibold">
                  {currentUser.firstname}
                </span>
                <span className="block text-sm">{currentUser.email}</span>
              </Dropdown.Header>
              {currentUser.role === "Admin" && (
                <Dropdown.Item as={Link} to="/dashboard/products">
                  Dashbord
                </Dropdown.Item>
              )}
              <Dropdown.Item as={Link} to="/profile">
                Profile
              </Dropdown.Item>
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown>
          </div>
        ) : (
          <div className="font-bold text-sm">
            <button
              className="border-r px-2"
              onClick={() => setOpenLoginModal(true)}
            >
              Login
            </button>
            <button className="px-2" onClick={() => setOpenRegisterModal(true)}>
              Register
            </button>
          </div>
        )}
      </div>

      <Modal
        dismissible
        show={openLoginModal}
        onClose={() => setOpenLoginModal(false)}
        size="md"
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <Login setOpenRegisterModal={setOpenRegisterModal} />
        </Modal.Body>
      </Modal>

      <Modal
        dismissible
        show={openRegisterModal}
        onClose={() => setOpenRegisterModal(false)}
        size="md"
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <Register setOpenRegisterModal={setOpenRegisterModal} />
        </Modal.Body>
      </Modal>

      <Modal
        dismissible
        show={openReLoginModal}
        onClose={() => setOpenReLoginModal(false)}
        size="md"
        popup
      >
        <Modal.Body>
          <div className="h-40 dark:text-gray-100 mt-12">
            <p className="text-center">
              Hi, your login is expired, please login again!
            </p>
            <button
              className="btn-primary mt-12"
              onClick={() => {
                setOpenReLoginModal(false);
                setOpenLoginModal(true);
              }}
            >
              Login
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </header>
  );
}

export default Header;
