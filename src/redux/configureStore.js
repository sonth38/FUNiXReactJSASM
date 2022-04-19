import {combineReducers, createStore, applyMiddleware} from 'redux';
import { Staffs } from './staffs'
import { Depart } from './departments'
import { Salary } from './staffSalary'
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            staffs: Staffs,
            depart: Depart,
            salary: Salary
        }),
        applyMiddleware(thunk, logger)
    );
    return store;
}
