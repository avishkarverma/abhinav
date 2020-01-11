import React, { Fragment } from 'react';
import './header.scss';
import {
    withRouter, Link
} from 'react-router-dom'; 

class Header extends React.Component {

    logOut = () => {
        sessionStorage.removeItem('token');
        this.props.history.push('/login');
        this.props.logoutClicked();

    }
    render() {
        return (
            <Fragment>
                <section className="header">
                    <Link to={'/logs-page'}>  <h2> Pharamacy </h2></Link>
                </section>
                {this.props.isItLoggedIn &&
                    <section className="subHeader">
                        {/* <a href onClick={this.logOut} >Log Out </a> */}

                    </section>
                }
            </Fragment>
        )
    }
}

export default withRouter(Header)