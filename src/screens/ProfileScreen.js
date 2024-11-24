import { useState, useCallback, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
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
  CreateProfileWarning,
} from "../components";
import { useProfile } from "../profile/ProfileContext";
import { useUser } from "../user/UserContext";
import { getScreenSize } from "../utils/screenSize";
import apiClient from "../api/apiClient";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function ProfileScreen({ navigation }) {
  const { isSmallScreen } = getScreenSize();

  const { profileData, setProfileData } = useProfile();
  const { userData } = useUser();

  const user_id = userData?._id;

  const [profileImage, setProfileImage] = useState(null);

  const [abilities, setAbilities] = useState([]);
  const [selected, setSelected] = useState("Habilidades");
  const [isEditAbilityVisible, setEditAbilityVisible] = useState(false);
  const [isEditProfileVisible, setEditProfileVisible] = useState(false);
  const [isCreateProfileWarningVisible, setCreateProfileWarningVisible] =
    useState(false);
  const [selectedAbility, setSelectedAbility] = useState(null);

  const toggleEditAbility = (ability) => {
    setSelectedAbility(ability);
    setEditAbilityVisible(!isEditAbilityVisible);
  };

  const toggleEditProfile = () => {
    setEditProfileVisible(!isEditProfileVisible);
  };

  const toggleCreateProfileWarning = () => {
    setCreateProfileWarningVisible(!isCreateProfileWarningVisible);
  };

  const fetchProfile = async () => {
    try {
      const response = await apiClient.get("/profile");
      if (response.status === 200) {
        setCreateProfileWarningVisible(false);
        setProfileData(response.data);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          toggleCreateProfileWarning();
        } else {
          // console.error(error.response.data.message);
          // alert("Se ha producido un error, intenta de nuevo.");
        }
      } else {
        // console.error(error.message);
        // alert("Se ha producido un error, intenta de nuevo.");
      }
    }
  };

  const fetchImage = async (user_id) => {
    try {
      const response = await apiClient.get(
        `/upload-service/profile-imageByUser/${user_id}`,
        { responseType: "blob" },
      );
      const imageUrl = URL.createObjectURL(response.data);
      setProfileImage(imageUrl);
    } catch (error) {
      if (error.response) {
        // console.error(error.response.data.message);
        // alert("Se ha producido un error, intenta de nuevo.");
      } else {
        // console.error(error.message);
        // alert("Se ha producido un error, intenta de nuevo.");
      }
    }
  };

  const fetchAbilities = async (user_id) => {
    try {
      const response = await apiClient.get(
        `/hability/user-habilities/${user_id}`,
      );
      setAbilities(response.data);
    } catch (error) {
      if (error.response) {
        // console.error(error.response.data.message);
        // alert("Se ha producido un error, intenta de nuevo.");
      } else {
        // console.error(error.message);
        // alert("Se ha producido un error, intenta de nuevo.");
      }
    }
  };

  const deleteAbility = async (abilityId) => {
    try {
      await apiClient.delete(`/hability/${abilityId}`);
      setAbilities((prevAbilities) =>
        prevAbilities.filter((ability) => ability._id !== abilityId),
      );
      alert("Habilidad eliminada correctamente.");
    } catch (error) {
      if (error.response) {
        console.error(error.response.data.message);
        alert("Se ha producido un error al eliminar la habilidad.");
      } else {
        console.error(error.message);
        alert("Se ha producido un error, intenta de nuevo.");
      }
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchProfile();
      fetchAbilities(user_id);
      fetchImage(user_id);
    }, []),
  );

  useEffect(() => {
    fetchAbilities(user_id);
  }, [user_id, abilities]);

  useEffect(() => {
    fetchProfile();
  }, [user_id, profileData]);

  useEffect(() => {
    fetchImage(user_id);
  }, [user_id, profileImage]);

  return (
    <SafeAreaView className="flex-1 bg-neutros-gris-fondo">
      <View className="flex-1 justify-start items-center bg-white">
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
              {profileImage && (
                <Image
                  source={{ uri: profileImage }}
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
              {profileData?.interestedSkills ? (
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
                ${selected === "Habilidades" ? "border-primarios-violeta-100 bg-primarios-violeta-20" : "border-neutros-negro-50 bg-white"}
                `}
            >
              <Text
                className={`
                  uppercase text-[10px] 
                  ${selected === "Habilidades" ? "text-primarios-violeta-100 font-roboto-medium" : "text-neutros-negro-80 font-roboto-regular"}
                  `}
              >
                Habilidades
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setSelected("Valoraciones")}
              className={`
                rounded-r-md h-full items-center justify-center px-2 border-[1px] 
                ${selected === "Valoraciones" ? "border-primarios-violeta-100 bg-primarios-violeta-20" : "border-neutros-negro-50 border-l-white bg-white"}
                `}
            >
              <Text
                className={`
                  uppercase font-roboto-regular text-[10px] 
                  ${selected === "Valoraciones" ? "text-primarios-violeta-100 font-roboto-medium" : "text-neutros-negro-80 font-roboto-regular"}
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
                  onPress={() =>
                    navigation.navigate("AddAbilityFlow", {
                      screen: "AddAbilityStep1",
                      params: { abilitiesCount: abilities.length },
                    })
                  }
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
                  {abilities.map((ability) => (
                    <View key={ability._id}>
                      <AbilityCard
                        ability={ability}
                        onDelete={() => deleteAbility(ability._id)}
                        onEdit={() => toggleEditAbility(ability)}
                      />
                    </View>
                  ))}
                </ScrollView>
              </View>
            </>
          ) : (
            <>
              <View
                className={`
                flex-row items-center justify-start mb-3 mx-4
                ${isSmallScreen ? "mb-2" : "mb-3"}
                `}
              >
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
                    ${isSmallScreen ? "text-base" : "text-xl"}
                    `}
                >
                  Mis reseñas
                </Text>
              </View>
              <View
                className={`
                pl-4 
                ${isSmallScreen ? "mt-1" : "mt-4"}
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
        <CreateProfileWarning
          isVisible={isCreateProfileWarningVisible}
          onClose={() => navigation.navigate("CreateProfileFlow")}
        />
      )}

      {isEditAbilityVisible && (
        <EditAbility
          ability={selectedAbility}
          visible={isEditAbilityVisible}
          onRequestClose={toggleEditAbility}
        />
      )}

      {isEditProfileVisible && (
        <EditProfile
          visible={isEditProfileVisible}
          onRequestClose={toggleEditProfile}
          profileImage={profileImage}
        />
      )}
    </SafeAreaView>
  );
}
