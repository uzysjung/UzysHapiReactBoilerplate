
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
// import { reducer as formReducer } from 'redux-form';
import reducers from '../reducers';
// import {persistStore, autoRehydrate} from 'redux-persist'

export default function configureStore(browserHistory, initialState) {

  const baseHistory = browserHistory;
  const routingMiddleware = routerMiddleware(baseHistory);
  const reducer = combineReducers(Object.assign({}, reducers, {
    routing : routerReducer,
    // form : formReducer
  }));
  const enhancer = compose(
      applyMiddleware(routingMiddleware),
      applyMiddleware(thunk),
      // autoRehydrate(),
      // Middleware you want to use in development:
      window.devToolsExtension ? window.devToolsExtension() : f => f //add support for Redux dev tools
  )


  let store = createStore(reducer, initialState, enhancer);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
      module.hot.accept('../reducers', () => {
        const nextReducer = require('../reducers').default;
        store.replaceReducer(nextReducer);
    });
  }
  // persistStore(store);
  return store;
}
