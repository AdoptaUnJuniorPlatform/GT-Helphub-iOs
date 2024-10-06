import { Text, View, SafeAreaView, Button } from "react-native";

export default function LoginScreen({ navigation }) {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 justify-center items-center bg-white">
        <Text>Login Screen</Text>
        <Button
          title="Regístrate"
          onPress={() => navigation.navigate("RegisterFlow")}
        />
      </View>
    </SafeAreaView>
  );
}
