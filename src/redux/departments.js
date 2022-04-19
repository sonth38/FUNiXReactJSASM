import * as ActionTypes from './ActionTypes';

export const Depart = (state = {
    isLoading: true,
    errMess: null,
    depart: []
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_DEPARTMENT:
            return {
                ...state,
                isLoading: false,
                errMess: null,
                depart: action.payload
            };

        case ActionTypes.DEPARTMENT_LOADING:
            return {
                ...state,
                isLoading: true,
                errMess: null,
                depart: [] 
            };

        case ActionTypes.DEPARTMENT_FAILED:
            return {
                ...state,
                isLoading: false,
                errMess: action.payload
            };

        default:
            return state;
    }
};