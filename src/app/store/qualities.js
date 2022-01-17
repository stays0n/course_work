import { createSlice } from '@reduxjs/toolkit';
import qualityService from '../services/quality.service';

const qualitiesSlice = createSlice({
    name: 'qualities',
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
    },
    reducers: {
        qualitiesRequested: (state, action) => {
            state.isLoading = true;
        },
        qualitiesRecived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        qualitiesRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
    },
});

const { actions, reducer: qualitiesReducer } = qualitiesSlice;
const { qualitiesRequested, qualitiesRecived, qualitiesRequestFailed } =
    actions;

export const loadQualitiesList = () => async (dispatch) => {
    dispatch(qualitiesRequested());
    try {
        const { content } = await qualityService.fetchAll();
        dispatch(qualitiesRecived(content));
    } catch (error) {
        dispatch(qualitiesRequestFailed(error.message));
    }
};

export default qualitiesReducer;
