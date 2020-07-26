import {
  UPDATE_NOTIFICATION_BEGIN,
  UPDATE_NOTIFICATION_SUCCESS,
  UPDATE_NOTIFICATION_FAIL,
} from "../action/notifictionAction";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_NOTIFICATION_BEGIN:
      return {
        loading: true,
        error: null,
      };
    case UPDATE_NOTIFICATION_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
      };
    case UPDATE_NOTIFICATION_FAIL:
      return {
        loading: false,
        error: action.payload.error.response.data,
      };
    default:
      return state;
  }
};
