import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated, Image, Switch, ActivityIndicator, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPasajerosXColegio } from '../../../redux/actions';
import { ButtonCustom } from '../../../components/ButtomCustom';
import axios from 'axios';
import { API_URL, token } from '../../../api';
import AwesomeAlert from 'react-native-awesome-alerts';

export function ComponenteExpandible({ index, data, seteo, setModificandoTotal, arrayDeNumeros, pasajerosPorColegio }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const dispatch = useDispatch()
  const [contentHeight, setContentHeight] = useState(0);
  const [heightAnim] = useState(new Animated.Value(80)); // Inicia con la altura mínima
  const contentRef = useRef(null);
  const [isEnabledGlobal, setIsEnabledGlobal] = useState(false);
  const [color, setColor] = useState(false)
  const [colors, setColors] = useState(false)
  let contador;
  const [showAlert2, setShowAlert2] = useState(false)
  const [showAlert, setShowAlert] = useState(false);
  const [pasajerosFilter, setPasajerosFilter] = useState("")

  const showAlertFunc = () => {
    setShowAlert(true);
  };

  const hideAlert = () => {
    setShowAlert(false);
  };

  const getAlert = () => {
    return (
      <AwesomeAlert
        show={showAlert2}
        showProgress={true}
        progressColor="black"
        progressSize={50}
        closeOnTouchOutside={false}
      />
    )
  }

  const toggleSwitchGlobal = () => {
    setColor(true)
    setPasajerosFilter((prevPasajeros) =>
      prevPasajeros.map((pasajero) => ({
        ...pasajero,
        isEnabled: !isEnabledGlobal,
      }))
    );
    setIsEnabledGlobal((prev) => !prev);
  };

  const toggleSwitch = (index) => {
    setColors(true)
    setPasajerosFilter((prevPasajeros) => {
      const nuevosPasajeros = [...prevPasajeros];
      nuevosPasajeros[index] = {
        ...nuevosPasajeros[index],
        isEnabled: !nuevosPasajeros[index]?.isEnabled,
      };
      return nuevosPasajeros;
    });
  };

  useEffect(()=>{
    console.log("cambio pasajeros");
    if(isEnabledGlobal !== false){
      obtenerPasajerosActivosIniciales()
    }
  },[pasajerosFilter])


  useEffect(() => {
    if (isExpanded) {
      // Mide la altura del contenido cuando se expande
      contentRef.current.measure((x, y, width, height) => {
        setContentHeight(height);
        console.log(pasajerosFilter.length);
        console.log("he: ", height);
        const value = pasajerosFilter.length * 10
        Animated.timing(heightAnim, {
          toValue: 380, // Ajusta según tus necesidades
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

  useEffect(() => {
    console.log("renderizo");
    dispatch(getAllPasajerosXColegio(arrayDeNumeros))
  }, [])

  useEffect(() => {
    // if (pasajerosFilter.length === 0) {
    obtenerPasajerosActivosIniciales()
    const pasajerosFiltrados = pasajerosPorColegio.filter((pasajero) => pasajero.contratos === data.num)
      .map((pasajero) => ({
        ...pasajero,
        isEnabled: pasajero.presente === "true" ? true : false,
      }));
    setPasajerosFilter(pasajerosFiltrados)
    // }
  }, [pasajerosPorColegio])

  const toggleExpand = () => {
    // Envía el índice del componente al padre para gestionar la expansión individual
    setIsExpanded(!isExpanded);
  };

  const obtenerPasajerosActivosIniciales = () => {
    const pasajerosActivos = pasajerosPorColegio.filter((pasajero) => pasajero.presente === "true");
    seteo(pasajerosActivos.length);
  };

  const obtenerPasajerosActivos = () => {
    if (!pasajerosFilter) {
      return [];
    }
    const pasajerosActivos = pasajerosFilter.filter((pasajero) => pasajero.isEnabled === true || pasajero.presente === true);
    return pasajerosActivos.length;
  };
  contador = obtenerPasajerosActivos();

  const calcularModificandoTotal = () => {
    const arrayResult = [];

    pasajerosFilter.forEach((element, index) => {
      const response = element.presente === "true";
      const res = element.isEnabled;

      if (response === res) {
        arrayResult.push(0);
      } else {
        if (res === false) {
          arrayResult.push(-1);
        } else {
          arrayResult.push(1);
        }
      }
    });

    // Método reduce para sumar los valores
    const suma = arrayResult.reduce((acumulador, valorActual) => acumulador + valorActual, 0);

    console.log(suma);
    setModificandoTotal(suma);
  };

  const handleChangesPresent = () => {
    setShowAlert2(true)
    calcularModificandoTotal();
    pasajerosFilter.forEach((element, index) => {
      const pasajero = pasajerosFilter[index].presente == element.isEnabled.toString();
      console.log(pasajero);
      if (pasajero === false) {
        axios.put(`${API_URL}/pasajero/${element.id}`, {
          "presente": element.isEnabled
        },
          {
            headers: {
              'x-access-token': `${token}`,
              "Content-Type": "application/json",
            }
          }
        ).then((res) => {
          if (res.status === 200) {
            setShowAlert2(false)
            showAlertFunc()
          }
        })
      } else {
        setShowAlert2(false)
        console.log("Alumnos presente");
      }
    });
  }


  return (
    <View>
      <Animated.View ref={contentRef} style={{ height: heightAnim, width: 331, backgroundColor: "white", marginTop: "5%", borderRadius: 10, padding: "2%", justifyContent: "flex-start", alignItems: "center" }}>
        {
          isExpanded ?
            <View style={{ position: "absolute", bottom: 5, height: 47, width: "100%", borderColor: "#3462BF", borderWidth: 1, borderRadius: 10 }}>
              <ButtonCustom
                text="Guardar cambios"
                register={true}
                color="#FFFFFF"
                onPress={handleChangesPresent}
              />
            </View>
            :
            null
        }
        <View style={{ width: "100%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-around", height: isExpanded ? 70 : "100%", borderBottomWidth: isExpanded === true ? 1 : 0, borderColor: "#CDD1DF" }}>
          {/* Contenido del componente */}
          <View style={{ backgroundColor: color !== false ? "#37E67D" : colors !== false ? "#FF6669" : "#E5EBFF", width: 48, height: 48, alignItems: "center", justifyContent: "center", borderRadius: 10 }}>
            <Text style={{ fontSize: 20, fontWeight: "600", lineHeight: 24, color: "#564C71" }}>{contador ? contador : 0}</Text>
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
        <View style={{ alignItems: "center", justifyContent: "center", width: "100%" }}>
          {
            isExpanded?
              <View style={{ alignItems: "center", justifyContent: "center", width: "100%" }}>
                <View style={{ width: "95%", height: 80, borderBottomWidth: 1, borderColor: "#CDD1DF" }}>
                  <View style={{ width: "100%", height: "50%", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={{ fontWeight: "800", fontSize: 12, lineHeight: 14, color: "#564C71" }}>
                      Pasajeros
                    </Text>
                    <Text style={{ fontWeight: "800", fontSize: 12, lineHeight: 14, color: "#564C71" }}>
                      Estado presente
                    </Text>
                  </View>
                  <View style={{ width: "100%", height: "50%", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={{ fontWeight: "600", fontSize: 12, lineHeight: 14, color: "#564C71" }}>
                      SELECCIONAR TODOS
                    </Text>
                    <Switch
                      onValueChange={toggleSwitchGlobal}
                      value={isEnabledGlobal}
                      trackColor={{ false: '#D9D9D9', true: '#93E396' }}
                    />
                  </View>
                </View>
                {
                  pasajerosFilter ?
                    <FlatList
                      style={{ maxHeight: 160, maxWidth:"100%"}}
                      data={pasajerosFilter}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={({ item, index }) => (
                        <View style={{ height: 40, width: "100%", justifyContent: "center", alignItems: "center" }}>
                          <View style={{ width: "95%", height: "95%", alignItems: "center", justifyContent: "space-between", display: "flex", flexDirection: "row" }}>
                            <Text style={{ fontWeight: "400", fontSize: 12, lineHeight: 14, color: "#564C71" }}>{item.nombre}, {item.apellido}</Text>
                            <Switch
                              onValueChange={() => toggleSwitch(index)}
                              value={item.isEnabled || false}
                              trackColor={{ false: '#D9D9D9', true: '#93E396' }}
                              style={{alignSelf:"flex-end"}}
                            />
                          </View>
                        </View>
                      )}
                    />
                    :
                    <View style={{ justifyContent: "center", alignItems: "center", width: "100%" }}>
                      <ActivityIndicator size="small" color="#0000ff" />
                    </View>
                }

              </View>
              :
              null
          }
        </View>
        {showAlert2 ? getAlert() : null}
      </Animated.View>
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title="Se confirmaron la asistencia de los alumnos correctamente!"
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showConfirmButton={true}
        confirmText="Aceptar"
        confirmButtonColor="#DD6B55"
        onConfirmPressed={() => {
          hideAlert();
        }}
      />
    </View>
  );
};