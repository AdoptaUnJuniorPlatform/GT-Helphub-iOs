import { View, Text } from "react-native";

export const PolicySection = ({ section, children }) => {
  return (
    <View className="mt-3">
      <View>
        <Text className="font-roboto-medium text-xl text-neutral-color-gray-900">
          {section.id}
        </Text>
      </View>
      <View className="mb-1">
        <Text className="font-roboto-medium text-xl text-neutral-color-gray-900">
          {section.title}
        </Text>
      </View>
      {children}
      {section.content.map((paragraph, index) => (
        <Text
          key={index}
          className="mb-2 font-roboto-regular text-base text-neutros-negro-80"
        >
          {paragraph}
        </Text>
      ))}
    </View>
  );
};
