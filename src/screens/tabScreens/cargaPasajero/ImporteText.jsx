import CheckBox from "@react-native-community/checkbox";
import { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";


const ImporteText = ({ FDPSeleccionado, dataPasajero, importe, setImporte }) => {

  const [moneda, setMoneda] = useState(null)
  const [mensajeIpc, setMensajeIpc] = useState('')

  useEffect(() => {
    switch (FDPSeleccionado.titulo) {
      case 'Sin interés':
        setMensajeIpc('')
        setImporte(dataPasajero.monto)
        setMoneda('Pesos')
        break;
      case 'Dólares':
        setMensajeIpc('')
        setImporte(dataPasajero.valor_dolares)
        setMoneda('Dólares')
        break;
      case 'Actualizado por IPC':
        setImporte(dataPasajero.saldo_cuo_fija)
        setMensajeIpc(`Acepto que mis cuotas serán ajustadas por el índice de precios al consumidor acumulado, a partir de la cuota 4. Las 3(tres) primeras cuotas tendran un valor de $${(dataPasajero.valor_cuo_fija.toLocaleString('es-ES'))}`)
        break;
      case 'Contado':
        setMensajeIpc('')
        setImporte(dataPasajero.valor_contado)
        setMoneda('Pesos')
        break;
      default:
        break;
    }
  }, [FDPSeleccionado])

  console.log(dataPasajero);

  const renderItem = (value) => {
    return (
      <>
        {
          value ?
            <Text
              style={{
                paddingLeft: 10,
                alignItems: "center",
                fontWeight: "600",
                fontSize: 14,
                lineHeight: 16,
                borderRadius: 8,
                color: "#564C71",
                marginLeft: 2
              }}
            >{value} {moneda}</Text>
            :
            <Text
              style={{
                paddingLeft: 10,
                alignItems: "center",
                fontWeight: "600",
                fontSize: 14,
                lineHeight: 16,
                borderRadius: 8,
                color: "#CDD1DF",
                marginLeft: 2
              }}
            >Importe Total</Text>
        }
      </>
    )
  }

  return (
    <>
      {
        mensajeIpc === '' ?
          <View style={{
            width: "100%",
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: '#CDD1DF',
            borderRadius: 10,
            height: 50,
            marginBottom: 20,
          }}>
            <Image source={require("../../../assets/monto.png")} style={{ width: 20, height: 19, marginLeft: 5 }} />
            {
              renderItem(importe)
            }

          </View>
          :
          <View style={{ height: "9%", display: "flex", flexDirection: "row", width: '87%' }}>
            <View>
              <CheckBox
                disabled={false}
                /* value={toggleCheckBox}
                onValueChange={(newValue) => setToggleCheckBox(newValue)} */
                tintColors={true ? "black" : "black"}
              />
            </View>
            <View style={{ width: '90%', marginLeft: "3%" }}>
              <Text style={{ fontSize: 12, color: "#949AAF", fontWeight: '600' }}>
                {mensajeIpc}
              </Text>
            </View>
          </View>
      }
    </>
  )
}

export default ImporteText;