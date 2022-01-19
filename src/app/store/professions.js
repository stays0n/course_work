import isOutdated from '../utils/isOutdate';
import { createSlice } from '@reduxjs/toolkit';
import professionService from '../services/profession.service';

const professionSlice = createSlice({
    name: 'professions',
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null,
    },
    reducers: {
        professionsRequested(state, action) {
            state.isLoading = true;
        },
        professionsRecived(state, action) {
            state.entities = action.payload;
            state.lastFetch = Date.now();
            state.isLoading = false;
        },
        professionsRequestedFailed(state, action) {
            state.error = action.payload;
            state.isLoading = false;
        },
    },
});

const { actions, reducer: professionReducer } = professionSlice;
const { professionsRequested, professionsRecived, professionsRequestedFailed } =
    actions;

export const loadProfessionsList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().professions;
    if (isOutdated(lastFetch)) {
        dispatch(professionsRequested());
        try {
            const { content } = await professionService.fetchAll();
            dispatch(professionsRecived(content));
        } catch (error) {
            dispatch(professionsRequestedFailed(error.message));
        }
    }
};

export const getProfessions = () => (state) => state.professions.entities;
export const getProfessionsLoadingStatus = () => (state) =>
    state.professions.isLoading;
export const getProfessionById = (professionId) => (state) => {
    if (state.professions.entities) {
        let profession;
        for (const prof of state.professions.entities) {
            if (prof._id === professionId) {
                profession = prof;
                break;
            }
        }
        return profession;
    }
    return {};
};

export default professionReducer;
