import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native";
import { Header } from "../muro/Header";
import DropDownPicker from "react-native-dropdown-picker";
import React, { useState } from "react";
import { UserContext } from "../../../context/UserContext";
import { useContext, useEffect } from "react";
import axios from "axios";
import { API_URL, token } from "../../../api";
import AwesomeAlert from "react-native-awesome-alerts";
import { GestioViajeContext } from "./GestionViajeContext";
import { useFocusEffect } from "@react-navigation/native";

export function GestionViaje({ navigation }) {

	const { userdata } = useContext(UserContext)
	const { actualizarDato } = useContext(GestioViajeContext)
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState(null);
	const [items, setItems] = useState([]);
	const [showAlert2, setShowAlert2] = useState(false)
	// 	console.log("actualizo!");

	// 	const fetchData = async () => {
	// 		try {
	// 			const res = await axios.post("/coordinador", {
	// 				"contratos": userdata.contrato
	// 			}, {
	// 				headers: {
	// 					'x-access-token': `${token}`,
	// 					"Content-Type": "application/json",
	// 				}
	// 			});

	// 			if (res.status === 200) {
	// 				console.log("res! data: ", res.data)
	// 				setItems(prevItems => [
	// 					...prevItems,
	// 					...res.data.map((data, index) => ({
	// 						label: data.escuelas,
	// 						value: data.travelId,
	// 						key: index.toString(),
	// 					}))
	// 				]);
	// 			}
	// 		} catch (error) {
	// 			console.log(error);
	// 		}
	// 	};

	// 	fetchData();
	// }, []);

	console.log(userdata);


	useFocusEffect(
		React.useCallback(() => {
			console.log('La pantalla GestionViaje obtuvo el enfoque');
			// Puedes agregar aquí la lógica específica que deseas ejecutar cuando la pantalla obtiene el enfoque.
			// Puedes realizar la lógica de carga de datos, actualizaciones, etc.
			const fetchData = async () => {
				try {
					const res = await axios.post("/coordinador", {
						"contratos": userdata.contrato
					}, {
						headers: {
							'x-access-token': `${token}`,
							"Content-Type": "application/json",
						}
					});

					if (res.status === 200) {
						console.log("res! data: ", res.data)
						const filterItem = res.data.filter((data)=>data.inicioViaje === true)
						console.log("filter: ",filterItem);
						if(filterItem.length !== 0){
							setItems(prevItems => [
								...prevItems,
								...filterItem.map((data, index) => ({
									label: data.escuelas,
									value: data.travelId,
									key: index.toString(),
								}))
							]);
						}else{
							setItems(prevItems => [
								...prevItems,
								...res.data.map((data, index) => ({
									label: data.escuelas,
									value: data.travelId,
									key: index.toString(),
								}))
							]);
						}
					}
				} catch (error) {
					console.log(error);
				}
			};

			fetchData();

			return () => {
				// La función de limpieza se ejecutará cuando el componente se desmonte
				// Realiza acciones de limpieza aquí, por ejemplo, restablece el estado
				setItems([]);
				setValue(null);
			};
		}, [])
	)


	//cada vez que se seleccione un elemento, el picker se cerrará automáticamente.
	const onSelectedItemsChange = (selectedItems) => {
		setShowAlert2(true)
		// Set Selected Items
		setTimeout(() => {
			setValue(selectedItems);
			setShowAlert2(false)
		}, 5000)
	};

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

	useEffect(() => {
		if (value !== null) {
			actualizarDato({
				dato: value
			})
			setTimeout(() => {
				navigation.navigate("gestionDePasajerosTwo", { data: value })
				setValue(null)
			}, 500)
		}
	}, [value])

	return (
		<View style={styles.container}>
			<Header children="Gestión de Pasajeros" navigation={navigation} />
			<View style={{ width: "100%", justifyContent: "flex-start", alignItems: "center", display: "flex", height: "100%" }}>
				<View style={{ width: "90%", height: 110, alignItems: "center", justifyContent: "center" }}>
					<DropDownPicker
						items={items}
						value={value}
						open={open}
						setItems={setItems}
						setOpen={setOpen}
						setValue={(val) => { onSelectedItemsChange(val) }}
						placeholder="Identificador del viaje"
						placeholderStyle={{ color: "#CDD1DF" }}
						mode="BADGE"
						multiple={false}
						dropDownContainerStyle={{
							borderColor: "#D2DCEB",
						}}
						searchPlaceholder="Buscar..."
						searchContainerStyle={{
							borderBottomColor: "white"
						}}
						searchTextInputStyle={{
							color: "#000"
						}}
						searchPlaceholderTextColor="#D2DCEB"
						itemSeparator={false}
						searchable={true}
						item
						badgeColors={["#FF3D00"]}
						badgeDotColors={["white"]}
						badgeTextStyle={{ color: "white" }}
						style={{ borderColor: "#CDD1DF" }}
						labelStyle={{ color: "green" }}
						textStyle={{ fontSize: 12 }}
						translation={{ NOTHING_TO_SHOW: "Sin viajes disponibles" }}
					/>
				</View>
			</View>
			{showAlert2 ? getAlert() : null}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#D2DCEB",
		flex: 1,
		display: "flex",
	}
})