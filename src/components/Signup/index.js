import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { SIGNUP_USER } from '../../queries';
import Error from '../Error';
import Spinner from '../Spinner';

const INITIAL_STATE = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

class Signup extends Component {
  state = {...INITIAL_STATE};

  clearState = () => {
    this.setState({...INITIAL_STATE});
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name] : value });
  };

  handleSubmit = (event, signupUser) => {
    event.preventDefault();
    signupUser().then(async ({ data }) => {
      localStorage.setItem('token', data.signupUser.token);
      await this.props.refetch();
      this.clearState();
      this.props.history.push('/');
    });
  };

  validateForm = () => {
    const{
      username,
      email,
      password,
      confirmPassword,
    } = this.state;
    const isInvalid = !username || !email || !password || password !== confirmPassword;
    return isInvalid;
  }

  render() {
    const{
      username,
      email,
      password,
      confirmPassword,
    } = this.state;

    return (
      <div className="App">
        <h2>Signup</h2>
        <Mutation 
          mutation={SIGNUP_USER}
          variables={{
            username,
            email,
            password,
          }}
        >
          {(signupUser, { data, loading, error }) => {
            if(loading) return <Spinner />
            if(error) return <div>Error {error}</div>
            return (
            <form
              onSubmit={event => this.handleSubmit(event, signupUser)}
              className="signForm"
            >
              <input
                name="username"
                type="text"
                placeholder="username"
                onChange={this.handleChange}
                value={username}
              />
              <input
                name="email"
                type="email"
                placeholder="Email address"
                onChange={this.handleChange}
                value={email}
              />
              <input
                name="password"
                type="password"
                placeholder="Your password"
                onChange={this.handleChange}
                value={password}
              />
              <input
                name="confirmPassword"
                type="password"
                placeholder="Confirm Your password"
                onChange={this.handleChange}
                value={confirmPassword}
              />
              <button
                type="submit"
                disabled={loading || this.validateForm()}
              >
                Submit
              </button>
              {error && <Error error={error} />}
            </form>
            )
          }}
        </Mutation>
      </div>
    );
  }
}

export default withRouter(Signup);
