import { LOGIN_AUTH, SET_CURRENT_USER, GET_ALL_CONTRATO} from "./actions";


const initialState = {
  loginStaus: "",
  currentUser: "",
  allContratos: []
}

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_AUTH:
      return {
        ...state,
        loginStaus: action.payload
      }
    case SET_CURRENT_USER:
      return{
        ...state,
        currentUser: action.payload
      }
    case GET_ALL_CONTRATO:
      return{
        ...state,
        allContratos: action.payload
      }
    default:
      return state
  }
}
export default rootReducer;