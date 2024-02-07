import { Image, Text, View } from "react-native";


export function MensajeAlerta() {
  return (
    <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", width: 332, height: 44 }}>
      <View style={{ width: 44, height: 44, backgroundColor: "#FFB800", justifyContent: "center", alignItems: "center", borderRadius: 50 }}>
        <Image
          source={require("../../../assets/exclamation.png")}
          style={{ width: 2, height: 14 }}
        />
      </View>
      <View style={{width:278, height:24, marginLeft:15}}>
        <Text style={{ fontWeight: "400", fontSize: 10, lineHeight: 12, color: "#564C71" }}>
          Para completar el perfil del pasajero deberá acreditar la documentación adicional para el viaje.
        </Text>
      </View>
    </View>
  )
}