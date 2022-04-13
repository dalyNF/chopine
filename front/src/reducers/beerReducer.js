import {LOAD_BEERS} from '../actions/beer/actions-types';

//on initialise un objet avec une propriété beers qui est un tableau vide
const initialState = {
    beers: []
}

export default function BeerReducer(state = initialState, action) {
    switch(action.type) {
        case LOAD_BEERS:
            return {beers: action.payload}
        // break;
        
        default:
            return state;
        // break;
    }
    
    // return state;
}