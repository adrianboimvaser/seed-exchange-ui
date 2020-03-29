import React, { Component, useEffect, useState } from 'react';
import './App.css';
import Seeds from './Seeds';
import 'antd/dist/antd.css';
import { BrowserRouter as Router, Switch, Route, useParams } from 'react-router-dom';
import { Button, Layout } from 'antd';
import MyMenu from './MyMenu';
import GoogleMapReact from 'google-map-react';
import Place from './Place';
import axios from 'axios';

const { Header, Footer, Sider, Content } = Layout;

function SecurityLayout() {
  return <></>;
}

function App() {
  new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    });
  })
    .then((location: Position) => console.log('location', location.coords))
    .catch(error => console.log('error', error));

  const [loggedIn, setLoggedIn] = useState(false);
  const [me, setMe] = useState(null);

  useEffect(() => {
    window.fbPromise.then(() => {
      console.log('FB.init', process.env.REACT_APP_FACEBOOK_APP_ID);

      FB.init({
        appId: process.env.REACT_APP_FACEBOOK_APP_ID,
        cookie: true,
        xfbml: true,
        version: 'v6.0'
      });
      FB.getLoginStatus(response => {
        console.log('FB.getLoginStatus', response);
        if (response.status === 'connected') {
          axios
            .post(process.env.REACT_APP_API_URL + '/auth/login', { accessToken: response.authResponse.accessToken })
            .then(function(response) {
              // handle success
              console.log(response);
            })
            .catch(function(error) {
              // handle error
              console.log(error);
            })
            .then(function() {
              // always executed
            });
          setLoggedIn(true);
        }
      });
    });
  }, []);

  const logIn = () => {
    FB.login(response => {
      console.log('FB.login', response);
      if (response.status === 'connected') {
        setLoggedIn(true);
        FB.api('/me', { fields: 'id, name, email, picture' }, function(me: any) {
          if (me) {
            setMe(me);
          }
        });
      }
    });
  };

  const logOut = () => {
    FB.logout(response => {
      if (response.status === 'unknown') {
        setLoggedIn(false);
      }
    });
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
        <Header>
          {loggedIn && <Button onClick={logOut}>LOG OUT</Button>}
          {me && (
            <>
              <span>{me.name}</span>
              <img src={me.picture.data.url} />
            </>
          )}
        </Header>
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
