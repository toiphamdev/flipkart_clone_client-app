import { getHomeProducts } from "../../services/product";
import Layout from "../../components/Layout";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import CardProduct from "../../components/UI/cardProduct";
import { generatePublicUrl } from "../../urlConfig";
import "./style.css";

function Home() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    handleProductData();
  }, []);
  const handleProductData = async () => {
    const res = await getHomeProducts();
    if (res.status === 200) {
      setProducts(res.data.products);
    }
  };

  return (
    <Layout>
      <div style={{ padding: "20px 0px" }} className="homeContainer">
        <div className="homeProductWrapper">
          {products.map((item, index) => {
            return (
              <CardProduct
                onClick={() => navigate(`/${item.slug}/${item._id}/p`)}
                key={index}
                name={item.name}
                img={
                  item.productPictures &&
                  generatePublicUrl(item.productPictures[0].img)
                }
                price={item.price}
              />
            );
          })}
        </div>
      </div>
    </Layout>
  );
}

export default Home;
