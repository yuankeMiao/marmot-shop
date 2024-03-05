import { Link } from "react-router-dom";

import { ProductType } from "../../misc/productTypes";
import ShopButton from "./ShopButton";

function ProductCard({ productItem }: { productItem: ProductType }) {


  return (
    <div
      className="bg-white dark:bg-gray-900 text-sky-950 dark:text-gray-100 px-4 py-8 rounded-xl shadow-md flex flex-col min-w-64 transition-all"
    >
      <Link to={`/product/${productItem.id}`}>
        <img
          src={productItem.thumbnail}
          alt={productItem.title}
          className="w-full aspect-square object-cover"
        />
      </Link>
      <span className="mt-4 h-12 font-bold">{productItem.title}</span>
      <span className="text-lg font-bold py-4">{productItem.price} €</span>
      <ShopButton newItem={productItem} quantity={1} />
    </div>
  );
}

export default ProductCard;
