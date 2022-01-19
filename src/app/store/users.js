import { createSlice } from '@reduxjs/toolkit';
import userService from '../services/user.service';

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
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
    },
});

const { actions, reducer: usersReducer } = usersSlice;
const { usersRequested, usersRecived, usersRequestedFailed } = actions;

export const loadUsersList = () => async (dispatch, getState) => {
    dispatch(usersRequested());
    try {
        const { content } = await userService.fetchAll();
        dispatch(usersRecived(content));
    } catch (error) {
        dispatch(usersRequestedFailed(error.message));
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
