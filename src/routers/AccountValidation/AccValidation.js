import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import {Col} from 'react-bootstrap';
import { validateUser,validationStateReset  } from '../../actions/registerValidation';

class AccValidation extends Component {

  /* When we load the route we reset the state to default and then
     try to send a request for data validation*/
  async componentDidMount() {
    const { dispatch } = this.props;
    const { key } = this.props.match.params;
    dispatch(validationStateReset());
    dispatch(validateUser(key));
  }

  render() {
    const { validationInProcess, validationSuccess, message } = this.props;
    
    // show the loading icon to the user to let him know we are in proccess
    if(validationInProcess){
      return (<section className="vertical-center">
                <Helmet title='Processing'></Helmet>
                <div className="loader"></div>
              </section>);
    }
    // our response
    let response = <p></p>;
    if(!validationSuccess) {
      response = <div><h1>Congratulations!</h1><div> you have been validated, you can log in here <Link to='/'>Login here</Link></div></div>;
    }

    if(message){ response = <h2>{message}</h2>; }
    
    return (
      <section className="vertical-center">
        <Col xs={10} md={5} sm={6} center="true" className="form-box ">
          <Helmet title='Validated'></Helmet>
          {response}
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
    validationInProcess : state.registerValidation.isFetching,
    validationSuccess : state.registerValidation.isValidated,
    message: state.registerValidation.message,
  }
}

/* make this component aware of the aplication store 
  þetta er ekki lengur component heldur Container */
export default connect(mapStateToProps)(AccValidation);
