import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper';
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';

const locationHelper = locationHelperBuilder({});

// Wrapper to check if the user is authenticated
export const userIsAuthenticated = connectedRouterRedirect({
    authenticatedSelector: (state) => state.user.isLoggedIn,
    wrapperDisplayName: 'UserIsAuthenticated',
    redirectPath: '/login',
});

// Wrapper to check if the user is not authenticated
export const userIsNotAuthenticated = connectedRouterRedirect({
    authenticatedSelector: (state) => !state.user.isLoggedIn,
    wrapperDisplayName: 'UserIsNotAuthenticated',
    redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/',
    allowRedirectBack: false,
});

// Wrapper to check if the user has roleId of R1 or R2
export const userIsAdmin = connectedRouterRedirect({
    authenticatedSelector: (state) =>
        state.user.isLoggedIn && (state.user.userInfo.roleId === 'R1' || state.user.userInfo.roleId === 'R2'),
    wrapperDisplayName: 'UserIsAdmin',
    redirectPath: '/home',
});

// Wrapper to check if the user has roleId of R3
export const userIsNotAdmin = connectedRouterRedirect({
    authenticatedSelector: (state) => state.user.isLoggedIn && state.user.userInfo.roleId === 'R3',
    wrapperDisplayName: 'UserIsNotAdmin',
    redirectPath: '/home',
});

export const userIsAuthenticatedAndAdmin = connectedRouterRedirect({
    authenticatedSelector: (state) =>
        state.user.isLoggedIn && (state.user.userInfo.roleId === 'R1' || state.user.userInfo.roleId === 'R2'),
    wrapperDisplayName: 'UserIsAuthenticatedAndAdmin',
    redirectPath: (state, ownProps) => {
        if (state.user.isLoggedIn) {
            return '/home';
        }
        return '/login';
    },
});
