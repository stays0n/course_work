import { createAction, createSlice } from '@reduxjs/toolkit';
import localStorageService from '../services/localStorage.service';
import authService from '../services/auth.service';
import userService from '../services/user.service';
import getRandomInt from '../utils/getRandomInt';
import history from '../utils/history';
import generateAuthError from '../utils/generateAuthError';

const initialState = localStorageService.getAccessToken()
    ? {
          entities: null,
          isLoading: true,
          error: null,
          auth: { userId: localStorageService.getUserId() },
          isLoggedIn: true,
          dataLoaded: false,
      }
    : {
          entities: null,
          isLoading: false,
          error: null,
          auth: null,
          isLoggedIn: false,
          dataLoaded: false,
      };

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        usersRequested(state, action) {
            state.isLoading = true;
        },
        usersRecived(state, action) {
            state.entities = action.payload;
            state.dataLoaded = true;
            state.isLoading = false;
        },
        usersRequestedFailed(state, action) {
            state.error = action.payload;
            state.isLoading = false;
        },
        authRequested(state, action) {
            state.error = null;
        },
        authRequestSuccess(state, action) {
            state.auth = action.payload;
            state.isLoggedIn = true;
        },
        authRequestFailed(state, action) {
            state.error = action.payload;
        },
        userCreated(state, action) {
            state.entities.push(action.payload);
        },
        userLoggedOut(state, action) {
            state.entities = null;
            state.isLoggedIn = false;
            state.auth = null;
            state.dataLoaded = false;
        },
        userUpdated(state, action) {
            state.entities = state.entities.map((user) => {
                if (user._id === action.payload._id) {
                    return action.payload;
                }
                return user;
            });
        },
    },
});

const { actions, reducer: usersReducer } = usersSlice;
const {
    usersRequested,
    usersRecived,
    usersRequestedFailed,
    authRequested,
    authRequestSuccess,
    authRequestFailed,
    userCreated,
    userLoggedOut,
    userUpdated,
} = actions;

const createUserRequested = createAction('users/createUserRequested');
const createUserFailed = createAction('users/createUserFailed');
const updateUserRequested = createAction('users/updateUserRequested');
const updateUserFailed = createAction('users/updateUserFailed');

function createUser(payload) {
    return async function (dispatch, getState) {
        dispatch(createUserRequested());
        try {
            const { content } = await userService.create(payload);
            dispatch(userCreated(content));
            history.push('/users');
        } catch (error) {
            dispatch(createUserFailed(error.message));
        }
    };
}
export function updateUserData({ payload, redirect }) {
    return async function (dispatch, getState) {
        dispatch(updateUserRequested());
        try {
            const { content } = await userService.update(payload);
            dispatch(userUpdated(content));
            history.push(redirect);
        } catch (error) {
            dispatch(updateUserFailed(error.message));
        }
    };
}
export function logOut() {
    return async function (dispatch, redirect) {
        localStorageService.removeAuthData();
        dispatch(userLoggedOut());
        history.push('/');
    };
}
export function signIn({ payload, redirect }) {
    return async function (dispatch, getState) {
        const { email, password } = payload;
        dispatch(authRequested());
        try {
            const data = await authService.login({ email, password });
            localStorageService.setTokens(data);
            dispatch(authRequestSuccess({ userId: data.localId }));
            history.push(redirect);
        } catch (error) {
            const { code, message } = error.response.data.error;
            if (code === 400) {
                const errorMessage = generateAuthError(message);
                dispatch(authRequestFailed(errorMessage));
            } else {
                dispatch(authRequestFailed(error.message));
            }
        }
    };
}
export function signUp({ email, password, ...rest }) {
    return async function (dispatch, getState) {
        dispatch(authRequested());
        try {
            const data = await authService.register({ email, password });
            localStorageService.setTokens(data);
            dispatch(authRequestSuccess({ userId: data.localId }));
            dispatch(
                createUser({
                    _id: data.localId,
                    email,
                    rate: getRandomInt(1, 5),
                    completedMeetings: getRandomInt(0, 200),
                    image: `https://avatars.dicebear.com/api/avataaars/${(
                        Math.random() + 1
                    )
                        .toString(36)
                        .substring(7)}.svg`,
                    ...rest,
                }),
            );
        } catch (error) {
            dispatch(authRequestFailed(error.message));
        }
    };
}
export function loadUsersList() {
    return async function (dispatch, getState) {
        dispatch(usersRequested());
        try {
            const { content } = await userService.fetchAll();
            dispatch(usersRecived(content));
        } catch (error) {
            dispatch(usersRequestedFailed(error.message));
        }
    };
}

export const getUsersList = () => (state) => state.users.entities;
export const getCurrentUserData = () => (state) => {
    return state.users.entities
        ? state.users.entities.find((u) => u._id === state.users.auth.userId)
        : null;
};
export const getUserById = (userId) => (state) => {
    if (state.users.entities) {
        let user;
        for (const u of state.users.entities) {
            if (u._id === userId) {
                user = u;
                break;
            }
        }
        return user;
    }
    return {};
};
export const getIsLoggedIn = () => (state) => state.users.isLoggedIn;
export const getDataStatus = () => (state) => state.users.dataLoaded;
export const getUsersLoadingStatus = () => (state) => state.users.isLoading;
export const getCurrentUserId = () => (state) => state.users.auth.userId;
export const getAuthError = () => (state) => state.users.error;

export default usersReducer;
