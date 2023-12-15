import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { CustomInput } from "../registerScreen/CustomInput";
import { useForm } from "react-hook-form";
import { ButtonCustom } from "../../../components/ButtomCustom";
import axios from "axios";
import { useState } from "react";
import AwesomeAlert from "react-native-awesome-alerts";
import { ContainerWithBackground } from "../../ContainerWithBackground";
import { API_URL, token } from "../../../api";


export function ForgotPassword3({ navigation, route }) {

  const { control, handleSubmit, setValue, watch } = useForm()
  const pwd = watch("newPassUser")
  const { height } = Dimensions.get("screen")
  const [showAlert2, setShowAlert2] = useState(false)
  const { datos } = route.params;
  
  const getAlert = () => {
    return (
      <AwesomeAlert
        show={showAlert2}
        showProgress={true}
        progressColor="black"
        progressSize={50}
      />
    )
  }


  async function restablecerContraseña(data) {
    setShowAlert2(true)
    console.log(data)
    await axios.put(`${API_URL}/usuarios`,
      {
        idUsuario: datos.idUser,
        password: data.newPassUser
      },
      {
        headers: {
          'x-access-token': `${token}`,
          "Content-Type": "application/json",
        }
      }
    ).then((res) => {
      if (res.status === 200) {
        console.log(res)
        navigation.navigate("finishForgotPass")
      }
    })
  }

  return (
    <ContainerWithBackground>
      <View style={{ height: 450, width: "100%", alignItems: "center", top: 100 }}>
        <Text style={{ color: "#334EA2", fontSize: 16, fontWeight: "500", lineHeight: 19, marginBottom: 10 }}>
          Nueva contraseña
        </Text>
        <Text style={{ fontSize: 12, fontWeight: "600", lineHeight: 14, color: "#949AAF", }}>
          Ingrese su nueva contraseña y restablezca su cuenta.
        </Text>
        <View style={{ height: "70%", width: "90%", justifyContent: "center", }}>
          <CustomInput
            control={control}
            placeholder="Crea tu contraseña"
            name="newPassUser"
            numeric="numeric"
            secureTextEntry={true}
          />
          <CustomInput
            control={control}
            placeholder="Repite tu contraseña"
            name="repeatPassUser"
            numeric="numeric"
            secureTextEntry={true}
            rules={{
              required: true,
              validate: value => value === pwd || "Las Contraseñas no coinciden"
            }}
          />
          <View style={{ top: 20 }}>
            <View style={{ height: 47, width: "100%" }}>
              <ButtonCustom
                text="Restablecer"
                color={"#FF3D00"}
                onPress={handleSubmit(restablecerContraseña)}
              />
            </View>
            <View style={{ height: 47, marginTop: "2%", width: "100%", borderColor: "#3462BF", borderWidth: 1, borderRadius: 10 }}>
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
      {getAlert()}
    </ContainerWithBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start"
  },
})