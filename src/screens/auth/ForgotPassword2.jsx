import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import { CustomInput } from "./registerScreen/CustomInput";
import { useForm } from "react-hook-form";
import { ButtonCustom } from "../../components/ButtomCustom";
import { useState } from "react";
import AwesomeAlert from 'react-native-awesome-alerts';

export default function ForgotPassword2({ navigation, route }) {

  const { control, handleSubmit, setValue, watch } = useForm()
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


  function compararNumAleatorio(data) {

    const codigo = data.codigo1.concat(data.codigo2, data.codigo3, data.codigo4)

    if (codigo == datos.numAleatorio) {
      console.log("si, es igual")
      setShowAlert2(true)
      setTimeout(() => {
        navigation.navigate("forgotPassthree", {
          datos: {
            jwt: datos.jwt,
            idUser: datos.idUser,
            numAleatorio: datos.numAleatorio
          }
        })
      }, 3000)
    } else {
      console.log("numero incorrecto")
      setShowAlert(true)
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView style={{ width: "70%", height: "50%" }}>
        <View style={{ height: height * 70 / 100, }}>
          <View style={{ height: "20%", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontSize: 14 }}>
              Revisá tu correo electronico con el cual te registraste a Cuyen, e ingresa el codigo correspondiente.
            </Text>
          </View>
          <View style={{ height: "35%", display: "flex", justifyContent: "center", flexDirection: "row", }}>
            <View style={{ width: "25%", height: "100%", justifyContent: "center", display: "flex" }}>
              <CustomInput
                control={control}
                name="codigo1"
                maxLength={1}
                numeric="numeric"
                rules={{
                  required: true,
                  pattern: { value: /^[0-9]+$/, message: "El CODIGO es incorrecto" },
                  minLength: {
                    value: 1,
                  },
                  maxLength: {
                    value: 1,
                  }
                }}
              />
            </View>
            <View style={{ width: "25%", height: "100%", justifyContent: "center", display: "flex", paddingLeft: "2%" }}>
              <CustomInput
                control={control}
                name="codigo2"
                maxLength={1}
                numeric="numeric"
                rules={{
                  required: true,
                  pattern: { value: /^[0-9]+$/, message: "El CODIGO es incorrecto" },
                  minLength: {
                    value: 1,
                  },
                  maxLength: {
                    value: 1,
                  }
                }}
              />
            </View>
            <View style={{ width: "25%", height: "100%", justifyContent: "center", display: "flex", paddingLeft: "2%" }}>
              <CustomInput
                control={control}
                name="codigo3"
                maxLength={1}
                numeric="numeric"
                rules={{
                  required: true,
                  pattern: { value: /^[0-9]+$/, message: "El CODIGO es incorrecto" },
                  minLength: {
                    value: 1,
                  },
                  maxLength: {
                    value: 1,
                  }
                }}
              />
            </View>
            <View style={{ width: "25%", height: "100%", justifyContent: "center", display: "flex", paddingLeft: "2%" }}>
              <CustomInput
                control={control}
                name="codigo4"
                maxLength={1}
                numeric="numeric"
                rules={{
                  required: true,
                  pattern: { value: /^[0-9]+$/, message: "El CODIGO es incorrecto" },
                  minLength: {
                    value: 1,
                  },
                  maxLength: {
                    value: 1,
                  }
                }}
              />
            </View>
          </View>
          <View style={{ height: "9%", }}>
            <ButtonCustom
              text="Enviar Codigo"
              color="orange"
              onPress={()=>{navigation.navigate("forgotPassthree")}}
            />
          </View>
        </View>
      </ScrollView>
      {getAlert()}
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title="¡CODIGO INCORRECTO!"
        message="Verifique y vuelva a ingresar el codigo nuevamente"
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText="Ok"
        confirmButtonColor="#008000"
        titleStyle={{ color: "red" }}
        onConfirmPressed={() => {
          setShowAlert(false)
        }}
      />
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