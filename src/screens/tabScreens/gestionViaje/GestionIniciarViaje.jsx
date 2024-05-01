import { View, Text, StyleSheet, TouchableOpacity, Image, Platform, Alert } from "react-native"
import { Header } from "../muro/Header"
import React, { useContext, useEffect, useState } from "react";
import AwesomeAlert from "react-native-awesome-alerts";
import { GestioViajeContext } from "./GestionViajeContext";
import { checkLocationPermissions } from "./checkLocationPermissions";
import GetLocation from 'react-native-get-location'

import BackgroundService from 'react-native-background-actions';
import {veryIntensiveTask } from "./pruebaBackService";
import { openSettings } from "react-native-permissions";

export function GestionIniciarViaje({ navigation, route }) {

  const { totalSwitchesEnabled } = route.params
  const { miDato, actualizarDato } = useContext(GestioViajeContext)

  const [showAlert, setShowAlert] = useState(false);
  const [showAlert2, setShowAlert2] = useState(false)
  const [showAlert3, setShowAlert3] = useState(false)
  const [showAlert4, setShowAlert4] = useState(false)

  const [initialPosition, setInitialPosition] = useState(false)
  const [errorMessage, setErrorMessage] = useState('');
  const [position, setPosition] = useState("")

  useEffect(()=>{
    setTimeout(()=>{
      console.log("Renderizar alerta");
      setShowAlert4(true)
    },500)
  },[])

  const onCancel = () =>{
    navigation.navigate('gestion de pasajeros')
    setShowAlert4(false)
  }


  //prueba
  const options = {
    taskName: 'Cuyen Turismo',
    taskTitle: 'Transmitiendo Ubicacion',
    taskDesc: '',
    taskIcon: {
      name: 'ic_launcher',
      type: 'mipmap',
    },
    color: '#ff00ff',
    parameters: {
      delay: 1000,
      miDato,
      position
    },
  };

  const checkPermissions = async () => {
    const status = await checkLocationPermissions();
    if (status === 'granted') {
      LocationTask()
      console.log("permisos otorgados");
      if(position.length !== 0){
        setShowAlert2(true);
        await BackgroundService.start(veryIntensiveTask, options);
        viajeIniciado(true)
        console.log(position);
      }
      else{
        setShowAlert3(true);
        setErrorMessage("Permisos otorgados correctamente! Ahora puede Iniciar Viaje")
      }
    } else {
      console.log('esto es status: ', status);
      setShowAlert2(false);
      setShowAlert(true);
      setErrorMessage(`Estado del permiso: ${status.toUpperCase()}, por favor otorgue los permisos adecuados para poder Iniciar el viaje. En la configuración de los permisos seleccione PREMITIR TODO EL TIEMPO.`);
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
    setShowAlert3(false)
  };

  const hideAlert2 =()=>{
    setShowAlert(false);
    openSettings()
  }

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
        message={errorMessage}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showConfirmButton={true}
        confirmText="Ir a Configuracion"
        confirmButtonColor="#DD6B55"
        onConfirmPressed={() => hideAlert2()}
      />
      <AwesomeAlert
        show={showAlert3}
        showProgress={false}
        message={errorMessage}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showConfirmButton={true}
        confirmText="Aceptar"
        confirmButtonColor="#DD6B55"
        onConfirmPressed={() => hideAlert()}
      />
      <AwesomeAlert
        show={showAlert4}
        showProgress={false}
        message="Esta aplicacion recopila informacion sobre su ubicacion como COORDINADOR para poder Iniciar el Viaje y brindar, a los usuarios con rol Padre, la ubicacion del contingente aun cuando la app este cerrada y no se encuentre en uso."
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        confirmText="Aceptar"
        confirmButtonColor="#37E67D"
        cancelButtonColor="red"
        onConfirmPressed={() => setShowAlert4(false)}
        onCancelPressed={()=> onCancel()}
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