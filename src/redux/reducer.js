import { LOGIN_AUTH, SET_CURRENT_USER, GET_ALL_CONTRATO, GET_ALL_POST, GET_ALL_EMOJIS } from "./actions";


const initialState = {
  loginStaus: "",
  currentUser: "",
  allContratos: [],
  allPost: [],
  allEmojis: []
}

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_AUTH:
      return {
        ...state,
        loginStaus: action.payload
      }
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload
      }
    case GET_ALL_CONTRATO:
      return {
        ...state,
        allContratos: action.payload
      }
    case GET_ALL_POST:
      return {
        ...state,
        allPost: action.payload
      }
    case GET_ALL_EMOJIS:
      return {
        ...state,
        allEmojis: action.payload
      }
    default:
      return state
  }
}
export default rootReducer;