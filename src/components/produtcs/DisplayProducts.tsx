import { useEffect, useMemo, useState } from "react";
import { Pagination } from "flowbite-react";

import {
  useGetProductsByCategoryQuery,
  useGetSortedProductsQuery,
} from "../../redux/slices/apiQuery";
import ProductCard from "./ProductCard";
import { FilterType, ProductType } from "../../misc/productTypes";

function DisplayProducts({ filter }: { filter: FilterType }) {
  // pagination
  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const onPageChange = (page: number) => setCurrentPage(page);

  const [productList, setProductList] = useState<ProductType[]>([]);
  const { data, isError, isLoading, refetch } = useGetSortedProductsQuery(
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
    isError: errorByCategory,
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
  }
  , [filter.category, refetch, refetchByCategory]);

  useEffect(() => {
    if (filter.category === "" && data) {
      setProductList(data.products);
      setTotalItems(data.total);
    } else if (filter.category !== "" && productsByCategory ) {
      setProductList(productsByCategory.products);
      setTotalItems(productsByCategory.total);
    }
  }, [data, productsByCategory, filter.category]);

  // no need to calculate total pages if totalItems didn't change, ie. on all products
  const totalPages = useMemo(
    () => Math.ceil(totalItems / itemsPerPage),
    [totalItems]
  );

  return (
    <>
      <div className="flex overflow-x-auto sm:justify-center my-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 min-w-full">
        {(isLoading || isLoadingByCategory) && <div>Loading...</div>}
        {(isError || errorByCategory) && (
          <div>Something wrong with the data, please refresh the page </div>
        )}
        {productList?.map((product) => (
          <ProductCard productItem={product} key={product.id} />
        ))}
      </div>
      <div className="flex overflow-x-auto sm:justify-center my-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </>
  );
}

export default DisplayProducts;
