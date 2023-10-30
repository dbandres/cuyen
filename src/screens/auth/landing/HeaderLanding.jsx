import { View, Text, Dimensions, Image, StyleSheet } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import LinearGradient from "react-native-linear-gradient"

const Width = Dimensions.get("screen").width
const Height = Dimensions.get("window").height

export const HeaderLanding = ({ openDrawer, scrollToContacto }) => {

  return (
    <View style={{ height: "16%" }}>
      <LinearGradient
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#FF3D00', '#FFB800']}
        style={styles.gradient}
      />
      <View style={{ alignItems: "center", position: "absolute", top: "9%", height: "15%", right: 0, left: 0 }}>
        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "93%", height: "40%", alignItems: "center" }}>
          <View>
            <Text style={{ color: "white", fontWeight: "600", fontSize: 16, lineHeight: 19 }}>¡Bienvenido!</Text>
          </View>
          <TouchableOpacity onPress={openDrawer}>
            <Image
              source={require("../../../assets/menuHmb.png")}
              style={{ width: 32, height: 32 }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.containerCuyen}>
        <Image
          source={require("../../../assets/logoCuyen.png")}
          style={{ height: Height * 0.125, width: Width * 0.45 }}
        />
      </View>
      <View style={styles.containerBottons}>
        <TouchableOpacity>
          <Image
            source={require("../../../assets/insta.png")}
            style={{ height: 55, width: 50, marginRight: "2%" }}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require("../../../assets/Facebo.png")}
            style={{ height: 55, width: 50, marginRight: "2%" }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={scrollToContacto}>
          <Image
            source={require("../../../assets/Email.png")}
            style={{ height: 55, width: 50 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  containerCuyen: {
    backgroundColor: "white",
    width: Width * 0.93,
    height: Height * 0.25,
    position: "absolute",
    borderRadius: 10,
    top: "22%",
    left: Width * 0.03,
    justifyContent: 'center',
    alignItems: "center"
  },
  containerBottons: {
    backgroundColor: "transparent",
    width: "100%",
    height: Height * 0.07,
    top: Height * 0.040,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: "5%"
  },
  gradient: {
    height: "65%",
    width: "100%"
  }
})