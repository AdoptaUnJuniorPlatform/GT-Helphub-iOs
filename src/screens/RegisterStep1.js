import { useForm, Controller } from "react-hook-form";
import { View, SafeAreaView, Text } from "react-native";
import {
  CustomButton,
  StepHeader,
  StepTitle,
  CustomTextarea,
  InputFieldWithIcon,
} from "../components";
import { useProfile } from "../profile/ProfileContext";
import { getScreenSize } from "../utils/screenSize";

export default function RegisterStep1({ navigation }) {
  const { isSmallScreen, isBigScreen } = getScreenSize();

  const { setProfileData } = useProfile();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      description: "",
      location: "",
    },
    mode: "onChange",
  });

  const onSubmit = (data) => {
    setProfileData((prevData) => ({
      ...prevData,
      description: data.description,
      location: data.location,
    }));

    navigation.navigate("RegisterStep2");
  };

  return (
    <SafeAreaView className="flex-1 bg-neutros-gris-fondo">
      <View className="flex-1 justify-between px-4">
        <View className="flex-1">
          <StepHeader
            step="1"
            statusStepLabel1={"active"}
            statusStepLabel2={"inactive"}
            label1={"Sobre ti"}
            label2={"Tu foto"}
            status1={"active"}
            status2={"inactive"}
          />
          <StepTitle title="Paso 1" subtitle="Cuéntanos un poco más sobre ti" />
          <View>
            <Text
              className={`
                font-roboto-medium text-neutros-negro 
                ${isBigScreen ? "text-[21px] mt-[25px] mb-[22px]" : isSmallScreen ? "text-lg my-[13px]" : "text-xl my-5"}
                `}
            >
              Breve descripción del usuario
            </Text>
            <Controller
              control={control}
              name="description"
              rules={{
                required: "La descripción es obligatoria",
                maxLength: {
                  value: 160,
                  message: "Máximo 160 caracteres",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomTextarea
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  placeholder="Por Ej: Soy una joven estudiante de enfermería, tengo 22 años vivo en Madrid con unas amigas. Soy una apasionada por la música, y que desea aprender a tocar el piano."
                  multiline={true}
                  numberOfLines={7}
                  maxLength={160}
                  height={146}
                />
              )}
            />

            <View className={`${isBigScreen ? "mt-6" : "mt-4"}`}>
              <Controller
                control={control}
                name="location"
                rules={{
                  required: "La ubicación es obligatoria",
                  pattern: {
                    value: /^[0-9]{5}$/,
                    message: "El código postal debe ser de 5 dígitos",
                  },
                }}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <InputFieldWithIcon
                    label="Ubicación"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder="Código postal (CP)"
                    iconName="envelope"
                    error={error}
                  />
                )}
              />
              <Text
                className={`
              text-neutros-negro-80 font-roboto-regular text-xs
              ${errors.location ? "text-red-error" : "text-neutros-negro-80"}
              `}
              >
                Introduce tu código postal (5 dígitos) para identificar tu
                ubicación.
              </Text>
            </View>
          </View>
        </View>

        {/* Navigation Button Set */}
        <View
          className={`
            flex-row items-center justify-between 
            ${isSmallScreen ? "mt-auto mb-2" : "mt-12"}
            `}
        >
          <CustomButton
            title="Atrás"
            onPress={() => navigation.goBack()}
            width="content"
            isBackButton
          />
          <CustomButton
            title="Continuar"
            onPress={handleSubmit(onSubmit)}
            variant="white"
            width="content"
            disabled={!isValid}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
