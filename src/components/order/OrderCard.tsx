import React, { useState } from "react";
import { OrderReadDto, OrderProductReadDto } from "../../misc/orderTypes";
import { Tooltip, Accordion } from "flowbite-react";
import CreateReviewForm from "../review/CreateReviewForm";
import { Link } from "react-router-dom";

const OrderCard = ({ order, role }: { order: OrderReadDto, role: string }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(order.id);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const totalOrderPrice = order.products
    .reduce((total, product) => total + product.totalPrice, 0)
    .toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const handleWriteReview = (productId: string) => {
    setSelectedProductId(productId);
    setShowReviewModal(true);
  };

  // console.log(order)

  return (
    <>
      <Accordion collapseAll alwaysOpen={false}>
        <Accordion.Panel>
          <Accordion.Title>
            <div className="flex flex-col gap-2 md:flex-row md:justify-between md:items-center">
              <div>
                <span className="font-semibold text-lg">Order ID: </span>
                <Tooltip content={isCopied ? "Copied!" : "Copy Order ID"}>
                  <button
                    onClick={handleCopy}
                    className="underline text-blue-500"
                  >
                    {order.id}
                  </button>
                </Tooltip>
                <p className={`text-sm text-gray-500 dark:text-gray-400 ${role === "admin" && "hidden"}`}>
                  If you have any problem, please include this ID when you
                  contact us.
                </p>
              </div>
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <span className="w-min bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
                  {order.status}
                </span>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Total Order Price: {totalOrderPrice}€
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Created: {new Date(order.createdDate).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Updated: {new Date(order.updatedDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </Accordion.Title>
          <Accordion.Content>
            <div className="grid gap-4 md:grid-cols-2">
              {order.products.map((product: OrderProductReadDto) => (
                <div
                  key={product.productId}
                  className="flex items-center border p-2 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
                >
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-20 h-20 object-cover rounded mr-4"
                  />
                  <div className="flex-1">
                    <Link to={`/product/${product.productId}`}>
                      <h4 className="font-medium text-gray-900 dark:text-gray-100">
                        {product.title}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        <span className="block">
                          Quantity: {product.quantity}
                        </span>
                        <span className="block">
                          Price: {product.actualPrice.toLocaleString()}€
                        </span>
                        <span className="block">
                          Total Price: {product.totalPrice.toLocaleString()}€
                        </span>
                      </p>
                    </Link>
                    <button
                      onClick={() => handleWriteReview(product.productId)}
                      className={`mt-2 text-sm underline text-blue-600 dark:text-blue-400 ${role === "admin" && "hidden"}`}
                    >
                      Write a Review
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Accordion.Content>
        </Accordion.Panel>
      </Accordion>

      {showReviewModal && selectedProductId && (
        <CreateReviewForm
          productId={selectedProductId}
          onClose={() => setShowReviewModal(false)}
        />
      )}
    </>
  );
};

export default OrderCard;
