//https://www.flowbite-react.com/docs/components/navbar

import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Modal, Dropdown, Navbar, Avatar } from "flowbite-react";

import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Badge from "./buttons/Bagde";
import Search from "./Search";

import { useAppSelector, useAppDispatch } from "../appHooks/reduxHooks";

import Login from "./user/Login";
import useGetCurrentUser from "../appHooks/useGetCurrentUser";
import ToggleDarkMode from "./utils/ToggleDarkMode";
import Register from "./user/Register";
import { logout } from "../redux/slices/currentUserSlice";

function Header() {
  useGetCurrentUser();

  const {pathname} = useLocation()
  
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.currentUser.user);

  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);

  const cartAmount = useAppSelector((state) => state.cart.totalQuantity);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="bg-primary fixed top-0 start-0 z-20 w-full">
      <div className="max-w-screen-2xl mx-auto pt-2">
        <Navbar
          fluid
          rounded
          className="bg-transparent dark:bg-transparent mx-4 xl:mx-8 "
        >
          <Navbar.Toggle />
          <Navbar.Brand
            href="https://marmotshop.yuankedev.fun/"
            className="text-xl font-bold"
          >
            Marmot Shop
          </Navbar.Brand>
          <Navbar.Collapse>
            <Navbar.Link as={Link} to="/" active={pathname === "/"}>
              Home
            </Navbar.Link>
            <Navbar.Link as={Link} to="/all-products" active={pathname === "/all-products"}>
              Products
            </Navbar.Link>
            <Navbar.Link as={Link} to="/">
              About
            </Navbar.Link>
          </Navbar.Collapse>

          <div className="flex gap-4 items-center">
            <Search />
            <ToggleDarkMode />
            <Badge amount={cartAmount}>
              <Link to="/cart">
                <FontAwesomeIcon icon={faCartShopping} className="w-5 h-5 text-sky-950 dark:text-white" />
              </Link>
            </Badge>

            {currentUser ? (
              <div className="flex gap-2 items-center">
                <Dropdown
                  label={<Avatar alt="user setting" img={currentUser.image} rounded className="bg-white"/>}
                  dismissOnClick={true}
                  inline
                  arrowIcon={false}
                >
                  <Dropdown.Header>
                    <span className="block text-sm font-semibold">{currentUser.username}</span>
                    <span className="block text-sm">{currentUser.email}</span>
                  </Dropdown.Header>
                  {currentUser.role === "admin" && (
                    <Dropdown.Item as={Link} to="/dashboard">
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
                <button
                  className="px-2"
                  onClick={() => setOpenRegisterModal(true)}
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </Navbar>
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
          <Login
            setOpenLoginModal={setOpenLoginModal}
            setOpenRegisterModal={setOpenRegisterModal}
          />
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
          <Register
            setOpenRegisterModal={setOpenRegisterModal}
            setOpenLoginModal={setOpenLoginModal}
          />
        </Modal.Body>
      </Modal>
    </header>
  );
}

export default Header;
