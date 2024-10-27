import {
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import { LogoLight, HeroCard } from "../components";

const { width } = Dimensions.get("window");

export default function LoginScreen({ navigation }) {
  const isSmallScreen = width <= 392;
  const isBigScreen = width >= 430;

  const profiles = [
    {
      id: 1,
      image: require("../../assets/avatar14.png"),
      name: "Pedro",
      surname: "García",
      ability: "Clases de Guitarra",
      mode: "Online",
      timeSlot: "17:00 a 21:00",
      description:
        "Me apasiona el análisis e identificación de errores y el diseño de soluciones creativas principalmente en aplicaciones móviles.",
      category: "Tutorías",
    },
    {
      id: 2,
      image: require("../../assets/avatar15.png"),
      name: "Laura",
      surname: "Martínez",
      ability: "Fotografía de Paisajes",
      mode: "28001 Madrid, Madrid",
      timeSlot: "08:00 a 17:00",
      description:
        "Descubre cómo capturar la luz natural, elegir los mejores ángulos y ajustar la configuración de la cámara para obtener fotos impresionantes.",
      category: "Diseño",
    },
    {
      id: 3,
      image: require("../../assets/avatar16.png"),
      name: "Joaquín",
      surname: "Rodríguez",
      ability: "Clases de Cocina Vegana",
      mode: "Online",
      timeSlot: "17:00 a 21:00",
      description:
        "Aprende a preparar un plato vegano delicioso y nutritivo (desde entrantes hasta postres)",
      category: "Tutorías",
    },
    {
      id: 4,
      image: require("../../assets/avatar17.png"),
      name: "Marta",
      surname: "Fernández",
      ability: "Paseo de Perros",
      mode: "08007 Barcelona, Cataluña",
      timeSlot: "Horario flexible",
      description:
        "Paseo de perros con atención personalizada, garantizando que tu mascota reciba el ejercicio adecuado, relajante y seguro.",
      category: "Animales",
    },
    {
      id: 5,
      image: require("../../assets/avatar18.png"),
      name: "Diego",
      surname: "Torres",
      ability: "Entrenamiento Personal",
      mode: "03001 Alicante, Valencia",
      timeSlot: "08:00 a 17:00",
      description:
        "Sesiones de entrenamiento personal en la playa enfocadas en mejorar tu resistencia y fuerza, con rutinas sencillas.",
      category: "Fitness",
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-primarios-violeta-100">
      <View className="flex-1 bg-primarios-violeta-100">
        <ImageBackground
          source={require("../../assets/login-background.png")}
          style={{ width: "100%", height: "100%" }}
          resizeMode="cover"
        >
          <View className="flex-1">
            <View
              className={`
                px-4 
                ${isSmallScreen ? "py-4" : isBigScreen ? "py-14" : "py-10"}
                `}
            >
              <LogoLight />
            </View>
            <View className="flex-1">
              <View
                className={`
                  px-4 
                  ${isBigScreen ? "pb-8" : isSmallScreen ? "pb-4" : "pb-6"}
                  `}
              >
                <Text
                  className={`
                    font-roboto-light text-white
                    ${isSmallScreen ? "text-[30px]" : isBigScreen ? "text-[38px]" : "text-[35px]"}
                    `}
                >
                  Conecta y Comparte
                </Text>
                <Text
                  className={`
                    font-roboto-regular text-black
                    ${isSmallScreen ? "text-[30px]" : isBigScreen ? "text-[38px]" : "text-[35px]"}
                    `}
                >
                  Habilidades
                </Text>
              </View>

              <View className="flex-row justify-end mt-6 mb-4">
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ flexDirection: "row" }}
                >
                  {profiles.map((profile) => (
                    <HeroCard
                      key={profile.id}
                      image={profile.image}
                      name={profile.name}
                      surname={profile.surname}
                      ability={profile.ability}
                      mode={profile.mode}
                      timeSlot={profile.timeSlot}
                      description={profile.description}
                      category={profile.category}
                    />
                  ))}
                </ScrollView>
              </View>

              <View
                className={`
                  flex-1 justify-start items-center bg-transparent px-4 
                  ${isBigScreen ? "mt-8" : isSmallScreen ? "mt-4" : "mt-6"}
                  `}
              >
                <View className="w-full">
                  <View className={`${isSmallScreen ? "mb-2" : "mb-4"}`}>
                    <TouchableOpacity
                      className="h-[36px] items-center justify-center rounded-lg w-full bg-white"
                      onPress={() => navigation.navigate("RegisterFlow")}
                    >
                      <Text className="font-roboto-bold text-xs uppercase text-primarios-violeta-100">
                        Crear cuenta nueva
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View>
                    <TouchableOpacity
                      className="h-[36px] items-center justify-center rounded-lg w-full bg-white"
                      onPress={() => navigation.navigate("SessionStart")}
                    >
                      <Text className="font-roboto-bold text-xs uppercase text-primarios-violeta-100">
                        Iniciar sesión
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}
