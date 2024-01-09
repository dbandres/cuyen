import { View, Text, StyleSheet, TouchableOpacity, Image, Platform, Alert } from "react-native"
import { Header } from "../muro/Header"
import React, { useContext, useEffect, useState } from "react";
import AwesomeAlert from "react-native-awesome-alerts";
import { GestioViajeContext } from "./GestionViajeContext";
import axios from "axios";
import { API_URL, token } from "../../../api";
import { startBackgroundService } from './backgroundService';
import Geolocation from '@react-native-community/geolocation';
import { checkLocationPermissions } from "./checkLocationPermissions";


export function GestionIniciarViaje({ navigation, route }) {

  const { totalSwitchesEnabled } = route.params
  const [showAlert2, setShowAlert2] = useState(false)
  const { miDato, actualizarDato } = useContext(GestioViajeContext)
  const [initialPosition, setInitialPosition] = useState(false)
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');


  const checkPermissions = async () => {
    setShowAlert2(true)
    const status = await checkLocationPermissions();
    if (status === 'granted') {
      startBackgroundService(LocationTask)
    } else {
      setShowAlert2(false);
      setShowAlert(true);
      setErrorMessage("Otorgando permisos, intente nuevamente!");
    }
  }

  const viajeIniciado = (value) => {
    setInitialPosition(value)
  }

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

  const changeStatusViaje = async (location) => {
    try {
      await axios.put(`${API_URL}/viaje/${miDato.dato}`,
        {
          "inicioViaje": true,
          "ultimaUbic": location
        },
        {
          headers: {
            'x-access-token': `${token}`,
            "Content-Type": "application/json",
          }
        }
      )
        .then((res) => {
          if (res.status === 200) {
            viajeIniciado(true)
            console.log("location enviada con exito");
          }
        })
    } catch (error) {
      console.log("error en change status viaje: ", error);
    }
  }

  const sendLocationToBackend = async (location) => {
    // Enviar location al backend
    console.log('Ubicación enviada al backend:', location);
    changeStatusViaje(location)

  };

  const LocationTask = async () => {
      try {
        const location = await getCurrentLocation();
        await sendLocationToBackend(location)
      } catch (error) {
        console.error('Error al obtener la ubicación:', error.code, error.message);
      }
  };

  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      try {
        Geolocation.getCurrentPosition(
          (info) => {
            const latitude = info.coords.latitude;
            const longitude = info.coords.longitude;
            console.log('Ubicación actualizada:', { latitude, longitude });
            resolve({ latitude, longitude });
          },
          (error) => {
            setShowAlert2(false);
            setShowAlert(true);
            setErrorMessage("El dispositivo bloqueo la ubicacion, por favor otorgue los permisos desde el sistema para continuar.");
            reject(error);
          },
          { enableHighAccuracy: true, timeout: 30000, maximumAge: 3600000 }
        );
      } catch (error) {
        console.error("error: ", error);
        reject(error);
      }
    });
  };

  const hideAlert = () => {
    setShowAlert(false);
  };

  useEffect(() => {
    if (initialPosition !== false) {
      setTimeout(() => {
        setShowAlert2(false)
        navigation.navigate("gestionViajeOK", { totalSwitchesEnabled })
      }, 4000)
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
        <TouchableOpacity onPress={checkPermissions} style={{ backgroundColor: "#37E67D", width: "90%", height: 73, borderRadius: 10, justifyContent: "space-around", display: "flex", flexDirection: "row", alignItems: "center" }}>
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
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title="Error"
        message={errorMessage || "Hubo un error al obtener la ubicación."}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showConfirmButton={true}
        confirmText="Aceptar"
        confirmButtonColor="#DD6B55"
        onConfirmPressed={() => hideAlert()}
      />
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