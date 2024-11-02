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
          setProfileData(JSON.parse(storedProfileData));
        }
      } catch (error) {
        console.error("Error loading profile data from AsyncStorage:", error);
      }
    };

    loadProfileData();
  }, []);

  useEffect(() => {
    const saveProfileData = async () => {
      try {
        await AsyncStorage.setItem(
          PROFILE_STORAGE_KEY,
          JSON.stringify(profileData),
        );
      } catch (error) {
        console.error("Error saving profile data to AsyncStorage:", error);
      }
    };

    if (profileData) {
      saveProfileData();
    }
  }, [profileData]);

  return (
    <ProfileContext.Provider value={{ profileData, setProfileData }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
