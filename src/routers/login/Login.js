import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { loginUser, resetAuthState  } from '../../actions/userActions';
import ErrorMessageList from '../../components/errorMessageList';
import Button from '../../components/button';
import Helmet from 'react-helmet';
import {Col} from 'react-bootstrap';


class Login extends Component {
  /* Define our states */
  state = {
    userName: '',
    password: '',
  }

  /* always start on a clean sate, this prevents from loading some previous state maybe
     where user failed a log in and maybe got some errors we dont want the user to load login
     and be greeted with errors */
  async componentDidMount() {
    const { dispatch , isAuthenticated } = this.props;
    // if the user is not logged in we need clean the session storage
    if (!isAuthenticated) { dispatch(resetAuthState()); }
  }

  /* Usage  : this.handleInputChange
       For  : e is an input html element
              that has the name field of username/password
     Efitr  : updates our state based of on inputs */
  handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name) { this.setState({ [name]: value }); }
  }

  /* Usage  : this.handleSubmit
       For  : ekkert
     After  : performs an action to call login user */
  handleSubmit = async (e) => {
    e.preventDefault(); // prevent basic bahavior
    const { dispatch } = this.props;
    const { userName, password } = this.state;
    const data = {
      userName,
      password,
    };
    dispatch(loginUser(data));
  }


  render() {
    // fetch all the states needed for the render 
    const { userName, password } = this.state;
    const { loginIsFetching, isAuthenticated, loginErrorMsg } = this.props;
    const errorsExist = loginErrorMsg ? <ErrorMessageList errors={loginErrorMsg} /> : <p></p>;

    // if the data is beeing fetched we show a cool little spinnier to indicate the request is in proccsses
    if (loginIsFetching) {
      return (<section className="vertical-center">
                  <Helmet title='Processing'></Helmet>
                  <div className="loader"></div>
              </section>);
    }
    // if the user is authenticated then we redirect him to a new route
    if (isAuthenticated) { return (<Redirect to="/" />); }
    
    // and now comes the real pain in the ass
    return (
      <section className="vertical-center">
        <Col xs={10} md={5} sm={6} center="true" className="form-box ">
          <Helmet title='Login'></Helmet>
          <h1 className="form_headder">Login</h1>
          {errorsExist} {/* if Errors exists it will be printed above the registration form */}
          <form onSubmit={this.handleSubmit}>

            {/* Username input */}
            <div className="form-group">
              <label htmlFor="userName">Username </label>
              <input className="form-control" type="text" name="userName" required value={userName} onChange={this.handleInputChange} placeholder="Username" />
            </div>

            {/* password input */}
            <div className="form-group">
              <label htmlFor="password">Password </label>
              <input className="form-control" type="password" name="password" required value={password} onChange={this.handleInputChange} placeholder="Password" />
            </div>

            <Button disabled={loginIsFetching}  children='Login' className='btn btn-primary button__submit_form'/>
            <small className="form-text text-muted"> Dont have account ? <Link to='/register'>Sign up here</Link> </small>
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
    loginIsFetching: state.userActions.loginIsFetching,
    isAuthenticated: state.userActions.isAuthenticated,
    loginErrorMsg: state.userActions.loginErrorMsg,
  }
}

/* make this component aware of the aplication store 
  þetta er ekki lengur component heldur Container */
export default connect(mapStateToProps)(Login);
