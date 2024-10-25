/* eslint-disable prettier/prettier */
import { useState } from "react";
import { View, Text, Linking, TextInput, Dimensions } from "react-native";
import ToggleSwitch from "../ToggleSwitch";
import CustomCheckbox from "../CustomCheckbox";
import CustomButton from "../CustomButton";

const { width } = Dimensions.get("window");

const RegisterForm = ({ navigation }) => {
  const isSmallScreen = width <= 392;
  const isBigScreen = width >= 430;

  const countryCode = "🇪🇸  +34";

  const [name, setName] = useState("");
  const [surnameOne, setSurnameOne] = useState("");
  const [surnameTwo, setSurnameTwo] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEnabled, setIsEnabled] = useState(false);
  const [acceptTermsAndConditions, setAcceptTermsAndConditions] =
    useState(false);

  const [isNameFocused, setIsNameFocused] = useState(false);
  const [isSurnameOneFocused, setIsSurnameOneFocused] = useState(false);
  const [isSurnameTwoFocused, setIsSurnameTwoFocused] = useState(false);
  const [isPhoneNumberFocused, setIsPhoneNumberFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const onSubmit = () => {
    if (!acceptTermsAndConditions) {
      alert("Debes aceptar los términos y condiciones.");
      return;
    }
    navigation.navigate("EmailVerification");
  };

  return (
    <View>
      <Text className={`font-roboto-regular text-[24px] text-neutros-negro ${isSmallScreen ? "mt-4 mb-2" : "my-[20px]"}`}>
        Registro
      </Text>

      <View className={`${isSmallScreen ? "mb-3" : "mb-4"}`}>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Nombre"
          keyboardType="default"
          className="bg-transparent border-[1px] border-neutral-color-blue-gray-100 focus:border-[#455A64] rounded-[8px] h-[40px] font-roboto-regular text-[14px] text-neutral-color-gray-900 p-3"
          placeholderTextColor={isNameFocused ? "#212121" : "#90A4AE"}
          onFocus={() => setIsNameFocused(true)}
          onBlur={() => setIsNameFocused(false)}
        />
      </View>

      <View className={`${isSmallScreen ? "mb-3" : "mb-4"}`}>
        <TextInput
          value={surnameOne}
          onChangeText={setSurnameOne}
          placeholder="Apellido 1"
          keyboardType="default"
          className="bg-transparent border-[1px] border-neutral-color-blue-gray-100 focus:border-[#455A64] rounded-[8px] h-[40px] font-roboto-regular text-[14px] text-neutral-color-gray-900 p-3"
          placeholderTextColor={isSurnameOneFocused ? "#212121" : "#90A4AE"}
          onFocus={() => setIsSurnameOneFocused(true)}
          onBlur={() => setIsSurnameOneFocused(false)}
        />
      </View>

      <View className={`${isSmallScreen ? "mb-3" : "mb-4"}`}>
        <TextInput
          value={surnameTwo}
          onChangeText={setSurnameTwo}
          placeholder="Apellido 2 (opcional)"
          keyboardType="default"
          className="bg-transparent border-[1px] border-neutral-color-blue-gray-100 focus:border-[#455A64] rounded-[8px] h-[40px] font-roboto-regular text-[14px] text-neutral-color-gray-900 p-3"
          placeholderTextColor={isSurnameTwoFocused ? "#212121" : "#90A4AE"}
          onFocus={() => setIsSurnameTwoFocused(true)}
          onBlur={() => setIsSurnameTwoFocused(false)}
        />
      </View>

      {/* Phone Input */}
      <View className={`${isSmallScreen ? "mb-3" : "mb-4"} gap-2`}>
        <View
          className={`flex-row items-center border-[1px] ${isPhoneNumberFocused ? "border-[#455A64]" : "border-neutral-color-blue-gray-100"} rounded-[8px] h-[40px] bg-transparent`}
        >
          <View className="flex-row items-center pl-3">
            <Text
              className={`text-[12px] font-roboto-medium ${isPhoneNumberFocused ? "color-neutral-color-gray-900" : "color-neutral-color-blue-gray-300"} pr-1`}
            >
              {countryCode}
            </Text>
          </View>

          <View
            className={`w-[1px] h-[25px] ${isPhoneNumberFocused ? "bg-neutral-color-gray-900" : "bg-neutral-color-blue-gray-100"} ml-2`}
          />

          <TextInput
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder="Móvil"
            className="flex-1 text-[14px] font-roboto-regular text-neutral-color-blue-gray-300 bg-transparent p-3"
            placeholderTextColor={isPhoneNumberFocused ? "#212121" : "#90a3ae"}
            keyboardType="phone-pad"
            onFocus={() => setIsPhoneNumberFocused(true)}
            onBlur={() => setIsPhoneNumberFocused(false)}
          />
        </View>
      </View>

      <View className={`${isSmallScreen ? "mb-3" : "mb-4"}`}>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          keyboardType="email-address"
          className="bg-transparent border-[1px] border-neutral-color-blue-gray-100 focus:border-[#455A64] rounded-[8px] h-[40px] font-roboto-regular text-[14px] text-neutral-color-gray-900 p-3"
          placeholderTextColor={isEmailFocused ? "#212121" : "#90A4AE"}
          onFocus={() => setIsEmailFocused(true)}
          onBlur={() => setIsEmailFocused(false)}
        />
      </View>

      <View className="mb-2">
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Contraseña"
          keyboardType="default"
          className="bg-transparent border-[1px] border-neutral-color-blue-gray-100 focus:border-[#455A64] rounded-[8px] h-[40px] font-roboto-regular text-[14px] text-neutral-color-gray-900 p-3"
          placeholderTextColor={isPasswordFocused ? "#212121" : "#90A4AE"}
          onFocus={() => setIsPasswordFocused(true)}
          onBlur={() => setIsPasswordFocused(false)}
        />
      </View>

      <Text className={`text-neutros-negro-80 font-roboto-regular text-[12px] ${isSmallScreen ? "mb-3" : "mb-5"}`}>
        La contraseña debe incluir al menos 12 caracteres, una letra mayúscula y
        un número.
      </Text>

      {/* ToggleSwitch */}
      <View className="flex-row items-center">
        <View className="mr-2">
          <ToggleSwitch isEnabled={isEnabled} onToggle={setIsEnabled} />
        </View>
        <View>
          <Text className="text-neutros-negro font-roboto-medium font-[16px]">
            Activar la opción de llamada
          </Text>
          <Text className="text-neutros-negro-80 font-roboto-regular font-[14px]">
            Mostrar teléfono al iniciar intercambio
          </Text>
        </View>
      </View>

      <View className={`${isBigScreen ? "mt-5 mb-[100px]" : isSmallScreen ? "my-2" : "my-5"}`}>
        <CustomCheckbox
          isChecked={acceptTermsAndConditions}
          onPress={() => setAcceptTermsAndConditions(!acceptTermsAndConditions)}
          label="Estoy de acuerdo con sus"
          labelLink="Términos de servicio y Política de privacidad"
          onLinkPress={() => Linking.openURL("https://www.google.com")}
        />
      </View>
      <CustomButton onPress={onSubmit} title="Registrarse" />
    </View >
  );
};

export default RegisterForm;
