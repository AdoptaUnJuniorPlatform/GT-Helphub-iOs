import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useAuth } from "../auth/authContext";
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { LogoLight } from "../components";
import { getScreenSize } from "../utils/screenSize";
import { useUser } from "../user/UserContext";
import Feather from "@expo/vector-icons/Feather";

export default function LoginScreen({ navigation }) {
  const { isSmallScreen } = getScreenSize();

  const { setUserData } = useUser();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { login } = useAuth();

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      setUserData(data);
      navigation.navigate("SessionStartVerification", { ...data });
    } catch (error) {
      console.log("Error: " + error.message);
      alert("Se ha producido un error, intenta de nuevo.");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-neutros-gris-fondo">
      <View className="flex-1 bg-neutros-gris-fondo">
        <View className="bg-primarios-violeta-100 w-full items-center py-[30px] mb-5 rounded-b-3xl">
          <LogoLight />
        </View>

        <View
          className={`
          flex-1 px-4 
          ${isSmallScreen ? "pb-4" : "pb-8"}
          `}
        >
          <Text className="text-primarios-violeta-100 text-2xl font-roboto-regular mt-[30px] mb-5">
            Inicia Sesión
          </Text>

          <View className="flex-1">
            <View className="mb-2">
              <View className="mb-4">
                <Text className="font-poppins-medium text-sm text-neutros-negro-80 mb-2">
                  Email
                </Text>
                <Controller
                  control={control}
                  name="email"
                  rules={{
                    required: "Email es obligatorio",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Debe ser un correo válido",
                    },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      onBlur={() => {
                        setIsEmailFocused(false);
                        onBlur();
                      }}
                      onFocus={() => setIsEmailFocused(true)}
                      onChangeText={onChange}
                      value={value}
                      placeholder="Email"
                      autoCapitalize="none"
                      className={`
                bg-[#E3E0F6] border-[1px] focus:border-[#455A64] rounded-lg h-[40px] font-roboto-regular text-sm text-neutral-color-gray-900 px-3 pb-1 
                ${isEmailFocused ? "border-[#455A64]" : errors.email ? "border-red-error" : "border-neutral-color-blue-gray-100"}`}
                      placeholderTextColor={
                        isEmailFocused ? "#212121" : "#696868"
                      }
                    />
                  )}
                />
              </View>

              <View className="gap-2 mb-4">
                <View className="flex-row items-center justify-between">
                  <Text className="font-poppins-medium text-[14px] text-neutros-negro-80">
                    Contraseña
                  </Text>
                  <TouchableOpacity>
                    <Text
                      onPress={() => navigation.navigate("ResetPasswordFlow")}
                      className="text-primarios-celeste-100 font-roboto-medium text-sm underline"
                    >
                      ¿Ha olvidado su contraseña?
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  className={`
                relative border-[1px] focus:border-[#455A64] rounded-lg h-[40px] bg-[#E3E0F6] flex-row items-center justify-between
                ${isPasswordFocused ? "border-[#455A64]" : errors.password ? "border-red-error" : "border-neutral-color-blue-gray-100"}
                `}
                >
                  <Controller
                    control={control}
                    name="password"
                    rules={{
                      required: "Contraseña es obligatoria",
                      pattern: {
                        value:
                          /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/,
                        message:
                          "Debe tener al menos una mayúscula, un número, un símbolo y 6 caracteres",
                      },
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        onBlur={() => {
                          setIsPasswordFocused(false);
                          onBlur();
                        }}
                        onFocus={() => setIsPasswordFocused(true)}
                        onChangeText={onChange}
                        value={value}
                        placeholder="********"
                        secureTextEntry={!isPasswordVisible}
                        className={`
                w-full flex-shrink rounded-[8px] h-[40px] font-roboto-regular text-sm text-neutral-color-gray-900 px-3 pb-1
                ${errors.password ? "border-red-error" : "border-neutral-color-blue-gray-100"}`}
                        placeholderTextColor={
                          isPasswordFocused ? "#212121" : "#696868"
                        }
                      />
                    )}
                  />
                  <TouchableOpacity
                    className="px-3"
                    onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                  >
                    <Feather
                      name={isPasswordVisible ? "eye" : "eye-off"}
                      size={20}
                      color={isPasswordFocused ? "#212121" : "#90a3ae"}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          <TouchableOpacity
            className="h-[36px] items-center justify-center rounded-lg w-full bg-primarios-violeta-100"
            onPress={handleSubmit(onSubmit)}
          >
            <Text className="font-roboto-bold text-xs uppercase text-white">
              Inicia Sesión
            </Text>
          </TouchableOpacity>

          <View className="flex-row gap-1 justify-center mt-3">
            <Text className="text-neutros-negro-80 font-roboto-medium text-sm">
              ¿No tienes una cuenta?
            </Text>
            <TouchableOpacity>
              <Text
                onPress={() => navigation.navigate("RegisterFlow")}
                className="text-primarios-celeste-100 font-roboto-medium text-sm underline"
              >
                Registrarse
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
