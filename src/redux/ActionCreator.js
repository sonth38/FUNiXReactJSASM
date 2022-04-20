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

// Phần Staff Salary
export const fetchSalary = () => (dispatch) => {

  dispatch(salaryLoading(true));

  return fetch(baseUrl + 'staffsSalary')
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
    .then(salary => dispatch(addSalary(salary)))
    .catch(error => dispatch(departSalary(error.message)));
}

export const salaryLoading = () => ({
  type: ActionTypes.SALARY_LOADING
});

export const departSalary = (errmess) => ({
  type: ActionTypes.SALARY_FAILED,
  payload: errmess
});

export const addSalary = (salary) => ({
  type: ActionTypes.ADD_SALARY,
  payload: salary
});

// Phần thêm nhân viên
export const AddStaff = (staff) => ({
  type: ActionTypes.ADD_STAFF,
  payload: staff
});

export const postStaff = (
  id,
  name,
  doB,
  startDate,
  departmentId,
  salaryScale,
  annualLeave,
  overTime,
  image
) => (dispatch) => {
  const newStaff = {
    id: id,
    name: name,
    doB: doB,
    startDate: startDate,
    departmentId: departmentId,
    salaryScale: salaryScale,
    annualLeave: annualLeave,
    overTime: overTime,
    image: image
  };

  return fetch(baseUrl + 'staffs', {
    method: "POST",
    body: JSON.stringify(newStaff),
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "same-origin"
  })
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
        throw error;
  })
.then(response => response.json())
.then(response => dispatch(AddStaff(response)))
.catch(error =>  { console.log('post staff', error.message); alert('Your staff could not be posted\nError: '+error.message); });
};