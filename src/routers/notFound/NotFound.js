import React, { Component } from 'react';
import Helmet from 'react-helmet';
import {Link } from 'react-router-dom';
import {Col} from 'react-bootstrap';

export default class Home extends Component {

  render() {
    return (<section className="vertical-center">
              <Col xs={10} md={5} sm={6} center="true" className="form-box ">
                <Helmet title='Not Found'></Helmet>
                <h1> 404 Not Found </h1>
                <p>The content you are trying to view cant be found or dosent exists
                   please procese back to <Link to='/home'>Home</Link></p>  
              </Col>
            </section>
    );
  }
}