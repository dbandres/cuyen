import { Image, Text, TouchableOpacity, View } from "react-native";
import { handleCameraPermission, openCamera, openImageLibrary, requestGalleryPermission } from "./ImagePicker";
import AwesomeAlert from "react-native-awesome-alerts";
import { useState } from "react";


export function AdjuntarArchivos({ children }) {

  const [showAlert, setShowAlert] = useState(false)
  const [cantidadImg, setCantidadImg] = useState(false)

  const handleGalleryPermission = async () => {
    if(fichaMedicaImg || dniImg || declaracionImg || carnet){
      console.log("Tengo foto");
    }else{
      const result = await requestGalleryPermission();
      result === "granted" ? openLocalCamera() : null
    }
  };

  const requestCameraPermission = async () => {
    if(fichaMedicaImg || dniImg || declaracionImg || carnet){
      console.log("Tengo foto");
    }else{
      const result = await handleCameraPermission();
      result === "granted" ? console.log(result) : null
    }
  }

  const [fichaMedicaImg, setFichaMedicaImg] = useState("")
  const [dniImg, setDniImg] = useState("")
  const [declaracionImg, setDeclaracionImg] = useState("")
  const [carnet, setCarnet] = useState("")

  const openGalery = async () => {
    setShowAlert(false)
    setCantidadImg(false)
    if (children === "Ficha medica") {
      const imgGalery = await openImageLibrary(1)
      setFichaMedicaImg(imgGalery);
      if(imgGalery){
        setCantidadImg(true)
      }
    } else if (children === "Declaración jurada") {
      const imgGalery = await openImageLibrary(1)
      setDeclaracionImg(imgGalery);
      if(imgGalery){
        setCantidadImg(true)
      }
    } else if (children === "Documento de identidad") {
      const imgGalery = await openImageLibrary(2)
      setDniImg(imgGalery);
      if(imgGalery){
        setCantidadImg(true)
      }
    } else if (children === "Carnet de obra social") {
      const imgGalery = await openImageLibrary(2)
      setCarnet(imgGalery);
      if(imgGalery){
        setCantidadImg(true)
      }
    }
  }

  const openLocalCamera = async () =>{
    setShowAlert(false)
    setCantidadImg(false)

    const imgCamera = await openCamera()
    console.log("img desde camara: ", imgCamera);
  }

  const handleError = error => {
    // Maneja los errores aquí si es necesario
    console.error(error);
  };

  const handleImageSelection = selectedImages => {
    // Aquí puedes manejar las imágenes seleccionadas en tu componente padre
    console.log('Imágenes seleccionadas:', selectedImages);
  };

  const getAlert = (title, message, confirmBtn, cancelBtn, confirmText, cancelText) => {
    return (
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title={title}
        message={message}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={true}
        showConfirmButton={confirmBtn}
        showCancelButton={cancelBtn}
        confirmText={confirmText}
        cancelText={cancelText}
        confirmButtonColor="#008000"
        cancelButtonColor="red"
        titleStyle={{ color: "red" }}
        onConfirmPressed={() => {
          openGalery()
        }}
        onCancelPressed={() => {
          // setShowAlert(false)
          //openLocalCamera()
          requestCameraPermission()
        }}
      />
    )
  }

  const alertCantidad = () => {
    return (
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title={title}
        message={message}
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showConfirmButton={confirmBtn}
        showCancelButton={cancelBtn}
        confirmText={confirmText}
        cancelText={cancelText}
        confirmButtonColor="#008000"
        cancelButtonColor="red"
        titleStyle={{ color: "red" }}
        onConfirmPressed={() => {
          openGalery()
        }}
      />
    )
  }

  const renderImage = (archivo, cantidadImg) => {
    const excepciones = ["Ficha medica", "Declaración jurada", "Documento de identidad", "Carnet de obra social"];
  
    if (excepciones.includes(archivo) && cantidadImg === true) {
      return (
        <Image
          source={require("../../../assets/adjuntarOk.png")}
          style={{ width: 65, height: 71 }}
        />
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

  return (
    <TouchableOpacity onPress={handleGalleryPermission} style={{ width: 65, height: 96, alignItems: "center" }}>
      <View style={{ height: 20, justifyContent: "flex-end" }}>
        <Text style={{ fontWeight: "400", fontSize: 8, lineHeight: 9, textAlign: "center" }}>
          {children}
        </Text>
      </View>
      <View style={{ justifyContent: "flex-end", alignItems: "flex-end", height: 76 }}>
        {
          renderImage(children, cantidadImg)
        }
      </View>
      {
        showAlert === true && children === "Documento de identidad" ? getAlert(`Vas a adjuntar un imagen para ${children}`, "Recorda que solo podes adjuntar DOS imagenes", true, true, "Galeria", "Camara") : null
      }
      {
        showAlert === true && children === "Carnet de obra social" ? getAlert(`Vas a adjuntar un imagen para ${children}`, "Recorda que solo podes adjuntar DOS imagenes", true, true, "Galeria", "Camara") : null
      }
      {
        showAlert === true && children === "Ficha medica" ? getAlert(`Vas a adjuntar un imagen para ${children}`, "Recorda que solo podes adjuntar UNA imagen", true, true, "Galeria", "Camara") : null
      }
      {
        showAlert === true && children === "Declaración jurada" ? getAlert(`Vas a adjuntar un imagen para ${children}`, "Recorda que solo podes adjuntar UNA imagen", true, true, "Galeria", "Camara") : null
      }
    </TouchableOpacity>
  )
}