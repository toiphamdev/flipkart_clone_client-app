import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Card from "../../../components/UI/Card";
import Price from "../../../components/UI/Price";
import Rating from "../../../components/UI/Rating";
import { getProductBySlug } from "../../../redux/actions";
import { generatePublicUrl } from "../../../urlConfig";

import "./style.css";

const ClothingAndAccessories = (props) => {
  const product = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const { slug } = useParams();

  useEffect(() => {
    dispatch(getProductBySlug(slug));
  }, []);

  return (
    <div style={{ padding: "10px" }}>
      <Card
        style={{
          boxSizing: "border-box",
          padding: "10px",
          display: "flex",
        }}
      >
        {product.products.map((product, index) => (
          <div key={index} className="caContainer">
            <Link
              className="caImgContainer"
              to={`/${product.slug}/${product._id}/p`}
            >
              <img src={generatePublicUrl(product.productPictures[0].img)} />
            </Link>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <div className="caProductName">{product.name}</div>
              <Rating value={5} />
              <Price value={product.price} />
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
};

export default ClothingAndAccessories;
