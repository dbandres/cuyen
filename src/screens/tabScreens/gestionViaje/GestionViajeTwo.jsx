import { StyleSheet, Text, View } from "react-native";
import { Header } from "../muro/Header";



export function GestionViajeTwo({ navigation }) {
  return (
    <View style={styles.container}>
      <Header children="Gestión de Pasajeros" navigation={navigation} />
      <View style={{ width: "100%", justifyContent: "flex-start", alignItems: "center", display: "flex", height: "100%" }}>
        <View style={{ height: 70, width: 331, backgroundColor: "white", marginTop: "10%", borderRadius: 10, justifyContent: "center", padding: "5%" }}>
          <Text style={{ fontWeight: "800", fontSize: 12, lineHeight: 14, color: "#564C71" }}>Pasajeros del viaje</Text>
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