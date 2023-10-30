import { View, Text } from "react-native";
import { UserContext } from "../../context/UserContext";
import {useContext} from "react";


export default function Home() {

	const { userdata} = useContext(UserContext);
	console.log("user data: ",userdata)

	return (
		<View >
			<Text>
				Inicio
			</Text>
		</View>
	)
}