import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../appHooks/reduxHooks";
import ProductListItem from "../components/produtcs/ProductListItem";

import useCheckMe from "../appHooks/useCheckMe";
import { useEffect } from "react";
import { fetchUserCart } from "../redux/slices/cartSlice";
import { CartState } from "../misc/productTypes";

function CartPage({currentCart}: {currentCart: CartState}) {
  // const {
  //   currentUser,
  //   error: currentUserError,
  //   isLoading: curentUserIsLoading,
  // } = useCheckMe();

  // const dispatch = useAppDispatch();

  // useEffect(() => {
  //   if (currentUser?.id) dispatch(fetchUserCart(currentUser.id));
  // }, [currentUser, dispatch]);

  // const currentCart = useAppSelector((state) => state.cart);

  return (
    <div className="py-8 px-4">
      <h1 className="text-2xl font-bold my-8 mx-4">My Shopping bag</h1>
      <div className="flex flex-col lg:flex-row gap-8 mb-12">
        <div className="w-full h-full lg:w-2/3 bg-gray-100 rounded-xl">
          {currentCart.totalQuantity === 0 ? (
            <div className="w-full flex flex-col justify-center items-center py-16 gap-8">
              <p>It is empty now ...</p>
              <button className="btn-primary w-40">
                <Link to="/all-products">Go Shopping</Link>
              </button>
            </div>
          ) : (
            currentCart.products.map((product) => (
              <ProductListItem key={product.id} product={product} />
            ))
          )}
        </div>

        <div className="w-full h-80 lg:w-1/3 bg-gray-100 rounded-xl p-8 ">
          <div className="w-full *:mb-4 *:flex *:justify-between">
            <h3 className="text-xl font-semibold h-12 border-b-2">
              Order Summary:
            </h3>
            <div className="text-sm font-bold">
              <span>Order items:</span>
              <span>{currentCart.totalQuantity}</span>
            </div>
            <div className="text-xl font-bold">
              <span>Order total:</span>
              <span>{currentCart.total} €</span>
            </div>
            <div>
              <span>With Discount:</span>
              <span>{currentCart.discountedTotal} €</span>
            </div>
          </div>

          <button
            className="btn-primary disabled:bg-gray-300 "
            disabled={currentCart.products.length === 0}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
