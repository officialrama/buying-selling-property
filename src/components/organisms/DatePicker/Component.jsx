import React, { useState, useEffect, useRef } from 'react';

const DatePicker = ({ onChange, initialValue }) => {
    const [selectedYear, setSelectedYear] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [selectedDay, setSelectedDay] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const datepickerRef = useRef(null);

    useEffect(() => {
      const handleOutsideClick = (event) => {
        if (datepickerRef.current && !datepickerRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      };
  
      document.addEventListener('mousedown', handleOutsideClick);
  
      return () => {
        document.removeEventListener('mousedown', handleOutsideClick);
      };
    }, []);
  
    useEffect(() => {
      if (initialValue) {
        const date = new Date(initialValue);
        setSelectedYear(date.getFullYear());
        setSelectedMonth(date.getMonth());
        setSelectedDay(date.getDate());
      }
    }, [initialValue]);
  
    const toggleDatePicker = () => {
      setIsOpen(!isOpen);
    };
  
    const handleDateSelection = () => {
      if (selectedYear && selectedMonth !== null && selectedDay) {
        const selectedDate = new Date(selectedYear, selectedMonth, selectedDay);
        onChange(selectedDate);
      }
      toggleDatePicker();
    };

  const renderYears = () => {
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 17;
    const years = [];
    for (let year = startYear; year >= 1945; year--) {
      years.push(year);
    }

    return (
      <select
        value={selectedYear || ''}
        onChange={(e) => setSelectedYear(e.target.value)}
        className="border border-gray-300 p-1 rounded"
      >
        <option value="">Pilih Tahun</option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    );
  };

  const renderMonths = () => {
    const months = [
        'Januari',
        'Februari',
        'Maret',
        'April',
        'Mei',
        'Juni',
        'Juli',
        'Agustus',
        'September',
        'Oktober',
        'November',
        'Desember',
    ];

    return (
      <select
        value={selectedMonth || ''}
        onChange={(e) => setSelectedMonth(e.target.value)}
        className="border border-gray-300 p-1 rounded"
      >
        <option value="">Pilih Bulan</option>
        {months.map((month, index) => (
          <option key={index} value={index}>
            {month}
          </option>
        ))}
      </select>
    );
  };

  const renderDays = () => {
    const days = [];
    for (let day = 1; day <= 31; day++) {
      days.push(day);
    }

    return (
      <select
        value={selectedDay || ''}
        onChange={(e) => setSelectedDay(e.target.value)}
        className="border border-gray-300 p-1 rounded"
      >
        <option value="">Pilih Hari</option>
        {days.map((day) => (
          <option key={day} value={day}>
            {day}
          </option>
        ))}
      </select>
    );
  };

  const renderSelectedMonth = () => {
    const months = [
      'Januari',
      'Februari',
      'Maret',
      'April',
      'Mei',
      'Juni',
      'Juli',
      'Agustus',
      'September',
      'Oktober',
      'November',
      'Desember',
    ];
  
    if (selectedMonth !== null) {
      return months[selectedMonth];
    }
  
    return 'Select Month';
  };
  
  return (
    <div ref={datepickerRef} className="relative w-full">
      <div className="inline-block relative w-full">
        <div
          className="cursor-pointer border border-gray-300 px-3 py-2 rounded-lg"
          onClick={toggleDatePicker}
        >
          {selectedYear && selectedMonth !== null && selectedDay
            ? `${selectedDay} ${renderSelectedMonth()} ${selectedYear}`
            : 'Pilih Tanggal Lahir'}
        </div>
        {isOpen && (
          <div className="absolute mt-2 rounded-lg bg-white shadow-md z-10 p-4 flex gap-4">
            {renderYears()}
            {renderMonths()}
            {renderDays()}
            <button
              onClick={handleDateSelection}
              className="px-3 py-1 bg-blue-500 text-white rounded"
            >
              Pilih
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DatePicker;
