import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions, Image, Platform } from "react-native";
import { Form } from "./Form";
import { useContext, useEffect, useState } from "react";
import { CardsMuro } from "./CardsMuro";
import { Header } from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { UserContext } from "../../../context/UserContext";
import { getAllPost } from "../../../redux/actions";


const Height = Dimensions.get("screen").height
const Width = Dimensions.get("screen").width

export function Muro({ navigation}) {

	const {userdata} = useContext(UserContext)
 	const allPost = useSelector((state)=>state.allPost)
	const dispatch = useDispatch()

	useEffect(()=>{
		dispatch(getAllPost(userdata.contrato))
	},[])


	return (
		<View style={styles.container}>
			<Header children="Publicaciones" navigation={navigation}/>
			<View style={styles.centeredFlatList}>
				{
					allPost.length != 0 ?
						<FlatList
							data={allPost}
							keyExtractor={(item) => item.toString()}
							renderItem={({ item}) => (
								<View key={item.id} style={styles.containerPublicacion}>
									<CardsMuro data={item} />
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
			<View style={{ backgroundColor: "#162962", height: "8%", alignItems: "center" }}>
				<View style={{ width: "17%", bottom: "34%", backgroundColor: "#162962", alignItems: "center", justifyContent: "center", borderRadius: 50, height: "120%" }}>
					<TouchableOpacity onPress={()=>{navigation.navigate("publicar")}}>
						<Image
							source={require("../../../assets/add.png")}
							style={{ width: 40, height: 40 }}
						/>
					</TouchableOpacity>
					<Text style={{ color: "white", fontSize: 10 }}>Publicar</Text>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#D2DCEB",
		flex: 1,
		display: "flex",
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
		overflow:"hidden",
		...Platform.select({
		  ios: {
		    shadowColor: 'rgba(0, 0, 0, 0.25)',
		    shadowOffset: { width: 0, height: 2 },
		    shadowOpacity: 1,
		    shadowRadius: 2,
		  },
		  android: {
		    elevation: 9,
				shadowColor: 'rgba(0, 0, 0, 0.25)',
				shadowOffset: { width: 0, height: 2 },
		    shadowOpacity: 1,
		    shadowRadius: 2,
		  },
		}),
	},
	centeredFlatList: {
		flex: 1,
		justifyContent: "center", // Center vertically
		alignItems: "center", // Center horizontall
		marginLeft: "1%"
	},
})