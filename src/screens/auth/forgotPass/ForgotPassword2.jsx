import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import { CustomInput } from "../registerScreen/CustomInput";
import { useForm } from "react-hook-form";
import { ButtonCustom } from "../../../components/ButtomCustom";
import { useEffect, useState } from "react";
import AwesomeAlert from 'react-native-awesome-alerts';
import { ContainerWithBackground } from "../../ContainerWithBackground";

export default function ForgotPassword2({ navigation, route }) {

  const { control, handleSubmit, setValue, watch, trigger } = useForm()
  const { height } = Dimensions.get("screen")
  const [showAlert, setShowAlert] = useState(false)
  const [showAlert2, setShowAlert2] = useState(false)
  const [numerosDigitos, setNumerosDigitos] = useState("")

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
  console.log(datos)

  useEffect(()=>{
    const numAlt = datos.numAleatorio.toString();
    const digitos = numAlt.split('');
    setShowAlert2(true)
    setTimeout(()=>{
      setNumerosDigitos(digitos)
    },2000)
  },[])

  console.log(numerosDigitos)
  // useEffect(()=>{
  //   if (numerosDigitos.length === 4) {
  //     setValue('codigo1', numerosDigitos[0]);
  //     setValue('codigo2', numerosDigitos[1]);
  //     setValue('codigo3', numerosDigitos[2]);
  //     setValue('codigo4', numerosDigitos[3]);
  //   }
  // },[numerosDigitos, setValue])


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
    <ContainerWithBackground>
      <View style={{ width: "100%", alignItems: "center" }}>
        <View style={{ height: "90%", width: "90%", justifyContent: "center", top: 80, alignItems: "center" }}>
          <Text style={{ color: "#334EA2", fontSize: 16, fontWeight: "500", lineHeight: 19, marginBottom: "10%" }}>
            Recupero de contraseña
          </Text>
          <View style={{ width: 296, alignItems: "center" }}>
            <Text style={{ fontSize: 12, fontWeight: "600", lineHeight: 14, color: "#949AAF", marginBottom: "10%", textAlign: "center" }}>
            Revise su correo electrónico e ingrese el código que se envió para continuar con el recupero/restablecimiento de su contraseña.
            </Text>
          </View>
          <View style={{ height: "35%", width:"80%",display: "flex", justifyContent: "center", alignItems:"center" ,flexDirection: "row"}}>
            <View style={{ width: 40}}>
              <CustomInput
                control={control}
                name="codigo1"
                maxLength={1}
                numeric="numeric"
                trigger={trigger}
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
            <View style={{ width: 43, height: 40, justifyContent: "center", display: "flex", paddingLeft: 4 }}>
              <CustomInput
                control={control}
                name="codigo2"
                maxLength={1}
                numeric="numeric"
                trigger={trigger}
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
            <View style={{ width: 43, height: 40, justifyContent: "center", display: "flex", paddingLeft: 4 }}>
              <CustomInput
                control={control}
                name="codigo3"
                maxLength={1}
                numeric="numeric"
                trigger={trigger}
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
            <View style={{ width: 43, height: 40, justifyContent: "center", display: "flex", paddingLeft:4 }}>
              <CustomInput
                control={control}
                name="codigo4"
                maxLength={1}
                numeric="numeric"
                trigger={trigger}
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
          <View style={{ top: 60, width: "100%" }}>
            <View style={{ height: "22%", width: "100%" }}>
              <ButtonCustom
                text="Enviar"
                color={"#FF3D00"}
                // disabled={toggleCheckBox !== false ? false : true}
                onPress={handleSubmit(compararNumAleatorio)}
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
      {numerosDigitos.length === 4 ? null : getAlert()}
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
        }}/>
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