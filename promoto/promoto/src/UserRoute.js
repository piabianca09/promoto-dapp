import React, { Component } from 'react'
import { Redirect, Route } from 'react-router-dom'

const UserRoute = (props) => {
    const user = props.user
    if(user) {
        return <Route {...props}></Route>
    } else  {
        return <Redirect to="/login"/>
    }
}
 
export default UserRoute;