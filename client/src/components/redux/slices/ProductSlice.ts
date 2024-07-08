import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
}

export interface ProductState {
  products: Product[];
  selectedProduct: Product | null;
  filteredProducts: Product[];
  loading: boolean;
  error: string | null;
}

export const fetchProducts = createAsyncThunk<
  Product[],
  void,
  { state: RootState }
>("products/fetchProducts", async (_, { getState }) => {
  const response = await axios.get<Product[]>(
    "http://localhost:5000/api/getproducts"
  );
  return response.data;
});

export const addProduct = createAsyncThunk<
  Product,
  Omit<Product, "_id">,
  { state: RootState }
>("products/addProduct", async (product: Omit<Product, "_id">) => {
  const response = await axios.post<Product>(
    "http://localhost:5000/api/postproducts",
    product
  );
  return response.data;
});

export const updateProduct = createAsyncThunk<
  Product,
  { id: string; product: Partial<Product> },
  { state: RootState }
>("products/updateProduct", async ({ id, product }) => {
  const response = await axios.patch<Product>(
    `http://localhost:5000/api/updateproducts/${id}`,
    product
  );
  return response.data;
});

export const deleteProductAction = createAsyncThunk<
  string,
  string,
  { state: RootState }
>("products/deleteProduct", async (id: string) => {
  await axios.delete(`http://localhost:5000/api/deleteproducts/${id}`);
  return id;
});

export const getProductById = createAsyncThunk<
  Product,
  string,
  { state: RootState }
>("products/getProductById", async (id: string) => {
  const response = await axios.get<Product>(
    `http://localhost:5000/api/getproducts/${id}`
  );
  return response.data;
});

export const getFilteredProducts = createAsyncThunk<
  Product[],
  number,
  { state: RootState }
>("products/getFilteredProducts", async (minPrice: number) => {
  const response = await axios.get<Product[]>(
    `http://localhost:5000/api/filtered?minPrice=${minPrice}`
  );
  return response.data;
});

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    selectedProduct: null,
    filteredProducts: [],
    loading: false,
    error: null,
  } as ProductState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.products = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        addProduct.fulfilled,
        (state, action: PayloadAction<Product>) => {
          state.products.push(action.payload);
          state.loading = false;
        }
      )
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        updateProduct.fulfilled,
        (state, action: PayloadAction<Product>) => {
          const updatedProduct = action.payload;
          state.products = state.products.map((product) =>
            product._id === updatedProduct._id ? updatedProduct : product
          );
          state.loading = false;
        }
      )
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteProductAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        deleteProductAction.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.products = state.products.filter(
            (product) => product._id !== action.payload
          );
          state.loading = false;
        }
      )
      .addCase(deleteProductAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getProductById.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getProductById.fulfilled,
        (state, action: PayloadAction<Product>) => {
          state.selectedProduct = action.payload;
          state.loading = false;
        }
      )
      .addCase(getProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getFilteredProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getFilteredProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.filteredProducts = action.payload;
          state.loading = false;
        }
      )
      .addCase(getFilteredProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { actions, reducer } = productSlice;
export default productSlice.reducer;
