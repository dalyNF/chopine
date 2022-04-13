import React from 'react';
import {connect} from "react-redux";
import {logoutUser} from "../../actions/user/userAction";
import {Navigate} from "react-router-dom";

//page de déconnexion
class Logout extends React.Component {
    constructor(props){
		super(props)
		this.state = {
			redirect: false
		}
	}
	
	componentDidMount(){
	    //on détruit le token pour éviter que le HOC le détecte et reconnect automatiquement l'utilisateur
	    window.localStorage.removeItem('b4y-token');
	    //on réinitialise la state user par défaut en mode déconnecté.
	    this.props.logoutUser();
		this.setState({redirect: true})
	}
	
	render(){
	    return <Navigate to="/"/>
	}
	
}

const mapStateToProps = (store) => {
  return {
      
  }
}

const mapDispatchToProps = {
	logoutUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
