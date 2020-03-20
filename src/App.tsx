import React, { Component, useState } from 'react';
import './App.css';
import Seeds from './Seeds';
import 'antd/dist/antd.css';
import { BrowserRouter as Router, Switch, Route, useParams } from 'react-router-dom';
import { Button, Layout } from 'antd';
import MyMenu from './MyMenu';
import GoogleMapReact from 'google-map-react';
import Place from './Place';

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

  const handleApiLoaded = (map: any, maps: any) => {};

  const center = {
    lat: -31.7337458,
    lng: -60.4776291
  };

  const onChange = (center, zoom, bounds, marginBounds) => {
    console.log('onBoundsChange', center, zoom, bounds, marginBounds);
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
                    <div style={{ width: 800, height: 400 }}>
                      <GoogleMapReact
                        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_KEY }}
                        defaultCenter={center}
                        defaultZoom={15}
                        yesIWantToUseGoogleMapApiInternals
                        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
                        onChange={onChange}
                      >
                        <Place lat={-31.7337458} lng={-60.4776291}>
                          HELLO
                        </Place>
                      </GoogleMapReact>
                    </div>
                  </Route>
                </Switch>
              </Content>
            </Layout>
          ) : (
            <Layout>
              <Content>
                <Button type="primary" onClick={logIn}>
                  LOG IN!
                </Button>
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
