import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { noDataRequest } from '../../api';

export default class Home extends Component {

    async componentDidMount() {
        this.fetchData();
      }
      /* Notkun : fetchData()
     Fyrir  : ekkert
     Efitir : fer á Heroku slóðina hans óla og skilar 
              json obj sem Heroku skilar */
  async fetchData() {
    const data = await noDataRequest("login","GET");
    console.log("jee",data);
    return data;
  }
  render() {
    return (
      <div>
        <p>heimaSipa</p>
      </div>
    );
  }
}