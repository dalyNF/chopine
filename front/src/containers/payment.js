import React from 'react';
import CheckoutForm from '../components/checkout-form'
import {loadStripe} from '@stripe/stripe-js';//pour charger la librairie de paiement de stripe sur notre compte stripe
import {Elements, ElementsConsumer} from '@stripe/react-stripe-js';//containers qui permettent de sécuriser l'environnement des paiements au moment des promesses
// page de paiement
class Payment extends React.Component {
    // constructor(props){
	// 	super(props)
	// }
	
	InjectedCheckoutForm = ()=>{
	    // chargement du formulaire de carte bleue
		return (
    	    <ElementsConsumer>
    			    {({stripe, elements}) => (
    			      <CheckoutForm orderId={this.props.params.orderId} stripe={stripe} elements={elements} />
    			    )}
    		</ElementsConsumer>
	    ) 
	}
	
	render(){
		const stripePromise = loadStripe('pk_test_lX9nV9J3Smc5ybLDLim9bpx2');

		return (
			<div>
				<h2>Paiement</h2>
				<Elements stripe={stripePromise}>
				    {this.InjectedCheckoutForm()}
				</Elements>
			</div>
		)
	}
    
    
}


export default Payment;