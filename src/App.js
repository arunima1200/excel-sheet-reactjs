import './App.css';
import React, { useState } from 'react';
import * as XLSX from "xlsx";

function App() {
  const [items, setItems] = useState([]);

  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, {type: "buffer"});
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);
        resolve(data);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
    promise.then((d) => {
      console.log(d);
      setItems(d);
    });
  };
    
  const handleSearch = () => {

  }

  return (
    <div>
      <br />
      <input 
      type="file"
      onChange={(e) => { 
      const file = e.target.files[0];
      readExcel(file);
      }}
    />
<br/><br/>

<table class="table table-bordered">
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Emp_Name</th>
      <th scope="col">Department</th>
      <th scope="col">Salary</th>
      <th scope="col">Age</th>
      <th scope="col">Address</th>
    </tr>
  </thead>
  <tbody>
    {
      items.map((d) => (
        <tr key={d.ID}>
          <th scope="row">{d.ID}</th>
          <td>{d.Emp_Name}</td>
          <td>{d.Department}</td>
          <td>{d.Salary}</td>
          <td>{d.Age}</td>
          <td>{d.Address}</td>
        </tr>
      ))
    }
  </tbody>
</table>
    </div>
  );
}

export default App;
