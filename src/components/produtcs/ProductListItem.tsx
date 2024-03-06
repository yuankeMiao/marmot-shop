import { useEffect, useState } from "react";

import { CartItemType } from "../../misc/productTypes";
import AmountControl from "./AmountControl";
import { useAppDispatch } from "../../appHooks/reduxHooks";
import { removeFromCart, updateQuantity } from "../../redux/slices/cartSlice";

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
    <div className="flex gap-8 my-2 p-8 border-b-2 last:border-none dark:border-gray-400">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="aspect-square h-24 w-24 rounded-md object-cover"
      />
      <div className="w-full flex flex-col justify-between">
        <h3 className="text-xl font-bold">{product.title}</h3>
        <div className="flex justify-between items-center">
          <p className="py-4 *:pr-4">
            <span className="text-md font-semibold line-through">
              {product.price}€
            </span>
            <span className="text-lg font-bold text-red-700">
              {Math.round(
                (product.price * (100 - product.discountPercentage)) / 100
              )}
              €
            </span>
          </p>
          <AmountControl amount={amount} setAmount={setAmount} />
          <button
            className="text-sky-700 hover:underline"
            onClick={handleDeleteItem}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductListItem;
