import { Text, View, StyleSheet, ScrollView, Dimensions, Modal, TouchableOpacity } from "react-native"
import { CustomInput } from "./CustomInput"
import { useForm } from "react-hook-form"
import { ButtonCustom } from "../../../components/ButtomCustom"
import AwesomeAlert from 'react-native-awesome-alerts';
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../../../context/UserContext";
import CheckBox from '@react-native-community/checkbox';
import { SelectList } from "react-native-dropdown-select-list";
import { useDispatch, useSelector } from "react-redux";
import { getAllContratos } from "../../../redux/actions";
import DropDownPicker from "react-native-dropdown-picker";
import LinearGradient from "react-native-linear-gradient";



export default function Register({ navigation }) {

	const { height } = Dimensions.get("screen")
	const { control, handleSubmit, setValue, watch } = useForm()

	const dispatch = useDispatch()
	const [showAlert, setShowAlert] = useState(false)
	const [showAlert1, setShowAlert1] = useState(false)
	const [showAlert2, setShowAlert2] = useState(false)
	const { setUserData } = useContext(UserContext)
	const [toggleCheckBox, setToggleCheckBox] = useState(false)
	const [itemsArray, setItemsArray] = useState([])
	const [selectedItems, setSelectedItems] = useState([]);
	const pwd = watch("userpass")
	const allContratos = useSelector((state) => state.allContratos)

	const data = [
		{
			label: "ASD", value: "asd"
		},
		{
			label: "A", value: "a"
		},
		{
			label: "S", value: "s"
		},
		{
			label: "H", value: "h"
		},
		{
			label: "Y", value: "y"
		},
		{
			label: "Jota", value: "jota"
		},
	]
	const [isOpen, setIsOpen] = useState(false)
	const [currentValue, setCurrentValue] = useState([])

	// useEffect(() => {
	// 	dispatch(getAllContratos())
	// 	const nuevoArray = allContratos.map((contrato) => ({
	// 		key: contrato.id,
	// 		value: contrato.num + " - " + contrato.colegio
	// 	}))
	// 	setItemsArray(nuevoArray)
	// }, [allContratos.length != 0])

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

	async function handleSubmitRegister(data) {
		navigation.navigate("registerOk")
		// console.log(data)
		// if (selectedItems.length == 0 && toggleCheckBox) {
		// 	setShowAlert1(true)
		// }
		// else if (!toggleCheckBox && selectedItems) {
		// 	setShowAlert2(true)
		// }
		// else if (selectedItems && toggleCheckBox) {

		// 	const separamosString = selectedItems.split("-")
		// 	const numeroContrato = separamosString[0].toString()

		// 	try {
		// 		const fetch = await axios.post("http://192.168.1.3:4002/usuarios",
		// 			{
		// 				usuario: data.userdni,
		// 				nombre: data.username,
		// 				apellido: data.userlastname,
		// 				email: data.useremail,
		// 				contrato: numeroContrato,
		// 				password: data.userpass,
		// 				rol: "padre",
		// 				telefono: data.userphone
		// 			},
		// 			{
		// 				headers: {
		// 					'x-access-token': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.t0c3Oss0aMtu_AZCsXNzrms8E7oV6GXQ5ciwNRoidcE`,
		// 					"Content-Type": "application/json",
		// 				}
		// 			}
		// 		)
		// 			.then((res) => {
		// 				if (res.status === 200) {
		// 					setShowAlert(true)
		// 					setUserData({
		// 						jwt: res.data,
		// 						nombre: data.username,
		// 						apellido: data.userlastname,
		// 						email: data.useremail,
		// 						usuario: data.userdni,
		// 						telefono: data.userphone,
		// 					})
		// 				}
		// 			})
		// 	} catch (error) {
		// 		console.log('Error de Axios:', error);
		// 	}
		// }
	}

	const onSelectedItemsChange = (selectedItems) => {
		// Set Selected Items
		setSelectedItems(selectedItems);
	};

	const openPicker = () => {
		setIsOpen(!isOpen)
	}


	return (
		<View style={styles.container}>
			<LinearGradient
				start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#FF3D00', '#FFB800']}
				style={styles.gradient}
			/>
			<View style={{ alignItems: "center", position: "absolute", width: "95%", backgroundColor: "white", height: "95%", marginTop: "2%", borderRadius: 10, }}>
				<View style={{ justifyContent: "flex-start", marginTop: "2%", width: "90%", marginBottom: "3%" }}>
					{
						data.length != 0 ?
							<DropDownPicker
								items={data}
								open={isOpen}
								value={currentValue}
								setOpen={openPicker}
								setValue={(val) => { setCurrentValue(val) }}
								autoScroll
								placeholder="Contrato"
								placeholderStyle={{ color: "#CDD1DF" }}
								multiple={true}
								min={1}
								max={4}
								mode="BADGE"
								badgeColors={["#FF3D00"]}
								badgeDotColors={["white"]}
								badgeTextStyle={{ color: "white" }}
								style={{borderColor:"#CDD1DF"}}
							/>
							:
							<Text>
								Cargando numeros de contrato...
							</Text>
					}
				</View>
				<ScrollView style={{ width: "90%" }}
					showsVerticalScrollIndicator={false}
				>
					<View style={{ height: height * 95 / 100 }}>
						<View>
							<CustomInput
								control={control}
								placeholder="Ingresa tu DNI"
								name="userdni"
								secureTextEntry
								numeric="numeric"
								rules={{
									//required: true,
									pattern: { value: /^[0-9]+$/, message: "El DNI es incorrecto" },
									minLength: {
										value: 7,
										message: "El DNI debe tener un minimo de 7 caracteres"
									},
									maxLength: {
										value: 8,
										message: "El DIN debe tener como maximo de 8 caracteres"
									}
								}}
							/>
							<CustomInput
								control={control}
								name="username"
								placeholder="Nombre"
								rules={{
									//required: true,
									minLength: {
										value: 2,
										message: "El nombre debe tener un minimo de 2 caracteres"
									},
									maxLength: {
										value: 15,
										message: "El nombre debe tener como maximo de 15 caracteres"
									}
								}}
							/>
							<CustomInput
								control={control}
								name="userlastname"
								placeholder="Apellido"
								rules={{
									//required: true,
									minLength: {
										value: 2,
										message: "El nombre debe tener un minimo de 2 caracteres"
									},
									maxLength: {
										value: 15,
										message: "El nombre debe tener como maximo de 15 caracteres"
									}
								}}
							/>
							<CustomInput
								control={control}
								name="useremail"
								placeholder="Email"
								rules={{
									//required: true,
									pattern: { value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, message: "La Direccion de Email es Incorrecta" }
								}}
							/>
							<CustomInput
								control={control}
								name="userphone"
								numeric="numeric"
								placeholder="Número de Celular"
								rules={{
									//required: true,
									pattern: { value: /^[0-9]+$/, message: "El numero de Telefono es incorrecto" },
								}}
							/>

							<CustomInput
								control={control}
								placeholder="Crea tu contraseña"
								name="userpass"
								secureTextEntry
								numeric="numeric"
								rules={{
									//required: true,
									minLength: {
										value: 8,
										message: "La Contraseña debe tener un minimo de 8 caracteres"
									}
								}}
							/>

							<CustomInput
								control={control}
								placeholder="Repite tu contraseña"
								name="userpass"
								secureTextEntry
								numeric="numeric"
								rules={{
									//required: true,
									minLength: {
										value: 8,
										message: "La Contraseña debe tener un minimo de 8 caracteres"
									}
								}}
							/>


							<View style={{ height: "5%", display: "flex", flexDirection: "row", marginTop: "3%" }}>
								<View>
									<CheckBox
										disabled={false}
										value={toggleCheckBox}
										onValueChange={(newValue) => setToggleCheckBox(newValue)}
									/>
								</View>
								<View style={{ marginLeft: "3%" }}>
									<Text style={{ fontSize: 12 }}>
										Estoy de acuerdo con los
									</Text>
									<Text style={{ fontWeight: "bold", fontSize: 11.5 }}>
										Términos de Servicios y Política de privacidad.
									</Text>
								</View>
							</View>
							<View style={{ height: "7%", marginTop: "5%" }}>
								<ButtonCustom
									text="Registrarme"
									color="#FF3D00"
									onPress={handleSubmit(handleSubmitRegister)}
								/>
							</View>
							<View style={{ height: "7%", marginTop: "5%", borderColor: "#3462BF", borderWidth: 1, borderRadius: 10 }}>
								<ButtonCustom
									text="Cancelar"
									color="#FFFFFF"
									register={true}
									onPress={() => { navigation.navigate("register") }}
								/>
							</View>
						</View>
					</View>
				</ScrollView>
			</View>
			<AwesomeAlert
				show={showAlert}
				showProgress={false}
				title="OK!"
				message="Ya te encuentras registrado 🎉"
				closeOnTouchOutside={false}
				closeOnHardwareBackPress={false}
				showConfirmButton={true}
				confirmText="Ir al Inicio"
				confirmButtonColor="#008000"
				onConfirmPressed={() => {
					setShowAlert(false)
					navigation.navigate("landing")
				}}
			/>
			{showAlerts(showAlert1, setShowAlert1, "Error", "Debes seleccionar un contrato", "Ok")}
			{showAlerts(showAlert2, setShowAlert2, "Error!", "Debes aceptar Terminos y Politica de privacidad", "Ok")}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
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
})