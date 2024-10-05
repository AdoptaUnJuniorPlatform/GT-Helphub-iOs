import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import RegisterStep1 from "./src/screens/RegisterStep1";
import RegisterStep2 from "./src/screens/RegisterStep2";
import RegisterStep3 from "./src/screens/RegisterStep3";
import RegisterStep4 from "./src/screens/RegisterStep4";
import RegisterStep5 from "./src/screens/RegisterStep5";
import RegisterStep6 from "./src/screens/RegisterStep6";
import HomeScreen from "./src/screens/HomeScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import MessagesScreen from "./src/screens/MessagesScreen";
import NotificationsScreen from "./src/screens/NotificationsScreen";
import RatingsScreen from "./src/screens/RatingsScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const RegistrationFlow = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Register" component={RegisterScreen} />
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
      <Stack.Screen
        name="RegisterStep6"
        component={RegisterStep6}
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

// TODO: Main App Navigator
const AppNavigator = () => (
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

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <AppNavigator />
    </NavigationContainer>
  );
}

// TODO: For Individual Screens Testing

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <LoginScreen />
//       <StatusBar style="dark" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//   },
// });
