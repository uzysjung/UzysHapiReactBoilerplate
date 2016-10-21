/**
 * Created by uzysjung on 2016. 8. 19..
 */
import { browserHistory  } from 'react-router';
import configureStore from './configureStore';
import { syncHistoryWithStore } from 'react-router-redux'

export const store = configureStore(browserHistory);
export const history = syncHistoryWithStore(browserHistory, store);
