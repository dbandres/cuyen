import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export function DetalleInfoContrato({InfoContrato}) {
  
  console.log(JSON.stringify(InfoContrato, null, 3));

  return (
    <View style={{ width: 323, height: 180 }}>
      <View style={{marginBottom:5, display:"flex", flexDirection:"row"}}>
        <Text style={styles.title}>
          Colegio
        </Text>
        <Text style={styles.descrip}>
          {InfoContrato. colegio}
        </Text>
      </View>
      <View style={{marginBottom:5, display:"flex", flexDirection:"row"}}>
        <Text style={styles.title}>
          Curso
        </Text>
        <Text style={styles.descrip}>
          {InfoContrato. curso}
        </Text>
      </View>
      <View style={{marginBottom:5, display:"flex", flexDirection:"row"}}>
        <Text style={styles.title}>
          Contrato
        </Text>
        <Text style={styles.descrip}>
          {InfoContrato. num}
        </Text>
      </View>
      <View style={{marginBottom:5, display:"flex", flexDirection:"row"}}>
        <Text style={styles.title}>
          Destino
        </Text>
        <Text style={styles.descrip}>
          {InfoContrato. destino}
        </Text>
      </View>
      <View style={{marginBottom:5, display:"flex", flexDirection:"row"}}>
        <Text style={styles.title}>
          Quincena
        </Text>
        <Text style={styles.descrip}>
          {InfoContrato.periodo.trim()} - {InfoContrato.mes}
        </Text>
      </View>
      <View style={{marginBottom:5, display:"flex", flexDirection:"row"}}>
        <Text style={styles.title}>
          Cantidad de dias
        </Text>
        <Text style={styles.descrip}>
          {InfoContrato. duracion}
        </Text>
      </View>
      {/* <View style={{ height: 70 }}>
        <TouchableOpacity style={{ width: 331, height: 47, backgroundColor: "#FFFFFF", borderRadius: 10, top: 25, justifyContent: "center", alignItems: "center", borderWidth: 1, borderColor: "#334EA2" }}>
          <Text style={{ color: "#334EA2", fontWeight: "600", fontSize: 12, lineHeight: 14, textAlign: "center" }}>
            Descargar Contrato
          </Text>
        </TouchableOpacity>
      </View> */}
    </View>
  )
}

const styles = StyleSheet.create({
	title: {
		color:"#949AAF",
    fontWeight:"400",
    fontSize:12,
    lineHeight:25
	},
  descrip:{
    color:"#949AAF",
    fontWeight:"700",
    fontSize:12,
    lineHeight:25,
    marginLeft:5
  }
})