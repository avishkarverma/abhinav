import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export const PrivateRoute = (props) => {
    const {component: Component, ...rest} = props;
    return (
        <Route
            {...rest}
            render={(routeProps) =>
                sessionStorage.getItem('token') || true ? (
                    <Component {...routeProps} />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: {from: routeProps.location}
                        }}
                    />
                )
            }
        />
    );
}

