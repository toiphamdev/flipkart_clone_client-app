import "./App.css";
import Home from "./Container/Home";
import { Routes, Route } from "react-router-dom";
import ProductListPage from "./Container/ProductListPage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isUserLoggedIn } from "./redux/actions/auth.actions";
import ProductDetailsPage from "./Container/ProductDetailsPage";
import CartPage from "./Container/CartPage";
import { updateCart } from "./redux/actions/cart.actions";
import CheckoutPage from "./Container/CheckoutPage";
import OrderPage from "./Container/OrderPage";
import OrderDetailsPage from "./Container/OrderDetailsPage";
import ProductFilter from "./Container/ProductFillter";

function App() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
  }, [auth.authenticate]);
  useEffect(() => {
    console.log("App update cart");
    dispatch(updateCart());
  }, [auth.authenticate]);
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/bannerclicked" element={<div>hello</div>} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route
          path="/:productSlug/:productId/p"
          element={<ProductDetailsPage />}
        />
        <Route path="/search" element={<ProductFilter />} />
        <Route path="/view-cart" element={<CartPage />} />
        <Route path="/account/orders" element={<OrderPage />} />
        <Route path="/order_details/:orderId" element={<OrderDetailsPage />} />
        <Route path="/:slug" element={<ProductListPage />} />
      </Routes>
    </div>
  );
}

export default App;
