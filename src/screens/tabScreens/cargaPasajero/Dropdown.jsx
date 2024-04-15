import { useEffect, useRef, useState } from "react";
import { Animated, Image, Text, TouchableOpacity, View } from "react-native"

export const Dropdown = ({ handleCuotaPress, dataPasajero, dataCuota, cuotaSeleccionada, children, contentRef, toggleExpandDropdown, setIsExpanded, isExpanded, i, disableDrop }) => {

  const [heightAnim] = useState(new Animated.Value(50)); // Inicia con la altura mínima


  useEffect(() => {
    if (isExpanded) {
      // Mide la altura del contenido cuando se expande
      contentRef.current.measure((x, y, width, height) => {
        Animated.timing(heightAnim, {
          toValue: 165, // Ajusta según tus necesidades
          //toValue: height + 480,
          duration: 100,
          useNativeDriver: false,
        }).start();
      });
    } else {
      setIsExpanded(false)
      // Cuando se colapsa, simplemente usa la altura mínima
      Animated.timing(heightAnim, {
        toValue: 50, // Altura mínima
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [isExpanded]);

  const toggleExpand = () => {
    // Envía el índice del componente al padre para gestionar la expansión individual
    if (i === 0) {
      setIsExpanded(!isExpanded);
    } else {
      setIsExpanded(!isExpanded);
    }
    toggleExpandDropdown()
  };

  console.log('data: ',dataPasajero);

  return (
    <View>
      <Animated.View ref={contentRef} style={{
        height: heightAnim, width: 331, backgroundColor: "white", borderRadius: 10, padding: "2%", justifyContent: "space-between", alignItems: "flex-start", flexDirection: 'column',
        borderWidth: 1,
        borderColor: '#CDD1DF',
        marginBottom: 15
      }}>
        <View style={{ width: "100%", justifyContent: "space-between", display: "flex", flexDirection: "row", borderBottomWidth: isExpanded === true ? 1 : 0, borderColor: "#CDD1DF" }}>
          <View style={{ width: "80%", height: 30, justifyContent: "flex-start", display: "flex", flexDirection: "row", alignItems: "center" }}>
            <Image source={require("../../../assets/request_quote.png")} style={{ width: 16, height: 20 }} />
            {
              cuotaSeleccionada ?
                <Text style={{ color: "#564C71", fontWeight: "600", fontSize: 14, lineHeight: 16, marginLeft: 7 }}>
                  {cuotaSeleccionada === 1 && i === 1 ? cuotaSeleccionada + " Cuota" : cuotaSeleccionada && i === 0 ? cuotaSeleccionada : cuotaSeleccionada + " Cuotas"}
                </Text>
                :
                <Text style={{ color: "#CDD1DF", fontWeight: "600", fontSize: 14, lineHeight: 16, marginLeft: 7 }}>
                  {children}
                </Text>
            }
          </View>
          <TouchableOpacity onPress={toggleExpand} disabled={i === 1 && disableDrop === null ||  i === 0 && disableDrop.length === 0?  true : false} style={{ alignItems: 'center' }}>
            {/* Botón flecha */}
            <Text>{isExpanded ? <Image source={require("../../../assets/Not_more.png")} style={{ width: 24, height: 24 }} /> : <Image source={require("../../../assets/expand_more.png")} style={{ width: 24, height: 24 }} />}</Text>
          </TouchableOpacity>
        </View>
        <View style={{ width: "100%", height: "80%", marginTop: 10 }}>
          {
            isExpanded === true && dataPasajero.length !== 0 && i === 1 ?
              dataPasajero.cuotas.map((cuota, index) => (
                cuota === 1 ?
                  <TouchableOpacity onPress={() => handleCuotaPress(cuota)} key={index} style={{ backgroundColor: cuota === cuotaSeleccionada ? "#E5EBFF" : null, borderRadius: 10, height: 24, justifyContent: "center" }}>
                    <Text style={{ fontWeight: "600", fontSize: 14, lineHeight: 16, color: cuota === cuotaSeleccionada ? "#564C71" : "#CDD1DF", marginLeft: 5 }}>
                      {cuota} Cuota
                    </Text>
                  </TouchableOpacity>
                  :
                  <TouchableOpacity onPress={() => handleCuotaPress(cuota)} key={index} style={{ backgroundColor: cuota === cuotaSeleccionada ? "#E5EBFF" : null, borderRadius: 10, height: 24, justifyContent: "center" }}>
                    <Text style={{ fontWeight: "600", fontSize: 14, lineHeight: 16, color: cuota === cuotaSeleccionada ? "#564C71" : "#CDD1DF", marginLeft: 5 }}>
                      {cuota} Cuotas
                    </Text>
                  </TouchableOpacity>
              ))
              :
              isExpanded === true && dataPasajero.length !== 0 && i === 0 ?
                dataPasajero.map((cuota, index) => (
                    <TouchableOpacity onPress={() => handleCuotaPress(cuota)} key={index} style={{ backgroundColor: cuota === cuotaSeleccionada ? "#E5EBFF" : null, borderRadius: 10, height: 24, justifyContent: "center" }}>
                      <Text style={{ fontWeight: "600", fontSize: 14, lineHeight: 16, color: cuota === cuotaSeleccionada ? "#564C71" : "#CDD1DF", marginLeft: 5 }}>
                        {cuota}
                      </Text>
                    </TouchableOpacity>
                ))
                :
                isExpanded === true && dataPasajero.length === 0 ?
                  dataCuota.map((cuota, index) => (
                    cuota === 1 ?
                      <TouchableOpacity onPress={() => handleCuotaPress(cuota)} key={index} style={{ backgroundColor: cuota === cuotaSeleccionada ? "#E5EBFF" : null, borderRadius: 10, height: 24, justifyContent: "center" }}>
                        <Text style={{ fontWeight: "600", fontSize: 14, lineHeight: 16, color: cuota === cuotaSeleccionada ? "#564C71" : "#CDD1DF", marginLeft: 5 }}>
                          {cuota} Cuota
                        </Text>
                      </TouchableOpacity>
                      :
                      <TouchableOpacity onPress={() => handleCuotaPress(cuota)} key={index} style={{ backgroundColor: cuota === cuotaSeleccionada ? "#E5EBFF" : null, borderRadius: 10, height: 24, justifyContent: "center" }}>
                        <Text style={{ fontWeight: "600", fontSize: 14, lineHeight: 16, color: cuota === cuotaSeleccionada ? "#564C71" : "#CDD1DF", marginLeft: 5 }}>
                          {cuota} Cuotas
                        </Text>
                      </TouchableOpacity>
                  ))
                  :
                  null
          }
        </View>
      </Animated.View>
    </View>
  )
}