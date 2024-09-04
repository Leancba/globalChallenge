import { GET_CHATS, GET_USER_DATA } from "./actions/actionTypes";

const initialState = {
  userData: null,
  chats:null,
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_DATA:
      return {
        ...state,
        userData: action.payload,
      };
    case GET_CHATS:
      return {
        ...state,
        chats: action.payload,
      };
    
    default:
      return state;
  }
}
