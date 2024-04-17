import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import Spinner from "./component/Spinner";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(5);
  const [status, setStatus] = useState("pending");
  const [error, setError] = useState("");
  // api
  // function to handle search
  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://wft-geo-db.p.rapidapi.com/v1/geo/cities`,
        {
          params: { countryIds: "IN", namePrefix: searchTerm, limit: limit },
          headers: {
            "x-rapidapi-host": process.env.REACT_APP_API_URL,
            "x-rapidapi-key": process.env.REACT_APP_API_KEY,
          },
        }
      );
      setSearchResults(response.data.data);
      setStatus("success");
    } catch (error) {
      console.error("Error fetching data:", error);
      setStatus("fail");
    }
    setLoading(false);
  };
  // input
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch(searchTerm);
    }
  };

  const handlePagination = (event) => {
    const inputValue = event.target.value;
    if (inputValue !== "" && !isNaN(inputValue)) {
      const newLimit = parseInt(inputValue, 10);
      if (newLimit >= 5 && newLimit <= 10) {
        setLimit(newLimit);
      } else {
        setError("only min:5 and max:10 is allowed");
      }
    }
  };
  const handleFetchData = () => {
    setError("");
    handleSearch();
  };
  return (
    <div className="App">
      <div className={`input-container`}>
        <input
          className="input-field"
          placeholder="Search Places..."
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
      </div>
      {/* table */}
      <div>
        {status === "success" && (
          <table className="table-container">
            {/* Table header */}
            <thead>
              <tr>
                <th>#</th>
                <th>First</th>
                <th>Last</th>
                <th>Handle</th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody>
              {searchResults.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.region}</td>
                  <td>{item.country}</td>
                  <td>{item.countryCode}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {searchResults.length === 0 && status === "success" && (
          <div className="text-center">No result found</div>
        )}
        {searchResults.length === 0 && status === "pending" && (
          <div className="text-center">Start searching</div>
        )}
        {searchResults.length === 0 && status === "fail" && (
          <div className="text-center">Somthing Wrong Happen</div>
        )}

        {/* drop -down */}
        <div className="fetch-input-container">
          <input
            type="number"
            min="5"
            max="10"
            value={limit}
            onChange={handlePagination}
            className="fetch-input"
          />
          <button onClick={handleFetchData} className="fetch-button">
            Fetch
          </button>
        </div>
        <span className="error">{error}</span>
        {loading && <Spinner />}
      </div>
    </div>
  );
}

export default App;
