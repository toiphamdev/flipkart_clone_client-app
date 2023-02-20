import Price from "../Price";
import Rating from "../Rating";
import "./style.css";

function CardProduct(props) {
  const { name, img, price } = props;
  return (
    <div
      onClick={props.onClick}
      style={{ boxShadow: "0 0 2px 2px #cecece", backgroundColor: "#fff" }}
      className="caWrapper"
    >
      <div className="caImgContainer" to={`p`}>
        <img style={{ width: "100%", height: "100%" }} src={img} alt="" />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div className="caProductName">{name}</div>
        <Rating value={5} />
        <Price value={price} />
      </div>
    </div>
  );
}

export default CardProduct;
