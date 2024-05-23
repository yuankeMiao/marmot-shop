import { UserReadDto } from "../../misc/userTypes";
import { Link } from "react-router-dom";
import { useGetMyOrdersQuery } from "../../redux/slices/orderApi";
import { useEffect, useState, useMemo } from "react";
import { OrderReadDto } from "../../misc/orderTypes";
import OrderCard from "../order/OrderCard";
import { Pagination } from "flowbite-react";

const MyOrders = ({ user }: { user?: UserReadDto }) => {
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [sortOption, setSortOption] = useState<"CreatedDateAsc" | "CreatedDateDesc" | "UpdatedDateAsc" | "UpdatedDateDesc">("CreatedDateDesc");
  const [orders, setOrders] = useState<OrderReadDto[]>([]);

  const { data: orderQueryResult, error, isLoading } = useGetMyOrdersQuery({
    limit: itemsPerPage,
    offset: (currentPage - 1) * itemsPerPage,
    sortBy: sortOption.includes("CreatedDate") ? "CreatedDate" : "UpdatedDate",
    sortOrder: sortOption.includes("Asc") ? "Asc" : "Desc",
  });

  useEffect(() => {
    if (orderQueryResult) {
      setOrders(orderQueryResult.data);
      setTotalItems(orderQueryResult.totalCount);
    }
  }, [orderQueryResult]);

  useEffect(() => {
    setCurrentPage(1);
  }, [sortOption]);

  const totalPages = useMemo(() => Math.ceil(totalItems / itemsPerPage), [totalItems]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSortOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value as "CreatedDateAsc" | "CreatedDateDesc" | "UpdatedDateAsc" | "UpdatedDateDesc");
  };

  if (!user)
    return (
      <>
        <h2 className="text-xl font-semibold my-8">My orders</h2>
        <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-xl flex flex-col items-center gap-8">
          <p>You don't have any order yet, checkout your items now!</p>
          <button className="btn-primary w-40">
            <Link to="/cart">Go to cart</Link>
          </button>
        </div>
      </>
    );

  return (
    <div>
      <h2 className="text-xl font-semibold my-8">My Orders</h2>
      <div className="flex justify-end gap-4 mb-4">
        <select className="my-2 text-sm rounded-lg border border-gray-300 dark:bg-gray-700" value={sortOption} onChange={handleSortOptionChange}>
          <option value="CreatedDateAsc">Sort by Created Date: Asc</option>
          <option value="CreatedDateDesc">Sort by Created Date: Desc</option>
          <option value="UpdatedDateAsc">Sort by Updated Date: Asc</option>
          <option value="UpdatedDateDesc">Sort by Updated Date: Desc</option>
        </select>
      </div>
      {isLoading ? (
        <p>Loading orders...</p>
      ) : (
        <>
          {orders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            orders.map((order) => <OrderCard key={order.id} order={order} role="customer" />)
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
      {error && <p>Error loading orders.</p>}
    </div>
  );
};

export default MyOrders;
