import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import { useEffect } from "react";
import { fetchUserCart } from "./redux/slices/cartSlice";
import { useAppDispatch, useAppSelector } from "./appHooks/reduxHooks";

import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import ErrorPage from "./pages/ErrorPage";
import CartPage from "./pages/CartPage";
import AllProdutcsPage from "./pages/AllProdutcsPage";
import ProfilePage from "./pages/ProfilePage";
import Dashboard from "./pages/Dashboard";

import useCheckMe from "./appHooks/useCheckMe";
import ScrollToTop from "./components/utils/ScrollToTop";
import { UserType } from "./misc/userTypes";

function App() {
  const { currentUser, isAdmin, error } = useCheckMe();
  const dispatch = useAppDispatch();

  const ProtectedRoute = ({ isAllowed}: { isAllowed: boolean }) => {
    if (!isAllowed) {
      return <Navigate to="/" replace />;
    }
    return <Outlet />;
  };

  useEffect(() => {
    if (currentUser?.id) dispatch(fetchUserCart(currentUser.id));
  }, [currentUser, dispatch]);

  const currentCart = useAppSelector((state) => state.cart);

  return (
    <BrowserRouter basename="/">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="all-products" element={<AllProdutcsPage />} />
          <Route path="product/:productId" element={<ProductPage />} />
          <Route path="cart" element={<CartPage currentCart={currentCart} />} />
          <Route element={<ProtectedRoute isAllowed={!!currentUser}/>}>
            <Route path="profile" element={<ProfilePage currentUser={currentUser} />} />
          </Route>
          <Route element={<ProtectedRoute isAllowed={isAdmin}/>}>
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
