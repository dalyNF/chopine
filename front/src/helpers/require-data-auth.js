import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import {loadBeers} from "../actions/beer/beerAction"
import axios from "axios";
import {config} from '../config';
import {Navigate,  useParams} from 'react-router-dom';
import {connectUser} from '../actions/user/userAction';

//HOC de controle des data et de la sécurité
const RequireDataAuth = (props)=>{
   	const params = useParams()
  
  	const Child = props.child
  	
  	// gestion des state
	const [redirect, setRedirect] = useState(false);
	// const [redirectHome, setHome] = useState(false)
	// const [ok, setOk] = useState(false)
	
	// au chargement de chaque component
	//ICI on va controller si l'utilisateur est connecté ou non et donner l'ordre d'accés ou non à la page demandée
	useEffect(() => {
		// si les bières ne sont pas chargé dans redux on les charge (store)
		if(props.product.beers.length === 0) {
		   props.loadBeers();
		}
	
		//si l'utilisateur n'est pas connecté dans le store de redux
		if(props.user.isLogged === false) {
		    //on va checker si il y'a un token dans le localStorage
		    const token = window.localStorage.getItem('b4y-token');
		    
		    //si celui-ci est null et qu'il y'a une restriction de page (la props auth qui est true dans notre balise du router)
		    if(token === null && props.auth) {
		        //on met à jour la state redirect
				setRedirect(true)
		    //sinon
		    }else{
		        //requète ajax vers la route checktoken de l'api back en envoyant le fameux token dans le headers de la requète ajax
		        axios.get(config.api_url+"/api/v1/user/checkToken", { headers: { "x-access-token": token }})
            		.then((response)=>{
            			console.log("res",response);
		        
			            //si le status de la réponse n'est pas 200
			            if(response.data.status !== 200) {
			                //on met à jour la state redirect
			                if(props.auth === true) {
            					setRedirect(true)
            				}
			            //sinon
			            }else{
			                //on va stocker les infos de la réponse(objet) dans une variable user 
			                let user = response.data.user[0];
			                //on va ajouter une propriété à l'objet user pour y stocker le token
			                user.token = token;
			                //on appel l'action de redux pour sauvegarder ces infos dans le store
			                props.connectUser(user);
			            }
            		})
            		.catch(err=>console.log("Echec AJAX", err))
		    }  
		}else{
			if(props.user.infos.role !== "admin" && props.isAdmin){
				document.location.href="/"
			}
		}
	},[props])
	
	
	
	if(redirect) {
		return <Navigate to="/login"/>
	}

	return (<Child {...props} params={params}/>)
	
  	
}

const mapStateToProps = (store) => {
	  return {
	    product: store.beers,
		user: store.user
	  }
}

const mapDispatchToProps = {
    loadBeers,
	connectUser
}

export default connect(mapStateToProps, mapDispatchToProps)(RequireDataAuth);
