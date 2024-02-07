import ForgotPassword from "../screens/auth/forgotPass/ForgotPassword";
import Login from "../screens/auth/loginScreen/Login";
import Register from "../screens/auth/registerScreen/Register";
import axios from 'axios';
import DrawerNavigator from "./DrawerNavigator";
import ForgotPassword2 from "../screens/auth/forgotPass/ForgotPassword2";
import { ForgotPassword3 } from "../screens/auth/forgotPass/ForgotPassword3";
import { RegisterOk } from "../screens/auth/registerScreen/RegisterOk";
import { ForgotPassword1 } from "../screens/auth/forgotPass/ForgotPassword1";
import { FinishForgotPass } from "../screens/auth/forgotPass/FinishForgotPass";
import { RouteInto } from "../screens/auth/intoScreen/RouteInto";
import { useContext, useEffect, useState } from "react";
import auth from "@react-native-firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../context/UserContext";

const { createStackNavigator } = require("@react-navigation/stack");

const Stack = createStackNavigator()
axios.defaults.baseURL = 'https://www.turismocuyen.com.ar'

export default function AuthNavigator() {

	const { setUserData } = useContext(UserContext)
	//verificamos si el usser esta autenticado.
	const [initializing, setInitializing] = useState(true)
	const [user, setUser] = useState(null)

	const showData = async () => {
		const data = await AsyncStorage.getItem("userStorage")
		const parseado = JSON.parse(data)
		if (parseado !== null) {
			setUserData({
				apellido: parseado.usuario?.apellido,
				contrato: parseado.usuario?.contrato,
				email: parseado.usuario?.email,
				jwt: parseado?.token,
				nombre: parseado.usuario?.nombre,
				rol: parseado.usuario?.rol,
				telefono: parseado.usuario?.telefono,
				usuario: parseado.usuario?.usuario,
				id: parseado.usuario?.id
			})
		}
	}

	function onAuthStateChange(user) {
		showData()
		setUser(user)
		if (initializing) setInitializing(false)
	}
	useEffect(() => {
		const subscribe = auth().onAuthStateChanged(onAuthStateChange)
		return subscribe
	}, [])
	if (initializing) return null;

	return (
		<Stack.Navigator
		>
			{
				user ?
					<Stack.Screen name="landing" component={DrawerNavigator} options={{ headerShown: false }} />
					:
					<>
						<Stack.Screen name="introScreen" component={RouteInto} options={{ headerShown: false }} />
						<Stack.Screen name="login" component={Login} options={{ headerShown: false }} />
						<Stack.Screen name="register" component={Register} options={{ headerShown: false }} />
						<Stack.Screen name="registerOk" component={RegisterOk} options={{ headerShown: false }} />
						<Stack.Screen name="forgotPass" component={ForgotPassword} options={{ headerShown: false }} />
						<Stack.Screen name="forgotPassOne" component={ForgotPassword1} options={{ headerShown: false }} />
						<Stack.Screen name="forgotPasstwo" component={ForgotPassword2} options={{ headerShown: false }} />
						<Stack.Screen name="forgotPassthree" component={ForgotPassword3} options={{ headerShown: false }} />
						<Stack.Screen name="finishForgotPass" component={FinishForgotPass} options={{ headerShown: false }} />
						{/* <Stack.Screen name="landing" component={DrawerNavigator} options={{ headerShown: false }} /> */}
					</>
			}
		</Stack.Navigator>
	)
}