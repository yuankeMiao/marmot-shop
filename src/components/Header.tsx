import { useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Dropdown } from "flowbite-react";

import { faCartShopping, faBars } from "@fortawesome/free-solid-svg-icons";
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
  useGetCurrentUser()
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.currentUser.user);

  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);

  const cartAmount = useAppSelector((state) => state.cart.totalQuantity);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="fixed z-20 top-0 start-0 w-full h-20 bg-primary flex justify-between items-center px-4 lg:px-12">
      <div className="flex items-center gap-2">
        <Link to="/">
          <span className="text-3xl font-bold">LOGO</span>
        </Link>
        <button>
          <FontAwesomeIcon icon={faBars} className="block lg:hidden w-6 h-6" />
        </button>
      </div>

      <nav className="justify-self-start">
        <ul className="hidden lg:flex gap-8 hover:*:underline">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/all-products">All Products</Link>
          </li>
          <li>About Us</li>
          <li>Customer Support</li>
        </ul>
      </nav>

      <Search />

      <div className="flex gap-4 items-center">
        <ToggleDarkMode />
        <Badge amount={cartAmount}>
          <Link to="/cart">
            <FontAwesomeIcon icon={faCartShopping} className="w-5 h-5" />
          </Link>
        </Badge>

        {currentUser ? (
          <div className="flex gap-2 items-center">
            <img
              className="w-8 h-8 rounded-full ring-2 bg-teal-500 ring-white"
              src={currentUser.image}
              alt={currentUser.username}
            />
            <Dropdown
              label={currentUser.username}
              dismissOnClick={false}
              inline
            >
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
          <Login setOpenLoginModal={setOpenLoginModal} setOpenRegisterModal={setOpenRegisterModal}/>
        </Modal.Body>
      </Modal>

      <Modal
        dismissible
        show={openRegisterModal}
        onClose={() => setOpenRegisterModal(false)}
        size="md"
        popup>
        <Modal.Header />
        <Modal.Body>
          <Register setOpenRegisterModal={setOpenRegisterModal} setOpenLoginModal = {setOpenLoginModal} />
        </Modal.Body>
        </Modal>
    </header>
  );
}

export default Header;
