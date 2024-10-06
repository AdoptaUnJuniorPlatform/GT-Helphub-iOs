import { Text, View, SafeAreaView, Button } from "react-native";

export default function RegisterStep1({ navigation }) {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 justify-center items-center bg-white">
        <Text>Register: Step 1</Text>
        <Button title="Atrás" onPress={() => navigation.navigate("Register")} />
      </View>
    </SafeAreaView>
  );
}
