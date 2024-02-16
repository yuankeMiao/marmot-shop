import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

function ShopAndFav() {
  return (
    <div className="px-4 flex justify-between items-center gap-8">
      <button className="btn-primary">
        <FontAwesomeIcon icon={faCartShopping} className="mx-2"/>Add to Bag
      </button>
      <button className=" text-red-500 hover:text-red-300">
        <FontAwesomeIcon icon={faHeart} className="w-8 h-8" />
      </button>
    </div>
  );
}

export default ShopAndFav;
