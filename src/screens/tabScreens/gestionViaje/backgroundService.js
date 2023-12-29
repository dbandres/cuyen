// backgroundService.js
import BackgroundService from 'react-native-background-actions';

const options = {
  taskName: 'MiTareaEnSegundoPlano',
  taskTitle: 'Mi Tarea en Segundo Plano',
  taskDesc: 'Realizando alguna tarea en segundo plano',
  taskIcon: {
    name: 'ic_launcher',
    type: 'mipmap',
  },
  color: '#ff00ff',
  linkingURI: 'tuEsquema://chat',
  parameters: {
    delay: 10000,
  },
};

let intervalId;

export const startBackgroundService = (yourTask) => {
  BackgroundService.start(yourTask, options);
  // Ejecuta yourTask cada 15 minutos
  intervalId = setInterval(() => {
    yourTask();
  }, 10 * 60 * 1000);
};

export const stopBackgroundService = async () => {
  console.log("termino");
  clearInterval(intervalId);
  await BackgroundService.stop();
};