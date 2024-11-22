import * as SecureStore from "expo-secure-store";

export const saveToken = async (token) => {
  await SecureStore.setItemAsync("authToken", token);
};

export const getToken = async () => {
  return await SecureStore.getItemAsync("authToken");
};

export const removeToken = async () => {
  await SecureStore.deleteItemAsync("authToken");
};
