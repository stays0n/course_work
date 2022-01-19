import { createAction, createSlice } from '@reduxjs/toolkit';
import localStorageService from '../services/localStorage.service';
import authService from '../services/auth.service';
import userService from '../services/user.service';

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        auth: null,
        isLoggedIn: false,
    },
    reducers: {
        usersRequested(state, action) {
            state.isLoading = true;
        },
        usersRecived(state, action) {
            state.entities = action.payload;
            state.isLoading = false;
        },
        usersRequestedFailed(state, action) {
            state.error = action.payload;
            state.isLoading = false;
        },
        authRequestSuccess(state, action) {
            state.auth = { ...action.payload, isLoggedIn: true };
        },
        authRequestFailed(state, action) {
            state.error = action.payload;
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
} = actions;

const authRequested = createAction('users/authRequested');

export const loadUsersList = () => async (dispatch, getState) => {
    dispatch(usersRequested());
    try {
        const { content } = await userService.fetchAll();
        dispatch(usersRecived(content));
    } catch (error) {
        dispatch(usersRequestedFailed(error.message));
    }
};
export const signUp =
    ({ email, password, ...rest }) =>
    async (dispatch, getState) => {
        dispatch(authRequested());
        try {
            const data = await authService.register({ email, password });
            localStorageService.setTokens(data);
            dispatch(authRequestSuccess({ userId: data.localId }));
        } catch (error) {
            dispatch(authRequestFailed(error.message));
        }
    };

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

export default usersReducer;
