import { Image, Modal, Text, TouchableOpacity, View } from "react-native";
import { ButtonCustom } from "../../../components/ButtomCustom";


const transparent = "rgba(0,0,0,0.5)"

export function EditarAdjunto({ visible, onClose, data, children }) {

  // Verificar si data es un array
  const isDataArray = Array.isArray(data);

  // console.log(data, children, isDataArray);

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
              isDataArray === true ?
                data.map((dato, index) => (
                  <View key={index} style={{ width: 300, height: 50, alignItems: "center", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
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
                      <TouchableOpacity>
                        <Image
                          source={require("../../../assets/fram1.png")}
                          style={{ width: 24, height: 24, marginRight: 10 }}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))
                :
                <View style={{ width: 300, height: 90, alignItems: "center", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
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
                    <TouchableOpacity>
                      <Image
                        source={require("../../../assets/fram1.png")}
                        style={{ width: 24, height: 24, marginRight: 10 }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
            }
            <View style={{ width: 66 }}>
              <Image
                source={require("../../../assets/adjuntar.png")}
                style={{ width: 65, height: 71 }}
              />
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