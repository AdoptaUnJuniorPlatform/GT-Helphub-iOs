import apiClient from "../api/apiClient";

export const fetchProfileImage = async (userId) => {
  try {
    const response = await apiClient.get(
      `/upload-service/profile-imageByUser/${userId}`,
      { responseType: "blob" },
    );
    const imageUrl = URL.createObjectURL(response.data);
    return imageUrl;
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
