import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sendAdminInvite, resetAdminInvite } from '../../actions/adminInvite';


class AdminInviter extends Component {
    
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

  sendAdminInviteHandler = async (e) => {
    e.preventDefault();
    const { dispatch, chatroomName } = this.props;
    const {
      username
    } = this.state;
    dispatch(sendAdminInvite(chatroomName, username));
  }
  
  async componentDidMount() {
    const { dispatch } = this.props;
    await dispatch(resetAdminInvite());
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
      <p className="success">Administrator invitation sent successfully</p> 
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

    const buttonText = <span>Invite user to become an administrator</span>;

    return (
      <section className = "modal_form">
        <div className="form-group">
          <h2>Admin invite</h2>
        </div>
        {updateSuccessText}
        {errorMsg}
        <form onSubmit={this.sendAdminInviteHandler}>
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
      isFetching: state.adminInvite.isFetching,
      error: state.adminInvite.error,
      actionSuccess: state.adminInvite.actionSuccess,
    }
}
export default connect(mapStateToProps)(AdminInviter);