import { View, Text, StyleSheet, image, Image } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import { ButtonCustom } from "../../../components/ButtomCustom"



export const RegisterOk = ({navigation}) => {

  const goToHome = () => {
    navigation.navigate("landing")
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#FF3D00', '#FFB800']}
        style={styles.gradient}
      />
      <View style={{ alignItems: "center", position: "absolute", width: "95%", backgroundColor: "white", height: "95%", marginTop: "2%", borderRadius: 10, justifyContent: "center" }}>
        <View style={{ alignItems: "center"}}>
          <Image
            source={require("../../../assets/Action_Correct.png")}
            style={{ width: 128, height: 128 }}
          />
          <View style={{marginTop:"4%"}}>
            <Text style={{fontSize: 16, fontWeight:"600", lineHeight:19, color:"#000000"}}>
              ¡Usuario registrado correctamente!
            </Text>
          </View>
        </View>
        <View style={{ bottom: 30, position: "absolute", width:"90%", height:"7%"}}>
          <ButtonCustom
            text="Aceptar"
            color="#FF3D00"
            onPress={goToHome}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
  },
  text: {
    color: "black",
    fontSize: 25,
    fontWeight: "bold"
  }, gradient: {
    flex: 1,
    width: "100%"
  },
})