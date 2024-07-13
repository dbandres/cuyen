import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { Header } from "../muro/Header";
import { Destino } from "./componentesInfoDelViaje/Destino";
import { Informacion } from "./componentesInfoDelViaje/Informacion";
import { Contingente } from "./componentesInfoDelViaje/Contingente";
import { Hotel } from "./componentesInfoDelViaje/Hotel";
import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getContratoByNum, getDestino, getPasajero } from "../../../redux/actions";
import { UserContext } from "../../../context/UserContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../../../context/AuthContext";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";


export function InfoDelViaje({ navigation }) {

	const dispatch = useDispatch()
	const { userdata } = useContext(UserContext)

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

	useFocusEffect(
		React.useCallback(() => {
			console.log('Pantalla enfocada en InfoDelViaje. Puedes ejecutar operaciones aquí.');

			const fetchData = async () => {
				const value = await getDataStorage('contratoNum');
				if (value) {
					dispatch(getDestino(value))
					dispatch(getContratoByNum(value))
					dispatch(getPasajero(userdata.id, value))
				}
			};

			fetchData();

			// Puedes realizar otras operaciones aquí, como cargar datos, etc
			return () => {
				// Este código se ejecuta cuando el componente se desenfoca o se desmonta
				console.log('Pantalla desenfocada InfoDelViaje. Limpieza o desmontaje aquí.');
			};
		}, []))

	return (

		<SafeAreaView style={{ flex: 1, backgroundColor: "#D2DCEB" }}>
			<ScrollView style={{ flex: 1, backgroundColor: "#D2DCEB" }}>
				<View style={styles.container}>
					<Header children="Informacion del viaje" navigation={navigation} />
					<Destino />
					<Informacion />
					<Contingente navigation={navigation} />
					<Hotel />
				</View>
			</ScrollView>
		</SafeAreaView>

	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#D2DCEB",
		flex: 1,
		display: "flex",
		alignItems: "center"
	}
})