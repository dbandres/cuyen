import { Text, View, StyleSheet, Dimensions, Image, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";

const Width = Dimensions.get("screen").width
const Height = Dimensions.get("window").height

export function HeaderSection({scrollToContacto}) {
  return (
    <View>
      <View style={{ height: Height * 0.25 }}>
        <LinearGradient
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#FF3D00', '#FFB800']}
          style={styles.gradient}
        />
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
            source={require("../../../assets/Phone.png")}
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
    top: "3%",
    left: Width * 0.035,
    justifyContent: 'center',
    alignItems: "center"
  },
  containerBottons: {
    backgroundColor: "transparent",
    width: "100%",
    height: Height * 0.12,
    top: Height * 0.010,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: "5%"
  },
  gradient: {
    flex: 1,
    width: "100%"
  }
})