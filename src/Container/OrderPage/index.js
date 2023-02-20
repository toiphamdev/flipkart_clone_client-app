import { useEffect } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layout";
import Card from "../../components/UI/Card";
import { getOrders } from "../../redux/actions";
import { generatePublicUrl } from "../../urlConfig";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import { Breed } from "../../components/MaterialUI";

function OrderPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const handleOnclickCard = (_id) => {
    navigate(`/order_details/${_id}`);
  };

  useEffect(() => {
    dispatch(getOrders());
  }, []);
  return (
    <Layout>
      <div className="orderPageContainer">
        <Breed
          breed={[
            { name: "Trang chủ", href: "/" },
            { name: "Tài khoản", href: "/account" },
            { name: "Đơn hàng", href: "/account/orders" },
          ]}
          breedIcon={<IoIosArrowForward />}
        />
        {user.orders.map((order, index) => {
          return order.items.map((item, index) => {
            return (
              <Card onClick={() => handleOnclickCard(order._id)} key={index}>
                <div className="orderItemContainer">
                  <div className="orderItemTitleBox">
                    <div>
                      <img
                        src={
                          item.productId && item.productId.productPictures
                            ? generatePublicUrl(
                                item.productId.productPictures[0].img
                              )
                            : ""
                        }
                        alt=""
                      />
                    </div>
                    <span>{item.productId.name}</span>
                  </div>
                  <div>{item.payablePrice}</div>
                  <div>{order.paymentStatus}</div>
                </div>
              </Card>
            );
          });
        })}
      </div>
    </Layout>
  );
}

export default OrderPage;
