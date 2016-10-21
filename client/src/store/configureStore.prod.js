import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk';
import reducers from '../reducers';

export default function configureStore(browserHistory,initialState) {

  const baseHistory = browserHistory;
  const routingMiddleware = routerMiddleware(baseHistory);
  const reducer = combineReducers(Object.assign({}, reducers, {
    routing: routerReducer,
    form : formReducer

  }));
  const enhancer = compose(
      // Middleware you want to use in development:
      applyMiddleware(routingMiddleware),
      applyMiddleware(thunk),
      // autoRehydrate(),
      window.devToolsExtension ? window.devToolsExtension() : f => f //add support for Redux dev tools
  );


  let store = createStore(reducer, initialState, enhancer);
  // persistStore(store);

  return store;
}
