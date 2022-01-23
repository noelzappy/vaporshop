import axios from 'axios'

export const GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS'
export const GET_PRODUCTS_FAILED = 'GET_PRODUCTS_FAILED'
export const GET_CATEGORIES_SUCCESS = 'GET_CATEGORIES_SUCCESS'
export const GET_CATEGORIES_FAILED = 'GET_CATEGORIES_FAILED'
export const CLEAR_CATEGORY_ERRORS = 'CLEAR_CATEGORY_ERRORS'
export const CLEAR_PRODUCT_ERRORS = 'CLEAR_PRODUCT_ERRORS'
export const ADD_TO_CART = 'ADD_TO_CART'
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'

export const headers = {
  Authorization: 'Basic YWRtaW5AdmFwb3Jzc3VwMjpBbnRvbmJiMQ',
}
const baseURL = 'https://online.moysklad.ru/api/remap/1.2/entity'

export const getProducts = () => (dispatch) => {
  axios
    .get(`${baseURL}/product`, { headers })
    .then((res) =>
      dispatch({
        type: GET_PRODUCTS_SUCCESS,
        payload: res.data.rows,
      }),
    )
    .catch((err) => {
      // console.log(err.response.data)
      dispatch({
        type: GET_PRODUCTS_FAILED,
        payload: 'Error fetching products. Please check your internet',
      })
    })
}

export const getCategories = () => (dispatch) => {
  axios
    .get(`${baseURL}/group`, { headers })
    .then((res) =>
      dispatch({
        type: GET_CATEGORIES_SUCCESS,
        payload: res.data.rows,
      }),
    )
    .catch((err) => {
      // console.log(err.response.data)

      dispatch({
        type: GET_CATEGORIES_FAILED,
        payload: 'Error fetching categories. Please check your internet',
      })
    })
}

export const clearCategoryErrors = () => (dispatch) => {
  dispatch({
    type: CLEAR_CATEGORY_ERRORS,
  })
}

export const clearProductErrors = () => (dispatch) => {
  dispatch({
    type: CLEAR_PRODUCT_ERRORS,
  })
}

export async function getCurrency(url) {
  try {
    const response = await axios.get(url, { headers })
    return response
  } catch (error) {
    return null
  }
}

export function addToCart(item) {
  return (dispatch) => dispatch({ type: ADD_TO_CART, payload: item })
}

export function removeFromCart(item) {
  return (dispatch) => dispatch({ type: REMOVE_FROM_CART, payload: item })
}
