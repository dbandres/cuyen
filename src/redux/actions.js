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


export function loginAuth(usuario, contraseña) {
	console.log(usuario, contraseña)
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
	console.log("actions: ", travelId);
	try {
		return async function (dispatch) {
			try {
				let response = await axios.get(`${API_URL}/muro/get/${travelId}`, {
					headers: {
						'x-access-token': `${token}`,
						'Content-Type': 'application/json',
					},
				});
				console.log(response.data);
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

export function getAllPasajerosXColegio(nums) {
	return async function (dispatch) {
		try {
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