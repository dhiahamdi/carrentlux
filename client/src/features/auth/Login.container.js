import React , {useState , useEffect} from 'react';
import LoginForm from './Login.form';
import {clear , login} from './Login.slice';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const LoginContainer = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const { loading, error, data , auth_success } = useSelector(state => state.auth);

    const doLogin = (email , password) => {
            dispatch(login(email , password))
            .unwrap()
            .then(data => {
                console.log(data)
                if (data.success) {
                    history.push('/car')
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(()=>{
        return () => {
            dispatch(clear());
        }

    },[])

    useEffect(()=>{
        if(auth_success == true){

        }

    },[auth_success])
    return (
        <>
            <LoginForm onDataSubmit={doLogin} loading={loading} error={error} />
        </>
    );
};

export default LoginContainer;