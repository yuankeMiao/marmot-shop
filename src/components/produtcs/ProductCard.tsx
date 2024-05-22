import { Link } from "react-router-dom";

import { ProductReadDto } from "../../misc/productTypes";
import ShopButton from "./ShopButton";

function ProductCard({ productItem }: { productItem: ProductReadDto }) {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-sky-950 dark:text-gray-100 px-4 py-8 rounded-xl shadow-md flex flex-col min-w-64 transition-all">
      <Link to={`/product/${productItem.id}`}>
        <img
          src={productItem.thumbnail}
          alt={productItem.title}
          className="w-full aspect-square object-cover"
        />
      </Link>
      <span className="mt-4 h-12 font-bold">{productItem.title}</span>
      <p className="py-4 *:pr-4">
        <span className="text-lg font-semibold">
          {productItem.price}€
        </span>
        {
          productItem.discountPercentage > 0 ?
          <span className="text-xl font-bold text-red-500">
          - {productItem.discountPercentage}%
        </span> : (<></>)
        }
      </p>

      <ShopButton newItem={productItem} quantity={1} />
    </div>
  );
}

export default ProductCard;
