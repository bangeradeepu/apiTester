import React, { useState } from "react";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import Lighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

const App = () => {
  const [textbar, setTextBar] = useState("");
  const [getData, setGetData] = useState(null);
  const [error, setError] = useState(null);
  const [dataRows, setDataRows] = useState([{ columnName: "", data: "" }]);

  const handleSubmitDELETE = async () => {
    try {
      const response = await axios.delete(
        textbar.startsWith("delete ") ? textbar.substring(7) : textbar
      );
      setGetData(response.data);
      setError(null);
    } catch (error) {
      setError("Error deleting data. Please check the URL or data format.");
      setGetData(null);
    }
  };

  const handleSumitCLickGET = async () => {
    try {
      const fetchData = await axios.get(textbar);
      setGetData(fetchData.data);
      setError(null); // Reset error state
    } catch (error) {
      setError("Error fetching data. Please check the URL."); // Set error message
      setGetData(null); // Clear previous data on error
    }
  };

  const handleChange = (index, key, value) => {
    const newDataRows = [...dataRows];
    newDataRows[index][key] = value;
    setDataRows(newDataRows);
  };

  const handleAddRow = () => {
    setDataRows([...dataRows, { columnName: "", data: "" }]);
  };

  const handleSubmitPOST = async () => {
    try {
      const postData = dataRows.map(({ columnName, data }) => ({
        [columnName]: data,
      }));
      const formattedData = {
        createdAt: new Date().toISOString(), // Get current timestamp in ISO format
        ...postData.reduce((acc, curr) => ({ ...acc, ...curr }), {}), // Merge all objects into one
        id: Math.random().toString(), // Generate a random ID (you may need a different approach for production)
      };
      const response = await axios.post(textbar, formattedData);
      setGetData(response.data);
      setError(null); // Reset error state
    } catch (error) {
      setError("Error posting data. Please check the URL or data format."); // Set error message
      setGetData(null); // Clear previous data on error
    }
  };

  const handleChangePUT = (index, key, value) => {
    const newDataRows = [...dataRows];
    newDataRows[index][key] = value;
    setDataRows(newDataRows);
  };

  const handleAddRowPUT = () => {
    setDataRows([...dataRows, { columnName: "", data: "" }]);
  };

  const handleSubmitPUT = async () => {
    try {
      const putData = dataRows.map(({ columnName, data }) => ({
        [columnName]: data,
      }));
      const formattedPutData = {
        createdAt: new Date().toISOString(),
        ...putData.reduce((acc, curr) => ({ ...acc, ...curr }), {}),
        id: textbar.startsWith("put ")
          ? textbar.split(" ")[1]
          : Math.random().toString(),
      };
      const response = await axios.put(
        textbar.startsWith("put ") ? textbar.substring(4) : textbar,
        formattedPutData
      );
      setGetData(response.data);
      setError(null);
    } catch (error) {
      setError("Error updating data. Please check the URL or data format.");
      setGetData(null);
    }
  };

  const [methodChange, setMethodChange] = useState("GET");
  console.log(methodChange);
  const [themeChange, setThemeChange] = useState(true);

  const handleButtonClick = () => {
    setThemeChange(!themeChange);
  };

  const handleDeleteRow = (indexToDelete) => {
    setDataRows((prevRows) =>
      prevRows.filter((_, index) => index !== indexToDelete)
    );
  };
  const handleMockApiClick = () => {
    // Redirect to the mock API webpage when clicked
    window.open('https://mockapi.io/', '_blank');
  };
  return (
    <div
      className={`f12 ${themeChange ? "background-dark" : "background-light"}`}
    >
      <div className="background-blr">
        <div className="pd-2">
          <div className="flex space-between">
            <div className=""><span className="logo fw-700">API</span> <span className="red kio">request</span></div>
            
            <div onClick={handleButtonClick}>
              {themeChange ? (
                <LightModeIcon className="white c-pointer" />
              ) : (
                <DarkModeIcon className="black c-pointer" />
              )}
            </div>
          </div>
          <div className="flex g2 flex-column">
            <div className="container-box-1">
              <div className="flex justify-content-center align-item-center outerLine">
                <div
                  className={`dropdownGap ${
                    themeChange ? "bg-black" : "bg-white"
                  }`}
                >
                  <select
                    name=""
                    id=""
                    className={`apiMethod fw-700 ${
                      themeChange ? "bg-black white" : "bg-white black"
                    }`}
                    onChange={(e) => setMethodChange(e.target.value)}
                  >
                    <option value="GET" className="green fw-700">GET</option>
                    <option value="POST" className="yellow fw-700">POST</option>
                    <option value="PUT" className="blue fw-700">PUT</option>
                    <option value="DELETE" className="red fw-700">DELETE</option>
                  </select>
                </div>

                <input
                  type="text"
                  name=""
                  className={`apiTextbox ${
                    themeChange ? "bg-black white" : "bg-white black"
                  }`}
                  value={textbar}
                  onChange={(e) => setTextBar(e.target.value)}
                  placeholder="Enter API"
                />

                {methodChange === "GET" && (
                  <button
                    onClick={handleSumitCLickGET}
                    className="apiButton c-pointer"
                  >
                    Request
                  </button>
                )}
                {methodChange === "DELETE" && (
                  <button
                    onClick={handleSubmitDELETE}
                    className="apiButton c-pointer"
                  >
                    Request
                  </button>
                )}
                {methodChange === "POST" && (
                  <button
                    onClick={handleSubmitPOST}
                    className="apiButton c-pointer"
                  >
                    Request
                  </button>
                )}
                {methodChange === "PUT" && (
                  <button
                    onClick={handleSubmitPUT}
                    className="apiButton c-pointer"
                  >
                    Request
                  </button>
                )}
              </div>
              <div className="jswxx">
                <div className="flex justify-content-center">
                  {methodChange === "GET" && (
                    <button
                      onClick={handleSumitCLickGET}
                      className="mrequestBtn mt-4 c-pointer"
                    >
                      Request
                    </button>
                  )}
                  {methodChange === "DELETE" && (
                    <button
                      onClick={handleSubmitDELETE}
                      className="mrequestBtn mt-4 c-pointer"
                    >
                      Request
                    </button>
                  )}
                  {methodChange === "POST" && (
                    <button
                      onClick={handleSubmitPOST}
                      className="mrequestBtn mt-4 c-pointer"
                    >
                      Request
                    </button>
                  )}
                  {methodChange === "PUT" && (
                    <button
                      onClick={handleSubmitPUT}
                      className="mrequestBtn mt-4 c-pointer"
                    >
                      Request
                    </button>
                  )}
                </div>
              </div>

              <div className="kiuwhhc">
                {methodChange === "POST" && (
                  <div
                    className={`putPostBox sb mt-2 align-item-center ${
                      themeChange ? "bg-dark-grey" : "bg-light-theme black"
                    }`}
                  >
                    {dataRows.map((row, index) => (
                      <div>
                        <div
                          key={index}
                          className="flex g1 mb-1 align-item-center"
                        >
                          <input
                            type="text"
                            placeholder="Column Name"
                            className={`putposttextbox ${
                              themeChange ? "bg-black white" : "bg-white black"
                            }`}
                            value={row.columnName}
                            onChange={(e) =>
                              handleChange(index, "columnName", e.target.value)
                            }
                          />
                          <input
                            type="text"
                            placeholder="Data"
                            className={`putposttextbox ${
                              themeChange ? "bg-black white" : "bg-white black"
                            }`}
                            value={row.data}
                            onChange={(e) =>
                              handleChange(index, "data", e.target.value)
                            }
                          />
                          {dataRows.length > 1 && (
                            <DeleteIcon
                              className={`c-pointer ${
                                themeChange ? "white" : "black"
                              }`}
                              onClick={() => handleDeleteRow(index)}
                            />
                          )}
                        </div>
                        <div className="flex justify-content-center">
                          {index === dataRows.length - 1 && (
                            <div className="addRow" onClick={handleAddRow}>
                              Add new row
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {methodChange === "PUT" && (
                  <div
                    className={`putPostBox sb mt-2 align-item-center ${
                      themeChange ? "bg-dark-grey" : "bg-light-theme  black"
                    }`}
                  >
                    {dataRows.map((row, index) => (
                      <div>
                        <div
                          key={index}
                          className="flex g1 mb-1 align-item-center"
                        >
                          <input
                            type="text"
                            placeholder="Column Name"
                            className={`putposttextbox ${
                              themeChange ? "bg-black white" : "bg-white black"
                            }`}
                            value={row.columnName}
                            onChange={(e) =>
                              handleChangePUT(
                                index,
                                "columnName",
                                e.target.value
                              )
                            }
                            style={{ marginRight: "10px" }}
                          />
                          <input
                            type="text"
                            placeholder="Data"
                            className={`putposttextbox ${
                              themeChange ? "bg-black white" : "bg-white black"
                            }`}
                            value={row.data}
                            onChange={(e) =>
                              handleChangePUT(index, "data", e.target.value)
                            }
                            style={{ marginRight: "10px" }}
                          />
                          {dataRows.length > 1 && (
                            <DeleteIcon
                              className="white c-pointer"
                              onClick={() => handleDeleteRow(index)}
                            />
                          )}
                        </div>
                        <div className="flex justify-content-center">
                          {index === dataRows.length - 1 && (
                            <div className="addRow" onClick={handleAddRowPUT}>
                              Add new row
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="iuqagg">
              {methodChange === "POST" && (
                <div
                  className={`putPostBox sb mt-2 align-item-center ${
                    themeChange ? "bg-dark-grey" : "bg-light-theme black"
                  }`}
                >
                  {dataRows.map((row, index) => (
                    <div>
                      <div
                        key={index}
                        className="flex g1 mb-4 align-item-center"
                      >
                        <input
                          type="text"
                          placeholder="Column Name"
                          className={`putposttextbox ${
                            themeChange ? "bg-black white" : "bg-white black"
                          }`}
                          value={row.columnName}
                          onChange={(e) =>
                            handleChange(index, "columnName", e.target.value)
                          }
                          style={{ marginRight: "10px" }}
                        />
                        <input
                          type="text"
                          placeholder="Data"
                          className={`putposttextbox ${
                            themeChange ? "bg-black white" : "bg-white black"
                          }`}
                          value={row.data}
                          onChange={(e) =>
                            handleChange(index, "data", e.target.value)
                          }
                          style={{ marginRight: "10px" }}
                        />
                        {dataRows.length > 1 && (
                          <DeleteIcon
                            className={`c-pointer ${
                              themeChange ? "white" : "black"
                            }`}
                            onClick={() => handleDeleteRow(index)}
                          />
                        )}
                      </div>
                      <div className="flex justify-content-center">
                        {index === dataRows.length - 1 && (
                          <div className="addRow" onClick={handleAddRow}>
                            Add new row
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {methodChange === "PUT" && (
                <div
                  className={`putPostBox sb mt-2 align-item-center ${
                    themeChange ? "bg-dark-grey" : "bg-light-theme black"
                  }`}
                >
                  {dataRows.map((row, index) => (
                    <div>
                      <div
                        key={index}
                        className="flex g1 mb-4 align-item-center"
                      >
                        <input
                          type="text"
                          placeholder="Column Name"
                          className={`putposttextbox ${
                            themeChange ? "bg-black white" : "bg-white black"
                          }`}
                          value={row.columnName}
                          onChange={(e) =>
                            handleChangePUT(index, "columnName", e.target.value)
                          }
                          style={{ marginRight: "10px" }}
                        />
                        <input
                          type="text"
                          placeholder="Data"
                          className={`putposttextbox ${
                            themeChange ? "bg-black white" : "bg-white black"
                          }`}
                          value={row.data}
                          onChange={(e) =>
                            handleChangePUT(index, "data", e.target.value)
                          }
                          style={{ marginRight: "10px" }}
                        />
                        {dataRows.length > 1 && (
                          <DeleteIcon
                            className={`c-pointer ${
                              themeChange ? "white" : "black"
                            }`}
                            onClick={() => handleDeleteRow(index)}
                          />
                        )}
                      </div>
                      <div className="flex justify-content-center">
                        {index === dataRows.length - 1 && (
                          <div className="addRow" onClick={handleAddRowPUT}>
                            Add new row
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div>
              <div
                className={`errorHandler ${themeChange ? "white" : "black"}`}
              >
                {error && <p>{error}</p>}
              </div>
              <div>
                {themeChange ? (
                  <div>
                    {getData ? (
                      <div>
                        <SyntaxHighlighter
                          language="json"
                          style={vscDarkPlus}
                          className="container-box sb container-box-output "
                        >
                          {JSON.stringify(getData, null, 2)}
                        </SyntaxHighlighter>
                      </div>
                    ) : (
                      <div
                        className={`errorHandler ${
                          themeChange ? "white" : "dark"
                        }`}
                      >
                        
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    {getData ? (
                      <div>
                        <Lighter
                          language="json"
                          style={docco}
                          className="container-box sb container-box-output "
                        >
                          {JSON.stringify(getData, null, 2)}
                        </Lighter>
                      </div>
                    ) : (
                      <div
                        className={`errorHandler ${
                          themeChange ? "white" : "dark"
                        }`}
                      >
                        
                      </div>
                    )}
                  </div>
                )}
              </div>
              
            </div>
          </div>
          <div className={`mockApi f10 mt-2 ${themeChange ? "white" : "black"}`}>Create datasets using <span className="grey c-pointer"  onClick={handleMockApiClick}><u>mock API</u></span></div>
        </div>
      </div>
    </div>
  );
};

export default App;
