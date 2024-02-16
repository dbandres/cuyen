import { Image, Text, View } from "react-native";

export function InfoPasajero({info}){

  return(
    <View style={{width:"90%", height:200}}>
      <View style={{display:"flex", flexDirection:"row", width:122, height:30, alignItems:"center", marginBottom:15}}>
        <Image
          source={require("../../../assets/badge.png")}
          style={{ width: 24, height: 24 }}
        />
        <Text style={{marginRight:5, marginLeft:10, fontWeight:"400", fontSize:12, lineHeight:30, color:"#564C71"}}>
          DNI 
        </Text>
        <Text style={{fontWeight:"700", fontSize:12, lineHeight:30, color:"#564C71"}}>
          {info.dni}
        </Text>
      </View>
      <View style={{display:"flex", flexDirection:"row", width:238, height:30, alignItems:"center", marginBottom:15}}>
        <Image
          source={require("../../../assets/calendar_month.png")}
          style={{ width: 24, height: 26 }}
        />
        <Text style={{marginRight:5, marginLeft:10, fontWeight:"400", fontSize:12, lineHeight:30, color:"#564C71"}}>
          Fecha de Nacimiento 
        </Text>
        <Text style={{fontWeight:"700", fontSize:12, lineHeight:30, color:"#564C71"}}>
          {info.fechaNac}
        </Text>
      </View>
      <View style={{display:"flex", flexDirection:"row", width:238, height:30, alignItems:"center", marginBottom:15}}>
        <Image
          source={require("../../../assets/attach_money.png")}
          style={{ width: 10, height: 20, marginLeft:7 }}
        />
        <Text style={{marginRight:5, marginLeft:10, fontWeight:"400", fontSize:12, lineHeight:30, color:"#564C71"}}>
          Importe 
        </Text>
        <Text style={{fontWeight:"700", fontSize:12, lineHeight:30, color:"#564C71"}}>
          {info.importe}
        </Text>
      </View>
      <View style={{display:"flex", flexDirection:"row", width:238, height:30, alignItems:"center", marginBottom:15}}>
        <Image
          source={require("../../../assets/request_quote.png")}
          style={{ width: 20, height: 24 }}
        />
        <Text style={{marginRight:5, marginLeft:10, fontWeight:"400", fontSize:12, lineHeight:30, color:"#564C71"}}>
          Cuotas 
        </Text>
        <Text style={{fontWeight:"700", fontSize:12, lineHeight:30, color:"#564C71"}}>
          {info.cuotas}
        </Text>
      </View>
    </View>
  )
}