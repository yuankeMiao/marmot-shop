import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Modal } from "flowbite-react";

import ProductListItem from "../components/produtcs/ProductListItem";
import { CartState } from "../misc/productTypes";
import { useAppDispatch, useAppSelector } from "../appHooks/reduxHooks";
import { useLoginContext } from "../appHooks/useLoginContext";
import useGetCurrentUser from "../appHooks/useGetCurrentUser";
import OrderItemCard from "../components/order/OrderItemCard";
import { useCreateOrderMutation } from "../redux/slices/orderApi";
import { OrderProductCreateDto } from "../misc/orderTypes";
import { useGetAddressBookByUserIdQuery } from "../redux/slices/userApi";
import { clearCart } from "../redux/slices/cartSlice";
import { ToastContainer, toast } from "react-toastify";

function CartPage() {
  const { currentUser } = useGetCurrentUser();
  const dispatch = useAppDispatch();

  const [openModal, setOpenModal] = useState(false);
  const { setOpenLoginModal } = useLoginContext();

  const [shippingAddress, setShippingAddress] = useState("");
  const [orderItems, setOrderItems] = useState<OrderProductCreateDto[]>([]);

  const { data: addressBook } = useGetAddressBookByUserIdQuery();

  const [
    createOrderTrigger,
    { isError: createOrderError, isLoading: createOrderIsLoading, isSuccess:createOrderIsSuccess },
  ] = useCreateOrderMutation();

  const handleCheckout = () => {
    if (currentUser) {
      setOrderItems(() => {
        return currentCart.products.map((product) => ({
          productId: product.id,
          quantity: product.quantity,
        }));
      });
      setOpenModal(true);
      return;
    } else {
      setOpenLoginModal(true);
    }
  };

  const handlePlaceOrder = async () => {
    if (shippingAddress !== "" && orderItems.length > 0) {
      await createOrderTrigger({
        shippingAddress: shippingAddress,
        products: orderItems,
      })
        .unwrap()
        .then(() => {
          dispatch(clearCart());
          setOpenModal(false);
        });
    }
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    setShippingAddress(value);
  };

  const currentCart: CartState = useAppSelector((state) => state.cart);

  const errorNotify = () =>
    toast.error("Something wrong with order, please try again later");
  
    const successNotify = () => 
    toast.success("You successfully placed an order, go to profile to check it!")

  useEffect(() => {
    if (createOrderError) {
      errorNotify();
    }
  }, [createOrderError]);

  useEffect(() => {
    if (createOrderIsSuccess) {
      successNotify();
    }
  }, [createOrderIsSuccess]);

  return (
    <div className="py-8 px-4">
      <h1 className="text-2xl font-bold my-8 mx-4">My Shopping bag</h1>
      <div className="flex flex-col lg:flex-row gap-8 mb-12">
        <div className="w-full h-full lg:w-2/3 bg-gray-100 dark:bg-gray-900 rounded-xl">
          {currentCart.totalQuantity === 0 ? (
            <div className="w-full flex flex-col justify-center items-center py-16 gap-8">
              <p>It is empty now ...</p>
              <Link
                className="btn-primary w-40 hover:pointer text-center"
                to="/all-products"
              >
                Go Shopping
              </Link>
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
        <Modal.Header>Order details</Modal.Header>
        <Modal.Body>
          <div className="overflow-y-scroll dark:text-gray-100">
            <div>
              {currentCart.products.map((product) => (
                <>
                  <OrderItemCard
                    product={{
                      productId: product.id,
                      title: product.title,
                      thumbnail: product.thumbnail,
                      quantity: product.quantity,
                      actualPrice:
                        Math.round(
                          product.price * (100 - product.discountPercentage)
                        ) / 100,
                      totalPrice:
                        Math.round(product.discountedPrice * 100) / 100,
                    }}
                    role="order"
                  />
                </>
              ))}
            </div>
            <div className="flex flex-wrap gap-4 mt-4">
              <h3>Choose an address from your address book</h3>
              {addressBook &&
                addressBook.map((address) => (
                  <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md w-full flex items-center gap-4">
                    <input
                      type="radio"
                      id={`address-${address.id}`}
                      name="userAddress"
                      value={`${address.recipient}\n${address.phone}\n${
                        address.line1
                      }${address.line2 ? `, ${address.line2}` : ""}\n${
                        address.postalCode
                      } ${address.city}`}
                      onChange={handleAddressChange}
                    />
                    <label htmlFor={`address-${address.id}`}>{`${
                      address.recipient
                    }\n${address.phone}\n${address.line1}${
                      address.line2 ? `, ${address.line2}` : ""
                    }\n${address.postalCode} ${address.city}`}</label>
                  </div>
                ))}
            </div>

            <div className="flex justify-between gap-8 my-8">
              <button
                className="btn-primary"
                onClick={() => setOpenModal(false)}
              >
                Continue shopping
              </button>
              <button
                className="btn-primary"
                onClick={() => handlePlaceOrder()}
              >
                {createOrderIsLoading ? "Creating order ..." : "Place order"}
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <ToastContainer position="top-center" />
    </div>
  );
}

export default CartPage;
