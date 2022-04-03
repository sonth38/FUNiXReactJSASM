import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';

// Tạo ra 1 hằng số để nhận giá trị ban đầu state
export const initialState = {
    dishes: DISHES,
    promotions: PROMOTIONS,
    comments: COMMENTS,
    leader: LEADERS
};

// Tạo ra 1 reudecer đầu tiên để nhận state hiện tại
//  và kèm theo 1 hành đông (action)
export const Reducer = (state = initialState, action ) => {
    return state;
};
