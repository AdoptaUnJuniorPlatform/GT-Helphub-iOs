import { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AbilityContext = createContext();

export const AbilityProvider = ({ children }) => {
  const [abilityData, setAbilityData] = useState({});

  const ABILITY_STORAGE_KEY = "abilityData";

  useEffect(() => {
    const loadAbilityData = async () => {
      try {
        const storedAbilityData =
          await AsyncStorage.getItem(ABILITY_STORAGE_KEY);
        if (storedAbilityData) {
          setAbilityData(JSON.parse(storedAbilityData));
        }
      } catch (error) {
        console.error("Error loading ability data from AsyncStorage:", error);
      }
    };

    loadAbilityData();
  }, []);

  useEffect(() => {
    const saveAbilityData = async () => {
      try {
        await AsyncStorage.setItem(
          ABILITY_STORAGE_KEY,
          JSON.stringify(abilityData),
        );
      } catch (error) {
        console.error("Error saving ability data to AsyncStorage:", error);
      }
    };

    if (abilityData) {
      saveAbilityData();
    }
  }, [abilityData]);

  return (
    <AbilityContext.Provider value={{ abilityData, setAbilityData }}>
      {children}
    </AbilityContext.Provider>
  );
};

export const useAbility = () => useContext(AbilityContext);
