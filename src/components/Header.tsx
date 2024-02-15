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

function Header() {
  return (
    <header className="w-full h-20 bg-primary flex justify-between items-center px-4 md:px-12">
      <div className="flex items-center gap-2">
        <Link to="/">
          <span className="text-3xl font-bold">LOGO</span>
        </Link>
        <button>
          <FontAwesomeIcon icon={faBars} className="block md:hidden w-6 h-6" />
        </button>
      </div>

      <nav className="justify-self-start">
        <ul className="hidden md:flex gap-8 ">
          <li>Women</li>
          <li>Men</li>
          <li>Kids</li>
          <li>Jewlery</li>
        </ul>
      </nav>

      <Search />

      <div className="flex gap-4 items-center">
        <div className="flex gap-2">
          <Badge amount={15}>
            <FontAwesomeIcon icon={faHeart} className="w-5 h-5" />
          </Badge>
          <Badge amount={6}>
            <FontAwesomeIcon icon={faCartShopping} className="w-5 h-5" />
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
