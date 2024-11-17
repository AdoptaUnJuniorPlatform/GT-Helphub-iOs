import { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profileData, setProfileData] = useState({});

  const PROFILE_STORAGE_KEY = "profileData";

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const storedProfileData =
          await AsyncStorage.getItem(PROFILE_STORAGE_KEY);
        if (storedProfileData) {
          const parsedData = JSON.parse(storedProfileData);
          console.log("Loaded profile data from AsyncStorage:", parsedData);
          setProfileData(parsedData);
        } else {
          console.log("No profile data found in AsyncStorage.");
        }
      } catch (error) {
        console.error("Error loading profile data from AsyncStorage:", error);
      }
    };

    loadProfileData();
  }, []);

  useEffect(() => {
    const saveProfileData = async () => {
      if (profileData) {
        try {
          console.log("Saving profile data to AsyncStorage:", profileData);
          await AsyncStorage.setItem(
            PROFILE_STORAGE_KEY,
            JSON.stringify(profileData),
          );
        } catch (error) {
          console.error("Error saving profile data to AsyncStorage:", error);
        }
      }
    };

    saveProfileData();
  }, [profileData]);

  return (
    <ProfileContext.Provider value={{ profileData, setProfileData }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
