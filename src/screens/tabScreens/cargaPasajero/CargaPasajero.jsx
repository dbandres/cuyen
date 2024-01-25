import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { Header } from "../muro/Header";
import { useState } from "react";
import { Form } from "./Form";



export function CargaPasajero({ navigation }) {

	const [showForm, setShowForm] = useState(false)


	const agregarPasajero = () => {
		setShowForm(!showForm)
	}

	return (
		<ScrollView style={styles.container}>
			<View style={{
				flex: 1, display: "flex",
				alignItems: "center",
				justifyContent: "flex-start"
			}}>
				<Header
					children="Registro de pasajero "
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
					showForm !== false ?
						<>
							<Form />
						</>
						:
						null
				}
				<View style={{height:70}}>
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