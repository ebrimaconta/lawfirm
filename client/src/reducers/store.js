import { createStore } from 'redux';

import allReducers from './combine';

const store = createStore(allReducers);

const getStore = store.getState();
export { store, getStore };