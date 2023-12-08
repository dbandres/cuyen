import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions, Image, Platform } from "react-native";
import { useContext, useEffect, useState } from "react";
import { CardsMuro } from "./CardsMuro";
import { Header } from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { UserContext } from "../../../context/UserContext";
import { getAllPost } from "../../../redux/actions";
import { MuroContext } from "./MuroContext";
import axios from "axios";
import { token } from "../../../api";
import AwesomeAlert from "react-native-awesome-alerts";


const Height = Dimensions.get("screen").height
const Width = Dimensions.get("screen").width

export function Muro({ navigation }) {

	const { userdata } = useContext(UserContext)
	const { miDato, actualizarDato } = useContext(MuroContext);
	const [control, setControl] = useState(false)
	const [travelId, setTravelId] = useState("")
	const allPost = useSelector((state) => state.allPost)
	const [error, setError] = useState("")
	const [disabled, setDisabled] = useState(false)
	const [showAlert, setShowAlert] = useState(false)
	const dispatch = useDispatch()

	useEffect(() => {
		if(travelId !== ""){
			dispatch(getAllPost(travelId))
		}
	}, [travelId])

	useEffect(() => {
		if(control === true && travelId !== ""){
			dispatch(getAllPost(travelId))
			setControl(false)
		}
	}, [control, miDato, travelId])

	function controlDispatch() {
		setControl(!control)
	}

	const getAlert = () => {
    return (
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title="Error"
        message={`${error.message}`}
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText="Aceptar"
        confirmButtonColor="#008000"
        onConfirmPressed={() => {
          navigation.navigate("gesViaje")
        }}
      />
    )
  }

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.put("coordinador", {
					"contratos": userdata.contrato
				}, {
					headers: {
						'x-access-token': `${token}`,
						"Content-Type": "application/json",
					}
				})
				const id = response.data.map((res) => res.id)
				setTravelId(id.toString());
			} catch (error) {
				if (error.response) {
          // El servidor respondió con un código de estado que no está en el rango 2xx
          console.log('Error de respuesta:', error.response.data);
					setError(error.response.data)
					setDisabled(true)
					setShowAlert(true)
        } else if (error.request) {
          // La solicitud fue realizada pero no se recibió ninguna respuesta
          console.log('No se recibió respuesta del servidor.');
        } else {
          // Ocurrió un error durante la configuración de la solicitud
          console.log('Error al configurar la solicitud:', error.message);
        }
			}
		}
		fetchData();
	}, [])


	return (
		<View style={styles.container}>
			<Header children="Publicaciones" navigation={navigation} />
			<View style={styles.centeredFlatList}>
				{
					allPost.length != 0 ?
						<FlatList
							style={{ maxWidth: "100%" }}
							data={allPost}
							keyExtractor={(item) => item.id.toString()}
							renderItem={({ item, index }) => (
								<View key={item.id} style={styles.containerPublicacion}>
									<CardsMuro data={item} controlDispatch={controlDispatch} />
								</View>
							)}
						/>
						:
						<View>
							<Text>
								No hay publicaiones
							</Text>
						</View>
				}
			</View>
			{
				userdata.rol !== "Padre" ?
					<View style={{ backgroundColor: "#162962", height: "8%", alignItems: "center" }}>
						<View style={{ width: "17%", bottom: "34%", backgroundColor: "#162962", alignItems: "center", justifyContent: "center", borderRadius: 50, height: "120%" }}>
							<TouchableOpacity disabled={disabled} onPress={() => { navigation.navigate("publicar", { travelId }) }}>
								<Image
									source={require("../../../assets/add.png")}
									style={{ width: 40, height: 40 }}
								/>
							</TouchableOpacity>
							<Text style={{ color: "white", fontSize: 10 }}>Publicar</Text>
						</View>
					</View>
					:
					null
			}
			{showAlert ? getAlert() : null}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#D2DCEB",
		flex: 1,
		display: "flex",
		justifyContent: "center",
	},
	containerBtn: {
		height: Height * 6 / 100,
		width: "100%",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		marginBottom: "3%",
	},
	gradient: {
		flex: 1,
		width: "100%"
	},
	buttonOverlay: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		justifyContent: 'space-around',
		flexDirection: "row",
	},
	containerPublicacion: {
		borderRadius: 20,
		alignItems: "center", // Center horizontally within the container
		width: "97%",
		marginBottom: "5%",
		overflow: "hidden",
		...Platform.select({
			ios: {
				shadowColor: 'rgba(0, 0, 0, 0.25)',
				shadowOffset: { width: 0, height: 2 },
				shadowOpacity: 1,
				shadowRadius: 2,
			},
			android: {
				elevation: 1,
				shadowColor: 'rgba(0, 0, 0, 0.11)',
				shadowOffset: { width: 0, height: 1 },
				shadowOpacity: 1,
				shadowRadius: 2,
			},
		}),
	},
	centeredFlatList: {
		flex: 1,
		display: "flex",
		justifyContent: "center", // Center vertically
		alignItems: "center", // Center horizontall
		paddingTop: 5,
		paddingLeft: "2.5%",
		paddingBottom: "2%"
	},
})