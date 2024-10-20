import { Text, View, SafeAreaView, Button } from "react-native";

export default function NotificationsScreen({ navigation }) {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 justify-center items-center bg-white">
        <Text>Notifications Screen</Text>
        <Button title="Exit" onPress={() => navigation.navigate("Login")} />
      </View>
    </SafeAreaView>
  );
}
