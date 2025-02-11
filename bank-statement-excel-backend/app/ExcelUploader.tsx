"use client";
import React, { useRef, useState } from 'react';
import * as XLSX from 'xlsx';
import { parse, format as formatDate } from 'date-fns';

const ExcelUploader = () => {
  const [bankName, setBankName] = useState(null);
  const [jsonData, setJsonData] = useState(null);
  const fileInputRef = useRef(null);

  const handleBankNameChange = (e) => {
    setBankName(e.target.value);
    fileInputRef.current.value = '';
  };

  function convertToDate(inputDate: string) {
    // Define an array of possible date formats
    const dateFormats = [
      'dd/MM/yyyy',               // 01/03/2024
      'dd/MM/yy',                 // 01/03/24
      'dd/MMM/yyyy',              // 01/Mar/2024
      'dd/MMM/yy',                // 01/Mar/24
      'dd/MM/yyyy hh:mm:ss a',    // 01/03/2024 07:12:37 AM
      'dd/MM/yy hh:mm:ss a',      // 01/03/24 07:12:37 AM
      'dd/MMM/yyyy hh:mm:ss a',   // 01/Mar/2024 07:12:37 AM
      'dd/MMM/yy hh:mm:ss a',     // 01/Mar/24 07:12:37 AM
      'dd/MM/yyyy hh:mm:ss',      // 01/03/2024 07:12:37
      'dd/MM/yy hh:mm:ss',        // 01/03/24 07:12:37
      'dd/MMM/yyyy hh:mm:ss',     // 01/Mar/2024 07:12:37
      'dd/MMM/yy hh:mm:ss',       // 01/Mar/24 07:12:37
      'dd/MM/yyyy HH:mm:ss',      // 01/03/2024 07:12:37
      'dd/MM/yy HH:mm:ss',        // 01/03/24 07:12:37
      'dd/MMM/yyyy HH:mm:ss',     // 01/Mar/2024 07:12:37
      'dd/MMM/yy HH:mm:ss',       // 01/Mar/24 07:12:37
      'dd-MM-yyyy',                // 01-03-2024
      'dd-MM-yy',                  // 01-03-24
      'dd-MMM-yyyy',               // 01-Mar-2024
      'dd-MMM-yy',                 // 01-Mar-24
      'dd-MM-yyyy hh:mm:ss a',    // 01-03-2024 07:12:37 AM
      'dd-MM-yy hh:mm:ss a',      // 01-03-24 07:12:37 AM
      'dd-MMM-yyyy hh:mm:ss a',   // 01-Mar-2024 07:12:37 AM
      'dd-MMM-yy hh:mm:ss a',     // 01-Mar-24 07:12:37 AM
      'dd-MM-yyyy hh:mm:ss',      // 01-03-2024 07:12:37
      'dd-MM-yy hh:mm:ss',        // 01-03-24 07:12:37
      'dd-MMM-yyyy hh:mm:ss',     // 01-Mar-2024 07:12:37
      'dd-MMM-yy hh:mm:ss',       // 01-Mar-24 07:12:37
      'dd/MM/yyyy HH:mm:ss',      // 01/03/2024 07:12:37
      'dd/MM/yy HH:mm:ss',        // 01/03/24 07:12:37
      'dd/MMM/yyyy HH:mm:ss',     // 01/Mar/2024 07:12:37
      'dd/MMM/yy HH:mm:ss',       // 01/Mar/24 07:12:37
      'dd-MM-yyyy HH:mm:ss',      // 01-03-2024 07:12:37
      'dd-MM-yy HH:mm:ss',        // 01-03-24 07:12:37
      'dd-MMM-yyyy HH:mm:ss',     // 01-Mar-2024 07:12:37
      'dd-MMM-yy HH:mm:ss',       // 01-Mar-24 07:12:37
      'yyyy-MM-dd',                // 2024-03-01
      'yyyy-MM-dd hh:mm:ss',      // 2024-03-01 07:12:37
      'yy-MM-dd hh:mm:ss',        // 24-03-01 07:12:37
      'yyyy/MM/dd',                // 2024/03/01
      'yyyy/MM/dd hh:mm:ss',      // 2024/03/01 07:12:37
      'yy/MM/dd hh:mm:ss',        // 24/03/01 07:12:37
      'yyyyMMdd',                   // 20240301
      'yyyyMMdd hh:mm:ss',         // 20240301 07:12:37
      'yyMMdd hh:mm:ss',           // 240301 07:12:37
      'dd-MM-yyyyTHH:mm:ss',       // 01-03-2024T07:12:37
      'yyyy-MM-ddTHH:mm:ss',       // 2024-03-01T07:12:37
      'yy-MM-ddTHH:mm:ss',         // 24-03-01T07:12:37
      'yyyyMMddTHHmmss',            // 20240301T071237
      'yyMMddTHHmmss',              // 240301T071237
      'ddMMyyyy',                   // 01032024
      'yyyyMMddTHHmmssZ',           // 20240301T071237Z
      'yyMMddTHHmmssZ',             // 240301T071237Z
      'yyyy-MM-ddTHH:mm:ss.SSSZ',  // 2024-03-01T07:12:37.000Z
      'yy-MM-ddTHH:mm:ss.SSSZ',    // 24-03-01T07:12:37.000Z
      'dd-MM-yyyy HH:mm:ss.SSSZ',  // 01-03-2024 07:12:37.000Z
      'yyyy/MM/dd HH:mm:ss.SSSZ',  // 2024/03/01 07:12:37.000Z
      'yy/MM/dd HH:mm:ss.SSSZ',    // 24/03/01 07:12:37.000Z
      'yyyyMMdd HH:mm:ss.SSSZ',     // 20240301 07:12:37.000Z
      'yyMMdd HH:mm:ss.SSSZ',       // 240301 07:12:37.000Z
      'dd-MM-yyyyTHH:mm:ss.SSSZ',   // 01-03-2024T07:12:37.000Z
      'yyyy-MM-ddTHH:mm:ss.SSSZ',   // 2024-03-01T07:12:37.000Z
      'yy-MM-ddTHH:mm:ss.SSSZ',     // 24-03-01T07:12:37.000Z
      'yyyyMMddTHHmmss.SSSZ',        // 20240301T071237.000Z
      'yyMMddTHHmmss.SSSZ',          // 240301T071237.000Z
    ];
  

    // Try parsing the input date with each format
    for (let dateFormat of dateFormats) {
        const parsedDate = parse(inputDate, dateFormat, new Date());
        if (parsedDate instanceof Date && !isNaN(parsedDate.getTime())) {
            // If parsing succeeds, return the formatted date
            return formatDate(parsedDate, '20yy-MM-dd HH:mm:ss');
        }
    }
    // If none of the formats match, return null or handle the error as needed
    return null;
}



  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();


   
    // this data will come from api
      const res = {"BankName":"","headers":[{"header":"","type":"","db_column":""}]};
       const BankName = res.BankName

      const headers = res.headers;

      const headerNames = headers.map(data => data.header);
      const dbColumnNameWithHeader = {}; 
      headerNames.forEach((name, index) => {
        dbColumnNameWithHeader[name] = headers[index].db_column;
      });

      const headerstype = {};
      headerNames.forEach((name, index) => {
        headerstype[name] = headers[index].type;
      });

      console.log(headerNames);  
      console.log(headerstype);   

      const expectedDataTypes = headerstype

      const headersIcici = headerNames;
      const headersHDFC = headerNames;

    

    reader.onload = (event) => {
        const workbook = XLSX.read(event.target.result, { type: 'array' });

        const sheetName = workbook.SheetNames[0]; // Assuming there is only one sheet
        const sheet = workbook.Sheets[sheetName];
        const range = XLSX.utils.decode_range(sheet['!ref']);
        let json = [];
        let startRowIndex = null;

        // Logic for ICICI or HDFC bank
        for (let rowIndex = range.s.r; rowIndex <= range.e.r; rowIndex++) {
            const rowData = [];
            let rowValid = true; // Flag to indicate if all columns in the row are valid
            for (let colIndex = range.s.c; colIndex <= range.e.c; colIndex++) {
                const cellAddress = { c: colIndex, r: rowIndex };
                const cellRef = XLSX.utils.encode_cell(cellAddress);
                const cellValue = sheet[cellRef] ? sheet[cellRef].v : null;
                    
                // Check if the cell value matches the expected value for the corresponding column
                if (cellValue !== headerNames[colIndex]) {
                    rowValid = false;
                    break;
                }
            }
            if (rowValid) {
                // Set the start row index to the current row
                startRowIndex = rowIndex;
                break; 
            }
        }
        

        if (startRowIndex !== null) {
          // Start parsing data from the determined start row index
          for (let rowIndex = startRowIndex; rowIndex <= range.e.r; rowIndex++) {
              const rowData = [];
              let validRow = true;
      
              // Check the first column value based on the bank
              const firstCellAddress = { c: 0, r: rowIndex };
              const firstCellRef = XLSX.utils.encode_cell(firstCellAddress);
              const firstCellValue = sheet[firstCellRef] ? sheet[firstCellRef].v : null;
      
              // Validate the first column value for HDFC bank
              if (bankName === 'hdfc') {
                if (rowIndex !== startRowIndex) {
                                 
                  if (firstCellValue && firstCellValue.toString().includes("********")) {
                      continue; 
                  }
              
                  // Stop parsing if the first column of any row is empty or not in the specified date format
                  if (!firstCellValue || !/^(\d{2})\/(\d{2})\/(\d{2})$/.test(firstCellValue)) {
                      validRow = false;
                      break; 
                  }
                }
              }
                // Validate the first column value for ICICI bank
              else if (bankName === 'icici') {
                if (rowIndex !== startRowIndex) {
                  // Stop parsing if the first column of any row is empty or not a number
                  if (!firstCellValue || isNaN(firstCellValue)) {
                      validRow = false;
                      break; 
                  }
                }
              }
      
              // Collect data from each cell in the row
              for (let colIndex = range.s.c; colIndex <= range.e.c; colIndex++) {
                  const cellAddress = { c: colIndex, r: rowIndex };
                  const cellRef = XLSX.utils.encode_cell(cellAddress);
                  let cellValue = sheet[cellRef] ? sheet[cellRef].v : null;
                  
                  let expectedDataType ;
                  let  formattedDate;
                 if(bankName == "icici"){
                   expectedDataType = expectedDataTypes[headersIcici[colIndex]];
                 }else if(bankName == "hdfc"){
                   expectedDataType = expectedDataTypes[headersHDFC[colIndex]];
                 }
                    // Validate the data type of the current cell value
                    if (rowIndex !== startRowIndex) {
                      if (expectedDataType === 'number') {
                        if (!cellValue) {
                            cellValue = 0; 
                        } else if (typeof cellValue === 'string' && cellValue.includes(',')) {
                           
                            cellValue = parseFloat(cellValue.replace(/,/g, ''));
                        } else if (isNaN(cellValue)) {
                            cellValue = 0; 
                        }
                      } else if (expectedDataType === 'date') {
                          formattedDate = convertToDate(cellValue);
                          if(!formattedDate){
                            cellValue = "1111-01-01 00:00:00" ;
                          }else{
                            cellValue = formattedDate;
                          }
                      }
                    }
                    
                  rowData.push(cellValue);
              }

              if (!validRow) {
                continue;
              }
              json.push(rowData);
          }
        }
      
      // const result = json.slice(1).map(row => {
      //   const obj = {};
      //   json[0].forEach((key, index) => {
      //     obj[key] = row[index];
      //   });
      //   return obj;
      // });

      const result = json.slice(1).map(row => {
          const newObj = {};
          Object.entries(row).forEach(([key, value], index) => {
              const columnName = dbColumnNameWithHeader[json[0][key]]; // Get the column name from dbColumnNameWithHeader
              newObj[columnName] = value; // Assign value to the corresponding db column name
          });
          return newObj;
      });

        setJsonData(result);
    };

    reader.readAsArrayBuffer(file);
};


  
  

return (
  <div style={{ textAlign: 'center' }}>
    <select onChange={handleBankNameChange}>
      <option value="">Select Bank Name</option>
      <option value="hdfc">HDFC</option>
      <option value="icici">ICICI</option>
    </select>
    {bankName && (
  <div>
    <input type="file" ref={fileInputRef} onChange={handleFileUpload} />
    {jsonData && (
      <div>
        <h2>Extracted Data:</h2>
        <table style={{ borderCollapse: 'collapse', border: '1px solid black' }}>
          <thead>
            <tr>
              {Object.keys(jsonData[0]).map((key, index) => (
                <th key={index} style={{ border: '1px solid black', padding: '8px' }}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {jsonData.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((value, index) => (
                  <td key={index} style={{ border: '1px solid black', padding: '8px' }}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
)}

  </div>
);
};

export default ExcelUploader;
