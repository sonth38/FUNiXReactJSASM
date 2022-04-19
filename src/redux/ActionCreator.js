import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

// Phần STAFF
export const fetchStaff = () => (dispatch) => {

    dispatch(staffsLoading(true));

    return fetch(baseUrl + 'staffs')
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(staffs => dispatch(addStaffs(staffs)))
    .catch(error => dispatch(staffsFailed(error.message)));
}

export const staffsLoading = () => ({
    type: ActionTypes.STAFFS_LOADING
});

export const staffsFailed = (errmess) => ({
    type: ActionTypes.STAFFS_FAILED,
    payload: errmess
});

export const addStaffs = (staffs) => ({
    type: ActionTypes.ADD_STAFFS,
    payload: staffs
});

// Phần Department
export const fetchDepart = () => (dispatch) => {

  dispatch(departLoading(true));

  return fetch(baseUrl + 'departments')
  .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
    error => {
          var errmess = new Error(error.message);
          throw errmess;
    })
  .then(response => response.json())
  .then(depart => dispatch(addDepart(depart)))
  .catch(error => dispatch(departFailed(error.message)));
}

export const departLoading = () => ({
  type: ActionTypes.DEPARTMENT_LOADING
});

export const departFailed = (errmess) => ({
  type: ActionTypes.DEPARTMENT_FAILED,
  payload: errmess
});

export const addDepart = (depart) => ({
  type: ActionTypes.ADD_DEPARTMENT,
  payload: depart
});