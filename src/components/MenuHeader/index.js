import "./style.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllCategory } from "../../redux/actions";

function MenuHeader() {
  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCategory());
  }, []);

  const renderCategories = (categories) => {
    let categoryArr = [];
    for (let category of categories) {
      categoryArr.push(
        <li key={category.name}>
          {category.parentId ? (
            <a
              href={`/${category.slug}?cid=${category._id}&type=${category.type}`}
            >
              {category.name}
            </a>
          ) : (
            <span>{category.name}</span>
          )}
          {category.children && category.children.length > 0 ? (
            <ul>{renderCategories(category.children)}</ul>
          ) : null}
        </li>
      );
    }
    return categoryArr;
  };
  return (
    <div className="menuHeader">
      <ul>
        {category.categories.length > 0 &&
          renderCategories(category.categories)}
      </ul>
    </div>
  );
}

export default MenuHeader;
