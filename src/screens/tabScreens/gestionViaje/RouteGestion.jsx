import { GestionIniciarViaje } from "./GestionIniciarViaje";
import { GestionViaje } from "./GestionViaje";
import { GestionViajeTwo } from "./GestionViajeTwo";




const { createStackNavigator } = require("@react-navigation/stack");

const Stack = createStackNavigator()

export const RouteGestion =()=>{
  return(
    <Stack.Navigator>
      <Stack.Screen name="gestion de pasajeros" component={GestionViaje} options={{ headerShown: false }} />
      <Stack.Screen name="gestionDePasajerosTwo" component={GestionViajeTwo} options={{ headerShown: false }}/>
      <Stack.Screen name="gestionIniciarViaje" component={GestionIniciarViaje} options={{ headerShown: false }}/>
		</Stack.Navigator>
  )
}