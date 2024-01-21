import { findIndex, get } from "lodash";
import ls from "localstorage-slim";

const initialState = {
  comments: [],
};

const set_comments = "comments/set_comments";
export const setCommentsAction = (comments) => {
  return {
    type: set_comments,
    comments,
  };
};

const add_comment = "comments/add_comments";
export const addActivityAction = (comment) => {
  return {
    type: add_comment,
    comment,
  };
};

const remove_comment = "comments/remove_comment";
export const removeActivityAction = (id) => {
  return {
    type: remove_comment,
    id,
  };
};

const replace_comment = "comments/replace_comment";
export const replaceActivityAction = (comment) => {
  return {
    type: replace_comment,
    comment,
  };
};
export const commentStateSelector = (state) =>
  get(state, "commmentReducer.comments");

export const commmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case set_comments: {
      const { comments } = action;
      return {
        comments,
      };
    }
    case add_comment: {
      const { comment } = action;
      const { comments } = state;
      return {
        comments: [...comments, comment],
      };
    }
    case remove_comment: {
      const { id } = action;
      const { comments } = state;
      return {
        comments: comments.filter(({ id: comId }) => comId !== id),
      };
    }
    case replace_comment: {
      const { comment } = action;
      const { comments } = state;
      var index = findIndex(comments, { id: comment.id });
      comments.splice(index, 1, comment);
      return {
        comments: [...comments],
      };
    }
    default:
      return state;
  }
};
