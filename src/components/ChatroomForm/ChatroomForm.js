import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createChatroom, resetChatroom, getChatroom, updateChatroom } from '../../actions/chatroom';


class ChatroomForm extends Component {

  static propTypes = {
    edit: PropTypes.boolean,
    chatroomName: PropTypes.string,
  }

  state = {
    chatroomName: "",
    displayName: "",
    description: "",
    listed: false,
    invited_only: false,
    tags: "",
  }
  
  stringToArray(s) {
    return s.split(',').map(x => x.trim()).filter(x => x.length > 0);
  }
  arrayToString(a) {
    return a.join(', ');
  }

  onInputChange(name) {
    return async (e) => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
      await this.setState({ [name]: value });
      // console.log(name, this.state[name]);
    }
  }

  createChatroomHandler = async (e) => {
    e.preventDefault();
    const { dispatch } = this.props;
    const {
      chatroomName,
      displayName,
      description,
      listedlse,
      invited_only,
      tags,
    } = this.state;
    dispatch(createChatroom({
      chatroomName,
      displayName,
      description,
      listedlse,
      invited_only,
      tags: this.stringToArray(tags),
    }));
  }

  updateChatroomHandler = async (e) => {
    e.preventDefault();
    const { dispatch } = this.props;
    const {
      chatroomName,
      displayName,
      description,
      listedlse,
      invited_only,
      tags,
    } = this.state;
    dispatch(updateChatroom(chatroomName, {
      displayName,
      description,
      listedlse,
      invited_only,
      tags: this.stringToArray(tags),
    }));
    
  }
  
  async componentDidMount() {
    const { dispatch, edit, chatroomName } = this.props;
    await dispatch(resetChatroom());

    if(edit && chatroomName){
      await dispatch(getChatroom(chatroomName));
      const { chatroom } = this.props;
      console.log(chatroom);
      const {
        displayName,
        description,
        listed,
        invited_only,
        tags,
      } = chatroom;

      await this.setState({
        chatroomName,
        displayName,
        description,
        listed,
        invited_only,
        tags: this.arrayToString(tags),
      });
    }
  }
  
  render() {
    
    const { isFetching, error, chatroom, getChatroomSuccess, updateChatroomSuccess, createChatroomSuccess, edit } = this.props;
    const { chatroomName, displayName, description, listed, invited_only, tags } = this.state;

    if(isFetching) {
      return (
        <div className="loader"></div>
      );
    }

    if(createChatroomSuccess) {
      return (
        <p>Creation successful</p>
      )
    }

    const updateSuccessText = updateChatroomSuccess ? 
    <div className = "form-group">
      <p className="success">Update successful</p> 
    </div>
  : <p></p>; 

    const errorMsg = error ? 
      <div className = "form-group">
        <p className="error">Error: {error}</p> 
      </div>
    : <p></p>;

    let fields = [];
    // this field is only active when editing
    if(!edit) {
      fields.push(
        <label>
          Chatroom name:
          <input
            className="form-control"
            required={true}
            type='text'
            name="chatroomName"
            value={chatroomName}
            onChange={this.onInputChange("chatroomName")} 
          />
        </label>
      );
    }
    fields.push(
      <label>
        Display name:
        <input
          className="form-control"
          required={true}
          type='text'
          name="displayName"
          value={displayName}
          onChange={this.onInputChange("displayName")} 
        />
      </label>
    );
    fields.push(
      <label>
        Description:
        <textarea
          className="form-control"
          required={false}
          name="description"
          value={description}
          onChange={this.onInputChange("description")} 
        />
      </label>
    );
    fields.push(
      <label>
      <input
        type="checkbox"
        value={"listed"}
        checked={listed}
        onChange={this.onInputChange("listed")}
        />
        {"Listed"}
      </label>
    );
    fields.push(
      <label>
      <input
        type="checkbox"
        value={"Invited_only"}
        checked={invited_only}
        onChange={this.onInputChange("invited_only")}
        />
        {"Invited only"}
      </label>
    );
    fields.push(
      <label>
        Tags:
        <input
          className="form-control"
          required={false}
          type='text'
          name="tags"
          value={tags}
          onChange={this.onInputChange("tags")} 
        />
      </label>
    );

    const buttonText = edit ? <span>update chatroom</span> : <span>Create chatroom</span>;

    return (
      <section className = "modal_form">
        {updateSuccessText}
        {errorMsg}
        <form onSubmit={edit ? this.updateChatroomHandler : this.createChatroomHandler}>
          {fields.map((x, i) => 
          <div key={i} className="form-group">
            {x}
          </div>
          )}
          <div className="form-group">
            <button>{buttonText}</button>
          </div>
        </form>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
    return {
      isFetching: state.chatroom.isFetching,
      error: state.chatroom.error,
      chatroom: state.chatroom.chatroom,
      getChatroomSuccess: state.chatroom.getChatroomSuccess,
      updateChatroomSuccess: state.chatroom.updateChatroomSuccess,
      createChatroomSuccess: state.chatroom.createChatroomSuccess,
    }
}
export default connect(mapStateToProps)(ChatroomForm);