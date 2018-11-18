import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUserData, addOrAccepReset} from '../../actions/addAcceptAction';

class Friendrequests extends Component {

  static propTypes = {
    friendRequestors: PropTypes.array,
  }



  render() {
    /* array of user:{ user : {username:,displayName: }} */
    const {friendRequestors} = this.props;
    

    

    return (
      <div>
        
      </div>
    );
  }
}

/* Takes the state and sends it as props
  þá er hægt að nota this.props.isAdding og þá það virkar
  auth er reducer sem er sameinaður i index.js */
const mapStateToProps = (state) => {
  return {
  }
}
  
/* make this component aware of the aplication store 
   þetta er ekki lengur component heldur Container */
 export default connect(mapStateToProps)(Friendrequests);