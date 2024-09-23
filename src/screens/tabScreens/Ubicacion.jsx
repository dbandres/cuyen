import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import { UserContext } from "../../context/UserContext";
import { useDispatch, useSelector } from "react-redux";
import { getDestino } from "../../redux/actions";
import { Header } from "./muro/Header";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ButtonCustom } from "../../components/ButtomCustom";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function Ubicacion({ navigation }) {

	const dispatch = useDispatch()
	const destino = useSelector((state) => state.destino)
	const { userdata } = useContext(UserContext)
	const [fecha, setFecha] = useState("")
	const [latitude, setLatitude] = useState("")
	const [longitude, setLongitude] = useState("")
	const contratoActual = useSelector((state) => state.currentContrato)

	const [isButtonDisabled, setIsButtonDisabled] = useState(false);
	const [timeLeft, setTimeLeft] = useState(0);

	const checkButtonStatus = async () => {
		try {
			const storedTime = await AsyncStorage.getItem('buttonDisabledUntil');
			if (storedTime) {
				const disabledUntil = parseInt(storedTime, 10);
				const currentTime = new Date().getTime();
				if (disabledUntil > currentTime) {
					setIsButtonDisabled(true);
					setTimeLeft(Math.floor((disabledUntil - currentTime) / 1000));
				} else {
					await AsyncStorage.removeItem('buttonDisabledUntil');
				}
			}
		} catch (error) {
			console.error('Error checking button status:', error);
		}
	};

	useFocusEffect(
		React.useCallback(() => {
			try {
				dispatch(getDestino(contratoActual))
				checkButtonStatus();
			} catch (error) {
				console.log("Error en useFocusEffect: ", error);
			}
		}, [])
	)

	useEffect(() => {
		let timer;
		if (isButtonDisabled && timeLeft > 0) {
			timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
		} else if (timeLeft === 0) {
			setIsButtonDisabled(false);
			AsyncStorage.removeItem('buttonDisabledUntil');
		}
		return () => clearTimeout(timer);
	}, [isButtonDisabled, timeLeft]);

	const handleUpdateLocation = async () => {
		dispatch(getDestino(contratoActual));
		setIsButtonDisabled(true);
		const disabledUntil = new Date().getTime() + 300000; // current time + 5 minutes
		await AsyncStorage.setItem('buttonDisabledUntil', disabledUntil.toString());
		setTimeLeft(300);
	};

	useEffect(() => {
		if (destino.length !== 0) {
			const fecha = new Date(destino.updatedAt)
			// Obtener la hora y los minutos
			const horas = fecha.getHours();
			const minutos = fecha.getMinutes();
			setFecha(`${horas}:${minutos}`)
			if (destino.ultimaUbic !== null) {
				setLatitude(destino.ultimaUbic.latitude)
				setLongitude(destino.ultimaUbic.longitude)
			} else {
				console.log("No hay ubicacion...");
			}
		}
	}, [destino])

	// Estado para almacenar el nivel de zoom actual
	const [zoomLevel, setZoomLevel] = useState(0.20);

	const increaseZoom = () => {
		// Aumentar el nivel de zoom (puedes ajustar la cantidad según tus necesidades)
		setZoomLevel(zoomLevel + 0.05);
	};

	const decreaseZoom = () => {
		// Disminuir el nivel de zoom (puedes ajustar la cantidad según tus necesidades)
		setZoomLevel(zoomLevel - 0.05);
	};

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={styles.container}>
				<Header children={destino.destino} navigation={navigation} />
				<ScrollView>
					<View style={{ width: 373, height: 91, backgroundColor: "#FFFFFF", marginTop: 20, borderRadius: 10, alignItems: "center", justifyContent: "flex-start", display: "flex", flexDirection: "row", padding: 20 }}>
						<View style={{ width: 48, height: 48, borderRadius: 10, backgroundColor: "#FF3D00", alignItems: "center", justifyContent: "center" }}>
							<Image
								source={require('../../assets/destino.png')}
								style={{ width: 24, height: 24 }}
							/>
						</View>
						<View style={{ marginLeft: 15, height: 48, alignItems: "flex-start", justifyContent: "center" }}>
							<Text style={{ color: "#564C71", fontWeight: "800", fontSize: 12, lineHeight: 14, marginBottom: 6 }}>
								Destino
							</Text>
							<Text style={{ color: "#564C71", fontWeight: "400", fontSize: 16, lineHeight: 19 }}>
								{destino.destino ? destino.destino : 'Destino no disponible.'}
							</Text>
						</View>
					</View>
					<View style={{ width: 373, height: 88, backgroundColor: "#FFFFFF", borderRadius: 10, marginTop: 20, alignItems: "center", justifyContent: "flex-start", display: "flex", flexDirection: "row", padding: 20, marginBottom: 10 }}>
						<View style={{ width: 44, height: 44, borderRadius: 50, backgroundColor: "#3FA9F5", alignItems: "center", justifyContent: "center" }}>
							<Image
								source={require('../../assets/info.png')}
								style={{ width: 20, height: 20 }}
							/>
						</View>
						<View style={{ height: 52, width: "90%", alignItems: "center", justifyContent: "center" }}>
							<Text style={{ color: "#564C71", fontWeight: "400", fontSize: 10, lineHeight: 12 }}>Se muestra la última ubicación reportada. La actualización de la ubicación se realizará siempre que la zona por la cual transite el contingente, cuente con señal a internet y señal de GPS.</Text>
						</View>
					</View>
					{
						latitude !== "" && longitude !== "" ?
							<View style={{ width: 373, height: 505, backgroundColor: "#FFFFFF", borderRadius: 10, marginBottom: 10 }}>
								<MapView
									provider={PROVIDER_GOOGLE}
									style={{ height: 389, width: 373, borderRadius: 10 }}
									initialRegion={{
										latitude: latitude,
										longitude: longitude,
										latitudeDelta: zoomLevel, // Utilizar el nivel de zoom actual
										longitudeDelta: zoomLevel,
									}}
								>
									<Marker
										coordinate={{
											latitude: latitude,
											longitude: longitude,
										}}
										image={require('../../assets/marker.png')}
										style={{ height: 41, width: 68 }}
									/>
								</MapView>
								<View style={styles.zoomButtonContainer}>
									<TouchableOpacity onPress={increaseZoom} style={styles.zoomButton}>
										<Text style={styles.zoomButtonText}>+</Text>
									</TouchableOpacity>
									<TouchableOpacity onPress={decreaseZoom} style={styles.zoomButton}>
										<Text style={styles.zoomButtonText}>-</Text>
									</TouchableOpacity>
								</View>
								<View style={{ height: 120, justifyContent: "center", alignItems: "center", gap: 10 }}>
									<View style={{ width: 280, height: 46, borderRadius: 30, borderWidth: 1, justifyContent: "space-around", alignItems: "center", borderColor: "#CDD1DF", display: "flex", flexDirection: "row" }}>
										<View style={{ display: "flex", flexDirection: "row" }}>
											<Text style={{ fontWeight: "400", fontSize: 16, lineHeight: 19, marginRight: 5, color: "#564C71" }}>
												Última actualización
											</Text>
											<Text style={{ fontWeight: "700", fontSize: 16, lineHeight: 19, color: "#564C71" }}>
												{fecha}
											</Text>
										</View>
										<Image
											source={require('../../assets/new_releases.png')}
											style={{ width: 24, height: 24 }}
										/>
									</View>
									<TouchableOpacity
										onPress={handleUpdateLocation}
										disabled={isButtonDisabled}
										style={{
											width: 280,
											height: 40,
											borderRadius: 30,
											backgroundColor: isButtonDisabled ? '#A0A0A0' : '#FF3D00',
											justifyContent: "space-around",
											alignItems: "center",
											display: "flex",
											flexDirection: "row"
										}}
									>
										<View style={{ display: "flex", flexDirection: "row" }}>
											<Text style={{ fontWeight: "400", fontSize: 16, lineHeight: 19, marginRight: 5, color: "#FFF" }}>
												{isButtonDisabled
													? `Espera ${Math.floor(timeLeft / 60)}:${(timeLeft % 60).toString().padStart(2, '0')}`
													: "Actualizar mapa"
												}
											</Text>
										</View>
									</TouchableOpacity>
								</View>
							</View>
							:
							<View style={{ width: '100%', height: '100%', alignItems: "center" }}>
								<View style={{ height: 80, width: '90%' }}>
									<Text style={{ color: "#564C71", textAlign: 'center' }}>
										Su viaje aún no ha comenzado! Pronto vas a tener novedades!
									</Text>
								</View>
							</View>
					}
				</ScrollView>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#D2DCEB",
		flex: 1,
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-start"
	},
	zoomButton: {
		zIndex: 1,
		backgroundColor: "#FFFFFF",
		borderRadius: 10,
		width: 32,
		height: 32,
		justifyContent: "center",
		alignItems: "center"
	},
	zoomButtonText: {
		color: "#564C71",
		fontWeight: "800",
		fontSize: 12,
	},
	zoomButtonContainer: {
		position: "absolute",
		flexDirection: "row",
		justifyContent: "space-between",
		bottom: 130,
		right: 30,
		width: 69,
	}
})