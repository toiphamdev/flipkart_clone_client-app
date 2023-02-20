function PriceDetails(props) {
  return (
    <div className="cartPriceDetails">
      <span className="detailTitle">Giá chi tiết</span>
      <div>
        <div className="detailInfo">
          <div className="dtailItem">
            <span>Prices({props.totalItem})</span>
            <span>{props.totalPrice} đồng</span>
          </div>
          <div className="dtailItem">
            <span>Discount</span>
            <span>0 %</span>
          </div>
          <div className="dtailItem">
            <span>Delivery Charges</span>
            <span>0</span>
          </div>
          <div
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              color: "black",
            }}
            className="dtailItem borderTop"
          >
            <span>Total amount</span>
            <span>{props.totalPrice} đồng</span>
          </div>
        </div>
        <div
          style={{
            padding: "13px 26px",
            textAlign: "center",
            color: "#388e3c",
            fontSize: "16px",
            fontWeight: "bold",
          }}
          className="borderTop"
        >
          <span>Bạn phải trả {props.totalPrice} đồng</span>
        </div>
      </div>
    </div>
  );
}

export default PriceDetails;
