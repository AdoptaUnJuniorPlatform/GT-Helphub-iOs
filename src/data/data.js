export const daysOfTheWeek = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
];

export const daysOfTheWeekShort = ["L", "M", "X", "J", "V", "S", "D"];

export const dayMapping = {
  Lunes: 0,
  Martes: 1,
  Miércoles: 2,
  Jueves: 3,
  Viernes: 4,
  Sábado: 5,
  Domingo: 6,
};

export const categories = [
  "Animales",
  "Ayuda",
  "Consultoría",
  "Diseño",
  "Idiomas",
  "Informática",
  "Reparaciones",
  "Salud",
  "Tutorías",
  "Otros",
];

export const profiles = [
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
