import { View, Text, StyleSheet, TouchableOpacity, Image, Platform, Alert } from "react-native"
import { Header } from "../muro/Header"
import React, { useContext, useEffect, useState } from "react";
import AwesomeAlert from "react-native-awesome-alerts";
import { GestioViajeContext } from "./GestionViajeContext";
import { checkLocationPermissions } from "./checkLocationPermissions";
import GetLocation from 'react-native-get-location'

import BackgroundService from 'react-native-background-actions';
import {veryIntensiveTask } from "./pruebaBackService";

export function GestionIniciarViaje({ navigation, route }) {

  const { totalSwitchesEnabled } = route.params
  const [showAlert2, setShowAlert2] = useState(false)
  const { miDato, actualizarDato } = useContext(GestioViajeContext)
  const [initialPosition, setInitialPosition] = useState(false)
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [position, setPosition] = useState("")


  //prueba
  const options = {
    taskName: 'Example',
    taskTitle: 'ExampleTask title',
    taskDesc: 'ExampleTask description',
    taskIcon: {
      name: 'ic_launcher',
      type: 'mipmap',
    },
    color: '#ff00ff',
    linkingURI: 'yourSchemeHere://chat/jane', // See Deep Linking for more info
    parameters: {
      delay: 1000,
      miDato,
      position
    },
  };

  const checkPermissions = async () => {
    //setShowAlert2(true)
    const status = await checkLocationPermissions();
    if (status === 'granted') {
      LocationTask()
      console.log("permisos otorgados");
      console.log(position);
      if(position.length !== 0){
        await BackgroundService.start(veryIntensiveTask, options);
        viajeIniciado(true)
      }
      else{
        setShowAlert(true);
        setErrorMessage("Intente nuevamente por favor.")
      }
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

  useEffect(()=>{
    LocationTask()
    checkLocationPermissions()
  },[])

  const LocationTask = async () => {
    try {
      const location = await getCurrentLocation();
      setPosition(location)
      return location
    } catch (error) {
      console.error('Error al obtener la ubicación:', error.code, error.message);
    }
  };

  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      try {
        GetLocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 60000,
        }).then((location) => {
          const latitude = location.latitude;
          const longitude = location.longitude;
          resolve({ latitude, longitude });
        })
          .catch(error => {
            const { code, message } = error;
            setShowAlert2(false);
            setShowAlert(true);
            setErrorMessage(code, message);
          })
      } catch (error) {
        console.error("error: ", error);
        reject(error);
      }
    })
  }


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