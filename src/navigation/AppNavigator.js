import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import EmailVerificationScreen from "../screens/EmailVerificationScreen";
import RegisterStep1 from "../screens/RegisterStep1";
import RegisterStep2 from "../screens/RegisterStep2";
import RegisterStep3 from "../screens/RegisterStep3";
import RegisterStep4_1 from "../screens/RegisterStep4_1";
import RegisterStep4_2 from "../screens/RegisterStep4_2";
import RegisterStep5 from "../screens/RegisterStep5";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import MessagesScreen from "../screens/MessagesScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import SessionStartScreen from "../screens/SessionStartScreen";
import AddAbilityStep1 from "../screens/AddAbilityStep1";
import AddAbilityStep2 from "../screens/AddAbilityStep2";
import ResetPasswordStep1 from "../screens/ResetPasswordStep1";
import ResetPasswordStep2 from "../screens/ResetPasswordStep2";
import MessagesStep1 from "../screens/MessagesStep1";
import MessagesStep2 from "../screens/MessagesStep2";
import { Ionicons } from "@expo/vector-icons";
import { Text, SafeAreaView } from "react-native";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const RegisterFlow = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EmailVerification"
        component={EmailVerificationScreen}
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
        name="RegisterStep4_1"
        component={RegisterStep4_1}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RegisterStep4_2"
        component={RegisterStep4_2}
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
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarStyle: {
            backgroundColor: "#7166d2",
            marginHorizontal: 25,
            height: 45,
            paddingBottom: 4,
            borderRadius: 8,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            position: "absolute",
            bottom: 16,
            left: 0,
            right: 0,
          },
          tabBarIcon: ({ color, focused }) => {
            let iconName;
            const iconSize = focused ? 20 : 24;
            if (route.name === "Inicio") {
              iconName = "home";
            } else if (route.name === "Mensajes") {
              iconName = "mail";
            } else if (route.name === "Alertas") {
              iconName = "notifications";
            } else if (route.name === "Perfil") {
              iconName = "person";
            }
            return <Ionicons name={iconName} size={iconSize} color={color} />;
          },
          tabBarLabel: ({ focused }) => {
            return focused ? (
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 9,
                  marginTop: -5,
                }}
              >
                {route.name}
              </Text>
            ) : null;
          },
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "#d1ceee",
        })}
      >
        <Tab.Screen
          name="Inicio"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Mensajes"
          component={MessagesScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Alertas"
          component={NotificationsScreen}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Perfil"
          component={ProfileScreen}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

const AddAbilityFlow = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AddAbilityStep1"
        component={AddAbilityStep1}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddAbilityStep2"
        component={AddAbilityStep2}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const ResetPasswordFlow = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ResetPasswordStep1"
        component={ResetPasswordStep1}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ResetPasswordStep2"
        component={ResetPasswordStep2}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const MessagesFlow = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MessagesStep1"
        component={MessagesStep1}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MessagesStep2"
        component={MessagesStep2}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SessionStart"
        component={SessionStartScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ResetPasswordFlow"
        component={ResetPasswordFlow}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RegisterFlow"
        component={RegisterFlow}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HomeTabs"
        component={Tabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddAbilityFlow"
        component={AddAbilityFlow}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MessagesFlow"
        component={MessagesFlow}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
