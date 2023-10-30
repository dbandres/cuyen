import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { StyleSheet, View, Text, Image } from "react-native"
import { Landing } from '../screens/auth/landing/Landing';
import { InfoDelViaje } from '../screens/tabScreens/InfoDelViaje';
import { CargaPasajero } from '../screens/tabScreens/CargaPasajero';
import { Ubicacion } from '../screens/tabScreens/Ubicacion';
import { MenuBottonItem } from './MenuBottonItem';
import { data } from './dataDrawer';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { RouteMuro } from '../screens/tabScreens/muro/RouteMuro';




const CustomDrawerContent = ({ navigation }) => {

	console.log(data)

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
					<TouchableOpacity>
						<Image
							source={require("../assets/insta.png")}
							style={{ width: 32, height: 32 }}
						/>
					</TouchableOpacity>
					<TouchableOpacity>
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
					<View style={{ height: "30%",  marginBottom:"10%"}}>
						<View style={{  height: "70%", display: "flex", justifyContent: "space-between", flexDirection:"row" }}>
							<View style={{width:"50%"}}>
								<Text style={{fontWeight:"700", color:"white"}}>Jonathan David Fischer</Text>
							</View>
							<TouchableOpacity>
								<Image
									source={require("../assets/edit.png")}
									style={{ width: 40, height: 40 }}
								/>
							</TouchableOpacity>
						</View>
						<Text style={{ color: "white" }}>Contrato 43587</Text>
					</View>
					{
						data.map((d, index) => (
							<MenuBottonItem
								key={index}
								text={d.text}
								onPress={() => navigation.navigate(d.route)}
								img={d.img}
							/>
						))
					}
				</View>
			</View>
			<View style={{ alignItems: "center", marginTop: "43%" }}>
				<View style={{ width: "80%" }}>
					<View style={{ borderBottomWidth: 1, borderColor: "#8CCBF9" }}>
					</View>
					<View style={{ display: "flex", flexDirection: "row", height: 50, alignItems: "center" }}>
						<Image
							source={require("../assets/salir.png")}
							style={{ width: 24, height: 26 }}
						/>
						<Text style={{ color: "#8CCBF9", marginLeft: "3%" }}>
							Cerrar sesión
						</Text>
					</View>
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
			<Drawer.Screen name="Inicio" component={Landing} options={{ headerShown: false }} />
			<Drawer.Screen name="info-viaje" component={InfoDelViaje} options={{ headerShown: false }} />
			<Drawer.Screen name="carga-pasajero " component={CargaPasajero} options={{ headerShown: false }} />
			<Drawer.Screen name="muro" component={RouteMuro} options={{ headerShown: false }} />
			<Drawer.Screen name="ubiViaje" component={Ubicacion} options={{ headerShown: false }} />
			{/* <Drawer.Screen name="Gestionar viaje" component={GestionViaje} options={{ headerShown: false }} />
			<Drawer.Screen name="Gestionar muro" component={GestionMuro} options={{ headerShown: false }} />
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