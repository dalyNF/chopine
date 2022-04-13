import React from 'react';
import {connect} from 'react-redux';
import {loadBeers} from '../../actions/beer/beerAction';
import {Link} from "react-router-dom";
import {config} from '../../config.js'
import axios from "axios";

// page d'admin pour gérer les produits
class Admin extends React.Component {
    
    // fonction qui supprime une bière
	onClickDeleteBeer(id){
	    axios.delete(config.api_url+'/api/v1/beer/delete/'+id, { headers: { 'x-access-token': this.props.user.infos.token }})
	        .then((response)=>{
	            console.log(response);
	            this.props.loadBeers();
	        })
	    
	}
	
	// component qui affiche la liste de bière
	renderBeerList(){
	    return this.props.product.beers.map((beer)=>{
			return (<tr key={beer.id}>
				<td><img src={config.img_url+beer.photo} alt=""/></td>
				<td>{beer.name}</td>
				<td>
					<Link to={"/admin/beer/edit/"+beer.id}>Modifier</Link>
					<button
						onClick={(e)=>{
							this.onClickDeleteBeer(beer.id)
						}}
					>Supprimer</button>
				</td>
			</tr>)
		})
	}
	
	render(){
		return (
			<div>
				<h2>Admin</h2>
				<Link className="addBeer" to="/admin/beer/add">
					<i className="fa fa-plus-circle"></i>
					Ajouter une bière
				</Link>
				<h3>Tableau des bières</h3>
				<table className="tableBeer">
					<thead>
						<tr>
							<td>Image</td>
							<td>Nom</td>
							<td>Action</td>
						</tr>
					</thead>
					<tbody>
						{
							/*<> </>*/
							<React.Fragment>
							{this.renderBeerList()}
							</React.Fragment>
						}
					</tbody>
				</table>
			</div>
		)
	}
}

//connexion à redux
const mapStateToProps = (store) => {
  return {
  	product: store.beers,
  	//cart: store.basket,
  	user: store.user
  }
}
const mapDispatchToProps = {
	loadBeers
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin);