import { default as axios } from "../helpers/axios";

export const getHomeProducts = async () => {
  try {
    const res = axios.get("/get-home-products");
    return res;
  } catch (error) {
    console.log(error);
  }
};
