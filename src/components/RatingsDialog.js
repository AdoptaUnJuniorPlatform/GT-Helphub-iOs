import { useState } from "react";
import {
  View,
  Modal,
  Pressable,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { CustomButton } from "./CustomButton";
import { CustomTextarea } from "./CustomTextarea";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const { width } = Dimensions.get("window");

export const RatingsDialog = ({ isDialogVisible, toggleDialog }) => {
  const isSmallScreen = width <= 392;
  const isBigScreen = width >= 430;

  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);

  const getRatingLabel = (rating) => {
    switch (rating) {
      case 5:
        return "Excelente";
      case 4:
        return "Muy bueno";
      case 3:
        return "Aceptable";
      case 2:
        return "Mejorable";
      case 1:
        return "Insuficiente";
      default:
        return "Sin opinión";
    }
  };

  const handleStarPress = (index) => {
    setRating(index + 1);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isDialogVisible}
      onRequestClose={toggleDialog}
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
          <View
            className={`w-full flex-row justify-end items-center ${isSmallScreen ? "mb-2" : "mb-5"}`}
          >
            <Pressable onPress={toggleDialog} className="self-end">
              <MaterialIcons name="close" size={14} color="#212121" />
            </Pressable>
          </View>

          <View
            className={`flex-row justify-start items-center ${isSmallScreen ? "mb-2" : "mb-4"} gap-2 w-full`}
          >
            <View className="h-[124px] w-[120px] rounded-[10px]">
              <Image
                source={require("../../assets/avatar21.png")}
                style={{ width: "100%", height: "100%" }}
                resizeMode="contain"
              />
            </View>

            <View>
              <Text className="neutros-negro font-roboto-medium text-[14px] mb-4">
                Intercambio con:
              </Text>
              <View className="items-start justify-between">
                <Text className="mb-2 font-roboto-medium text-[14px] text-neutros-negro">
                  Laura García
                </Text>
                <View className="flex-row items-center">
                  <View className="flex-row w-content py-[4px] px-[8px] rounded-full items-center bg-transparent border-[1px] border-primarios-violeta-100">
                    <Text className="font-roboto-regular text-[12px] text-neutros-negro-80">
                      Cocina
                    </Text>
                  </View>
                  <View className="mx-1">
                    <FontAwesome6
                      name="arrows-rotate"
                      size={17}
                      color="#7166D2"
                    />
                  </View>
                  <View className="flex-row w-content py-[4px] px-[8px] rounded-full items-center bg-transparent border-[1px] border-primarios-violeta-100">
                    <Text className="font-roboto-regular text-[12px] text-neutros-negro-80">
                      Pintura
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View
            className={`w-full rounded-[10px] pl-[11px] pr-[45px] py-[12px] ${isSmallScreen ? "mb-2" : "mb-5"} gap-[5px]`}
            style={{ backgroundColor: "rgba(174, 174, 174, 0.1)" }}
          >
            <Text className="text-neutros-negro font-roboto-regular text-[16px]">
              ¿Cómo calificas el intercambio?
            </Text>

            <View className="flex-row items-center justify-start mb-1">
              {[...Array(5)].map((_, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleStarPress(index)}
                >
                  <Entypo
                    name="star"
                    size={24}
                    color={index < rating ? "#ffd43c" : "#B8B8B8"}
                  />
                </TouchableOpacity>
              ))}
            </View>
            <Text className="font-roboto-regular text-[14px] text-neutros-negro">
              {getRatingLabel(rating)}
            </Text>
          </View>

          <View className={`${isSmallScreen ? "mb-3" : "mb-5"}`}>
            <Text
              className={`font-roboto-regular ${isSmallScreen ? "text-[18px]" : "text-[20px]"} text-neutros-negro mb-2`}
            >
              Deja tu comentario
            </Text>
            <Text className="font-roboto-regular text-[16px] text-neutros-negro leading-5">
              Con tu comentario ayudas a Evangelina y a otras personas{" "}
            </Text>
          </View>

          <View className={`${isSmallScreen ? "mb-3" : "mb-5"}`}>
            <Text className="font-roboto-regular text-neutros-negro text-[14px] mb-2">
              Descripción
            </Text>
            <CustomTextarea
              value={description}
              onChange={setDescription}
              placeholder="Evangelina, es un persona muy talentosa. Capaz de enseñar en poco tiempo y de una forma muy clara y puntual.
Abierta a escuchar tus dudas y consultas en todo momento. Si necesitan aprender algo de diseño no duden en contactar
a Evangelina."
              multiline={true}
              numberOfLines={7}
              maxLength={160}
              height={146}
            />
          </View>

          <View className="flex-row justify-end">
            <View className="mr-2">
              <TouchableOpacity
                onPress={() => console.log("reportar perfil")}
                className="h-[36px] flex-row items-center justify-center rounded-[8px] px-[16px] border-[1px] border-neutros-negro-80"
              >
                <Text className="uppercase font-roboto-medium text-[12px] text-neutros-negro-80">
                  Reportar perfil
                </Text>
              </TouchableOpacity>
            </View>
            <CustomButton
              onPress={() => console.log("enviar")}
              title={"Enviar"}
              width="content"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};