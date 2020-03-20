import React, { useState } from 'react';
import './App.css';
import Seeds from './Seeds';
import 'antd/dist/antd.css';
import { BrowserRouter as Router, Switch, Route, useParams } from 'react-router-dom';
import { Button, Layout } from 'antd';
import MyMenu from './MyMenu';

const { Header, Footer, Sider, Content } = Layout;

function SecurityLayout() {
  return <></>;
}

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => {
    setLoggedIn(true);
  };

  const logOut = () => {
    setLoggedIn(false);
  };

  return (
    <Router>
      <Layout>
        <Header>{loggedIn && <Button onClick={logOut}>LOG OUT</Button>}</Header>
        <Content>
          {loggedIn ? (
            <Layout>
              <Sider breakpoint="md" collapsedWidth="0">
                <MyMenu />
              </Sider>
              <Content>
                <Switch>
                  <Route path="/:username/seeds">
                    <Seeds />
                  </Route>
                  <Route path="/profile">
                    <div>Profile</div>
                  </Route>
                  <Route path="/">
                    <div>HOME</div>
                  </Route>
                </Switch>
              </Content>
            </Layout>
          ) : (
            <Layout>
              <Content>
                <Button type="primary" onClick={logIn}>LOG IN!</Button>
              </Content>
            </Layout>
          )}
        </Content>
        <Footer>footer</Footer>
      </Layout>
    </Router>
  );
}

export default App;
