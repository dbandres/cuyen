import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native";
import { Header } from "../muro/Header";
import DropDownPicker from "react-native-dropdown-picker";
import { useState } from "react";
import { UserContext } from "../../../context/UserContext";
import { useContext, useEffect } from "react";
import axios from "axios";
import { token } from "../../../api";

export function GestionViaje({ navigation }) {

	const [selectedValue, setSelectedValue] = useState(null);
	const { userdata } = useContext(UserContext)
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState(null);
	const [items, setItems] = useState([]);

	useEffect(() => {
		axios.post("/coordinador",
			{
				"contratos": [userdata.contrato]
			},
			{
				headers: {
					'x-access-token': `${token}`,
					"Content-Type": "application/json",
				}
			}
		).then((res) => {
			if (res.status === 200) {
				const newItems = res.data.map((data) => ({
					label: data.escuelas,
					value: data.travelId
				}))
				setItems(newItems)
			}
		})
	}, [])

	useEffect(()=>{
		navigation.navigate("gestionDePasajerosTwo")
	},[value !== null])

	return (
		<View style={styles.container}>
			<Header children="Gestión de Pasajeros" navigation={navigation} />
			<View style={{ width: "100%", justifyContent: "flex-start", alignItems: "center", display: "flex", height: "100%" }}>
				<View style={{ width: "90%", height: 100, alignItems: "center", justifyContent: "center" }}>
					<DropDownPicker
						items={items}
						value={value}
						open={open}
						setItems={setItems}
						setOpen={setOpen}
						setValue={setValue}
						placeholder="Identificador del viaje"
						placeholderStyle={{ color: "#CDD1DF" }}
						mode="BADGE"
						multiple={true}
						dropDownContainerStyle={{
							borderColor: "#D2DCEB",
						}}
						searchPlaceholder="Buscar..."
						searchContainerStyle={{
							borderBottomColor: "white"
						}}
						searchTextInputStyle={{
							color: "#000"
						}}
						searchPlaceholderTextColor="#D2DCEB"
						itemSeparator={false}
						searchable={true}
						badgeColors={["#FF3D00"]}
						badgeDotColors={["white"]}
						badgeTextStyle={{ color: "white" }}
						style={{ borderColor: "#CDD1DF" }}
						labelStyle={{ color: "green" }}
					/>
				</View>
			</View>
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