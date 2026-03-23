import React, { useEffect, useState } from "react";
import axios from "axios";

function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    quantity: "",
    location_id: "",
  });

  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const API_URL = import.meta.env.VITE_API_URL + "/products";
  const LOCATION_API = import.meta.env.VITE_API_URL + "/locations";

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const res = await axios.get(LOCATION_API);
      setLocations(res.data);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!product.name || !product.price || !product.quantity || !product.location_id) {
      setMessage("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      await axios.post(API_URL, product);

      setMessage("Product added successfully!");

      setProduct({
        name: "",
        price: "",
        quantity: "",
        location_id: "",
      });

    } catch (error) {
      console.error("Error adding product:", error);
      setMessage("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card shadow-sm p-4 mb-4">
      <h2 className="mb-3">Add Product</h2>

      {message && (
        <div className="alert alert-info">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label className="form-label">Location</label>
          <select
            className="form-control"
            name="location_id"
            value={product.location_id}
            onChange={handleChange}
          >
            <option value="">Select Location</option>
            {locations.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Product Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="Enter product name"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Price (₹)</label>
          <input
            type="number"
            className="form-control"
            name="price"
            value={product.price}
            onChange={handleChange}
            placeholder="Enter price"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Quantity</label>
          <input
            type="number"
            className="form-control"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
            placeholder="Enter quantity"
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}

export default AddProduct;