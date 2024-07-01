import { Text, View, Modal, TouchableOpacity } from "react-native";
import { useContext, useEffect, useState } from "react";
import { ButtonCustom } from "../../../components/ButtomCustom";
import { UserContext } from "../../../context/UserContext";
import axios from "axios";
import { token } from "../../../api";
import AwesomeAlert from "react-native-awesome-alerts";
import { useSelector } from "react-redux";

export function ModalComponent({ visible, onClose, data, inputChanged, setNewFetch, agregarPasajero }) {

  const [totalCuotas, setTotalCuotas] = useState("")
  const { userdata } = useContext(UserContext)
  const [fecha, setFecha] = useState("")
  const [showAlert2, setShowAlert2] = useState(false)
  const [importe, setImporte] = useState("")
  const contratoActual = useSelector((state) => state.currentContrato)

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

  console.log(JSON.stringify(data, null, 3));


  useEffect(() => {
    if (data && data.FDP !== 'Dolares') {
      setImporte(parseInt(data?.importe))
      let total = parseInt(data?.importe) / data?.cuota
      setTotalCuotas(total.toFixed(2));
      if (data.importe) {
        let total = Math.round(parseInt(data.importe) / data?.cuota)
        setTotalCuotas((total.toLocaleString('es-ES')));
      }
    }
    else if (data && data.FDP === 'Dolares') {
      setImporte(parseInt(data?.importe))
      let total = parseInt(data?.importe) / data?.cuota
      setTotalCuotas(total.toFixed(2));
      if (data.importe) {
        let total = parseInt(data.importe) / data?.cuota
        setTotalCuotas(total.toFixed(2));
      }
    }
    if (data.fechaNac) {
      const fechaNac = data.fechaNac
      const meses = {
        ene: 1, feb: 2, mar: 3, abr: 4, may: 5, jun: 6,
        jul: 7, ago: 8, sep: 9, oct: 10, nov: 11, dic: 12
      };

      if (fechaNac.includes('/')) {
        const [dia, mes, año] = data.fechaNac.split('/');
        const numeroMes = meses[mes.toLowerCase()];
        const fechaFormateada = `${año}-${numeroMes}-${dia}`;
        setFecha(fechaFormateada);
      }else{
        const [dia, mes, año] = data.fechaNac.split('-');
        const fechaFormateada = `${año}-${mes}-${dia}`;
        setFecha(fechaFormateada);
      }
    }
  }, [data])

  const postPasajero = async () => {
    setShowAlert2(true)
    if (inputChanged === true) {
      console.log('es un put');
      await axios.put(`/pasajero/${data.idPasajero}`,
        {
          nombre: data.username,
          apellido: data.userlastname,
          dni: data.userdni,
          email: data.useremail,
          contrato: userdata.contrato,
          rol: "Pasajero",
          fechaNac: fecha,
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
          nombre: data.username,
          apellido: data.userlastname,
          dni: data.userdni,
          email: data.useremail,
          contrato: userdata.contrato,
          valor_cuo_fija: data.valor_cuo_fija,
          rol: "Pasajero",
          estado: true,
          login: data.login,
          fechaNac: fecha,
          forma_de_pago: data.FDP,
          importe: importe,
          cuotas: data.cuota,
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
          console.log(error.message);
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
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: transparent }}>
        {/* Contenido del modal con fondo blanco */}
        <View style={{ borderRadius: 10, width: 373, height: 449, backgroundColor: "white", justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ width: 275, height: 57, alignItems: "center", justifyContent: "center" }}>
            {
              data.FDP !== undefined ?
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
          <View style={{ width: 306, height: 220, justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontWeight: "700", fontSize: 12, color: "#949AAF", lineHeight: 30 }}>
              {data?.username}, {data?.userlastname}
            </Text>
            <Text style={{ fontWeight: "700", fontSize: 12, color: "#949AAF", lineHeight: 30 }}>
              DNI {data?.userdni}
            </Text>
            <Text style={{ fontWeight: "700", fontSize: 12, color: "#949AAF", lineHeight: 30 }}>
              Fecha de Nacimiento {data?.fechaNac}
            </Text>
            <Text style={{ fontWeight: "700", fontSize: 12, color: "#949AAF", lineHeight: 30 }}>
              Email {data?.useremail}
            </Text>
            {
              data.FDP === undefined ?
                null :
                <>
                  <Text style={{ fontWeight: "700", fontSize: 12, color: "#949AAF", lineHeight: 30 }}>
                    Importe ${importe.toLocaleString('es-ES', { style: 'decimal' })}
                    {
                      data.FDP === 'Dolares' ? ' Dólares' : ' Pesos'
                    }
                  </Text>
                  {
                    data.FDP === 'ipc' ?
                      <View style={{ height: 65, justifyContent: "center" }}>
                        <Text style={{ fontWeight: "700", fontSize: 12, color: "#949AAF", lineHeight: 13 }}>
                          Acepto que mis cuotas serán ajustadas por el índice de precios al consumidor acumulado, a partir de la cuota definida por contrato
                        </Text>
                      </View>
                      :
                      <Text style={{ fontWeight: "700", fontSize: 12, color: "#949AAF", lineHeight: 30 }}>
                        Cuotas {data?.cuota} de ${totalCuotas}
                        {
                          data.FDP === 'Dolares' ? ' Dólares' : ' Pesos'
                        }
                      </Text>
                  }
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