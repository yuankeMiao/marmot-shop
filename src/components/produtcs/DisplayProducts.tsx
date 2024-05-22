import { useEffect, useMemo, useState, useRef } from "react";
import { Pagination } from "flowbite-react";

import { useGetAllProductsQuery } from "../../redux/slices/apiQuery";
import ProductCard from "./ProductCard";
import { ProductQueryOptionsType, ProductReadDto } from "../../misc/productTypes";
import CardLoader from "../skeleton/CardLoader";

function DisplayProducts({ filter }: { filter: ProductQueryOptionsType }) {
  // pagination
  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const onPageChange = (page: number) => setCurrentPage(page);

  const containerRef = useRef<HTMLDivElement>(null);

  const [productList, setProductList] = useState<ProductReadDto[]>([]);
  const { data, error, isLoading } = useGetAllProductsQuery({
    ...filter,
    limit: itemsPerPage,
    offset: (currentPage - 1) * itemsPerPage,
  });

  useEffect(() => {
    if (data) {
      setProductList(data.data);
      setTotalItems(data.totalCount);
    }
  }, [data]);

  // otherwise after user on other page, then choose category, it will not work, becasue currentPage is still the same
  useEffect(() => {
    setCurrentPage(1);
  }, [filter.categoryId]);

  // no need to calculate total pages if totalItems didn't change, ie. on all products
  const totalPages = useMemo(
    () => Math.ceil(totalItems / itemsPerPage),
    [totalItems]
  );

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentPage]);

  return (
    <>
      <div className="flex sm:justify-center my-4">
        <Pagination
          className="hidden sm:flex"
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
        <Pagination
          className="flex sm:hidden"
          layout="navigation"
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
      <div
        ref={containerRef}
        className="grid grid-col-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 min-w-full  max-h-screen overflow-y-scroll"
      >
        {isLoading && (
          <>
            <CardLoader />
            <CardLoader />
            <CardLoader />
            <CardLoader />
            <CardLoader />
            <CardLoader />
          </>
        )}
        {error && <div>Something went wrong, please try again later</div>}
        {productList?.map((product) => (
          <ProductCard productItem={product} key={product.id} />
        ))}
      </div>
    </>
  );
}

export default DisplayProducts;
