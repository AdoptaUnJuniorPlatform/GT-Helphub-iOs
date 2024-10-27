import { View, Text, Image, TouchableOpacity } from "react-native";
import { CustomButton } from "./CustomButton";

export const NotificationCard = ({
  time,
  image,
  name,
  surname,
  status,
  onRatingsPress,
  onProfilePress,
  navigation,
}) => {
  return (
    <View>
      <Text className="text-right mb-3 text-[#777777] font-roboto-regular text-[16px]">
        {time}
      </Text>
      <View className="px-[15px] py-[12px] bg-white border-[1px] border-[#e2e2e2] rounded-[6px] justify-between items-start mb-3">
        <View className="flex-row items-center overflow-hidden">
          <View className="w-[50px] h-[50px] rounded-full mr-4">
            <Image
              source={image}
              style={{ width: "100%", height: "100%" }}
              resizeMode="contain"
            />
          </View>
          {status === "declined" ? (
            <View className="w-full">
              <Text className="flex-wrap font-roboto-regular text-neutros-negro text-[14px]">
                Has rechazado la solicitud de intercambio
              </Text>
            </View>
          ) : status === "completed" ? (
            <View>
              <Text className="font-roboto-regular text-neutros-negro text-[12px] mb-1">
                Intercambio completado
              </Text>
              <Text className="font-roboto-regular text-primarios-violeta-100 text-[16px]">
                {name} {surname}
              </Text>
            </View>
          ) : (
            <Text className="font-roboto-regular text-neutros-negro text-[14px]">
              Nueva solicitud de intercambio
            </Text>
          )}
        </View>

        {status === "declined" ? (
          <Text className="mt-1 mb-5 font-roboto-400 text-[12px] text-neutros-negro">
            Puedes contactar a{" "}
            <Text className="text-primarios-violeta-100">
              {name} {surname}
            </Text>{" "}
            para un nuevo intercambio.
          </Text>
        ) : status === "completed" ? (
          <Text className="mt-1 mb-5 font-roboto-regular text-neutros-negro-80 text-[12px]">
            La cadena de favores llegó a su fin. Cuéntanos tu experiencia.
          </Text>
        ) : (
          <Text className="mt-1 mb-5 font-roboto-400 text-[12px] text-neutros-negro">
            <Text className="text-primarios-violeta-100">
              {name} {surname}
            </Text>{" "}
            ha enviado una solicitud.
          </Text>
        )}

        {status === "declined" ? (
          <View className="self-end">
            <CustomButton
              onPress={onProfilePress}
              title={"Ver perfil"}
              width="content"
            />
          </View>
        ) : status === "completed" ? (
          <View className="self-end">
            <CustomButton
              onPress={onRatingsPress}
              title={"Valorar intercambio"}
              width="content"
            />
          </View>
        ) : (
          <View className="flex-row self-end">
            <View className="mr-2">
              <TouchableOpacity
                onPress={() => console.log("declined")}
                className="h-[36px] flex-row items-center justify-center rounded-[8px] px-[16px] border-[1px] border-neutros-negro-80"
              >
                <Text className="uppercase font-roboto-medium text-[12px] text-neutros-negro-80">
                  Declinar
                </Text>
              </TouchableOpacity>
            </View>
            <CustomButton
              onPress={() =>
                navigation.navigate("MessagesFlow", { screen: "MessagesStep1" })
              }
              title={"Aceptar"}
              width="content"
            />
          </View>
        )}
      </View>
    </View>
  );
};
