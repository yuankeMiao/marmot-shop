import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

import { ProductType } from "../../types/productTypes";
import { Link } from "react-router-dom";

function ProductCard({ productItem }: { productItem: ProductType }) {
  return (
    <div
      className="min-w-40 bg-white text-sky-950 px-4 py-8 rounded-xl shadow-md flex flex-col"
    >
      <Link to={`/product/${productItem.id}`}>
        <img
          src={productItem.image}
          alt={productItem.title}
          className="w-full aspect-square object-contain"
        />
      </Link>
      <span className="mt-4 h-20">{productItem.title}</span>
      <span className="text-lg font-bold py-4">{productItem.price} €</span>
      <div className="flex justify-between items-center">
        <button className="btn-primary">Add to Bag</button>
        <button className=" text-red-500 hover:text-red-300">
          <FontAwesomeIcon icon={faHeart} className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
