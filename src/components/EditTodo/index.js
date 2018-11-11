import React, { Component } from 'react';
import {
  WEB_LINKS,
  CATEGORY,
} from '../../Constants';
import './EditTodo.css';

class EditTodo extends Component {
  handleSubmit = event => {
    event,preventDefault();
    this.props.handleSubmitChange()
  }
  
  render() {
    const {
      status,
      closeModal,
      handleChange,
      todo: {
        name,
        category,
        imageUrl,
        description,
      },
    } = this.props;
    return (
      <div className={status ? "modalOpen modal" :" modal" }>
          <div className="modalInner">
            <div className="modalContent">
              <form
                className="modalContentForm"
                onSubmit={event => this.handleSubmit(event)}
              >
                <h4>Edit Todo</h4>
                <input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  value={name}
                />
                <label htmlFor="imageUrl">Select your background</label>
                <select
                  name="imageUrl"
                  onChange={handleChange}
                  value={imageUrl}
                >
                  {WEB_LINKS.map(item => {
                    return <option value={item.value} key={item.name}>{item.name}</option>
                  })}
                </select>
                <select
                  name="category"
                  onChange={handleChange}
                  value={category}
                >
                  {CATEGORY.map((item, index) => {
                    return <option value={item} key={index}>{item}</option>
                  })}
                </select>
                <textarea
                  name="description"
                  onChange={handleChange}
                  value={description}
                />
                <input
                  type="date"
                  name="due"
                  onChange={handleChange}
                />
                <div className="modalButton">
                  <button  type="submit">Update</button>
                  <button onClick={closeModal}>Cancel</button>
                </div>
                
              </form>
            </div>
          </div>
        </div>
    );
  }
}
  
}) => (
        
      );

export default EditTodo;
