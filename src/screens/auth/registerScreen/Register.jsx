import { Text, View, StyleSheet, ScrollView, Dimensions, Modal, TouchableOpacity, TouchableWithoutFeedback, TextInput, Image } from "react-native"
import { CustomInput } from "./CustomInput"
import { useForm } from "react-hook-form"
import { ButtonCustom } from "../../../components/ButtomCustom"
import AwesomeAlert from 'react-native-awesome-alerts';
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../../../context/UserContext";
import CheckBox from '@react-native-community/checkbox';
import { useDispatch, useSelector } from "react-redux";
import LinearGradient from "react-native-linear-gradient";
import { API_URL, token } from "../../../api";
import { ModalAlert } from "./ModalAlert";
import { getAllColegios } from "../../../redux/actions";

export default function Register({ navigation }) {

	const { control, handleSubmit, setValue, watch, trigger } = useForm()
	const dispatch = useDispatch()

	const [showAlert1, setShowAlert1] = useState(false)
	const [showAlert3, setShowAlert3] = useState(false)
	const [showAlert4, setShowAlert4] = useState(false)
	const [inputValue, setInputValue] = useState('');
	const [colegiosFiltrados, setColegiosFiltrados] = useState("")


	const [texto, setTexto] = useState("")
	const [error, setError] = useState(false)
	const [errorInput, setErrorInput] = useState('');
	const [colegioSeleccionado, setColegioSeleccionado] = useState("");
	const [match, setMatch] = useState(false)

	const [toggleCheckBox, setToggleCheckBox] = useState(false)
	const pwd = watch("userpass")

	const allColegios = useSelector((state) => state.allColegios)

	let dni = watch('userdni')
	let contrato = watch("contrato")

	const myFunction = () => {
		if (error === true) {
			setShowAlert1(false)
		}
		else {
			goToLogin()
		}
	}

	const goToLogin = () => {
		setShowAlert1(false)
		navigation.navigate("login")
	}

	const configAlertOk = () => {
		setError(false)
	}

	const configAlertError = () => {
		setInputValue('');
		setError(true)
		setValue('contrato', '')
	}

	// Función para manejar el cambio en el valor del TextInput
	const handleInputChange = (text) => {
		setInputValue(text);
		setColegioSeleccionado("")
		if (text.trim() !== '') {
			setErrorInput(''); // Limpiar el mensaje de error cuando se ingrese texto
		}
	};

	const handleInputFocus = () => {
		if (colegiosFiltrados.length !== 0 && colegioSeleccionado.length === 0) {
			setInputValue(''); // Limpiar el valor cuando el TextInput obtiene el foco
			setErrorInput(`Este campo es Requerido`);
		}
	};

	// Filtrar el array de objetos basado en el término de búsqueda
	function filterColegios() {
		let filteredData = [];

		if (inputValue.trim() !== '') {
			filteredData = allColegios.filter((item) =>
				item.nombre.toLowerCase().includes(inputValue.toLowerCase())
			).slice(0, 5);
		}

		setColegiosFiltrados(filteredData);
	}

	// Funcion que captura el colegio seleccionado
	const handleColegioPress = (cole) => {
		setColegioSeleccionado(cole);
	};

	useEffect(() => {
		dispatch(getAllColegios())
	}, [])

	useEffect(() => {
		if (inputValue !== "") {
			filterColegios()
		} else {
			filterColegios()
			setColegioSeleccionado("")
		}
	}, [inputValue])

	useEffect(() => {
		setTexto("")
		if (dni !== undefined && dni.length === 8) {
			setShowAlert1(true)
			try {
				setShowAlert4(true)
				const response = axios.get(`/usuarios/verify/${dni}`,
					{
						headers: {
							'x-access-token': `${token}`,
							"Content-Type": "application/json",
						}
					})
					.then((res) => {
						if (res.status === 200) {
							setShowAlert4(false)
							setTexto("Usted ya cuenta con un usuario existente, si olvidó la contraseña presione el botón “Olvidé mi contraseña” o comuníquese con el  4293-8080")
							configAlertOk()
						}

					})
					.catch((error) => {
						setShowAlert4(false)
						setTexto(error.response.data.message);
						configAlertError()
					})
			} catch (error) {
				console.log(error);
				setShowAlert4(false)
			}
		} else {
			console.log("es undefined");
			setShowAlert4(false)
		}
	}, [dni])

	useEffect(() => {
		setMatch(false)
		if (contrato !== undefined && colegioSeleccionado && contrato.length === 4) {
			setTexto("")
			setShowAlert1(true)
			try {
				setShowAlert4(true)
				axios.post(`/colegios/verify/`,
					{
						contrato: contrato,
						colegio: colegioSeleccionado.nombre
					},
					{
						headers: {
							'x-access-token': `${token}`,
							"Content-Type": "application/json",
						}
					})
					.then((res) => {
						setShowAlert4(false)
						if (res.status === 202) {
							setMatch(true)
							setShowAlert1(false)
						}

					})
					.catch((error) => {
						setShowAlert4(false)
						setTexto(error.response.data.mensaje)
						configAlertError()
						setMatch(false)
					})
			} catch (error) {

			}
		}

	}, [contrato, colegioSeleccionado])

	async function handleSubmitRegister(data) {
		//console.log(JSON.stringify(data, null, 3));
		// navigation.navigate("registerOk")
		setShowAlert1(true)
		setTexto("")
		setShowAlert4(true)
			try {
				await axios.post(`${API_URL}/usuarios`,
					{
						usuario: data.userdni,
						nombre: data.username,
						apellido: data.userlastname,
						email: data.useremail,
						contrato: [data.contrato],
						password: data.userpass,
						rol: "Padre",
						telefono: data.userphone,
						estado: "true"
					},
					{
						headers: {
							'x-access-token': `${token}`,
							"Content-Type": "application/json",
						}
					}
				)
					.then((res) => {
						if (res.status === 200) {
							setShowAlert1(false)
							setShowAlert4(false)
							navigation.navigate("registerOk")
						}
					})
			} catch (error) {
				console.log('Error de Axios:', error);
				setShowAlert4(false)
				setTimeout(() => {
					setShowAlert3(true)
				}, 2000)
			}
	}

	// console.log(JSON.stringify(allColegios, null, 3));
	// console.log(colegiosFiltrados);
	// console.log(match);


	return (
		<View style={styles.container}>
			<LinearGradient
				start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#FF3D00', '#FFB800']}
				style={styles.gradient}
			/>
			<View style={{ alignItems: "center", position: "absolute", width: "95%", backgroundColor: "white", height: "98%", marginTop: "2%", borderRadius: 10, }}>
				<ScrollView style={{ width: "90%", paddingBottom: 10, height: "auto" }}
					showsVerticalScrollIndicator={false}
				>
					<View style={{ height: "10%", alignItems: "center", justifyContent: "center" }}>
						<Text style={{ color: "#334EA2", fontWeight: "700", fontSize: 16 }}>Registro del Padre/Responsable</Text>
					</View>
					<View style={{ height: 950, marginBottom: 50 }}>
						<View>
							<CustomInput
								control={control}
								placeholder="Numero de contrato"
								name="contrato"
								trigger={trigger}
								numeric="numeric"
								rules={{
									required: true,
								}}
								focus={handleInputFocus}
							/>
							<View>
								<View style={{
									width: "100%",
									flexDirection: 'row',
									alignItems: 'center',
									borderWidth: 1,
									borderColor: match === true ? "#008000" : '#CDD1DF',
									borderRadius: 10,
									padding: 5,
									height: 50
								}}>
									<TextInput
										placeholder="Nombre de la Institución"
										value={colegioSeleccionado ? colegioSeleccionado.nombre : inputValue} // Valor del TextInput
										onChangeText={handleInputChange} // Se activa cuando el texto cambia
										style={{
											width: "100%",
											paddingLeft: 10,
											alignItems: "center",
											fontWeight: "600",
											fontSize: 14,
											lineHeight: 16,
											backgroundColor: "white",
											borderRadius: 8,
											color: "#564C71",
										}}
										placeholderTextColor="#CDD1DF"
									/>
								</View>
								<View style={{ height: 25, justifyContent: "center", marginLeft: 20 }}>
									{errorInput !== '' && inputValue === "" ?
										<View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
											<Image
												source={require("../../../assets/Error.png")}
												style={{ width: 25, height: 25 }}
											/>
											<Text style={{ color: "#FF6363", fontSize: 10, }}>{errorInput}</Text>
										</View>
										: null
									}
								</View>
								{
									colegiosFiltrados.length !== 0 && colegioSeleccionado === "" ?
										<View style={{ position: 'absolute', top: 50, backgroundColor: 'white', width: '100%', height: colegiosFiltrados.length * 30, zIndex: 1, borderRadius: 10, borderColor: "#CDD1DF", borderWidth: 1 }}>
											{
												colegiosFiltrados.map((cole, index) => (
													<TouchableOpacity key={index} onPress={() => handleColegioPress(cole)}>
														<Text style={{ paddingVertical: 5, paddingHorizontal: 15, fontSize: 12 }}>{cole.nombre}</Text>
													</TouchableOpacity>
												))
											}
										</View>
										:
										null
								}
							</View>
							<CustomInput
								control={control}
								placeholder="Ingresa tu DNI"
								name="userdni"
								trigger={trigger}
								numeric="numeric"
								focus={handleInputFocus}
								rules={{
									required: true,
									// pattern: { value: /^[0-9]+$/, message: "El DNI es incorrecto" },
									minLength: {
										value: 7,
										message: "El DNI ingresado no es válido."
									},
									maxLength: {
										value: 8,
										message: "El DNI ingresado no es válido."
									}
								}}
							/>
							<CustomInput
								control={control}
								name="username"
								placeholder="Nombre"
								trigger={trigger}
								focus={handleInputFocus}
								rules={{
									required: true,
									pattern: { value: /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/, message: "El Nombre es incorrecto" },
									minLength: {
										value: 2,
										message: "El Nombre no es válido."
									},
									maxLength: {
										value: 15,
										message: "El Nombre no es válido."
									}
								}}
							/>
							<CustomInput
								control={control}
								name="userlastname"
								placeholder="Apellido"
								trigger={trigger}
								focus={handleInputFocus}
								rules={{
									required: true,
									pattern: { value: /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/, message: "El Nombre es incorrecto" },
									minLength: {
										value: 2,
										message: "El Apellido no es válido."
									},
									maxLength: {
										value: 15,
										message: "El Apellido no es válido."
									}
								}}
							/>
							<CustomInput
								control={control}
								name="useremail"
								placeholder="Email"
								trigger={trigger}
								focus={handleInputFocus}
								rules={{
									required: true,
									pattern: { value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, message: "El Email ingresado no es válido." }
								}}
							/>
							<CustomInput
								control={control}
								name="userphone"
								numeric="numeric"
								trigger={trigger}
								focus={handleInputFocus}
								placeholder="Número de Celular"
								rules={{
									required: true,
									pattern: { value: /^[0-9]+$/, message: "El Número ingresado no es válido." },
									minLength: {
										value: 9,
										message: "El Numero de celular ingresado no es válido."
									},

								}}
							/>

							<CustomInput
								control={control}
								placeholder="Crea tu contraseña"
								name="userpass"
								secureTextEntry
								numeric="numeric"
								trigger={trigger}
								focus={handleInputFocus}
								rules={{
									required: true,
									minLength: {
										value: 4,
										message: "La Contraseña debe tener 4 caracteres"
									},
									maxLength:{
										value: 4,
										message: "La Contraseña debe tener 4 caracteres"
									}
								}}
							/>

							<CustomInput
								control={control}
								placeholder="Repite tu contraseña"
								name="userpassrepeat"
								secureTextEntry
								numeric="numeric"
								trigger={trigger}
								focus={handleInputFocus}
								rules={{
									required: true,
									validate: value => value === pwd || "Las Contraseñas no coinciden",
									minLength: {
										value: 4,
										message: "La Contraseña debe tener 4 caracteres"
									},
									maxLength:{
										value: 4,
										message: "La Contraseña debe tener 4 caracteres"
									}
								}}
							/>


							<View style={{ height: "5%", display: "flex", flexDirection: "row", marginTop: "3%" }}>
								<View>
									<CheckBox
										disabled={false}
										value={toggleCheckBox}
										onValueChange={(newValue) => setToggleCheckBox(newValue)}
										tintColors={true ? "black" : "black"}
									/>
								</View>
								<View style={{ marginLeft: "3%" }}>
									<Text style={{ fontSize: 12, color: "#949AAF" }}>
										Estoy de acuerdo con los
									</Text>
									<Text style={{ fontWeight: "bold", fontSize: 11.5, color: "#949AAF" }}>
										Términos de Servicios y Política de privacidad.
									</Text>
								</View>
							</View>
							<View style={{ height: "7%", marginTop: "5%" }}>
								<ButtonCustom
									text="Registrarme"
									color={toggleCheckBox === false ? "#CDD1DF" : "#FF3D00"}
									disabled={toggleCheckBox === false ? true : false}
									onPress={handleSubmit(handleSubmitRegister)}
								/>
							</View>
							<View style={{ height: "7%", marginTop: "2%", borderColor: "#3462BF", borderWidth: 1, borderRadius: 10, marginBottom: 10 }}>
								<ButtonCustom
									text="Cancelar"
									color="#FFFFFF"
									register={true}
									onPress={() => { navigation.navigate("login") }}
								/>
							</View>
						</View>
					</View>
				</ScrollView>
			</View>
			<ModalAlert visible={showAlert1} onClose={myFunction} texto={texto} error={error} loading={showAlert4}/>
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