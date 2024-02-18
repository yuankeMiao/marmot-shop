// import { useAppDispatch, useAppSelector } from "../../appHooks/reduxHooks";
// import { fetchAllProducts } from "../../redux/slices/productsSlice";
import {
  useGetAllProductsQuery,
  useGetProductsByCategoryQuery,
} from "../../redux/slices/productQuery";
import ProductCard from "./ProductCard";
import { FilterType, ProductType } from "../../misc/productTypes";
import { useEffect, useState } from "react";

function DisplayProducts({ filter }: { filter: FilterType }) {
  // const dispatch = useAppDispatch();
  // useEffect(() => {
  //   dispatch(fetchAllProducts());
  // }, [dispatch]);

  // const {products: data, loading: isLoading} = useAppSelector((state) => state.products);
  const [productList, setProductList] = useState<ProductType[]>([]);

  const { data, error, isLoading } = useGetAllProductsQuery();
  const {
    data: productsByCategory,
    error: errorByCategory,
    isLoading: isLoadingByCategory,
  } = useGetProductsByCategoryQuery(filter.category);

  useEffect(() => {
    if (filter.category === "") {
      setProductList(data || []);
    } else {
      setProductList(productsByCategory || []);
    }
  }, [filter.category, data, productsByCategory]);

  useEffect(() => {
    if (productList) {
      if (filter.sortByPrice === "asc") {
        setProductList([...productList].sort((a, b) => a.price - b.price));
      } else if (filter.sortByPrice === "desc") {
        setProductList([...productList].sort((a, b) => b.price - a.price));
      }
    }
  }, [filter.sortByPrice, productList]);

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
