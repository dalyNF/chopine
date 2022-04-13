import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import {config} from '../config';
import axios from 'axios';
// import {Navigate} from 'react-router-dom';
import {connectUser} from '../actions/user/userAction';

//  gestion de la page profil utilisateur
// codage en hook

const Profil = (props)=>{
    // gestion de tous les states (firstName, lastName, address, zip, city, phone)
    const [msg, setMsg] = useState(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [zip, setZip] = useState("");
    const [phone, setPhone] = useState("");
    
    useEffect(() => {
        //mise à jour des states (pour pouvoir afficher les infos de l'user par défaut dans les champs de formulaire)
        setFirstName(props.user.infos.firstName);
        setLastName(props.user.infos.lastName);
        setAddress(props.user.infos.address);
        setCity(props.user.infos.city);
        setZip(props.user.infos.zip);
        setPhone(props.user.infos.phone);
    }, [props]);
    
    // on envoie le formulaire d'edition vers l'api
    const onSubmitForm = ()=>{
        let data = {
            firstName: firstName,
            lastName: lastName,
            address: address,
            zip: zip,
            city: city,
            phone: phone
        }
        
        axios.put(config.api_url+'/api/v1/user/update/'+props.user.infos.id, data,{ headers: { 'x-access-token': props.user.infos.token }} )
        .then((response)=>{
            console.log("update", response);
            if(response.data.status === 200) {
                setMsg("Le profil a bien été modifié !")
                props.connectUser(response.data.newUser)
            }
            
        })
    }
    return (
        <div>
            {msg !== null && <p>{msg}</p>}
            <h2>Mon profil</h2>
            <form
                className="b-form"
                onSubmit={(e)=>{
                    e.preventDefault();
                    onSubmitForm()
                }}
            >
                <input 
                    type="text"
                    placeholder="Prénom"
                    defaultValue={props.user.infos.firstName}
                    onChange={(e)=>{
                        setFirstName(e.currentTarget.value)
                    }}
                />
                <input 
                    type="text"
                    placeholder="Nom"
                    defaultValue={props.user.infos.lastName}
                    onChange={(e)=>{
                        setLastName(e.currentTarget.value)
                    }}
                />
                <input 
                    type="text"
                    placeholder="Adresse"
                    defaultValue={props.user.infos.address}
                    onChange={(e)=>{
                        setAddress(e.currentTarget.value)
                    }}
                />
                <input 
                    type="text"
                    placeholder="Code postal"
                    defaultValue={props.user.infos.zip}
                    onChange={(e)=>{
                        setZip(e.currentTarget.value)
                    }}
                />
                <input 
                    type="text"
                    placeholder="Ville"
                    defaultValue={props.user.infos.city}
                    onChange={(e)=>{
                        setCity(e.currentTarget.value)
                    }}
                />
                <input 
                    type="text"
                    placeholder="Téléphone"
                    defaultValue={props.user.infos.phone}
                    onChange={(e)=>{
                        setPhone(e.currentTarget.value)
                    }}
                />
                <input type="submit" name="Modifier"/>
            </form>
        </div>
    )
    
    
}

const mapStateToProps = (store) => {
  return {
  	user: store.user
  }
}
const mapDispatchToProps = {
	connectUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Profil);