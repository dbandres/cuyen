import { Text, View, Modal, TouchableOpacity } from "react-native";
import { useContext, useEffect, useState } from "react";
import { ButtonCustom } from "../../../components/ButtomCustom";
import { UserContext } from "../../../context/UserContext";
import axios from "axios";
import { token } from "../../../api";
import AwesomeAlert from "react-native-awesome-alerts";

export function ModalComponent({ visible, onClose, data, inputChanged, setNewFetch, agregarPasajero }) {

  const [totalCuotas, setTotalCuotas] = useState("")
  const { userdata } = useContext(UserContext)
  const [fecha, setFecha] = useState("")
  const [showAlert2, setShowAlert2] = useState(false)
  const [importe, setImporte] = useState("")

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

  useEffect(() => {
    if (data) {
      setImporte(parseInt(data?.data?.importedelviaje))
      let total = parseInt(data?.data?.importedelviaje) / data?.cuotaSeleccionada
      setTotalCuotas(total.toFixed(2));
      if (data.importe) {
        let total = parseInt(data.importe) / data?.cuotas
        setTotalCuotas(total.toFixed(2));
      }
    }
    if (data.newDate) {
      const meses = {
        ene: 1, feb: 2, mar: 3, abr: 4, may: 5, jun: 6,
        jul: 7, ago: 8, sep: 9, oct: 10, nov: 11, dic: 12
      };

      const [dia, mes, año] = data.newDate.split('/');
      const numeroMes = meses[mes.toLowerCase()];
      const fechaFormateada = `${año}-${numeroMes}-${dia}`;

      setFecha(fechaFormateada);
    }
  }, [data])

  const postPasajero = async () => {
    setShowAlert2(true)
    if (inputChanged === true) {
      await axios.put(`/pasajero/${data.id}`,
        {
          nombre: data.formValues.nombre,
          apellido: data.formValues.apellido,
          dni: data.formValues.dni,
          email: "",
          contrato: userdata.contrato,
          rol: "Pasajero",
          estado: true,
          login: "",
          fechaNac: data.formValues.fechaNac,
          importe: data.importe,
          cuotas: data.cuotas,
          loginId: userdata.id
        },
        {
          headers: {
            'x-access-token': `${token}`,
            'Content-Type': 'application/json',
          }
        })
        .then((res) => {
          setShowAlert2(false)
          setNewFetch(true)
          if (showAlert2 === false) {
            onClose()
          }
          console.log(res);
        }).catch((error) => {
          console.log(error);
          setShowAlert2(false)
        })
    } else {
      await axios.post("/pasajero",
        {
          nombre: data.data.username,
          apellido: data.data.userlastname,
          dni: data.data.userdni,
          email: "",
          contrato: userdata.contrato,
          rol: "Pasajero",
          estado: true,
          login: "",
          fechaNac: fecha,
          importe: importe,
          cuotas: data.cuotaSeleccionada,
          loginId: userdata.id
        },
        {
          headers: {
            'x-access-token': `${token}`,
            'Content-Type': 'application/json',
          }
        })
        .then((res) => {
          setShowAlert2(false)
          setNewFetch(true)
          if (showAlert2 === false) {
            onClose()
            agregarPasajero()
          }
          console.log(res);
        }).catch((error) => {
          console.log(error);
          setShowAlert2(false)
        })
    }
  }

  const transparent = "rgba(0,0,0,0.5)"

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:transparent }}>
        {/* Contenido del modal con fondo blanco */}
        <View style={{ borderRadius: 10, width: 373, height: 449, backgroundColor: "white", justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ width: 275, height: 57, alignItems: "center", justifyContent: "center" }}>
            {
              data?.data ?
                <Text style={{ color: "#564C71", fontWeight: "500", fontSize: 16, lineHeight: 19, textAlign: "center" }}>
                  Se va a dar de alta el pasajero y se crearán las cuotas del viaje.
                  ¿Desea confirmar?
                </Text>
                :
                <Text style={{ color: "#564C71", fontWeight: "500", fontSize: 16, lineHeight: 19, textAlign: "center" }}>
                  Se cambiarán los datos del pasajero.
                  ¿Desea confirmar?
                </Text>
            }
          </View>
          <View style={{ width: 306, height: 190, justifyContent: "center", alignItems: "center" }}>
            {
              data.data ?
                <>
                  <Text style={{ fontWeight: "700", fontSize: 12, color: "#949AAF", lineHeight: 30 }}>
                    {data?.data?.username}, {data?.data?.userlastname}
                  </Text>
                  <Text style={{ fontWeight: "700", fontSize: 12, color: "#949AAF", lineHeight: 30 }}>
                    DNI {data?.data?.userdni}
                  </Text>
                  <Text style={{ fontWeight: "700", fontSize: 12, color: "#949AAF", lineHeight: 30 }}>
                    Fecha de Nacimiento {data?.newDate}
                  </Text>
                  <Text style={{ fontWeight: "700", fontSize: 12, color: "#949AAF", lineHeight: 30 }}>
                    Importe ${data?.data?.importedelviaje}
                  </Text>
                  <Text style={{ fontWeight: "700", fontSize: 12, color: "#949AAF", lineHeight: 30 }}>
                    Cuotas {data?.cuotaSeleccionada} de {totalCuotas}
                  </Text>
                </>
                :
                <>
                  <Text style={{ fontWeight: "700", fontSize: 12, color: "#949AAF", lineHeight: 30 }}>
                    {data?.formValues?.nombre}, {data?.formValues?.apellido}
                  </Text>
                  <Text style={{ fontWeight: "700", fontSize: 12, color: "#949AAF", lineHeight: 30 }}>
                    DNI {data?.formValues?.dni}
                  </Text>
                  <Text style={{ fontWeight: "700", fontSize: 12, color: "#949AAF", lineHeight: 30 }}>
                    Fecha de Nacimiento {data?.formValues?.fechaNac}
                  </Text>
                  <Text style={{ fontWeight: "700", fontSize: 12, color: "#949AAF", lineHeight: 30 }}>
                    Importe ${data?.importe}
                  </Text>
                  <Text style={{ fontWeight: "700", fontSize: 12, color: "#949AAF", lineHeight: 30 }}>
                    Cuotas {data?.cuotas} de {totalCuotas}
                  </Text>
                </>
            }
          </View>
          <View style={{ height: 47, width: 331, borderRadius: 10, marginBottom: 5 }}>
            <ButtonCustom
              text="Aceptar"
              color="#FF3D00"
              register={false}
              onPress={postPasajero}
            />
          </View>
          <View style={{ borderColor: "#334EA2", height: 50, width: 331, borderRadius: 10, borderWidth: 1 }}>
            <ButtonCustom
              text="Cancelar"
              color="#FFFF"
              register={true}
              onPress={onClose}
            />
          </View>

        </View>
      </View>
      {showAlert2 ? getAlert() : null}
      {/* </BlurView> */}
    </Modal>
  )
}