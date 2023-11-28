import { StyleSheet, Text, View, Animated, TouchableOpacity, Alert } from "react-native";
import { Header } from "../muro/Header";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { getAllColegiosXViaje, getAllPasajerosXColegio, getAllPasajerosXColegioFilter } from "../../../redux/actions";
import { ScrollView } from "react-native-gesture-handler";
import { ComponenteExpandible } from "./ComponenteExpandible";
import { ButtonCustom } from "../../../components/ButtomCustom";
import AwesomeAlert from "react-native-awesome-alerts";



export function GestionViajeTwo({ navigation, route }) {

  const { data } = route.params;
  const dispatch = useDispatch();
  const colegiosPorViaje = useSelector((state) => state.colegiosPorViaje)
  const pasajerosPorColegio = useSelector((state) => state.pasajerosPorColegio)
  const [totalSwitchesEnabled, setTotalSwitchesEnabled] = useState(0);
  const [modificTotal, setModificTotal] = useState(0)
  const [showAlert, setShowAlert] = useState(false)

  const arrayDeNumeros = colegiosPorViaje.map(colegio => colegio.num);

  console.log(arrayDeNumeros);

  const showAlertFunc = () => {
    setShowAlert(true);
  };

  const hideAlert = () => {
    setShowAlert(false);
  };

  const seteo = (value) =>{
    setTotalSwitchesEnabled(value)
  }

  const setModificandoTotal = (value) => {
    setModificTotal(value)
  }

  useEffect(() => {
    dispatch(getAllColegiosXViaje(data[0]))
    dispatch(getAllPasajerosXColegio(arrayDeNumeros))
  }, [])

  useEffect(() => {
    console.log("modifico");
    dispatch(getAllPasajerosXColegio(arrayDeNumeros))
  }, [showAlert])

  console.log("enabled ", totalSwitchesEnabled);
  console.log("modi: ", modificTotal);

  const calculoTotal = (valor1, valor2) =>{
    return valor1 + valor2
  }
  function handleConfirmar() {
    console.log(calculoTotal(totalSwitchesEnabled, modificTotal));
    const result = calculoTotal(totalSwitchesEnabled, modificTotal)
    setTotalSwitchesEnabled(result)
    setModificTotal(0)
    showAlertFunc()
  }


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
                <ComponenteExpandible key={index} index={index} data={col} seteo={seteo} setModificandoTotal={setModificandoTotal} arrayDeNumeros={arrayDeNumeros} pasajerosPorColegio={pasajerosPorColegio}/>
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