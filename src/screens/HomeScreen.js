import { useState, useCallback, useEffect } from "react";
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
  CreateProfileWarning,
} from "../components";
import { categories } from "../data/data";
import { getScreenSize } from "../utils/screenSize";
import { useUser } from "../user/UserContext";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import apiClient from "../api/apiClient";

export default function HomeScreen({ navigation }) {
  const { isSmallScreen, isBigScreen } = getScreenSize();

  const { userData, setUserData } = useUser();
  const user_id = userData?._id;
  const [isCreateProfileWarningVisible, setCreateProfileWarningVisible] =
    useState(false);

  const [isFilterVisible, setFilterVisible] = useState(false);
  const [isCardVisible, setCardVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [categoriesData, setCategoriesData] = useState([]);
  const [filteredCategoriesData, setFilteredCategoriesData] = useState([]);

  const [filterCategory, setFilterCategory] = useState([]);
  const [filterPostalCode, setFilterPostalCode] = useState("");
  const [filterMode, setFilterMode] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");

  const emailUser = userData?.email;

  const handleLogout = () => {
    try {
      navigation.navigate("Login");
      console.log("Data cleared and logged out.");
    } catch (error) {
      console.error("Error clearing data during logout:", error);
    }
  };

  const toggleCreateProfileWarning = () => {
    setCreateProfileWarningVisible((prev) => !prev);
  };

  const fetchProfile = async () => {
    try {
      const response = await apiClient.get("/profile");
      if (response.status === 200) {
        setCreateProfileWarningVisible(false);
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
      setFilteredCategoriesData(results);
    } catch (error) {
      console.error("Error fetching category data:", error);
    }
  };

  const fetchUser = async (email) => {
    try {
      const response = await apiClient.get(`/user/${email}`);
      setUserData((prevData) => ({
        ...prevData,
        ...response.data[0],
      }));
    } catch (error) {
      if (error.response) {
        console.error(error.response.data.message);
        alert("Se ha producido un error, intenta de nuevo.");
      } else {
        console.error(error.message);
        alert("Se ha producido un error, intenta de nuevo.");
      }
    }
  };

  const fetchProfileData = async (userId) => {
    try {
      const response = await apiClient.get(`/profile/byUserId/${userId}`);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.warn(`Profile not found for userId: ${userId}`);
      } else {
        console.error(
          `Error fetching profile for userId ${userId}: ${error.message}`,
        );
      }
      return null;
    }
  };

  const applyFilters = async () => {
    const filteredDataPromises = categoriesData.map(async (categoryData) => {
      const filteredItemsPromises = categoryData.items.map(async (item) => {
        const matchesCategory =
          filterCategory.length === 0 ||
          filterCategory.some((cat) => item.category.includes(cat));

        let matchesLocation = true;
        if (item.mode === "Presencial" && filterPostalCode) {
          const profileData = await fetchProfileData(item.user_id);
          if (profileData) {
            matchesLocation = profileData.location === filterPostalCode;
          } else {
            matchesLocation = false;
          }
        }

        const matchesMode = filterMode === "Todos" || item.mode === filterMode;

        return matchesCategory && matchesLocation && matchesMode ? item : null;
      });

      const filteredItems = await Promise.all(filteredItemsPromises);
      return { ...categoryData, items: filteredItems.filter(Boolean) };
    });

    const filteredData = await Promise.all(filteredDataPromises);
    setFilteredCategoriesData(filteredData);
    toggleFilter();
  };

  const searchByTitleQuery = () => {
    if (!searchQuery.trim()) {
      setFilteredCategoriesData(categoriesData);
      return;
    }

    const filteredData = categoriesData.map((categoryData) => {
      const filteredItems = categoryData.items.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()),
      );

      return { ...categoryData, items: filteredItems };
    });

    setFilteredCategoriesData(
      filteredData.filter((cat) => cat.items.length > 0),
    );
  };

  useEffect(() => {
    fetchUser(emailUser);
  }, [emailUser]);

  useEffect(() => {
    if (user_id) fetchProfile();
  }, [user_id]);

  useEffect(() => {
    searchByTitleQuery();
  }, [searchQuery]);

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

  const handleCardPress = (item) => {
    setSelectedItem(item);
    toggleCard();
  };

  return (
    <SafeAreaView className="flex-1 bg-neutros-gris-fondo">
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1 bg-neutros-gris-fondo"
      >
        <View
          className={`
            px-9 flex-row justify-between items-center 
            ${isBigScreen ? "my-7" : isSmallScreen ? "my-3" : "my-5"}
            `}
        >
          <LogoDark />
          <TouchableOpacity onPress={handleLogout}>
            <MaterialIcons name="logout" size={24} color="black" />
          </TouchableOpacity>
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
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
              </View>
              <TouchableOpacity onPress={searchByTitleQuery}>
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
            {filteredCategoriesData
              .filter((categoryData) => categoryData.items.length > 0)
              .map((categoryData, index) => (
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
                      {categoryData.items
                        .filter((item) => item.user_id !== userData?._id)
                        .map((item) => (
                          <HomeCard
                            key={item.description}
                            data={item}
                            onPress={() => handleCardPress(item)}
                          />
                        ))}
                    </View>
                  </ScrollView>
                </View>
              ))}
          </View>
        </View>

        {isCreateProfileWarningVisible && (
          <CreateProfileWarning
            isVisible={isCreateProfileWarningVisible}
            onClose={() => navigation.navigate("CreateProfileFlow")}
          />
        )}

        {isCardVisible && selectedItem && (
          <ProfileCard
            isCardVisible={isCardVisible}
            toggleCard={toggleCard}
            data={selectedItem}
          />
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
                  <View className="w-full">
                    <View className="flex-row justify-between items-center mb-3">
                      <Text className="text-xl font-roboto-bold text-neutral-color-gray-900">
                        Filtros
                      </Text>
                      <Pressable onPress={toggleFilter}>
                        <MaterialIcons name="close" size={14} color="#212121" />
                      </Pressable>
                    </View>
                  </View>

                  {/* Filter Inputs */}
                  <View className="mt-7">
                    <CustomDropdown
                      label="Categorías"
                      items={categories}
                      backgroundColor="bg-transparent"
                      selectedItems={filterCategory}
                      onItemsChange={setFilterCategory}
                    />
                    <TextInput
                      placeholder="Ubicación (CP)"
                      value={filterPostalCode}
                      onChangeText={setFilterPostalCode}
                      className="bg-transparent border-[1px] border-neutros-negro-50 rounded-lg h-[40px] mt-3 pb-1 px-3 text-base font-roboto-regular text-neutros-negro-80"
                      placeholderTextColor="#696868"
                    />
                  </View>

                  {/* Mode Selection */}
                  <View className="w-full mt-4">
                    <Text className="font-roboto-regular text-xl w-2/3 text-neutral-color-gray-900">
                      Modalidad de Intercambio
                    </Text>
                    <View className="mt-4 w-full h-[35px] flex-row items-center justify-center rounded-md">
                      <TouchableOpacity
                        onPress={() => setFilterMode("Todos")}
                        className={`
                          rounded-l-md h-full flex-1 items-center justify-center border-[1px] 
                          ${filterMode === "Todos"
                            ? "border-primarios-celeste-100"
                            : "border-[#b8b8b8] border-r-white"
                          }
                          `}
                      >
                        <Text
                          className={`
                            uppercase font-roboto-regular text-sm
                            ${filterMode === "Todos"
                              ? "text-primarios-celeste-100"
                              : "text-neutros-negro"
                            }
                          `}
                        >
                          Todos
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => setFilterMode("Online")}
                        className={`
                          flex-1 h-full items-center justify-center border-[1px] 
                          ${filterMode === "Todos" ? "border-l-[0px]" : ""}
                          ${filterMode === "Online" ? "border-blue-500" : "border-[#b8b8b8]"}
                          ${filterMode === "Presencial" ? "border-r-white" : ""}
                          `}
                      >
                        <Text
                          className={`
                            uppercase font-roboto-regular text-sm
                            ${filterMode === "Online"
                              ? "text-primarios-celeste-100"
                              : "text-neutros-negro"
                            }
                          `}
                        >
                          Online
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => setFilterMode("Presencial")}
                        className={`
                          rounded-r-md h-full flex-2 items-center justify-center border-[1px] px-2 
                          ${filterMode === "Presencial" ? "border-primarios-celeste-100" : "border-[#b8b8b8] border-l-white"}
                          `}
                      >
                        <Text
                          className={`
                            uppercase font-roboto-regular text-sm
                            ${filterMode === "Presencial"
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
                    onPress={() => {
                      setFilterCategory("");
                      setFilterPostalCode("");
                      setFilterMode("Todos");
                      setFilteredCategoriesData(categoriesData);
                    }}
                    title={"Borrar filtros"}
                    width="content"
                    variant="white"
                  />

                  <CustomButton
                    onPress={applyFilters}
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
