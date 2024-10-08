import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Linking,
  TouchableOpacity,
  TextInput,
  Animated,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import InfoIconWithTooltip from "./InfoIconWithTooltip";

const RegisterForm = ({ navigation }) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [acceptTermsAndConditions, setAcceptTermsAndConditions] =
    useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  const animatedValue = useRef(new Animated.Value(0)).current;

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);

    Animated.timing(animatedValue, {
      toValue: isEnabled ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["#ECEFF1", "#3F51B5"],
  });

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-1, 18],
  });

  const onSubmit = () => {
    if (!acceptTermsAndConditions) {
      alert("Debes aceptar los términos y condiciones.");
      return;
    }

    console.log({ name, surname, phoneNumber, countryCode, email, password });

    navigation.navigate("RegisterStep1");
  };

  return (
    <View>
      {/* Header */}
      <Text className="font-roboto-regular text-h5 text-neutros-negro my-[20px]">
        Registro
      </Text>
      {/* Text Input */}
      <View className="gap-2 mb-4">
        <Text className="text-neutral-color-blue-gray-900 font-poppins-medium text-[14px]">
          Nombre
        </Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Name"
          className="border-[1px] border-neutral-color-blue-gray-100 rounded-[8px] h-[40px] bg-transparent font-roboto-regular text-[14px] text-[#90A4AE] p-3"
          placeholderTextColor="neutral-color-blue-gray-300"
        />
      </View>
      {/* Text Input */}
      <View className="gap-2 mb-4">
        <Text className="text-neutral-color-blue-gray-900 font-poppins-medium text-[14px]">
          Apellidos
        </Text>
        <TextInput
          value={surname}
          onChangeText={setSurname}
          placeholder="Apellido 1"
          className="border-[1px] border-neutral-color-blue-gray-100 rounded-[8px] h-[40px] bg-transparent text-[14px] font-roboto-regular text-[#90A4AE] p-3"
          placeholderTextColor="neutral-color-blue-gray-300"
        />
      </View>
      {/* Phone Input */}
      <View>
        <View className="gap-2 mb-4">
          <Text className="text-neutral-color-blue-gray-900 font-poppins-medium text-[14px]">
            Teléfono
          </Text>
          <View className="flex-row items-center border-[1px] border-neutral-color-blue-gray-100 rounded-[8px] h-[40px] bg-transparent">
            {/* Country Code Dropdown */}
            <TouchableOpacity className="flex-row items-center pl-3">
              {/* Flag Emoji and Country Code */}
              <Text className="text-[12px] font-roboto-medium color-neutral-color-blue-gray-500 pr-2">
                🇪🇸 +34
              </Text>
              <Feather name="chevron-down" size={20} color="#90a3ae" />
            </TouchableOpacity>

            <View className="w-[1px] h-[25px] bg-neutral-color-blue-gray-100 ml-2" />

            <TextInput
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              placeholder="Mobile Number"
              className="flex-1 text-[14px] font-roboto-regular text-neutral-color-blue-gray-300 bg-transparent p-3"
              placeholderTextColor="neutral-color-blue-gray-300"
              keyboardType="phone-pad"
            />
          </View>
        </View>
      </View>
      {/* Section Optional */}
      <View className="flex-row items-center mt-10 mb-6">
        <View className="flex-row items-center gap-2 pr-2 pl-4">
          <MaterialIcons name="info" size={19} color="#7165d1" />
          <Text className="text-primarios-violeta-100 text-h6 font-roboto-medium">
            Opcional
          </Text>
        </View>
        <InfoIconWithTooltip
          title="Coordinar directamente por llamada"
          text="No te preocupes, tu teléfono no está visible para todos los usuarios. Solo estará visible para la persona con la que solicites un intercambio."
        />
        <View className="flex-1 ml-3 border-b-[1px] border-neutros-negro-80"></View>
      </View>
      {/* Toggle */}
      <View className="flex-row items-center gap-3">
        <TouchableOpacity
          onPress={toggleSwitch}
          className="w-[40px] h-[20px] rounded-full px-1"
          activeOpacity={0.8}
        >
          {/* Animated Track */}
          <Animated.View
            style={{
              backgroundColor: backgroundColor,
            }}
            className="w-[40px] h-[20px] rounded-full flex-row items-center p-1"
          >
            {/* Toggle Ball */}
            <Animated.View
              style={{
                transform: [{ translateX: translateX }],
              }}
              className="w-[16px] h-[16px] rounded-full bg-white"
            />
          </Animated.View>
        </TouchableOpacity>
        <View>
          <Text className="text-neutral-color-gray-900 font-poppins-medium font-[16px]">
            Activar la opción de llamada
          </Text>
          <Text className="text-neutral-color-blue-gray-500 font-poppins-regular font-[14px]">
            Mostrar teléfono al iniciar intercambio
          </Text>
        </View>
      </View>
      {/* Header */}
      <Text className="font-roboto-regular text-h5 text-neutros-negro my-[20px]">
        Registro
      </Text>
      {/* Email Input */}
      <View className="gap-2 mb-4">
        <Text className="text-neutral-color-blue-gray-900 font-poppins-medium text-[14px]">
          Email
        </Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="ejemplo@gmail.com"
          className="border-[1px] border-neutral-color-blue-gray-100 rounded-[8px] font-roboto-regular h-[40px] bg-[#E3E0F6] text-[14px] text-[#90A4AE] p-3"
          placeholderTextColor="neutral-color-blue-gray-300"
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      {/* Password Input */}
      <View className="gap-2 mb-2">
        <Text className="text-neutral-color-blue-gray-900 font-poppins-medium text-[14px]">
          Contraseña
        </Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="********"
          className="border-[1px] border-neutral-color-blue-gray-100 rounded-[8px] font-roboto-regular h-[40px] bg-[#E3E0F6] text-[14px] text-[#90A4AE] p-3"
          placeholderTextColor="neutral-color-blue-gray-300"
          secureTextEntry={true}
        />
      </View>
      <Text className="text-neutral-color-blue-gray-400 font-poppins-medium text-[13px]">
        La contraseña debe incluir al menos 12 caracteres, una letra mayúscula y
        un número.
      </Text>
      {/* Checkbox */}
      <View className="flex-row items-start my-[34px]">
        <TouchableOpacity
          className="mr-2 mt-[1px]"
          onPress={() => setAcceptTermsAndConditions(!acceptTermsAndConditions)}
        >
          <View
            className={`w-[18px] h-[18px] border-[1px] rounded ${acceptTermsAndConditions
                ? "bg-[#3F51B5] border-[#3F51B5]"
                : "bg-transparent border-neutral-color-blue-gray-100"
              } flex items-center justify-center`}
          >
            {acceptTermsAndConditions && (
              <Feather name="check" size={14} color="white" />
            )}
          </View>
        </TouchableOpacity>

        <View className="flex-row flex-wrap">
          <Text className="text-neutral-color-blue-gray-400 font-poppins-medium text-[12px]">
            Estoy de acuerdo con sus{" "}
          </Text>

          <TouchableOpacity
            onPress={() => Linking.openURL("https://www.google.com/")}
          >
            <Text className="font-medium text-[12px] text-neutral-color-gray-900">
              Términos de servicio{" "}
            </Text>
          </TouchableOpacity>

          <Text className="text-neutral-color-blue-gray-400 text-[12px]">
            y{" "}
          </Text>

          <TouchableOpacity
            onPress={() => Linking.openURL("https://www.google.com/")}
          >
            <Text className="font-medium text-[12px] text-neutral-color-gray-900">
              Política de privacidad
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Submit Button */}
      <TouchableOpacity
        className="bg-primarios-celeste-100 h-[36px] items-center justify-center rounded-[8px]"
        onPress={onSubmit}
      >
        <Text className="font-bold text-[12px] uppercase text-white">
          Registrarse
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterForm;
