import {
  View,
  Modal,
  Pressable,
  Text,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import CustomButton from "./CustomButton";
import Entypo from "@expo/vector-icons/Entypo";
import RatingCard from "./RatingCard";
import CustomRating from "./CustomRating";
// import DialogIcon from "./svgComponents/DialogIcon";

const { width } = Dimensions.get("window");

const ProfileCard = ({ isCardVisible, toggleCard }) => {
  const isSmallScreen = width <= 392;
  const isBigScreen = width >= 430;

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isCardVisible}
      onRequestClose={toggleCard}
    >
      <View
        style={{
          backgroundColor: "rgba(144, 145, 146, 0.6)",
        }}
        className="absolute w-full h-screen flex-1 justify-center px-4"
      >
        <View
          className="bg-white p-[24px] rounded-[8px]"
          style={{
            shadowColor: "#212121",
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.4,
            shadowRadius: 4,
          }}
        >
          <View className="w-full flex-row justify-end items-center mb-5">
            <Pressable onPress={toggleCard} className="self-end">
              <MaterialIcons name="close" size={14} color="#212121" />
            </Pressable>
          </View>

          <View className="flex-row justify-start items-center mb-5 gap-2 w-full">
            <View className="h-[124px] w-[120px] rounded-[10px]">
              <Image
                source={require("../../assets/avatar5.png")}
                style={{ width: "100%", height: "100%" }}
                resizeMode="contain"
              />
            </View>
            <View className="h-[124px] py-4 justify-between">
              <Text className="font-roboto-medium text-[20px] text-neutros-negro">
                Juanita Perez
              </Text>
              <CustomRating rating={5} />
              <View>
                <Text className="font-roboto-medium text-[14px] text-neutros-negro">
                  Valoración general
                </Text>
                <Text className="font-roboto-regular text-[12px] text-neutros-negro-80">
                  3 reseñas
                </Text>
              </View>
            </View>
          </View>

          <View
            className="w-full rounded-[10px] pl-[11px] pr-[45px] py-[12px] mb-5 gap-[5px]"
            style={{ backgroundColor: "rgba(174, 174, 174, 0.1)" }}
          >
            <Text className="text-neutros-negro font-roboto-regular text-[14px]">
              Descripción
            </Text>
            <Text className="text-neutros-negro-80 font-roboto-regular text-[12px]">
              Tengo una amplia experiencia en cuidar animales, he trabajado en
              una guardería de mascotas por 2 años.
            </Text>
          </View>

          <View className="mb-5 w-full">
            <Text className="text-neutral-color-gray-900 font-roboto-regular text-[20px]">
              Valoraciones
            </Text>
          </View>

          {/* <View
            className={`w-full mb-5 rounded-[8px] border-[1px] ${isBigScreen ? "py-[35px]" : isSmallScreen ? "py-[20px]" : "py-[30px]"} items-center justify-center border-neutral-color-blue-gray-100`}
          >
            <View>
              <DialogIcon />
            </View>
            <Text className="text-neutros-negro font-roboto-medium text-[18px] my-3">
              Aún no hay valoraciones
            </Text>
            <Text className="text-neutros-negro-80 w-[65%] text-center font-roboto-regular text-[14px]">
              Comparte tu opinión y ayuda a que otros conozcan mejor a esta
              persona
            </Text>
          </View> */}

          <View className="mb-6">
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View>
                <RatingCard />
              </View>
              <View>
                <RatingCard />
              </View>
              <View>
                <RatingCard />
              </View>
            </ScrollView>
          </View>

          <View className="w-[80%] self-center">
            <CustomButton
              onPress={() => console.log("enviar solicitud")}
              title={"Enviar solicitud de intercambio"}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ProfileCard;
