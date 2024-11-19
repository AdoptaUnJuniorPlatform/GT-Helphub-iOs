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
}) => {
  return (
    <View>
      <Text className="text-right mb-3 text-[#777777] font-roboto-regular text-base">
        {time}
      </Text>
      <View className="px-[15px] py-3 bg-white border-[1px] border-[#e2e2e2] rounded-md justify-between items-start mb-3">
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
              <Text className="flex-wrap font-roboto-regular text-neutros-negro text-sm">
                Has rechazado la solicitud de intercambio
              </Text>
            </View>
          ) : status === "completed" ? (
            <View>
              <Text className="font-roboto-regular text-neutros-negro text-xs mb-1">
                Intercambio completado
              </Text>
              <Text className="font-roboto-regular text-primarios-violeta-100 text-base">
                {name} {surname}
              </Text>
            </View>
          ) : (
            <Text className="font-roboto-regular text-neutros-negro text-sm">
              Nueva solicitud de intercambio
            </Text>
          )}
        </View>

        {status === "declined" ? (
          <Text className="mt-1 mb-5 font-roboto-400 text-xs text-neutros-negro">
            Puedes contactar a{" "}
            <Text className="text-primarios-violeta-100">
              {name} {surname}
            </Text>{" "}
            para un nuevo intercambio.
          </Text>
        ) : status === "completed" ? (
          <Text className="mt-1 mb-5 font-roboto-regular text-neutros-negro-80 text-xs">
            La cadena de favores llegó a su fin. Cuéntanos tu experiencia.
          </Text>
        ) : (
          <Text className="mt-1 mb-5 font-roboto-400 text-xs text-neutros-negro">
            <Text className="text-primarios-violeta-100">
              {name} {surname}
            </Text>{" "}
            ha enviado una solicitud.
          </Text>
        )}

        {status === "completed" ? (
          <View className="self-end">
            <CustomButton
              onPress={onRatingsPress}
              title={"Valorar intercambio"}
              width="content"
            />
          </View>
        ) : (
          <View className="flex-row self-end">
            <TouchableOpacity
              className="flex-row h-[36px] items-center justify-center rounded-lg bg-primarios-rosa-100 w-fit px-4"
              onPress={onProfilePress}
            >
              <Text className="font-roboto-medium uppercase text-xs text-white">
                Ver Perfil
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};
