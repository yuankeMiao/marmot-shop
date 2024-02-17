
// import { useAppDispatch, useAppSelector } from "../../appHooks/reduxHooks";
// import { fetchAllProducts } from "../../redux/slices/productsSlice";
import { useGetAllProductsQuery } from "../../redux/slices/productQuery";
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

  useEffect(() => {
    if (data) {
      let filteredProducts = [...data]; //because data is immutable

      if (filter.categories.length > 0) {
        filteredProducts = filteredProducts.filter((product) =>
          filter.categories.includes(product.category)
        );
      }

      if(filter.sortByPrice === "asc") {
        filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
      } else if(filter.sortByPrice === "desc") {
        filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
      }

      setProductList(filteredProducts);
    }
  }
  , [data, filter.categories, filter.sortByPrice]);

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
