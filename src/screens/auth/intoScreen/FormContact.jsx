import { useForm } from "react-hook-form"
import { CustomInput } from "../registerScreen/CustomInput"
import { Text, TouchableOpacity, View } from "react-native"
import React from "react"

export const FormContact = React.forwardRef((props, ref) => {

  const { control, handleSubmit, setValue, watch } = useForm()

  return (
    <View ref={ref} style={{ height: 550, backgroundColor: "#FF3D00", alignItems: "center" }}>
      <View style={{ width: "90%", height: "15%", display: "flex", flexDirection: "row", alignItems: "center" }}>
        <Text style={{ color: "#FFFFFF", fontSize: 14, fontWeight: "bold" }}>Formulario </Text>
        <Text style={{ color: "#FFFFFF", fontSize: 14, fontWeight: "400" }}>de contacto</Text>
      </View>
      <View style={{ width: "80%", height: "50%" }}>
        <CustomInput
          control={control}
          formIntro={true}
          name="namecomplete"
          placeholder="Nombre y apellido"
          rules={{
            required: true,
            minLength: {
              value: 2,
              message: "El nombre debe tener un minimo de 2 caracteres"
            },
            maxLength: {
              value: 15,
              message: "El nombre debe tener como maximo de 15 caracteres"
            }
          }}
        />
        <CustomInput
          control={control}
          formIntro={true}
          name="phone"
          placeholder="Teléfono de contacto"
          rules={{
            required: true,
            minLength: {
              value: 2,
              message: "El nombre debe tener un minimo de 2 caracteres"
            },
            maxLength: {
              value: 15,
              message: "El nombre debe tener como maximo de 15 caracteres"
            }
          }}
        />
        <CustomInput
          control={control}
          formIntro={true}
          name="useremail"
          placeholder="E-mail"
          rules={{
            required: true,
            pattern: { value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, message: "La Direccion de Email es Incorrecta" }
          }}
        />
        <View style={{ width: "50%", alignItems: "center", height: "15%", justifyContent: "center" }}>
          <Text style={{ color: "white" }}>
            Dejanos tu mensaje
          </Text>
        </View>
        <CustomInput
        formIntro={true}
          control={control}
          name="mensaje"
          multiline={true}
          numberOfLines={20}
        />
        <TouchableOpacity style={{ backgroundColor: "#3462BF", height: "17%", alignItems: "center", justifyContent: "center", borderRadius: 10 }}>
          <Text style={{ color: "white", fontWeight: "600", fontSize: 20 }}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
})