import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../css/ViewEmployee.css'; // Add your custom CSS if necessary

const ViewEmployee = () => {
  const { id } = useParams(); // Get employee ID from URL
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch employee data by ID when the component mounts
  useEffect(() => {
    axios.get(`https://one01450921-comp3123-assignment1.onrender.com/api/v1/emp/employees/${id}`)
      .then((response) => {
        setEmployee(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Error fetching employee details');
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!employee) {
    return <div>No employee found</div>;
  }

  return (
    <div className="view-employee-container">
      <h2>View Employee Details</h2>
      <div className="employee-details-box">
        <p><strong>First Name:</strong> {employee.first_name}</p>
        <p><strong>Last Name:</strong> {employee.last_name}</p>
        <p><strong>Email:</strong> {employee.email}</p>
        <p><strong>Position:</strong> {employee.position}</p>
        <p><strong>Salary:</strong> {employee.salary}</p>
        <p><strong>Date of Joining:</strong> {new Date(employee.date_of_joining).toLocaleDateString()}</p>
        <p><strong>Department:</strong> {employee.department}</p>
      </div>
      <button onClick={() => navigate('/employee')} className="back-btn">Back to Employee List</button>
    </div>
  );
};

export default ViewEmployee;
