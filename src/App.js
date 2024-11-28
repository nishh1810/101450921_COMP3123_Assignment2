// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Employee from './components/Employee';
import Home from './Home';
import AddEmployee from './components/AddEmployee';
import ViewEmployee from './components/ViewEmployee';

const App = () => {
  return (
    <Router>
      <Home /> {/* Use the Home component for the header and navigation */}
      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Login />} /> 
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/employee" element={<Employee />} />
          <Route path="/add-employee" element={<AddEmployee />} />
          <Route path="/view-employee/:id" element={<ViewEmployee />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
