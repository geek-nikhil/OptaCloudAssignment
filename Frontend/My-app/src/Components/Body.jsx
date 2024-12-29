import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Address from './Address';
import AddressSearch from './manually';
import UserInfo from './UserInfo';

function Body() {
  return (
    <Router>
      <Switch>
        <Route path="/address" component={Address} />
        <Route path="/address-search" component={AddressSearch} />
        <Route path="/user-info" component={UserInfo} />
      </Switch>
    </Router>
  );
}

export default Body;
