import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sendMemberInvite, resetMemberInvite } from '../../actions/memberInvite';


class MemberInviter extends Component {
    
  static propTypes = {
    chatroomName: PropTypes.string.required,
  }

  state = {
    username: ""
  }

  onInputChange(name) {
    return async (e) => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
      await this.setState({ [name]: value });
      // console.log(name, this.state[name]);
    }
  }

  sendMemberInviteHandler = async (e) => {
    e.preventDefault();
    const { dispatch, chatroomName } = this.props;
    const {
      username
    } = this.state;
    dispatch(sendMemberInvite(chatroomName, username));
  }
  
  async componentDidMount() {
    const { dispatch } = this.props;
    await dispatch(resetMemberInvite());
  }
  
  render() {

    const { isFetching, error, actionSuccess } = this.props;
    const { username } = this.state;

    if(isFetching) {
      return (
        <div className="loader"></div>
      );
    }

    const updateSuccessText = actionSuccess ? 
    <div className = "form-group">
      <p className="success">Member invitation sent successfully</p> 
    </div> : <p></p>;

    const errorMsg = error ? 
      <div className = "form-group">
        <p className="error">Error: {error}</p> 
      </div>
    : <p></p>;

    let fields = [];
    fields.push(
      <label>
        Username:
        <input
          className="form-control"
          required={true}
          type='text'
          name="username"
          value={username}
          onChange={this.onInputChange("username")} 
        />
      </label>
    );

    const buttonText = <span>Invite user to become a member</span>;

    return (
      <section className = "modal_form">
        <div className="form-group">
          <h2>Member invite</h2>
        </div>
        {updateSuccessText}
        {errorMsg}
        <form onSubmit={this.sendMemberInviteHandler}>
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
      isFetching: state.memberInvite.isFetching,
      error: state.memberInvite.error,
      actionSuccess: state.memberInvite.actionSuccess,
    }
}
export default connect(mapStateToProps)(MemberInviter);