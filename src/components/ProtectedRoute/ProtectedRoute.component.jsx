import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from 'react-redux';
import { RoutePropio } from "../RoutePropio/RoutePropio.component";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
    const isLogged = useSelector(state => state.isLogged);
    return (
        <RoutePropio
            {...rest}
            render={ props => {
                if(isLogged) return <Component {...props} />;
                else return <Redirect to='/' />;
            }}
        />
    );
};