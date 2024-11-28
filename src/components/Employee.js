// src/components/Employee.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../css/EmployeeList.css';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate(); // To navigate after updating employee

  // Fetch all employees
  useEffect(() => {
    axios.get('https://one01450921-comp3123-assignment1.onrender.com/api/v1/emp/employees/')
      .then((response) => {
        setEmployees(response.data);
        setFilteredEmployees(response.data); // Initially, show all employees
        setLoading(false);
      })
      .catch((err) => {
        setError('Error fetching employee data');
        setLoading(false);
      });
  }, []);

  // Search functionality based on department or text match
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchText(query);

    if (query === '') {
      setFilteredEmployees(employees); // Show all employees if search is cleared
    } else {
      axios.get(`https://one01450921-comp3123-assignment1.onrender.com/api/v1/emp/employees/department/${query}`)
        .then((response) => {
          setFilteredEmployees(response.data); // Show filtered employees based on search
        })
        .catch(() => {
          setError('Error fetching search results');
        });
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      axios.delete(`https://one01450921-comp3123-assignment1.onrender.com/api/v1/emp/employees/${id}`)
        .then(() => {
          setEmployees(employees.filter((employee) => employee._id !== id));
          setFilteredEmployees(filteredEmployees.filter((employee) => employee._id !== id)); // Update the filtered list
        })
        .catch(() => {
          setError('Error deleting employee');
        });
    }
  };

  const handleUpdate = (employeeId) => {
    axios.get(`https://one01450921-comp3123-assignment1.onrender.com/api/v1/emp/employees/${employeeId}`)
      .then((response) => {
        const employee = response.data;
        navigate('/add-employee', { state: { employee } });
      })
      .catch((err) => {
        setError('Error fetching employee data for update');
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="employee-list">
      <div className="header">
        <Link to="/add-employee" className="add-employee-btn">Add Employee</Link>
        <h1>Employee List</h1>
        <input
          type="text"
          placeholder="Search by Department or position"
          value={searchText}
          onChange={handleSearch}
          className="search-input"
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.first_name}</td>
              <td>{employee.last_name}</td>
              <td>{employee.email}</td>
              <td>
                <button className="update-btn" onClick={() => handleUpdate(employee._id)}>Update</button>
                <Link to={`/view-employee/${employee._id}`} className="view-btn">View</Link>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(employee._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
