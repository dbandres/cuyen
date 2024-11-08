import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { Header } from "../muro/Header";
import { ResumenDeuda } from "./componentesEstadoPagos.jsx/ResumenDeuda";
import { EstadoDePagosComponent } from "./componentesEstadoPagos.jsx/EstadoDePagosComponent";
import { ProximosVencimientos } from "./componentesEstadoPagos.jsx/ProximosVencimientos";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/UserContext";
import { useDispatch, useSelector } from "react-redux";
import { getCodigoBarraPasajero, getCuotasPasajero } from "../../../redux/actions";
import { InfoContext } from "./InfoContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../../../context/AuthContext";
import AwesomeAlert from "react-native-awesome-alerts";
import { SelectPasajero } from "./componentesEstadoPagos.jsx/SelectPasajero";


export function EstadoDePagos({ navigation }) {

  const cuotasPasajero = useSelector((state) => state.cuotasPasajero)
  const codPasajero = useSelector((state) => state.codPasajero)
  const contratoActual = useSelector((state) => state.currentContrato)
  const { userdata } = useContext(UserContext)
  const { miInfo, setMiInfo } = useContext(InfoContext)

  const [showAlert, setShowAlert] = useState(false)
  const [controlSelect, setControlSelect] = useState(false)
  const dispatch = useDispatch()

  const getAlert = () => {
    return (
      <AwesomeAlert
        show={showAlert}
        showProgress={true}
        progressColor="black"
        progressSize={50}
        closeOnTouchOutside={false}
      />
    )
  }

  useEffect(() => {
    if (miInfo.numPasajero !== "") {
      setShowAlert(true)
      dispatch(getCuotasPasajero(contratoActual, miInfo.numPasajero))
      dispatch(getCodigoBarraPasajero(contratoActual, miInfo.numPasajero))
      setTimeout(() => {
        setShowAlert(false)
      }, 5000)
    } else {
      console.log('no hay ningun pasajero seleccionado');
    }
  }, [miInfo])


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, backgroundColor: "#D2DCEB" }}>
        <View style={styles.container}>
          <Header children="Estado de pagos" navigation={navigation} />
          <SelectPasajero
          setControlSelect={setControlSelect}
          />
          <ResumenDeuda
            data={cuotasPasajero}
          />
          <EstadoDePagosComponent data={cuotasPasajero} />
          <ProximosVencimientos data={codPasajero} controlSelect={controlSelect}/>
          <View style={{ width: 373, height: 88, backgroundColor: "#FFFFFF", borderRadius: 10, marginTop: 20, alignItems: "center", justifyContent: "flex-start", display: "flex", flexDirection: "row", padding: 20, marginBottom: 10 }}>
            <View style={{ width: 44, height: 44, borderRadius: 50, backgroundColor: "#3FA9F5", alignItems: "center", justifyContent: "center" }}>
              <Image
                source={require('../../../assets/info.png')}
                style={{ width: 20, height: 20 }}
              />
            </View>
            <View style={{ height: 48, width: "80%", alignItems: "center", justifyContent: "center", marginLeft: 10 }}>
              <Text style={{ color: "#564C71", fontWeight: "400", fontSize: 10, lineHeight: 12 }}>Tenga presente que la información relacionado con la creación de cuotas o el impacto de los pagos, puede demorar entre 48 y 72 hs en actualizarse.</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      {showAlert ? getAlert() : null}
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: "#D2DCEB",
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10
  }
})