import { createAction, createSlice } from '@reduxjs/toolkit';
import commentService from '../services/comment.service';
import { nanoid } from 'nanoid';

const commentsSlice = createSlice({
    name: 'comments',
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        deleteCommentId: null,
    },
    reducers: {
        commentsRequested(state, action) {
            state.isLoading = true;
        },
        commentsRecived(state, action) {
            state.entities = action.payload;
            state.isLoading = false;
        },
        commentsRequestedFailed(state, action) {
            state.error = action.payload;
            state.isLoading = false;
        },
        commentCreateSuccess(state, action) {
            state.entities.push(action.payload);
        },
        commentDeleteRequested(state, action) {
            state.deleteCommentId = action.payload;
        },
        commentDeleteSuccess(state, action) {
            if (action.payload === null) {
                state.entities = state.entities.filter(
                    (comment) => comment._id !== state.deleteCommentId,
                );
                state.deleteCommentId = null;
            }
        },
        commentDeleteFailed(state, action) {
            state.deleteCommentId = null;
        },
    },
});

const { actions, reducer: commentsReducer } = commentsSlice;
const {
    commentsRequested,
    commentsRecived,
    commentsRequestedFailed,
    commentCreateSuccess,
    commentDeleteRequested,
    commentDeleteSuccess,
    commentDeleteFailed,
} = actions;

const commentCreateRequested = createAction('comments/commentCreateRequested');
const commentCreateFailed = createAction('comments/commentCreateFailed');

export const removeComment = (commentId) => async (dispatch, getState) => {
    dispatch(commentDeleteRequested(commentId));
    try {
        const { content } = await commentService.removeComment(commentId);
        dispatch(commentDeleteSuccess(content));
    } catch (error) {
        dispatch(commentDeleteFailed(error.message));
    }
};

export const createComment = (payload) => async (dispatch, getState) => {
    dispatch(commentCreateRequested());
    const comment = {
        ...payload,
        _id: nanoid(),
        created_at: Date.now().toString(),
    };
    try {
        const { content } = await commentService.createComment(comment);
        dispatch(commentCreateSuccess(content));
    } catch (error) {
        dispatch(commentCreateFailed(error.message));
    }
};

export const loadCommentsList = (userId) => async (dispatch, getState) => {
    dispatch(commentsRequested());
    try {
        const { content } = await commentService.getComments(userId);
        dispatch(commentsRecived(content));
    } catch (error) {
        dispatch(commentsRequestedFailed(error.message));
    }
};

export const getComments = () => (state) => state.comments.entities;
export const getCommentsLoadingStatus = () => (state) =>
    state.comments.isLoading;

export default commentsReducer;
