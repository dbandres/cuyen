import { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, TextInput, Platform, PermissionsAndroid, Image, Alert } from "react-native";
import Swiper from 'react-native-swiper'
import { request, PERMISSIONS, check, RESULTS, openSettings } from 'react-native-permissions';
import { launchCamera, launchImageLibrary } from "react-native-image-picker"
import { ButtonCustom } from "../../../components/ButtomCustom";
import { Header } from "./Header";
import axios from "axios";
import Video from "react-native-video"
import AwesomeAlert from "react-native-awesome-alerts";
import { API_URL, token } from "../../../api";
import { UserContext } from "../../../context/UserContext";
import { useDispatch } from "react-redux";
import { getAllPost } from "../../../redux/actions";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { useSharedValue, useAnimatedStyle } from "react-native-reanimated";
import { MuroContext } from "./MuroContext";


const Height = Dimensions.get("screen").height

export function Form({ navigation, route }) {

  const [texto, setTexto] = useState('');
  const [imageRender, setImageRender] = useState([]);
  const { userdata } = useContext(UserContext)
  const [cameraGranted, setCameraGranted] = useState(false);
  const dispatch = useDispatch()
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertOK, setShowAlertOK] = useState(false)
  const [disabledBtn, setDisabledBtn] = useState(true)
  const [showAlert2, setShowAlert2] = useState(false)
  const [postData, setPostData] = useState({
    comentario: '',
    img: [],
  });
  const { actualizarDato } = useContext(MuroContext);
  const id = route.params?.travelId

  // probamos la funcion de Pinch
  const escalaImg = useSharedValue(1)
  const focoX = useSharedValue(0)
  const focoY = useSharedValue(0)

  const centroImagen = {
    x: 200 / 2,
    y: 300 / 2
  }

  console.log("id: ", id);

  const onPinchEvent = Gesture.Pinch()
    .onStart((e) => {
      focoX.value = e.focalX;
      focoY.value = e.focalY
    })
    .onUpdate((e) => {
      escalaImg.value = e.scale
      console.log("escala: ", escalaImg)
    })

  const estiloAnimado = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: focoX.value
      },
      {
        translateY: focoY.value
      },
      {
        translateX: -centroImagen.x
      },
      {
        translateY: -centroImagen.y
      },
      { scale: escalaImg.value },
      {
        translateX: -focoX.value
      },
      {
        translateY: -focoY.value
      },
      {
        translateX: centroImagen.x
      },
      {
        translateY: centroImagen.y
      },
    ]
  }))


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

  const getAlertOk = () => {
    return (
      <AwesomeAlert
        show={showAlertOK}
        showProgress={false}
        title="OK!"
        message="Publicación realizada con Éxito 🎉"
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText="Aceptar"
        confirmButtonColor="#008000"
        onConfirmPressed={() => {
          setShowAlert(false)
          navigation.navigate("publicaciones")
          actualizarDato()
          dispatch(getAllPost(id))
        }}
      />
    )
  }

  const handleTextChange = (newText) => {
    // Verificar la longitud máxima del texto
    if (newText.length <= 160) {
      setTexto(newText);
      setPostData({ comentario: newText });
      // Actualizar el estado disableBtn
      setDisabledBtn(newText.trim() === ''); // Si el texto está vacío, disableBtn será true, de lo contrario, será false
    }
  };

  const addImageUri = (newUri) => {
    if (newUri) {
      setImageRender([].concat(...imageRender, newUri));
    }
    else {
      console.log("mas de 5 img")
    }
  };

  useEffect(() => {
    if (imageRender.length > 5) {
      setShowAlert(true)
    } else {
      setShowAlert(false)
    }
  }, [imageRender])

  const requestGalleryPermission = async () => {
    try {
      const permission = Platform.OS === 'ios'
        ? PERMISSIONS.IOS.PHOTO_LIBRARY
        : PERMISSIONS.ANDROID.READ_MEDIA_IMAGES;

      const result = await check(permission);

      switch (result) {
        case RESULTS.GRANTED:
          openImageLibrary();
          break;
        case RESULTS.DENIED:
          const requestResult = await request(permission);
          if (requestResult === RESULTS.GRANTED) {
            openImageLibrary();
          } else {
            console.log('Permiso a galería denegado', requestResult);

          }
          break;
        case RESULTS.BLOCKED:
          openSettings()
          Alert.alert(
            "Permiso necesario",
            "El acceso a la galería es necesario para seleccionar imágenes. Por favor, habilita el permiso en la configuración de la aplicación.",
            [
              { text: "Cancelar", style: "cancel" },
              { text: "Abrir configuración", onPress: () => openSettings() }
            ]
          );
          break;
        default:
          console.log('Resultado inesperado', result);
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const handleCameraPermission = async () => {
    const permission = Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA
    console.log(permission)
    const res = await check(permission);
    console.log(res)
    if (res === RESULTS.GRANTED) {
      setCameraGranted(true);
      openCamera()
    } else if (res === RESULTS.DENIED) {
      const res2 = await request(permission);
      console.log(res2)
      res2 === RESULTS.GRANTED ? setCameraGranted(true) : setCameraGranted(false);
    }
  };

  const openCamera = () => {
    launchCamera({
      mediaType: 'mixed', includeBase64: true, quality: 0.5
    }, response => {
      try {
        if (response) {
          const newImage = { uri: response.assets[0].uri, type: response.assets[0].type, name: response.assets[0].fileName }
          addImageUri(newImage);
        }
        else {
          console.log("error, no seleccionó ninguna foto")
        }
      } catch (error) {
        console.log(error)
      }
    });
  };

  const openImageLibrary = () => {
    launchImageLibrary({
      mediaType: 'mixed', quality: 0.5, selectionLimit: 5,
    }, response => {
      if (response.didCancel) {
        console.log('El usuario canceló la selección');
      } else if (response.error) {
        console.log('Ocurrió un error: ', response.error);
      } else {
        // Aquí puedes manejar la imagen o video seleccionado
        console.log(JSON.stringify(response, null, 3))

        const imgSelect = response.assets.map((assets) => {
          // Extrae las propiedades necesarias del objeto asset
          const { uri, type, name, } = assets;
          // Crea un nuevo objeto con las propiedades extraídas
          return { uri, type, name };
        })
        addImageUri(imgSelect)
      }
    })
  }

  const removeItem = (indexToRemove) => {
    const updatedImageRender = [...imageRender];
    updatedImageRender.splice(indexToRemove, 1); // Elimina el elemento en el índice especificado
    setImageRender(updatedImageRender); // Actualiza el estado con el nuevo array
  };

  const armadoDePublicacion = () => {
    if (imageRender.length !== 0) {
      setShowAlert2(true)
      const responsesArray = [];
      imageRender.forEach(image => {
        const formData = new FormData();
        formData.append('image', {
          uri: image.uri,
          type: image.type,
          name: "image/png",
        });
        console.log(formData.getParts())
        try {
          axios.post("https://www.turismocuyen.com.ar/spaces", formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            }
          })
            .then((res) => {
              if (res.status === 200) {
                console.log("esto es res: ", res)
                responsesArray.push(res.data);
              }
            })
        } catch (error) {
          console.log(error)
        }
      });
      setTimeout(() => {
        console.log("esto es url spaces: ", responsesArray)
        axios.post(`${API_URL}/muro/post/${id}`, {
          image: responsesArray,
          texto: texto
        },
          {
            headers: {
              'x-access-token': `${token}`,
              "Content-Type": "application/json",
            }
          }
        ).then((res) => {
          if (res.status === 200) {
            setShowAlertOK(true)
            console.log(JSON.stringify(res, null, 3));
            setShowAlert2(false)
          } else {
            console.log("NO SE PUDO PUBLICAR")
          }
        })
      }, 15000)
    }
    else {
      console.log("solo texto");
      console.log(texto);
      axios.post(`${API_URL}/muro/post/${id}`, {
        texto: texto
      },
        {
          headers: {
            'x-access-token': `${token}`,
            "Content-Type": "application/json",
          }
        }
      )
        .then((res) => {
          if (res.status === 200) {
            setShowAlertOK(true)
            console.log(JSON.stringify(res, null, 3));
            setShowAlert2(false)
          } else {
            console.log("NO SE PUDO PUBLICAR")
          }
        })
    }
  }

  console.log("disable :", disabledBtn);

  return (
    <ScrollView style={styles.container}>
      <Header children="Publicar" navigation={navigation} />
      <GestureHandlerRootView>
        <View style={{ flex: 1, alignItems: "center", paddingTop: 5 }}>
          <View style={{ backgroundColor: "white", width: "93%", height: imageRender.length !== 0 ? 617 : 253, borderRadius: 20, }}>
            {
              imageRender.length !== 0 ?
                <View style={{ height: imageRender.length !== 0 ? "56%" : "0%", alignItems: "center", borderRadius: 10, margin: 8 }}>
                  <Swiper style={{ height: "100%", borderRadius: 10 }}>
                    {
                      imageRender.map((img, index) => (
                        <View key={index} style={{ justifyContent: 'center', alignItems: 'center', height: "100%", borderRadius: 20 }}>
                          {
                            img.type.includes("video") ?
                              <Video
                                source={{ uri: img.uri }}
                                style={styles.video}
                                controls={true} // Muestra controles de reproducción
                                resizeMode="contain"

                              />
                              :
                              <GestureDetector gesture={onPinchEvent}>
                                <Animated.Image
                                  source={{
                                    uri: img.uri
                                  }}
                                  style={[styles.imgAnimada, estiloAnimado]}
                                />
                              </GestureDetector>
                          }
                          {showAlert && (
                            <AwesomeAlert
                              show={showAlert}
                              showProgress={false}
                              title="Límite de imágenes alcanzado"
                              message="Solo se pueden adjuntar 5 imagenes por publicacion!"
                              closeOnTouchOutside={true}
                              closeOnHardwareBackPress={false}
                              showConfirmButton={true}
                              confirmText="OK"
                              onConfirmPressed={() => setShowAlert(false)}
                            />
                          )}
                          <TouchableOpacity
                            style={{ position: 'absolute', top: 10, right: 10, backgroundColor: 'red', borderRadius: 20, padding: 5 }}
                            onPress={() => removeItem(index)}
                          >
                            <Text style={{ color: 'white' }}>Eliminar</Text>
                          </TouchableOpacity>
                        </View>
                      ))
                    }
                  </Swiper>
                </View>
                :
                null
            }
            <View style={{ height: "60%" }}>
              <View style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", height: 130 }}>
                <TextInput
                  placeholder="Escribe tu comentario..."
                  onChangeText={handleTextChange}
                  value={texto}
                  textAlignVertical="top"
                  multiline={true} // Permite múltiples líneas
                  numberOfLines={4} // Número de líneas visibles (ajusta según tus necesidades)
                  style={styles.textArea}
                  maxLength={160} // Establecer el número máximo de caracteres
                  placeholderTextColor="#CDD1DF"
                />
                <View style={{ width: "100%", paddingLeft: 10 }}>
                  <Text style={{ fontSize: 10, color: "#000000" }}>Caracteres restantes: {160 - texto.length}</Text>
                </View>
              </View>
              <View style={{ height: 50, alignItems: "center", display: "flex", flexDirection: "row", justifyContent: "flex-end", width: "97%" }}>
                <Text style={{ fontSize: 12, fontWeight: "600", color: "#7899FF", marginRight: "3%" }}>
                  Agregar a tu publicacion
                </Text>
                <TouchableOpacity onPress={requestGalleryPermission}>
                  <Image
                    source={require('../../../assets/Picture.png')}
                    style={{ width: 50, height: 50, marginRight: "3%" }}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleCameraPermission}>
                  <Image
                    source={require('../../../assets/Videos.png')}
                    style={{ width: 50, height: 50, }}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ height: 47, width: "100%", alignItems: "center", justifyContent: "center", display: "flex", marginTop: "5%" }}>
                <View style={{ width: "95%" }}>
                  <ButtonCustom
                    text="Publicar"
                    color={texto.length !== 0 ? "#FF3D00" : "#CDD1DF"}
                    onPress={armadoDePublicacion}
                    disabled={disabledBtn}
                  />
                </View>
              </View>
            </View>
          </View>
          {showAlert2 ? getAlert() : null}
          {showAlertOK ? getAlertOk() : null}
        </View>
      </GestureHandlerRootView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#D2DCEB",
    height: Height,
    display: "flex",
    // alignItems: "center"
  },
  buttonOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: "center"
  },
  gradient: {
    flex: 1,
    width: "100%"
  },
  containerVistaPre: {
    height: Height * 27 / 100,
    width: "95%",
  },
  video: {
    width: "100%",
    height: 350,
    borderRadius: 10
  },
  containerTextIcon: {
    width: "50%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    height: "35%",
    alignItems: "center",
  },
  containerBtn: {
    height: "6%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "3%",
  },
  containerPreView: {
    width: "100%",
    height: "85%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  containerComentario: {
    height: Height * 20 / 100,
    width: "95%",
  },
  containerImg: {
    width: "100%",
    height: "90%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  textArea: {
    borderWidth: 1,
    marginTop: "3%",
    borderColor: '#E5EBFF',
    borderRadius: 10,
    padding: 10,
    width: '95%',
    height: "75%", // Ajusta la altura según tus necesidades
    color: "#000000"
  },
  imgAnimada: { width: 340, height: 340, borderRadius: 10, resizeMode: "cover" }
})