import { BrowserRouter, Routes, Route } from "react-router-dom";
import useCheckMe from "./appHooks/useCheckMe";
import { useEffect } from "react";
import { fetchUserCart } from "./redux/slices/cartSlice";
import { useAppDispatch, useAppSelector } from "./appHooks/reduxHooks";

import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import Register from "./pages/Register";
import ErrorPage from "./pages/ErrorPage";
import CartPage from "./pages/CartPage";
import AllProdutcsPage from "./pages/AllProdutcsPage";
import ProfilePage from "./pages/ProfilePage";
import Dashboard from "./pages/Dashboard";

function App() {
  const {currentUser} = useCheckMe();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (currentUser?.id) dispatch(fetchUserCart(currentUser.id));
  }, [currentUser, dispatch]);

  const currentCart = useAppSelector((state) => state.cart);

  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="all-products" element={<AllProdutcsPage />} />
          <Route path="product/:productId" element={<ProductPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="cart" element={<CartPage currentCart={currentCart} />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
