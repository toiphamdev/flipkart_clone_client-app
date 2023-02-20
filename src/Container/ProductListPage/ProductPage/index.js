import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProductPage } from "../../../redux/actions";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import "./style.css";
import Card from "../../../components/UI/Card";

function ProductPage(props) {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
  const payload = { cid: props.cid, type: props.type };
  const page = product.page;
  useEffect(() => {
    dispatch(getProductPage(payload));
  }, []);
  return (
    <div style={{ margin: "0 20px" }}>
      <h3 style={{ margin: 0, padding: "20px 0" }}>{page.title}</h3>
      <Carousel renderThumbs={() => {}}>
        {page.banners &&
          page.banners.map((banner, index) => {
            return (
              <Link
                style={{ display: "block" }}
                key={index}
                to={banner.navigateTo}
              >
                <img src={banner.img} alt="" />
              </Link>
            );
          })}
      </Carousel>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          marginTop: "5px",
        }}
      >
        {page.products &&
          page.products.map((product, index) => {
            return (
              <Card
                style={{
                  width: "400px",
                  height: "200px",
                  margin: "5px",
                }}
                key={index}
              >
                <img
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                  src={product.img}
                  alt=""
                />
              </Card>
            );
          })}
      </div>
    </div>
  );
}

export default ProductPage;
