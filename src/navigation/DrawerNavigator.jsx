import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import { StyleSheet, View, Text, Image, Linking } from "react-native"
import { Ubicacion } from '../screens/tabScreens/Ubicacion';
import { MenuBottonItem } from './MenuBottonItem';
import { data } from './dataDrawer';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { RouteMuro } from '../screens/tabScreens/muro/RouteMuro';
import { UserContext } from '../context/UserContext';
import { useContext } from "react";
import { Folleto } from '../screens/auth/intoScreen/Folleto';
import { RouteLanding } from '../screens/auth/landing/RouteLanding';
import { RouteGestion } from '../screens/tabScreens/gestionViaje/RouteGestion';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RouteInicial } from '../screens/tabScreens/infoViaje/RouteInicial';
import { AuthContext } from '../context/AuthContext';



const CustomDrawerContent = ({ navigation }) => {

	const { userdata, setUserData } = useContext(UserContext)
	const {authenticate, setAuthenticate} = useContext(AuthContext)

	const singOutSession = () => {
		AsyncStorage.removeItem("userStorage")
		setUserData({
			apellido: "",
			contrato: "",
			email: "",
			jwt: "",
			nombre: "",
			rol: "",
			telefono: "",
			usuario: ""
		})
		setAuthenticate(false)
		navigation.navigate("login")
	}

	const abrirLink = (linkUrl) => {
    const url = linkUrl;
    Linking.openURL(url)
      .catch((err) => console.error('Error al abrir el enlace:', err));
  };

	return (
		<DrawerContentScrollView style={{ backgroundColor: "#3462BF", flex: 1 }}>
			<View style={styles.drawerHeader}>
				{/* Aquí puedes agregar tu imagen */}
				<Image
					source={require("../assets/logoCuyen.png")} // Ruta a tu imagen
					style={styles.drawerImage}
				/>
			</View>
			<View style={{ height: 70, alignItems: "center", position: "absolute", top: "25%", left: "20%" }}>
				<View style={{ width: "80%", height: "100%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-end" }}>
					<TouchableOpacity onPress={()=>{abrirLink("https://www.instagram.com/cuyenturismo/")}}>
						<Image
							source={require("../assets/insta.png")}
							style={{ width: 32, height: 32 }}
						/>
					</TouchableOpacity>
					<TouchableOpacity onPress={()=>{abrirLink("https://www.facebook.com/cuyenturismo/?locale=es_LA")}}>
						<Image
							source={require("../assets/Facebook.png")}
							style={{ width: 32, height: 32 }}
						/>
					</TouchableOpacity>
					<TouchableOpacity>
						<Image
							source={require("../assets/Email.png")}
							style={{ width: 32, height: 32 }}
						/>
					</TouchableOpacity>
				</View>
			</View>
			<View style={{ alignItems: "center" }}>
				<View style={{ height: 250, width: "80%", marginTop: "15%" }}>
					<View style={{ height: "30%", marginBottom: "10%" }}>
						<View style={{ height: "70%", display: "flex", justifyContent: "space-between", flexDirection: "row" }}>
							<View style={{ width: "50%" }}>
								<Text style={{ fontWeight: "700", color: "white" }}>{userdata.apellido.toUpperCase()} {userdata.nombre}</Text>
							</View>
							<TouchableOpacity>
								<Image
									source={require("../assets/edit.png")}
									style={{ width: 40, height: 40 }}
								/>
							</TouchableOpacity>
						</View>
						<Text style={{ color: "white" }}>Contrato {userdata.contrato}</Text>
					</View>
					{
						data.map((d, index) => (
							(userdata.rol == "Coordinador" && d.text === "Gestión del Viaje") ||
								(userdata.rol == "Coordinador" && d.text === "Muro de publicaciones") ?
								<MenuBottonItem
									key={index}
									text={d.text}
									onPress={() => navigation.navigate(d.route)}
									img={d.img}
								/> :
								(userdata.rol !== "Coordinador" && d.text !== "Gestión del Viaje") ?
									<MenuBottonItem
										key={index}
										text={d.text}
										onPress={() => navigation.navigate(d.route)}
										img={d.img}
									/> :
									null
						))
					}
				</View>
			</View>
			<View style={{ alignItems: "center", marginTop: "43%" }}>
				<View style={{ width: "80%" }}>
					<View style={{ borderBottomWidth: 1, borderColor: "#8CCBF9" }}>
					</View>
					<TouchableOpacity onPress={singOutSession} style={{ display: "flex", flexDirection: "row", height: 50, alignItems: "center" }}>
						<Image
							source={require("../assets/salir.png")}
							style={{ width: 24, height: 26 }}
						/>
						<Text style={{ color: "#8CCBF9", marginLeft: "3%" }}>
							Cerrar sesión
						</Text>
					</TouchableOpacity>
				</View>
			</View>
			{/* <DrawerItemList {...props} /> */}
		</DrawerContentScrollView>
	);
};


const Drawer = createDrawerNavigator();

function DrawerNavigator() {

	return (
		<Drawer.Navigator
			drawerContent={(props) => <CustomDrawerContent {...props} />}
			screenOptions={{
				drawerActiveBackgroundColor: "orange",
			}}
		>
			<Drawer.Screen name="Inicio" component={RouteLanding} options={{ headerShown: false }} />
			<Drawer.Screen name="info-viaje" component={RouteInicial} options={{ headerShown: false }} />
			{/* <Drawer.Screen name="carga-pasajero" component={CargaPasajero} options={{ headerShown: false }} />  */}
			<Drawer.Screen name="muro" component={RouteMuro} options={{ headerShown: false }} />
			<Drawer.Screen name="ubiViaje" component={Ubicacion} options={{ headerShown: false }} />
			<Drawer.Screen name="folleto-screen" component={Folleto} options={{ headerShown: false }} />
			<Drawer.Screen name="gesViaje" component={RouteGestion} options={{ headerShown: false }} />
			{/*<Drawer.Screen name="Gestionar muro" component={GestionMuro} options={{ headerShown: false }} />
			<Drawer.Screen name="Ajustes" component={Settings} options={{ headerShown: false }} /> */}
		</Drawer.Navigator>
	);
}


const styles = StyleSheet.create({
	drawerHeader: {
		height: 199,
		alignItems: 'flex-start',
		justifyContent: 'center',
		flexDirection: 'column',
		backgroundColor: "white",
		marginTop: -3.5,
	},
	drawerHeaderText: {
		color: 'black',
		fontSize: 24,
		fontWeight: 'bold',
	},
	drawerImage: {
		width: 180,
		height: 90,
	},
	drawerText: {
		color: 'black',
		fontSize: 14,
		fontWeight: 'bold',
	}
});
export default DrawerNavigator;