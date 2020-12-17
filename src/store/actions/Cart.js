import {url} from '../../constants/url';

export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

export const addProduct = (_id, token) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${url}/user/add-to-cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
        body: JSON.stringify({
          productId: _id,
        }),
      });

      const responseJson = await response.json();
      console.log(responseJson);

      if (response.status != 200) {
        throw new Error();
      }

      dispatch({
        type: ADD_TO_CART,
        productData: {
          totalAmount: responseJson.totalAmount,
          cartProducts: responseJson.cartProducts,
        },
      });
    } catch (error) {
      throw new Error();
    }
  };
};

export const removeProduct = (_id, token) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${url}/user/remove-from-cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
        body: JSON.stringify({
          productId: _id,
        }),
      });

      const responseJson = await response.json();
      console.log(responseJson);

      if (response.status != 200) {
        throw new Error();
      }
      dispatch({
        type: REMOVE_FROM_CART,
        productData: {
          totalAmount: responseJson.totalAmount,
          cartProducts: responseJson.cartProducts,
        },
      });
    } catch (error) {
      throw new Error();
    }
  };
};
