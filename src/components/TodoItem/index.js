import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Query, Mutation } from 'react-apollo';
import AuthGuard from '../AuthCuard';
import CompleteTodo from '../CompleteTodo';
import {
  WEB_LINKS,
  CATEGORY,
} from '../../Constants';
import {
  GET_TODO_ITEM,
  DELETE_TODO,
  GET_ALL_TODOS,
  GET_CURRENT_USER,
  UPDATE_USER_TODO,
} from '../../queries';
import Spinner from '../Spinner';
import './TodoItem.css';

class TodoItem extends Component {
  state = {
    status: false,
    name: '',
    imageUrl: '',
    category: '',
    description: '',
    completed: false,
  };

  handleDelete = deleteTodo => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete todo?"
    );
    if(confirmDelete) {
      deleteTodo().then(({ data }) =>  {
      });
    }
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name] : value,
    });
  };

  closeModal = () => {
    this.setState({
      status: false,
    });
  }; 

  handleSubmitChange = (event, updateUserTodo) => {
    event.preventDefault();
    updateUserTodo().then(({ data }) => {
    });
    this.closeModal();
  };

  loadTodo = (todo) => {
    this.setState({
      status: true,
      ...todo,
    });
  };


  render() {
    const {
      match,
      session,
    } = this.props;
    const { _id } = match.params;
    const {
      status,
      name,
      category,
      imageUrl,
      description,
      due,
      completed,
    } = this.state;
    return (
      <Query query={GET_TODO_ITEM} variables={{ _id }}>
        {({
          data,
          loading,
          error,
        }) => {
          if(loading) return <Spinner />
          if(error) return <div>Error: {error.message}</div>
          return (
            <div className="todo">
              <div className="todoContext">
                <h2>{data.getTodoItem.name }</h2>
                <img src={data.getTodoItem.imageUrl} alt={data.getTodoItem.name} />
                <p>{description}</p>
                <p>was created: {Date(data.getTodoItem.createdDate)}</p>
                <p>is due on {Date(data.getTodoItem.due)}</p>
                <p>owned by {session.getCurrentUser.username}</p>
                <div className="cardButtons">
                <Mutation
                  mutation={DELETE_TODO}
                  variables={{ _id:_id }}
                  refetchQueries={() => [
                    { query: GET_ALL_TODOS },
                    { query : GET_CURRENT_USER },
                    { query : GET_TODO_ITEM },
                  ]}
                >
                {deleteTodo => {
                  return (
                    <button
                      className="cardButton"
                      onClick={() => this.handleDelete(deleteTodo)}
                    >
                      Delete Todo
                    </button>
                  )
                }}             
                </Mutation>
                
                <CompleteTodo _id={_id} completed={completed} />
                <button
                  type="button"
                  onClick={() => this.loadTodo(data.getTodoItem)}
                  className="cardButton"
                >
                  Update Todo
                </button>
                </div>
                <Mutation
                  mutation={UPDATE_USER_TODO}
                  variables={{
                    _id,
                    name,
                    imageUrl,
                    category,
                    description,
                    due,
                  }}
                  refetchQueries={() => [
                    { query: GET_TODO_ITEM}
                  ]}
                >
                  {(updateUserTodo, { data, loading, error }) => {
                    if(loading) return <Spinner />
                    if(error) return <div>Error: {error.message}</div>
                    return (
                      <div className={status ? "modalOpen modal" :" modal" }>
                      <div className="modalInner">
                        <div className="modalContent">
                          <form
                            className="modalContentForm"
                            onSubmit={event => this.handleSubmitChange(event, updateUserTodo)}
                          >
                            <h4>Edit Todo</h4>
                            <input
                              type="text"
                              name="name"
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
                              onChange={this.handleChange}
                              value={description}
                            />
                            <input
                              type="date"
                              name="due"
                              onChange={this.handleChange}
                            />
                            <div className="modalButton">
                              <button  type="submit">Update</button>
                              <button onClick={this.closeModal}>Cancel</button>
                            </div>
                            
                          </form>
                        </div>
                      </div>
                    </div>
                    )}}
                </Mutation>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default AuthGuard(session => session && session.getCurrentUser)(withRouter(TodoItem));