import { useEffect, useMemo, useState, useRef } from "react";
import { Pagination } from "flowbite-react";

import {
  useGetProductsByCategoryQuery,
  useGetSortedProductsQuery,
} from "../../redux/slices/apiQuery";
import ProductCard from "./ProductCard";
import { FilterType, ProductType } from "../../misc/productTypes";
import CardLoader from "../skeleton/CardLoader";

function DisplayProducts({ filter }: { filter: FilterType }) {
  // pagination
  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const onPageChange = (page: number) => setCurrentPage(page);

  const [productList, setProductList] = useState<ProductType[]>([]);
  const { data, error, isLoading, refetch } = useGetSortedProductsQuery(
    {
      limit: itemsPerPage,
      skip: (currentPage - 1) * itemsPerPage,
      sort: filter.sortByPrice,
    },
    {
      skip: filter.category !== "",
    }
  );
  const {
    data: productsByCategory,
    error: errorByCategory,
    isLoading: isLoadingByCategory,
    refetch: refetchByCategory,
  } = useGetProductsByCategoryQuery(
    {
      category: filter.category,
      limit: itemsPerPage,
      skip: (currentPage - 1) * itemsPerPage,
      sort: filter.sortByPrice,
    },
    {
      skip: filter.category === "",
    }
  );

  useEffect(() => {
    if (filter.category !== "") {
      refetchByCategory();
    } else {
      refetch();
    }
  }, [filter.category, refetch, refetchByCategory]);

  useEffect(() => {
    if (filter.category === "" && data) {
      setProductList(data.products);
      setTotalItems(data.total);
    } else if (filter.category !== "" && productsByCategory) {
      setProductList(productsByCategory.products);
      setTotalItems(productsByCategory.total);
    }
  }, [data, productsByCategory, filter.category]);

  // otherwise after user on other page, then choose category, it will not work, becasue currentPage is still the same
  useEffect(() => {
    setCurrentPage(1);
  }, [filter.category]);

  // no need to calculate total pages if totalItems didn't change, ie. on all products
  const totalPages = useMemo(
    () => Math.ceil(totalItems / itemsPerPage),
    [totalItems]
  );

  return (
    <>
      <div className="flex sm:justify-center my-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 min-w-full  max-h-screen overflow-y-scroll">
        {(isLoading || isLoadingByCategory) && (
          <>
            <CardLoader />
            <CardLoader />
            <CardLoader />
            <CardLoader />
            <CardLoader />
            <CardLoader />
          </>
        )}
        {(error || errorByCategory) && (
          <div>Something went wrong, please try again later</div>
        )}
        {productList?.map((product) => (
          <ProductCard productItem={product} key={product.id} />
        ))}
      </div>
    </>
  );
}

export default DisplayProducts;
