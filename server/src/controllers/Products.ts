import {
  deleteById,
  filterByPrice,
  get,
  getById,
  post,
  update,
} from "../services/ProductServices";

export const postProducts = post;

export const getProducts = get;

export const getProductsById = getById;

export const updateProducts = update;

export const deleteProducts = deleteById;

export const getFilteredProducts = filterByPrice;
