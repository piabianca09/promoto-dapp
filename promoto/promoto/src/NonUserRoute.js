import React, { Component } from 'react'
import { Redirect, Route } from 'react-router-dom'

const NonUserRoute = (props) => {
    const user = props.user
    return (
        <Route path={`${props.path}`} component={() => {
            if(user) {
                return <Redirect to="/"/>
            } else  {
                return <Route {...props}></Route>
            }
        }}/>
    )
}
 
export default NonUserRoute;