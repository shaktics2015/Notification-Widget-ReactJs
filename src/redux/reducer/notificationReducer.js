import {
  GET_NOTIFICATION_BEGIN,
  GET_NOTIFICATION_SUCCESS,
  GET_NOTIFICATION_FAIL,
} from "../action/notifictionAction";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_NOTIFICATION_BEGIN:
      return {
        loading: true,
        error: null,
      };
    case GET_NOTIFICATION_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
      };
    case GET_NOTIFICATION_FAIL:
      return {
        loading: false,
        error: action.payload.error.response.data,
      };
    default:
      return state;
  }
};
