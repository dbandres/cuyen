import { Image, Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { handleCameraPermission, openCamera, openImageLibrary, requestGalleryPermission } from "./ImagePicker";
import AwesomeAlert from "react-native-awesome-alerts";
import { useEffect, useState } from "react";
import uploadImages from "./uploadImages";
import { EditarAdjunto } from "./EditarAdjunto";

export function AdjuntarArchivos({ children, increaseProgress, data, adjuntos, setNewFetch }) {


  const [showAlert, setShowAlert] = useState(false);
  const [showAlert2, setShowAlert2] = useState(false);
  const [cantidadImg, setCantidadImg] = useState(false);
  const [showModal, setShowModal] = useState(false)
  const [activity, setActivity] = useState(false)

  const [limite, setLimite] = useState(2)

  const [fichaMedicaImg, setFichaMedicaImg] = useState("")
  const [dniImg, setDniImg] = useState([])
  const [declaracionImg, setDeclaracionImg] = useState("")
  const [carnet, setCarnet] = useState([])

  const [dniUrl, setDniUrl] = useState([])
  const [carnetUrl, setCarnetUrl] = useState([])
  const [fichaUrl, setFichaUrl] = useState("")
  const [declaracionUrl, setDeclaracionUrl] = useState("")

  // useEffect(() => {
  //   if (adjuntos.ficha_med !== null) {
  //     setFichaMedicaImg(adjuntos.ficha_med)
  //     setCantidadImg(true)
  //   }
  //   else if (adjuntos.image_dni !== null) {
  //     setDniImg(adjuntos.image_dni)
  //     setCantidadImg(true)
  //   }
  //   else if (adjuntos.obra_soc !== null) {
  //     setCarnet(adjuntos.obra_soc)
  //     setCantidadImg(true)
  //   }
  //   else if (adjuntos.dec_jurada !== null) {
  //     setDeclaracionImg(adjuntos.dec_jurada)
  //     setCantidadImg(true)
  //   }
  // }, [adjuntos])

  const handleGalleryPermission = async () => {
    if (fichaMedicaImg || dniImg.length === 2 || declaracionImg || carnet.length === 2) {
      setShowAlert(false)
      setShowAlert2(false)
      setShowModal(true)
    } else {
      const result = await requestGalleryPermission();
      console.log(result);
      result == "granted" ? setShowAlert(!showAlert) : null
    }
  }

  const requestCameraPermission = async () => {
    if (fichaMedicaImg || dniImg.length === 2 || declaracionImg || carnet.length === 2) {
      console.log("Tengo foto");
    } else {
      const result = await handleCameraPermission();
      result === "granted" ? openLocalCamera() : null
    }
  }

  const closeModal = () => {
    setShowModal(false)
  }

  const openGalery = async () => {
    setShowAlert(false)
    setShowAlert2(false)
    if (children === "Ficha medica") {
      const imgGalery = await openImageLibrary(1)
      setFichaMedicaImg(imgGalery);
    } else if (children === "Declaración jurada") {
      const imgGalery = await openImageLibrary(1)
      setDeclaracionImg(imgGalery);
    } else if (children === "Documento de identidad") {
      await openImageLibrary(limite)
        .then((res) => {
          res.forEach(element => {
            setDniImg(prevImagenes => [...prevImagenes, element]);
          });
        })
        .catch((error) => {
          console.error('Error al subir imágenes:', error.message);
        })
    } else if (children === "Carnet de obra social") {
      await openImageLibrary(limite)
        .then((res) => {
          res.forEach(element => {
            setCarnet(prevImagenes => [...prevImagenes, element]);
          });
        })
        .catch((error) => {
          console.error('Error al subir imágenes:', error.message);
        })
    }
  }

  const openLocalCamera = async () => {
    setShowAlert(false)
    setCantidadImg(false)
    if (children === "Ficha medica") {
      const imgCamera = await openCamera()
      setFichaMedicaImg(imgCamera);
    } else if (children === "Declaración jurada") {
      const imgCamera = await openCamera()
      setDeclaracionImg(imgCamera);
    } else if (children === "Documento de identidad") {
      const imgCamera = await openCamera()
      setDniImg(prevImagenes => [...prevImagenes, imgCamera]);
    } else if (children === "Carnet de obra social") {
      const imgCamera = await openCamera()
      setCarnet(prevImagenes => [...prevImagenes, imgCamera]);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      if (children === "Documento de identidad" && dniImg.length === 1) {
        console.log("Falta una foto");
        setLimite(1)
        setShowAlert2(true)
      } else if (children === "Carnet de obra social" && carnet.length === 1) {
        console.log("Falta una foto");
        setLimite(1)
        setShowAlert2(true)
      }
      else {
        setShowAlert2(false)
      }
    }, 3000)
  }, [dniImg, carnet])

  useEffect(() => {
    if (dniImg.length === 2 ) {
      setActivity(true)
      uploadImages(dniImg, "dni", data)
        .then(res => {
          console.log('Todas las imágenes de dni se han subido correctamente:', res);
          setActivity(false)
          setCantidadImg(true)
          setShowAlert(false)
          setShowAlert2(false)
          setDniUrl(res)
          increaseProgress(20)
        })
        .catch(error => {
          console.error('Error al subir imágenes:', error.message);
          setDniImg([])
        });
    } else if (carnet.length === 2 ) {
      setActivity(true)
      uploadImages(carnet, "carnet", data)
        .then(res => {
          console.log('Todas las imágenes de carnet se han subido correctamente:', res);
          setActivity(false)
          setCantidadImg(true)
          setShowAlert(false)
          setShowAlert2(false)
          setCarnetUrl(res)
          increaseProgress(20)
        })
        .catch(error => {
          console.error('Error al subir imágenes:', error.message);
          setCarnet([])
        });
    } else if (declaracionImg.length === 1) {
      setActivity(true)
      uploadImages(declaracionImg, "declaracion", data)
        .then(res => {
          console.log('Todas las imágenes de declaracion jurada se han subido correctamente:', res);
          setActivity(false)
          setCantidadImg(true)
          setShowAlert(false)
          setShowAlert2(false)
          setDeclaracionUrl(res[0])
          increaseProgress(20)
        })
        .catch(error => {
          console.error('Error al subir imágenes:', error.message);
          setDeclaracionImg("")
        });
    } else if (fichaMedicaImg) {
      setActivity(true)
      uploadImages(fichaMedicaImg, "ficha", data)
        .then(res => {
          console.log('Todas las imágenes de ficha medica se han subido correctamente:', res);
          setNewFetch(true)
          setActivity(false)
          setCantidadImg(true)
          setShowAlert(false)
          setShowAlert2(false)
          setFichaUrl(res[0])
          increaseProgress(20)
        })
        .catch(error => {
          console.error('Error al subir imágenes:', error.message);
          setFichaMedicaImg("")
        });
    }
  }, [dniImg, carnet, fichaMedicaImg, declaracionImg])

  const handleDismiss = () => {
    // Lógica adicional al cerrar el alerta
    console.log('Alerta cerrado');
    setShowAlert(false)
    setShowAlert2(false)
    setLimite(2)
    setCarnet([])
    setDniImg([])
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
          requestCameraPermission()
          setShowAlert(false)
        }}
      />
    )
  }

  const alertCantidad = (show, title, message, confirmBtn, cancelBtn, confirmText, cancelText) => {
    return (
      <AwesomeAlert
        show={show}
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
        }}
        onCancelPressed={() => {
          requestCameraPermission()
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
    } else if (excepciones.includes(archivo) && cantidadImg === false && activity === true) {
      return (
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
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

  return (
    <TouchableOpacity onPress={handleGalleryPermission} style={{ width: 65, height: 96, alignItems: "center" }}>
      <EditarAdjunto visible={showModal} onClose={closeModal} children={children}
        data={
          children === "Ficha medica" ? fichaUrl :
            children === "Documento de identidad" ? dniUrl :
              children === "Carnet de obra social" ? carnetUrl :
                children === "Declaración jurada" ? declaracionUrl : null
        }
        id={data}
        setCantidadImg={setCantidadImg}
      />
      <View style={{ height: 20, justifyContent: "flex-end" }}>
        <Text style={{ fontWeight: "400", fontSize: 8, lineHeight: 9, textAlign: "center", color: "#564C71" }}>
          {children}
        </Text>
      </View>
      <View style={{ justifyContent: "flex-end", alignItems: "flex-end", height: 76 }}>
        {
          renderImage(children, cantidadImg)
        }
      </View>
      {
        showAlert === true && children === "Documento de identidad" ? getAlert(`Vas a adjuntar una imagen para ${children}`, "Recorda que solo podes adjuntar DOS imagenes (Frente y Dorso)", true, true, "Galeria", "Camara") : null
      }
      {
        showAlert2 === true && children === "Documento de identidad" ? alertCantidad(showAlert2, `Recordá que para ${children} son DOS imagenes (Frente y Dorso)`, "Te falta 1 imagen", true, true, "Galeria", "Camara") : null
      }
      {
        showAlert === true && children === "Carnet de obra social" ? getAlert(`Vas a adjuntar una imagen para ${children}`, "Recorda que solo podes adjuntar DOS imagenes", true, true, "Galeria", "Camara") : null
      }
      {
        showAlert2 === true && children === "Carnet de obra social" ? alertCantidad(showAlert2, `Recordá que para ${children} son DOS imagenes (Frente y Dorso)`, "Te falta 1 imagen", true, true, "Galeria", "Camara") : null
      }
      {
        showAlert === true && children === "Ficha medica" ? getAlert(`Vas a adjuntar una imagen para ${children}`, "Recorda que solo podes adjuntar UNA imagen", true, true, "Galeria", "Camara") : null
      }
      {
        showAlert === true && children === "Declaración jurada" ? getAlert(`Vas a adjuntar un imagen para ${children}`, "Recorda que solo podes adjuntar UNA imagen", true, true, "Galeria", "Camara") : null
      }
    </TouchableOpacity>
  )
}