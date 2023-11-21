import { Text, View, StyleSheet, ScrollView, Dimensions, Modal, TouchableOpacity } from "react-native"
import { CustomInput } from "./CustomInput"
import { useForm } from "react-hook-form"
import { ButtonCustom } from "../../../components/ButtomCustom"
import AwesomeAlert from 'react-native-awesome-alerts';
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../../../context/UserContext";
import CheckBox from '@react-native-community/checkbox';
import { useDispatch, useSelector } from "react-redux";
import { getAllContratos } from "../../../redux/actions";
import DropDownPicker from "react-native-dropdown-picker";
import LinearGradient from "react-native-linear-gradient";
import { API_URL, token } from "../../../api";




export default function Register({ navigation }) {

	const { height } = Dimensions.get("screen")
	const { control, handleSubmit, setValue, watch} = useForm()

	const dispatch = useDispatch()
	const [showAlert1, setShowAlert1] = useState(false)
	const [showAlert2, setShowAlert2] = useState(false)
	const [showAlert3, setShowAlert3] = useState(false)
	const [showAlert4, setShowAlert4] = useState(false)
	const { setUserData } = useContext(UserContext)
	const [toggleCheckBox, setToggleCheckBox] = useState(false)
	const [itemsArray, setItemsArray] = useState([])
	const [selectedItems, setSelectedItems] = useState([]);
	const pwd = watch("userpass")
	const allContratos = useSelector((state) => state.allContratos)

	
	const [isOpen, setIsOpen] = useState(false)
	const [currentValue, setCurrentValue] = useState([])

	useEffect(() => {
		dispatch(getAllContratos())
		const nuevoArray = allContratos.map((contrato) => ({
			label: contrato.num + " - " + contrato.colegio,
			value: contrato.num
		}))
		setItemsArray(nuevoArray)
	}, [allContratos.length != 0])

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
        show={showAlert4}
        showProgress={true}
        progressColor="black"
        progressSize={50}
				closeOnTouchOutside={false}
      />
    )
  }

	async function handleSubmitRegister(data) {
		// navigation.navigate("registerOk")
		if (selectedItems.length == 0 && toggleCheckBox) {
			setShowAlert1(true)
		}
		else if (!toggleCheckBox && selectedItems) {
			setShowAlert2(true)
		}
		else if (selectedItems && toggleCheckBox) {
			setShowAlert4(true)
			try {
				await axios.post(`${API_URL}/usuarios`,
					{
						usuario: data.userdni,
						nombre: data.username,
						apellido: data.userlastname,
						email: data.useremail,
						contrato: selectedItems,
						password: data.userpass,
						rol: "Coordinador",
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
							console.log("ESto es la respuesta: ",JSON.stringify(res.config, null ,3))
							setUserData({
								jwt: res.data,
								nombre: data.username,
								apellido: data.userlastname,
								email: data.useremail,
								usuario: data.userdni,
								telefono: data.userphone,
								contrato: selectedItems[0],
								rol: "Coordinador"
							})
							navigation.navigate("registerOk")
						}
					})
			} catch (error) {
				console.log('Error de Axios:', error);
				setShowAlert4(false)
				setTimeout(()=>{
					setShowAlert3(true)
				},2000)
			}
		}
	}

	//cada vez que se seleccione un elemento, el picker se cerrará automáticamente.
	const onSelectedItemsChange = (selectedItems) => {
		// Set Selected Items
		setSelectedItems(selectedItems);
		setIsOpen(!isOpen)
	};



	return (
		<View style={styles.container}>
			<LinearGradient
				start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#FF3D00', '#FFB800']}
				style={styles.gradient}
			/>
			<View style={{ alignItems: "center", position: "absolute", width: "95%", backgroundColor: "white", height: "98%", marginTop: "2%", borderRadius: 10, }}>
				<View style={{height:"15%",alignItems:"center", justifyContent:"center"}}>
					<Text style={{color:"#334EA2", fontWeight:"700", fontSize:16}}>Registro del Padre/Responsable</Text>
				</View>
				<View style={{ justifyContent: "flex-start", marginTop: "2%", width: "90%", marginBottom: "3%" }}>
					{
						itemsArray.length != 0 ?
							<DropDownPicker
								items={itemsArray}
								open={isOpen}
								value={selectedItems}
								setOpen={setIsOpen}
								setValue={(val) => { onSelectedItemsChange(val) }}
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
							<Text style={{color:"black"}}>
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
								rules={{
									required: true,
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
								rules={{
									required: true,
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
								rules={{
									required: true,
									pattern: { value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, message: "El Email ingresado no es válido." }
								}}
							/>
							<CustomInput
								control={control}
								name="userphone"
								numeric="numeric"
								placeholder="Número de Celular"
								rules={{
									required: true,
									pattern: { value: /^[0-9]+$/, message: "El Número ingresado no es válido." },
								}}
							/>

							<CustomInput
								control={control}
								placeholder="Crea tu contraseña"
								name="userpass"
								secureTextEntry
								numeric="numeric"
								rules={{
									required: true,
									minLength: {
										value: 4,
										message: "La Contraseña debe tener un minimo de 4 caracteres"
									}
								}}
							/>

							<CustomInput
								control={control}
								placeholder="Repite tu contraseña"
								name="userpassrepeat"
								secureTextEntry
								numeric="numeric"
								rules={{
									required: true,
									validate: value => value === pwd || "Las Contraseñas no coinciden",
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
										tintColors={true ? "black" : "black" }
									/>
								</View>
								<View style={{ marginLeft: "3%" }}>
									<Text style={{ fontSize: 12, color:"#949AAF" }}>
										Estoy de acuerdo con los
									</Text>
									<Text style={{ fontWeight: "bold", fontSize: 11.5, color:"#949AAF" }}>
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
							<View style={{ height: "7%", marginTop: "2%", borderColor: "#3462BF", borderWidth: 1, borderRadius: 10 }}>
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
			{showAlerts(showAlert1, setShowAlert1, "Error", "Debes seleccionar un contrato", "Ok")}
			{showAlerts(showAlert2, setShowAlert2, "Error!", "Debes aceptar Terminos y Politica de privacidad", "Ok")}
			{showAlerts(showAlert3, setShowAlert3, "Error!", "Es posible que ya te hayas registrado", "Ok")}
			{getAlert()}
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