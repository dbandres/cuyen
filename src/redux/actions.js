import axios from "axios";
import { API_URL, token } from "../api";
export const LOGIN_AUTH = "LOGIN_AUTH";
export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const GET_ALL_CONTRATO = "GET_ALL_CONTRATO";
export const GET_ALL_POST = "GET_ALL_POST";
export const GET_ALL_EMOJIS = "GET_ALL_EMOJIS";
export const GET_ALL_INICIO_ORDER = "GET_ALL_INICIO_ORDER";


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

export function getAllContratos(){
	try {
		return async function(dispatch){
			let response = await axios.get(`${API_URL}/contrato`,
			{
				headers:{
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

export function getAllPost(contrato){
	try {
		return async function(dispatch){
			let response = await axios.get(`${API_URL}/muro/${contrato}`,
			{
				headers:{
					'x-access-token': `${token}`,
					"Content-Type": "application/json",
				}
			})
			return dispatch({
				type: GET_ALL_POST,
				payload: response.data
			})
		}
	} catch (error) {
		console.log('Error de Axios:', error);
	}
}

export function getAllEmojis(){
	try {
		return async function(dispatch){
			let response = await axios.get(`${API_URL}/emoji`,
			{
				headers:{
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

export function getAllInicioOrder(){
	try {
		return async function(dispatch){
			let response = await axios.get(`${API_URL}/inicio/order`,
			{
				headers:{
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