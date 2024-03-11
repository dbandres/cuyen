import { useEffect, useRef, useState } from "react";
import { Animated, Image, Text, TouchableOpacity, View } from "react-native";
import { ModalCodigoBarra } from "./ModalCodigoBarra";

export function ProximosVencimientos({ data }) {

  const [isExpanded, setIsExpanded] = useState(false);
  const [heightAnim] = useState(new Animated.Value(88));
  const [showModal, setShowModal] = useState(false)

  const contentRef = useRef(null);

  useEffect(() => {
    if (isExpanded) {
      // Mide la altura del contenido cuando se expande
      contentRef.current.measure((x, y, width, height) => {
        Animated.timing(heightAnim, {
          toValue: 260, // Ajusta según tus necesidades
          //toValue: height + 480,
          duration: 100,
          useNativeDriver: false,
        }).start();
      });
    } else {
      setIsExpanded(false)
      // Cuando se colapsa, simplemente usa la altura mínima
      Animated.timing(heightAnim, {
        toValue: 91, // Altura mínima
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  }, [isExpanded]);

  const toggleExpand = () => {
    // Envía el índice del componente al padre para gestionar la expansión individual
    setIsExpanded(!isExpanded);
  };

  // Función para convertir fecha
  const convertirFecha = (fechaOriginal) => {
    const fecha = new Date(fechaOriginal);
    const mes = fecha.getMonth() + 1; // Los meses son base cero, por lo que sumamos 1
    const dia = fecha.getDate();
    const año = fecha.getFullYear();
    return `${mes.toString().padStart(2, '0')}/${dia.toString().padStart(2, '0')}/${año}`;
  }

  const openModal = () =>{
    setShowModal(true)
  }

  const closeModal = () =>{
    setShowModal(false)
  }

  // console.log(JSON.stringify(data, null, 3));

  return (
    <Animated.View ref={contentRef} style={{ height: heightAnim, width: 373, backgroundColor: "white", marginTop: "5%", borderRadius: 10, padding: "2%", justifyContent: "flex-start", alignItems: "center" }}>
      <TouchableOpacity onPress={toggleExpand} disabled={data ? false : true} style={{ width: 333, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", height: isExpanded ? 91 : "100%", }}>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <View style={{ width: 48, height: 48, borderRadius: 10, backgroundColor: data ? "#FF3D00" : "#D2DCEB", alignItems: "center", justifyContent: "center" }}>
            <Image
              source={require('../../../../assets/vencimientos.png')}
              style={{ width: 24, height: 24 }}
            />
          </View>
          <View style={{ marginLeft: 15, height: 48, alignItems: "flex-start", justifyContent: "center", }}>
            <Text style={{ color: "#564C71", fontWeight: "400", fontSize: 16, lineHeight: 19, marginBottom: 6 }}>
              Próximos vencimientos
            </Text>
          </View>
        </View>
        <View>
          <View>
            <TouchableOpacity style={{ alignItems: 'center' }} onPress={toggleExpand} disabled={data ? false : true}>
              {/* Botón flecha */}
              <Text>{isExpanded ? <Image source={require("../../../../assets/Not_more.png")} style={{ width: 24, height: 24 }} /> : <Image source={require("../../../../assets/expand_more.png")} style={{ width: 24, height: 24 }} />}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
      {
        isExpanded === true ?
          data[0].en_mora === true ?
            <View style={{ height: 54, justifyContent: "center", alignItems: "center" }}>
              <Text style={{ color: "#FF6363", fontWeight: "500", fontSize: 14, lineHeight: 18, textAlign: "center" }}>
                Su plan se encuentra con deudas. Le pedimos que se comunique al 4293-8080 para regularizar su situación
              </Text>
            </View>
            :
            <>
              <View style={{ width: "95%", height: 80 }}>
                <View style={{ width: "100%", height: 40, borderBottomWidth: 1, borderBottomColor: "#CDD1DF", justifyContent: "space-around", alignItems: "center", display: "flex", flexDirection: "row" }}>
                  <View style={{ width: "33%" }}>
                    <Text style={{ fontWeight: "700", fontSize: 12, lineHeight: 14, textAlign: "center", color:"#564C71" }}>
                      Cuota Nro.
                    </Text>
                  </View>
                  <View style={{ width: "40%" }}>
                    <Text style={{ fontWeight: "700", fontSize: 12, lineHeight: 14, textAlign: "center", color:"#564C71" }}>
                      Fecha de vencimiento
                    </Text>
                  </View>
                  <View style={{ width: "33%" }}>
                    <Text style={{ fontWeight: "700", fontSize: 12, lineHeight: 14, textAlign: "center", color:"#564C71" }}>
                      Monto
                    </Text>
                  </View>
                </View>
                <View style={{ width: "100%", height: 40, justifyContent: "space-between", alignItems: "center", display: "flex", flexDirection: "row" }}>
                  <View style={{ width: "33%" }}>
                    <Text style={{ fontWeight: "500", fontSize: 12, lineHeight: 14, textAlign: "center", color:"#564C71" }}>
                      {data[0].numCuota}
                    </Text>
                  </View>
                  <View style={{ width: "33%" }}>
                    <Text style={{ fontWeight: "500", fontSize: 12, lineHeight: 14, textAlign: "center", color:"#564C71" }}>
                      {convertirFecha(data[0].vencimiento)}
                    </Text>
                  </View>
                  <View style={{ width: "33%" }}>
                    <Text style={{ fontWeight: "500", fontSize: 12, lineHeight: 14, textAlign: "center", color:"#564C71" }}>
                      ${data[0].importe}
                    </Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity onPress={openModal} style={{ width: 331, height: 47, backgroundColor: "#FF3D00", borderRadius: 10, top: 25, justifyContent: "center", alignItems: "center" }}>
                <Text style={{ color: "#FFFFFF", fontWeight: "600", fontSize: 12, lineHeight: 14, textAlign: "center" }}>
                  Ver codigo de pago
                </Text>
              </TouchableOpacity>
              <ModalCodigoBarra visible={showModal} onClose={closeModal} data={data[0].codBar}/>
            </>
          :
          null
      }
    </Animated.View>
  )
}