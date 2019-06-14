import React from 'react';
import axios from 'axios';

class SignUp extends React.Component {
    state ={
        username: '',
        password: ''
    }

    handleChanges = e => {
        const { id, value } = e.target;
        this.setState({ [id]: value });
    }

    handleSubmit = e => {
        e.preventDefault();
        const end = 'http://localhost:3300/api/register';
        axios
            .post(end, this.state)
            .then(res => {
                console.log('Register response', res.data)
                this.props.history.push('/login')
            })
            .catch(error => {
                console.log(error.response);
            })
    }

    render() {
        return(
            <div>
                <h3> Sign Up </h3>
                <form onSubmit={this.handleSubmit}>
                    <input
                        className='username'
                        placeholder="username" 
                        type ='text'
                        id='username'
                        onChange={this.handleChanges}
                        value={this.state.username}
                    />
                    <input
                        className='password'
                        placeholder="password" 
                        type ='password'
                        id='password'
                        onChange={this.handleChanges}
                        value={this.state.password}
                    />
                    <button type='submit'> Submit </button>
                </form>
            </div>
        )
    }
}

export default SignUp;