import { useState, useEffect, useMemo } from "react";
import { Pagination } from "flowbite-react";
import {
  OrderQueryOptionsType,
  OrderReadDto,
  OrderStatusType,
} from "../../misc/orderTypes";
import OrderCard from "../order/OrderCard";
import { useGetAllOrdersQuery } from "../../redux/slices/orderApi";

const OrderManager = () => {
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [sortOption, setSortOption] = useState<
    "CreatedDateAsc" | "CreatedDateDesc" | "UpdatedDateAsc" | "UpdatedDateDesc"
  >("CreatedDateDesc");
  const [orderStatus, setOrderStatus] = useState<OrderStatusType | undefined>(
    undefined
  );
  const [filter, setFilter] = useState<OrderQueryOptionsType>({});
  const [orders, setOrders] = useState<OrderReadDto[]>([]);

  const {
    data: ordersQueryResult,
    error,
    isLoading,
    isFetching,
  } = useGetAllOrdersQuery({
    ...filter,
    limit: itemsPerPage,
    offset: (currentPage - 1) * itemsPerPage,
  });

  useEffect(() => {
    if (ordersQueryResult && Array.isArray(ordersQueryResult.data)) {
      //   console.log("Orders Data:", ordersQueryResult.data);
      setOrders(ordersQueryResult.data);
      setTotalItems(ordersQueryResult.totalCount || 0);
    }
  }, [ordersQueryResult]);

  useEffect(() => {
    console.log("Filter changed:", {
      sortBy: sortOption.includes("CreatedDate")
        ? "CreatedDate"
        : "UpdatedDate",
      sortOrder: sortOption.includes("Asc") ? "Asc" : "Desc",
      status: orderStatus,
    });
    setFilter((prev) => ({
      ...prev,
      sortBy: sortOption.includes("CreatedDate")
        ? "CreatedDate"
        : "UpdatedDate",
      sortOrder: sortOption.includes("Asc") ? "Asc" : "Desc",
      status: orderStatus,
    }));
    setCurrentPage(1); // Reset to first page when filter changes
  }, [sortOption, orderStatus]);

  const totalPages = useMemo(
    () => Math.ceil(totalItems / itemsPerPage),
    [totalItems]
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSortOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(
      e.target.value as
        | "CreatedDateAsc"
        | "CreatedDateDesc"
        | "UpdatedDateAsc"
        | "UpdatedDateDesc"
    );
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOrderStatus(e.target.value as OrderStatusType);
  };

  return (
    <div className="p-8 flex flex-col gap-8">
      <div className="flex justify-end gap-4 mb-4">
        <select
          className="my-2 text-sm rounded-lg border border-gray-300 dark:bg-gray-700"
          value={sortOption}
          onChange={handleSortOptionChange}
        >
          <option value="CreatedDateAsc">Sort by Created Date: Asc</option>
          <option value="CreatedDateDesc">Sort by Created Date: Desc</option>
          <option value="UpdatedDateAsc">Sort by Updated Date: Asc</option>
          <option value="UpdatedDateDesc">Sort by Updated Date: Desc</option>
        </select>
        <select
          className="my-2 text-sm rounded-lg border border-gray-300 dark:bg-gray-700"
          value={orderStatus || ""}
          onChange={handleStatusChange}
        >
          <option value="">All Statuses</option>
          <option value="Shipped">Shipped</option>
          <option value="Pending">Pending</option>
          <option value="AwaitingPayment">Awaiting Payment</option>
          <option value="Processing">Processing</option>
          <option value="Shipping">Shipping</option>
          <option value="Completed">Completed</option>
          <option value="Refunded">Refunded</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {isLoading || isFetching ? (
        <p>Loading orders...</p>
      ) : (
        <>
          {orders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            orders.map((order) => <OrderCard key={order.id} order={order} role="admin" />)
          )}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
      {error && <p>Error loading orders</p>}
    </div>
  );
};

export default OrderManager;
