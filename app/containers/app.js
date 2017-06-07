import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { firebaseConfig } from '../constants';
import firebase from "firebase";
import reducers from '../reducers';
import AppNavigator from '../navigators/AppNavigator';

import Splash from '../components/Splash';

export default class App extends Component {
  constructor(props) {
    super(props);
    // hookup firebase
    this.firebaseRer = firebase.initializeApp(firebaseConfig);
  }
  render() {
    const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
    const store = createStoreWithMiddleware(reducers);
    // added to overcome hotreloading --revise
    if (module.hot) {
        module.hot.accept(() => {
            const nextRootReducer = require('../reducers').default;
            store.replaceReducer(nextRootReducer);
        });
    }

    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}
