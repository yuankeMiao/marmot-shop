import { useState } from "react";
import { Modal } from "flowbite-react";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

import { useAppDispatch } from "../../appHooks/reduxHooks";
import { addToCart } from "../../redux/slices/cartSlice";
import { CartItemType, ProductType } from "../../misc/productTypes";

function ShopAndFav({
  newItem,
  quantity,
}: {
  newItem: ProductType;
  quantity: number;
}) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);

  const addToCartItem: CartItemType = {
    id: newItem.id,
    title: newItem.title,
    price: newItem.price,
    quantity: quantity,
    total: newItem.price * quantity,
    discountPercentage: newItem.discountPercentage,
    discountedPrice: Math.round((newItem.price * quantity * (100 - newItem.discountPercentage)) / 100),
    thumbnail: newItem.thumbnail,
  };

  const handleAddToBag = () => {
    dispatch(addToCart(addToCartItem));
    setOpenModal(true);
  };

  const handleCheckout = () => {
    setOpenModal(false);
    navigate("/cart");
  };

  return (
    <div className="px-4 flex justify-between items-center gap-8">
      <button className="btn-primary" onClick={handleAddToBag}>
        <FontAwesomeIcon icon={faCartShopping} className="mx-2" />
        Add to Bag
      </button>

      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Added to My Bag!</Modal.Header>
        <Modal.Body>
          <div className="space-y-6 dark:text-gray-100">
            <div className="flex gap-8">
              <img
                src={addToCartItem.thumbnail}
                alt={addToCartItem.title}
                className="aspect-square h-24 w-24 rounded-md object-cover"
              />
              <div className="flex flex-col justify-between">
                <h3 className="text-xl font-bold">{addToCartItem.title}</h3>
                <p className="text-xl font-semibold">{addToCartItem.price} €</p>
                <p className="text-sm">Quantity: {addToCartItem.quantity}</p>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn-primary" onClick={() => setOpenModal(false)}>
            Continue Shopping
          </button>
          <button className="btn-primary" onClick={handleCheckout}>
            Check out
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ShopAndFav;
