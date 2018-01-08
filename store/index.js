import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistCombineReducers } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import reducers from '../reducers';
//NEW
const config = {
 key: 'root',
 storage: AsyncStorage,
 // whitelist kommt aus dem combine reducers call
 whitelist: ['likedJobs']
};
// NEW
const reducer = persistCombineReducers(config, reducers);

// const store = createStore(
//   reducers,
//   {},
//   compose(
//     applyMiddleware(thunk),
//     autoRehydrate()
//   )
// );
// persistStore(store, { storage: AsyncStorage, whitelist: ['likedJobs'] });
//
// export default store;

export default function configurationStore(initialState = {}) {
const store = createStore(
  reducer,
  initialState,
  applyMiddleware(thunk),
);
const persistor = persistStore(store);
 return { persistor, store };
}
