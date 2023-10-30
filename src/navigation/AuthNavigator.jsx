import ForgotPassword from "../screens/auth/ForgotPassword";
import Login from "../screens/auth/loginScreen/Login";
import Register from "../screens/auth/registerScreen/Register";
import axios from 'axios';
import DrawerNavigator from "./DrawerNavigator";
import ForgotPassword2 from "../screens/auth/ForgotPassword2";
import { ForgotPassword3 } from "../screens/auth/ForgotPassword3";
import { Intro } from "../screens/auth/intoScreen/Intro";
import { RegisterOk } from "../screens/auth/registerScreen/RegisterOk";
import { ForgotPassword1 } from "../screens/auth/ForgotPassword1";

const { createStackNavigator } = require("@react-navigation/stack");

const Stack = createStackNavigator()
axios.defaults.baseURL = 'http://192.168.1.5:4002'

export default function AuthNavigator() {
	return (
		<Stack.Navigator
		>
			<Stack.Screen name="introScreen" component={Intro} options={{ headerShown: false }} />
			<Stack.Screen name="login" component={Login} options={{ headerShown: false }} />
			<Stack.Screen name="register" component={Register} options={{ headerShown: false }} />
			<Stack.Screen name="registerOk" component={RegisterOk} options={{ headerShown: false }} />
			<Stack.Screen name="forgotPass" component={ForgotPassword} options={{ headerShown: false }} />
			<Stack.Screen name="forgotPassOne" component={ForgotPassword1} options={{ headerShown: false }}/>
			<Stack.Screen name="forgotPasstwo" component={ForgotPassword2} options={{ title: "Enviar Código", headerStyle:{backgroundColor: "white", elevation: 0, shadowColor: "transparent"}, headerTintColor: "black", headerTitleAlign: "center" }} />
			<Stack.Screen name="forgotPassthree" component={ForgotPassword3} options={{ title: "Ingresar Contraseña Nueva", headerStyle:{backgroundColor: "white", elevation: 0, shadowColor: "transparent"}, headerTintColor: "black", headerTitleAlign: "center" }} />
			<Stack.Screen name="landing" component={DrawerNavigator} options={{ headerShown: false }}/>
		</Stack.Navigator>
	)
}