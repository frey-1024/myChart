import React,{Component} from 'react';
import {BrowserRouter as Router,Route,Redirect, Link} from 'react-router-dom'

export const RedirectWithStatus=({to,status})=>{
    if(status){
        return <Redirect to={to}/>
    }
    return <div></div>;
};