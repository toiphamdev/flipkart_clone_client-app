import { useEffect, useRef, useState } from "react";
import {
  IoIosArrowDown,
  IoIosArrowForward,
  IoIosArrowUp,
  IoIosStar,
  IoMdCart,
} from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import { MaterialButton } from "../../components/MaterialUI";
import { getProductDetailsById } from "../../redux/actions";
import { generatePublicUrl } from "../../urlConfig";

import { BiRupee } from "react-icons/bi";
import { AiFillThunderbolt } from "react-icons/ai";
import "./style.css";
import { addToCart } from "../../redux/actions/cart.actions";

function ProductDetailsPage() {
  const product = useSelector((state) => state.product);
  const [urlImg, setUrlImg] = useState("");
  const navigate = useNavigate();
  const { productId } = useParams();
  const productImgArr =
    product.productDetails.productPictures &&
    product.productDetails.productPictures.length > 0
      ? product.productDetails.productPictures
      : [];
  const dispatch = useDispatch();
  const [displayMirror, setDisplayMirror] = useState(false);
  const mirrorRef = useRef();
  const navigateImgRef = useRef();
  const [scrollTop, setScrollTop] = useState(
    navigateImgRef.current ? navigateImgRef.current.scrollTop : 0
  );

  useEffect(() => {
    getProductDetails();
  }, [productId]);
  useEffect(() => {
    setUrlImg(
      productImgArr.length > 0 ? generatePublicUrl(productImgArr[0].img) : ""
    );
  }, [product.productDetails.productPictures]);

  const getProductDetails = async () => {
    dispatch(getProductDetailsById(productId));
  };

  if (Object.keys(product.productDetails).length === 0) {
    return null;
  }

  const handleMouseMove = (e) => {
    if (!displayMirror) {
      setDisplayMirror(true);
    }
    const w = e.currentTarget.offsetWidth;
    const h = e.currentTarget.offsetHeight;
    const y = e.pageY - e.currentTarget.offsetTop;
    const x = e.pageX - e.currentTarget.offsetLeft;
    const xPercent = (x / w) * 100;
    const yPercent = (y / h) * 100;
    mirrorRef.current.style.backgroundPosition = `${xPercent}% ${yPercent}%`;
  };
  const renderNavigateImgBtnDown = () => {
    const height =
      navigateImgRef.current && navigateImgRef.current.clientHeight;
    const clientH =
      navigateImgRef.current && navigateImgRef.current.scrollHeight;
    return clientH - scrollTop > height ? (
      <span
        onClick={(e) => {
          navigateImgRef.current.scroll({
            top: scrollTop + 65,
            behavior: "smooth",
          });
          setScrollTop((state) => state + 65);
        }}
        className="crlScrollImgBtn bottom"
      >
        <IoIosArrowDown />
      </span>
    ) : null;
  };
  const renderNavigateImgBtnUp = () => {
    return scrollTop > 65 ? (
      <span
        onClick={(e) => {
          navigateImgRef.current.scroll({
            top: scrollTop - 65,
            behavior: "smooth",
          });
          setScrollTop((state) => state - 63);
        }}
        className="crlScrollImgBtn up"
      >
        <IoIosArrowUp />
      </span>
    ) : null;
  };

  return (
    <Layout>
      <div className="productDescriptionContainer">
        <div style={{ position: "relative" }} className="flexRow">
          <div ref={navigateImgRef} className="verticalImageStack">
            {productImgArr.map((thumb, index) => (
              <div
                key={index}
                className={
                  urlImg === generatePublicUrl(thumb.img)
                    ? "thumbnail active"
                    : "thumbnail"
                }
                onClick={() => setUrlImg(generatePublicUrl(thumb.img))}
              >
                <img src={generatePublicUrl(thumb.img)} alt={thumb.img} />
              </div>
            ))}
            {/* <div className="thumbnail active">
              {productImgArr.map((thumb, index) => (
                <img src={generatePublicUrl(thumb.img)} alt={thumb.img} />
              ))}
            </div> */}
          </div>
          {renderNavigateImgBtnUp()}
          {renderNavigateImgBtnDown()}

          <div className="productDescContainer">
            <div className="productDescImgContainer">
              <img
                onMouseMove={(e) => handleMouseMove(e)}
                onMouseOut={() => {
                  if (displayMirror) {
                    setDisplayMirror(false);
                  }
                }}
                src={urlImg}
                alt={`${productImgArr[0].img}`}
              />
            </div>

            {/* action buttons */}
            <div
              style={{ justifyContent: "space-between", marginTop: "10px" }}
              className="flexRow"
            >
              <MaterialButton
                title="ADD TO CART"
                bgColor="#ff9f00"
                textColor="#ffffff"
                width="49%"
                icon={<IoMdCart />}
                onClick={() => {
                  const { _id, name, price } = product.productDetails;
                  const img = product.productDetails.productPictures[0].img;
                  dispatch(addToCart({ _id, name, price, img }));
                  navigate("/view-cart");
                }}
              />
              <MaterialButton
                title="BUY NOW"
                bgColor="#fb641b"
                textColor="#ffffff"
                width="49%"
                icon={<AiFillThunderbolt />}
              />
            </div>
          </div>
        </div>
        <div>
          {/* home > category > subCategory > productName */}
          <div className="breed">
            <ul>
              <li>
                <a href="#">Trang chủ</a>
                <IoIosArrowForward />
              </li>
              <li>
                <a href="#">Điện thoại</a>
                <IoIosArrowForward />
              </li>
              <li>
                <a href="#">Samsung</a>
                <IoIosArrowForward />
              </li>
              <li>
                <a href="#">{product.productDetails.name}</a>
              </li>
            </ul>
          </div>
          {/* product description */}
          <div className="productDetails">
            <p className="productTitle">{product.productDetails.name}</p>
            <div>
              <span className="ratingCount">
                4.3 <IoIosStar />
              </span>
              <span className="ratingNumbersReviews">
                72.234 Xếp hạng & 8.140 Đánh giá
              </span>
            </div>
            <div className="extraOffer">Giảm thêm 4500 đ</div>
            <div className="flexRow priceContainer">
              <span className="price">{product.productDetails.price} đ</span>
              <span className="discount" style={{ margin: "0 10px" }}>
                giảm 22%
              </span>
              {/* <span>i</span> */}
            </div>
            <div>
              <p
                style={{
                  color: "#212121",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                Ưu đãi có sẵn
              </p>
              <p style={{ display: "flex" }}>
                <span
                  style={{
                    width: "100px",
                    fontSize: "12px",
                    color: "#878787",
                    fontWeight: "600",
                    marginRight: "20px",
                  }}
                >
                  Mô tả
                </span>
                <span
                  style={{
                    fontSize: "12px",
                    color: "#212121",
                  }}
                >
                  {product.productDetails.description}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={mirrorRef}
        style={{ backgroundImage: `url(${urlImg})` }}
        className={displayMirror ? "mirror" : "mirror none"}
      ></div>
    </Layout>
  );
}

export default ProductDetailsPage;
