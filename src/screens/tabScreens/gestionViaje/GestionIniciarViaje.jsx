import { View, Text, StyleSheet, TouchableOpacity, Image, Platform } from "react-native"
import { Header } from "../muro/Header"
import { PERMISSIONS, check, request } from "react-native-permissions";
import Geolocation from "react-native-geolocation-service"
import { useEffect, useState } from "react";
import AwesomeAlert from "react-native-awesome-alerts";

export function GestionIniciarViaje({ navigation, route }) {

  const { totalSwitchesEnabled } = route.params
  const [initialPosition, setInitialPosition] = useState("")
  const [showAlert2, setShowAlert2] = useState(false)

  const returnView = () => {
    navigation.goBack();
  }

  const getAlert = () => {
    return (
      <AwesomeAlert
        show={showAlert2}
        showProgress={true}
        progressColor="black"
        progressSize={50}
        closeOnTouchOutside={false}
      />
    )
  }

  const checkLocationPermissions = async () => {
    setShowAlert2(true)
    let permissionsStatus;
    if (Platform.OS === 'ios') {
      // permissionsStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      permissionsStatus = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      if (permissionsStatus === "granted") {
        getLocation()
      } else {
        console.log("No sse otorgaron los permisos");
      }
    } else {
      // permissionsStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      permissionsStatus = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      if (permissionsStatus === "granted") {
        if (Platform.Version >= 29) {
          const backgroundPermissionStatus = await request(PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION)
          if (backgroundPermissionStatus === 'granted') {
            console.log("Permisos para ubicacion en segundo plano Garantizados");
            getLocation()
            //setInterval(getLocation, 60000); // Actualizar la ubicación cada 10 segundos
          } else {
            console.log('No se otorgaron los permisos de ubicación en segundo plano');
          }
        }
        getLocation()
        //setInterval(getLocation, 60000); // Actualizar la ubicación cada 10 segundos
      } else {
        console.log("No sse otorgaron los permisos");
      }
    }
    console.log(permissionsStatus);
  }

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        setInitialPosition(prevState => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          console.log('Ubicación anterior:', prevState);
          console.log('Ubicación actualizada:', { latitude, longitude });

          // Actualizar el estado combinando el estado anterior con el nuevo
          return { ...prevState, latitude, longitude };
        });
      },
      (error) => {
        console.error('Error al obtener la ubicación:', error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  useEffect(() => {
    if (initialPosition !== "") {
      setTimeout(() => {
        setShowAlert2(false)
        navigation.navigate("gestionViajeOK")
      }, 2000)
    }
  }, [initialPosition])


  return (
    <View style={styles.container}>
      <Header children="Gestión de Pasajeros" navigation={navigation} />
      <View style={{ height: 100, justifyContent: "flex-end", alignItems: "center" }}>
        <View style={{ backgroundColor: "#CDD1DF", width: "90%", height: 73, borderRadius: 10, justifyContent: "space-around", display: "flex", flexDirection: "row", alignItems: "center" }}>
          <View style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", width: "70%" }}>
            <Text style={{ marginRight: 15, fontWeight: "800", fontSize: 14, lineHeight: 16, color: "#564C71" }}>{totalSwitchesEnabled}</Text>
            <Text style={{ fontWeight: "500", fontSize: 14, lineHeight: 16, color: "#564C71" }}>Pasajeros confirmados</Text>
          </View>
          <View><Text style={{ color: "#564C71" }}>ID</Text></View>
        </View>
      </View>
      <View style={{ height: 100, justifyContent: "flex-end", alignItems: "center" }}>
        <TouchableOpacity onPress={checkLocationPermissions} style={{ backgroundColor: "#37E67D", width: "90%", height: 73, borderRadius: 10, justifyContent: "space-around", display: "flex", flexDirection: "row", alignItems: "center" }}>
          <Image
            source={require("../../../assets/iniciarViaje.png")}
            style={{ width: 112, height: 24 }}
          />
        </TouchableOpacity>
      </View>
      <View style={{ height: 70, justifyContent: "flex-end", alignItems: "center" }}>
        <TouchableOpacity onPress={returnView} style={{ backgroundColor: "#FFFFFF", width: "90%", height: 47, borderRadius: 10, justifyContent: "space-around", display: "flex", flexDirection: "row", alignItems: "center", borderColor: "#334EA2", borderWidth: 1 }}>
          <Text style={{ fontWeight: "600", fontSize: 12, lineHeight: 14, color: "#334EA2" }}>
            Modificar pasajeros
          </Text>
        </TouchableOpacity>
      </View>
      {showAlert2 ? getAlert() : null}
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