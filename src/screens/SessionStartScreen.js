import { Text, View, SafeAreaView, Button } from "react-native";

export default function LoginScreen({ navigation }) {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 justify-center items-center bg-white">
        <Text>Session Start Screen</Text>
        <Button
          title="Inicia Sesión"
          onPress={() => navigation.navigate("HomeTabs")}
        />
      </View>
    </SafeAreaView>
  );
}
