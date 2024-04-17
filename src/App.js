import React, { useState } from "react";
import "./App.css";
const tableArr = [
  { sNo: 1, first: "Mark", last: "otto", handle: "@mdo" },
  { sNo: 2, first: "Jocab", last: "Thornton", handle: "@fat" },
  { sNo: 3, first: "Larry the bird", last: "Johnson", handle: "@twitter" },
  // Add more data as needed
];
function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = tableArr.slice(indexOfFirstRow, indexOfLastRow);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="App">
      <div className={`input-container`}>
        <input className="input-field" placeholder="Search Places..." />
      </div>
      {/* table */}
      <div>
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
            {currentRows.map((item, index) => (
              <tr key={index}>
                <td>{item.sNo}</td>
                <td>{item.first}</td>
                <td>{item.last}</td>
                <td>{item.handle}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination controls */}
        <div>
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={indexOfLastRow >= tableArr.length}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
