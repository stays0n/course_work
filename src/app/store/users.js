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
function createUser(payload) {
    return async (dispatch, getState) => {
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
