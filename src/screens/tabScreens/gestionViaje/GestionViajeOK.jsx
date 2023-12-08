import { Image, StyleSheet, View } from "react-native";
import { useEffect } from "react";

export function GestionViajeOK({navigation, route}) {

  const { totalSwitchesEnabled } = route.params

  useEffect(()=>{
    setTimeout(()=>{
      navigation.navigate("gestionViajeFinalizar", { totalSwitchesEnabled })
    },2000)
  },[])


  return (
    <View style={styles.container}>
      <View>
        <Image
          source={require("../../../assets/fin.png")}
          style={{ width: 198, height: 186 }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#D2DCEB",
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
})