import { Image, Modal, Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { ButtonCustom } from "../../../components/ButtomCustom";
import { deleteImgSpaces, deleteImgUrl } from "./EditarArchivos";
import { useEffect, useState } from "react";
import { openCamera, openImageLibrary } from "./ImagePicker";
import AwesomeAlert from "react-native-awesome-alerts";
import updateImage from "./updateImage";
import axios from "axios";
import { token } from "../../../api";
import { Ok } from "./Ok";

const transparent = "rgba(0,0,0,0.5)"

export function EditarAdjunto({ visible, onClose, data, children, id, setNewFetch, increaseProgress }) {

  const [urlData, setUrlData] = useState("")
  const [nuevasImagenes, setNuevasImagenes] = useState("")
  const [activity, setActivity] = useState(false)
  const [activity2, setActivity2] = useState(false)
  const [showAlert, setShowAlert] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);

  // Verificar si data es un array
  useEffect(() => {
    // Verificar si data es un array
    const isDataArray = Array.isArray(data);
    if (isDataArray === true) {
      setUrlData(data)
    } else {
      setUrlData([data])
    }
  }, [data])

  useEffect(() => {
    if (urlData.length === 0) {
      onClose()
    }
  }, [urlData])

  const getAlert = (title, message, confirmBtn, cancelBtn, confirmText, cancelText) => {
    return (
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title={title}
        message={message}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={true}
        onDismiss={handleDismiss}
        showConfirmButton={confirmBtn}
        showCancelButton={cancelBtn}
        confirmText={confirmText}
        cancelText={cancelText}
        confirmButtonColor="#008000"
        cancelButtonColor="red"
        titleStyle={{ color: "red" }}
        onConfirmPressed={() => {
          openGalery()
          setShowAlert(false)
        }}
        onCancelPressed={() => {
          openCam()
          setShowAlert(false)
        }}
      />
    )
  }

  const handleDismiss = () => {
    // Lógica adicional al cerrar el alerta
    console.log('Alerta cerrado');
    setShowAlert(false)

  };

  const deleteArchivo = async (index) => {
    setActivity(true)
    // Realiza alguna acción con el índice obtenido
    if (urlData.length !== 1) {
      console.log("Se presionó en el índice:", data[index]);
      const respuesta = await deleteImgSpaces(data[index])
      if (respuesta === 200) {
        const deletedItem = data.splice(index, 1);
        deleteImgUrl(id, children, data, deletedItem)
        console.log("delete item ", deletedItem);
        children === "Documento de identidad" ? increaseProgress("dni", 0) :
          children === "Carnet de obra social" ? increaseProgress("carnet", 0) : null
        setNewFetch(true)
        setUrlData([...data]);
        setActivity(false)
      }
    } else {
      console.log("Se presionó en el índice:", data);
      const respuesta = await deleteImgSpaces(data)
      if (respuesta === 200) {
        children === "Ficha medica" ? increaseProgress("ficha", 0) :
          children === "Declaración jurada" ? increaseProgress("declaracion", 0) : null
        deleteImgUrl(id, children)
        setNewFetch(true)
        setUrlData("");
        setActivity(false)
      }
    }
  }

  const openGalery = async () => {
    if (children === "Documento de identidad") {
      setActivity2(true)
      const imgGalery = await openImageLibrary(1)
      updateImage(imgGalery, data)
        .then(response => {
          // Hacer algo con la respuesta de la petición
          console.log(response);
          setNuevasImagenes(response)
          setActivity2(false)
        })
        .catch(error => {
          // Manejar el error si ocurre
          console.error(error);
          setActivity2(false)
        });
    }else if(children === "Carnet de obra social"){
      setActivity2(true)
      const imgGalery = await openImageLibrary(1)
      updateImage(imgGalery, data)
        .then(response => {
          // Hacer algo con la respuesta de la petición
          console.log(response);
          setNuevasImagenes(response)
          setActivity2(false)
        })
        .catch(error => {
          // Manejar el error si ocurre
          console.error(error);
          setActivity2(false)
        });
    }
  }

  const openCam = async () => {
    setShowAlert(false)
    if (children === "Documento de identidad") {
      const imgCamera = await openCamera();
      if (imgCamera) {
        setActivity2(true)
        updateImage(imgCamera, data)
        .then(response => {
          // Hacer algo con la respuesta de la petición
          console.log("esto es cam",response);
          setNuevasImagenes(response)
          setActivity2(false)
        })
        .catch(error => {
          // Manejar el error si ocurre
          console.error(error);
          setActivity2(false)
        });
      }
    } 
  }

  const adjuntarNuevoArchivo = () => {
    console.log("adjuntar");
    setShowAlert(true)
  }

  const subirNuevosArchivos = () => {
    if (nuevasImagenes !== "" && children === "Documento de identidad") {
      axios.put(`/pasajero/${id}`, {
        image_dni: nuevasImagenes
      },
        {
          headers: {
            'x-access-token': `${token}`,
            'Content-Type': 'application/json',
          }
        })
        .then((res) => {
          console.log(res.status);
          onClose()
          setModalVisible2(true)
          setNewFetch(true)
        })
        .catch((error) => {
          console.log(error);
        })
    }else if(nuevasImagenes !== "" && children === "Carnet de obra social"){
      axios.put(`/pasajero/${id}`, {
        obra_soc: nuevasImagenes
      },
        {
          headers: {
            'x-access-token': `${token}`,
            'Content-Type': 'application/json',
          }
        })
        .then((res) => {
          console.log(res.status);
          onClose()
          setModalVisible2(true)
          setNewFetch(true)
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }

  const renderImage = (archivo, activity2) => {
    const excepciones = ["Documento de identidad", "Carnet de obra social"];

    if (excepciones.includes(archivo) && nuevasImagenes !== "") {
      return (
        <Image
          source={require("../../../assets/adjuntarOk.png")}
          style={{ width: 65, height: 71 }}
        />
      );
    } else if (excepciones.includes(archivo) && nuevasImagenes === "" && activity2 === true) {
      return (
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom:10
        }}>
          <ActivityIndicator size="small" color="#FF3D00" />
        </View>
      );
    } else {
      return (
        <Image
          source={require("../../../assets/adjuntar.png")}
          style={{ width: 65, height: 71 }}
        />
      );
    }
  }

  const handleClosedModal = () => {
    setModalVisible2(false)
  }

  const cerrarModal = () =>{
    onClose()
    setNuevasImagenes("")
    setActivity(false)
    setActivity2(false)
  }


  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <Ok visible={modalVisible2} onClose={handleClosedModal}/>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: transparent }}>
        <View style={{ borderRadius: 10, width: 373, height: 449, backgroundColor: "white", justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ height: 50 }}>
            <Text style={{ color: "#334EA2", fontWeight: "500", fontSize: 16, lineHeight: 19, textAlign: "center" }}>
              {children}
            </Text>
          </View>
          <View style={{ width: 300, height: 250 }}>
            <Text>
              Documento actual:
            </Text>
            {
              urlData.length !== 0 &&
              urlData.map((dato, index) => (
                <View key={index} style={{ width: 300, height: urlData.length > 1 ? 50 : 90, alignItems: "center", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                  {
                    activity === true ?
                      <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                        <ActivityIndicator size="small" color="#FF3D00" />
                      </View>
                      :
                      <>
                        <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                          <Image
                            source={require("../../../assets/doc.png")}
                            style={{ width: 24, height: 24, marginRight: 10 }}
                          />
                          <Text style={{ color: "#564C71", fontWeight: "400", fontSize: 14, lineHeight: 30 }}>
                            {children}
                          </Text>
                        </View>
                        <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                          <TouchableOpacity>
                            <Image
                              source={require("../../../assets/frame.png")}
                              style={{ width: 24, height: 24, marginRight: 10 }}
                            />
                          </TouchableOpacity>
                          <TouchableOpacity onPress={() => deleteArchivo(index)}>
                            <Image
                              source={require("../../../assets/fram1.png")}
                              style={{ width: 24, height: 24, marginRight: 10 }}
                            />
                          </TouchableOpacity>
                        </View>
                      </>
                  }
                </View>
              ))
            }
            <View style={{ width: 66 }}>
              <TouchableOpacity disabled={urlData.length === 1 ? false : true} onPress={adjuntarNuevoArchivo}>
                {
                  renderImage(children, activity2)
                }
              </TouchableOpacity>
              <Text style={{ fontWeight: "400", fontSize: 8, lineHeight: 9, textAlign: "center", color: "#564C71", marginTop: 5 }}>
                Subír nuevo
              </Text>
            </View>
          </View>
          <View style={{ height: 47, width: 331 }}>
            <ButtonCustom
              disabled={nuevasImagenes !== "" ? false : true}
              text="Actualizar documento"
              color={nuevasImagenes !== "" ? "#FF3D00" : "#CDD1DF"}
              onPress={subirNuevosArchivos}
            />
          </View>
          <TouchableOpacity onPress={cerrarModal} style={{ width: 331, height: 47, borderRadius: 10, borderWidth: 1, borderColor: "#334EA2", justifyContent: "center", alignItems: "center", marginTop: 10 }}>
            <Text style={{ fontWeight: "600", fontSize: 12, lineHeight: 14, color: "#334EA2" }}>
              Cancelar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {
        showAlert === true && children === "Documento de identidad" ? getAlert(`Vas a adjuntar una nueva imagen para ${children}`, "", true, true, "Galeria", "Camara") : null
      }
      {
        showAlert === true && children === "Carnet de obra social" ? getAlert(`Vas a adjuntar una nueva imagen para ${children}`, "", true, true, "Galeria", "Camara") : null
      }
    </Modal>
  )
}