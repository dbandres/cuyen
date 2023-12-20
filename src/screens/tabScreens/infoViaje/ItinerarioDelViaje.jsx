import { View, Text, StyleSheet } from "react-native";
import { Header } from "../muro/Header";
import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";

export function ItineratioDelViaje({navigation}) {

	const {userdata} = useContext(UserContext)
	console.log(userdata);

	return (
		<View style={styles.container}>
			<Header children="Itinerario de viaje" navigation={navigation} />
			<Text>
				ItineratioDelViaje
			</Text>
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