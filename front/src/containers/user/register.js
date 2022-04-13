//import React from 'react';
import React, { useState } from 'react';
import axios from 'axios';
import {config} from '../../config.js';
import {Navigate} from 'react-router-dom';
// import {connect} from 'react-redux';

const Register = (props)=>{
    
    const [error, setError] = useState(null)
    const [redirect, setRedirect] = useState(false)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [zip, setZip] = useState("")
    const [phone, setPhone] = useState("")
	
    // on envoie le formulaire
    const onSubmitForm = ()=>{
	    //ici les datas qu'on envoi vers le back (req.body)
	    let datas = {
	        firstName: firstName,
			lastName: lastName,
			email: email,
			password: password,
			address: address,
			city: city,
			zip: zip,
			phone: phone
	  }
	    // envoie le formulaire vers l'api
       axios.post(config.api_url+'/api/v1/user/save', datas)
       .then((response)=>{
           setRedirect(true);
       })
       .catch((err)=>{
           console.log(err)
           setError("Echec de l'enregistrement")
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
						placeholder="Votre Prénom"
						onChange={(e)=>{
						    setFirstName(e.currentTarget.value)
						}}
					/>
					<input 
						type="text" 
						placeholder="Votre Nom"
						onChange={(e)=>{
							setLastName(e.currentTarget.value)
						}}
					/>
					<input 
						type="text" 
						placeholder="Votre Mail"
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
					<input 
						type="text" 
						placeholder="Votre Adresse"
						onChange={(e)=>{
							setAddress(e.currentTarget.value)
						}}
					/>
					<input 
						type="text" 
						placeholder="Votre Code postal"
						onChange={(e)=>{
							setZip(e.currentTarget.value)
						}}
					/>
					<input 
						type="text" 
						placeholder="Votre Ville"
						onChange={(e)=>{
							setCity(e.currentTarget.value)
						}}
					/>
					<input 
						type="text" 
						placeholder="Votre Téléphone"
						onChange={(e)=>{
							setPhone(e.currentTarget.value)
						}}
					/>
					
				
					<input type="submit" name="Enregister"/>
	            </form>
	        </div>
	   )    
	
}

export default Register;