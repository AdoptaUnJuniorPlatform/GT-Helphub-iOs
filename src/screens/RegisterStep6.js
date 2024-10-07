import { Text, View, SafeAreaView, Button } from "react-native";

export default function RegisterStep6({ navigation }) {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 justify-center items-center bg-white">
        <Text>Register: Step 6</Text>
        <Button
          title="Atrás"
          onPress={() => navigation.navigate("RegisterStep5")}
        />
        <Button
          title="Siguiente"
          onPress={() => navigation.navigate("HomeTabs")}
        />
      </View>
    </SafeAreaView>
  );
}
