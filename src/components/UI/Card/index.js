import "./style.css";

function Card(props) {
  return (
    <div {...props} className="card">
      {props.header && (
        <div className="cardHeader">
          <div>{props.headerleft && props.headerleft}</div>
          <div className="btn">{props.headerright && props.headerright}</div>
        </div>
      )}
      {props.children}
    </div>
  );
}

export default Card;
