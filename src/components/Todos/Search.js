import React, { Component } from 'react';
import { SEARCH_TODOS } from '../../queries';
import { ApolloConsumer } from 'react-apollo';
import { Link } from 'react-router-dom';
import './TodoList.css';

class Search extends Component {
  state = {
    searchResults: [],
  }
  handleChange = ({ searchTodos }) => {
    console.log(searchTodos);
    this.setState({
      searchResults: searchTodos,
    });
  }

  render() {
    const {
      searchResults,
    } = this.state;

    return (
      <div className="search">
        <h1>Search for Todo by Name</h1>
        <ApolloConsumer>
          {client => (
            <div>
            <input
              type="search"
              placeholder="Search for Todo"
              onChange={async event => {
                event.persist();
                const { data } = await client.query({
                  query: SEARCH_TODOS,
                  variables: { searchTerm: event.target.value }
                });
                this.handleChange(data);
              }}
            />
            <ul>
              {searchResults.map(item => (
                <li key={item._id}>
                  <Link to={`/todos/${item._id}`}>
                    <h4>{item.name}</h4>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          )}
        </ApolloConsumer>
      </div>
    );
  }
}

export default Search;
