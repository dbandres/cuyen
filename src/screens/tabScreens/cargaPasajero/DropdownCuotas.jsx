import { useEffect, useRef, useState } from "react";
import { Animated, Image, Text, TouchableOpacity, View } from "react-native"

export const DropdownCuotas = ({ isExpanded1, setIsExpanded1, contentRef1, heightAnim1, dataPasajero, FDPSeleccionado, cuotaSeleccionada, setCuotaSeleccionada }) => {

  const toggleExpand = () => {
    setIsExpanded1(!isExpanded1);
  };

  const selectCuota = (value) => {
    setCuotaSeleccionada(value)
    toggleExpand()
  }

  useEffect(() => {
    setCuotaSeleccionada(null)
  }, [FDPSeleccionado])

  const remderItem = (item) => {
    return (
      <>
        {
          item == "Sin interés" ?
            <TouchableOpacity onPress={() => { selectCuota(dataPasajero.cuotas_s_int) }} style={{ borderRadius: 10, height: 24, justifyContent: "center" }}>
              <Text style={{ fontWeight: "600", fontSize: 14, lineHeight: 16, color: "#CDD1DF", marginLeft: 10 }}>
                {dataPasajero.cuotas_s_int}
              </Text>
            </TouchableOpacity>
            : item === "Contado" ?
              <TouchableOpacity onPress={() => { selectCuota(1) }} style={{ borderRadius: 10, height: 24, justifyContent: "center" }}>
                <Text style={{ fontWeight: "600", fontSize: 14, lineHeight: 16, color: "#CDD1DF", marginLeft: 10 }}>
                  1
                </Text>
              </TouchableOpacity>
              :
              item === "Actualizado por IPC" ?
                dataPasajero.cuotas.slice(2).map((cuota, index) => (
                  <TouchableOpacity key={index} onPress={() => { selectCuota(cuota) }} style={{ borderRadius: 10, height: 24, justifyContent: "center" }}>
                    <Text style={{ fontWeight: "600", fontSize: 14, lineHeight: 16, color: "#CDD1DF", marginLeft: 10 }}>
                      {cuota}
                    </Text>
                  </TouchableOpacity>
                ))
                :
                dataPasajero.cuotas.map((cuota, index) => (
                  <TouchableOpacity key={index} onPress={() => { selectCuota(cuota) }} style={{ borderRadius: 10, height: 24, justifyContent: "center" }}>
                    <Text style={{ fontWeight: "600", fontSize: 14, lineHeight: 16, color: "#CDD1DF", marginLeft: 10 }}>
                      {cuota}
                    </Text>
                  </TouchableOpacity>
                ))
        }
      </>
    )
  }

  return (
    <View>
      <Animated.View ref={contentRef1} style={{
        height: heightAnim1, width: 331, backgroundColor: "white", borderRadius: 10, padding: "2%", justifyContent: "space-between", alignItems: "flex-start", flexDirection: 'column',
        borderWidth: 1,
        borderColor: '#CDD1DF',
        marginBottom: 15
      }}>
        <TouchableOpacity disabled={FDPSeleccionado.titulo === null ? true : false} onPress={toggleExpand} style={{ width: "100%", justifyContent: "space-between", display: "flex", flexDirection: "row", borderBottomWidth: isExpanded1 === true ? 1 : 0, borderColor: "#CDD1DF" }}>
          <View style={{ width: "80%", height: 30, justifyContent: "flex-start", display: "flex", flexDirection: "row", alignItems: "center" }}>
            <Image source={require("../../../assets/request_quote.png")} style={{ width: 16, height: 20 }} />
            {
              cuotaSeleccionada !== null ?
                <Text style={{ color: "#564C71", fontWeight: "600", fontSize: 14, lineHeight: 16, marginLeft: 10 }}>
                  {cuotaSeleccionada}
                </Text>
                :
                <Text style={{ color: "#CDD1DF", fontWeight: "600", fontSize: 14, lineHeight: 16, marginLeft: 10 }}>
                  Cuotas
                </Text>
            }
          </View>
          <TouchableOpacity disabled={FDPSeleccionado.titulo === null ? true : false} onPress={toggleExpand} style={{ alignItems: 'center' }}>
            {/* Botón flecha */}
            <Text>{isExpanded1 ? <Image source={require("../../../assets/Not_more.png")} style={{ width: 24, height: 24 }} /> : <Image source={require("../../../assets/expand_more.png")} style={{ width: 24, height: 24 }} />}</Text>
          </TouchableOpacity>
        </TouchableOpacity>
        <View style={{ width: "100%", height: "80%", marginTop: 10 }}>
          {
            isExpanded1 === true ?
              remderItem(FDPSeleccionado.titulo)
              :
              null
          }
        </View>
      </Animated.View>
    </View>
  )
}