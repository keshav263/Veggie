import { LOG_OUT } from "../actions/Auth";
import { GET_ALL_PRODUCTS } from "../actions/Products";

const initialState = {
  products: [],
  mainCategories: [],
  carouselItems: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS: {
      return {
        products: action.data,
        mainCategories: action.mainCategories,
        carouselItems: action.carouselItems,
      };
    }

    case LOG_OUT: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};
