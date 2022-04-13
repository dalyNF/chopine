//import React from 'react';
import React, { useState } from 'react';
import axios from 'axios';
import {config} from '../../config.js';
import {Navigate} from 'react-router-dom';
import {Link} from 'react-router-dom';
// import {connect} from 'react-redux';


const Login = (props)=>{
    
    const [error, setError] = useState(null)
    const [redirect, setRedirect] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    const onSubmitForm = ()=>{
        let datas = {
            email: email,
            password: password
        }
        
        // envoie le formulaire vers l'api
       axios.post(config.api_url+'/api/v1/user/login', datas)
       .then((response)=>{
           if(response.data.status === 200){
               window.localStorage.setItem('b4y-token', response.data.token)
               setRedirect(true)
			   
			}else{
			   
               setError("retapez vos identifiants")
			}
		})
		.catch((err)=>{
			console.log(err)
           setError("Echec de la connexion")
        })
    }
    
    if(redirect) {
	        return <Navigate to="/" />
	    }
	    
	return (
	        <div>
	            {error !== null && <p>{error}</p>}
	            <form
	                className="b-form"
	                onSubmit={(e)=>{
	                    e.preventDefault();
	                    onSubmitForm();
	                }}
	            >
	                <input 
						type="text" 
						placeholder="Votre email"
						onChange={(e)=>{
						    setEmail(e.currentTarget.value)
						}}
					/>
					<input 
						type="password" 
						placeholder="Votre Mot de passe"
						onChange={(e)=>{
							setPassword(e.currentTarget.value)
						}}
					/>
					<input type="submit" name="Enregister"/>
					<div><p>Ou bien :</p>
					{<Link to="/register">S'enregistrer</Link>} 
					</div>
				</form>
			</div>
		)
    
}

export default Login


/*
class Login extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			error: null,
			redirect: false
		}
		// on enregistre les données de formulaire 
        // hors des state pour
		this.email="";
		this.password="";

	}
	
	//change les attibuts
	onChangetext(type, text) {
		this[type] = text;
	}
	
	// on envoie le formulaire
	onSubmitForm = ()=>{
	       let datas = {
    			email: this.email,
    			password: this.password,
    		
	       }
	       
	       // envoie le formulaire vers l'api
	       axios.post(config.api_url+'/api/v1/user/login', datas)
	       .then((response)=>{
	           console.log(response);
	           if(response.data.status === 200) {
	           		// si tout se passe bien enregistrement du token dans 
	           		// le localstorage
	        		window.localStorage.setItem('b4y-token', response.data.token)
					this.setState({redirect: true});
	           }
	           
	       })
	}
	
	render(){
	    if(this.state.redirect) {
	        return <Navigate to="/" />
	    }
	    
	    return(
	        <div>
	            <form
	                className="b-form"
	                onSubmit={(e)=>{
	                    e.preventDefault();
	                    this.onSubmitForm();
	                }}
	            >
	                
					<input 
						type="text" 
						placeholder="Votre Mail"
						onChange={(e)=>{
							this.onChangetext('email',e.currentTarget.value)
						}}
					/>
					<input 
						type="password" 
						placeholder="Votre Mot de passe"
						onChange={(e)=>{
							this.onChangetext('password',e.currentTarget.value)
						}}
					/>
				
					<input type="submit" name="Enregister"/>
	            </form>
	        </div>
	       )
	}
}



*/