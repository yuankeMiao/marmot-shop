// copyright - flowbite: https://flowbite.com/docs/components/badge/#notification-badge

import { Link, useNavigate } from "react-router-dom";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Bagde({ amount = 0 }: { amount?: number }) {
  const navigate = useNavigate();
  return (
      <button
        onClick={() => navigate("/cart")}
        type="button"
        className="relative inline-flex items-center p-3 text-sm font-medium text-center text-white rounded-lg hover:bg-sky-600 focus:bg-sky-600 focus:outline-none"
      >
          <FontAwesomeIcon
            icon={faCartShopping}
            className="w-5 h-5 text-sky-950 dark:text-white"
          />
        <span className="sr-only">Notifications</span>
        <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2">
          {amount < 100 ? amount : "..."}
        </div>
      </button>
  );
}

export default Bagde;
