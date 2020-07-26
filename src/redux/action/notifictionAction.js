import { jsonServerCall } from "../../modules/serverCall";

export const getNotifications = (route) => (dispatch) => {
  dispatch({
    type: GET_NOTIFICATION_BEGIN,
  });
  return jsonServerCall({
    method: "GET",
    url: `/notification/${route}`,
  })
    .then((res) => {
      dispatch({
        type: GET_NOTIFICATION_SUCCESS,
        payload: res,
      });
      return res;
    })
    .catch((error) => {
      dispatch({
        type: GET_NOTIFICATION_FAIL,
        payload: { error },
      });
      return error;
    });
};

export const markAllRead = () => (dispatch) => {
  dispatch({
    type: UPDATE_NOTIFICATION_BEGIN,
  });
  return jsonServerCall({
    method: "PUT",
    url: `/mark/all/notification/seen`,
  })
    .then((res) => {
      dispatch({
        type: UPDATE_NOTIFICATION_SUCCESS,
        payload: res,
      });
      return res;
    })
    .catch((error) => {
      dispatch({
        type: UPDATE_NOTIFICATION_FAIL,
        payload: { error },
      });
      return error;
    });
};

export const toggleNotificationState = (id, state) => (dispatch) => {
  dispatch({
    type: UPDATE_NOTIFICATION_BEGIN,
  });
  return jsonServerCall({
    method: "PUT",
    url: `/toggle/notification/${id}/${state}`,
  })
    .then((res) => {
      dispatch({
        type: UPDATE_NOTIFICATION_SUCCESS,
        payload: res,
      });
      return res;
    })
    .catch((error) => {
      dispatch({
        type: UPDATE_NOTIFICATION_FAIL,
        payload: { error },
      });
      return error;
    });
};

export const GET_NOTIFICATION_BEGIN = "GET_NOTIFICATION_BEGIN";
export const GET_NOTIFICATION_SUCCESS = "GET_NOTIFICATION_SUCCESS";
export const GET_NOTIFICATION_FAIL = "GET_NOTIFICATION_FAIL";

export const UPDATE_NOTIFICATION_BEGIN = "UPDATE_NOTIFICATION_BEGIN";
export const UPDATE_NOTIFICATION_SUCCESS = "UPDATE_NOTIFICATION_SUCCESS";
export const UPDATE_NOTIFICATION_FAIL = "UPDATE_NOTIFICATION_FAIL";
