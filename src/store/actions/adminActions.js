import allCodeService from '../../services/allCodeService';
import actionTypes from './actionTypes';

export const getRoleStart = () => {
    return async (dispatch, getState) => {
        dispatch({ type: actionTypes.GET_ROLE_START });
        try {
            const res = await allCodeService.readAllCode('ROLE');
            if (res && res.errCode === 0) {
                dispatch(getRoleSuccess(res.data));
            } else {
                dispatch(getRoleFailed());
            }
        } catch (error) {
            dispatch(getRoleFailed());
        }
    };
};

export const getRoleSuccess = (roleArr) => ({
    type: actionTypes.GET_ROLE_SUCCESS,
    roleArr,
});

export const getRoleFailed = () => ({
    type: actionTypes.GET_ROLE_FAILED,
});
