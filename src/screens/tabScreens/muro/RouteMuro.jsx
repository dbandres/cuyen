import { Form } from "./Form";
import ModalMuro from "./ModalMuro";
import { Muro } from "./Muro";
import { MuroProvider } from "./MuroContext";



const { createStackNavigator } = require("@react-navigation/stack");

const Stack = createStackNavigator()

export const RouteMuro = () => {
	return (
		<MuroProvider>
			<Stack.Navigator
			>
				<Stack.Screen name="publicaciones" component={Muro} options={{ headerShown: false }} />
				<Stack.Screen name="publicar" component={Form} options={{ headerShown: false }} />
				<Stack.Screen name="galeria" component={ModalMuro} options={{ headerShown: false }} />
			</Stack.Navigator>
		</MuroProvider>
	)
}