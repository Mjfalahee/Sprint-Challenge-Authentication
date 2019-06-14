import React from 'react';
import axios from 'axios';



const token = localStorage.getItem('token');

//this HOF grabs a token from localstorage. If it exists it renders the targeted component with props, otherwise it renders notLoggedIn.

export default function (Component) {
    return class Authenticated extends React.Component {
        render() {
            const notLoggedIn = <div> Please Login </div>;

            return <> {token ? <Component {...this.props} /> : notLoggedIn} </>;
        }
    };
}