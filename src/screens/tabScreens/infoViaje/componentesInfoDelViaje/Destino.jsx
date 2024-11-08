import React, { useContext, useEffect, useRef, useState } from "react";
import { Image, Text, TouchableOpacity, View, Animated } from "react-native";
import { useSelector } from "react-redux";
import { InfoContext } from "../InfoContext";

export function Destino() {

  const [isExpanded, setIsExpanded] = useState(false);
  const [heightAnim] = useState(new Animated.Value(88));
  const destino = useSelector((state) => state.destino)
  const { setMiInfo } = useContext(InfoContext)
  const contentRef = useRef(null);

  const toggleExpand = () => {
    // Envía el índice del componente al padre para gestionar la expansión individual
    setIsExpanded(!isExpanded);
  };

  // useFocusEffect(
	// 	React.useCallback(() => {
	// 		dispatch(getDestino(contratoActual))
  //     return () => {
  //       // Este código se ejecuta cuando el componente se desenfoca o se desmonta
  //       console.log('Pantalla desenfocada. Limpieza o desmontaje aquí.');
	// 			dispatch(cleanDestino())
  //     };
	// 	}, [])
	// )

  useEffect(() => {
    if (destino.length !== 0) {
      // Función para cambiar el valor de hotel id
        setMiInfo(prevState => ({
          ...prevState,
          hotelId: destino.hotelId
        }))
    }else{
      setMiInfo(prevState => ({
        ...prevState,
        hotelId: ""
      }))
    }

  }, [destino])

  useEffect(() => {
    if (isExpanded) {
      // Mide la altura del contenido cuando se expande
      contentRef.current.measure((x, y, width, height) => {
        Animated.timing(heightAnim, {
          toValue: destino.length !== 0 ? 210 : 90, // Ajusta según tus necesidades
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

  // console.log(JSON.stringify(miInfo, null, 3));

  return (
    <Animated.View ref={contentRef} style={{ height: heightAnim, width: 373, backgroundColor: "white", marginTop: "5%", borderRadius: 10, padding: "2%", justifyContent: "flex-start", alignItems: "center" }}>
      <TouchableOpacity onPress={toggleExpand} disabled={destino.length === 0 ? true : false} style={{ width: 333, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", height: isExpanded ? 91 : "100%",  }}>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <View style={{ width: 48, height: 48, borderRadius: 10, backgroundColor: destino.length !== 0 ? "#FF3D00" : "#D2DCEB", alignItems: "center", justifyContent: "center" }}>
            <Image
              source={require('../../../../assets/destino.png')}
              style={{ width: 24, height: 24 }}
            />
          </View>
          <View style={{ marginLeft: 15, height: 48, alignItems: "flex-start", justifyContent: "center", }}>
            <Text style={{ color: "#564C71", fontWeight: "800", fontSize: 12, lineHeight: 14, marginBottom: 6 }}>
              Destino
            </Text>
            {
              destino.length !== 0 ?
                <Text style={{ color: "#564C71", fontWeight: "400", fontSize: 16, lineHeight: 19 }}>
                  {destino.destino}
                </Text>
                :
                <Text style={{ color: "#564C71", fontWeight: "400", fontSize: 16, lineHeight: 19 }}>
                  Sin destino disponible.
                </Text>
            }
          </View>
        </View>
        <View>
          <View>
            {
              destino.length !== 0 ?
                <TouchableOpacity style={{ alignItems: 'center' }} onPress={toggleExpand}>
                  {/* Botón flecha */}
                  <Text>{isExpanded ? <Image source={require("../../../../assets/Not_more.png")} style={{ width: 24, height: 24 }} /> : <Image source={require("../../../../assets/expand_more.png")} style={{ width: 24, height: 24 }} />}</Text>
                </TouchableOpacity>
                : null
            }
          </View>
        </View>
      </TouchableOpacity>
      {
        isExpanded === true ?
        <View style={{width:"90%", height:95, borderRadius:20, justifyContent:"center", alignItems:"center", borderWidth:1, borderColor:"#949AAF"}}>
          <Text style={{fontWeight:"800", fontSize:12, lineHeight:14, textAlign:"center", color:"#564C71"}}>
            Salida
          </Text>
          <Text style={{fontWeight:"700", fontSize:16, lineHeight:19, textAlign:"center", color:"#564C71"}}>
            {destino.salida}
          </Text>
        </View>
        :
        null
      }
    </Animated.View>
  )
}