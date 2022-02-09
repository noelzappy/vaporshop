import _ from 'lodash'
import {
  ADD_TO_CART,
  CLEAR_CART,
  CLEAR_CATEGORY_ERRORS,
  CLEAR_FILTERED_PRODUCTS,
  CLEAR_FILTER_ERRORS,
  CLEAR_PLACE_ORDER_ERROR,
  CLEAR_PRODUCT_ERRORS,
  GET_CATEGORIES_FAILED,
  GET_CATEGORIES_SUCCESS,
  GET_FOLDER_FILTERED_PRODUCTS_FAILED,
  GET_FOLDER_FILTERED_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAILED,
  GET_PRODUCTS_SUCCESS,
  ORDER_PLACED_FAILED,
  ORDER_PLACED_SUCCESS,
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

  folderFilteredProducts: null,
  folderFilteredProductsError: null,
  folderFilteredProductsFailed: false,
  folderFilteredProductsSuccess: false,

  orderPlacementSuccess: false,
  orderPlacementFailed: false,
}

function appReducer(state = INTIAL_STATE, action) {
  switch (action.type) {
    case GET_PRODUCTS_SUCCESS: {

      return {
        ...state,
        products: action.payload,
        getProductsFailed: false,
        getProductsSuccess: true,
        getProductsFailedError: null,
      }
    }
    case GET_PRODUCTS_FAILED:
      return {
        ...state,
        products: null,
        getProductsFailed: true,
        getProductsSuccess: false,
        getProductsFailedError: action.payload,
      }
    case GET_FOLDER_FILTERED_PRODUCTS_SUCCESS:
      return {
        ...state,
        folderFilteredProducts: action.payload,
        folderFilteredProductsError: null,
        folderFilteredProductsFailed: false,
        folderFilteredProductsSuccess: true,
      }
    case GET_FOLDER_FILTERED_PRODUCTS_FAILED:
      return {
        ...state,
        folderFilteredProducts: null,
        folderFilteredProductsError: action.payload,
        folderFilteredProductsFailed: true,
        folderFilteredProductsSuccess: false,
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
    case CLEAR_FILTERED_PRODUCTS:
      return {
        ...state,
        folderFilteredProducts: null,
        folderFilteredProductsError: null,
        folderFilteredProductsFailed: false,
      }
    case CLEAR_FILTER_ERRORS:
      return {
        ...state,
        folderFilteredProductsError: null,
        folderFilteredProductsFailed: false,
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
    case CLEAR_CART:
      return {
        ...state,
        shoppingCart: [],
      }
    case ORDER_PLACED_SUCCESS:
      return {
        ...state,
        orderPlacementSuccess: true,
        orderPlacementFailed: false,
      }
    case ORDER_PLACED_FAILED:
      return {
        ...state,
        orderPlacementFailed: true,
        orderPlacementSuccess: false,
      }
    case CLEAR_PLACE_ORDER_ERROR:
      return {
        ...state,
        orderPlacementFailed: false,
        orderPlacementSuccess: false,
      }

    default:
      return state
  }
}

export default appReducer
