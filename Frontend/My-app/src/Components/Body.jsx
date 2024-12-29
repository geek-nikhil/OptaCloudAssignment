import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // Update import
import Address from './Address';
import AddressSearch from './manually';
import UserInfo from './UserInfo';
import Signup from './Signup';

function Body() {
  return (
    <Router>
      <Routes> {/* Replace Switch with Routes */}
        <Route path="/address" element={<Address />} /> {/* Use element instead of component */}
        <Route path="/address-search" element={<AddressSearch />} />
        <Route path="/user-info" element={<UserInfo />} />
        <Route path="/" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default Body;
