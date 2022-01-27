import { createAction, createSlice } from '@reduxjs/toolkit';
import localStorageService from '../services/localStorage.service';
import authService from '../services/auth.service';
import userService from '../services/user.service';
import getRandomInt from '../utils/getRandomInt';
import history from '../utils/history';

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        auth: null,
        isLoggedIn: false,
        dataLoaded: false,
    },
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
    },
});

const { actions, reducer: usersReducer } = usersSlice;
const {
    usersRequested,
    usersRecived,
    usersRequestedFailed,
    authRequestSuccess,
    authRequestFailed,
    userCreated,
} = actions;

const userAuthRequested = createAction('users/authRequested');
const createUserRequested = createAction('users/createUserRequested');
const createUserFailed = createAction('users/createUserFailed');

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

export function signIn({ payload, redirect }) {
    return async function (dispatch, getState) {
        const { email, password } = payload;
        dispatch(userAuthRequested());
        try {
            const data = await authService.login({ email, password });
            localStorageService.setTokens(data);
            dispatch(authRequestSuccess({ userId: data.localId }));
            history.push(redirect);
        } catch (error) {
            dispatch(authRequestFailed(error.message));
        }
    };
}
export function signUp({ email, password, ...rest }) {
    return async function (dispatch, getState) {
        dispatch(userAuthRequested());
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
export const getCurrentUserId = () => (state) => state.users.auth.userId;

export default usersReducer;
