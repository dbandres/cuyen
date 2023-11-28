import { View, Text, StyleSheet, TouchableOpacity, Image, Platform } from "react-native"
import { Header } from "../muro/Header"
import { PERMISSIONS, check, request } from "react-native-permissions";



export function GestionIniciarViaje({ navigation, route }) {

  const { totalSwitchesEnabled } = route.params

  const checkLocationPermissions = async () =>{
    let permissionsStatus;
    if(Platform.OS === 'ios'){
      // permissionsStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      permissionsStatus = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    }else{
      // permissionsStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      permissionsStatus = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    }
    console.log(permissionsStatus);
  }

  return (
    <View style={styles.container}>
      <Header children="Gestión de Pasajeros" navigation={navigation} />
      <View style={{ height: 100, justifyContent: "flex-end", alignItems: "center" }}>
        <View style={{ backgroundColor: "#CDD1DF", width: "90%", height: 73, borderRadius: 10, justifyContent: "space-around", display: "flex", flexDirection: "row", alignItems: "center" }}>
          <View style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", width: "70%" }}>
            <Text style={{ marginRight: 15, fontWeight: "800", fontSize: 14, lineHeight: 16 }}>{totalSwitchesEnabled}</Text>
            <Text style={{ fontWeight: "500", fontSize: 14, lineHeight: 16 }}>Pasajeros confirmados</Text>
          </View>
          <View><Text>ID</Text></View>
        </View>
      </View>
      <View style={{ height: 100, justifyContent: "flex-end", alignItems: "center" }}>
        <TouchableOpacity onPress={checkLocationPermissions} style={{ backgroundColor: "#37E67D", width: "90%", height: 73, borderRadius: 10, justifyContent: "space-around", display: "flex", flexDirection: "row", alignItems: "center" }}>
          <Image
            source={require("../../../assets/iniciarViaje.png")}
            style={{width:112, height:24}}
          />
        </TouchableOpacity>
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