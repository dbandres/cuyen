import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { ItineratioDelViaje } from "./ItinerarioDelViaje";
import { InfoDelViaje } from "./InfoDelViaje";
import { Contrato } from "./Contrato";
import { EstadoDePagos } from "./EstadoDePagos";
import { Image, Text, View } from "react-native";

const Tab = createBottomTabNavigator();

export const RouteInfoViaje = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarLabel: ({ focused, color }) => {
          const formattedName = route.name === 'Información del viaje'
            ? 'Información\n del viaje' // Agrega el salto de línea para esta pestaña
            : route.name === 'Itinerario del viaje'
              ? 'Itinerario\n del viaje'
              : route.name === 'Estado de pagos'
                ? 'Estado\n de pagos'
                : route.name;

          return (
            <Text style={{
              color: '#FFFFFF',
              fontSize: 12,
              textAlign: 'center',
              height: 30,
              fontWeight: focused ? "700" : "400"
              // Agrega cualquier otro estilo necesario aquí
            }}>
              {formattedName}
            </Text>
          );
        },
        tabBarIcon: ({focused}) => {
          let iconName;
          switch (route.name) {
            case 'Contrato':
              iconName = focused 
              ? <Image source={require(`../../../assets/contract_color.png`)} style={{ width: 24, height: 24 }} />
              : <Image source={require(`../../../assets/contract.png`)} style={{ width: 24, height: 24 }} />
              break;
            case 'Información del viaje':
              iconName = focused 
              ? <Image source={require(`../../../assets/concierge_color.png`)} style={{ width: 24, height: 24 }} />
              : <Image source={require(`../../../assets/concierge.png`)} style={{ width: 24, height: 24 }} />
              break;
            case 'Itinerario del viaje':
              iconName = focused
              ? <Image source={require(`../../../assets/airport_shuttle_color.png`)} style={{ width: 24, height: 24 }} />
              : <Image source={require(`../../../assets/airport_shuttle.png`)} style={{ width: 24, height: 24 }} />
              break;
            default:
              iconName = focused
              ? <Image source={require(`../../../assets/account_balance_wallet_color.png`)} style={{ width: 24, height: 24 }} />
              : <Image source={require(`../../../assets/account_balance_wallet.png`)} style={{ width: 24, height: 24 }} />
              break;
          }

          return (
            <View style={{ alignItems: 'center' }}>
              {iconName}
            </View>
          );
        },
        tabBarStyle: {
          height: 85, // Ajusta la altura
          paddingBottom: 20,
          backgroundColor: "#162962",
        },
      })}
    >
      <Tab.Screen name="Contrato" component={Contrato} options={{ headerShown: false }} />
      <Tab.Screen name="Información del viaje" component={InfoDelViaje} options={{ headerShown: false }} />
      <Tab.Screen name="Itinerario del viaje" component={ItineratioDelViaje} options={{ headerShown: false }} />
      <Tab.Screen name="Estado de pagos" component={EstadoDePagos} options={{ headerShown: false }} />
    </Tab.Navigator>
  )
}