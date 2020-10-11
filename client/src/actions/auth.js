import axios from 'axios'
import {setAlert} from './alert';
import{ USER_LOADED, AUTH_ERROR,LOGIN_SUCCESS,LOGIN_FAIL,LOGOUT,REGISTER_SUCCESS,REGISTER_FAIL, LOADING,OLOGIN_SUCCESS} from './types';

import setAuthToken from '../utils/setAuthToken';
import { ExclamationCircle } from 'react-bootstrap-icons';


//LOAD user

export const loaduser=()=>async dispatch=>{

    if(localStorage.token){
        setAuthToken(localStorage.token);
    }

    try{
        const res = await axios.get('/api/auth');

        dispatch({
            type:USER_LOADED,
            payload: res.data
        });
    }catch(err){
        dispatch({
            type:AUTH_ERROR
        })
    }
}

//login user

export const login = ({email,password}) =>async dispatch=>{

    dispatch({type:LOADING})
    
    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }

    const body = JSON.stringify({email,password});

    try{

        const res = await axios.post('/api/auth',body,config);
        //console.log(res.data);
        dispatch({
            type:LOGIN_SUCCESS,
            payload:res.data
        });

        dispatch(loaduser());

    }catch(err){
        //console.error(err.response.data);

        const errors = err.response.data.errors;

        if(errors){
            errors.forEach(error=> dispatch(setAlert(error.msg,"danger-bg")));
        }
        dispatch({
            type:LOGIN_FAIL,
        });
    }
}


//register new user

export const register = (formData) =>async dispatch=>{
    
    dispatch({type:LOADING})
    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }

    const body = JSON.stringify(formData);

    try{

        const res = await axios.post('/api/users',body,config);
        //console.log(res.data.msg);
        dispatch({
            type:REGISTER_SUCCESS,
            payload:res.data
        });

        dispatch(loaduser());

    }catch(err){
        //console.error(err.response.data);

        if(err.response.data.errors){
        const errors = err.response.data.errors;

        if(errors){
            errors.forEach(error=> dispatch(setAlert(error.msg,"danger-bg")));
        }
        }
        dispatch({
            type:REGISTER_FAIL,  
        });
        
    }
}


//LOGOUT

export const logout = () =>dispatch =>{
    dispatch({type:LOGOUT});
    
}

//oauth sign in

export const oauthsignin = (email) =>dispatch =>{
    console.log(email)
    dispatch({type:OLOGIN_SUCCESS});
    
}