import { url } from "../../constants/url";
export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";

export const getAllProducts = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${url}/stock/products`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status != 200) {
        throw new Error();
      }
      const responseJson = await response.json();
      dispatch({
        type: GET_ALL_PRODUCTS,
        data: responseJson.data,
        mainCategories: responseJson.mainCategories,
        carouselItems: responseJson.carouselItems,
      });
    } catch (error) {
      throw new Error();
    }
  };
};
