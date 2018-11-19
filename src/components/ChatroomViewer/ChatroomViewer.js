import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getChatroom } from '../../actions/chatroom';


class ChatroomViewer extends Component {
  static propTypes = {
    chatroomName: PropTypes.string.required,
  }

  async componentDidMount() {
    const { dispatch, chatroomName,  } = this.props;
    await dispatch(getChatroom(chatroomName));
  }

  render() {
    const { isFetching, error, chatroom, getChatroomSuccess } = this.props;

    if(isFetching || !getChatroomSuccess) {
      return (
        <div className="loader"></div>
      );
    }

    const {
      displayName,
      description,
      listed,
      invited_only,
      tags,
      userRelation,
    } = chatroom;

    const isAdmin = userRelation == "ADMIN" || userRelation == "OWNER";
    const isOwner = userRelation == "OWNER";

    return (
      <section>
        <p>Display name: {displayName}</p>
        <p>Description: {description}</p>
        <p>{listed ? "Listed" : "Unlisted"}</p>
        <p>{invited_only ? "Invites only" :" Anyone can join"}</p>
        <p>Tags: {tags.join(', ')}</p>
      </section>
    );

  }
}

const mapStateToProps = (state) => {
  console.log(state.chatroom);
  return {
    isFetching: state.chatroom.chatroomIsFetching,
    error: state.chatroom.chatroomError,
    chatroom: state.chatroom.chatroom,
    getChatroomSuccess: state.chatroom.getChatroomSuccess,
  }
}
export default connect(mapStateToProps)(ChatroomViewer);