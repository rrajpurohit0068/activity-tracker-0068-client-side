import { findIndex, get } from "lodash";
import ls from "localstorage-slim";


const initialState = {
  activitys: [],
  expanded_activity: 1,
  update_activity: null,
  duplicate_activity: null,
};

const set_duplicate_activity = "activity/set_duplicate_activity";
export const setDuplicateActivity = (duplicate_activity) => {
  return {
    type: set_duplicate_activity,
    duplicate_activity,
  };
};

const set_update_activity = "activity/set_update_actvity";
export const setUpdateActivity = (update_activity) => {
  return {
    type: set_update_activity,
    update_activity,
  };
};

const set_expanded_activity = "activity/set_expanded";
export const setExpandedActivity = (expanded_activity) => {
  return {
    type: set_expanded_activity,
    expanded_activity,
  };
};

const SET_ACTIVITY = "activity/SET_ACTIVITY";
export const setActivitysAction = (activitys) => {
  return {
    type: SET_ACTIVITY,
    activitys,
  };
};

const ADD_ACTIVITY = "activity/ADD_ACTIVITY";
export const addActivityAction = (activity) => {
  return {
    type: ADD_ACTIVITY,
    activity,
  };
};

const remove_activity = "actvity/remove_activity";
export const removeActivityAction = (id) => {
  return {
    type: remove_activity,
    id,
  };
};

const replace_activity = "activity/replace_activity";
export const replaceActivityAction = (activity) => {
  return {
    type: replace_activity,
    activity,
  };
};

export const activityStateSelector = (state) =>
  get(state, "activityReducer.activitys") || [];
export const expandedActivityStateSelector = (state) =>
  get(state, "activityReducer.expanded_activity");
export const updateActivityStateSelector = (state) =>
  get(state, "activityReducer.update_activity");
export const duplicateActivityStateSelector = (state) =>
  get(state, "activityReducer.duplicate_activity");

export const activityReducer = (state = ls.get('activityReducer') || initialState, action) => {
  
  switch (action.type) {
    case set_duplicate_activity: {
      const { duplicate_activity } = action;
      return {
        ...state,
        duplicate_activity,
      };
    }
    case set_update_activity: {
      const { update_activity } = action;



      return {
        ...state,
        update_activity,
      };
    }
    case set_expanded_activity: {
      const { expanded_activity } = action;
      return {
        ...state,
        expanded_activity,
      };
    }

    case SET_ACTIVITY: {
      const { activitys } = action;
      return {
        ...state,
        activitys,
      };
    }
    case ADD_ACTIVITY: {
      const { activity } = action;
      const { activitys } = state;
      return {
        ...state,
        activitys: [...activitys, activity],
      };
    }
    case remove_activity: {
      const { id } = action;
      const { activitys } = state;
      return {
        ...state,
        activitys: activitys.filter(({ id: actId }) => actId !== id),
      };
    }
    case replace_activity: {
      const { activity } = action;
      const { activitys } = state;
      var index = findIndex(activitys, { id: activity.id });
      const newAct = [...activitys];
      newAct.splice(index, 1, activity);
      return {
        ...state,
        activitys: newAct,
      };
    }
    default:
      return state;
  }
};
