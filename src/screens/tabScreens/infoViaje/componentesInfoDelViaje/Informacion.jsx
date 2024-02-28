import { useContext, useEffect, useRef, useState } from "react";
import { Image, Text, TouchableOpacity, View, Animated } from "react-native"
import { getContratoByNum } from "../../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { UserContext } from "../../../../context/UserContext";
import { DetalleInfoContrato } from "./DetalleInfoContrato";

export function Informacion() {

  const [isExpanded, setIsExpanded] = useState(false);
  const contratoInfo = useSelector((state) => state.contratoInfo)
  const { userdata } = useContext(UserContext)
  const dispatch = useDispatch()
  const [heightAnim] = useState(new Animated.Value(88));
  const contentRef = useRef(null);

  const toggleExpand = () => {
    // Envía el índice del componente al padre para gestionar la expansión individual
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    dispatch(getContratoByNum(userdata.contrato[0]))
  }, [])

  //console.log("info: ", JSON.stringify(contratoInfo, null, 3));

  useEffect(() => {
    if (isExpanded) {
      // Mide la altura del contenido cuando se expande
      contentRef.current.measure((x, y, width, height) => {
        console.log("he: ", height)
        Animated.timing(heightAnim, {
          toValue: contratoInfo.length !== 0 ? 400 : 91, // Ajusta según tus necesidades
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

  return (
    <Animated.View ref={contentRef} style={{ height: heightAnim, width: 373, backgroundColor: "white", marginTop: "5%", borderRadius: 10, padding: "2%", justifyContent: "flex-start", alignItems: "center" }}>
      <View style={{ width: 333, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", height: isExpanded ? 91 : "100%" }}>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <View style={{ width: 48, height: 48, borderRadius: 10, backgroundColor: contratoInfo.length !== 0 ? "#FF3D00" : "#D2DCEB", alignItems: "center", justifyContent: "center" }}>
            <Image
              source={require('../../../../assets/contract_white.png')}
              style={{ width: 24, height: 24 }}
            />
          </View>
          <View style={{ marginLeft: 15, height: 48, alignItems: "flex-start", justifyContent: "center", }}>
            <Text style={{ color: "#564C71", fontWeight: "800", fontSize: 12, lineHeight: 14, marginBottom: 6 }}>
              Informacion
            </Text>
            <Text style={{ color: "#564C71", fontWeight: "400", fontSize: 16, lineHeight: 19 }}>
              Contrato
            </Text>
          </View>
        </View>
        <View>
          <View>
            {
              contratoInfo.length !== 0 ?
                <TouchableOpacity style={{ alignItems: 'center' }} onPress={toggleExpand}>
                  {/* Botón flecha */}
                  <Text>{isExpanded ? <Image source={require("../../../../assets/Not_more.png")} style={{ width: 24, height: 24 }} /> : <Image source={require("../../../../assets/expand_more.png")} style={{ width: 24, height: 24 }} />}</Text>
                </TouchableOpacity>
                : null
            }
          </View>
        </View>
      </View>
      {
        isExpanded &&
          <DetalleInfoContrato InfoContrato={contratoInfo}/>
      }
    </Animated.View>
  )
}