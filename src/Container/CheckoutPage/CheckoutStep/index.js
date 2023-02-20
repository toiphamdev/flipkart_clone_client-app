import "./style.css";

function CheckoutStep(props) {
  return (
    <>
      <div {...props} style={props.style} className="checkoutStepContainer">
        <div
          className={
            props.active ? "checkoutStepContent active" : "checkoutStepContent"
          }
        >
          <div style={{ display: "flex" }}>
            <span className="checkoutStepNum">{props.number}</span>
            <span className="checkoutStepTitle">{props.title}</span>
          </div>
        </div>
        <div className="checkoutStepModal">{props.children}</div>
      </div>
    </>
  );
}

export default CheckoutStep;
