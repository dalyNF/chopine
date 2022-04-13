import React from 'react';
import {Link} from 'react-router-dom';
// import logo from '../assets/logo/logo-beer.jpg'
// import {Navigate} from "react-router-dom";
import {connect} from "react-redux";

//Gestion de la navigation
class Header extends React.Component {
	
	render(){
		
		return (
			<div className="header-nav">
				<nav>
					<div className="list1">
					{/* <img src={logo} alt="taverne"/> */}
					<i className="fas fa-beer fa-4x"></i>
						<Link to="/">Accueil</Link>
						<Link to="/product">Produits</Link>
					</div>
					<div className="list2">
						{/* {this.props.user.isLogged === false && <Link to="/register">S'enregistrer</Link>}  */}
						{this.props.user.isLogged === false &&  <Link to="/login">Se connecter</Link> }
						
						{(this.props.user.isLogged && this.props.user.infos.role === "admin" ) &&<Link to="/admin">Admin</Link> }
						{this.props.user.isLogged && <Link to="/logout">Se déconnecter</Link> }
						{this.props.user.isLogged && <Link to="/profil">{this.props.user.infos.firstName}</Link> }
						<Link to="/basket">
							Panier 
							{this.props.cart.basket.length > 0 &&<span>{this.props.cart.basket.length}</span>}
						</Link>
					</div>
				
				</nav>
				<div className="header-pict">
				<div className="background_opacity"></div>
					<h1>La Chopine : Bières artisanales extravagantes ! </h1>
				</div>
			</div>
		)
	}

}

const mapStateToProps = (store) => {
    return {
    	cart: store.basket,
        user: store.user
    }
}

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Header);


