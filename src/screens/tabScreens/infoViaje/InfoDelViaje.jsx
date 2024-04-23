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


export function InfoDelViaje({ navigation }) {

	const dispatch = useDispatch()
	const { userdata } = useContext(UserContext)
	const { authenticate } = useContext(AuthContext)
	const contratoActual = useSelector((state) => state.currentContrato)

	useEffect(() => {
		dispatch(getDestino(userdata.contrato[0]))
		dispatch(getContratoByNum(userdata.contrato[0]))
		dispatch(getPasajero(userdata.id))
	}, [contratoActual, userdata])

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