import {GestionViajeProvider } from "./GestionViajeContext";
import { GestionIniciarViaje } from "./GestionIniciarViaje";
import { GestionViaje } from "./GestionViaje";
import { GestionViajeFinalizar } from "./GestionViajeFinalizar";
import { GestionViajeOK } from "./GestionViajeOK";
import { GestionViajeTwo } from "./GestionViajeTwo";

const { createStackNavigator } = require("@react-navigation/stack");

const Stack = createStackNavigator()

export const RouteGestion = () => {

  return (
    <GestionViajeProvider>
      <Stack.Navigator>
        <Stack.Screen name="gestion de pasajeros" component={GestionViaje} options={{ headerShown: false,}}/>
        <Stack.Screen name="gestionDePasajerosTwo" component={GestionViajeTwo} options={{ headerShown: false }} />
        <Stack.Screen name="gestionIniciarViaje" component={GestionIniciarViaje} options={{ headerShown: false }} />
        <Stack.Screen name="gestionViajeOK" component={GestionViajeOK} options={{ headerShown: false }} />
        <Stack.Screen name="gestionViajeFinalizar" component={GestionViajeFinalizar} options={{ headerShown: false }} />
      </Stack.Navigator>
    </GestionViajeProvider>
  )
}