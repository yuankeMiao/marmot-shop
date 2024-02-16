// import { useEffect } from "react";

// import { useAppDispatch, useAppSelector } from "../../appHooks/reduxHooks";
// import { fetchAllProducts } from "../../redux/slices/productsSlice";
import ProductCard from "./ProductCard";

import { useGetAllProductsQuery } from "../../redux/slices/productQuery";

function DisplayProducts() {
  // const dispatch = useAppDispatch();
  // useEffect(() => {
  //   dispatch(fetchAllProducts());
  // }, [dispatch]);

  // const data = useAppSelector((state) => state.products.products);

  const { data, error, isLoading } = useGetAllProductsQuery();

  const productList = data;
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
