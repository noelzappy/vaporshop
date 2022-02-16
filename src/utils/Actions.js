import axios from 'axios'

export const GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS'
export const GET_PRODUCTS_FAILED = 'GET_PRODUCTS_FAILED'
export const GET_CATEGORIES_SUCCESS = 'GET_CATEGORIES_SUCCESS'
export const GET_CATEGORIES_FAILED = 'GET_CATEGORIES_FAILED'
export const CLEAR_CATEGORY_ERRORS = 'CLEAR_CATEGORY_ERRORS'
export const CLEAR_PRODUCT_ERRORS = 'CLEAR_PRODUCT_ERRORS'
export const ADD_TO_CART = 'ADD_TO_CART'
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
export const CLEAR_CART = 'CLEAR_CART'
export const GET_FOLDER_FILTERED_PRODUCTS_SUCCESS =
  'GET_FILTERED_PRODUCTS_SUCCESS'
export const GET_FOLDER_FILTERED_PRODUCTS_FAILED =
  'GET_FILTERED_PRODUCTS_FAILED'
export const CLEAR_FILTER_ERRORS = 'CLEAR_FILTER_ERRORS'
export const CLEAR_FILTERED_PRODUCTS = 'CLEAR_FILTERED_PRODUCTS'
export const ORDER_PLACED_SUCCESS = 'ORDER_PLACED_SUCCESS'
export const ORDER_PLACED_FAILED = 'ORDER_PLACED_FAILED'
export const CLEAR_PLACE_ORDER_ERROR = 'CLEAR_PLACE_ORDER_ERROR'
export const GET_WAREHOUSE_SUCCESS = 'GET_WAREHOUSE_SUCCESS'
export const GET_WAREHOUSE_FAILED = 'GET_WAREHOUSE_FAILED'
export const CLEAR_WAREHOUSE_ERROR = 'CLEAR_WAREHOUSE_ERROR'
export const SET_DEFAULT_STORE = 'SET_DEFAULT_STORE'

export const APP_TOKEN = 'YWRtaW5AdmFwb3Jzc3VwMjpBbnRvbmJiMQ'
export const TELEGRAM_TOKEN = '5186679461:AAFJo2Mz001hRuATFfKHu0UJ3clSQKmHjwI'

export const headers = {
  Authorization: `Basic ${APP_TOKEN}`,
}
const baseURL = 'https://online.moysklad.ru/api/remap/1.2/entity'

export const getProducts = () => (dispatch, getState) => {
  const { defaultStore } = getState().app

  axios
    .get(
      defaultStore
        ? `${baseURL}/assortment?filter=stockStore=https://online.moysklad.ru/api/remap/1.2/entity/store/${defaultStore.id}`
        : `${baseURL}/assortment`,
      {
        headers,
      },
    )
    .then((res) => {
      dispatch({
        type: GET_PRODUCTS_SUCCESS,
        payload: res.data.rows,
      })
    })
    .catch((err) => {
      // console.log(err.response.data)
      dispatch({
        type: GET_PRODUCTS_FAILED,
        payload: 'Error fetching products. Please check your internet',
      })
    })
}

export const getProductsFilteredByFolder =
  (filterObject) => (dispatch, getState) => {
    const { app } = getState()
    const { products } = app

    if (products) {
      const newVal = products.filter((obj) => obj.pathName === filterObject)

      dispatch({
        type: GET_FOLDER_FILTERED_PRODUCTS_SUCCESS,
        payload: newVal,
      })
    } else {
      // console.log(err.response.data)
      dispatch({
        type: GET_FOLDER_FILTERED_PRODUCTS_FAILED,
        payload: 'Error fetching products. Please check your internet',
      })
    }
  }

export const clearFilterErrors = () => (dispatch) => {
  dispatch({
    type: CLEAR_FILTER_ERRORS,
  })
}

export const getCategories = () => (dispatch) => {
  axios
    .get(`${baseURL}/productfolder`, { headers })
    .then((res) => {
      const { rows } = res.data
      const newVal = rows.filter(
        (obj) => obj.pathName === '01 Одноразові под системи',
      )

      dispatch({
        type: GET_CATEGORIES_SUCCESS,
        payload: newVal,
      })
    })
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

export const clearFilteredProducts = () => (dispatch) =>
  dispatch({
    type: CLEAR_FILTERED_PRODUCTS,
  })

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

export function clearCart() {
  return (dispatch) => dispatch({ type: CLEAR_CART })
}
export function numberFormatter(
  num,
  digits,
  formatAll = false,
  useNegatives = false,
) {
  if (num > 1000000 || formatAll) {
    const si = [
      { value: 1, symbol: '' },
      { value: 1e3, symbol: 'k' },
      { value: 1e6, symbol: 'M' },
      { value: 1e9, symbol: 'B' },
      { value: 1e12, symbol: 'T' },
      { value: 1e15, symbol: 'P' },
      { value: 1e18, symbol: 'E' },
    ]
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/
    let i
    if (num < 0) {
      // abs(-1)
      const numCon = Math.abs(num)
      for (i = si.length - 1; i > 0; i--) {
        if (numCon >= si[i].value) {
          break
        }
      }

      if (useNegatives) {
        return `-${
          (numCon / si[i].value).toFixed(digits).replace(rx, '') + si[i].symbol
        }`
      }
      return `(${
        (numCon / si[i].value).toFixed(digits).replace(rx, '') + si[i].symbol
      })`
    }
    for (i = si.length - 1; i > 0; i--) {
      if (num >= si[i].value) {
        break
      }
    }
    return (num / si[i].value).toFixed(digits).replace(rx, '') + si[i].symbol
  }
  return num.toFixed(digits).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export function sendDataToBot({ userDetails, data }) {
  return (dispatch) => {
    axios
      .post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
        chat_id: '@vapors_chat_test',
        text: `<b>NEW ORDER</b>\n <b>ORDER No #${
          userDetails.orderNumber
        }</b>\n\nPerson Name: ${userDetails.userName}\nEmail: ${
          userDetails.userEmail
        }\nPhone Number: ${userDetails.userPhoneNumber}\nDelivery Address: ${
          userDetails.userDeliveryAddress
        }\nComment: ${
          userDetails.orderComment
        }\nPayment Method: ${userDetails.paymentMethod.toUpperCase()}\nStore: ${
          userDetails.defaultStore.name
        }\n<b>TOTAL: ${userDetails.totalCost}</b>\n${data}
        `,
        parse_mode: 'HTML',
      })
      .then(() => {
        dispatch({
          type: ORDER_PLACED_SUCCESS,
        })
      })
      .catch((error) => {
        // console.log(error.response.data)
        dispatch({
          type: ORDER_PLACED_FAILED,
        })
      })
  }
}

export function clearOrderErrors() {
  return (dispatch) =>
    dispatch({
      type: CLEAR_PLACE_ORDER_ERROR,
    })
}

export function getWarehouse() {
  return (dispatch) =>
    axios
      .get(`${baseURL}/store`, { headers })
      .then((res) => {
        const { rows } = res.data
        const newVal = rows.filter((obj) => {
          // console.log(obj.name)
          if (
            obj.name === 'Vapors Чорновола 4' ||
            obj.name === 'Street Vapors Торгова 15'
          ) {
            return obj
          }
        })

        dispatch({
          type: GET_WAREHOUSE_SUCCESS,
          payload: newVal,
        })
      })
      .catch((err) => {
        console.log(err.response.data)
        dispatch({
          type: GET_CATEGORIES_FAILED,
          payload: 'Error fetching store data. Please check your internet',
        })
      })
}

export function clearWareHouseError() {
  return (dispatch) =>
    dispatch({
      type: CLEAR_WAREHOUSE_ERROR,
    })
}

export function setDefaulStore(store) {
  return (dispatch) =>
    dispatch({
      type: SET_DEFAULT_STORE,
      payload: store,
    })
}
