import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Login from './features/auth/Login.container';
import CarExplorer from './features/car/CarExplorer.container';
import PrivateRoute from './features/middleware/Access.middleware';

function App() {
  return (
    <Router >
      <>

        <Switch>

          <Route path="/" exact >
            <Redirect to='/login' />
          </Route>

          <Route path="/login" component={Login} exact/>
          <PrivateRoute component={CarExplorer}  path="/car" />

        </Switch>

      </>
    </Router>
  );
}

export default App;
