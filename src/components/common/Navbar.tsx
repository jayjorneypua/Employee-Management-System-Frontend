import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto">
        <Link to="/" className="text-white">Home</Link>
        <Link to="/departments" className="ml-4 text-white">Departments</Link>
        <Link to="/employees" className="ml-4 text-white">Employees</Link>
        <Link to="/positions" className="ml-4 text-white">Positions</Link>
      </div>
    </nav>
  );
};

export default Navbar;
