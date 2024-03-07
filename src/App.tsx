import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

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
  useGetCurrentUser();

  return (
    <div className="dark:bg-gray-800 dark:text-gray-100 transition-all duration-700 relative">
      <BrowserRouter basename="/">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="all-products" element={<AllProdutcsPage />} />
            <Route path="product/:productId" element={<ProductPage />} />
            <Route
              path="cart"
              element={<CartPage />}
            />
            <Route
              path="profile"
              element={<ProfilePage />}
            />
            <Route
              path="dashboard"
              element={<Dashboard />}
            />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
