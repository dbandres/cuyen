import BackgroundService from 'react-native-background-actions';
import { API_URL, token } from '../../../api';
import axios from 'axios';
const sleep = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));

export const changeStatusViaje = async (location, miDato) => {
  if(location && miDato){
    try {
      await axios.put(`${API_URL}/viaje/${miDato.dato}`,
        {
          "inicioViaje": true,
          "ultimaUbic": location
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
            console.log("Ubicacion enviada cada 5 minutos");
            return res
              
          }
        })
    } catch (error) {
      console.log("error en change status viaje: ", error);
      return error
    }
  }else{
    return false
  }
}


  export const veryIntensiveTask = async (taskDataArguments) => {
    // Example of an infinite loop task
    const { position, miDato } = taskDataArguments;
    await new Promise(async (resolve) => {
      for (let i = 0; BackgroundService.isRunning(); i++) { 
        changeStatusViaje(position, miDato)
        await sleep(300000); //5 minutos
      }
    });
  };

  export const stopBackgroundService = async () => {
    console.log("termino");
    await BackgroundService.stop();
  };
