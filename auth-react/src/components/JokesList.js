import React from 'react';
import axios from 'axios';

import '../auth/addInterceptors';
import withAuth from '../auth/withAuth';

import './JokesList.scss';


class JokesList extends React.Component {
    state = {
        jokes: []
    };

    componentDidMount() {
        axios 
            .get('http://localhost:3300/api/jokes')
            .then(res => {
                console.log('Jokes', res.data);
                this.setState(() => ({jokes: res.data}))
            })
            .catch(error => {
                console.log('Jokes CDM error', error)
            })
    }

    render() {
        return(
            <div className="jokes-wrapper">
                <ol> 
                    {this.state.jokes.map(joke => {
                        return <li key={joke.id}> {joke.joke}</li>
                    })}
                </ol>
            </div>
        );
    }
}

export default withAuth(JokesList);