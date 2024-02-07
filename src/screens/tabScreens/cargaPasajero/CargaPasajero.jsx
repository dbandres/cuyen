import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { Header } from "../muro/Header";
import React, { useContext, useEffect, useState } from "react";
import { Form } from "./Form";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { getPasajero } from "../../../redux/actions";
import { UserContext } from "../../../context/UserContext";
import { ExpandibleInfoPasajero } from "./ExpandibleInfoPasajero";


export function CargaPasajero({ navigation }) {

	const [showForm, setShowForm] = useState(false)
	const [newFetch, setNewFetch] = useState(false)
	const { userdata } = useContext(UserContext)
	const pasajero = useSelector((state) => state.pasajero)
	const dispatch = useDispatch()

	const agregarPasajero = () => {
		setShowForm(!showForm)
	}

	useFocusEffect(
		React.useCallback(() => {
			console.log('Pantalla enfocada. Puedes ejecutar operaciones aquí.');

			// Puedes realizar otras operaciones aquí, como cargar datos, etc.
			dispatch(getPasajero(userdata.id))
			return () => {
				// Este código se ejecuta cuando el componente se desenfoca o se desmonta
				console.log('Pantalla desenfocada. Limpieza o desmontaje aquí.');
			};
		}, []))

		useEffect(()=>{
			if(newFetch === true){
				console.log("Se actualizo pasajero");
				dispatch(getPasajero(userdata.id))
				setNewFetch(false)
				setShowForm(false)
			}
		},[newFetch])

	// console.log("pasajero: ",pasajero[0].apellido);

	return (
		<ScrollView style={styles.container}>
			<View style={{
				flex: 1, display: "flex",
				alignItems: "center",
				justifyContent: "flex-start"
			}}>
				<Header
					children="Info del viaje "
					navigation={navigation}
				/>
				<View style={{ width: 373, height: 91, backgroundColor: "#FFFFFF", marginTop: 20, borderRadius: 10, alignItems: "center", justifyContent: "flex-start", display: "flex", flexDirection: "row", padding: 20 }}>
					<View style={{ width: 48, height: 48, borderRadius: 10, backgroundColor: "#FF3D00", alignItems: "center", justifyContent: "center" }}>
						<Image
							source={require('../../../assets/destino.png')}
							style={{ width: 24, height: 24 }}
						/>
					</View>
					<View style={{ marginLeft: 15, height: 48, alignItems: "flex-start", justifyContent: "center" }}>
						<Text style={{ color: "#564C71", fontWeight: "800", fontSize: 12, lineHeight: 14, marginBottom: 6 }}>
							Destino
						</Text>
						<Text style={{ color: "#564C71", fontWeight: "400", fontSize: 16, lineHeight: 19 }}>
							destino
						</Text>
					</View>
				</View>
				{
					pasajero.length !== 0 ?
						pasajero?.map((pas, index) => (
							<ExpandibleInfoPasajero key={index} data={pas} setNewFetch={setNewFetch}/>
						))
						:
						null
				}
				{
					showForm !== false ?
						<>
							<Form agregarPasajero={agregarPasajero} setNewFetch={setNewFetch}/>
						</>
						:
						null
				}
				<View style={{ height: 70 }}>
					<TouchableOpacity onPress={agregarPasajero} style={{ width: 331, height: 47, backgroundColor: "#FFFFFF", borderRadius: 10, top: 20, justifyContent: "center", alignItems: "center" }}>
						<Text style={{ color: "#334EA2", fontWeight: "600", fontSize: 12, lineHeight: 14, textAlign: "center" }}>
							Agregar Pasajero
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#D2DCEB",
		flex: 1,

	}
})