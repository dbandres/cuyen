import { useContext, useEffect, useState } from "react";
import { useDispatch, } from "react-redux";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, StatusBar, Image, Platform } from "react-native";
import { useForm } from "react-hook-form";
import { ButtonCustom } from "../../../components/ButtomCustom";
import { UserContext } from "../../../context/UserContext";
import { loginAuth } from "../../../redux/actions";
import { InputLogin } from "./InputLogin";
import { ContainerWithBackground } from "../../ContainerWithBackground";
import AwesomeAlert from "react-native-awesome-alerts";
import Auth from "../../../api/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const height = Dimensions.get("screen").height

export default function Login({ navigation }) {

	const dispatch = useDispatch()
	const { setUserData } = useContext(UserContext)
	const [inputValue, setInputValue] = useState(false)
	const [showAlert, setShowAlert] = useState(false)
	const [showAlert2, setShowAlert2] = useState(false)
	const { control, handleSubmit, watch, trigger } = useForm()

	const showAlerts = (show, setShow, titulo, msg, text) => {
		return (
			<AwesomeAlert
				show={show}
				showProgress={false}
				title={titulo}
				message={msg}
				closeOnTouchOutside={true}
				closeOnHardwareBackPress={false}
				showConfirmButton={true}
				confirmText={text}
				confirmButtonColor="#DD6B55"
				onConfirmPressed={() => setShow(false)}
			/>
		);
	}

	const getAlert = () => {
		return (
			<AwesomeAlert
				show={showAlert2}
				showProgress={true}
				progressColor="black"
				progressSize={50}
				closeOnTouchOutside={false}
			/>
		)
	}

	function authentication(data) {
		setShowAlert2(true)
		dispatch(loginAuth(data.dniUser, data.passUser))
			.then((response) => {
				if (response.payload.status === 200) {
					// accedo a la respuesta de la acción
					//console.log(JSON.stringify(response.payload.data, null, 3))
					console.log(response.payload.data.usuario.id);
					setUserData({
						jwt: response.payload.data.token,
						nombre: response.payload.data.usuario.nombre,
						apellido: response.payload.data.usuario.apellido,
						email: response.payload.data.usuario.email,
						usuario: response.payload.data.usuario.usuario,
						contrato: response.payload.data.usuario.contrato,
						rol: response.payload.data.usuario.rol,
						id: response.payload.data.usuario.id
					})
					AsyncStorage.setItem("userStorage", JSON.stringify(response.payload.data))
					Auth.signIn(response.payload.data.usuario.email, response.payload.data.usuario.password)
					setShowAlert2(false)
					// navigation.navigate("landing")
				}
			})
			.catch((error) => {
				setShowAlert2(false)
				// Manejo los errores que puedan ocurrir en la acción loginAuth
				console.log("Error, datos Incorrectos", error);
				setShowAlert(true)
			});
		// navigation.navigate("landing")
	}

	const watchControl =()=>{
		const dniValue = watch("dniUser");
		const passValue = watch("passUser")
		if(dniValue && passValue){
			setInputValue(true)
		}
		else{
			setInputValue(false)
		}
	}

	useEffect(() => {
		watchControl()
	}, [watch("dniUser"), watch("passUser")])

	return (
		<ContainerWithBackground>
			<View style={{ height: 450, width: "100%", alignItems: "center" }}>
				<View style={{ height: "100%", width: "90%", justifyContent: "center", top: 110 }}>
					<InputLogin
						control={control}
						placeholder="DNI"
						name="dniUser"
						numeric="numeric"
						trigger={trigger}
						secureTextEntry={true}
					/>
					<InputLogin
						control={control}
						placeholder="Contraseña"
						name="passUser"
						numeric="numeric"
						trigger={trigger}
						secureTextEntry={true}
					/>
					<View style={{ top: 50 }}>
						<View style={{ height: "22%", width: "100%" }}>
							<ButtonCustom
								text="Ingresar"
								color={inputValue !== false ? "#FF3D00" : "#CDD1DF"}
								disabled={inputValue !== false ? false : true}
								onPress={handleSubmit(authentication)}
							/>
						</View>
						<View style={{ height: "22%", marginTop: "2%", width: "100%", borderColor: "#3462BF", borderWidth: 1, borderRadius: 10 }}>
							<ButtonCustom
								text="Registrarse"
								color="#FFFFFF"
								register={true}
								onPress={() => { navigation.navigate("register") }}
							/>
						</View>
						<View style={{ height: "10%", display: "flex", justifyContent: "center", alignItems: "center" }}>
							<TouchableOpacity onPress={() => { navigation.navigate("forgotPass") }}>
								<Text style={{ textDecorationLine: "underline", color: "#949AAF", fontWeight: "400", fontSize: 12 }}>
									Olvidé mi contraseña
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</View>
			{showAlerts(showAlert, setShowAlert, "Error!", "Es posible que tus datos sean incorrectos, verifícalos", "Ok")}
			{showAlert2 ? getAlert() : null}
		</ContainerWithBackground>

	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		display: "flex",
		alignItems: "center",
	},
	text: {
		color: "black",
		fontSize: 25,
		fontWeight: "bold"
	},
	gradient: {
		flex: 1,
		width: "100%"
	},
	androidShadow: {
		elevation: 5, // Ajusta este valor según tu preferencia
		height: '28%',
		width: '85%',
		backgroundColor: '#FFFFFF',
		position: 'absolute',
		top: -100,
		borderRadius: 10,
		alignItems: "center",
		justifyContent: "center"
	},
	iosShadow: {
		shadowColor: 'black',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25, // Ajusta este valor según tu preferencia
		shadowRadius: 4, // Ajusta este valor según tu preferencia
		height: '32%',
		width: '85%',
		backgroundColor: 'red',
		position: 'absolute',
		top: -100,
		borderRadius: 10,
		alignItems: "center",
		justifyContent: "center"
	},
})