import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { getFilteredProducts } from "./redux/slices/ProductSlice";
import { useSelector } from "react-redux";
import { useDebounce } from "./hooks/debounce";
import { useAppDispatch } from "./redux/store";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
}

const FilteredProducts: React.FC = () => {
  const dispatch = useAppDispatch();
  const filteredProducts: Product[] = useSelector(
    (state: any) => state.product.filteredProducts
  );
  const loading: boolean = useSelector((state: any) => state.product.loading);
  const error: string = useSelector((state: any) => state.product.error);
  const [minPrice, setMinPrice] = useState<number>(0);
  const debouncedMinPrice: number | undefined = useDebounce(minPrice, 500);

  useEffect(() => {
    if (typeof debouncedMinPrice === "number") {
      dispatch(getFilteredProducts(debouncedMinPrice));
    }
  }, [dispatch, debouncedMinPrice]);

  async (): Promise<void> => {
    try {
      if (typeof minPrice === "number") {
        await dispatch(getFilteredProducts(minPrice)).unwrap();
        toast.success("Products fetched successfully");
      } else {
        toast.error("Please enter a valid price number");
      }
    } catch (error) {
      console.error("Error fetching filtered products", error);
      toast.error("Error fetching filtered products");
    }
  };

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-5 text-red-500">{error}</div>;
  }
  return (
    <div className="max-w-md mx-auto">
      <button className="my-5 border-green-900 border px-3 py-2 rounded-full bg-green-800 text-white">
        <a href="/home">Go Back</a>
      </button>
      <div className="relative h-11 mt-4 w-full min-w-[200px] mb-5">
        <input
          type="number"
          value={minPrice}
          onChange={(e) => {
            const value = e.target.value;
            setMinPrice(Number(value));
          }}
          className="peer h-full w-full rounded-md border border-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-green-800 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
          placeholder=" "
        />

        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-green-800 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-green-800 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-green-800 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
          Minimum Price
        </label>
      </div>
      <h2 className="text-xl text-green-800 mb-4">
        Filtered Products with Minimum Price of <strong>${minPrice}</strong>
      </h2>
      {filteredProducts.length > 0 ? (
        <div className="container mx-auto ">
          <table className="border-collapse w-full">
            <thead>
              <tr>
                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                  S.No
                </th>
                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                  Name
                </th>
                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                  Description
                </th>
                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                  Price
                </th>
                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                  Stock
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product: Product, index: number) => {
                return (
                  <tr
                    key={product._id}
                    className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0"
                  >
                    <td className="w-full lg:w-auto text-center p-3 text-gray-800 border border-b block lg:table-cell relative lg:static">
                      {index + 1}
                    </td>
                    <td className="w-full lg:w-auto p-3 text-gray-800 border border-b text-center block lg:table-cell relative lg:static">
                      {product.name}
                    </td>
                    <td className="w-full lg:w-auto p-3 text-gray-800 border border-b text-center block lg:table-cell relative lg:static">
                      {product.description}
                    </td>
                    <td className="w-full lg:w-auto p-3 text-gray-800 border border-b text-center block lg:table-cell relative lg:static">
                      ${product.price}
                    </td>
                    <td className="w-full lg:w-auto p-3 text-gray-800 border border-b text-center block lg:table-cell relative lg:static">
                      {product.stock}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No products found</p>
      )}
      <Toaster position="bottom-right" />
    </div>
  );
};

export default FilteredProducts;
