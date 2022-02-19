import _ from 'lodash'
import {
  ADD_TO_CART,
  CLEAR_CART,
  CLEAR_CATEGORY_ERRORS,
  CLEAR_FILTERED_PRODUCTS,
  CLEAR_FILTER_ERRORS,
  CLEAR_PLACE_ORDER_ERROR,
  CLEAR_PRODUCT_ERRORS,
  CLEAR_WAREHOUSE_ERROR,
  GET_CATEGORIES_FAILED,
  GET_CATEGORIES_SUCCESS,
  GET_FOLDER_FILTERED_PRODUCTS_FAILED,
  GET_FOLDER_FILTERED_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAILED,
  GET_PRODUCTS_SUCCESS,
  GET_WAREHOUSE_FAILED,
  GET_WAREHOUSE_SUCCESS,
  ORDER_PLACED_FAILED,
  ORDER_PLACED_SUCCESS,
  REMOVE_FROM_CART,
  SET_DEFAULT_STORE,
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

  wareHouses: null,
  getWareHousesError: null,
  getWareHouseFail: false,
  getWareHouseSuccess: false,

  defaultStore: {
    accountId: 'e73729bc-bf9c-11ea-0a80-09bc000101aa',
    address: 'Торгова',
    addressFull: {
      addInfo: 'Торгова',
      comment: 'Револьт',
    },
    archived: false,
    externalCode: 'g41yZ2gAhsGddp4cJ-eLC2',
    group: {
      meta: {
        href: 'https://online.moysklad.ru/api/remap/1.2/entity/group/e7376f43-bf9c-11ea-0a80-09bc000101ab',
        mediaType: 'application/json',
        metadataHref:
          'https://online.moysklad.ru/api/remap/1.2/entity/group/metadata',
        type: 'group',
      },
    },
    id: 'b1ab5899-3c8c-11eb-0a80-010d002bfa7e',
    meta: {
      href: 'https://online.moysklad.ru/api/remap/1.2/entity/store/b1ab5899-3c8c-11eb-0a80-010d002bfa7e',
      mediaType: 'application/json',
      metadataHref:
        'https://online.moysklad.ru/api/remap/1.2/entity/store/metadata',
      type: 'store',
      uuidHref:
        'https://online.moysklad.ru/app/#warehouse/edit?id=b1ab5899-3c8c-11eb-0a80-010d002bfa7e',
    },
    name: 'Street Vapors Торгова 15',
    owner: {
      meta: {
        href: 'https://online.moysklad.ru/api/remap/1.2/entity/employee/e7683ea7-bf9c-11ea-0a80-01bb002b22c7',
        mediaType: 'application/json',
        metadataHref:
          'https://online.moysklad.ru/api/remap/1.2/entity/employee/metadata',
        type: 'employee',
        uuidHref:
          'https://online.moysklad.ru/app/#employee/edit?id=e7683ea7-bf9c-11ea-0a80-01bb002b22c7',
      },
    },
    pathName: '',
    shared: false,
    updated: '2022-02-11 15:32:27.187',
  },
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
    case GET_WAREHOUSE_SUCCESS:
      return {
        ...state,
        wareHouses: action.payload,
        getWareHouseFail: false,
        getWareHouseSuccess: true,
        getWareHousesError: null,
      }
    case GET_WAREHOUSE_FAILED:
      return {
        ...state,
        getWareHouseFail: true,
        getWareHouseSuccess: false,
        getWareHousesError: action.payload,
      }
    case CLEAR_WAREHOUSE_ERROR:
      return {
        ...state,
        getWareHouseFail: false,
        getWareHousesError: null,
      }
    case SET_DEFAULT_STORE:
      return {
        ...state,
        defaultStore: action.payload,
      }

    default:
      return state
  }
}

export default appReducer
