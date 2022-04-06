import { STAFFS, DEPARTMENTS } from "../shared/staffs"

export const initialState = {
    staffs: STAFFS,
    departments: DEPARTMENTS
};

export const Reducer = (state = initialState, action) => {
    return state;
};
// state = initialState trong ES6 nghia la gan gia tri mac dinh cua state