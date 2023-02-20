import Layout from "../../components/Layout";
import ProductStore from "./ProductStore";
import { useLocation } from "react-router-dom";
import ProductPage from "./ProductPage";
import ClothingAndAccessories from "./ClothingAndAccessories";

function ProductListPage(props) {
  const search = useLocation().search;
  const params = new URLSearchParams(search);
  const cid = params.get("cid");
  const type = params.get("type");
  const renderProduct = () => {
    let content = null;
    switch (type) {
      case "store":
        content = <ProductStore {...props} />;
        break;
      case "page":
        content = <ProductPage cid={cid} type={type} {...props} />;
        break;
      default:
        content = <ClothingAndAccessories {...props} />;
        break;
    }
    return content;
  };

  return <Layout>{renderProduct()}</Layout>;
}

export default ProductListPage;
