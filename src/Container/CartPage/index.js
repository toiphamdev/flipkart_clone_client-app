import Layout from "../../components/Layout";
import { useSelector, useDispatch } from "react-redux";
import "./style.css";
import CartItem from "./CartItem";
import { useState, useEffect } from "react";
import { addToCart, getCartItems } from "../../redux/actions/cart.actions";
import PriceDetails from "../../components/PriceDetails";
import { Link } from "react-router-dom";

function CartPage() {
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [cartItems, setCartItems] = useState({});
  const [cartId, setCartId] = useState("");
  useEffect(() => {
    setCartItems(cart.cartItems);
  }, [cart.cartItems]);
  useEffect(() => {
    setCartId(cart._id);
  }, [cart._id]);
  useEffect(() => {
    if (auth.authenticate) {
      dispatch(getCartItems());
    }
  }, [auth.authenticate]);
  const onQuantityDecrement = (_id, qty) => {
    const { name, price, img } = cartItems[_id];
    dispatch(addToCart({ _id, qty, name, price, img }, -1));
  };
  const onQuantityIncrement = (_id, qty) => {
    const { name, price, img } = cartItems[_id];
    console.log(_id, qty);
    dispatch(addToCart({ _id, qty, name, price, img }, 1));
  };
  return (
    <Layout>
      <div className="cartContainer">
        <div className="cartProducts">
          <div style={{ boxShadow: "0 0 0px 1px #cecece" }}>
            <div className="cartRow">
              <div>Từ địa chỉ đã lưu</div>
              <button>Nhập mã pin giao hàng</button>
            </div>
            {Object.keys(cartItems).map((key, index) => {
              return (
                <CartItem
                  onQuantityDec={onQuantityDecrement}
                  onQuantityInc={onQuantityIncrement}
                  key={index}
                  cartId={cartId}
                  cartItem={cartItems[key]}
                />
              );
            })}

            <div
              style={{
                textAlign: "right",
                padding: "16px 0",
                backgroundColor: "#fff",
                boxShadow: "0 -2px 10px 0 rgb(0 0 0 / 10%)",
                position: "sticky",
                width: "100%",
                bottom: 0,
              }}
            >
              <Link
                to="/checkout"
                className="btnSe"
                style={{
                  padding: "12px 24px",
                  marginRight: "10px",
                  textDecoration: "none",
                }}
              >
                Tính tiền
              </Link>
            </div>
          </div>
        </div>
        <div style={{ width: "35%" }}>
          <PriceDetails
            totalItem={Object.keys(cartItems).reduce((qty, key) => {
              return qty + cartItems[key].qty;
            }, 0)}
            totalPrice={Object.keys(cartItems).reduce((price, key) => {
              return price + cartItems[key].qty * cartItems[key].price;
            }, 0)}
          />
        </div>
      </div>
    </Layout>
  );
}

export default CartPage;
