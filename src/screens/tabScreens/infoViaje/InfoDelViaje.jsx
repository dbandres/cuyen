import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Header } from "../muro/Header";


export function InfoDelViaje({navigation}) {

	const Ir = () =>{
		navigation.navigate("carga-pasajero")
	}

	return (
		<View style={styles.container}>
			<Header children="Contrato" navigation={navigation} />
			<Text>
				InfoDelViaje
			</Text>
			<TouchableOpacity onPress={Ir}>
				<Text>
					ir a carga de pasajero
				</Text>
			</TouchableOpacity>
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