import {MODIFY_BASKET, CLEAN_BASKET} from '../actions/basket/actions-types';

//on récup le panier dans le localStorage qu'on stock dans une variable lsBasket
let lsBasket = JSON.parse(window.localStorage.getItem('b4y-basket'));
//si lsBasket est null
if(lsBasket === null) {
    //on lui attribut un tableau vide
    lsBasket = []
}
//calcul du montant total du panier (appel de la fonction)
let totalPrice = calculateTotalAmount(lsBasket) 
//on initialise notre state avec le panier et son prix total
const initialState = {
    basket: lsBasket,
    totalPrice: totalPrice
}

function calculateTotalAmount(basket) {
    //on initialise une variable totalPrice à zero
    let totalPrice = 0;
    //boucle qui parcours le panier
    for(let i=0; i < basket.length; i++) {
        //ajout du prix total de chaque produit (quantité * prix) à totalPrice
        let total = parseFloat(basket[i].price) * parseInt(basket[i].quantityInCart);
		totalPrice += total;
    } 
    //on retourne le prix total
    return totalPrice
}

export default function BasketReducer(state = initialState, action) {
    switch(action.type) {
        case MODIFY_BASKET:
            
            let totalPrice = calculateTotalAmount(action.payload);
    		
            return {basket: action.payload, totalPrice: totalPrice}
        // break;
        
        case CLEAN_BASKET:
            console.log('reducer clean', action)
            return {basket: [], totalPrice: 0};
        // break;
        
        default:
            return state;
        // break;
        
    }
   
    // return state;
}