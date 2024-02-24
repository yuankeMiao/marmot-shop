import { Link } from "react-router-dom";

import { ProductType } from "../../misc/productTypes";
import ShopAndFav from "./ShopAndFav";

function ProductCard({ productItem }: { productItem: ProductType }) {


  return (
    <div
      className="bg-white text-sky-950 px-4 py-8 rounded-xl shadow-md flex flex-col min-w-64"
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
      <ShopAndFav newItem={productItem} quantity={1} />
    </div>
  );
}

export default ProductCard;
