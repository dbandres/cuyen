import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Header } from "../muro/Header";
import { Destino } from "./componentesInfoDelViaje/Destino";
import { Informacion } from "./componentesInfoDelViaje/Informacion";
import { Contingente } from "./componentesInfoDelViaje/Contingente";
import { Hotel } from "./componentesInfoDelViaje/Hotel";
import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cleanDestino, getContratoByNum, getDestino, getPasajero } from "../../../redux/actions";
import { UserContext } from "../../../context/UserContext";
import { useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";


export function InfoDelViaje({ navigation }) {

	const dispatch = useDispatch()
	const { userdata } = useContext(UserContext)
	const contratoActual = useSelector((state) => state.currentContrato)

	// useEffect(() => {
	// 	dispatch(getDestino(contratoActual))
	// 		dispatch(getContratoByNum(contratoActual))
	// 		dispatch(getPasajero(userdata.id))
	// }, [contratoActual])

	// useFocusEffect(
	// 	React.useCallback(() => {
	// 		return () => {
	//       // Este código se ejecuta cuando el componente se desenfoca o se desmonta
	//       console.log('Pantalla desenfocada. Limpieza o desmontaje aquí.');
	// 			dispatch(cleanDestino())
	//     };
	// 	}, [])
	// )

	// console.log("contrato actual! ", contratoActual);


	return (

		<SafeAreaView style={{ flex: 1 }}>
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