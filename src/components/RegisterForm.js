import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { View, Text, Linking, TextInput } from "react-native";
import { ToggleSwitch } from "./ToggleSwitch";
import { CustomCheckbox } from "./CustomCheckbox";
import { CustomButton } from "./CustomButton";
import { generateRandomCode } from "../utils/twoFaCodeGenerator";
import { getScreenSize } from "../utils/screenSize";
import apiClient from "../api/apiClient";

export const RegisterForm = ({ navigation }) => {
  const { isSmallScreen, isBigScreen } = getScreenSize();

  const countryCode = "🇪🇸  +34";
  const [acceptTermsAndConditions, setAcceptTermsAndConditions] =
    useState(false);

  const [isNameUserFocused, setIsNameUserFocused] = useState(false);
  const [isSurnameUserFocused, setIsSurnameUserFocused] = useState(false);
  const [isSurnameTwoFocused, setIsSurnameTwoFocused] = useState(false);
  const [isPhoneFocused, setIsPhoneFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (!acceptTermsAndConditions) {
      alert("Debes aceptar los términos y condiciones.");
      return;
    }

    const twoFaCode = await generateRandomCode();

    const payload = {
      email: data.email,
      password: data.password,
      nameUser: data.nameUser,
      surnameUser: data.surnameUser,
      phone: data.phone,
      optionCall: data.optionCall,
      showPhone: false,
      blocked: false,
      twoFa: twoFaCode,
      role: "user",
    };

    try {
      await apiClient.post("/email-service/emailAcount", payload);
      navigation.navigate("EmailVerification", { ...data, twoFa: twoFaCode });
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

  return (
    <View>
      <Text
        className={`
          font-roboto-regular text-[24px] text-neutros-negro 
          ${isSmallScreen ? "mt-4 mb-2" : "my-5"}
          `}
      >
        Registro
      </Text>

      <View className={`${isSmallScreen ? "mb-3" : "mb-4"}`}>
        <Controller
          control={control}
          name="nameUser"
          rules={{ required: "Nombre es obligatorio" }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onBlur={() => {
                setIsNameUserFocused(false);
                onBlur();
              }}
              onFocus={() => setIsNameUserFocused(true)}
              onChangeText={onChange}
              value={value}
              placeholder="Nombre"
              className={`
                bg-transparent border-[1px] rounded-lg h-[40px] font-roboto-regular text-sm text-neutral-color-gray-900 px-3 pb-1 
                ${errors.nameUser ? "border-red-error" : "border-neutral-color-blue-gray-100"}
                ${isNameUserFocused ? "border-[#455A64]" : ""}
                `}
              placeholderTextColor={isNameUserFocused ? "#212121" : "#90a3ae"}
            />
          )}
        />
      </View>

      <View className={`${isSmallScreen ? "mb-3" : "mb-4"}`}>
        <Controller
          control={control}
          name="surnameUser"
          rules={{ required: "Apellido es obligatorio" }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onBlur={() => {
                setIsSurnameUserFocused(false);
                onBlur();
              }}
              onFocus={() => setIsSurnameUserFocused(true)}
              onChangeText={onChange}
              value={value}
              placeholder="Apellido 1"
              className={`
                bg-transparent border-[1px] rounded-lg h-[40px] font-roboto-regular text-sm text-neutral-color-gray-900 px-3 pb-1 
                ${errors.surnameUser ? "border-red-error" : "border-neutral-color-blue-gray-100"}
                ${isSurnameUserFocused ? "border-[#455A64]" : ""}
                `}
              placeholderTextColor={
                isSurnameUserFocused ? "#212121" : "#90a3ae"
              }
            />
          )}
        />
      </View>

      <View className={`${isSmallScreen ? "mb-3" : "mb-4"}`}>
        <Controller
          control={control}
          name="surnameTwo"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onBlur={() => {
                setIsSurnameTwoFocused(false);
                onBlur();
              }}
              onFocus={() => setIsSurnameTwoFocused(true)}
              onChangeText={onChange}
              value={value}
              placeholder="Apellido 2 (opcional)"
              className="border border-neutral-color-blue-gray-100 bg-transparent border-[1px] focus:border-[#455A64] rounded-lg h-[40px] font-roboto-regular text-sm text-neutral-color-gray-900 px-3 pb-1"
              placeholderTextColor={isSurnameTwoFocused ? "#212121" : "#90a3ae"}
            />
          )}
        />
      </View>

      {/* Phone Input */}
      <Controller
        control={control}
        name="phone"
        rules={{
          required: "El número de móvil es obligatorio",
          pattern: {
            value: /^[0-9]{9}$/,
            message: "El móvil debe tener solo números y 9 dígitos",
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <View className={`${isSmallScreen ? "mb-3" : "mb-4"} gap-2`}>
            <View
              className={`
                flex-row items-center border-[1px] rounded-lg h-[40px] bg-transparent 
                ${isPhoneFocused ? "border-[#455A64]" : errors.phone ? "border-red-error" : "border-neutral-color-blue-gray-100"}
                `}
            >
              <View className="flex-row items-center pl-3">
                <Text
                  className={`
                    text-xs font-roboto-medium pr-1 pt-0.5 
                    ${isPhoneFocused ? "color-neutral-color-gray-900" : "color-neutral-color-blue-gray-300"}
                    `}
                >
                  {countryCode}
                </Text>
              </View>
              <View
                className={`w-[1px] h-[25px] ml-2 ${isPhoneFocused ? "bg-neutral-color-gray-900" : "bg-neutral-color-blue-gray-100"}`}
              />
              <TextInput
                value={value}
                onChangeText={onChange}
                placeholder="Móvil"
                keyboardType="phone-pad"
                onFocus={() => setIsPhoneFocused(true)}
                onBlur={() => {
                  setIsPhoneFocused(false);
                  onBlur();
                }}
                placeholderTextColor={isPhoneFocused ? "#212121" : "#90a3ae"}
                className="flex-1 text-sm font-roboto-regular bg-transparent px-3 pb-1 text-neutral-color-gray-900"
              />
            </View>
          </View>
        )}
      />

      <View className={`${isSmallScreen ? "mb-3" : "mb-4"}`}>
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
                bg-transparent border-[1px] rounded-lg h-[40px] font-roboto-regular text-sm text-neutral-color-gray-900 px-3 pb-1 
                ${errors.email ? "border-red-error" : "border-neutral-color-blue-gray-100"}
                ${isEmailFocused ? "border-[#455A64]" : ""}
                `}
              placeholderTextColor={isEmailFocused ? "#212121" : "#90a3ae"}
            />
          )}
        />
      </View>

      <View className="mb-2">
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
              placeholder="Contraseña"
              className={`
                bg-transparent border-[1px] rounded-lg h-[40px] font-roboto-regular text-sm text-neutral-color-gray-900 px-3 pb-1 
                ${errors.password ? "border-red-error" : "border-neutral-color-blue-gray-100"}
                ${isPasswordFocused ? "border-[#455A64]" : ""}
                `}
              placeholderTextColor={isPasswordFocused ? "#212121" : "#90a3ae"}
              secureTextEntry
            />
          )}
        />
      </View>

      <Text
        className={`
    font-roboto-regular text-xs 
    ${isSmallScreen ? "mb-3" : "mb-5"}
    ${errors.password ? "text-red-error" : "text-neutros-negro-80"}
          `}
      >
        La contraseña debe incluir al menos 6 caracteres, una letra mayúscula,
        un carácter especial (ej: @) y un número.
      </Text>

      {/* ToggleSwitch */}
      <Controller
        control={control}
        name="optionCall"
        defaultValue={false}
        render={({ field: { onChange, value } }) => (
          <View className="flex-row items-center">
            <View className="mr-2">
              <ToggleSwitch
                isEnabled={value}
                onToggle={(newValue) => onChange(newValue)}
              />
            </View>
            <View>
              <Text className="text-neutros-negro font-roboto-medium font-base">
                Activar la opción de llamada
              </Text>
              <Text className="text-neutros-negro-80 font-roboto-regular font-sm">
                Mostrar teléfono al iniciar intercambio
              </Text>
            </View>
          </View>
        )}
      />

      <View
        className={`${isBigScreen ? "mt-5 mb-[100px]" : isSmallScreen ? "my-2" : "my-5"}`}
      >
        <CustomCheckbox
          isChecked={acceptTermsAndConditions}
          onPress={() => setAcceptTermsAndConditions(!acceptTermsAndConditions)}
          label="Estoy de acuerdo con sus"
          labelLink="Términos de servicio y Política de privacidad"
          onLinkPress={() => Linking.openURL("https://www.google.com")}
        />
      </View>
      <CustomButton onPress={handleSubmit(onSubmit)} title="Registrarse" />
    </View>
  );
};
