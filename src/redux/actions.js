import axios from "axios";
import { API_URL, token } from "../api";
export const LOGIN_AUTH = "LOGIN_AUTH";
export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const GET_ALL_CONTRATO = "GET_ALL_CONTRATO";
export const GET_ALL_POST = "GET_ALL_POST";
export const GET_ALL_EMOJIS = "GET_ALL_EMOJIS";
export const GET_ALL_INICIO_ORDER = "GET_ALL_INICIO_ORDER";
export const GET_ALL_TEXTO_ORDER = "GET_ALL_TEXTO_ORDER";
export const GET_ALL_COLEGIOS_X_VIAJE = "GET_ALL_COLEGIOS_X_VIAJE";
export const GET_ALL_PASAJEROS_X_COLEGIO = "GET_ALL_PASAJEROS_X_COLEGIO";
export const GET_ALL_PASAJEROS_X_COLEGIO_FILTER = "GET_ALL_PASAJEROS_X_COLEGIO_FILTER";
export const GET_ITINERARIO = "GET_ITINERARIO";
export const GET_DESTINO = "GET_DESTINO";
export const GET_PASAJERO = "GET_PASAJERO";
export const GET_CONTRATO_BY_NUM = "GET_CONTRATO_BY_NUM";
export const GET_HOTEL_BY_NUM = "GET_HOTEL_BY_NUM";
export const VERIFU_USER_DNI = "VERIFU_USER_DNI";
export const GET_ALL_COLEGIOS = "GET_ALL_COLEGIOS";
export const GET_CUOTAS_PASAJERO = "GET_CUOTAS_PASAJERO"
export const GET_CODIGO_BARRA_PASAJERO = "GET_CODIGO_BARRA_PASAJERO"
export const LIMPIAR_DESTINO = "LIMPIAR_DESTINO"
export const SET_CURRENT_CONTRATO = "SET_CURRENT_CONTRATO"


export function loginAuth(usuario, contraseña) {

	try {
		return async function (dispatch) {
			let response = await axios.get(`${API_URL}/usuarios/${usuario}/${contraseña}`, {
				headers: {
					'x-access-token': `${token}`,
					"Content-Type": "application/json",
				}
			})
			return dispatch({
				type: LOGIN_AUTH,
				payload: response
			})
		}
	} catch (error) {
		console.log('Error de Axios:', error);
	}
}

export function CurrentUser(user) {
	console.log(user)
	return {
		type: SET_CURRENT_USER,
		payload: user,
	};
}

export function CurrentContrato(num) {
	console.log('numero de contrato actual: ', num)
	return {
		type: SET_CURRENT_CONTRATO,
		payload: num,
	};
}

export function getAllContratos() {
	try {
		return async function (dispatch) {
			let response = await axios.get(`${API_URL}/contrato`,
				{
					headers: {
						'x-access-token': `${token}`,
						"Content-Type": "application/json",
					}
				})
			return dispatch({
				type: GET_ALL_CONTRATO,
				payload: response.data
			})
		}
	} catch (error) {
		console.log('Error de Axios:', error);
	}
}

export function getAllPost(travelId) {

	try {
		return async function (dispatch) {
			try {
				let response = await axios.get(`${API_URL}/muro/get/${travelId}`, {
					headers: {
						'x-access-token': `${token}`,
						'Content-Type': 'application/json',
					},
				});

				return dispatch({
					type: GET_ALL_POST,
					payload: response.data,
				});
			} catch (error) {
				// Manejar errores aquí si es necesario
				console.error(`Error para travelId ${travelId}:`, error);
				throw error;
			}
		};
	} catch (error) {
		console.log('Error de Axios:', error);
	}
}

export function getAllEmojis() {
	try {
		return async function (dispatch) {
			let response = await axios.get(`${API_URL}/emoji`,
				{
					headers: {
						'x-access-token': `${token}`,
						"Content-Type": "application/json",
					}
				})
			return dispatch({
				type: GET_ALL_EMOJIS,
				payload: response.data
			})
		}
	} catch (error) {
		console.log('Error de Axios:', error);
	}
}

export function getAllColegios() {
	try {
		return async function (dispatch) {
			let response = await axios.get(`${API_URL}/colegios`,
				{
					headers: {
						'x-access-token': `${token}`,
						"Content-Type": "application/json",
					}
				})
			return dispatch({
				type: GET_ALL_COLEGIOS,
				payload: response.data
			})
		}
	} catch (error) {
		console.log('Error de Axios en getAllColegios:', error);
	}
}

export function getAllInicioOrder() {
	try {
		return async function (dispatch) {
			let response = await axios.get(`${API_URL}/inicio/order`,
				{
					headers: {
						'x-access-token': `${token}`,
						"Content-Type": "application/json",
					}
				})
			return dispatch({
				type: GET_ALL_INICIO_ORDER,
				payload: response.data
			})
		}
	} catch (error) {
		console.log('Error de Axios:', error);
	}
}

export function getAllTextoOrder() {
	try {
		return async function (dispatch) {
			let response = await axios.get(`${API_URL}/texto/order`,
				{
					headers: {
						'x-access-token': `${token}`,
						"Content-Type": "application/json",
					}
				})
			return dispatch({
				type: GET_ALL_TEXTO_ORDER,
				payload: response.data
			})
		}
	} catch (error) {
		console.log('Error de Axios:', error);
	}
}

export function getAllColegiosXViaje(num) {
	try {
		return async function (dispatch) {
			let response = await axios.get(`${API_URL}/coordinador/${num}`,
				{
					headers: {
						'x-access-token': `${token}`,
						"Content-Type": "application/json",
					}
				})
			return dispatch({
				type: GET_ALL_COLEGIOS_X_VIAJE,
				payload: response.data
			})
		}
	} catch (error) {
		console.log('Error de Axios getAllColegiosXViaje:', error);
	}
}

export function getAllPasajerosXColegio(data) {
	return async function (dispatch) {
		try {

			let nums;
			nums = data.map((data) => data.num)
			// Crear un array de promesas para cada solicitud individual
			const promesas = nums.map(async (num) => {
				return axios.get(`${API_URL}/pasajero/${num}`, {
					headers: {
						'x-access-token': `${token}`,
						'Content-Type': 'application/json',
					},
				});
			});

			// Esperar a que todas las promesas se completen
			const respuestas = await Promise.all(promesas);
			// Extraer la data de cada respuesta
			const dataCombinada = respuestas.map((respuesta) => respuesta.data);

			// Actualizar el estado de Redux con la data combinada
			dispatch({
				type: GET_ALL_PASAJEROS_X_COLEGIO,
				payload: dataCombinada.flat(),
			});
		} catch (error) {
			console.log('Error de Axios getAllPasajerosXColegio:', error);
		}
	};
}

export function getAllPasajerosXColegioFilter(num) {
	return async function (dispatch) {
		try {
			const response = await axios.get(`${API_URL}/pasajero/${num}`, {
				headers: {
					'x-access-token': `${token}`,
					'Content-Type': 'application/json',
				},
			});

			// Filtrar la data por 'presente'
			const pasajerosFiltrados = response.data.filter((pasajero) => pasajero.presente === "true");

			return dispatch({
				type: GET_ALL_PASAJEROS_X_COLEGIO_FILTER,
				payload: pasajerosFiltrados,
			});
		} catch (error) {
			console.log('Error de Axios getAllPasajerosXColegioFilter:', error)
		}
	};
}

export function getItinerario(num) {
	return async function (dispatch) {
		try {
			const response = await axios.get(`/itinerario/contract/${num}`, {
				headers: {
					'x-access-token': `${token}`,
					'Content-Type': 'application/json',
				}
			})
			return dispatch({
				type: GET_ITINERARIO,
				payload: response.data
			})
		} catch (error) {
			console.log('Error de Axios getItinerario:', error)
		}
	}
}

export function getDestino(num) {
	console.log('numero de contrato para destino', num);
	return async function (dispatch) {
		try {
			const response = await axios.get(`/nuevoviaje/${num}`, {
				headers: {
					'x-access-token': `${token}`,
					'Content-Type': 'application/json',
				}
			})
			return dispatch({
				type: GET_DESTINO,
				payload: response.data
			})
		} catch (error) {
			console.log('Error de Axios getDestino:', error)
			dispatch({
				type: GET_DESTINO,
				payload: [],
			});
		}
	}
}

export function cleanDestino() {
	return function (dispatch) {
		dispatch({
			type: LIMPIAR_DESTINO,
			payload: null
		});
	};
}

export function getPasajero(num) {
	return async function (dispatch) {
		try {
			const response = await axios.get(`/pasajero/relation/${num}`, {
				headers: {
					'x-access-token': `${token}`,
					'Content-Type': 'application/json',
				}
			})
			return dispatch({
				type: GET_PASAJERO,
				payload: response.data
			})
		} catch (error) {
			console.log('Error de Axios getPasajero:', error)
		}
	}
}

export function getContratoByNum(num) {
	console.log(num);
	return async function (dispatch) {
		try {
			if (Array.isArray(num)) {
				console.log('El parámetro num es un array');
				// Realizar todas las solicitudes HTTP en paralelo
				const promises = num.map(async (numItem) => {
					return await axios.get(`/contrato/${numItem}`, {
						headers: {
							'x-access-token': `${token}`,
							'Content-Type': 'application/json',
						}
					});
				});

				// Esperar a que todas las solicitudes se completen y obtener las respuestas
				const responses = await Promise.all(promises);

				return dispatch({
					type: GET_CONTRATO_BY_NUM,
					payload: responses.map(response => response.data)
				});
			} else {
				// Si num no es un array, realizar la solicitud HTTP GET normalmente
				const response = await axios.get(`/contrato/${num}`, {
					headers: {
						'x-access-token': `${token}`,
						'Content-Type': 'application/json',
					}
				});

				return dispatch({
					type: GET_CONTRATO_BY_NUM,
					payload: [response.data]
				});
			}
		} catch (error) {
			console.log('Error de Axios getContratoByNum:', error);
		}
	};
}


export function getHotelByNum(num) {
	return async function (dispatch) {
		try {
			const response = await axios.get(`/hoteles/${num}`, {
				headers: {
					'x-access-token': `${token}`,
					'Content-Type': 'application/json',
				}
			})
			return dispatch({
				type: GET_HOTEL_BY_NUM,
				payload: response.data
			})
		} catch (error) {
			console.log('Error de Axios getHotelByNum:', error)
		}
	}
}

export function cleanHotel() {
	return function (dispatch) {
		dispatch({
			type: GET_HOTEL_BY_NUM,
			payload: []
		});
	};
}

export function verifyUserByDni(num) {
	return async function (dispatch) {
		try {
			const response = await axios.get(`/usuarios/verify/${num}`, {
				headers: {
					'x-access-token': `${token}`,
					'Content-Type': 'application/json',
				}
			})
			return dispatch({
				type: VERIFU_USER_DNI,
				payload: response.data
			})
		} catch (error) {
			console.log('Error de Axios getHotelByNum:', error)
		}
	}
}

export function getCuotasPasajero(num, id) {
	return async function (dispatch) {
		try {
			const response = await axios.get(`/cuotas/statusfee/${num}/${id}`, {
				headers: {
					'x-access-token': `${token}`,
					'Content-Type': 'application/json',
				}
			})
			return dispatch({
				type: GET_CUOTAS_PASAJERO,
				payload: response.data
			})
		} catch (error) {
			console.log('Error de Axios getCuotasPasajero:', error)
			// Establecer el estado como null en caso de error
			dispatch({
				type: GET_CUOTAS_PASAJERO,
				payload: null,
			});
		}
	}
}

export function getCodigoBarraPasajero(num, id) {
	return async function (dispatch) {
		try {
			const response = await axios.get(`/cuotas/allfee/${num}/${id}`, {
				headers: {
					'x-access-token': `${token}`,
					'Content-Type': 'application/json',
				}
			})
			return dispatch({
				type: GET_CODIGO_BARRA_PASAJERO,
				payload: response.data
			})
		} catch (error) {
			console.log('Error de Axios getCodigoBarraPasajero:', error)
			// Establecer el estado como null en caso de error
			dispatch({
				type: GET_CODIGO_BARRA_PASAJERO,
				payload: null,
			});
		}
	}
}
