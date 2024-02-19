import {
  faCartShopping,
  faHeart,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Link } from "react-router-dom";

import Badge from "./buttons/Bagde";
import Search from "./Search";

import avartaHolder from "../statics/marmot-1.png";
import { useAppSelector } from "../appHooks/reduxHooks";

function Header() {

  const cartAmount = useAppSelector((state) => state.cart.totalQuantity);

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
          <li><Link to="/">Home</Link></li>
          <li><Link to="/all-products">All Products</Link></li>
          <li>About Us</li>
          <li>Customer Support</li>
        </ul>
      </nav>

      <Search />

      <div className="flex gap-4 items-center">
        <div className="flex gap-2">
          <Badge amount={15}>
            <FontAwesomeIcon icon={faHeart} className="w-5 h-5" />
          </Badge>
          <Badge amount={cartAmount}>
            <Link to="/cart">
            <FontAwesomeIcon icon={faCartShopping} className="w-5 h-5" />
            </Link>
          </Badge>
        </div>
        <div className="hidden font-bold text-sm">
          <button className="border-r px-2">Login</button>
          <button className="px-2">Register</button>
        </div>
        <div className="flex gap-2 items-center">
          <img className="w-8 h-8 rounded-full ring-2 bg-teal-500 ring-white" src={avartaHolder} alt="" />
          <span className="hidden md:inline">Marmote</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
