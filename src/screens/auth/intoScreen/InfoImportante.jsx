import {ScrollView, View, Text} from "react-native"


export function InfoImportante() {
  return (
    <ScrollView
      horizontal={true}
      style>
      <View style={{ height: 286, width: 320, backgroundColor: "white", margin: 14, borderRadius: 10 }}>
        <View style={{ height: "30%", justifyContent: "center", margin: "5%" }}>
          <Text style={{ fontSize: 20, fontWeight: "400", lineHeight: 24, color: "#564C71" }}>Titulo de Informacion Importante</Text>
        </View>
        <View style={{ height: "45%", justifyContent: "center", borderTopColor: "#162962", borderTopWidth: 3 }}>
          <View style={{ margin: "5%" }}>
            <Text style={{ fontWeight: "400", fontSize: 15, lineHeight: 18, color: "#564C71" }}>Monitoreando y controlando cada situación del viaje, cada traslado, cada comida, cada inquietud, cada movimiento, cada consulta, todo.</Text>
          </View>
        </View>
      </View>
      <View style={{ height: 286, width: 320, backgroundColor: "white", margin: 14, borderRadius: 10 }}>
        <View style={{ height: "30%", justifyContent: "center", margin: "5%" }}>
          <Text style={{ fontSize: 20, fontWeight: "400", lineHeight: 24, color: "#564C71" }}>Titulo de Informacion Importante</Text>
        </View>
        <View style={{ height: "45%", justifyContent: "center", borderTopColor: "#162962", borderTopWidth: 3 }}>
          <View style={{ margin: "5%" }}>
            <Text style={{ fontWeight: "400", fontSize: 15, lineHeight: 18, color: "#564C71" }}>Monitoreando y controlando cada situación del viaje, cada traslado, cada comida, cada inquietud, cada movimiento, cada consulta, todo.</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}