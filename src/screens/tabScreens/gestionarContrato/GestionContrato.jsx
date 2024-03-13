import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Header } from "../muro/Header";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/UserContext";
import { useDispatch, useSelector } from "react-redux";
import { getContratoByNum } from "../../../redux/actions";
import { InfoContrato } from "./InfoContrato";
import { ModalBuscarContrato } from "./ModalBuscarContrato";
import { useFocusEffect } from "@react-navigation/native";



export function GestionContrato({ navigation }) {

  const [showModal, setShowModal] = useState(false)
  const { userdata } = useContext(UserContext)
  const contratoInfo = useSelector((state) => state.contratoInfo)
  const [newFetch, setNewFetch] = useState(false)
  const dispatch = useDispatch()


  useFocusEffect(
    React.useCallback(() => {
      // Puedes realizar otras operaciones aquí, como cargar datos, etc.
      dispatch(getContratoByNum(userdata.contrato))
      return () => {
        // Este código se ejecuta cuando el componente se desenfoca o se desmonta
        console.log('Pantalla desenfocada. Limpieza o desmontaje aquí.');
      };
    }, []))


  useEffect(() => {
    if (newFetch === true) {
      dispatch(getContratoByNum(userdata.contrato))
    }
    setNewFetch(false)
  }, [newFetch])

  const openModal = () => {
    setShowModal(true)
  }

  const closedModal = () => {
    setShowModal(false)
  }
  console.log(JSON.stringify(userdata, null, 3));

  return (
    <View style={styles.container}>
      <Header
        children="Asignar Contrato" navigation={navigation}
      />
      {
        contratoInfo.length !== 0 ?
          contratoInfo.map((contrato, index) => (
            <InfoContrato
              key={index}
              contratoInfo={contrato}
              navigatio={navigation}
            />
          ))
          :
          <Text>
            Cargando información...
          </Text>
      }
      <TouchableOpacity onPress={openModal} style={{ backgroundColor: "#FF3D00", height: 47, width: "90%", borderRadius: 10, justifyContent: "center", alignItems: "center", marginTop: 15 }}>
        <Text style={{ color: "white" }}>
          Asignar nuevo contrato
        </Text>
      </TouchableOpacity>
      <ModalBuscarContrato
        visible={showModal}
        onClose={closedModal}
        setNewFetch={setNewFetch}
      />
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: "#D2DCEB",
    flex: 1,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center"
  }
})