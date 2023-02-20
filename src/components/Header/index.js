import React, { useEffect, useState } from "react";
import "./style.css";
import logo from "../../images/logo/logo.png";
import goldenStar from "../../images/logo/plus.png";
import {
  IoIosArrowDown,
  IoIosCart,
  IoIosSearch,
  IoMdLogOut,
} from "react-icons/io";
import {
  Modal,
  MaterialInput,
  MaterialButton,
  DropdownMenu,
} from "../MaterialUI";
import { useDispatch, useSelector } from "react-redux";
import { login, signout, _signup } from "../../redux/actions/auth.actions";
import { Link } from "react-router-dom";

const Header = (props) => {
  const [loginModal, setLoginModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [signup, setSignup] = useState(false);
  const auth = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);
  const [cartItems, setCartItems] = useState({});
  const dispatch = useDispatch();
  const userLogin = () => {
    if (signup) {
      userSignup();
    }
    dispatch(login({ email, password }));
    setEmail("");
    setPassword("");
  };
  const userLogout = () => {
    dispatch(signout());
  };

  const userSignup = () => {
    const user = { firstName, lastName, email, password };
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      password === ""
    ) {
      return;
    }

    dispatch(_signup(user));
  };

  useEffect(() => {
    if (auth.authenticate) {
      setLoginModal(false);
    }
  }, [auth.authenticate]);

  useEffect(() => {
    setCartItems(cart.cartItems);
  }, [cart.cartItems]);

  const renderLoggedInMenu = () => {
    return (
      <DropdownMenu
        menu={<div className="fullName">{auth.user.fullName}</div>}
        menus={[
          { label: "My Profile", href: "", icon: null },
          { label: "Supper coin Zone", href: "", icon: null },
          { label: "Flipkart Plus Zone", href: "", icon: null },
          { label: "Orders", href: "/account/orders", icon: null },
          { label: "Wishlist", href: "", icon: null },
          { label: "Rewards", href: "", icon: null },
          { label: "Gift Cards", href: "", icon: null },
          {
            label: "Logout",
            href: "",
            icon: <IoMdLogOut />,
            onClick: userLogout,
          },
        ]}
      />
    );
  };
  const renderNonLoggedInMenu = () => {
    return (
      <DropdownMenu
        menu={
          <div
            className="loginButton"
            onClick={() => {
              setSignup(false);
              setLoginModal(true);
            }}
          >
            Login
          </div>
        }
        menus={[
          { label: "My Profile", href: "", icon: null },
          { label: "Flipkart Plus Zone", href: "", icon: null },
          {
            label: "Orders",
            href: "/account/orders",
            icon: null,
            onClick: () => {
              setLoginModal(true);
            },
          },
          { label: "Wishlist", href: "", icon: null },
          { label: "Rewards", href: "", icon: null },
          { label: "Gift Cards", href: "", icon: null },
        ]}
        firstMenu={
          <div className="firstmenu">
            <span>New Customer?</span>
            <Link
              to=""
              onClick={() => {
                setLoginModal(true);
                setSignup(true);
              }}
              style={{ color: "#2874f0" }}
            >
              Sign Up
            </Link>
          </div>
        }
      />
    );
  };

  return (
    <div className="header">
      <Modal visible={loginModal} onClose={() => setLoginModal(false)}>
        <div className="authContainer">
          <div className="row">
            <div className="leftspace">
              <h2>Login</h2>
              <p>Get access to your Orders, Wishlist and Recommendations</p>
            </div>
            <div className="rightspace">
              {auth.error && (
                <div style={{ color: "red", fontSize: 12 }}>{auth.error}</div>
              )}
              {signup && (
                <MaterialInput
                  type="text"
                  label="Họ"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              )}
              {signup && (
                <MaterialInput
                  type="text"
                  label="Tên"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              )}

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
                  title={signup ? "Register" : "Login"}
                  bgColor="#fb641b"
                  textColor="#ffffff"
                  onClick={userLogin}
                />
                <div style={{ margin: "10px" }}>OR</div>
                <MaterialButton
                  title="Request OTP"
                  bgColor="#fff"
                  textColor="#fb641b"
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <div className="subHeader">
        <div className="logo">
          <Link to="/">
            <img src={logo} className="logoimage" alt="" />
          </Link>
          <a style={{ marginTop: "-10px" }}>
            <span className="exploreText">Explore</span>
            <span className="plusText">Plus</span>
            <img src={goldenStar} className="goldenStar" alt="" />
          </a>
        </div>
        <div
          style={{
            padding: "0 10px",
          }}
        >
          <div className="searchInputContainer">
            <input
              className="searchInput"
              placeholder={"search for products, brands and more"}
            />
            <div className="searchIconContainer">
              <IoIosSearch
                style={{
                  color: "#2874f0",
                }}
              />
            </div>
          </div>
        </div>
        <div className="rightMenu">
          {auth.authenticate ? renderLoggedInMenu() : renderNonLoggedInMenu()}
          <DropdownMenu
            menu={
              <a href="/" className="more nonUnderline">
                <span>More</span>
                <IoIosArrowDown />
              </a>
            }
            menus={[
              { label: "Notification Preference", href: "", icon: null },
              { label: "Sell on flipkart", href: "", icon: null },
              { label: "24x7 Customer Care", href: "", icon: null },
              { label: "Advertise", href: "", icon: null },
              { label: "Download App", href: "", icon: null },
            ]}
          />
          <div>
            <Link
              style={{ position: "relative" }}
              to="/view-cart"
              className="cart nonUnderline"
            >
              <IoIosCart />
              <span className="itemQty">{Object.keys(cartItems).length}</span>
              <span style={{ margin: "0 10px" }}>Cart</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
