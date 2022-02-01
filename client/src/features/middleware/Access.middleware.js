import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { clear, checkUser } from './Middleware.slice';
import { useDispatch, useSelector } from "react-redux";


const PrivateRoute = ({ component: Component, ...rest }) => {


    const dispatch = useDispatch();
    const { loading, error, allow, checked, user } = useSelector(state => state.accessCheck)

    useEffect(() => {
        dispatch(clear());
        dispatch(checkUser());

    }, [])

    useEffect(() => {
        return () => {
            dispatch(clear());
        }
    }, [])

    return (
        checked &&
        <Route {...rest} render={props => (
            (allow && user) ?
                <Component {...props} />
                :
                <Redirect to="/login" />
        )} />


    );
};

export default PrivateRoute;