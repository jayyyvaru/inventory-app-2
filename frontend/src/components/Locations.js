import React, { useEffect, useState } from "react";
import axios from "axios";

function Locations() {
  const [locations, setLocations] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const API_URL = import.meta.env.VITE_API_URL + "/locations";

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const res = await axios.get(API_URL);
      setLocations(res.data);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  const handleAddLocation = async (e) => {
    e.preventDefault();

    if (!name) {
      setMessage("Please enter location name");
      return;
    }

    try {
      setLoading(true);

      await axios.post(API_URL, { name });

      setName("");
      setMessage("Location added successfully");

      fetchLocations();
    } catch (error) {
      console.error("Error adding location:", error);
      setMessage("Failed to add location");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card shadow-sm p-4">
      <h2 className="mb-3">Locations</h2>

      {message && <div className="alert alert-info">{message}</div>}

      <form onSubmit={handleAddLocation} className="mb-4">
        <div className="d-flex gap-2">
          <input
            type="text"
            className="form-control"
            placeholder="Enter location name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Location"}
          </button>
        </div>
      </form>

      <table className="table table-hover">
        <thead className="table-dark">
          <tr>
            <th>Location Name</th>
          </tr>
        </thead>

        <tbody>
          {locations.length === 0 ? (
            <tr>
              <td className="text-center">No locations found</td>
            </tr>
          ) : (
            locations.map((loc) => (
              <tr key={loc.id}>
                <td>{loc.name}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Locations;