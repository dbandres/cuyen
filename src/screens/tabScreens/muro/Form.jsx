import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView, Modal, TouchableOpacity, TextInput, Platform, PermissionsAndroid, FlatList, Image } from "react-native";
import Swiper from 'react-native-swiper'
import { request, PERMISSIONS, check, RESULTS } from 'react-native-permissions';
import { launchCamera, launchImageLibrary } from "react-native-image-picker"
import { ButtonCustom } from "../../../components/ButtomCustom";
import { Header } from "./Header";
import axios from "axios";


const Height = Dimensions.get("screen").height

export function Form({ navigation }) {

  const [texto, setTexto] = useState('');
  const [imageRender, setImageRender] = useState([]);
  const [cameraGranted, setCameraGranted] = useState(false);

  const [postData, setPostData] = useState({
    comentario: '',
    img: [],
  });

  console.log(imageRender)

  const handleTextChange = (newText) => {
    // Verificar la longitud máxima del texto
    if (newText.length <= 160) {
      setTexto(newText);
      setPostData({ comentario: newText });
    }
  };

  const addImageUri = (newUri) => {
    if (newUri) {
      setImageRender([].concat(...imageRender, newUri));
    }
  };


  const requestGalleryPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Permiso de acceso a la galería',
          message: 'Necesitamos acceder a tu galería de fotos para que puedas seleccionar imágenes y utilizarlas en la aplicación. ' +
            'Por favor, otorga el permiso para continuar.',
          buttonPositive: 'Aceptar',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Permiso a galeria otorgado');
        openImageLibrary()
      } else {
        console.log('Permiso a galeria denegado');
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
      console.log("Permiso Camera garantizado")
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
          addImageUri(response.assets[0].uri)
        }
        else {
          console.log("error, no seleccionó ninguna foto")
        }
      } catch (error) {
        console.log(error)
      }
      // console.log(response)
      // setImageUri(response.assets[0].base64)
      // response.assets[0].uri ? setValue("image", response.assets[0].uri) : setValue("image", response.assets[0].uri)
    });
  };

  const openImageLibrary = () => {
    launchImageLibrary({
      mediaType: 'mixed', quality: 0.5, selectionLimit: 5
    }, response => {
      if (response.didCancel) {
        console.log('El usuario canceló la selección');
      } else if (response.error) {
        console.log('Ocurrió un error: ', response.error);
      } else {
        console.log("estado del response: ", response)
        // Aquí puedes manejar la imagen o video seleccionado
        console.log(JSON.stringify(response, null, 3))
        const selectedImageUris = response.assets.map((asset) => asset.uri);
        setImageRender([...imageRender, ...selectedImageUris]);
        // addImageUri(response.assets[0].uri)
      }
    })
  }

  const removeItem = (indexToRemove) => {
    const updatedImageRender = [...imageRender];
    updatedImageRender.splice(indexToRemove, 1); // Elimina el elemento en el índice especificado
    setImageRender(updatedImageRender); // Actualiza el estado con el nuevo array

  };

  const armadoDePublicacion = () => {
    if(imageRender.length !== 0){
      try {
        imageRender.forEach(img => {
          axios.post("https://www.turismocuyen.com.ar/viaje/spaces", img,
          {
            "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.p5Uixc5mcFGxx8eRohkZI8ec8vR092iQb5GDsJVqffM"
          }
          )
          .then(res=>console.log(res))
        });
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Header children="Publicar" navigation={navigation} />
      <View style={{ flex: 1, alignItems: "center" }}>
        <View style={{ backgroundColor: "white", width: "93%", height: imageRender.length !== 0 ? 617 : 253, borderRadius: 20 }}>
          {
            imageRender.length !== 0 ?
              <View style={{ height: imageRender.length !== 0 ? "56%" : "0%", alignItems: "center", borderRadius: 10, margin: 8 }}>
                <Swiper style={{ height: "100%", borderRadius: 10 }}>
                  {
                    imageRender.map((img, index) => (
                      <View key={index} style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                          source={{
                            uri: img
                          }}
                          style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 10 }}
                        />
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
              />
              <View style={{ width: "100%", paddingLeft: 10 }}>
                <Text style={{ fontSize: 10 }}>Caracteres restantes: {160 - texto.length}</Text>
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
                  color={texto !== " " ? "#FF3D00" : "#CDD1DF"}
                  onPress={armadoDePublicacion}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
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
  },
})