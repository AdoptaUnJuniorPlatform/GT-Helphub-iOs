import React, { useState } from "react";
import { View, Text, Linking, TouchableOpacity, TextInput } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import InfoIconWithTooltip from "./InfoIconWithTooltip";
import ToggleSwitch from "./ToggleSwitch";
import Checkbox from "./Checkbox";
import Button from "./Button";
import InputField from "./InputField";

const RegisterForm = ({ navigation }) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("🇪🇸 +34");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [acceptTermsAndConditions, setAcceptTermsAndConditions] =
    useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  const onSubmit = () => {
    if (!acceptTermsAndConditions) {
      alert("Debes aceptar los términos y condiciones.");
      return;
    }
    navigation.navigate("RegisterStep1");
  };

  return (
    <View>
      <Text className="font-roboto-regular text-h5 text-neutros-negro my-[20px]">
        Registro
      </Text>

      <InputField
        label="Nombre"
        value={name}
        onChange={setName}
        placeholder="Name"
      />

      <InputField
        label="Apellidos"
        value={surname}
        onChange={setSurname}
        placeholder="Apellido 1"
      />
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
                {countryCode}
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
      {/* ToggleSwitch */}
      <View className="flex-row items-center gap-3 px-2">
        <ToggleSwitch isEnabled={isEnabled} onToggle={setIsEnabled} />
        <View>
          <Text className="text-neutral-color-gray-900 font-poppins-medium font-[16px]">
            Activar la opción de llamada
          </Text>
          <Text className="text-neutral-color-blue-gray-500 font-poppins-regular font-[14px]">
            Mostrar teléfono al iniciar intercambio
          </Text>
        </View>
      </View>

      <Text className="font-roboto-regular text-h5 text-neutros-negro my-[20px]">
        Registro
      </Text>

      <InputField
        label="Email"
        value={email}
        onChange={setEmail}
        placeholder="ejemplo@gmail.com"
        keyboardType="email-address"
        backgroundColor="bg-[#E3E0F6]"
      />

      <InputField
        label="Contraseña"
        value={password}
        onChange={setPassword}
        placeholder="********"
        secureTextEntry={true}
        backgroundColor="bg-[#E3E0F6]"
      />

      <Text className="text-neutral-color-blue-gray-400 font-poppins-medium text-[13px]">
        La contraseña debe incluir al menos 12 caracteres, una letra mayúscula y
        un número.
      </Text>

      <Checkbox
        isChecked={acceptTermsAndConditions}
        onPress={() => setAcceptTermsAndConditions(!acceptTermsAndConditions)}
        label="Estoy de acuerdo con sus"
        labelLink="Términos de servicio y Política de privacidad"
        onLinkPress={() => Linking.openURL("https://www.google.com")}
      />
      <Button onPress={onSubmit} title="Registrarse" />
    </View>
  );
};

export default RegisterForm;
