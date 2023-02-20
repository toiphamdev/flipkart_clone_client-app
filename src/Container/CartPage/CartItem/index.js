import { generatePublicUrl } from "../../../urlConfig";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeCartItem } from "../../../redux/actions";

function CartItem(props) {
  const [qty, setQty] = useState(props.cartItem.qty);
  const { _id, name, price, img } = props.cartItem;
  const dispatch = useDispatch();
  const onQuantityDecrement = () => {
    if (qty <= 1) return;
    setQty(qty - 1);
    props.onQuantityDec(_id, qty - 1);
  };
  const onQuantityIncrement = () => {
    setQty(qty + 1);
    props.onQuantityInc(_id, qty + 1);
  };
  const handleDeleteItem = () => {
    dispatch(removeCartItem({ productId: _id, cartId: props.cartId }));
  };
  return (
    <div className="cartItemContainer">
      <div
        style={{
          width: "100%",
          display: "flex",
        }}
      >
        <div>
          <a href="/">
            <img
              style={{
                width: "128px",
                height: "128px",
                objectFit: "contain",
              }}
              src={generatePublicUrl(img)}
              alt=""
            />
          </a>
        </div>
        <div className="cartItemDetails">
          <a href="/">{name}</a>
          <div style={{ padding: "10px 0" }}>
            <span className="through priceText">3000</span>
            <span style={{ fontSize: "24px", fontWeight: 500 }}>
              {price} vnd
            </span>
            <span
              style={{
                color: "#388e3c",
              }}
            >
              {" "}
              giảm 8%
            </span>
          </div>
          <div style={{ fontSize: "24px", color: "red" }}>Hết hàng</div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          width: "100%",
          marginTop: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "128px",
            marginLeft: "20px",
          }}
        >
          <button onClick={onQuantityIncrement} className="quantityControlBtn">
            +
          </button>
          <input value={qty} readOnly className="quantityControlInput" />
          <button onClick={onQuantityDecrement} className="quantityControlBtn">
            -
          </button>
        </div>
        <span className="cartActionBtn">Lưu sau</span>
        <span onClick={() => handleDeleteItem()} className="cartActionBtn">
          Xóa
        </span>
      </div>
    </div>
  );
}

export default CartItem;
