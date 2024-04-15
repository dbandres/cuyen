import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Header } from "../muro/Header";
import { ResumenDeuda } from "./componentesEstadoPagos.jsx/ResumenDeuda";
import { EstadoDePagosComponent } from "./componentesEstadoPagos.jsx/EstadoDePagosComponent";
import { ProximosVencimientos } from "./componentesEstadoPagos.jsx/ProximosVencimientos";
import { useContext, useEffect } from "react";
import { UserContext } from "../../../context/UserContext";
import { useDispatch, useSelector } from "react-redux";
import { getCodigoBarraPasajero, getCuotasPasajero } from "../../../redux/actions";
import { InfoContext } from "./InfoContext";
import { SafeAreaView } from "react-native-safe-area-context";


export function EstadoDePagos({navigation}) {

  const cuotasPasajero = useSelector((state) => state.cuotasPasajero)
  const codPasajero = useSelector((state) => state.codPasajero)
  const {userdata} = useContext(UserContext)
  const {miInfo} = useContext(InfoContext)
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getCuotasPasajero(userdata.contrato[0], miInfo.numPasajero))
    dispatch(getCodigoBarraPasajero(userdata.contrato[0], miInfo.numPasajero))
  },[])

  console.log(JSON.stringify(cuotasPasajero, null, 3));

  return (
    <SafeAreaView style={{flex:1}}>
      <ScrollView style={{ flex: 1, backgroundColor: "#D2DCEB" }}>
      <View style={styles.container}>
        <Header children="Contrato" navigation={navigation} />
        <ResumenDeuda
          data={cuotasPasajero}
        />
        <EstadoDePagosComponent data={cuotasPasajero}/>
        <ProximosVencimientos data={codPasajero}/>
      </View>
    </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#D2DCEB",
		flex: 1,
		display: "flex",
    justifyContent:"center",
    alignItems:"center",
    marginBottom:10
	}
})