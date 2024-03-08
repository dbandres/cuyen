import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Header } from "../muro/Header";
import { Destino } from "./componentesInfoDelViaje/Destino";
import { Informacion } from "./componentesInfoDelViaje/Informacion";
import { Contingente } from "./componentesInfoDelViaje/Contingente";
import { Hotel } from "./componentesInfoDelViaje/Hotel";


export function InfoDelViaje({ navigation }) {

	return (

		<ScrollView style={{ flex:1, backgroundColor: "#D2DCEB" }}>
			<View style={styles.container}>
				<Header children="Informacion del viaje" navigation={navigation} />
				<Destino />
				<Informacion />
				<Contingente navigation={navigation}/>
				<Hotel />
			</View>
		</ScrollView>

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