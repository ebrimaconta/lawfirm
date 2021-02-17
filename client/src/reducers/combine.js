import { combineReducers } from 'redux';

import submitted from './Reducers';

const allReducers = combineReducers({
    submitted: submitted,
});

export default allReducers;