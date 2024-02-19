// import { useAppDispatch, useAppSelector } from "../../appHooks/reduxHooks";
// import { fetchAllProducts } from "../../redux/slices/productsSlice";
import {
  useGetAllProductsQuery,
  useGetProductsByCategoryQuery,
  useGetSortedProductsQuery
} from "../../redux/slices/productQuery";
import ProductCard from "./ProductCard";
import { FilterType, ProductType } from "../../misc/productTypes";
import { useEffect, useState } from "react";

function DisplayProducts({ filter }: { filter: FilterType }) {

  const [productList, setProductList] = useState<ProductType[]>([]);

  // const { data, error, isLoading } = useGetAllProductsQuery(12);
  const { data, error, isLoading } = useGetSortedProductsQuery({limit: 12, sort: filter.sortByPrice});

  const {
    data: productsByCategory,
    error: errorByCategory,
    isLoading: isLoadingByCategory,
  } = useGetProductsByCategoryQuery({category: filter.category, sort: filter.sortByPrice});

  useEffect(() => {
    if (filter.category === "") {
      setProductList(data || []);
    } else {
      setProductList(productsByCategory || []);
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
