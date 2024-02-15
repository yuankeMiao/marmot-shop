import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../appHooks/reduxHooks";
import { fetchAllProducts } from "../../redux/slices/productsSlice";
import ProductCard from "./ProductCard";


function DisplayProducts() {
    const dispatch = useAppDispatch();
    useEffect(() => {
      dispatch(fetchAllProducts());
    }, [dispatch]);
  
    const productList = useAppSelector((state) => state.products.products);
    // console.log(productList)
  return (
    <div className="grid grid-cols-3 gap-4 min-w-96">
        {productList.map((product) => <ProductCard productItem={product}/>)}
    </div>
  )
}

export default DisplayProducts