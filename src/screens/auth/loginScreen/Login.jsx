import { useContext } from "react";
import { useDispatch, } from "react-redux";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, StatusBar, Image, Platform } from "react-native";
import { useForm } from "react-hook-form";
import { ButtonCustom } from "../../../components/ButtomCustom";
import { UserContext } from "../../../context/UserContext";
import { loginAuth } from "../../../redux/actions";
import { InputLogin } from "./InputLogin";
import LinearGradient from "react-native-linear-gradient";
import { ContainerWithBackground } from "../../ContainerWithBackground";

const height = Dimensions.get("screen").height

export default function Login({ navigation }) {

	const dispatch = useDispatch()
	const { setUserData } = useContext(UserContext)
	const { control, handleSubmit, setValue } = useForm()

	function authentication(data) {
		// dispatch(loginAuth(data.user, data.userpassword))
		// 	.then((response) => {
		// 		if (response.payload.status === 200) {
		// 			// accedo a la respuesta de la acción
		// 			console.log(JSON.stringify(response.payload.data, null, 3))
		// 			setUserData({
		// 				jwt: response.payload.data.token,
		// 				nombre: response.payload.data.usuario.nombre,
		// 				apellido: response.payload.data.usuario.apellido,
		// 				email: response.payload.data.usuario.email,
		// 				usuario: response.payload.data.usuario.usuario,
		// 				telefono: response.payload.data.usuario.telefono,
		// 			})
		// 			navigation.navigate("landing")
		// 		}
		// 	})
		// 	.catch((error) => {
		// 		// Manejo los errores que puedan ocurrir en la acción loginAuth
		// 		console.log("Error, datos Incorrectos", error);
		// 	});
		navigation.navigate("landing")
	}

	return (
		<ContainerWithBackground>
			<View style={{ height: 450, width: "100%", alignItems: "center" }}>
				<View style={{ height: "100%", width: "90%", justifyContent: "center", top: 110 }}>
					<InputLogin
						control={control}
						placeholder="DNI"
						name="dniUser"
						numeric="numeric"
						secureTextEntry={true}
					/>
					<InputLogin
						control={control}
						placeholder="Contraseña"
						name="passUser"
						numeric="numeric"
						secureTextEntry={true}
					/>
					<View style={{ top: 50 }}>
						<View style={{ height: "22%", width: "100%" }}>
							<ButtonCustom
								text="Ingresar"
								color="#FF3D00"
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