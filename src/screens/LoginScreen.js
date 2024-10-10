import { Text, View, SafeAreaView, Button } from "react-native";

export default function LoginScreen({ navigation }) {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 justify-center items-center bg-white">
        <Text>Login Screen</Text>
        <Button
          title="Crear Cuenta Nueva"
          onPress={() => navigation.navigate("RegisterFlow")}
        />
        <Button
          title="Iniciar Sesión"
          onPress={() => navigation.navigate("SessionStart")}
        />
      </View>
    </SafeAreaView>
  );
}
