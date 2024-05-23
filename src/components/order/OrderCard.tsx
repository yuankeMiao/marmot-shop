import React, { useState } from "react";
import { OrderReadDto, OrderProductReadDto, OrderStatusType } from "../../misc/orderTypes";
import { Tooltip, Accordion } from "flowbite-react";
import { useUpdateOrderMutation } from "../../redux/slices/orderApi";
import OrderItemCard from "./OrderItemCard";

const OrderCard = ({ order, role }: { order: OrderReadDto, role: string }) => {
  const [isCopied, setIsCopied] = useState(false);

  const [newStatus, setNewStatus] = useState<OrderStatusType>(order.status);
  const [updateOrder] = useUpdateOrderMutation();

  const handleCopy = () => {
    navigator.clipboard.writeText(order.id);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const status = e.target.value as OrderStatusType;
    setNewStatus(status);
    await updateOrder({ id: order.id, updateData: { status: status } });
  };

  const totalOrderPrice = order.products
    .reduce((total, product) => total + product.totalPrice, 0)
    .toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");



  return (
    <>
      <Accordion collapseAll alwaysOpen={false}>
        <Accordion.Panel>
          <Accordion.Title>
            <div className="flex flex-col gap-2 md:flex-row md:justify-between md:items-center">
              <div>
                <span className="font-semibold text-lg">Order ID: </span>
                <Tooltip content={isCopied ? "Copied!" : "Copy Order ID"}>
                  <button onClick={handleCopy} className="underline text-blue-500">
                    {order.id}
                  </button>
                </Tooltip>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  If you have any problem, please include this ID when you contact us.
                </p>
              </div>
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                {role === "admin" && (
                  <select
                    className="w-min bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800"
                    value={newStatus}
                    onChange={handleStatusChange}
                  >
                    <option value="Shipped">Shipped</option>
                    <option value="Pending">Pending</option>
                    <option value="AwaitingPayment">Awaiting Payment</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipping">Shipping</option>
                    <option value="Completed">Completed</option>
                    <option value="Refunded">Refunded</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                )}
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
            <div>
              <p className="my-4">Shipping address: {order.shippingAddress}</p>
              <div className="grid gap-4 md:grid-cols-2">
              {order.products.map((product: OrderProductReadDto) => (
               <OrderItemCard product={product} role={role} />
              ))}
              </div>
            </div>
          </Accordion.Content>
        </Accordion.Panel>
      </Accordion>


    </>
  );
};

export default OrderCard;
