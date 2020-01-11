import React from 'react';
import './App.scss';
import { HashRouter, Switch } from 'react-router-dom';
import LogPage from './Component/log-page/log-page';
import CRMForm from './Component/crm-form/crm-form';
import Header from './Component/header/header';
import Footer from './Component/footer/footer';
import { PrivateRoute } from './route/private-route';
import AppConfig from './AppConfig';
import { MDBContainer, MDBRow } from "mdbreact";

let url = "";
if (window.location.origin) {
  url = window.location.origin.toString();
  AppConfig.baseUrl = url;
} else {
  url = (window.location.protocol +
    "//" +
    window.location.hostname +
    (window.location.port ? ":" + window.location.port : "")
  ).toString();
  AppConfig.baseUrl = url;
}
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isItLoggedIn: sessionStorage.getItem('token') ? true : false,
    }
  }
  logOutHandler = () => {
    this.setState({ isItLoggedIn: false });
  }
  loggedInHandler = () => {
    this.setState({ isItLoggedIn: true });
  }

  render() {
    return (
      // <BrowserRouter basename="/dev-ssebvUI/" >
      <HashRouter>
        <MDBRow className="removeMargin"><Header isItLoggedIn={this.state.isItLoggedIn} logoutClicked={this.logOutHandler} /></MDBRow>
        <MDBContainer fluid className="middleSection">
          <MDBRow className="middleContainer">
            <Switch>
              {/* <Route exact path="/login" component={() => <Login loggedInCalled={this.loggedInHandler} />} /> */}
              <PrivateRoute exact path="/logs-page" component={LogPage} />
              <PrivateRoute exact path="/" component={LogPage} />
              <PrivateRoute exact path="/crm" component={CRMForm}  />
            </Switch>
          </MDBRow>
        </MDBContainer>
        <MDBRow  className="footer-block removeMargin"><Footer /></MDBRow>
        {/* </BrowserRouter>  */}
      </HashRouter>
    )
  }
}
