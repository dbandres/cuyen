import axios from "axios";

export const LOGIN_AUTH = "LOGIN_AUTH";
export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const GET_ALL_CONTRATO = "GET_ALL_CONTRATO";

export function loginAuth(usuario, contraseña) {
	console.log(usuario, contraseña)
	try {
		return async function (dispatch) {
			let response = await axios.get(`https://api-usuarios-git-lorena-dufaur-dev.apps.sandbox-m4.g2pi.p1.openshiftapps.com/usuarios/${usuario}/${contraseña}`, {
				headers: {
					'x-access-token': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.t0c3Oss0aMtu_AZCsXNzrms8E7oV6GXQ5ciwNRoidcE`,
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
			let response = await axios.get("https://api-usuarios-git-lorena-dufaur-dev.apps.sandbox-m4.g2pi.p1.openshiftapps.com/contrato",
			{
				headers:{
					'x-access-token': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.t0c3Oss0aMtu_AZCsXNzrms8E7oV6GXQ5ciwNRoidcE`,
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