import { combineReducers } from 'redux';

import filtersReducer from './filtersReducer';
import pizzasReducer from './pizzasReducer';
import cartReducer from './cartReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  filters: filtersReducer,
  pizzas: pizzasReducer,
  cart: cartReducer,
  auth: authReducer,
});

export default rootReducer;
