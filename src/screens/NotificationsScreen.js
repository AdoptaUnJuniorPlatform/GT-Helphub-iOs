import { Text, View, SafeAreaView, Button } from "react-native";

export default function NotificationsScreen({ navigation }) {
  return (
    <SafeAreaView className="flex-1 bg-neutros-gris-fondo">
      <View className="flex-1 justify-center items-center bg-neutros-gris-fondo">
        <Text>Notifications Screen</Text>
        <Button title="Exit" onPress={() => navigation.navigate("Login")} />
      </View>
    </SafeAreaView>
  );
}
