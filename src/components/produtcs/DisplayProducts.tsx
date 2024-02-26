import { useEffect, useState } from "react";
import {
  useGetProductsByCategoryQuery,
  useGetSortedProductsQuery
} from "../../redux/slices/apiQuery";
import ProductCard from "./ProductCard";
import { FilterType, ProductType } from "../../misc/productTypes";


function DisplayProducts({ filter }: { filter: FilterType }) {

  const [productList, setProductList] = useState<ProductType[]>([]);

  const { data, error, isLoading } = useGetSortedProductsQuery({limit: 12, skip: 0, sort: filter.sortByPrice});

  const {
    data: productsByCategory,
    error: errorByCategory,
    isLoading: isLoadingByCategory,
  } = useGetProductsByCategoryQuery({category: filter.category, limit: 12, skip: 0, sort: filter.sortByPrice});

  useEffect(() => {
    if (filter.category === "") {
      setProductList(data?.products || []);
    } else {
      setProductList(productsByCategory?.products || []);
    }
  }, [filter.category, data, productsByCategory]);

  // console.log(productList)
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 min-w-full">
      {isLoading && <div>Loading...</div>}
      {productList?.map((product) => (
        <ProductCard productItem={product} key={product.id} />
      ))}
    </div>
  );
}

export default DisplayProducts;
