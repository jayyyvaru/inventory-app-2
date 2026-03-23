import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("all");

  const API_URL = "http://localhost:5001/products";

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(API_URL);
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const totalProducts = products.length;
  const totalInventoryValue = products.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );
  const lowStockCount = products.filter(
    (p) => p.quantity > 0 && p.quantity < 5
  ).length;
  const outOfStockCount = products.filter((p) => p.quantity === 0).length;

  let filteredProducts = products;

  if (filter === "lowStock") {
    filteredProducts = products.filter(
      (p) => p.quantity > 0 && p.quantity < 5
    );
  }

  if (filter === "outOfStock") {
    filteredProducts = products.filter((p) => p.quantity === 0);
  }

  if (filter === "allProducts") {
    filteredProducts = products;
  }

  return (
    <div>
      <h2 className="mb-4">Dashboard</h2>

      <div className="row">

        <div className="col-md-3 mb-3">
          <div
            className="card p-3 shadow-sm"
            style={{
              cursor: "pointer",
              transition: "all 0.3s ease",
              borderRadius: "12px"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px) scale(1.02)";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.1)";
            }}
            onClick={() => setFilter("allProducts")}
          >
            <h6 className="text-muted">Total Products</h6>
            <h3>{totalProducts}</h3>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div
            className="card p-3 shadow-sm"
            style={{
              cursor: "pointer",
              transition: "all 0.3s ease",
              borderRadius: "12px"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px) scale(1.02)";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.1)";
            }}
            onClick={() => setFilter("all")}
          >
            <h6 className="text-muted">Total Inventory Value</h6>
            <h3>₹{totalInventoryValue.toLocaleString()}</h3>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div
            className="card p-3 shadow-sm"
            style={{
              cursor: "pointer",
              transition: "all 0.3s ease",
              borderRadius: "12px"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px) scale(1.02)";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.1)";
            }}
            onClick={() => setFilter("lowStock")}
          >
            <h6 className="text-muted">Low Stock</h6>
            <h3>{lowStockCount}</h3>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div
            className="card p-3 shadow-sm"
            style={{
              cursor: "pointer",
              transition: "all 0.3s ease",
              borderRadius: "12px"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px) scale(1.02)";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.1)";
            }}
            onClick={() => setFilter("outOfStock")}
          >
            <h6 className="text-muted">Out of Stock</h6>
            <h3>{outOfStockCount}</h3>
          </div>
        </div>

      </div>

      <div className="mt-4">
        <h5>
          {filter === "lowStock" && "Low Stock Products"}
          {filter === "outOfStock" && "Out of Stock Products"}
          {filter === "allProducts" && "All Products"}
          {filter === "all" && "All Products"}
        </h5>

        <table className="table table-hover mt-3">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center">
                  No data
                </td>
              </tr>
            ) : (
              filteredProducts.map((p) => (
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td>₹{Number(p.price).toLocaleString()}</td>
                  <td>{p.quantity}</td>
                  <td>₹{(p.price * p.quantity).toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;