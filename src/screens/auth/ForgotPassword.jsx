import { View, Text, StyleSheet, Dimensions, ScrollView, Image, StatusBar } from "react-native";
import { CustomInput } from "./registerScreen/CustomInput";
import { useForm } from "react-hook-form";
import { ButtonCustom } from "../../components/ButtomCustom";
import axios from "axios";
import AwesomeAlert from "react-native-awesome-alerts";
import { useEffect, useState } from "react";
import LinearGradient from "react-native-linear-gradient";
import { InputLogin } from "./loginScreen/InputLogin";
import { ContainerWithBackground } from "../ContainerWithBackground";

export default function ForgotPassword({ navigation }) {

	const { control, handleSubmit, setValue, watch } = useForm()
	const { height } = Dimensions.get("screen")
	const [showAlert2, setShowAlert2] = useState(false)
	const [inputValue, setInputValue] = useState(false)

	//put para cambiar la pass /usuarios

	const getAlert = () => {
		return (
			<AwesomeAlert
				show={showAlert2}
				showProgress={true}
				progressColor="black"
				progressSize={50}
			/>
		)
	}

	useEffect(() => {
		const dniValue = watch("dniUser");
		if(dniValue){
			setInputValue(true)
		}
	}, [watch("dniUser")])



	const recuperarContraseña = async (data) => {
		setShowAlert2(true)
		await axios.post("http://192.168.1.3:4002/resetapp",
			{
				usuario: data.user
			},
			{
				headers: {
					'x-access-token': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.t0c3Oss0aMtu_AZCsXNzrms8E7oV6GXQ5ciwNRoidcE`,
					"Content-Type": "application/json",
				}
			})
			.then((res) => {
				if (res.status === 200) {
					navigation.navigate("forgotPasstwo", {
						datos: {
							jwt: res.data.token,
							idUser: res.data.idUsuario,
							numAleatorio: res.data.numeroAleatorio
						}
					})
				}
			})
	}

	return (
		<ContainerWithBackground>
			<View style={{ height: 450, width: "100%", alignItems: "center" }}>
				<View style={{ height: "100%", width: "90%", justifyContent: "center", top: 80, alignItems: "center" }}>
					<Text style={{ color: "#334EA2", fontSize: 16, fontWeight: "500", lineHeight: 19, marginBottom: "15%" }}>
						Recupero de contraseña
					</Text>
					<Text style={{ fontSize: 12, fontWeight: "600", lineHeight: 14, color: "#949AAF", marginBottom: "10%" }}>
						Ingrese el DNI con el que se creó su cuenta.
					</Text>
					<InputLogin
						control={control}
						placeholder="DNI"
						name="dniUser"
						numeric="numeric"
						secureTextEntry={true}
					/>
					<View style={{ top: 70, width: "100%" }}>
						<View style={{ height: "22%", width: "100%" }}>
							<ButtonCustom
								text="Continuar"
								color={inputValue !== false ? "#FF3D00" : "#CDD1DF"}
								disabled={inputValue !== false ? false : true}
								onPress={() => { navigation.navigate("forgotPassOne") }}
							/>
						</View>
						<View style={{ height: "22%", marginTop: "2%", width: "100%", borderColor: "#3462BF", borderWidth: 1, borderRadius: 10 }}>
							<ButtonCustom
								text="volver"
								color="#FFFFFF"
								register={true}
								onPress={() => { navigation.navigate("register") }}
							/>
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
	}, gradient: {
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