import { View, TouchableOpacity, Image, Text } from "react-native"


export const ButtomTabs = ({navigation}) => {

  const gotToLogin = () => {
    navigation.navigate("login")
  }

  return (
    <View style={{ backgroundColor: "#162962", height: 74, alignItems: "center", justifyContent: "space-around", flexDirection: "row", width:"100%" }}>
      <View style={{ justifyContent: "center", alignItems: "center", height: "60%" }}>
        <TouchableOpacity style={{ bottom: 8 }}>
          <Image
            source={require("../../../assets/globe_asia.png")}
            style={{ width: 21, height: 20 }}
          />
        </TouchableOpacity>
        <Text style={{ color: "white", fontSize: 10 }}>
          Nuestras Redes
        </Text>
      </View>
      <View style={{ width: "20%", bottom: "2%", backgroundColor: "#162962", alignItems: "center", justifyContent: "center", borderRadius: 50, height: "110%", marginBottom:"3%" }}>
        <TouchableOpacity style={{ marginBottom:"20%" }} onPress={gotToLogin}>
          <Image
            source={require("../../../assets/account_circle.png")}
            style={{ width: 32, height: 32 }}
          />
        </TouchableOpacity>
        <Text style={{ color: "white", fontSize: 10 }}>Iniciar sesión</Text>
      </View>
      <View style={{ justifyContent: "center", alignItems: "center", height: "60%" }}>
        <TouchableOpacity style={{ bottom: 8 }}>
          <Image
            source={require("../../../assets/stacked_email.png")}
            style={{ width: 25, height: 20 }}
          />
        </TouchableOpacity>
        <Text style={{ color: "white", fontSize: 10 }}>
          Contactanos
        </Text>
      </View>
    </View>
  )
}