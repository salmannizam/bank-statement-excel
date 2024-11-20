"use client";

import { useState } from 'react';

const YourComponent = () => {
  const [formData, setFormData] = useState([{ header: '', type: '', column: '' }]);

  const handleChange = (index, fieldName, value) => {
    const newData = [...formData];
    newData[index] = { ...newData[index], [fieldName]: value };
    setFormData(newData);
  };

  const handleSubmit = () => {
    const processedData = {};
    formData.forEach((data, index) => {
      if (data.header && data.type && data.column) {
        processedData[data.header] = {
          type: data.type,
          column: data.column
        };
      }
    });
    console.log(processedData);
    // Perform further actions with processedData
  };

  const addRow = () => {
    setFormData([...formData, { header: '', type: '', column: '' }]);
  };

  return (
    <div>
      <table className='table-auto'>
        <thead><tr>
          <th>header name</th>
          <th>data type</th>
          <th>sheet column</th>
          </tr>
        </thead>
        <tbody>
         
        

      {formData.map((data, index) => (
        <div >
          <tr key={index}>
            <td> 
              <input
                type="text"
                placeholder="Header"
                value={data.header}
                onChange={(e) => handleChange(index, 'header', e.target.value)}
              /> 
            </td>
            <td> 
                <input
                  type="text"
                  placeholder="Type"
                  value={data.type}
                  onChange={(e) => handleChange(index, 'type', e.target.value)}
                />
            </td>
            <td> 
                <input
                  type="text"
                  placeholder="Column"
                  value={data.column}
                  onChange={(e) => handleChange(index, 'column', e.target.value)}
                />
            </td>
          </tr> 
        </div>
      ))}
      <button onClick={addRow}>Add Row</button>
      <button onClick={handleSubmit}>Submit</button>
      </tbody>
      </table>
    </div>
  );
};

export default YourComponent;
