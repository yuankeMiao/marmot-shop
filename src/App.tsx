import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import { useAppSelector } from "./appHooks/reduxHooks";

import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import ErrorPage from "./pages/ErrorPage";
import CartPage from "./pages/CartPage";
import AllProdutcsPage from "./pages/AllProdutcsPage";
import ProfilePage from "./pages/ProfilePage";
import Dashboard from "./pages/Dashboard";

import useGetCurrentUser from "./appHooks/useGetCurrentUser";
import ScrollToTop from "./components/utils/ScrollToTop";

function App() {
  useGetCurrentUser()
  const currentUser = useAppSelector((state) => state.currentUser.user);

  const ProtectedRoute = ({ isAllowed}: { isAllowed: boolean }) => {
    if (!isAllowed) {
      return <Navigate to="/" replace />;
    }
    return <Outlet />;
  };

  return (
    <BrowserRouter basename="/">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="all-products" element={<AllProdutcsPage />} />
          <Route path="product/:productId" element={<ProductPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route element={<ProtectedRoute isAllowed={!!currentUser}/>}>
            <Route path="profile" element={<ProfilePage currentUser={currentUser} />} />
          </Route>
          <Route element={<ProtectedRoute isAllowed={currentUser?.role === "admin"}/>}>
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
