import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingRoleArr: false,
    roleArr: [],
};

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ROLE_START:
            return {
                ...state,
                isLoadingRoleArr: true,
            };
        case actionTypes.GET_ROLE_SUCCESS:
            return {
                ...state,
                isLoadingRoleArr: false,
                roleArr: action.roleArr,
            };
        case actionTypes.GET_ROLE_FAILED:
            return {
                ...state,
                isLoadingRoleArr: false,
            };
        default:
            return state;
    }
};

export default adminReducer;
