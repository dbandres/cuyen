import { StyleSheet, Text, View, Animated, TouchableOpacity, Alert, ScrollView } from "react-native";
import { Header } from "../muro/Header";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { getAllColegiosXViaje, getAllPasajerosXColegio, } from "../../../redux/actions";
import { ComponenteExpandible } from "./ComponenteExpandible";
import { ButtonCustom } from "../../../components/ButtomCustom";
import AwesomeAlert from "react-native-awesome-alerts";
import axios from "axios";
import { token } from "../../../api";
import { useFocusEffect } from "@react-navigation/native";


export function GestionViajeTwo({ navigation, route }) {

  const { data } = route.params;
  const dispatch = useDispatch();
  const colegiosPorViaje = useSelector((state) => state.colegiosPorViaje)
  const pasajerosPorColegio = useSelector((state) => state.pasajerosPorColegio)
  const [totalSwitchesEnabled, setTotalSwitchesEnabled] = useState(0);
  const [modificTotal, setModificTotal] = useState(0)
  const [showAlert, setShowAlert] = useState(false)
  const [showAlert2, setShowAlert2] = useState(false)
  const [showAlert3, setShowAlert3] = useState(false)
  const [arrayDeNumeros, setArrayDeNumeros] = useState("")
  const showAlertFunc = () => {
    setShowAlert(true);
  };

  const hideAlert = () => {
    setShowAlert(false);
  };

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

  const seteo = (value) => {
    setTotalSwitchesEnabled(value)
  }

  const setModificandoTotal = (value) => {
    setModificTotal(value)
  }

  const show = () => {
    setShowAlert3(true)
  }
  const hideAlert3 = () => {
    setShowAlert3(false);
  };

  const getAlert2 = () => {
    return (
      <AwesomeAlert
        show={showAlert3}
        showProgress={false}
        title="El viaje ya está iniciado"
        message={`Pasajeros confirmados : ${totalSwitchesEnabled}`}
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText="Aceptar"
        confirmButtonColor="#DD6B55"
        onConfirmPressed={() => {
          hideAlert3();
          navigation.navigate("gestionViajeFinalizar", { totalSwitchesEnabled })
        }}
      />
    )
  }

  useFocusEffect(
    React.useCallback(() => {
      console.log("se monto");
      setShowAlert2(true)
      setTimeout(() => {
        setShowAlert2(false)
      }, 5000)
    }, [])
  );

  useEffect(() => {
    //setShowAlert2(true)
    try {
      axios.get(`/viaje/${data[0]}`,
        {
          headers: {
            'x-access-token': `${token}`,
            'Content-Type': 'application/json',
          },
        }
      ).then((res) => {
        if (res.status === 200) {
          if (res.data.inicioViaje === true && res.data.finViaje === false) {
            console.log("tengo data");
            //setShowAlert2(false)
            show()
          } else if (res.data.inicioViaje === true && res.data.finViaje === true) {
            //setShowAlert2(false)
            console.error("El viaje ya finalizo! ")
            navigation.navigate("gestion de pasajeros")
          } else {
            //setShowAlert2(false)
            console.log("Controlar Alumnos Presentes!");
          }
        }
      })
    } catch (error) {
      console.log("error en el use Effect: ", error);
    }
  }, [data])

  useEffect(() => {
    console.log("data: ", data);
    dispatch(getAllColegiosXViaje(data[0]))
  }, [])

  useFocusEffect(
    React.useCallback(() => {
      if (colegiosPorViaje.length !== 0) {
        dispatch(getAllPasajerosXColegio(colegiosPorViaje));
      }
    }, [colegiosPorViaje])
  );

  useEffect(() => {
    console.log("modifico");
    dispatch(getAllPasajerosXColegio(colegiosPorViaje))
  }, [showAlert])

  useEffect(() => {
    if (modificTotal !== 0) {
      console.log("total: ", totalSwitchesEnabled);
      console.log("modificado: ", modificTotal);
      const result = calculoTotal(totalSwitchesEnabled, modificTotal)
      setTotalSwitchesEnabled(result)
      setModificTotal(0)
    }
  }, [modificTotal])

  const calculoTotal = (valor1, valor2) => {
    return valor1 + (valor2)
  }
  function handleConfirmar() {
    console.log(calculoTotal(totalSwitchesEnabled, modificTotal));
    const result = calculoTotal(totalSwitchesEnabled, modificTotal)
    setTotalSwitchesEnabled(result)
    setModificTotal(0)
    showAlertFunc()
  }

  console.log("total pasajeros: ", pasajerosPorColegio.length);

  return (
    <View style={styles.container}>
      <Header children="Gestión de Pasajeros" navigation={navigation} />
      <ScrollView>
        <View style={{ width: "100%", justifyContent: "flex-start", alignItems: "center", display: "flex", height: "100%" }}>
          <View style={{ height: 70, width: 331, backgroundColor: "white", marginTop: "10%", borderRadius: 10, justifyContent: "center", padding: "5%" }}>
            <Text style={{ fontWeight: "800", fontSize: 12, lineHeight: 14, color: "#564C71" }}>Pasajeros del viaje</Text>
          </View>
          <View>
            {
              colegiosPorViaje?.map((col, index) => (
                <ComponenteExpandible key={index} index={index} data={col} seteo={seteo} setModificandoTotal={setModificandoTotal} arrayDeNumeros={arrayDeNumeros} pasajerosPorColegio={pasajerosPorColegio} />
              ))
            }
          </View>
          <View style={{ width: 331, height: 40, marginTop: "5%", marginBottom: 10 }}>
            <ButtonCustom
              text="Confirmar pasajeros"
              color={totalSwitchesEnabled === 0 ? "#CDD1DF" : "#FF3D00"}
              disabled={totalSwitchesEnabled === 0 ? true : false}
              onPress={handleConfirmar}
            />
          </View>
        </View>
      </ScrollView>
      {showAlert2 ? getAlert() : null}
      {showAlert3 ? getAlert2() : null}
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title="¿Está seguro de que desea iniciar el viaje actual con los pasajeros confirmados?"
        message={`Pasajeros confirmados : ${totalSwitchesEnabled}`}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        confirmText="Aceptar"
        cancelText="Cancelar"
        confirmButtonColor="#DD6B55"
        onConfirmPressed={() => {
          hideAlert();
          navigation.navigate("gestionIniciarViaje", { totalSwitchesEnabled })
        }}
        onCancelPressed={() => {
          hideAlert();
        }}
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