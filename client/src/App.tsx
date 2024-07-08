import React, { FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GetProducts from "./components/GetProducts";
import PostProducts from "./components/PostProducts";
import UpdateProducts from "./components/UpdateProducts";
import Register from "./components/Register";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoutes";
import FilteredProducts from "./components/FilteredProducts";

const App: FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <GetProducts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/post"
            element={
              <ProtectedRoute>
                <PostProducts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/update/:id"
            element={
              <ProtectedRoute>
                <UpdateProducts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/filtered"
            element={
              <ProtectedRoute>
                <FilteredProducts />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
