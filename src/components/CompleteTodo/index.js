import React, { Component } from "react";
import WithSession from '../WithSession';
import { Mutation } from 'react-apollo';
import {
  UPDATE_TODO,
  GET_TODO_ITEM,
  UNCOMPLETE_TODO
} from '../../queries';

class CompleteTodo extends Component {
  state = {
    username: '',
    completed: false,
  };

  handleClicked = (updateTodo, uncompleteTodo) => {
    this.setState(prevState => ({
      completed: !prevState.completed
    }),
    () => this.handleComplete(updateTodo, uncompleteTodo)
    );
  }

  handleComplete = (updateTodo, uncompleteTodo)  => {
    if(this.state.completed) {
      updateTodo().then(async ({ data }) => {
        const { completion } = data.updateTodo;
        await this.props.refetch();
        console.log("update todo: ", completion);
        if(completion) {
          this.setState({
            completed: true,
          });
        }
      });
    } else {
      uncompleteTodo().then(async ({ data }) => {
        await this.props.refetch();
        console.log("uncomlete todo: ", data);
        const { completion } = data.uncompleteTodo;
        if(completion === 0) {
          this.setState({
            completed: false,
          });
        }
      });
    }
  }

  componentDidMount() {
    if(this.props.session.getCurrentUser) {
      const { username, completed } = this.props.session.getCurrentUser;
      console.log('current user and completed: ', username, completed);
      completed.forEach(element => {
        if(element._id === this.props._id) {
          this.setState({
            completed: true,
          })
        }
      });
      this.setState({
        username,
      });
    }
  }

  render() {
    const { _id } = this.props;
    const { username, completed } = this.state;
    return (
      <div>
        <Mutation
          mutation={UNCOMPLETE_TODO}
          variables={{ _id, username }}
          update={this.updateTodoStatus}
          refetchQueries={() => [
            { query:GET_TODO_ITEM }
          ]}
        >
        {uncompleteTodo => (
          <Mutation
            mutation={UPDATE_TODO}
            variables={{ _id, username }}
            update={this.updateTodoStatus}
            refetchQueries={() => [
              { query:GET_TODO_ITEM }
            ]}
          >
          {updateTodo => (
                username && 
                <button
                  onClick={() => this.handleClicked(updateTodo, uncompleteTodo)}
                  className="cardButton"
                >
                  {!completed ? <span>Mark completed</span> : <span>Mark uncomplete</span>}
                </button>
                )}
          </Mutation>
          )}
        </Mutation>
        <div className="completedTodo">{completed ? 'COMPLETED': null}</div>
    </div>
    );
  }
}

export default WithSession(CompleteTodo);
