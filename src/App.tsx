import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import Register from "./pages/Register";
import ErrorPage from "./pages/ErrorPage";
import CartPage from "./pages/CartPage";

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="product/:productId" element={<ProductPage />} />
          <Route path="profile/:userId" element={<Register />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
