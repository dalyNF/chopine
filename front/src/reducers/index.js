import { combineReducers } from "redux";
import UserReducer from './userReducer';
import BeerReducer from './beerReducer';
import BasketReducer from './basketReducer';

const rootReducer = combineReducers({
    user: UserReducer,
    basket: BasketReducer,
    beers: BeerReducer
    
});

export default rootReducer;