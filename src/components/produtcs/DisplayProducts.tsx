import { useEffect, useState } from "react";
import { Pagination } from "flowbite-react";

import {
  useLazyGetProductsByCategoryQuery,
  useLazyGetSortedProductsQuery,
} from "../../redux/slices/apiQuery";
import ProductCard from "./ProductCard";
import { FilterType, ProductType } from "../../misc/productTypes";
import { set } from "react-hook-form";

function DisplayProducts({ filter }: { filter: FilterType }) {
  const [productList, setProductList] = useState<ProductType[]>([]);
  const [getSortedProductsTrigger, { data, isError, isLoading }] =
    useLazyGetSortedProductsQuery();
  const [
    getProductsByCatTrigger,
    {
      data: productsByCategory,
      isError: errorByCategory,
      isLoading: isLoadingByCategory,
    },
  ] = useLazyGetProductsByCategoryQuery();

  // pagination
  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const onPageChange = (page: number) => setCurrentPage(page);

  useEffect(() => {
    if (filter.category === "") {
      getSortedProductsTrigger({
        limit: itemsPerPage,
        skip: (currentPage - 1) * itemsPerPage,
        sort: filter.sortByPrice,
      });
      setProductList(data?.products || []);
      setTotalItems(data?.total || 0);
    } else {
      getProductsByCatTrigger({
        category: filter.category,
        limit: itemsPerPage,
        skip: (currentPage - 1) * itemsPerPage,
        sort: filter.sortByPrice,
      });
      setProductList(productsByCategory?.products || []);
      setTotalItems(productsByCategory?.total || 0);
    }
  }, [
    filter.category,
    data,
    productsByCategory,
    filter.sortByPrice,
    getProductsByCatTrigger,
    getSortedProductsTrigger,
    currentPage,
  ]);

  // console.log(productList)
  return (
    <>
      <div className="flex overflow-x-auto sm:justify-center my-4">
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(totalItems / itemsPerPage)}
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
          totalPages={Math.ceil(totalItems / itemsPerPage)}
          onPageChange={onPageChange}
        />
      </div>
    </>
  );
}

export default DisplayProducts;
