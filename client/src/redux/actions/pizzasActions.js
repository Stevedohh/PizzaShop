import axios from 'axios';
import {environment} from "../../environment";

export const setLoaded = (payload) => ({
  type: 'SET_LOADED',
  payload,
});

export const fetchPizzas = () => (dispatch) => {
  dispatch({
    type: 'SET_LOADED',
    payload: false,
  });

  axios
    .get(
      `${environment.BASE_URL}/product`,
    )
    .then(({ data }) => {
      dispatch(setPizzas(data));
    });
};

export const fetchCategories = () => (dispatch) => {
  axios.get(`${environment.BASE_URL}/product/categories`).then(({data}) => {
    dispatch(setCategories(data))
  })
}

export const fetchPizzasByCategory = (category) => (dispatch) => {
  dispatch({
    type: 'SET_LOADED',
    payload: false,
  });

  axios
      .post(
          `${environment.BASE_URL}/product/categories`,
          {category}
      )
      .then(({ data }) => {
        dispatch(setPizzas(data));
      });
}

export const setPizzas = (items) => ({
  type: 'SET_PIZZAS',
  payload: items,
});

export const setCategories = (items) => ({
  type: 'SET_CATEGORIES',
  payload: items,
});
