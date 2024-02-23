import { Image, Text, TouchableOpacity, View } from "react-native";
import { InfoPasajero } from "../../cargaPasajero/InfoPasajero";
import { MensajeAlerta } from "../../cargaPasajero/MesajeAlerta";
import { useNavigation } from "@react-navigation/native";


export function InfoXpasajero({ info }) {

  const navigation = useNavigation()

  // console.log(JSON.stringify(info, null, 3));
  const dietasEspeciales = [
    { key: "vegetariano", text: "Vegetariano" },
    { key: "vegano", text: "Vegano" },
    { key: "celiaco", text: "Celiaco" },
    { key: "intoleranteLactosa", text: "Intolerante a la lactosa" },
    { key: "ningunaDietaEspecial", text: "Ninguna dieta especial" }
  ];

  const renderImage = (info) => {
    const imageSource = info !== null && info !== false ? require("../../../../assets/adjuntarOk.png") : require("../../../../assets/adjuntar.png");
    return (
      <Image
        source={imageSource}
        style={{ width: 65, height: 71 }}
      />
    );
  };

  const CustomView = ({ labelText, info }) => {
    return (
      <View style={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "center", alignItems: "center" }}>
        <View style={{ height: 20, justifyContent: "flex-end", marginBottom: 5, width: 60 }}>
          <Text style={{ fontWeight: "400", fontSize: 9, lineHeight: 9, textAlign: "center", color: "#564C71" }}>
            {labelText}
          </Text>
        </View>
        {renderImage(info)}
      </View>
    );
  };

  const getSuma = () =>{
    let suma = 0;
    info.dieta !== null ? suma += 20 : suma
    info.ficha_med ? suma += 20 : suma
    info.dec_jurada ? suma += 20 : suma
    info.image_dni.length !== 0 ? suma += 20 : suma
    info.obra_soc.length !== 0 ? suma += 20 : suma
    return suma;
  }
 
  return (
    <View style={{ width: "90%" }}>
      <InfoPasajero
        info={info}
      />
      <View style={{height: 50 }}>
        <TouchableOpacity onPress={()=>{navigation.navigate("carga-pasajero")}} style={{ height: 47, borderRadius: 10, borderWidth: 1, borderColor: "#334EA2", justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontWeight: "600", fontSize: 12, lineHeight: 14, color: "#334EA2" }}>
            Editar datos
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ height: 44, justifyContent: "center", marginTop: 30, marginBottom: 20 }}>
        <MensajeAlerta />
      </View>
      <View style={{ height: 90, display: "flex", flexDirection: "row", justifyContent: "space-around", marginBottom: 20, alignItems: "center" }}>
        <CustomView labelText="Ficha Medica" info={info.ficha_med} />
        <CustomView labelText="Declaración Jurada" info={info.dec_jurada} />
        <CustomView labelText="Documento de Identidad" info={info.image_dni.length !== 0} />
        <CustomView labelText="Obra Social" info={info.obra_soc.length !== 0} />
      </View>

      {dietasEspeciales.map((dieta, index) => {
        if (info.dieta[dieta.key] !== false) {
          return (
            <View key={index} style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={require("../../../../assets/Vector.png")}
                style={{ width: 16, height: 16 }}
              />
              <Text style={{ marginLeft: 5, color:"#564C71" }}>{dieta.text}</Text>
            </View>
          );
        } else {
          return null;
        }
      })}
      <View style={{ height: 33, justifyContent: "center", alignItems: "center", marginTop: 25 }}>
        <View style={{ width: "100%", height: 10, backgroundColor: "#E5EBFF", borderRadius: 10 }}>
          <View style={{ width: `${getSuma()}%`, height: 10, backgroundColor: "#93E396", borderRadius: 10 }}>

          </View>
        </View>
        <View style={{ display: "flex", flexDirection: "row", marginTop: 10 }}>
          <View style={{ width: 25 }}>
            <Text style={{ color: "#564C71", fontWeight: "700", fontSize: 10, lineHeight: 12 }}>
              {getSuma()}%
            </Text>
          </View>
          <Text style={{ color: "#564C71", fontWeight: "400", fontSize: 10, lineHeight: 12 }}>
            Completado
          </Text>
        </View>
      </View>
    </View>
  )
}