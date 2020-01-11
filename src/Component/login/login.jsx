import React from 'react';
import './login.scss';
import {
    withRouter
} from 'react-router-dom';
import ApiServices from '../../Services/Api-service';
import { MDBCard, MDBCardBody, MDBCardHeader, MDBBtn, MDBInput } from "mdbreact";
import FormValidator from '../../Utility/FormValidator';
var Loader = require('react-loader');

class Login extends React.Component {
    constructor() {
        super();
        this.validator = new FormValidator([
            {
                field: 'userName',
                method: 'isEmpty',
                validWhen: false,
                message: 'User Name is required.'
            },
            // {
            //   field: 'phone', 
            //   method: 'matches',
            //   args: [/^\(?\d\d\d\)? ?\d\d\d-?\d\d\d\d$/], // args is an optional array of arguements that will be passed to the validation method
            //   validWhen: true, 
            //   message: 'That is not a valid phone number.'
            // },
            {
                field: 'password',
                method: 'isEmpty',
                validWhen: false,
                message: 'Password is required.'
            }
        ]);
        this.state = {
            userName: "",
            password: "",
            validation: this.validator.valid(),
            inavalidUserNameorPassword: false,
        }
        this.submitted = false;
        this.setState({loaded: false });

    }
    getInitialState= function () {
        
        return { loaded: false };
      }

    componentDidMount() {
        if (sessionStorage.getItem('token')) {
            this.props.history.push('/logs-page');
            this.props.loggedInCalled();
        }
        this.setState({loaded: true });
    }

    handleUserName = (event) => {
        this.setState({ 'userName': event.target.value });
    }
    handlePassword = (event) => {
        this.setState({ 'password': event.target.value });
    }
    handleEnter = (event) => {
       if(event.keyCode === 13) {
           this.authenticateLogin();
       }
    }
    authenticateLogin = () => {
        this.setState({loaded: false });

        const validation = this.validator.validate(this.state);
        this.setState({ validation });
        this.submitted = true;

        if (validation.isValid) {
            // handle actual form submission here
            let loginObj = {
                username: this.state.userName,
                password: this.state.password
            }
            ApiServices.authenticateLogin(loginObj).subscribe(response => {
                response = response.data;
                if (response) {
                    this.setState({loaded: true });
                    this.setState({ 'inavalidUserNameorPassword': true })
                    sessionStorage.setItem('token', response.auth_token)
                    this.props.history.push('/logs-page');
                    this.props.loggedInCalled();
                } else {
                    this.setState({loaded: true });
                    this.setState({ 'inavalidUserNameorPassword': true })
                }
            }, err => {
                this.setState({loaded: true });
                this.setState({ 'inavalidUserNameorPassword': true });
            })
        }
    }


    render() {

        let validation = this.submitted ?                         // if the form has been submitted at least once
            this.validator.validate(this.state) :   // then check validity every time we render
            this.state.validation                   // otherwise just use what's in state
        return (
            
            <section className="login-container">
                <MDBCard >
                <Loader loaded={this.state.loaded}  className= "custom-loader">
                </Loader>
                    <MDBCardHeader tag="h3">Login</MDBCardHeader>
                    <MDBCardBody>
                        <div className={validation.userName.isInvalid ? 'has-error' : ''}>
                            <MDBInput label="Username" onChange={this.handleUserName} icon="user" required />
                            <span className="help-block">{validation.userName.message}</span>
                        </div>
                        <div className={validation.password.isInvalid ? 'has-error' : ''}>
                            <MDBInput type="password" label="Password" onKeyUp={this.handleEnter} onChange={this.handlePassword} icon="lock" required />
                            <span className="help-block">{validation.password.message}</span>
                        </div>
                        <MDBBtn color="primary" onClick={this.authenticateLogin}>Login</MDBBtn>
                        {this.state.inavalidUserNameorPassword && <div className='has-error'>
                            <span className="help-block">Invalid User Name or Password</span>
                        </div>
                        
                        }
                    </MDBCardBody>
                </MDBCard>

            </section>
        )
    }
}
export default withRouter(Login);