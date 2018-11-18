import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createChatroom, resetChatroomForm } from '../../actions/chatroom';
import { DH_NOT_SUITABLE_GENERATOR } from 'constants';


class ChatroomForm extends Component {



  state = {
    chatroomName: "react1",
    displayName: "react disp 1",
    description: "lorem ipsum",
    listed: false,
    invited_only: true,
    tags: ",jazz, music , test,",
  }
  
  stringToArray(s) {
    return s.split(',').map(x => x.trim()).filter(x => x.length > 0);
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
      invited_onlylse,
      tags,
    } = this.state;
    dispatch(createChatroom({
      chatroomName,
      displayName,
      description,
      listedlse,
      invited_onlylse,
      tags: this.stringToArray(tags),
    }));
  }
  
  async componentDidMount() {
    const { dispatch } = this.props;
    dispatch(resetChatroomForm());
  }
  
  render() {

    const { isFetching, error, chatroom, actionSuccess } = this.props;
    const { chatroomName, displayName, description, listed, invited_only, tags } = this.state;

    if(isFetching) {
      return (
        <div className="loader"></div>
      );
    }

    if(actionSuccess) {
      return (
        <p>Creation successful</p>
      )
    }

    let errorMsg = error ? 
      <div className = "form-group ">
        <p className="error">Error: {error}</p> 
      </div>
    : <p></p>;

    let fields = [];
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

    return (
      <section className = "modal_form">
        {errorMsg}
        <form onSubmit={this.createChatroomHandler}>
          {fields.map((x, i) => 
          <div key={i} className="form-group">
            {x}
          </div>
          )}
          <div id="bottom-bar" className="form-group">
            <button ><span>Create chatroom</span></button>
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
      actionSuccess: state.chatroom.actionSuccess,
    }
}
export default connect(mapStateToProps)(ChatroomForm);