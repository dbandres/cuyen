import { View, Text, StyleSheet, Dimensions, ScrollView, Image, StatusBar } from "react-native";
import { useForm } from "react-hook-form";
import { ButtonCustom } from "../../../components/ButtomCustom";
import axios from "axios";
import AwesomeAlert from "react-native-awesome-alerts";
import { useEffect, useState } from "react";
import { InputLogin } from "../loginScreen/InputLogin";
import { ContainerWithBackground } from "../../ContainerWithBackground";
import { API_URL, token } from "../../../api";


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
		await axios.post(`${API_URL}/resetapp`,
			{
				usuario: data.dniUser
			},
			{
				headers: {
					'x-access-token': `${token}`,
					"Content-Type": "application/json",
				}
			})
			.then((res) => {
				if (res.status === 200) {
					console.log(res)
					navigation.navigate("forgotPassOne", {
						datos: {
							jwt: res.data.token,
							idUser: res.data.idUsuario,
							numAleatorio: res.data.numeroAleatorio,
							email: res.data.email
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
								onPress={handleSubmit(recuperarContraseña)}
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
				{showAlert2 ? getAlert() : null}
			</View>
		</ContainerWithBackground>
	)
}