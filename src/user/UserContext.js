import { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  const USER_STORAGE_KEY = "userData";

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem(USER_STORAGE_KEY);
        if (storedUserData) {
          const parsedData = JSON.parse(storedUserData);
          console.log("Loaded user data from AsyncStorage:", parsedData);
          setUserData(parsedData);
        } else {
          console.log("No user data found in AsyncStorage.");
        }
      } catch (error) {
        console.error("Error loading user data from AsyncStorage:", error);
      }
    };

    loadUserData();
  }, []);

  useEffect(() => {
    const saveUserData = async () => {
      if (userData) {
        try {
          console.log("Saving user data to AsyncStorage:", userData);
          await AsyncStorage.setItem(
            USER_STORAGE_KEY,
            JSON.stringify(userData),
          );
        } catch (error) {
          console.error("Error saving user data to AsyncStorage:", error);
        }
      }
    };

    saveUserData();
  }, [userData]);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
