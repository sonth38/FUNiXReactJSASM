import {combineReducers, createStore, applyMiddleware} from 'redux';
import { Staffs } from './staffs'
import { Departments } from './departments'
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            Staffs: Staffs,
            depart: Departments
        }),
        applyMiddleware(thunk, logger)
    );
    return store;
}