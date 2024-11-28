import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useLocation to receive passed data
import '../css/AddEmployee.css'; // Import any specific styles if needed

const AddEmployee = () => {
  const { state } = useLocation(); // Access the state passed by the navigate function
  const [newEmployee, setNewEmployee] = useState({
    first_name: '',
    last_name: '',
    email: '',
    position: '',
    salary: '',
    date_of_joining: '',
    department: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate(); // Use navigate to programmatically change routes

  // If the employee data is passed, populate the form for updating
  useEffect(() => {
    if (state && state.employee) {
      console.log("Employee Data:", state.employee); // Log the data to check format
      // If date_of_joining is not in 'YYYY-MM-DD' format, convert it
      const formattedDate = state.employee.date_of_joining
        ? new Date(state.employee.date_of_joining).toISOString().split('T')[0] // Convert to YYYY-MM-DD format
        : '';
      setNewEmployee({
        ...state.employee,
        date_of_joining: formattedDate // Set formatted date
      });
    }
  }, [state]);

  // Handle input field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({ ...newEmployee, [name]: value });
  };

  // Handle form submission for both adding and updating
  const handleSubmit = (e) => {
    e.preventDefault();

    const employeeData = {
      first_name: newEmployee.first_name,
      last_name: newEmployee.last_name,
      email: newEmployee.email,
      position: newEmployee.position,
      salary: parseFloat(newEmployee.salary), // Ensure salary is a number
      date_of_joining: newEmployee.date_of_joining, // Ensure this is in correct format
      department: newEmployee.department
    };

    const url = state && state.employee ? 
      `https://one01450921-comp3123-assignment1.onrender.com/api/v1/emp/employees/${state.employee._id}` : 
      'https://one01450921-comp3123-assignment1.onrender.com/api/v1/emp/employees';

    const method = state && state.employee ? 'put' : 'post'; // Use PUT for update, POST for create

    // Sending the request (either POST or PUT)
    axios({ method, url, data: employeeData })
      .then((response) => {
        if (response.data.message === "Employee created successfully." || response.data.message === "Employee details updated successfully.") {
          navigate('/employee'); // Redirect to the employee list page after success
        }
      })
      .catch((err) => {
        setError('Error saving employee: ' + err.message); // Error handling
      });
  };

  // Handle delete request
  const handleDelete = () => {
    if (state && state.employee) {
      const url = `https://one01450921-comp3123-assignment1.onrender.com/api/v1/emp/employees/${state.employee._id}`;

      axios.delete(url)
        .then((response) => {
          if (response.data.message === "Employee deleted successfully.") {
            navigate('/employee'); // Redirect to employee list after successful deletion
          }
        })
        .catch((err) => {
          setError('Error deleting employee: ' + err.message); // Error handling
        });
    }
  };

  return (
    <div className="add-employee-form">
      <h2>{state && state.employee ? 'Update Employee' : 'Add New Employee'}</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            name="first_name"
            value={newEmployee.first_name}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            name="last_name"
            value={newEmployee.last_name}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={newEmployee.email}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Position:
          <input
            type="text"
            name="position"
            value={newEmployee.position}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Salary:
          <input
            type="number"
            name="salary"
            value={newEmployee.salary}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Date of Joining:
          <input
            type="date"
            name="date_of_joining"
            value={newEmployee.date_of_joining}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Department:
          <input
            type="text"
            name="department"
            value={newEmployee.department}
            onChange={handleInputChange}
            required
          />
        </label>
        <button type="submit" className="save-btn">Save</button>
        {/* Show Delete button only if updating an existing employee */}
        {state && state.employee && (
          <button type="button" className="delete-btn" onClick={handleDelete}>
            Delete Employee
          </button>
        )}
      </form>
    </div>
  );
};

export default AddEmployee;
