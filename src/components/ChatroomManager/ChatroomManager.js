import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Modal} from 'react-bootstrap';

import ChatroomForm from '../ChatroomForm';
import AdminInviter from '../AdminInviter';
import MemberInviter from '../MemberInviter';
import ChatroomViewer from '../ChatroomViewer';

import { deleteChatroom, resetChatroomDelete } from '../../actions/deleteChatroom';
import { leaveChatroom, resetChatroomLeave } from '../../actions/leaveChatroom';
import { quitAdmin, resetAdminQuit } from '../../actions/quitAdmin';
import { getUserData } from '../../actions/initialloadofapp';


class ChatroomManager extends Component {
  static propTypes = {
    chatroomName: PropTypes.string.required,
    userRelation: PropTypes.string.required,
  }

  deleteChatroomHandler = async (e) => {
    e.preventDefault();
    const { dispatch, chatroomName } = this.props;
    await dispatch(deleteChatroom(chatroomName));
    dispatch(getUserData());
  }

  leaveChatroomHandler = async (e) => {
    e.preventDefault();
    const { dispatch, chatroomName } = this.props;
    await dispatch(leaveChatroom(chatroomName));
    dispatch(getUserData());
  }

  quitAdminHandler = async (e) => {
    e.preventDefault();
    const { dispatch, chatroomName } = this.props;
    await dispatch(quitAdmin(chatroomName));
    dispatch(getUserData());
  }

  async componentDidMount() {
    const { dispatch } = this.props;
    await dispatch(resetChatroomDelete());
    await dispatch(resetChatroomLeave());
    await dispatch(resetAdminQuit());
  }

  render() {
    const { chatroomName, userRelation } = this.props;
    const { isFetching, error, deleteSuccess, leaveSuccess } = this.props;

    
    if(isFetching) {
      return (
        <div className="loader"></div>
      );
    }

    if (deleteSuccess) {
      return (
        <form>
          <div className = "form-group">
          <p className="success">Chatroom has successfully been deleted</p> 
        </div>
        </form>
      );
    }
    
    if (leaveSuccess) {
      return (
        <form>
          <div className = "form-group">
          <p className="success">successfully left the chatroom</p> 
        </div>
        </form>
      );
    }
  
    const errorMsg = error ? 
      <div className = "form-group">
        <p className="error">Error: {error}</p> 
      </div>
    : <p></p>;

    const isAdmin = userRelation == "ADMIN" || userRelation == "OWNER";
    const isOwner = userRelation == "OWNER";

    const deleteChatroom = (
      <section className="modal_form">
        <form onSubmit={this.deleteChatroomHandler}>
          <div className="form-group">
            <h2>Delete Chatroom</h2>
          </div>
          <div className="form-group">
            <button><span>Delete chatroom</span></button>
          </div>
        </form>
      </section>
    );
    
    const leaveChatroom = (
      <section className="modal_form">
        <form onSubmit={this.leaveChatroomHandler}>
          <div className="form-group">
            <h2>Leave Chatroom</h2>
          </div>
          <div className="form-group">
            <button><span>leave chatroom</span></button>
          </div>
        </form>
      </section>
    );
    
    const quitAdmin = (
      <section className="modal_form">
        <form onSubmit={this.quitAdminHandler}>
          <div className="form-group">
            <h2>Quit being an administrator</h2>
          </div>
          <div className="form-group">
            <button><span>Quit being an administrator</span></button>
          </div>
        </form>
      </section>
    );

    return (
      <section>
        <form className = "modal_form">
          <div className="form-group">
            <h2>{chatroomName}</h2>
          </div>
        </form>
        {errorMsg}
        {!isAdmin ? (<ChatroomViewer chatroomName={chatroomName}></ChatroomViewer>) : (<p></p>) }
        {isAdmin ? (<ChatroomForm edit={true} chatroomName={chatroomName}></ChatroomForm>) : (<p></p>) }
        {isAdmin ? (<MemberInviter chatroomName={chatroomName}></MemberInviter>) : (<p></p>) }
        {isOwner ? (<AdminInviter chatroomName={chatroomName}></AdminInviter>) : (<p></p>) }
        {!isOwner && isAdmin ? quitAdmin : (<p></p>) }
        {!isOwner ? leaveChatroom : (<p></p>) }
        {isOwner ? deleteChatroom : (<p></p>) }
      </section>
    );

  }
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.deleteChatroom.isFetching || state.leaveChatroom.isFetching,
    error: state.deleteChatroom.error || state.leaveChatroom.error,
    deleteSuccess: state.deleteChatroom.actionSuccess,
    leaveSuccess: state.leaveChatroom.actionSuccess,
  }
}
export default connect(mapStateToProps)(ChatroomManager);