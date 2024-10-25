import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Modal,
  Pressable,
  Dimensions,
  SafeAreaView,
} from "react-native";
import LogoDark from "../components/svgComponents/LogoDark";
import HomeCard from "../components/HomeCard";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import CustomDropdown from "../components/CustomDropdown";
import CustomButton from "../components/CustomButton";
import { categories, postalCodes } from "../data/data";
import ProfileCard from "../components/ProfileCard";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const isSmallScreen = width <= 392;
  const isBigScreen = width >= 430;

  const [isFilterVisible, setFilterVisible] = useState(false);
  const [isCardVisible, setCardVisible] = useState(false);
  const [selected, setSelected] = useState(null);

  const toggleFilter = () => {
    setFilterVisible(!isFilterVisible);
  };

  const toggleCard = () => {
    setCardVisible(!isCardVisible);
  };

  return (
    <SafeAreaView className="flex-1 bg-neutros-gris-fondo">
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1 bg-neutros-gris-fondo"
      >
        <View
          className={`px-9 ${isBigScreen ? "my-7" : isSmallScreen ? "my-3" : "my-5"}`}
        >
          <LogoDark />
        </View>
        <View className="flex-1 mt-2">
          {/* Search */}
          <View className="px-4">
            <View
              className="flex-row items-center justify-between h-[45px] rounded-full px-6"
              style={{
                backgroundColor: "rgba(113, 102, 210, 0.2)",
              }}
            >
              <View className="flex-1">
                <TextInput
                  placeholder="¿Qué estás buscando?"
                  className="flex-1 h-full mr-4 text-[16px] font-roboto-regular text-neutros-negro"
                  placeholderTextColor="rgba(113, 102, 210, 0.5)"
                />
              </View>
              <TouchableOpacity onPress={() => console.log("search")}>
                <Entypo name="magnifying-glass" size={22} color="#434242" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Header & Filter Button */}
          <View
            className={`px-4 ${isBigScreen ? "my-7" : isSmallScreen ? "my-3" : "my-5"} flex-row justify-between items-center`}
          >
            <Text
              className={`w-[222px] font-roboto-regular ${isBigScreen ? "text-[32px]" : isSmallScreen ? "text-[28px]" : "text-[30px]"} text-neutros-negro`}
            >
              Categorías y habilidades
            </Text>

            <TouchableOpacity
              onPress={toggleFilter}
              className="h-[36px] flex-row items-center justify-center rounded-[8px]"
            >
              <Text className="uppercase font-roboto-bold text-[12px] text-[#263238]">
                Filtros
              </Text>
              <View className="ml-2">
                <Feather name="chevron-right" size={16} color="#212121" />
              </View>
            </TouchableOpacity>
          </View>

          {/* Cards Section */}
          <View>
            <View className="pl-4 mb-6">
              <Text
                className={`font-roboto-regular ${isBigScreen ? "text-[22px] mb-7" : isSmallScreen ? "text-[18px] mb-2" : "text-[20px] mb-6"} text-neutral-color-gray-900`}
              >
                Recomendados
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View>
                  <HomeCard onPress={toggleCard} />
                </View>
                <View>
                  <HomeCard onPress={toggleCard} />
                </View>
                <View>
                  <HomeCard onPress={toggleCard} />
                </View>
              </ScrollView>
            </View>
          </View>

          <View>
            <View className="pl-4 mb-6">
              <Text
                className={`font-roboto-regular ${isBigScreen ? "text-[22px] mb-7" : isSmallScreen ? "text-[18px] mb-2" : "text-[20px] mb-6"} text-neutral-color-gray-900`}
              >
                Animales
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View>
                  <HomeCard onPress={toggleCard} />
                </View>
                <View>
                  <HomeCard onPress={toggleCard} />
                </View>
                <View>
                  <HomeCard onPress={toggleCard} />
                </View>
              </ScrollView>
            </View>
          </View>
        </View>

        {isCardVisible && (
          <ProfileCard isCardVisible={isCardVisible} toggleCard={toggleCard} />
        )}

        {isFilterVisible && (
          <Modal
            animationType="fade"
            transparent={true}
            visible={isFilterVisible}
            onRequestClose={toggleFilter}
          >
            <View className="flex-1 items-end justify-center">
              <View
                className={`w-3/4 h-full bg-white px-4 ${isSmallScreen ? "py-6" : "py-16"} items-start justify-between border-l-[1px] border-neutral-color-blue-gray-50`}
              >
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  className="px-2 mb-2"
                >
                  {/* Header */}
                  <View className="w-full">
                    <View className="flex-row justify-between items-center mb-3">
                      <Text className="text-[20px] font-roboto-bold text-neutral-color-gray-900">
                        Filtros
                      </Text>
                      <Pressable onPress={toggleFilter}>
                        <MaterialIcons name="close" size={14} color="#212121" />
                      </Pressable>
                    </View>
                    <View className="w-[80%]">
                      <Text className="font-roboto-regular text-[14px] text-neutros-negro-80">
                        Personaliza la búsqueda para obtener mejores resultados.
                      </Text>
                    </View>
                  </View>

                  {/* Category Selection Section */}
                  <View className="mt-7">
                    <Text className="font-roboto-regular text-[20px] text-neutral-color-gray-900 mb-4">
                      Categoría
                    </Text>
                    <View className="gap-3 flex-grow-0">
                      <View>
                        <CustomDropdown
                          label={"Categorías"}
                          items={categories}
                        />
                      </View>
                      <View>
                        <CustomDropdown
                          label={"Ubicación (CP)"}
                          items={postalCodes}
                        />
                      </View>
                    </View>
                  </View>

                  {/* Mode Selection Section */}
                  <View className="w-full mt-4">
                    <Text className="font-roboto-regular text-[20px] w-2/3 text-neutral-color-gray-900">
                      Modalidad de Intercambio
                    </Text>
                    <View className="mt-4 w-full h-[35px] flex-row items-center justify-center rounded-md">
                      <TouchableOpacity
                        onPress={() => setSelected("Todos")}
                        className={`rounded-l-md h-full flex-1 items-center justify-center border-[1px] ${selected === "Todos"
                            ? "border-primarios-celeste-100"
                            : "border-[#b8b8b8] border-r-white"
                          }`}
                      >
                        <Text
                          className={`uppercase font-roboto-regular text-[14px] ${selected === "Todos"
                              ? "text-primarios-celeste-100"
                              : "text-neutros-negro"
                            }`}
                        >
                          Todos
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() => setSelected("Online")}
                        className={`flex-1 h-full items-center justify-center border-[1px]
                      ${selected === "Todos" ? "border-l-[0px]" : ""}
                      ${selected === "Online" ? "border-blue-500" : "border-[#b8b8b8]"}
                      ${selected === "Presencial" ? "border-r-white" : ""}`}
                      >
                        <Text
                          className={`uppercase font-roboto-regular text-[14px] ${selected === "Online"
                              ? "text-primarios-celeste-100"
                              : "text-neutros-negro"
                            }`}
                        >
                          Online
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => setSelected("Presencial")}
                        className={`rounded-r-md h-full flex-2 items-center justify-center px-2 border-[1px] ${selected === "Presencial"
                            ? "border-primarios-celeste-100"
                            : "border-[#b8b8b8] border-l-white"
                          }`}
                      >
                        <Text
                          className={`uppercase font-roboto-regular text-[14px] ${selected === "Presencial"
                              ? "text-primarios-celeste-100"
                              : "text-neutros-negro"
                            }`}
                        >
                          Presencial
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </ScrollView>

                {/* Button Set */}
                <View className="mt-3 flex-row w-full justify-between px-2">
                  <CustomButton
                    onPress={() => console.log("borrar filtros")}
                    title={"Borrar filtros"}
                    width="content"
                    variant="white"
                  />

                  <CustomButton
                    onPress={() => console.log("guardar")}
                    title={"Guardar"}
                    width="content"
                    variant="filled"
                  />
                </View>
              </View>
            </View>
          </Modal>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
