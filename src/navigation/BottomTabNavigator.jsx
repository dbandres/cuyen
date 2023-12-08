import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/tabScreens/Home';
import Notifications from '../screens/tabScreens/Notifications';
import Settings from '../screens/tabScreens/Settings';

const Tab = createBottomTabNavigator();

export function BottomTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Inicio" component={Home} />
      <Tab.Screen name="Notificaciones" component={Notifications} />
      <Tab.Screen name="Ajustes" component={Settings} />
    </Tab.Navigator>
  );
}