import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import RegisterStep1 from "../screens/RegisterStep1";
import RegisterStep2 from "../screens/RegisterStep2";
import RegisterStep3 from "../screens/RegisterStep3";
import RegisterStep4 from "../screens/RegisterStep4";
import RegisterStep5 from "../screens/RegisterStep5";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import MessagesScreen from "../screens/MessagesScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import RatingsScreen from "../screens/RatingsScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const RegistrationFlow = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RegisterStep1"
        component={RegisterStep1}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RegisterStep2"
        component={RegisterStep2}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RegisterStep3"
        component={RegisterStep3}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RegisterStep4"
        component={RegisterStep4}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RegisterStep5"
        component={RegisterStep5}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const Tabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Messages" component={MessagesScreen} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
      <Tab.Screen name="Ratings" component={RatingsScreen} />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SessionStart"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RegisterFlow"
        component={RegistrationFlow}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HomeTabs"
        component={Tabs}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
