import React, { useState, useEffect } from "react";
import Main from "../Main/Main";
import AddLeaveForm from "./AddLeaveForm"; // You’ll create this like your AddEmployeeForm
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
const API_URL = import.meta.env.VITE_API_URL;

const Leave = () => {
  const [openAddForm, setOpenAddForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filteredData, setFilteredData] = useState([]);

  const fetchLeavesByDate = async (date) => {
    const formattedDate = date.toISOString().split("T")[0]; // YYYY-MM-DD
    try {
      const res = await fetch(`${API_URL}/api/leaves?date=${formattedDate}`);
      const data = await res.json();
      setFilteredData(data);
    } catch (err) {
      console.error("Error fetching leaves:", err);
    }
  };

  useEffect(() => {
    fetchLeavesByDate(selectedDate);
  }, [selectedDate]);

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      {/* Left side: Table */}
      <div style={{ flex: 2 }}>
        <Main
          title="Leaves"
          apiUrl={`${API_URL}/api/leaves?date=${selectedDate.toISOString().split("T")[0]}`}
          showStatusFilter={false}
          tableHeaders={["Name", "Date", "Reason", "Status"]}
          data={filteredData} // Pass filtered data directly
          onAddClick={() => setOpenAddForm(true)}
        />
      </div>

      {/* Right side: Calendar */}
      <div style={{ flex: 1 }}>
        <h3>Leave Calendar</h3>
        <Calendar value={selectedDate} onChange={setSelectedDate} />
      </div>

      {/* Add Leave Form Modal */}
      {openAddForm && (
        <AddLeaveForm
          onClose={() => setOpenAddForm(false)}
          onSave={() => fetchLeavesByDate(selectedDate)}
        />
      )}
    </div>
  );
};

export default Leave;

