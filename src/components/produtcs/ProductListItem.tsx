import { useEffect, useState } from "react";

import { CartItemType } from "../../misc/productTypes";
import AmountControl from "./AmountControl";
import { useAppDispatch } from "../../appHooks/reduxHooks";
import { removeFromCart, updateQuantity } from "../../redux/slices/cartSlice";
import { Link } from "react-router-dom";

function ProductListItem({ product }: { product: CartItemType }) {
  const dispatch = useAppDispatch();
  const [amount, setAmount] = useState(product.quantity);

  useEffect(() => {
    dispatch(updateQuantity({ id: product.id, quantity: amount }));
  }, [amount, dispatch, product.id]);

  const handleDeleteItem = () => {
    dispatch(removeFromCart(product.id));
  };

  return (
    <div className="flex gap-2 md:gap-8 my-2 p-2 md:p-8 border-b-2 last:border-none dark:border-gray-400">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="aspect-square h-16 w-16 md:h-24 md:w-24 rounded-md object-cover"
      />
      <div className="w-full flex flex-col justify-between">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-md md:text-xl font-bold">{product.title}</h3>
        </Link>

        <div className="flex justify-between items-center">
          <p className="py-0 md:py-4 *:pr-4">
            <span className="text-sm md:text-md font-semibold line-through">
              {product.price}€
            </span>
            <span className="text-md sm:text-lg font-bold text-red-500">
              {Math.round(product.price * (100 - product.discountPercentage)) /
                100}
              €
            </span>
          </p>
          <div className="flex items-center">
            <AmountControl
              amount={amount}
              setAmount={setAmount}
              limit={product.stock}
            />
            <button
              className="ml-8 text-sky-700 hover:underline"
              onClick={handleDeleteItem}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductListItem;
