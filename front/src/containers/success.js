import React from 'react';
import {Link} from 'react-router-dom';
import {cleanBasket} from "../actions/basket/basketAction"
import {connect} from 'react-redux';

//Page de succès de la commande
class Success extends React.Component {
    
    componentDidMount(){
        //je supprime le panier du localStorage
        window.localStorage.removeItem('b4y-basket');
        //je supprime le panier du store de redux
        this.props.cleanBasket()
    }
    
    render(){            
        
        return (
            <div>
                <p>La commande a été effectué avec succès</p>
                <Link to="/">Retour</Link>
            </div>
        )
    }
}

const mapStateToProps = (store) => {
  return {
  	cart: store.basket,
  }
}
const mapDispatchToProps = {
	cleanBasket
}

export default connect(mapStateToProps, mapDispatchToProps)(Success);