import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { ADD_TODO, GET_ALL_TODOS } from '../../queries';
import AuthGuard from '../AuthCuard';
import Error from '../Error';
import { WEB_LINKS, CATEGORY, } from '../../Constants';
import Spinner from '../Spinner';
import './TodoList.css';

const INITIAL_STATE = {
  name: '',
  imageUrl: 'https://s3.amazonaws.com/photo-links/sosna.png',
  category: 'Cleaning',
  description: '',
  due: '',
  username: '',
};

export class addTodo extends Component {
  
  state = {...INITIAL_STATE};

  clearState = () => {
    this.setState({...INITIAL_STATE});
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name] : value,
    });
  };
  
  validateForm = () => {
    const {
      name,
      imageUrl,
      category,
      description,
      due,
    } = this.state;
    const isInvalid = !name || !category || !description || !due || !imageUrl;
    return isInvalid;
  }
  handleSubmit = (event, addTodo) => {
    event.preventDefault();
    addTodo().then(({ data }) => {
      console.log(data);
    });
    this.clearState();
    this.props.history.push('/');
  };
  // updateCache = (cache, {data: { addTodo }}) => {
  //   const newData = cache.readQuery({ query: GET_ALL_TODOS });
  //   console.log('cache :', cache, addTodo, newData);
  //   cache.writeQuery({
  //     query: GET_ALL_TODOS,
  //     data: {
  //       getAllTodos: [...newData.getAllTodos, addTodo],
  //     },
  //   });
  // };

  componentDidMount() {
    this.setState({
      username: this.props.session.getCurrentUser.username
    });
  }

  render() {
    const {
      name,
      category,
      imageUrl,
      description,
      due,
      username,
    } = this.state;
    return(
      <Mutation
        mutation={ADD_TODO}
        variables={{
          name,
          category,
          imageUrl,
          description,
          due,
          username,
          }}
        refetchQueries={() => [
          { query: GET_ALL_TODOS }
        ]}
        >
        {(addTodo, { data, loading, error }) => {
          if(loading) return <Spinner />
          if(error) return <div>Error {error}</div>
          return(
            <div className="App">
              <h2>Add todo</h2>
              <form
                className="form"
                onSubmit={event => this.handleSubmit(event, addTodo)}
              >
                <input
                  type="text"
                  name="name"
                  placeholder="New Todo name"
                  onChange={this.handleChange}
                  value={name}
                />
                <label htmlFor="imageUrl">Select your background</label>
                <select
                  name="imageUrl"
                  onChange={this.handleChange}
                  value={imageUrl}
                >
                  {WEB_LINKS.map(item => {
                    return <option value={item.value} key={item.name}>{item.name}</option>
                  })}
                </select>
                <select
                  name="category"
                  onChange={this.handleChange}
                  value={category}
                >
                  {CATEGORY.map((item, index) => {
                    return <option value={item} key={index}>{item}</option>
                  })}
                </select>
                <textarea
                  name="description"
                  placeholder="Add description"
                  onChange={this.handleChange}
                  value={description}
                />
                <input
                  type="date"
                  name="due"
                  onChange={this.handleChange}
                  value={due}
                />
                <button
                  type="submit"
                  disabled={loading || this.validateForm()}
                >
                  Submit
                </button>
                {error && <Error error={error} />}
              </form>
            </div>
          );
        }}      
      </Mutation>
    );
  }
}

export default AuthGuard(session => session && session.getCurrentUser)(
  withRouter(addTodo)
);