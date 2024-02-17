import { Image, Modal, Text, TouchableOpacity, View } from "react-native";
import { ButtonCustom } from "../../../components/ButtomCustom";
import deleteImgSpaces from "./EditarArchivos";
import { useEffect, useState } from "react";


const transparent = "rgba(0,0,0,0.5)"

export function EditarAdjunto({ visible, onClose, data, children, id, setCantidadImg }) {

  const [urlData, setUrlData] = useState("")

  // Verificar si data es un array
  useEffect(() => {
    // Verificar si data es un array
    const isDataArray = Array.isArray(data);
    if (isDataArray === true) {
      setUrlData(data)
    } else {
      setUrlData([data])
    }
  }, [])

  useEffect(()=>{
    if(urlData.length === 0){
      onClose()
      setCantidadImg(false)
    }
  },[urlData])

  // console.log(data, children, isDataArray,id);

  const deleteArchivo = async (index) => {
    // Realiza alguna acción con el índice obtenido
    if (urlData.length !== 1) {
      console.log("Se presionó en el índice:", data[index]);
      const respuesta = await deleteImgSpaces(data[index])
      if (respuesta === 200) {
        const deletedItem = data.splice(index, 1);
        setUrlData([...data]);
      }
    }else{
      console.log("Se presionó en el índice:", data);
    const respuesta = await deleteImgSpaces(data)
    if (respuesta === 200) {
      setUrlData("");
    }
    }
  }


  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: transparent }}>
        <View style={{ borderRadius: 10, width: 373, height: 449, backgroundColor: "white", justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ height: 50 }}>
            <Text style={{ color: "#334EA2", fontWeight: "500", fontSize: 16, lineHeight: 19, textAlign: "center" }}>
              {children}
            </Text>
          </View>
          <View style={{ width: 300, height: 250 }}>
            <Text>
              Documento actual:
            </Text>
            {
              urlData.length !== 0 &&
              urlData.map((dato, index) => (
                <View key={index} style={{ width: 300, height: 90, alignItems: "center", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                  <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <Image
                      source={require("../../../assets/doc.png")}
                      style={{ width: 24, height: 24, marginRight: 10 }}
                    />
                    <Text style={{ color: "#564C71", fontWeight: "400", fontSize: 14, lineHeight: 30 }}>
                      {children}
                    </Text>
                  </View>
                  <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity>
                      <Image
                        source={require("../../../assets/frame.png")}
                        style={{ width: 24, height: 24, marginRight: 10 }}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => deleteArchivo(index)}>
                      <Image
                        source={require("../../../assets/fram1.png")}
                        style={{ width: 24, height: 24, marginRight: 10 }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            }
            <View style={{ width: 66 }}>
              <TouchableOpacity>
                <Image
                  source={require("../../../assets/adjuntar.png")}
                  style={{ width: 65, height: 71 }}
                />
              </TouchableOpacity>
              <Text style={{ fontWeight: "400", fontSize: 8, lineHeight: 9, textAlign: "center", color: "#564C71", marginTop: 5 }}>
                Subír nuevo
              </Text>
            </View>
          </View>
          <View style={{ height: 47, width: 331 }}>
            <ButtonCustom
              //disabled={toggleCheckBox === true ? false : true}
              text="Actualizar documento"
              color="#CDD1DF"
            //onPress={handleSubmit(handleSubmitcarga)}
            />
          </View>
          <TouchableOpacity onPress={onClose} style={{ width: 331, height: 47, borderRadius: 10, borderWidth: 1, borderColor: "#334EA2", justifyContent: "center", alignItems: "center", marginTop: 10 }}>
            <Text style={{ fontWeight: "600", fontSize: 12, lineHeight: 14, color: "#334EA2" }}>
              Cancelar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}