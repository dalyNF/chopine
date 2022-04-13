import React from 'react';
import axios from 'axios';
import {config} from '../../../config.js';
import {Navigate} from 'react-router-dom';
import {connect} from 'react-redux';
import {loadBeers} from '../../../actions/beer/beerAction';

// page d'ajout de bière 
class AddBeer extends React.Component {
    constructor(props){
		super(props);
		this.state = {
		    selectedFile: null,
			error: null,
			redirect: false
		}
		// on enregistre les données de formulaire 
        // hors des state pour 
		this.name = "";
		this.description ="";
		this.quantity="";
		this.price="";
    
    }
    
     //change les attibuts
    onChangetext(type, text) {
        this[type] = text
    }
    
    // sauvegarde les bières en bdd (requète axios)
    saveBeer(datas) {
        axios.post(config.api_url+'/api/v1/beer/save', datas , { headers: { 'x-access-token': this.props.user.infos.token }})
			.then((response)=>{
				console.log(response);
				if(response.data.status === 200) {
				    this.props.loadBeers();
				    this.setState({redirect: true})
				}
			})
			.catch(err=>console.log(err))
    }
    
    // sauvegarde les bière entièrement avec les photos en plus 
    saveCompleteBeer() {
        if(this.state.selectedFile === null) {
            let datas = {
                name: this.name,
                description: this.description,
                price: this.price,
                quantity: this.quantity,
                photo: "no-pict.jpg"
            }
            
            this.saveBeer(datas);
        } else {
            let formData = new FormData();
    	    formData.append('image', this.state.selectedFile); 
    	   
    	    // enregistrement de la photo
            axios({
                method: "post",
                url: config.api_url+'/api/v1/beer/pict',
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    "x-access-token": this.props.user.infos.token
                }
            })
            .then((response)=>{
                console.log(response);
                if(response.data.status === 200) {
                    let datas = {
    					name: this.name,
    					description: this.description,
    					quantity: this.quantity,
    					price: this.price,
    					photo: response.data.url
    				}
    				// lorsque l'image est sauvegardé on sauvegarde la bière
    				this.saveBeer(datas);
                }else{
                    this.setState({error: "Echec de l'envoi de l'image"})
                }
            })
            .catch(err => console.log(err))
        }
        
    }
    
    // Envoie du formulaire
    onSubmitForm() {
        //si l'un des champs n'est pas remplit
        if(this.name === "" || this.description === "" || this.price === "" || this.quantity === "") {
            //mise à jour de la state d'erreur
            this.setState({error: "Tous les champs ne sont pas encore remplis !"});
        //sinon si la quantité ou le prix n'est pas un nombre 
        }else if (isNaN(this.quantity) || isNaN(this.price)) {
            //mise à jour de la state d'erreur
            this.setState({error: "Les champs Prix et quantités doivent être des chiffres ! "});
        //sinon
        }else{
            //on sauvegarde le panier complet
            this.saveCompleteBeer()
        }
    }
    
    render(){
        if(this.state.redirect) {
            return <Navigate to="/admin"/>
        }
        return (
            <div>
                <h2>Ajoutez un produit</h2>
                {this.state.error !== null && <p>{this.state.error}</p>}
                <form
                    className="b-form"
                    onSubmit={(e)=>{
                        e.preventDefault();
                        this.onSubmitForm() 
                    }}
                >
                
                    <input 
						type="text" 
						placeholder="Nom de la bière"
						onChange={(e)=>{
							this.onChangetext('name',e.currentTarget.value)
						}}
					/>
					<input 
						type="file" 
						onChange={(e)=>{
							console.log(e.currentTarget.files[0]);
							this.setState({selectedFile: e.currentTarget.files[0]}, ()=>{
								console.log(this.state.selectedFile);
							})
						}}
					/>
					<textarea 
						type="text" 
						name="description"
						onChange={(e)=>{
							this.onChangetext('description',e.currentTarget.value)
						}}
					>
					</textarea>
				    
				    <input 
						type="text" 
						placeholder="Quantité"
						onChange={(e)=>{
							this.onChangetext('quantity',e.currentTarget.value)
						}}
					/>
					<input 
						type="text" 
						placeholder="Prix de d'achat"
						onChange={(e)=>{
							this.onChangetext('price',e.currentTarget.value)
						}}
					/>
					<input type="submit" name="Enregister"/>
				</form>
            </div>   
        )
    }
}

const mapStateToProps = (store) => {
  return {
  	product: store.beers,
  	user: store.user
  }
}
const mapDispatchToProps = {
	loadBeers
}

export default connect(mapStateToProps, mapDispatchToProps)(AddBeer);
