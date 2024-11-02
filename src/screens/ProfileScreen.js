import { useState, useRef, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  Text,
  View,
  SafeAreaView,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Animated,
  Easing,
} from "react-native";
import {
  CustomButton,
  AbilityCard,
  RatingCard,
  EditAbility,
  EditProfile,
  Calendar,
  CustomRating,
  EditIcon,
} from "../components";
import AntDesign from "@expo/vector-icons/AntDesign";
import { getToken } from "../auth/authService";
import { useProfile } from "../profile/ProfileContext";
import { useUser } from "../user/UserContext";

const { width } = Dimensions.get("window");

export default function ProfileScreen({ navigation }) {
  const isSmallScreen = width <= 392;
  const isBigScreen = width >= 430;

  const { profileData, setProfileData } = useProfile();
  const { userData } = useUser();

  const [selected, setSelected] = useState("Habilidades");
  const [isEditAbilityVisible, setEditAbilityVisible] = useState(false);
  const [isEditProfileVisible, setEditProfileVisible] = useState(false);
  const [isCreateProfileWarningVisible, setCreateProfileWarningVisible] =
    useState(false);
  const opacity = useRef(new Animated.Value(0)).current;

  const toggleEditAbility = () => {
    setEditAbilityVisible(!isEditAbilityVisible);
  };

  const toggleEditProfile = () => {
    setEditProfileVisible(!isEditProfileVisible);
  };

  const toggleCreateProfileWarning = () => {
    if (isCreateProfileWarningVisible) {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start(() => setCreateProfileWarningVisible(false));
    } else {
      setCreateProfileWarningVisible(true);
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    }
  };

  useFocusEffect(
    useCallback(() => {
      const fetchProfile = async () => {
        try {
          const token = await getToken();
          const response = await fetch(
            "http://localhost:4002/api/helphub/profile",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            },
          );

          if (response.status === 200) {
            setCreateProfileWarningVisible(false);
            const data = await response.json();
            setProfileData(data);
          } else if (response.status === 404) {
            toggleCreateProfileWarning();
          } else {
            const errorData = await response.json();
            console.error(errorData.message);
            alert("Se ha producido un error, intenta de nuevo.");
          }
        } catch (error) {
          console.error(error);
          alert("Se ha producido un error, intenta de nuevo.");
        }
      };

      fetchProfile();
    }, []),
  );

  return (
    <SafeAreaView className="flex-1 bg-neutros-gris-fondo">
      <View className="flex-1 justify-center items-center justify-start bg-white">
        {/* Profile Card */}
        <View
          className={`
            mx-4 bg-[#f7f7f7] rounded-[10px] px-2 
            ${isSmallScreen ? "py-[13px]" : "py-[15px]"}
            `}
        >
          {/* Card Header */}
          <View
            className={`
              w-full flex-row justify-between items-center 
              ${isSmallScreen ? "mb-2" : "mb-3"}
              `}
          >
            <Text
              className={`
                font-roboto-medium text-neutros-negro
                ${isSmallScreen ? "text-[18px]" : "text-xl"}
                `}
            >
              Mi Perfil
            </Text>

            <TouchableOpacity onPress={toggleEditProfile}>
              <EditIcon />
            </TouchableOpacity>
          </View>

          {/* Section With Image */}
          <View
            className={`
            flex-row 
            ${isSmallScreen ? "mb-2" : "mb-4"}
            `}
          >
            <View
              className={`
                rounded-[10px] mr-4
                ${isSmallScreen ? "h-[98px] w-[98px]" : "h-[124px] w-[120px]"}
                `}
            >
              {profileData?.profilePicture && (
                <Image
                  source={{ uri: profileData.profilePicture }}
                  style={{ width: "100%", height: "100%" }}
                  resizeMode="cover"
                  className="rounded-[10px]"
                />
              )}
            </View>
            <View className="flex-1 justify-between">
              <Text
                className={`
                  text-neutros-negro font-roboto-medium
                  ${isSmallScreen ? "text-lg mb-1" : "text-xl"}
                  `}
              >
                {userData?.nameUser || ""} {userData?.surnameUser || ""}
              </Text>
              <View className="w-full">
                <Text
                  className={`
                    text-neutros-negro font-roboto-regular
                    ${isSmallScreen ? "text-xs mb-1" : "text-sm mb-2"}
                    `}
                >
                  Disponibilidad horaria
                </Text>
                <View className="flex-row">
                  <View className="border-[1px] border-neutros-negro-50 mb-2 rounded-[5px] w-fit px-3 py-1">
                    <Text
                      className={`
                        text-neutros-negro font-roboto-regular 
                        ${isSmallScreen ? "text-[9px]" : "text-xs"}
                        `}
                    >
                      {profileData?.preferredTimeRange || ""}
                    </Text>
                  </View>
                </View>
                <View
                  className={`
                    flex-row 
                    ${isSmallScreen ? "gap-1" : "gap-3"}
                    `}
                >
                  <View>
                    <Calendar selectedDays={profileData?.selectedDays || []} />
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Description */}
          <View
            className={`
              rounded-[10px] pl-[11px] pr-[45px] py-[12px] 
              ${isSmallScreen ? "mb-2" : "mb-4"}
              `}
            style={{ backgroundColor: "rgba(174, 174, 174, 0.1)" }}
          >
            <Text className="text-neutros-negro font-roboto-regular text-sm mb-[5px]">
              Descripción
            </Text>
            <Text className="text-neutros-negro-80 font-roboto-regular text-xs">
              {profileData?.description || ""}
            </Text>
          </View>

          {/* Habilidades... */}
          <View className="w-full">
            <Text className="text-sm font-roboto-regular text-neutros-negro mb-1">
              Habilidades que me interesan
            </Text>
            <View className="flex-row gap-1">
              {profileData.interestedSkills ? (
                profileData.interestedSkills.map((skill, index) => (
                  <View
                    key={index}
                    className="rounded-full w-fit px-2 py-1"
                    style={{ backgroundColor: "rgba(174, 174, 174, 0.1)" }}
                  >
                    <Text className="text-neutros-negro-80 text-[10px] font-roboto-regular">
                      {skill}
                    </Text>
                  </View>
                ))
              ) : (
                <View
                  className="rounded-full w-[80px] px-2 py-1"
                  style={{ backgroundColor: "rgba(174, 174, 174, 0.1)" }}
                >
                  <Text className="text-neutros-negro-80 text-[10px] font-roboto-regular"></Text>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* Content Switch */}
        <View className="flex-row mt-2 mx-4">
          <View
            className={`
              w-full flex-row items-center justify-start rounded-md
              ${isSmallScreen ? "h-[25px]" : "h-[29px]"}
              `}
          >
            <TouchableOpacity
              onPress={() => setSelected("Habilidades")}
              className={`
                rounded-l-md h-full px-2 items-center justify-center border-[1px] 
                ${selected === "Habilidades"
                  ? "border-primarios-violeta-100 bg-primarios-violeta-20"
                  : "border-neutros-negro-50 bg-white"
                }
                `}
            >
              <Text
                className={`
                  uppercase text-[10px] 
                  ${selected === "Habilidades"
                    ? "text-primarios-violeta-100 font-roboto-medium"
                    : "text-neutros-negro-80 font-roboto-regular"
                  }
                  `}
              >
                Habilidades
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setSelected("Valoraciones")}
              className={`
                rounded-r-md h-full items-center justify-center px-2 border-[1px] 
                ${selected === "Valoraciones"
                  ? "border-primarios-violeta-100 bg-primarios-violeta-20"
                  : "border-neutros-negro-50 border-l-white bg-white"
                }
                `}
            >
              <Text
                className={`
                  uppercase font-roboto-regular text-[10px] 
                  ${selected === "Valoraciones"
                    ? "text-primarios-violeta-100 font-roboto-medium"
                    : "text-neutros-negro-80 font-roboto-regular"
                  }
                  `}
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
                  className={`
                    text-neutros-negro font-roboto-medium 
                    ${isSmallScreen ? "text-lg" : "text-xl"}
                    `}
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
                  className={`
                    bg-primarios-violeta-100 rounded-[6px] justify-center items-center mr-2
                    ${isSmallScreen ? "w-[30px] h-[30px]" : "w-[34px] h-[34px]"}
                    `}
                >
                  <Text className="text-white text-base font-roboto-regular">
                    5
                  </Text>
                </View>
                <View className="justify-center">
                  <Text className="text-neutros-negro font-roboto-medium text-sm">
                    Valoración general
                  </Text>
                  <CustomRating rating={5} />
                </View>
              </View>
              <View
                View
                className="flex-row justify-start items-center w-full px-4"
              >
                <Text
                  className={`
                    text-neutros-negro font-roboto-medium 
                    ${isSmallScreen ? "text-lg" : "text-xl"}
                    `}
                >
                  Mis reseñas
                </Text>
              </View>
              <View
                className={`
                pl-4 
                ${isSmallScreen ? "mt-2" : "mt-4"}
                `}
              >
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

      {isCreateProfileWarningVisible && (
        <Animated.View
          style={{
            opacity: opacity,
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
            <View className="mb-[24px]">
              <Text
                className={`text-neutral-color-gray-900 font-poppins-semibold w-[90%] ${isBigScreen ? "text-[26px] mb-[12px]" : isSmallScreen ? "text-[22px] mb-[8px]" : "text-[24px] mb-[8px]"}`}
              >
                Vamos a crear tu perfil
              </Text>
            </View>
            <View className="items-end">
              <CustomButton
                onPress={() => navigation.navigate("CreateProfileFlow")}
                title="Continuar"
                width="content"
              />
            </View>
          </View>
        </Animated.View>
      )}

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
