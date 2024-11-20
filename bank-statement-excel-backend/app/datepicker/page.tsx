"use client"

import { useState } from 'react';
import Flatpickr from 'react-flatpickr'; // Check this line for typos

import 'flatpickr/dist/themes/material_green.css';

const DatePickerExample = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
    // You can perform any additional logic here, such as updating state or sending data to a server
  };

  return (
    <div>
      <Flatpickr
        value={selectedDate}
        onChange={handleDateChange}
        options={{
          dateFormat: 'Y-m-d',
          altInput: true,
          altFormat: 'F j, Y',
          theme: 'material_green',
        }}
      />
    </div>
  );
};

export default DatePickerExample;
