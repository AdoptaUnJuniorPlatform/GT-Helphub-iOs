import { useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import EditIcon from "../components/svgComponents/EditIcon";
import CustomButton from "../components/CustomButton";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import AbilityCard from "../components/AbilityCard";
import RatingCard from "../components/RatingCard";
import EditAbility from "../components/EditAbility";
import EditProfile from "../components/EditProfile";

const { width } = Dimensions.get("window");

export default function ProfileScreen({ navigation }) {
  const isSmallScreen = width <= 392;
  const isBigScreen = width >= 430;

  const [selected, setSelected] = useState("Habilidades");
  const [isEditAbilityVisible, setEditAbilityVisible] = useState(false);
  const [isEditProfileVisible, setEditProfileVisible] = useState(false);

  const toggleEditAbility = () => {
    setEditAbilityVisible(!isEditAbilityVisible);
  };

  const toggleEditProfile = () => {
    setEditProfileVisible(!isEditProfileVisible);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-center items-center justify-start bg-white">
        {/* Profile Card */}
        <View
          className={`mx-4 bg-[#f7f7f7] rounded-[10px] px-[8px] ${isSmallScreen ? "py-[13px]" : "py-[15px]"}`}
        >
          {/* Card Header */}
          <View
            className={`w-full flex-row justify-between items-center ${isSmallScreen ? "mb-2" : "mb-3"}`}
          >
            <Text
              className={`font-roboto-medium ${isSmallScreen ? "text-[18px]" : "text-[20px]"} text-neutros-negro`}
            >
              Mi Perfil
            </Text>

            <TouchableOpacity onPress={toggleEditProfile}>
              <EditIcon />
            </TouchableOpacity>
          </View>

          {/* Section With Image */}
          <View className={`flex-row ${isSmallScreen ? "mb-2" : "mb-4"}`}>
            <View
              className={`rounded-[10px] mr-4 ${isSmallScreen ? "h-[98px] w-[98px]" : "h-[124px] w-[120px]"
                }`}
            >
              <Image
                source={require("../../assets/avatar5.png")}
                style={{ width: "100%", height: "100%" }}
                resizeMode="contain"
              />
            </View>
            <View className="flex-1 justify-between">
              <Text
                className={`text-neutros-negro ${isSmallScreen ? "text-[18px] mb-1" : "text-[20px]"} font-roboto-medium`}
              >
                Juanita Perez
              </Text>
              <View className="w-full">
                <Text
                  className={`text-neutros-negro ${isSmallScreen ? "text-[12px] mb-1" : "text-[14px] mb-3"} font-roboto-regular`}
                >
                  Disponibilidad horaria
                </Text>
                <View className="flex-row">
                  <View className="border-[1px] border-neutros-negro-50 mb-3 rounded-[5px] w-fit px-3 py-1">
                    <Text
                      className={`text-neutros-negro ${isSmallScreen ? "text-[9px]" : "text-[12px]"} font-roboto-regular`}
                    >
                      8:00hs a 17:00hs
                    </Text>
                  </View>
                </View>
                <View
                  className={`flex-row ${isSmallScreen ? "gap-1" : "gap-3"}`}
                >
                  <View className="border-[1px] border-neutros-negro-50 rounded-[5px] w-fit px-3 py-1">
                    <Text
                      className={`text-neutros-negro ${isSmallScreen ? "text-[9px]" : "text-[12px]"} font-roboto-regular`}
                    >
                      Lunes
                    </Text>
                  </View>
                  <View className="border-[1px] border-neutros-negro-50 rounded-[5px] w-fit px-3 py-1">
                    <Text
                      className={`text-neutros-negro ${isSmallScreen ? "text-[9px]" : "text-[12px]"} font-roboto-regular`}
                    >
                      Sábado
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Description */}
          <View
            className={`rounded-[10px] pl-[11px] pr-[45px] py-[12px] ${isSmallScreen ? "mb-2" : "mb-4"}`}
            style={{ backgroundColor: "rgba(174, 174, 174, 0.1)" }}
          >
            <Text className="text-neutros-negro font-roboto-regular text-[14px] mb-[5px]">
              Descripción
            </Text>
            <Text className="text-neutros-negro-80 font-roboto-regular text-[12px]">
              Soy una artista que ama pintar, tengo 8 años de experiencia
              enseñando y pintando. Además me encantan los animales como las
              artes en general.
            </Text>
          </View>

          {/* Habilidades... */}
          <View className="w-full">
            <Text className="text-[14px] font-roboto-regular text-neutros-negro mb-1">
              Habilidades que me interesan
            </Text>
            <View className="flex-row gap-1">
              <View
                className="rounded-full w-fit px-2 py-1"
                style={{ backgroundColor: "rgba(174, 174, 174, 0.1)" }}
              >
                <Text className="text-neutros-negro-80 text-[10px] font-roboto-regular">
                  Informática
                </Text>
              </View>
              <View
                className="rounded-full w-fit px-2 py-1"
                style={{ backgroundColor: "rgba(174, 174, 174, 0.1)" }}
              >
                <Text className="text-neutros-negro-80 text-[10px] font-roboto-regular">
                  Idiomas
                </Text>
              </View>
              <View
                className="rounded-full w-fit px-2 py-1"
                style={{ backgroundColor: "rgba(174, 174, 174, 0.1)" }}
              >
                <Text className="text-neutros-negro-80 text-[10px] font-roboto-regular">
                  Tutorías
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Content Switch */}
        <View className="flex-row mt-2 mx-4">
          <View
            className={`w-full ${isSmallScreen ? "h-[25px]" : "h-[29px]"} flex-row items-center justify-start rounded-md`}
          >
            <TouchableOpacity
              onPress={() => setSelected("Habilidades")}
              className={`rounded-l-md h-full px-2  items-center justify-center border-[1px] ${selected === "Habilidades"
                  ? "border-primarios-violeta-100 bg-primarios-violeta-20"
                  : "border-neutros-negro-50 bg-white"
                }`}
            >
              <Text
                className={`uppercase text-[10px] ${selected === "Habilidades"
                    ? "text-primarios-violeta-100 font-roboto-medium"
                    : "text-neutros-negro-80 font-roboto-regular"
                  }`}
              >
                Habilidades
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setSelected("Valoraciones")}
              className={`rounded-r-md h-full items-center justify-center px-2 border-[1px] ${selected === "Valoraciones"
                  ? "border-primarios-violeta-100 bg-primarios-violeta-20"
                  : "border-neutros-negro-50 border-l-white bg-white"
                }`}
            >
              <Text
                className={`uppercase font-roboto-regular text-[10px] ${selected === "Valoraciones"
                    ? "text-primarios-violeta-100 font-roboto-medium"
                    : "text-neutros-negro-80 font-roboto-regular"
                  }`}
              >
                Valoraciones
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Condicional Habilidades/Valoraciones */}
        <View className="w-full mt-4">
          {selected === "Habilidades" ? (
            <>
              <View
                View
                className="flex-row justify-between items-center w-full px-4"
              >
                <Text
                  className={`text-neutros-negro font-roboto-medium ${isSmallScreen ? "text-[18px]" : "text-[20px]"}`}
                >
                  Mis habilidades
                </Text>
                <CustomButton
                  onPress={() => navigation.navigate("AddAbilityFlow")}
                  title="Nueva Habilidad"
                  width="content"
                  children={
                    <View className="bg-red mr-3">
                      <AntDesign name="pluscircle" size={16} color="white" />
                    </View>
                  }
                />
              </View>
              <View className="pl-4 mt-4">
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View>
                    <AbilityCard
                      onDelete={() => console.log("delete ability")}
                      onEdit={toggleEditAbility}
                    />
                  </View>
                  <View>
                    <AbilityCard
                      onDelete={() => console.log("delete ability")}
                      onEdit={toggleEditAbility}
                    />
                  </View>
                  <View>
                    <AbilityCard
                      onDelete={() => console.log("delete ability")}
                      onEdit={toggleEditAbility}
                    />
                  </View>
                </ScrollView>
              </View>
            </>
          ) : (
            <>
              <View className="flex-row items-center justify-start mb-3 mx-4">
                <View
                  className={`bg-primarios-violeta-100 rounded-[6px] justify-center items-center ${isSmallScreen ? "w-[30px] h-[30px]" : "w-[34px] h-[34px]"} mr-2`}
                >
                  <Text className="text-white text-[16px] font-roboto-regular">
                    5
                  </Text>
                </View>
                <View className="justify-center">
                  <Text className="text-neutros-negro font-roboto-medium text-[14px]">
                    Valoración general
                  </Text>
                  <View className="flex-row">
                    <View className="flex-row items-center justify-start mr-3">
                      <Entypo name="star" size={12} color="#ffd43c" />
                      <Entypo name="star" size={12} color="#ffd43c" />
                      <Entypo name="star" size={12} color="#ffd43c" />
                      <Entypo name="star" size={12} color="#ffd43c" />
                      <Entypo name="star" size={12} color="#ffd43c" />
                    </View>
                    <Text className="text-neutros-negro font-roboto-regular text-[14px]">
                      Excelente
                    </Text>
                  </View>
                </View>
              </View>
              <View
                View
                className="flex-row justify-start items-center w-full px-4"
              >
                <Text
                  className={`text-neutros-negro font-roboto-medium ${isSmallScreen ? "text-[18px]" : "text-[20px]"}`}
                >
                  Mis reseñas
                </Text>
              </View>
              <View className={`pl-4 ${isSmallScreen ? "mt-2" : "mt-4"}`}>
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
            </>
          )}
        </View>
      </View>

      {isEditAbilityVisible && (
        <EditAbility
          visible={isEditAbilityVisible}
          onRequestClose={toggleEditAbility}
        />
      )}

      {isEditProfileVisible && (
        <EditProfile
          visible={isEditProfileVisible}
          onRequestClose={toggleEditProfile}
        />
      )}
    </SafeAreaView>
  );
}
