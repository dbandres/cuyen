import { Dimensions, Image, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native"
import { ContainerWithBackground } from "../../ContainerWithBackground"
import { useContext, useEffect, useState } from "react";
import CheckBox from "@react-native-community/checkbox";
import { ButtonCustom } from "../../../components/ButtomCustom";

export const ForgotPassword1 = ({ navigation, route }) => {

  const { height } = Dimensions.get("screen")
  const [toggleCheckBox, setToggleCheckBox] = useState(false)
  const { jwt, idUser, numAleatorio, email } = route.params.datos;

  console.log(email)

  const goPass2 = () => {
    navigation.navigate("forgotPasstwo", {
      datos: {
        jwt: jwt,
        idUser: idUser,
        numAleatorio: numAleatorio,
        email: email
      }
    })
  }

  return (
    <ContainerWithBackground>
      <View style={{ width: "100%", alignItems: "center" }}>
        <View style={{ height: "90%", width: "90%", justifyContent: "center", top: 80, alignItems: "center" }}>
          <Text style={{ color: "#334EA2", fontSize: 16, fontWeight: "500", lineHeight: 19, marginBottom: "10%" }}>
            Recupero de contraseña
          </Text>
          <View style={{ width: 296, alignItems: "center" }}>
            <Text style={{ fontSize: 12, fontWeight: "600", lineHeight: 14, color: "#949AAF", marginBottom: "10%", textAlign: "center" }}>
              Se enviará información para reestablecer su contraseña a las opciones de contacto que usted registró.
            </Text>
          </View>
          <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <CheckBox
              disabled={false}
              value={toggleCheckBox}
              onValueChange={(newValue) => setToggleCheckBox(newValue)}
            />
            {
              email ?
                <Text>
                  {email}
                </Text>
                :
                <Text>
                  E-mail
                </Text>
            }
          </View>
          <View style={{ top: 70, width: "100%" }}>
            <View style={{ height: "22%", width: "100%" }}>
              <ButtonCustom
                text="Continuar"
                color={toggleCheckBox !== false ? "#FF3D00" : "#CDD1DF"}
                disabled={toggleCheckBox !== false ? false : true}
                onPress={goPass2}
              />
            </View>
            <View style={{ height: "21%", marginTop: "2%", width: "100%", borderColor: "#3462BF", borderWidth: 1, borderRadius: 10 }}>
              <ButtonCustom
                text="Cancelar"
                color="#FFFFFF"
                register={true}
                onPress={() => { navigation.navigate("login") }}
              />
            </View>
          </View>
        </View>
      </View>
    </ContainerWithBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  androidShadow: {
    elevation: 5, // Ajusta este valor según tu preferencia
    height: '28%',
    width: '85%',
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    top: -100,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  iosShadow: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25, // Ajusta este valor según tu preferencia
    shadowRadius: 4, // Ajusta este valor según tu preferencia
    height: '32%',
    width: '85%',
    backgroundColor: 'red',
    position: 'absolute',
    top: -100,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  },
})