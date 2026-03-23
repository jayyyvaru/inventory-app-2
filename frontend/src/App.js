import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";
import Dashboard from "./components/Dashboard";
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";
import Locations from "./components/Locations";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/locations" element={<Locations />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;