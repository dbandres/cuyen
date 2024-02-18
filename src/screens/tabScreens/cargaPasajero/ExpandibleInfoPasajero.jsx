import React, { useEffect, useRef, useState } from "react";
import { Image, Text, View, Animated, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { InfoPasajero } from "./InfoPasajero";
import { MensajeAlerta } from "./MesajeAlerta";
import { AdjuntarArchivos } from "./AdjuntarArchivos";
import { FormEditarDatos } from "./FormEditarDatos";
import { ModalComponent } from "./ModalComponent";
import { ModalDieta } from "./ModalDieta";


export function ExpandibleInfoPasajero({ data, setNewFetch }) {

  // console.log("data!!: ",JSON.stringify(data, null ,3));

  const [contentHeight, setContentHeight] = useState(0);
  const [error, setError] = useState(true)
  const [isExpanded, setIsExpanded] = useState(false);
  const [heightAnim] = useState(new Animated.Value(80)); // Inicia con la altura mínima
  const contentRef = useRef(null);
  const [seteoData, setSeteoData] = useState(false)
  const [editing, setEditing] = useState(false)
  const [progressAttachment, setProgressAttachment] = useState({
    ficha: 0,
    dni: 0,
    carnet: 0,
    declaracion: 0,
    dieta: 0
  })

  const [inputChanged, setInputChanged] = useState(false);

  const [newDate, setNewDate] = useState("")
  const [formValues, setFormValues] = useState({
    dni: data.dni,
    nombre: data.nombre,
    apellido: data.apellido,
    fechaNac: data.fechaNac,
  });
  const [adjuntos] = useState({
    ficha_med: data.ficha_med,
    dec_jurada: data.dec_jurada,
    image_dni: data.image_dni,
    obra_soc: data.obra_soc
  })
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [datosTotales, setDatosTotales] = useState({})

  const archivos = ["Ficha medica", "Declaración jurada", "Documento de identidad", "Carnet de obra social"];

   // Función para modificar un valor específico en el estado
   const increaseProgress = (key, newValue) => {
    setProgressAttachment(prevState => ({
      ...prevState,
      [key]: newValue
    }));
  };

  // Función para obtener la suma de todos los valores en el estado
  const getSum = () => {
    const valuesArray = Object.values(progressAttachment);
    const sum = valuesArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    return sum;
  };

  console.log(progressAttachment);

  useEffect(()=>{
    getSum()
  },[progressAttachment])

  const openModal = () => {
    setModalVisible(true);
  };

  const openDietaModal = () => {
    setModalVisible2(true)
  }

  const closeModal = () => {
    setModalVisible(false);
    setFormValues({
      dni: data.dni,
      nombre: data.nombre,
      apellido: data.apellido,
      fechaNac: data.fechaNac,
    })
    setInputChanged(false)
    setNewDate("")
  };

  const closerDietaModal = () => {
    setModalVisible2(false)
  }

  useEffect(()=>{
    if(data.dieta.vegetariano === true){
      increaseProgress("dieta", 20)
      setError(false)
    }
    else if(data.dieta.vegano === true){
      increaseProgress("dieta", 20)
      setError(false)
    }
    else if(data.dieta.celiaco === true){
      increaseProgress("dieta", 20)
      setError(false)
    }
    else if(data.dieta.intoleranteLactosa === true){
      increaseProgress("dieta", 20)
      setError(false)
    }
    else if(data.dieta.ningunaDietaEspecial === true){
      increaseProgress("dieta", 20)
      setError(false)
    }

  },[data])

  useEffect(() => {
    if (isExpanded) {
      // Mide la altura del contenido cuando se expande
      contentRef.current.measure((x, y, width, height) => {
        setContentHeight(height);
        Animated.timing(heightAnim, {
          toValue: 809, // Ajusta según tus necesidades
          //toValue: height + 480,
          duration: 100,
          useNativeDriver: false,
        }).start();
      });
    } else {
      setIsExpanded(false)
      // Cuando se colapsa, simplemente usa la altura mínima
      Animated.timing(heightAnim, {
        toValue: 80, // Altura mínima
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [isExpanded]);

  useEffect(() => {
    if (newDate.length !== 0) {
      setFormValues({
        dni: data.dni,
        nombre: data.nombre,
        apellido: data.apellido,
        fechaNac: newDate,
      })
    }
  }, [newDate])

  const toggleExpand = () => {
    // Envía el índice del componente al padre para gestionar la expansión individual
    setIsExpanded(!isExpanded);
    setSeteoData(false)
    setEditing(false)
  };

  const changeInputs = () => {
    setSeteoData(true)
    setEditing(true)
  }
  const changeInputsCancel = () => {
    setSeteoData(false)
    setEditing(false)
    setInputChanged(false)
    setFormValues({
      dni: data.dni,
      nombre: data.nombre,
      apellido: data.apellido,
      fechaNac: data.fechaNac,
    })
    setNewDate("")
  }

  const handleSubmit = () => {
    setDatosTotales({ formValues, id: data.id, cuotas: data.cuotas, importe: data.importe })
    openModal();
    setSeteoData(false)
    setEditing(false)
  };

  const handleDieta = () => {
    openDietaModal()
    setModalVisible2(true)
  }

  return (
    <ScrollView>
      <ModalComponent visible={modalVisible} onClose={closeModal} data={datosTotales} inputChanged={inputChanged} setNewFetch={setNewFetch} />
      <ModalDieta visible={modalVisible2} onClose={closerDietaModal} data={data} setError={setError} increaseProgress={increaseProgress}/>
      <Animated.View ref={contentRef} style={{ height: heightAnim, width: 373, backgroundColor: "white", marginTop: "5%", borderRadius: 10, justifyContent: "flex-start", alignItems: "center" }}>
        
        <View style={{ backgroundColor: "#FFFFFF", borderRadius: 10, alignItems: "center", display: "flex", flexDirection: "row", padding: 20, width: "100%", justifyContent: "space-between", height: isExpanded ? 91 : "100%" }}>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <View style={{ width: 48, height: 48, borderRadius: 10, backgroundColor: "#FFB800", alignItems: "center", justifyContent: "center" }}>
              <Image
                source={require('../../../assets/attribution.png')}
                style={{ width: 24, height: 24 }}
              />
            </View>
            <View style={{ marginLeft: 15, height: 48, alignItems: "flex-start", justifyContent: "center" }}>
              <Text style={{ color: "#564C71", fontWeight: "800", fontSize: 12, lineHeight: 14, marginBottom: 6 }}>
                Pasajero
              </Text>
              <Text style={{ color: "#564C71", fontWeight: "400", fontSize: 16, lineHeight: 19 }}>
                {data.nombre}, {data.apellido}
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={toggleExpand} style={{ alignItems: 'center' }}>
           
            <Text>{isExpanded ? <Image source={require("../../../assets/Not_more.png")} style={{ width: 24, height: 24 }} /> : <Image source={require("../../../assets/expand_more.png")} style={{ width: 24, height: 24 }} />}</Text>
          </TouchableOpacity>
        </View>
        {
          isExpanded && editing === false ?
            <View style={{ alignItems: "center", justifyContent: "center", width: "100%" }}>
              <InfoPasajero info={data} />
            </View>
            :
            isExpanded === true && seteoData === true && editing === true ?
              <View style={{ alignItems: "center", justifyContent: "center", width: "100%" }}>
                <FormEditarDatos info={data} setInputChanged={setInputChanged} formValues={formValues} setFormValues={setFormValues} newDate={newDate} setNewDate={setNewDate} /> 
              </View>
              : null
        }
        {
          seteoData === false ?
            <TouchableOpacity onPress={changeInputs} style={{ width: 331, height: 47, borderRadius: 10, borderWidth: 1, borderColor: "#334EA2", justifyContent: "center", alignItems: "center" }}>
              <Text style={{ fontWeight: "600", fontSize: 12, lineHeight: 14, color: "#334EA2" }}>
                Editar datos
              </Text>
            </TouchableOpacity>
            :
            <>
              <TouchableOpacity onPress={handleSubmit} disabled={inputChanged === true || newDate.length !== 0 ? false : true} style={{ width: 331, height: 47, borderRadius: 10, justifyContent: "center", alignItems: "center", backgroundColor: inputChanged === true || newDate.length !== 0 ? "#FF3D00" : "#CDD1DF", marginBottom: 15, marginTop: 10 }}>
                <Text style={{ fontWeight: "600", fontSize: 12, lineHeight: 14, color: "#FFFFFF" }}>
                  Guardar cambios
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={changeInputsCancel} style={{ width: 331, height: 47, borderRadius: 10, borderWidth: 1, borderColor: "#334EA2", justifyContent: "center", alignItems: "center" }}>
                <Text style={{ fontWeight: "600", fontSize: 12, lineHeight: 14, color: "#334EA2" }}>
                  Cancelar
                </Text>
              </TouchableOpacity>
            </>
        }
        <View style={{ width: 232, height: 44, justifyContent: "center", alignItems: "center", marginTop: 30, marginBottom: 20 }}>
          <MensajeAlerta />
        </View>
        <View style={{ width: 320, height: 96, marginTop: 20, display: "flex", flexDirection: "row", justifyContent: "space-around", marginBottom: 20 }}>
          {archivos.map((archivo, index) => (
            <AdjuntarArchivos key={index} children={archivo} increaseProgress={increaseProgress} data={data} adjuntos={adjuntos} setNewFetch={setNewFetch}/>
          ))} 
        </View>
        <View>
          <TouchableOpacity onPress={handleDieta} style={{ width: 331, height: 47, borderRadius: 10, borderWidth: 1, borderColor: "#334EA2", justifyContent: "center", alignItems: "center", marginTop: 20 }}>
            <Text style={{ fontWeight: "600", fontSize: 12, lineHeight: 14, color: "#334EA2" }}>
              Ajustar Dieta especial del pasajero
            </Text>
          </TouchableOpacity>
          {
            error === true ?
              <View style={{ display: "flex", flexDirection: "row", width: 318, height: 30, alignItems: "center", marginBottom: 20 }}>
                <Image
                  source={require("../../../assets/Error.png")}
                  style={{ width: 30, height: 30, marginLeft: 10 }}
                />
                <Text style={{ color: "#FF6363", fontWeight: "400", fontSize: 10, lineHeight: 12 }}>
                  Se requiere completar la dieta especial.
                </Text>
              </View>
              :
              <View style={{ display: "flex", flexDirection: "row", width: 318, height: 30, alignItems: "center", marginBottom: 20 }}>
                <Image
                  source={require("../../../assets/Vector.png")}
                  style={{ width: 16, height: 16,}}
                />
                <Text style={{ color: "#564C71", fontWeight: "400", fontSize: 10, lineHeight: 12, marginLeft:10 }}>
                Información de dieta especial completo.
                </Text>
              </View>
          }
          <View style={{ width: 331, height: 33, justifyContent: "center", alignItems: "center" }}>
            <View style={{ width: "100%", height: 10, backgroundColor: "#E5EBFF", borderRadius: 10 }}>
              <View style={{ width:`${getSum()}%`, height: 10, backgroundColor: "#93E396", borderRadius: 10 }}>

              </View>
            </View>
            <View style={{ display: "flex", flexDirection: "row", marginTop: 10 }}>
              <View style={{ width: 25 }}>
                <Text style={{ color: "#564C71", fontWeight: "700", fontSize: 10, lineHeight: 12 }}>
                  {getSum()}%
                </Text>
              </View>
              <Text style={{ color: "#564C71", fontWeight: "400", fontSize: 10, lineHeight: 12 }}>
                Completado
              </Text>
            </View>
          </View>
        </View>
      </Animated.View>
    </ScrollView>
  )
}