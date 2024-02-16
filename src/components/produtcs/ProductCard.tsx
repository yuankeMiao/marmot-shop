
import { ProductType } from "../../types/productTypes";
import { Link } from "react-router-dom";
import ShopAndFav from "../buttons/ShopAndFav";

function ProductCard({ productItem }: { productItem: ProductType }) {
  return (
    <div
      className="bg-white text-sky-950 px-4 py-8 rounded-xl shadow-md flex flex-col min-w-64"
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
      <ShopAndFav />
    </div>
  );
}

export default ProductCard;
