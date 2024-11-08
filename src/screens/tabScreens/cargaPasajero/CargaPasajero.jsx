import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { Header } from "../muro/Header";
import React, { useContext, useEffect, useState } from "react";
import { Form } from "./Form";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { getPasajero } from "../../../redux/actions";
import { UserContext } from "../../../context/UserContext";
import { ExpandibleInfoPasajero } from "./ExpandibleInfoPasajero";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";


export function CargaPasajero({ navigation }) {

	const [showForm, setShowForm] = useState(false)
	const [newFetch, setNewFetch] = useState(false)
	const { userdata } = useContext(UserContext)
	const pasajero = useSelector((state) => state.pasajero)
	const dispatch = useDispatch()

	const agregarPasajero = () => {
		setShowForm(!showForm)
	}
	const getDataStorage = async (key) => {
		try {
			const value = await AsyncStorage.getItem(key);
			if (value !== null) {
				console.log("value storage: ", value);
				return value;
			}
		} catch (error) {
			console.error('Failed to retrieve data', error);
		}
	};
	const fetchData = async () => {
		const value = await getDataStorage('contratoNum');
		if (value) {
			dispatch(getPasajero(userdata.id, value))
		}
	};

	useFocusEffect(
		React.useCallback(() => {
			// Puedes realizar otras operaciones aquí, como cargar datos, etc

			fetchData();
			return () => {
				// Este código se ejecuta cuando el componente se desenfoca o se desmonta
				console.log('Pantalla desenfocada. Limpieza o desmontaje aquí.');
				agregarPasajero()
			};
		}, []))


	useEffect(() => {
		if (newFetch === true) {
			fetchData()
			setNewFetch(false)
			setShowForm(false)
		}
	}, [newFetch])

	return (
		<SafeAreaView style={{flex:1}}>
			<ScrollView style={styles.container}>
				<View style={{
					flex: 1, display: "flex",
					alignItems: "center",
					justifyContent: "flex-start"
				}}>
					<Header
						children="Registro de pasajero"
						navigation={navigation}
					/>
					{
						pasajero.length !== 0 ?
							pasajero?.map((pas, index) => (
								<ExpandibleInfoPasajero key={index} data={pas} setNewFetch={setNewFetch} />
							))
							:
							null
					}
					{
						showForm !== false ?
							<>
								<Form agregarPasajero={agregarPasajero} setNewFetch={setNewFetch} />
							</>
							:
							null
					}
					<View style={{ height: 90 }}>
						<TouchableOpacity onPress={agregarPasajero} style={{ width: 331, height: 47, backgroundColor: "#FFFFFF", borderRadius: 10, top: 20, justifyContent: "center", alignItems: "center", }}>
							<Text style={{ color: "#334EA2", fontWeight: "600", fontSize: 12, lineHeight: 14, textAlign: "center" }}>
								Agregar Pasajero
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#D2DCEB",
		flex: 1,

	}
})