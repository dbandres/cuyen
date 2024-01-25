import { LOGIN_AUTH, SET_CURRENT_USER, GET_ALL_CONTRATO, GET_ALL_POST, GET_ALL_EMOJIS, GET_ALL_INICIO_ORDER, GET_ALL_TEXTO_ORDER, GET_ALL_COLEGIOS_X_VIAJE, GET_ALL_PASAJEROS_X_COLEGIO, GET_ALL_PASAJEROS_X_COLEGIO_FILTER, GET_ITINERARIO, GET_DESTINO } from "./actions";


const initialState = {
  loginStaus: "",
  currentUser: "",
  allContratos: [],
  allPost: [],
  allEmojis: [],
  allInicioOrder: [],
  allTextoOrder: [],
  colegiosPorViaje: [],
  pasajerosPorColegio: [],
  pasajeroPorColegioFilter: [],
  itinerario: [],
  destino: [],
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
    case GET_ALL_INICIO_ORDER:
      return {
        ...state,
        allInicioOrder: action.payload
      }
    case GET_ALL_TEXTO_ORDER:
      return {
        ...state,
        allTextoOrder: action.payload
      }
    case GET_ALL_COLEGIOS_X_VIAJE:
      return {
        ...state,
        colegiosPorViaje: action.payload
      }
    case GET_ALL_PASAJEROS_X_COLEGIO:
      return {
        ...state,
        pasajerosPorColegio: action.payload
      }
    case GET_ALL_PASAJEROS_X_COLEGIO_FILTER:
      // Combina el estado actual con la carga útil de la acción
      const nuevoPasajeroPorColegioFilter = [...state.pasajeroPorColegioFilter, ...action.payload];

      // Utilizar filter para eliminar duplicados por ID
      const pasajeroSinDuplicados = nuevoPasajeroPorColegioFilter.filter(
        (elemento, indice, array) =>
          array.findIndex(e => e.id === elemento.id) === indice
      );
        console.log(JSON.stringify(pasajeroSinDuplicados, null, 3));
      // Actualizar el estado con el array sin duplicados
      return {
        ...state,
        pasajeroPorColegioFilter: pasajeroSinDuplicados,
      };
      case GET_ITINERARIO:
        return {
          ...state,
          itinerario: action.payload
        }
      case GET_DESTINO:
        return{
          ...state,
          destino: action.payload
        }
    default:
      return state
  }
}
export default rootReducer;