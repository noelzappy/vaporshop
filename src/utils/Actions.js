import axios from 'axios'

export const GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS'
export const GET_PRODUCTS_FAILED = 'GET_PRODUCTS_FAILED'

const headers = {
  Authorization: ' Basic YWRtaW5AdmFwb3Jzc3VwMjpBbnRvbmJiMQ',
}
const baseURL = 'https://online.moysklad.ru/api/remap/1.2/entity/assortment'

export function getProducts() {
  axios
    .get(baseURL, { headers })
    .then((res) => console.log(res.data))
    .catch((err) => console.log('Error', err))
}
