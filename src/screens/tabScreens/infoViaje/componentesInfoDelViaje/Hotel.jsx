import React, { useContext, useEffect, useRef, useState } from "react";
import { Image, Text, TouchableOpacity, View, Animated } from "react-native"
import { cleanHotel, getHotelByNum } from "../../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { InfoContext } from "../InfoContext";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

export function Hotel() {

  const [isExpanded, setIsExpanded] = useState(false);
  const [heightAnim] = useState(new Animated.Value(88));
  const { miInfo } = useContext(InfoContext)
  const dispatch = useDispatch()
  const hotelInfo = useSelector((state) => state.hotelInfo)
  const [imgArray, setImgArray] = useState("")
  const contentRef = useRef(null);

  useEffect(() => {
    if (miInfo.hotelId !== "") {
      dispatch(getHotelByNum(miInfo.hotelId))
    }else{
      console.log('no hay info');
      dispatch(cleanHotel())
    }
  }, [miInfo])

  useEffect(() => {
    if (hotelInfo.length !== 0 && miInfo.hotelId !== "") {
      const imagenes = JSON.parse(hotelInfo.fotos)
      setImgArray(imagenes)
    }
  }, [hotelInfo])

  const toggleExpand = () => {
    // Envía el índice del componente al padre para gestionar la expansión individual
    setIsExpanded(!isExpanded);

  };
  useEffect(() => {
    if (isExpanded) {
      // Mide la altura del contenido cuando se expande
      contentRef.current.measure((x, y, width, height) => {
        console.log("he: ", height)
        Animated.timing(heightAnim, {
          toValue: 850, // Ajusta según tus necesidades
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
    <Animated.View ref={contentRef} style={{ height: heightAnim, width: 373, backgroundColor: "white", marginTop: "5%", borderRadius: 10, padding: "2%", justifyContent: "flex-start", alignItems: "center", marginBottom: 10 }}>
      <TouchableOpacity disabled={hotelInfo.length !== 0 ? false : true} onPress={toggleExpand} style={{ width: 333, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", height: isExpanded ? 80 : "100%" }}>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <View style={{ width: 48, height: 48, borderRadius: 10, backgroundColor: hotelInfo.length !== 0 ? "#FF3D00" : "#D2DCEB", alignItems: "center", justifyContent: "center" }}>
            <Image
              source={require('../../../../assets/hotel_blanco.png')}
              style={{ width: 24, height: 24 }}
            />
          </View>
          <View style={{ marginLeft: 15, height: 48, alignItems: "flex-start", justifyContent: "center", }}>
            <Text style={{ color: "#564C71", fontWeight: "800", fontSize: 12, lineHeight: 14, marginBottom: 6 }}>
              Hotel
            </Text>
            {
              hotelInfo.length !== 0 ?
                <Text style={{ color: "#564C71", fontWeight: "400", fontSize: 16, lineHeight: 19 }}>
                  {hotelInfo.nombre}
                </Text>
                :
                <Text style={{ color: "#564C71", fontWeight: "400", fontSize: 16, lineHeight: 19 }}>
                  Informacion no disponible
                </Text>
            }
          </View>
        </View>
        <View>
          <View>
            {
              hotelInfo.length !== 0 ?
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
          <>
            <View style={{ width: 373, height: 220 }}>
              {
                hotelInfo.latitude !== null || hotelInfo.longitude !== null ?
                  <MapView
                    provider={PROVIDER_GOOGLE}
                    style={{ height: 200, width: 373, borderRadius: 10 }}
                    initialRegion={{
                      latitude: JSON.parse(hotelInfo.latitude),
                      longitude: JSON.parse(hotelInfo.longitude),
                      latitudeDelta: 0.05, // Utilizar el nivel de zoom actual
                      longitudeDelta: 0.05,
                    }}
                  >
                    <Marker
                      coordinate={{
                        latitude: JSON.parse(hotelInfo.latitude),
                        longitude: JSON.parse(hotelInfo.longitude),
                      }}
                      image={require('../../../../assets/marker.png')}
                      style={{ height: 41, width: 68 }}
                    />
                  </MapView>
                  :
                  <View style={{width:"100%", height:200, justifyContent:"center", alignItems:"center"}}>
                    <Text style={{ color: "#564C71", fontWeight: "400", fontSize: 16, lineHeight: 19 }}>
                      No hay ubicación del Hotel
                    </Text>
                  </View>
              }
            </View>
            <View style={{ width: "90%", height: 160 }}>
              <View style={{ height: 50, justifyContent: "center" }}>
                <Text style={{ fontWeight: "800", fontSize: 14, lineHeight: 16, color: "#564C71" }}>
                  Hotel
                </Text>
                <Text style={{ fontWeight: "400", fontSize: 16, lineHeight: 19, color: "#564C71" }}>
                  {hotelInfo.nombre}
                </Text>
              </View>
              <View style={{ height: 50, justifyContent: "center" }}>
                <Text style={{ fontWeight: "800", fontSize: 14, lineHeight: 16, color: "#564C71" }}>
                  Dirección
                </Text>
                <Text style={{ fontWeight: "400", fontSize: 16, lineHeight: 19, color: "#564C71" }}>
                  {hotelInfo.direccion}
                </Text>
              </View>
              <View style={{ height: 50, justifyContent: "center" }}>
                <Text style={{ fontWeight: "800", fontSize: 14, lineHeight: 16, color: "#564C71" }}>
                  Teléfono
                </Text>
                <Text style={{ fontWeight: "400", fontSize: 16, lineHeight: 19, color: "#564C71" }}>
                  {hotelInfo.telefono}
                </Text>
              </View>
            </View>
            <View style={{ width: "98%", height: 350 }}>
              {
                imgArray.slice(0, 4).map((foto, index) => (
                  <View key={index} style={{ marginBottom: 15 }}>
                    <Image
                      source={{ uri: foto }}
                      style={{
                        width: index === 0 ? "100%" : "33%",
                        height: index === 0 ? 200 : 112,
                        resizeMode: 'cover'
                      }}
                    />
                  </View>
                ))
              }
            </View>
            <View style={{ width: "95%", alignItems: "flex-end" }}>
              <Text style={{ fontWeight: "600", fontSize: 14, lineHeight: 16, color: "#564C71" }}>
                Ver mas
              </Text>
            </View>
          </>
          : null
      }
    </Animated.View>
  )
}
