import Header from "../Header";
import MenuHeader from "../MenuHeader";

function Layout(props) {
  return (
    <>
      <Header />
      <MenuHeader />
      <div
        style={{ backgroundColor: "#f1f3f6", minHeight: "calc(100vh - 98px)" }}
      >
        {props.children}
      </div>
    </>
  );
}

export default Layout;
