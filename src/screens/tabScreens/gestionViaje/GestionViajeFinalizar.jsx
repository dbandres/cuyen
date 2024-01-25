import { useContext, useEffect, useState } from "react";
import { Header } from "../muro/Header";
import { StyleSheet, Text, View, Image, TouchableOpacity, BackHandler } from "react-native"
import { GestioViajeContext } from "./GestionViajeContext";
import { useDispatch, useSelector } from "react-redux";
import { getAllColegiosXViaje, getAllPasajerosXColegio } from "../../../redux/actions";
import { ComponenteExpandibleFinal } from "./ComponenteExpandibleFinal";
import AwesomeAlert from "react-native-awesome-alerts";
import { token } from "../../../api";
import axios from "axios";
import { stopBackgroundService } from "./pruebaBackService";





export function GestionViajeFinalizar({ navigation, route }) {

  const { totalSwitchesEnabled } = route.params
  const { miDato, actualizarDato } = useContext(GestioViajeContext)
  const [showAlert3, setShowAlet3] = useState(false)
  const colegiosPorViaje = useSelector((state) => state.colegiosPorViaje)
  const pasajerosPorColegio = useSelector((state) => state.pasajerosPorColegio)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllColegiosXViaje(miDato.dato))
    dispatch(getAllPasajerosXColegio(colegiosPorViaje))
  }, [])

  useEffect(() => {
    const handleBackButton = () => {
      // Aquí puedes personalizar el comportamiento del botón de retroceso
      navigation.navigate("gestion de pasajeros")
      return true;
    };

    // Agregar el event listener cuando el componente se monta
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    // Limpiar el event listener cuando el componente se desmonta
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  }, []); // Asegúrate de que este efecto se ejecute solo al montar el componente

  const hideAlert3 = () => {
    setShowAlet3(false);
  };
  const getAlert2 = () => {
    return (
      <AwesomeAlert
        show={showAlert3}
        showProgress={false}
        title="El viaje ha finalizado con éxito!"
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText="Aceptar"
        confirmButtonColor="#DD6B55"
        onConfirmPressed={async () => {
          await stopBackgroundService();
          hideAlert3();
          navigation.navigate("gestion de pasajeros")
        }}
      />
    )
  }

  const finalizarViaje = () => {
    console.log(miDato);
    try {
      axios.put(`/viaje/${miDato.dato}`,
        {
          "finViaje": true,
        },
        {
          headers: {
            'x-access-token': `${token}`,
            "Content-Type": "application/json",
          }
        }
      ).then((res) => {
        if (res.status === 200) {
          setShowAlet3(true)
        }
      })
    } catch (error) {
      console.log("error en change status viaje: ", error);
    }
  }



  return (
    <View style={styles.container}>
      <Header children="Colegio/División" navigation={navigation} noGoBack={true} />
      <View style={{ height: 100, justifyContent: "flex-end", alignItems: "center" }}>
        <View style={{ width: 331, backgroundColor: "#CDD1DF", height: 73, borderRadius: 10, justifyContent: "center", display: "flex", flexDirection: "row", alignItems: "center" }}>
          <View style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", width: "50%" }}>
            <Text style={{ marginRight: 15, fontWeight: "800", fontSize: 14, lineHeight: 16, color: "#564C71" }}>{totalSwitchesEnabled}</Text>
            <Text style={{ fontWeight: "500", fontSize: 14, lineHeight: 16, color: "#564C71" }}>Pasajeros confirmados</Text>
          </View>
        </View>
      </View>
      <View style={{ height: 65, justifyContent: "flex-end", alignItems: "center" }}>
        <View style={{ width: 331, height: 48, backgroundColor: "white", borderRadius: 10, display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
          <Image
            source={require("../../../assets/bus.png")}
            style={{ width: 24, height: 24, marginRight: 10 }}
          />
          <Text style={{ fontWeight: "700", fontSize: 14, lineHeight: 16, color: "#564C71" }}>
            Viaje en Curso
          </Text>
        </View>
      </View>
      <View>
        {
          colegiosPorViaje.map((colegio, index) => (
            <ComponenteExpandibleFinal key={index} pasajerosPorColegio={pasajerosPorColegio} data={colegio} />
          ))
        }
      </View>
      <View style={{ height: 100, justifyContent: "flex-end", alignItems: "center" }}>
        <TouchableOpacity onPress={finalizarViaje} style={{ width: 331, height: 80, backgroundColor: "#564C71", borderRadius: 10, display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontWeight: "700", fontSize: 14, lineHeight: 16, color: "#FFFFFF" }}>Finalizar viaje</Text>
        </TouchableOpacity>
      </View>
      {showAlert3 ? getAlert2() : null}
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