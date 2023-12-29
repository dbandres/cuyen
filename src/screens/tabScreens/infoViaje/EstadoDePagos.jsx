import { View, Text, StyleSheet } from "react-native";
import { Header } from "../muro/Header";

export function EstadoDePagos({navigation}) {
  return (
    <View style={styles.container}>
      <Header children="Contrato" navigation={navigation} />
      <Text>
        EstadoDePagos
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