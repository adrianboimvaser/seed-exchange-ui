import React from 'react';
import './App.css';
import Seeds from './Seeds';
import 'antd/dist/antd.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';
import MyMenu from './MyMenu';

const { Sider } = Layout;

function App() {
  return (
    <Router>
      <Layout>
        <Sider>
          <MyMenu />
        </Sider>
        <Switch>
          <Route path="/seeds">
            <Seeds />
          </Route>
          <Route path="/profile">
            <div>Profile</div>
          </Route>
          <Route path="/">
            <div>HOME</div>
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
