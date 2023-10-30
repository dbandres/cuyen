import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { CustomInput } from "./registerScreen/CustomInput";
import { useForm } from "react-hook-form";
import { ButtonCustom } from "../../components/ButtomCustom";
import axios from "axios";
import { useState } from "react";
import AwesomeAlert from "react-native-awesome-alerts";

export function ForgotPassword3({ navigation, route }) {

  const { control, handleSubmit, setValue, watch } = useForm()
  const pwd = watch("userpass")
  const { height } = Dimensions.get("screen")
  const [showAlert, setShowAlert] = useState(false)
  const [showAlert2, setShowAlert2] = useState(false)
  // const { datos } = route.params;

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

  const getAlert2 = () => {
    return (
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title="¡CONTRASEÑA ACTUALIZADA!"
        message="Su contraseña ha sido actualizada correctamente. 🎉🎉"
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText="Ok"
        confirmButtonColor="#008000"
        titleStyle={{ color: "green" }}
        onConfirmPressed={() => {
          setShowAlert(false)
          navigation.navigate("login")
        }}
      />
    )
  }


  async function restablecerContraseña(data) {
    setShowAlert2(true)
    await axios.put("http://192.168.1.3:4002/usuarios",
      {
        idUsuario: datos.idUser,
        password: data.userpass
      },
      {
        headers: {
          'x-access-token': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.t0c3Oss0aMtu_AZCsXNzrms8E7oV6GXQ5ciwNRoidcE`,
          "Content-Type": "application/json",
        }
      }
    ).then((res) => {
      if (res.status === 200) {
        setShowAlert2(false)
        setShowAlert(true)
      }
    })
  }

  return (
    <View style={styles.container}>
      <ScrollView style={{ width: "70%", height: "50%" }}>
        <View style={{ height: height * 30 / 100, display: "flex", justifyContent: "center", marginTop: "15%"}}>
          <Text style={{ color: "orange", fontWeight: "bold", marginTop: "3%" }}>
            Contraseña
          </Text>
          <CustomInput
            control={control}
            name="userpass"
            secureTextEntry
            numeric="numeric"
            rules={{
              required: true,
              minLength: {
                value: 8,
                message: "La Contraseña debe tener un minimo de 8 caracteres"
              }
            }}
          />
          <Text style={{ color: "orange", fontWeight: "bold", marginTop: "3%" }}>
            Repetir Contraseña
          </Text>
          <CustomInput
            control={control}
            name="userrepeatpass"
            secureTextEntry
            numeric="numeric"
            rules={{
              required: true,
              validate: value => value === pwd || "Las Contraseñas no coinciden"
            }}
          />
          <View style={{ height: "20%", width: "70%", marginTop: "10%", marginLeft: "15%"}}>
            <ButtonCustom
              text="Restablecer Contraseña"
              color="orange"
              onPress={handleSubmit(restablecerContraseña)}
            />
          </View>
        </View>
        {getAlert()}
        {getAlert2()}
      </ScrollView>
    </View>
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