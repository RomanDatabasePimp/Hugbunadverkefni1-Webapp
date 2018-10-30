import React, { Component } from 'react';
import { registerUser, registerStateReset } from '../../actions/reg';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Button from '../../components/button';
import Helmet from 'react-helmet';
import {Col,Row} from 'react-bootstrap';

class Register extends Component {

  /* Define our starting state for the Register */
  state = {
    userName: '',
    displayName:'',
    password: '',
    passwordReap: '',
    email: '',
  }

  /* This is used to reset all our states, orlse if the user f.x registers goes to some other url f.x /login
     and comes back here the errors will still be present thats just ugly so we always make use to reset states */
  async componentDidMount() {
    const { dispatch } = this.props;
    dispatch(registerStateReset());
  }

  /* Usage : this.handleInputChange
      For  : e is a input html element that has 'name' attribute as 
             username,displayname,passowrd,passwordReap or email
    After  : Updates the state based of in which input was typed */
  handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name) {
      this.setState({ [name]: value });
    }
  }

  /* Usage : this.handleSubmit
     For   : ekkert
    After  : call the action registerUser and pass it the data */
  handleSubmit = async (e) => {
    e.preventDefault(); // slökkva á default hegðun á formi
    const { dispatch } = this.props;
    const { userName, displayName, password,passwordReap,email } = this.state;
    const data = {userName,displayName,password,passwordReap,email};
    dispatch(registerUser(data));
  }


  render() {
    const { userName, displayName, password,passwordReap,email } = this.state; // we can work with the states
    const { isFetching, isRegistrated, message } = this.props; // get our props
    // if errors exist then we create a ErrorList out of them
    console.log("message :"+message);
    const errorsExist = message ?<p> {message}</p> : <p></p>;
    // if the data is beeing fetched we show a cool little spinnier to indicate the request is in proccsses
    if (isFetching) {
      return (<section className="vertical-center">
                <Col xs={10} md={5} sm={6} center="true" className="form-box ">
                  <Helmet title='Processing'></Helmet>
                  <div className="loader"></div>
                </Col>
              </section>);
    }
    /* if the register was successfull we show this insted */
    if (isRegistrated) {
        return (<section className="vertical-center">
                  <Col xs={10} md={5} sm={6} center="true" className="form-box ">
                    <Helmet title='Registrated'></Helmet>
                    <h1> User created ! </h1>
                    <p>Before you can login, you need to go to your email and open the validation link</p>  
                  </Col>
                </section>);
    }
   
    // and now comes the real pain in the ass
    return (
      <section className="vertical-center">
        <Col xs={10} md={5} sm={6} center="true" className="form-box ">
          <Helmet title='Registration'></Helmet>
          <h1 className="form_headder">Registration</h1>
          {errorsExist} {/* if Errors exists it will be printed above the registration form */}
          <form onSubmit={this.handleSubmit}>
            {/* Username input */}
            <div className="form-group">
              <label htmlFor="userName">Username </label>
              <input className="form-control" type="text" name="userName" required value={userName} onChange={this.handleInputChange} placeholder="Username" />
              <small className="form-text text-muted"> You will use the username to login</small>
            </div>
            {/* Display name  input */}
            <div className="form-group">
              <label htmlFor="displayName">Display name </label>
              <input className="form-control" type="text" name="displayName" required value={displayName} onChange={this.handleInputChange} placeholder="Display name" />
              <small className="form-text text-muted"> How others will see you as (can be changed later)</small>
            </div>
            {/* password input */}
            <div className="form-group">
              <label htmlFor="password">Password </label>
              <input className="form-control" type="password" name="password" required value={password} onChange={this.handleInputChange} placeholder="Password" />
              <small className="form-text text-muted"> We will never share your password with anyone</small>
            </div>
            {/* reapeat password input */}
            <div className="form-group">
              <label htmlFor="passwordReap">Repeat Password </label>
              <input className="form-control" type="password" name="passwordReap" required value={passwordReap} onChange={this.handleInputChange} placeholder="Repeat password" />
              <small className="form-text text-muted"> Must mach the password above</small>
            </div>
            {/* reapeat password input */}
            <div className="form-group">
              <label htmlFor="email">Email </label>
              <input className="form-control" type="email" name="email" required value={email} onChange={this.handleInputChange} placeholder="Email" />
              <small className="form-text text-muted">We will never share your email (It will be encrypted)</small>
            </div>

            <Button disabled={isFetching}  children='Register' className='btn btn-primary button__submit_form'/>
          </form>
        </Col>
      </section>
    );
  }
}

/* Takes the state and sends it as props
  þá er hægt að nota this.props.isAdding og þá það virkar
  auth er reducer sem er sameinaður i index.js */
const mapStateToProps = (state) => {
  return {
    isFetching: state.reg.isFetching,
    isRegistrated: state.reg.isRegistrated,
    message: state.reg.message,
  }
}
    
/* make this component aware of the aplication store 
  þetta er ekki lengur component heldur Container */
export default connect(mapStateToProps)(Register);