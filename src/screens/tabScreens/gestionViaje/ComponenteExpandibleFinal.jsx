import { useEffect, useRef, useState } from "react";
import { View, Text, Animated, TouchableOpacity, Image, ActivityIndicator, FlatList } from "react-native"

export function ComponenteExpandibleFinal({ pasajerosPorColegio, data }) {

  const [pasajerosFilter, setPasajerosFilter] = useState("")
  const [isExpanded, setIsExpanded] = useState(false)
  const contentRef = useRef(null);
  const [heightAnim] = useState(new Animated.Value(80)); // Inicia con la altura mínima

  useEffect(() => {
    const pasajerosFiltrados = pasajerosPorColegio.filter((pasajero) => pasajero.contratos === data.num && pasajero.presente === "true")
      .map((pasajero) => ({
        ...pasajero
      }));
    setPasajerosFilter(pasajerosFiltrados)
  }, [pasajerosPorColegio])

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
        toValue: 70, // Altura mínima
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [isExpanded]);

  const toggleExpand = () => {
    // Envía el índice del componente al padre para gestionar la expansión individual
    setIsExpanded(!isExpanded)
  };

  console.log(pasajerosFilter.length);


  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <Animated.View ref={contentRef} style={{ height: heightAnim, width: 331, backgroundColor: "white", marginTop: "5%", borderRadius: 10, padding: "2%", justifyContent: "flex-start", alignItems: "center" }}>
        <View style={{ width: "100%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-around", height: isExpanded ? 70 : "100%", borderBottomWidth: isExpanded === true ? 1 : 0, borderColor: "#CDD1DF" }}>
          {/* Contenido del componente */}
          <View style={{ backgroundColor: "#37E67D", width: 48, height: 48, alignItems: "center", justifyContent: "center", borderRadius: 10 }}>
            <Text style={{ fontSize: 20, fontWeight: "600", lineHeight: 24, color: "#564C71" }}>{pasajerosFilter.length}</Text>
          </View>
          <View style={{ width: "60%" }}>
            <Text style={{ fontSize: 12, fontWeight: "800", lineHeight: 14, color: "#564C71" }}>{data.num}</Text>
            <Text style={{ fontSize: 12, fontWeight: "400", lineHeight: 14, color: "#564C71" }}>{data.colegio}</Text>
          </View>
          <TouchableOpacity onPress={toggleExpand} style={{ alignItems: 'center' }}>
            {/* Botón flecha */}
            <Text>{isExpanded ? <Image source={require("../../../assets/Not_more.png")} style={{ width: 24, height: 24 }} /> : <Image source={require("../../../assets/expand_more.png")} style={{ width: 24, height: 24 }} />}</Text>
          </TouchableOpacity>
        </View>
        {
          pasajerosFilter ?
            <FlatList
              style={{ maxHeight: 160, maxWidth: "100%" }}
              data={pasajerosFilter}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <View style={{ height: 40, width: "100%", justifyContent: "center", alignItems: "center" }}>
                  <View style={{ width: "95%", height: "95%", alignItems: "center", justifyContent: "space-between", display: "flex", flexDirection: "row" }}>
                    <Text style={{ fontWeight: "400", fontSize: 12, lineHeight: 14, color: "#564C71" }}>{item.nombre}, {item.apellido}</Text>
                    <Text>✅</Text>
                  </View>
                </View>
              )}
            />
            :
            <View style={{ justifyContent: "center", alignItems: "center", width: "100%" }}>
              <ActivityIndicator size="small" color="#0000ff" />
            </View>
        }
      </Animated.View>
    </View>
  )
}