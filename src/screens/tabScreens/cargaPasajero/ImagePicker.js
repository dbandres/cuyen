import { PermissionsAndroid, Platform } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { check, request, PERMISSIONS, RESULTS, openSettings } from 'react-native-permissions';

const requestGalleryPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: 'Permiso de acceso a la galería',
        message: 'Necesitamos acceder a tu galería de fotos para que puedas seleccionar imágenes y utilizarlas en la aplicación. ' +
          'Por favor, otorga el permiso para continuar.',
        buttonPositive: 'Continuar',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return granted
    } else {
      console.log("log granted: ",granted);
      console.log('Permiso a galería denegado');
      openSettings()
    }
  } catch (err) {
    console.warn(err);
  }
};

const handleCameraPermission = async () => {
  const permission = Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA;
  console.log("permisos camara: ",permission);
  const res = await check(permission);
  console.log("res log: ",res);
  if (res === RESULTS.GRANTED) {
    return res
  } else if (res === RESULTS.DENIED) {
    const res2 = await request(permission);
    console.log("res 2 log: ",res2);
    res2 === RESULTS.GRANTED ? res2 : openSettings();
  }
};

const openCamera = () => {
  return new Promise((resolve, reject)=>{
    launchCamera(
      { mediaType: 'mixed', includeBase64: true, quality: 0.5,  },
      response => {
        try {
          if (response) {
            const newImage = { uri: response.assets[0].uri, type: response.assets[0].type, name: response.assets[0].fileName };
            resolve(newImage);
          } else {
            console.log('Error, no seleccionó ninguna foto');
          }
        } catch (error) {
          console.log(error);
          reject("Mensaje de error: ",error)
        }
      }
    );
  })
};

const openImageLibrary = (limit) => {
  return new Promise((resolve, reject) => {
    launchImageLibrary(
      { mediaType: 'photo', quality: 0.5, selectionLimit: 1},
      response => {
        if (response.didCancel) {
          console.log('El usuario canceló la selección');
          reject('Selección cancelada');
        } else if (response.error) {
          console.log('Ocurrió un error: ', response.error);
          reject('Error en la selección');
        } else {
          if(response.assets.length > 2){
            reject(new Error('Error en la cantidad de imagenes seleccionada'))
          }
          // console.log("img desde galeria: ", response.assets);
          const imgSelect = {
            uri: response.assets[0].uri,
            type: response.assets[0].type,
            name: response.assets[0].fileName,
          };
          resolve(imgSelect);
        }
      }
    );
  });
};

export { requestGalleryPermission, handleCameraPermission, openCamera, openImageLibrary };