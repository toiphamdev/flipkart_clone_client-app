import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductBySlug } from "../../../redux/actions";
import { Link, useParams } from "react-router-dom";
import "./style.css";
import { generatePublicUrl } from "../../../urlConfig";
import Card from "../../../components/UI/Card";
import Rating from "../../../components/UI/Rating";
import Price from "../../../components/UI/Price";

function ProductStore(props) {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
  const { slug } = useParams();
  const priceRange = {
    under2m: "dưới 2 triệu",
    under5m: "từ 2-5 triệu",
    under10m: "từ 5-10 triệu",
    under20m: "từ 10-20 triệu",
    over20m: "trên 20 triệu",
  };
  useEffect(() => {
    dispatch(getProductBySlug(slug));
  }, []);

  return (
    <div style={{ padding: "20px 0" }}>
      {Object.keys(product.productsByPrice).map((key, index) => {
        return (
          <Card
            key={index}
            header={true}
            headerleft={` ${slug} mobile ${priceRange[key]}`}
            headerright={"view all"}
            style={{ width: "calc(100% - 20px)", margin: "10px auto" }}
          >
            <div style={{ display: "flex", gap: "10px" }}>
              {product.productsByPrice[key].map((pro, index) => {
                return (
                  <Link
                    to={`/${pro.slug}/${pro._id}/p`}
                    key={index}
                    className="productContainer"
                  >
                    <div className="productImgContainer">
                      <img
                        alt="productPicture"
                        src={generatePublicUrl(pro.productPictures[0].img)}
                      />
                    </div>
                    <div className="productInfo">
                      <div style={{ margin: "5px 0" }}>{pro.name}</div>
                      <div>
                        <Rating value={4.3} />
                        &nbsp;
                        <span>(3)</span>
                      </div>
                      <div className="productPrice">
                        <Price value={pro.price} />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </Card>
        );
      })}
    </div>
  );
}

export default ProductStore;
