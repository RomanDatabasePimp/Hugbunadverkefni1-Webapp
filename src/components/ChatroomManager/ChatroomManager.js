import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Modal} from 'react-bootstrap';

import ChatroomForm from '../ChatroomForm';
import AdminInviter from '../AdminInviter';
import MemberInviter from '../MemberInviter';
import ChatroomViewer from '../ChatroomViewer';


class ChatroomManager extends Component {
  static propTypes = {
    chatroomName: PropTypes.string.required,
    userRelation: PropTypes.string.required,
  }

  async componentDidMount() {
    
  }

  render() {
    const { chatroomName, userRelation } = this.props;

    const isAdmin = userRelation == "ADMIN" || userRelation == "OWNER";
    const isOwner = userRelation == "OWNER";

    return (
      <section>
        <form className = "modal_form">
          <div className="form-group">
            <h2>{chatroomName}</h2>
          </div>
        </form>
        {!isAdmin ? (<ChatroomViewer chatroomName={chatroomName}></ChatroomViewer>) : (<p></p>) }
        {isAdmin ? (<ChatroomForm edit={true} chatroomName={chatroomName}></ChatroomForm>) : (<p></p>) }
        {isAdmin ? (<MemberInviter chatroomName={chatroomName}></MemberInviter>) : (<p></p>) }
        {isOwner ? (<AdminInviter chatroomName={chatroomName}></AdminInviter>) : (<p></p>) }
      </section>
    );

  }
}

const mapStateToProps = (state) => {
  return {

  }
}
export default connect(mapStateToProps)(ChatroomManager);