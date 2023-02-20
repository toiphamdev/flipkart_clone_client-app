import Layout from "../../components/Layout";
import Card from "../../components/UI/Card";
import Price from "../../components/UI/Price";
import Rating from "../../components/UI/Rating";

function ProductFilter() {
  return (
    <Layout>
      <div className="filterPageContainer">
        <div className="filterSidebar"></div>
        <div className="filterProductWrapper">
          <Card>
            <div className="caContainer">
              <div className="caImgContainer" to={`p`}>
                <img src="" alt="" />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <div className="caProductName">simpat</div>
                <Rating value={5} />
                <Price value={5} />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
}

export default ProductFilter;
