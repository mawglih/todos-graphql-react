import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { SIGNIN_USER } from '../../queries';
import Error from '../Error';
import Spinner from '../Spinner';

const INITIAL_STATE = {
  username: '',
  password: '',
};

class Signin extends Component {
  state = {...INITIAL_STATE};

  clearState = () => {
    this.setState({...INITIAL_STATE});
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name] : value });
  };

  handleSubmit = (event, signinUser) => {
    event.preventDefault();
    signinUser().then(async ({ data }) => {
      localStorage.setItem('token', data.signinUser.token);
      await this.props.refetch();
      this.clearState();
      this.props.history.push('/');
    });
    
  };

  validateForm = () => {
    const{
      username,
      password,
    } = this.state;
    const isInvalid = !username || !password
    return isInvalid;
  }

  render() {
    const{
      username,
      password,
    } = this.state;

    return (
      <div className="App">
        <h2>Signin</h2>
        <Mutation 
          mutation={SIGNIN_USER}
          variables={{
            username,
            password,
          }}
        >
          {(signinUser, { data, loading, error }) => {
            if(loading) return <Spinner />
            if(error) return <div>Error... {error}</div>
            return (
              <form
                onSubmit={event => this.handleSubmit(event, signinUser)}
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
            name="password"
            type="password"
            placeholder="Your password"
            onChange={this.handleChange}
            value={password}
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

export default withRouter(Signin);
