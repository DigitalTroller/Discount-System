import { useState } from "react";
import React from "react";
import axios from "axios";
import { ExportToExcel } from "./ExportToExcel";

import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [data, setData] = React.useState([]);
  const fileName = "all students";
  const [students, setStudents] = useState([]);
  const [isShownDeprive, setIsShownDeprive] = useState(false);
  const [isShownAcquire, setIsShownAcquire] = useState(false);
  const handleClickDeprive = (event) => {
    setIsShownAcquire(false);
    fetchDataDeprive();

    // 👇️ or simply set it to true
    setIsShownDeprive(true);
  };

  React.useEffect(() => {
    const fetchData = () => {
      axios
        .get("https://localhost:8080/practice/students/toDeprive")
        .then((r) => setData(r.data))
    }
    fetchData()
  }, []);
  console.log(data);

  const handleClickAcquire = (event) => {
    fetchDataAcquire();
    setIsShownAcquire(true);
    setIsShownDeprive(false);
  };
  const fetchDataDeprive = async () => {
    const response = await fetch(
      "http://localhost:8080/practice/students/toDeprive"
    );
    const data = await response.json();

    //use only 3 sample data
    setStudents(data);
  };

  const fetchDataAcquire = async () => {
    const response = await fetch(
      "http://localhost:8080/practice/students/acquire"
    );
    const data = await response.json();

    //use only 3 sample data
    setStudents(data);
  };
  return (
    <div className="App">
      <ul class="nav justify-content-center bg-dark">
        <li class="nav-item">
          <a class="nav-link text-light" onClick={handleClickAcquire} href="#">
            Acquire
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link text-light" onClick={handleClickDeprive} href="#">
            To deprive
          </a>
        </li>
        <li class="nav-item">
          <ExportToExcel apiData={data} fileName={fileName} />
        </li>
      </ul>
      <h1>List of Students</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Discount category</th>
            <th>Year of admission</th>
            <th>Discount</th>
            {isShownDeprive && <th>Deprivation of discount</th>}
            {isShownAcquire && <th>Granting a discount</th>}
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, key) => (
            <tr key={key}>
              <td className="table-data">{student.snp}</td>
              <td className="table-data">{student.discountCategory}</td>
              <td className="table-data">{student.yearOfAdmission}</td>
              <td className="table-data">{student.discount}</td>
              {isShownDeprive && (
                <td className="table-data">{student.deprivationOfDiscount}</td>
              )}
              {isShownAcquire && (
                <td className="table-data">{student.granting_a_discount}</td>
              )}
              <td className="table-data">{student.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
