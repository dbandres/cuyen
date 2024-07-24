import { useFocusEffect } from "@react-navigation/native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Image, Text, TouchableOpacity, View, Animated } from "react-native"
import { getPasajero } from "../../../../redux/actions";
import { UserContext } from "../../../../context/UserContext";
import { useDispatch, useSelector } from "react-redux";
import { InfoContingente } from "./InfoContingente";
import { InfoContext } from "../InfoContext";
import AsyncStorage from "@react-native-async-storage/async-storage";


export function Contingente({ navigation }) {

  const [isExpanded, setIsExpanded] = useState(false);
  const [heightAnim] = useState(new Animated.Value(88));
  const contentRef = useRef(null);
  const { userdata } = useContext(UserContext)
  const pasajero = useSelector((state) => state.pasajero)
  const dispatch = useDispatch()
  const [newValue, setNewValue] = useState("")
  const [expandedStates, setExpandedStates] = useState(new Array(pasajero.length).fill(false));
  const [isAnyExpanded, setIsAnyExpanded] = useState(false);

	const getDataStorage = async (key) => {
		try {
			const value = await AsyncStorage.getItem(key);
			if (value !== null) {
				console.log("value storage: ", value);
				return value;
			}
		} catch (error) {
			console.error('Failed to retrieve data', error);
		}
	};

  useFocusEffect(
    React.useCallback(() => {
      console.log('Pantalla enfocada en Contingente. Puedes ejecutar operaciones aquí.');

      // Puedes realizar otras operaciones aquí, como cargar datos, etc.
      const fetchData = async () => {
				const value = await getDataStorage('contratoNum');
				if (value) {
					dispatch(getPasajero(userdata.id, value))
				}
			};
      fetchData()
      return () => {
        // Este código se ejecuta cuando el componente se desenfoca o se desmonta
        console.log('Pantalla desenfocada Contingente. Limpieza o desmontaje aquí.');
      };
    }, []))


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
          toValue: newValue === "" ? pasajero.length * 91 + 200 : pasajero.length * 50 + newValue, // Ajusta según tus necesidades
          //toValue: height + 480,
          duration: 100,
          useNativeDriver: false,
        }).start();
      });
    } else {
      setIsExpanded(false)
      expandedHijo("")
      // Cuando se colapsa, simplemente usa la altura mínima
      Animated.timing(heightAnim, {
        toValue: 91, // Altura mínima
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  }, [isExpanded, newValue]);

  const agregarPasajero = () => {
    navigation.navigate("carga-pasajero")
    toggleExpand()
  }

  const expandedHijo = (value) => {
    setNewValue(value)
  }

  const handleItemPress = (index) => {
    console.log("Se presionó el elemento en el índice:", index);
    // Realiza cualquier otra acción que desees con el índice aquí
    const newExpandedStates = [...expandedStates];
    newExpandedStates[index] = !newExpandedStates[index];
    setExpandedStates(newExpandedStates);

    // Verificar si algún componente está expandido
    const anyExpanded = newExpandedStates.some((expanded) => expanded);
    setIsAnyExpanded(anyExpanded);
  };

/*   console.log("data!!: ",JSON.stringify(pasajero, null ,3)); */


  return (
    <Animated.View ref={contentRef} style={{ height: heightAnim, width: 373, backgroundColor: "white", marginTop: "5%", borderRadius: 10, padding: "2%", justifyContent: "flex-start", alignItems: "center" }}>
      <TouchableOpacity onPress={toggleExpand} style={{ width: 333, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", height: isExpanded ? 91 : "100%" }}>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <View style={{ width: 48, height: 48, borderRadius: 10, backgroundColor: "#FF3D00", alignItems: "center", justifyContent: "center" }}>
            <Image
              source={require('../../../../assets/contingente.png')}
              style={{ width: 24, height: 24 }}
            />
          </View>
          <View style={{ marginLeft: 15, height: 48, alignItems: "flex-start", justifyContent: "center", }}>
            <Text style={{ color: "#564C71", fontWeight: "800", fontSize: 12, lineHeight: 14, marginBottom: 6 }}>
              Contingente
            </Text>
            <Text style={{ color: "#564C71", fontWeight: "400", fontSize: 16, lineHeight: 19 }}>
              Pasajeros
            </Text>
          </View>
        </View>
        <View>
          <View>
            <TouchableOpacity style={{ alignItems: 'center' }} onPress={toggleExpand}>
              {/* Botón flecha */}
              <Text>{isExpanded ? <Image source={require("../../../../assets/Not_more.png")} style={{ width: 24, height: 24 }} /> : <Image source={require("../../../../assets/expand_more.png")} style={{ width: 24, height: 24 }} />}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
      {
        isExpanded &&
        <>
          {
            pasajero ?
              pasajero.map((pas, index) => (
                <InfoContingente key={index} index={index} pasaje={pas} expandedHijo={expandedHijo} onItemPress={handleItemPress} expanded={expandedStates[index]} disableExpand={isAnyExpanded && !expandedStates[index]} />
              ))
              :
              null
          }
          <View style={{ height: 70 }}>
            <TouchableOpacity onPress={agregarPasajero} style={{ width: 331, height: 47, backgroundColor: "#FFFFFF", borderRadius: 10, top: 25, justifyContent: "center", alignItems: "center", borderWidth: 1, borderColor: "#334EA2" }}>
              <Text style={{ color: "#334EA2", fontWeight: "600", fontSize: 12, lineHeight: 14, textAlign: "center" }}>
                Agregar Pasajero +
              </Text>
            </TouchableOpacity>
          </View>
        </>
      }
    </Animated.View>
  )
}