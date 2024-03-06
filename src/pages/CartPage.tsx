import { useState } from "react";
import { Link } from "react-router-dom";
import { Modal } from "flowbite-react";

import ProductListItem from "../components/produtcs/ProductListItem";
import { CartState } from "../misc/productTypes";
import { useAppSelector } from "../appHooks/reduxHooks";
import { CurrentUserType } from "../misc/userTypes";
import { useLoginContext } from "../appHooks/useLoginContext";

function CartPage() {

  const {user: currentUser} = useAppSelector((state) => state.currentUser);

  const [openModal, setOpenModal] = useState(false);
  const { setOpenLoginModal} = useLoginContext();

  const handleCheckout = () => {
    if(currentUser){
      setOpenModal(true);
      return;
    } else {
      setOpenLoginModal(true);
    }
  };

  const currentCart: CartState = useAppSelector((state) => state.cart);

  return (
    <div className="py-8 px-4">
      <h1 className="text-2xl font-bold my-8 mx-4">My Shopping bag</h1>
      <div className="flex flex-col lg:flex-row gap-8 mb-12">
        <div className="w-full h-full lg:w-2/3 bg-gray-100 dark:bg-gray-900 rounded-xl">
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

        <div className="w-full h-80 lg:w-1/3 bg-gray-100 dark:bg-gray-900 rounded-xl p-8 ">
          <div className="w-full *:mb-4 *:flex *:justify-between">
            <h3 className="text-xl font-semibold h-12 border-b-2 dark:border-gray-400">
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
            className="btn-primary disabled:bg-gray-300 dark:disabled:bg-gray-700"
            disabled={currentCart.products.length === 0}
            onClick={handleCheckout}
          >
            Checkout
          </button>
        </div>
      </div>

      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Thanks for visiting this demo website!</Modal.Header>
        <Modal.Body>
          <p>
            Hi, This frontend demo ends here. If you want to
              know more about this demo or want to know more about me, please
              visit my <a className="text-blue-500 underline" href="https://github.com/yuankeMiao">Github</a>, <a className="text-blue-500 underline" href="www.linkedin.com/in/yuankemiao">LinkedIn</a> or <a className="text-blue-500 underline" href="https://yuankedev.fun/">portfolio</a>.
          </p>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default CartPage;
