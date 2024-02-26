import { useEffect, useState } from "react";
import {
  useLazyGetProductsByCategoryQuery,
  useGetSortedProductsQuery
} from "../../redux/slices/apiQuery";
import ProductCard from "./ProductCard";
import { FilterType, ProductType } from "../../misc/productTypes";


function DisplayProducts({ filter }: { filter: FilterType }) {

  const [productList, setProductList] = useState<ProductType[]>([]);

  const { data, isError, isLoading } = useGetSortedProductsQuery({limit: 12, skip: 0, sort: filter.sortByPrice});


  const [getProductsByCatTrigger, { data: productsByCategory, isError: errorByCategory, isLoading: isLoadingByCategory }] = useLazyGetProductsByCategoryQuery();

  useEffect(() => {
    if (filter.category === "") {
      setProductList(data?.products || []);
    } else {
      getProductsByCatTrigger({ category: filter.category, limit: 12, skip: 0, sort: filter.sortByPrice});
      setProductList(productsByCategory?.products || []);
    }
  }, [filter.category, data, productsByCategory, filter.sortByPrice, getProductsByCatTrigger]);

  // console.log(productList)
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 min-w-full">
      {(isLoading || isLoadingByCategory) && <div>Loading...</div>}
      {(isError || errorByCategory ) && <div>Something wrong with the data, please refresh the page </div>}
      {productList?.map((product) => (
        <ProductCard productItem={product} key={product.id} />
      ))}
    </div>
  );
}

export default DisplayProducts;
