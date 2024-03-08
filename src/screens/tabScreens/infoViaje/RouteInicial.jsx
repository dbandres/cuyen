import { CargaPasajero } from "../cargaPasajero/CargaPasajero";
import { InfoProvider } from "./InfoContext";
import { RouteInfoViaje } from "./RouteInfoViaje";


const { createStackNavigator } = require("@react-navigation/stack");

const Stack = createStackNavigator()

export const RouteInicial = () => {
	return (
		<InfoProvider>
			<Stack.Navigator
			>
				<Stack.Screen name="routeInfoViaje" component={RouteInfoViaje} options={{ headerShown: false }} />
				<Stack.Screen name="carga-pasajero" component={CargaPasajero} options={{ headerShown: false }} />
			</Stack.Navigator>
		</InfoProvider>
	)
}