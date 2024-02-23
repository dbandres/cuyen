import { Image, Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { handleCameraPermission, openCamera, openImageLibrary, requestGalleryPermission } from "./ImagePicker";
import AwesomeAlert from "react-native-awesome-alerts";
import { useEffect, useState } from "react";
import uploadImages from "./uploadImages";
import { EditarAdjunto } from "./EditarAdjunto";


export function AdjuntarArchivos({ children, increaseProgress, data, setNewFetch }) {

  const [showAlert, setShowAlert] = useState(false);
  const [showAlert2, setShowAlert2] = useState(false);
  const [showAlert3, setShowAlert3] = useState(false)
  const [cantidadImg, setCantidadImg] = useState(false);
  const [showModal, setShowModal] = useState(false)
  const [activity, setActivity] = useState(false)

  const [limite, setLimite] = useState(1)

  const [dniImg, setDniImg] = useState([])
  const [carnet, setCarnet] = useState([])

  const [dniUrl, setDniUrl] = useState([])
  const [carnetUrl, setCarnetUrl] = useState([])
  const [fichaUrl, setFichaUrl] = useState("")
  const [declaracionUrl, setDeclaracionUrl] = useState("")

  // console.log("esto es data: ",JSON.stringify(data, null, 3));

  // revisamos data de adjuntos, y seteamos en caso de que ya esten completos
  useEffect(() => {
    if (data.image_dni.length === 2 || data.ficha_med !== null || data.obra_soc.length === 2 || data.dec_jurada !== null) {
      if (data.image_dni.length === 2 && children === "Documento de identidad") {
        setDniUrl(data.image_dni)
        setCantidadImg(true)
        increaseProgress("dni", 20)
      }
      else if (data.ficha_med !== null && children === "Ficha medica") {
        setFichaUrl(data.ficha_med)
        setCantidadImg(true)
        increaseProgress("ficha", 20)
      }
      else if (data.obra_soc.length === 2 && children === "Carnet de obra social") {
        setCarnetUrl(data.obra_soc)
        setCantidadImg(true)
        increaseProgress("carnet", 20)
      }
      else if (data.dec_jurada !== null && children === "Declaración jurada") {
        setDeclaracionUrl(data.dec_jurada)
        setCantidadImg(true)
        increaseProgress("declaracion", 20)
      } else {
        setCantidadImg(false)
        setDniUrl([])
        setFichaUrl("")
        setCarnetUrl([])
        setDeclaracionUrl("")
      }
    } else {
      console.log("es null!");
      //pruebo esto aca
      setCantidadImg(false)
        setDniUrl([])
        setFichaUrl("")
        setCarnetUrl([])
        setDeclaracionUrl("")
    }
  }, [data])


  const handleGalleryPermission = async () => {
    //veo si estan la cantidad de img necesarias y abro o no el modal de edicion
    if (fichaUrl || dniUrl.length === 2 || declaracionUrl || carnetUrl.length === 2) {
      setShowAlert(false)
      setShowAlert2(false)
      setShowModal(true)
    } else {
      const result = await requestGalleryPermission();
      result == "granted" ? setShowAlert(!showAlert) : null
    }
  }

  const requestCameraPermission = async () => {
    const result = await handleCameraPermission();
    result === "granted" ? openLocalCamera() : null
  }

  const closeModal = () => {
    setShowModal(false)
  }

  const openGalery = async () => {
    setShowAlert(false)
    setShowAlert2(false)
    if (children === "Ficha medica") {
      const imgGalery = await openImageLibrary(1)
      if (imgGalery) {
        setActivity(true)
        uploadImages(imgGalery, "ficha", data.id)
          .then(res => {
            // console.log('Todas las imágenes de ficha medica se han subido correctamente:', res);
            setNewFetch(true)
            setActivity(false)
            setCantidadImg(true)
            setShowAlert(false)
            setShowAlert2(false)
            //setFichaUrl(res[0])

          })
          .catch(error => {
            console.error('Error al subir imágenes:', error.message);
          });
      }
    } else if (children === "Declaración jurada") {
      const imgGalery = await openImageLibrary(1)
      if (imgGalery) {
        setActivity(true)
        uploadImages(imgGalery, "declaracion", data.id)
          .then(res => {
            //console.log('Todas las imágenes de declaracion jurada se han subido correctamente:', res);
            setNewFetch(true)
            setActivity(false)
            setCantidadImg(true)
            setShowAlert(false)
            setShowAlert2(false)
            //setFichaUrl(res[0])

          })
          .catch(error => {
            console.error('Error al subir imágenes:', error.message);

          });
      }
    } else if (children === "Documento de identidad") {
      await openImageLibrary(limite)
        .then((res) => {
          setShowAlert3(true)
          setDniImg(prevImagenes => [...prevImagenes, res]);
        })
        .catch((error) => {
          console.error('Error al subir imágenes:', error.message);
        })

    } else if (children === "Carnet de obra social") {
      await openImageLibrary(limite)
        .then((res) => {
          setShowAlert3(true)
          setCarnet(prevImagenes => [...prevImagenes, res]);
        })
        .catch((error) => {
          console.error('Error al subir imágenes:', error.message);
        })
    }
  }

  const openLocalCamera = async () => {
    setShowAlert(false)
    if (children === "Ficha medica") {
      const imgCamera = await openCamera();
      if (imgCamera) {
        setActivity(true)
        uploadImages(imgCamera, "ficha", data.id)
          .then(res => {
            //console.log('Todas las imágenes de ficha medica se han subido correctamente:', res);
            setNewFetch(true)
            setActivity(false)
            setCantidadImg(true)
            setShowAlert(false)
            setShowAlert2(false)
            //setFichaUrl(res[0])
          })
          .catch(error => {
            console.error('Error al subir imágenes:', error.message);
          });
      }
    } else if (children === "Declaración jurada") {
      const imgCamera = await openCamera()
      if (imgCamera) {
        setActivity(true)
        uploadImages(imgCamera, "declaracion", data.id)
          .then(res => {
            //console.log('Todas las imágenes de declaracion jurada se han subido correctamente:', res);
            setNewFetch(true)
            setActivity(false)
            setCantidadImg(true)
            setShowAlert(false)
            setShowAlert2(false)
            //setFichaUrl(res[0])
          })
          .catch(error => {
            console.error('Error al subir imágenes:', error.message);
          });
      }
    } else if (children === "Documento de identidad") {
      const imgCamera = await openCamera()
      setDniImg(prevImagenes => [...prevImagenes, imgCamera]);
      setShowAlert3(true)
    } else if (children === "Carnet de obra social") {
      const imgCamera = await openCamera()
      setCarnet(prevImagenes => [...prevImagenes, imgCamera]);
      setShowAlert3(true)
    }
  }

  //controlamos si hace falta adjuntar una img mas en caso de ser necesario (dni y carnet)
  useEffect(() => {
    setShowAlert3(false)
    setTimeout(() => {
      if (children === "Documento de identidad" && dniImg.length === 1) {
        setLimite(1)
        setShowAlert2(true)
      } else if (children === "Carnet de obra social" && carnet.length === 1) {
        setLimite(1)
        setShowAlert2(true)
      }
      else {
        setShowAlert2(false)
      }
    }, 2000)
  }, [dniImg, carnet])

  // disparamos un progres para saber si falta o no una foto
  const getAlerts = () => {
    return (
      <AwesomeAlert
        show={showAlert3}
        showProgress={true}
        progressColor="black"
        progressSize={50}
      />
    )
  }

  // Vamos cargando las img al spaces de DO
  useEffect(() => {
    if (dniImg.length === 2) {
      setActivity(true)
      setTimeout(()=>{
        uploadImages(dniImg, "dni", data.id)
        .then(res => {
          //console.log('Todas las imágenes de dni se han subido correctamente:', res);
          setNewFetch(true)
          setActivity(false)
          setCantidadImg(true)
          setShowAlert(false)
          setShowAlert2(false)
          setDniImg([])
          setDniUrl(res)
        })
        .catch(error => {
          console.error('Error al subir imágenes:', error.message);
          setDniImg([])
        });
      },3000)
    } else if (carnet.length === 2) {
      setActivity(true)
      setTimeout(()=>{
        uploadImages(carnet, "carnet", data.id)
        .then(res => {
          //console.log('Todas las imágenes de carnet se han subido correctamente:', res);
          setNewFetch(true)
          setActivity(false)
          setCantidadImg(true)
          setShowAlert(false)
          setShowAlert2(false)
          setCarnet([])
          setCarnetUrl(res)
        })
        .catch(error => {
          console.error('Error al subir imágenes:', error.message);
          setCarnet([])
        });
      },3000)
    }
  }, [dniImg, carnet])

  const handleDismiss = () => {
    // Lógica adicional al cerrar el alerta
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
          children === "Ficha medica" ? data.ficha_med :
            children === "Documento de identidad" ? data.image_dni :
              children === "Carnet de obra social" ? data.obra_soc :
                children === "Declaración jurada" ? data.dec_jurada : null
        }
        id={data.id}
        setNewFetch={setNewFetch}
        increaseProgress={increaseProgress}
      />
      <View style={{ height: 20, justifyContent: "flex-end" }}>
        <Text style={{ fontWeight: "400", fontSize: 9, lineHeight: 9, textAlign: "center", color: "#564C71" }}>
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
      {showAlert3 ? getAlerts() : null}
    </TouchableOpacity>
  )
}