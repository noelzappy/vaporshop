import _ from 'lodash'
import {
  ADD_TO_CART,
  CLEAR_CATEGORY_ERRORS,
  CLEAR_PRODUCT_ERRORS,
  GET_CATEGORIES_FAILED,
  GET_CATEGORIES_SUCCESS,
  GET_PRODUCTS_FAILED,
  GET_PRODUCTS_SUCCESS,
  REMOVE_FROM_CART,
} from './Actions'

const INTIAL_STATE = {
  products: null,
  getProductsFailedError: null,
  getProductsFailed: false,
  getProductsSuccess: false,

  productCategories: null,
  getCategoriesFailedError: null,
  getCategoriesFailed: false,
  getCategoriesSuccess: false,

  shoppingCart: [],
}

function appReducer(state = INTIAL_STATE, action) {
  switch (action.type) {
    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload,
        getProductsFailed: false,
        getProductsSuccess: true,
        getProductsFailedError: null,
      }
    case GET_PRODUCTS_FAILED:
      return {
        ...state,
        products: null,
        getProductsFailed: true,
        getProductsSuccess: false,
        getProductsFailedError: action.payload,
      }
    case GET_CATEGORIES_FAILED:
      return {
        ...state,
        getCategoriesFailedError: action.payload,
        getCategoriesFailed: true,
        getCategoriesSuccess: false,
        productCategories: null,
      }
    case GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        getCategoriesFailedError: null,
        getCategoriesFailed: false,
        getCategoriesSuccess: true,
        productCategories: action.payload,
      }
    case CLEAR_CATEGORY_ERRORS:
      return {
        ...state,
        getCategoriesFailed: false,
        getCategoriesFailedError: null,
      }
    case CLEAR_PRODUCT_ERRORS:
      return {
        ...state,
        getProductsFailed: false,
        getProductsFailedError: null,
      }
    case ADD_TO_CART:
      return {
        ...state,
        shoppingCart: [...state.shoppingCart, action.payload],
      }
    case REMOVE_FROM_CART: {
      const index = _.findIndex(state.shoppingCart, action.payload)
      state.shoppingCart.splice(index, 1)
      return {
        ...state,
        ...state.shoppingCart,
      }
    }

    default:
      return state
  }
}

export default appReducer
