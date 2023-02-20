import Layout from "../../components/Layout";
import {
  Anchor,
  MaterialButton,
  MaterialInput,
} from "../../components/MaterialUI";
import CheckoutStep from "./CheckoutStep";
import { useState, useEffect } from "react";
import "./style.css";
import { BsTruck, BsStarFill, BsBellFill } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import {
  addOrder,
  addToCart,
  getAddress,
  getCartItems,
  login,
} from "../../redux/actions";
import AddressForm from "./AddressForm";
import PriceDetails from "../../components/PriceDetails";
import CartItem from "../CartPage/CartItem";

function CheckoutPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmAddress, setConfirmAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [orderSummary, setOrderSummary] = useState(false);
  const [orderConfirmation, setOrderConfirmation] = useState(false);
  const [confirmOrder, setConfirmOrder] = useState(false);
  const [newAddress, setNewAddress] = useState(false);
  const [address, setAddress] = useState([]);
  const auth = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const [cartItems, setCartItems] = useState({});
  const [paymentOption, setPaymentOption] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    setCartItems(cart.cartItems);
  }, [cart.cartItems]);
  const selectAddress = (addr) => {
    // console.log(addr);
    const updatedAddress = address.map((adr) =>
      adr._id === addr._id
        ? { ...adr, selected: true }
        : { ...adr, selected: false }
    );
    setAddress(updatedAddress);
  };
  const onConfirmOrder = () => {
    const totalPrice = Object.keys(cartItems).reduce((price, key) => {
      return price + cartItems[key].qty * cartItems[key].price;
    }, 0);
    const items = Object.keys(cartItems).map((key) => {
      return {
        productId: key,
        payablePrice: cartItems[key].price,
        purchasedQty: cartItems[key].qty,
      };
    });
    const payload = {
      addressId: selectedAddress._id,
      totalAmount: totalPrice,
      paymentType: "cod",
      items: items,
      paymentStatus: "pending",
    };

    dispatch(addOrder(payload));
    setConfirmOrder(true);
  };
  const handleSendEmail = () => {
    setOrderConfirmation(true);
    setOrderSummary(false);
    setPaymentOption(true);
  };
  const onQuantityDecrement = (_id, qty) => {
    const { name, price, img } = cartItems[_id];
    dispatch(addToCart({ _id, qty, name, price, img }, -1));
  };
  const onQuantityIncrement = (_id, qty) => {
    const { name, price, img } = cartItems[_id];
    console.log(_id, qty);
    dispatch(addToCart({ _id, qty, name, price, img }, 1));
  };
  const confirmDeliveryAddress = (addr) => {
    setSelectedAddress(addr);
    setOrderSummary(true);
    setConfirmAddress(true);
  };
  const enableAddressEditForm = (addr) => {
    const updatedAddress = address.map((adr) =>
      adr._id === addr._id ? { ...adr, edit: true } : { ...adr, edit: false }
    );
    setAddress(updatedAddress);
  };
  const userLogin = () => {
    dispatch(login({ email, password }));
  };
  const renderStep1 = () => {
    let data = auth.authenticate ? (
      <span className="stepCompleted">{auth.user.email}</span>
    ) : (
      <>
        <div style={{ marginBottom: "10px" }} className="loginContainer">
          <MaterialInput
            type="text"
            label="Nhập email, số điện thoại"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <MaterialInput
            type="password"
            label="Nhập mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            // rightElement={<a href="#">Forgot?</a>}
          />
          <div
            style={{
              marginTop: "50px",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <MaterialButton
              title="Login"
              bgColor="#fb641b"
              textColor="#ffffff"
              onClick={() => userLogin()}
            />
          </div>
        </div>
        <div className="authSecure">
          <span>Lợi ích đăng nhập </span>
          <ul>
            <li>
              <BsTruck />
              <span>Dễ dàng theo dõi đơn hàng, đổi trả hàng </span>
            </li>
            <li>
              <BsBellFill />
              <span>Nhận thông báo và đề xuất có liên quan</span>
            </li>
            <li>
              <BsStarFill />
              <span>Danh sách yêu thích, Đánh giá, Xếp hạng ...</span>
            </li>
          </ul>
        </div>
      </>
    );
    return data;
  };
  const renderStep2 = () => {
    return (
      <>
        {confirmAddress ? (
          <span className="stepCompleted">{selectedAddress.address}</span>
        ) : (
          address.length > 0 && (
            <div className="addressContainer">
              {address.map((adr, index) => {
                return (
                  <div key={index}>
                    <div className="addressItem">
                      <div className="addressItemInfo">
                        <div>
                          <input
                            onClick={() => selectAddress(adr)}
                            type="radio"
                            name="address"
                            value={adr._id}
                          />
                        </div>
                        <div style={{ marginLeft: "10px" }}>
                          <div>
                            <span>{adr.name}</span>
                            <span>{adr.addressType}</span>
                            <span>{adr.mobileNumber}</span>
                          </div>
                          <div>{adr.address}</div>
                          <div id={`address-${adr._id}`}>
                            {adr.selected && !adr.edit && (
                              <MaterialButton
                                title="GIAO TẠI ĐÂY"
                                bgColor="#fb641b"
                                textColor="#ffffff"
                                onClick={() => confirmDeliveryAddress(adr)}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                      {adr.selected && (
                        <div>
                          <Anchor
                            onClick={() => enableAddressEditForm(adr)}
                            name="Edit"
                          />
                        </div>
                      )}
                    </div>
                    {adr.edit && !selectedAddress && (
                      <AddressForm
                        withoutLayout={true}
                        onSubmitForm={onAddressSubmit}
                        initialData={adr}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          )
        )}
      </>
    );
  };
  useEffect(() => {
    if (auth.authenticate) {
      dispatch(getAddress());
      dispatch(getCartItems());
    }
  }, [auth.authenticate]);

  useEffect(() => {
    const address = user.address.map((adr) => ({
      ...adr,
      selected: false,
      edit: false,
    }));
    setAddress(address);
  }, [user.address]);

  const onAddressSubmit = (addr) => {
    setSelectedAddress(addr);
    setConfirmAddress(true);
    setOrderSummary(true);
  };

  if (confirmOrder) {
    return (
      <Layout>
        <div>Cảm ơn bạn đã sử dụng dịch vụ</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="checkoutContainer">
        <div className="checkout">
          <CheckoutStep
            active={!auth.authenticate}
            number={1}
            title="LOGIN OR SIGNUP"
          >
            {renderStep1()}
          </CheckoutStep>
          <CheckoutStep
            active={auth.authenticate && !selectedAddress}
            number={2}
            title="DELIVERY ADDRESS"
          >
            {renderStep2()}
          </CheckoutStep>
          {!confirmAddress && auth.authenticate ? (
            <CheckoutStep
              onClick={() => setNewAddress(true)}
              number={"+"}
              style={{ cursor: newAddress ? "" : "pointer" }}
              title="ADD ADDRESS"
            >
              {newAddress && (
                <AddressForm
                  // selectAddress={selectAddress}
                  // enableAddressEditForm={enableAddressEditForm}
                  // confirmDeliveryAddress={confirmDeliveryAddress}
                  onSubmitForm={() => {
                    setNewAddress(false);
                  }}
                  // adr={adr}
                />
              )}
            </CheckoutStep>
          ) : null}
          <CheckoutStep active={orderSummary} number={3} title="SUMMARY">
            {orderSummary ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                {Object.keys(cartItems).map((key, index) => {
                  return (
                    <CartItem
                      onQuantityDec={onQuantityDecrement}
                      onQuantityInc={onQuantityIncrement}
                      key={index}
                      cartItem={cartItems[key]}
                    />
                  );
                })}
              </div>
            ) : orderConfirmation ? (
              <div className="stepCompleted">
                {Object.keys(cartItems).reduce((qty, key) => {
                  return qty + cartItems[key].qty;
                }, 0)}{" "}
                items
              </div>
            ) : null}
          </CheckoutStep>
          {orderSummary && (
            <div
              className="checkoutStepContainer"
              style={{
                display: "flex",
                justifyContent: "space-between",
                textTransform: "none",
                color: "black",
              }}
            >
              <span style={{ marginLeft: "10px" }}>
                Email xác nhận mua hàng sẽ gửi đến{" "}
                <strong>{auth.user.email}</strong>
              </span>
              <div style={{ padding: "10px 10px", width: "24%" }}>
                <MaterialButton
                  onClick={() => handleSendEmail()}
                  title="CONTINUE"
                />
              </div>
            </div>
          )}
          <CheckoutStep
            number={4}
            active={paymentOption}
            title="PAYMENT OPTIONS"
          >
            {paymentOption && (
              <div className="stepCompleted">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <input type="radio" name="payment" value="cod" />
                  <div>Trả tiền khi nhận hàng</div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <div
                    style={{
                      width: "200px",
                    }}
                  >
                    <MaterialButton
                      onClick={onConfirmOrder}
                      title="CONFIRM ORDER"
                    />
                  </div>
                </div>
              </div>
            )}
          </CheckoutStep>
        </div>
        <div className="checkoutDetail">
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

export default CheckoutPage;
