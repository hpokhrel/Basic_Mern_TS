import React, { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { useAppDispatch } from "./redux/store";
import { useNavigate } from "react-router-dom";
import { RootState } from "./redux/store";
import {
  fetchProducts,
  deleteProductAction,
} from "./redux/slices/ProductSlice";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
}

const GetProducts: React.FC = () => {
  const dispatch = useAppDispatch();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.product
  );
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const deleteProduct = async (id: string) => {
    try {
      await dispatch(deleteProductAction(id)).unwrap();
      toast.success("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product");
    }
  };

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-5 text-red-500">{error}</div>;
  }

  const handleLogout = () => {
    const allCookies = document.cookie.split(";");
    for (let cookie of allCookies) {
      const cookieName = cookie.split("=")[0].trim();
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
    navigate("/");
  };

  return (
    <>
      <div className="container m-5 flex justify-end w-full gap-5">
        <a
          href="/post"
          className="my-5 border-green-900 border px-4 py-2 rounded-full bg-green-800 text-white"
        >
          Add Products
        </a>
        <a
          href="/filtered"
          className="my-5 border-green-900 border px-4 py-2 rounded-full bg-green-800 text-white"
        >
          Filter Products
        </a>
        <button
          onClick={handleLogout}
          className="my-5 px-4 py-2 rounded-full bg-red-400 text-white"
        >
          Logout
        </button>
      </div>
      <div className="container mx-auto ">
        <table className="border-collapse w-full">
          <thead>
            <tr>
              <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                S.No
              </th>
              <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                Product Name
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
              <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product: Product, index: number) => (
              <tr
                key={index}
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
                <td className="w-full lg:w-auto p-3 text-gray-800 border border-b text-center block lg:table-cell relative lg:static">
                  <a
                    href={`/update/${product._id}`}
                    className="rounded-full bg-blue-400 py-1 px-3 text-md mx-2 text-white"
                  >
                    Update
                  </a>
                  <button
                    onClick={() => deleteProduct(product._id)}
                    className="rounded-full bg-red-400 py-1 px-3 text-md mx-2 text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Toaster position="bottom-right" />
    </>
  );
};

export default GetProducts;
