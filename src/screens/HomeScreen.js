import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Modal,
  Pressable,
  SafeAreaView,
} from "react-native";
import {
  LogoDark,
  HomeCard,
  CustomDropdown,
  CustomButton,
  ProfileCard,
} from "../components";
import { categories } from "../data/data";
import { getScreenSize } from "../utils/screenSize";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import apiClient from "../api/apiClient";

export default function HomeScreen() {
  const { isSmallScreen, isBigScreen } = getScreenSize();

  const [isFilterVisible, setFilterVisible] = useState(false);
  const [isCardVisible, setCardVisible] = useState(false);
  const [selected, setSelected] = useState(null);

  const [categoriesData, setCategoriesData] = useState([]);

  const fetchCategories = async () => {
    try {
      const dataPromises = categories.map(async (category) => {
        const response = await apiClient.get(
          `/hability/category-habilities/${category}`,
        );
        return { category, items: response.data };
      });

      const results = await Promise.all(dataPromises);
      setCategoriesData(results);
    } catch (error) {
      console.error("Error fetching category data:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchCategories();
    }, []),
  );

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
          className={`
            px-9 
            ${isBigScreen ? "my-7" : isSmallScreen ? "my-3" : "my-5"}
            `}
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
                  className="flex-1 h-full mr-4 mb-1 text-base font-roboto-regular text-neutros-negro"
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
            className={`
              px-4 flex-row justify-between items-center
              ${isBigScreen ? "my-7" : isSmallScreen ? "my-3" : "my-5"}
              `}
          >
            <Text
              className={`
                w-[222px] font-roboto-regular text-neutros-negro
                ${isBigScreen ? "text-[32px]" : isSmallScreen ? "text-[28px]" : "text-[30px]"}
                `}
            >
              Categorías y habilidades
            </Text>

            <TouchableOpacity
              onPress={toggleFilter}
              className="h-[36px] flex-row items-center justify-center rounded-lg"
            >
              <Text className="uppercase font-roboto-bold text-xs text-[#263238]">
                Filtros
              </Text>
              <View className="ml-2">
                <Feather name="chevron-right" size={16} color="#212121" />
              </View>
            </TouchableOpacity>
          </View>

          {/* Cards Section */}
          <View className="mb-12">
            {categoriesData.map((categoryData, index) => (
              <View key={index} className="pl-4 mb-6">
                <Text
                  className={`
              font-roboto-regular text-neutral-color-gray-900
              ${isBigScreen ? "text-[22px] mb-7" : isSmallScreen ? "text-lg mb-2" : "text-xl mb-6"}
            `}
                >
                  {categoryData.category}
                </Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View className="flex-row">
                    {categoryData.items.map((item, cardIndex) => (
                      <HomeCard
                        key={cardIndex}
                        data={item}
                        onPress={() => toggleCard(item)}
                      />
                    ))}
                  </View>
                </ScrollView>
              </View>
            ))}
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
                className={`
                  w-3/4 h-full bg-white px-4items-start justify-between border-l-[1px] border-neutral-color-blue-gray-50
                  ${isSmallScreen ? "py-6" : "py-16"}
                  `}
              >
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  className="px-6 mb-2"
                >
                  {/* Header */}
                  <View className="w-full">
                    <View className="flex-row justify-between items-center mb-3">
                      <Text className="text-xl font-roboto-bold text-neutral-color-gray-900">
                        Filtros
                      </Text>
                      <Pressable onPress={toggleFilter}>
                        <MaterialIcons name="close" size={14} color="#212121" />
                      </Pressable>
                    </View>
                    <View className="w-[80%]">
                      <Text className="font-roboto-regular text-sm text-neutros-negro-80">
                        Personaliza la búsqueda para obtener mejores resultados.
                      </Text>
                    </View>
                  </View>

                  {/* Category Selection Section */}
                  <View className="mt-7">
                    <Text className="font-roboto-regular text-xl text-neutral-color-gray-900 mb-4">
                      Categoría
                    </Text>
                    <View className="gap-3 flex-grow-0">
                      <View>
                        {/* <CustomDropdown
                          label={"Categorías"}
                          items={categories}
                          backgroundColor={"transparent"}
                        /> */}
                        <TextInput
                          placeholder="Categorías"
                          autoCapitalize="none"
                          className="bg-transparent border-[1px] border-neutros-negro-50 rounded-lg h-[40px] font-roboto-regular text-sm text-neutral-color-gray-900 px-3 pb-1"
                          placeholderTextColor={"#b8b8b8"}
                        />
                      </View>
                      <View>
                        <TextInput
                          placeholder="Ubicación (CP)"
                          autoCapitalize="none"
                          className="bg-transparent border-[1px] border-neutros-negro-50 rounded-lg h-[40px] font-roboto-regular text-sm text-neutral-color-gray-900 px-3 pb-1"
                          placeholderTextColor={"#b8b8b8"}
                        />
                      </View>
                    </View>
                  </View>

                  {/* Mode Selection Section */}
                  <View className="w-full mt-4">
                    <Text className="font-roboto-regular text-xl w-2/3 text-neutral-color-gray-900">
                      Modalidad de Intercambio
                    </Text>
                    <View className="mt-4 w-full h-[35px] flex-row items-center justify-center rounded-md">
                      <TouchableOpacity
                        onPress={() => setSelected("Todos")}
                        className={`
                          rounded-l-md h-full flex-1 items-center justify-center border-[1px] 
                          ${selected === "Todos"
                            ? "border-primarios-celeste-100"
                            : "border-[#b8b8b8] border-r-white"
                          }
                          `}
                      >
                        <Text
                          className={`
                            uppercase font-roboto-regular text-sm 
                            ${selected === "Todos"
                              ? "text-primarios-celeste-100"
                              : "text-neutros-negro"
                            }
                            `}
                        >
                          Todos
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() => setSelected("Online")}
                        className={`
                          flex-1 h-full items-center justify-center border-[1px]
                          ${selected === "Todos" ? "border-l-[0px]" : ""}
                          ${selected === "Online" ? "border-blue-500" : "border-[#b8b8b8]"}
                          ${selected === "Presencial" ? "border-r-white" : ""}
                          `}
                      >
                        <Text
                          className={`
                            uppercase font-roboto-regular text-sm 
                            ${selected === "Online"
                              ? "text-primarios-celeste-100"
                              : "text-neutros-negro"
                            }
                            `}
                        >
                          Online
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => setSelected("Presencial")}
                        className={`
                          rounded-r-md h-full flex-2 items-center justify-center px-2 border-[1px] 
                          ${selected === "Presencial"
                            ? "border-primarios-celeste-100"
                            : "border-[#b8b8b8] border-l-white"
                          }
                          `}
                      >
                        <Text
                          className={`
                            uppercase font-roboto-regular text-sm 
                            ${selected === "Presencial"
                              ? "text-primarios-celeste-100"
                              : "text-neutros-negro"
                            }
                            `}
                        >
                          Presencial
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </ScrollView>

                {/* Button Set */}
                <View className="mt-3 flex-row w-full justify-between px-6">
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
