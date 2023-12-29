import { View, Text, StyleSheet } from "react-native";
import { Header } from "../muro/Header";


export function InfoDelViaje({navigation}) {
	return (
		<View style={styles.container}>
			<Header children="Contrato" navigation={navigation} />
			<Text>
				InfoDelViaje
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