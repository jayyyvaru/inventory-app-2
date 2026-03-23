import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL + "/products";
  const LOCATION_API = import.meta.env.VITE_API_URL + "/locations";

  useEffect(() => {
    fetchLocations();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const fetchProducts = useCallback(async () => {
  try {
    let url = API_URL;

    if (selectedLocation) {
      url = `${API_URL}?location_id=${selectedLocation}`;
    }

    const res = await axios.get(url);
    setProducts(res.data);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}, [selectedLocation]);

  const fetchLocations = async () => {
    try {
      const res = await axios.get(LOCATION_API);
      setLocations(res.data);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`${API_URL}/${editingProduct.id}`, editingProduct);
      fetchProducts();
      setEditingProduct(null);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const getLocationName = (location_id) => {
    const loc = locations.find((l) => l.id === location_id);
    return loc ? loc.name : "-";
  };

  const totalInventoryValue = products.reduce(
    (acc, p) => acc + p.price * p.quantity,
    0
  );

  const isAllLocations = selectedLocation === "";

  return (
    <div className="card shadow-sm p-3">
      <h2>Product List</h2>

      {/* Top Section */}
      <div className="mb-3 d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2">
        <select
          className="form-select w-100 w-md-25"
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
        >
          <option value="">All Locations</option>
          {locations.map((loc) => (
            <option key={loc.id} value={loc.id}>
              {loc.name}
            </option>
          ))}
        </select>

        <h5 className="mb-0">
          Total Inventory: ₹{totalInventoryValue.toLocaleString()}
        </h5>
      </div>

      {/* Desktop Table */}
      <div className="d-none d-md-block">
        <table className="table table-hover">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Price (₹)</th>
              <th>Quantity</th>
              {isAllLocations && <th>Location</th>}
              <th>Total (₹)</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={isAllLocations ? 6 : 5} className="text-center">
                  No products available
                </td>
              </tr>
            ) : (
              products.map((p) => (
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td>₹{Number(p.price).toLocaleString()}</td>
                  <td>{p.quantity}</td>

                  {isAllLocations && (
                    <td>{getLocationName(p.location_id)}</td>
                  )}

                  <td>₹{(p.price * p.quantity).toLocaleString()}</td>

                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => setEditingProduct(p)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteProduct(p.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="d-md-none">
        {products.length === 0 ? (
          <p className="text-center">No products available</p>
        ) : (
          products.map((p) => (
            <div key={p.id} className="card mb-3 p-3 shadow-sm">
              <h5>{p.name}</h5>

              <p className="mb-1">
                <strong>Price:</strong> ₹{Number(p.price).toLocaleString()}
              </p>

              <p className="mb-1">
                <strong>Qty:</strong> {p.quantity}
              </p>

              {isAllLocations && (
                <p className="mb-1">
                  <strong>Location:</strong>{" "}
                  {getLocationName(p.location_id)}
                </p>
              )}

              <p className="mb-2">
                <strong>Total:</strong> ₹
                {(p.price * p.quantity).toLocaleString()}
              </p>

              <div className="d-flex gap-2">
                <button
                  className="btn btn-warning btn-sm w-50"
                  onClick={() => setEditingProduct(p)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger btn-sm w-50"
                  onClick={() => deleteProduct(p.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Edit Form */}
      {editingProduct && (
        <div className="mt-4 border p-3 rounded">
          <h5>Edit Product</h5>

          <form
            onSubmit={handleEditSubmit}
            className="d-flex flex-column flex-md-row gap-2"
          >
            <input
              type="text"
              className="form-control"
              value={editingProduct.name}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  name: e.target.value,
                })
              }
            />

            <input
              type="number"
              className="form-control"
              value={editingProduct.price}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  price: e.target.value,
                })
              }
            />

            <input
              type="number"
              className="form-control"
              value={editingProduct.quantity}
              onChange={(e) =>
                setEditingProduct({
                  ...editingProduct,
                  quantity: e.target.value,
                })
              }
            />

            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-success btn-sm">
                Save
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => setEditingProduct(null)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default ProductList;