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

export const policySections1 = [
  {
    id: "1.1",
    title: "Edad mínima y condiciones de uso",
    content: [
      "HelpHub está destinado exclusivamente para mayores de 18 años debido a la naturaleza presencial de los intercambios.",
      "Está prohibido realizar actividades ilegales, fraudulentas, comerciales o promocionales, o que violen derechos de terceros en la plataforma.",
      "Los usuarios deben respetar los derechos de otros y evitar contenido ofensivo, discriminatorio, difamatorio o que incite al odio o la violencia.",
      "Se prohíbe crear múltiples cuentas, suplantar identidades, o usar fotos de perfil que no correspondan a la persona titular de la cuenta.",
    ],
  },
  {
    id: "1.2",
    title: "Limitación de responsabilidad",
    content: [
      "HelpHub no garantiza la disponibilidad continua del servicio y no se hace responsable de fallos técnicos ni eventos fuera de su control.",
      "La plataforma no garantiza la veracidad de los datos de los usuarios ni se responsabiliza por daños resultantes del uso de la aplicación.",
    ],
  },
];

export const policySections2 = [
  {
    id: "2.1",
    title: "Información recolectada",
    content: [
      "Datos personales: nombre, edad, ubicación aproximada (para hacer el match).",
      "Datos de contacto: correo electrónico (para registro y/o comunicación interna).",
      "Datos de perfil: habilidades, disponibilidad horaria, foto de perfil.",
      "Autenticación: implementación de 2FA para seguridad adicional.",
    ],
  },
  {
    id: "2.2",
    title: "Uso de los datos",
    content: [
      "Los datos se utilizarán únicamente para conectar usuarios con habilidades complementarias y mejorar la experiencia de uso.",
      "HelpHub no compartirá datos personales con terceros sin consentimiento explícito, salvo en casos requeridos por ley.",
    ],
  },
  {
    id: "2.3",
    title: "Retención y eliminación de datos",
    content: [
      "Los datos personales se conservarán mientras la cuenta esté activa y serán eliminados en un plazo de X meses tras la desactivación de la cuenta (este plazo puede ajustarse cuando el equipo defina los períodos de retención).",
      "El usuario podrá solicitar la eliminación de su cuenta y de sus datos en cualquier momento.",
    ],
  },
  {
    id: "2.4",
    title: "Seguridad de los datos",
    content: [
      "Los datos personales serán encriptados (detallar el nivel de encriptación una vez que esté implementado) y almacenados en servidores seguros.",
      "El acceso a los datos estará restringido al personal autorizado de HelpHub.",
    ],
  },
  {
    id: "2.5",
    title: "Derechos del usuario (GDPR)",
    content: [
      "Derecho a acceder, rectificar, y eliminar sus datos.",
      "Derecho a limitar el procesamiento y a la portabilidad de los datos.",
      "Derecho a oponerse al procesamiento de datos en cualquier momento.",
    ],
  },
  {
    id: "2.6",
    title: "Cookies",
    content: [
      "Tipo de información almacenada: sesión, preferencias, autenticación.",
      "Duración de la cookie: cuánto tiempo permanecerá en el dispositivo.",
      "Propósito: Explicar por qué se usan, como “para recordar la sesión del usuario y mejorar su experiencia”.",
      "Opciones del usuario: permitir que el usuario desactive ciertas cookies o tokens si es posible, y explicar cómo puede hacerlo.",
    ],
  },
  {
    id: "2.7",
    title: "Datos compartidos con terceros",
    content: [
      "Qué datos se comparten: detallar los tipos de datos compartidos, como email o datos de perfil.",
      "Quiénes son los terceros: nombrar o describir el tipo de proveedores (por ejemplo, proveedores de correo electrónico, análisis de datos).",
      "Finalidad de la transferencia: explicar por qué se comparten los datos.",
      "Seguridad: mencionar cualquier medida de protección para asegurar la transferencia segura de datos.",
    ],
  },
];

export const policySections3 = [
  {
    id: "3.1",
    title: "Cámara:",
    content: [
      "Propósito: permitir al usuario capturar una foto en tiempo real como su foto de perfil",
      "Nota: este permiso sólo se activará en el caso de que el usuario opte por tomar una foto en lugar de seleccionar una de su galería.",
      "Alternativa: si prefieren no otorgar este permiso, el usuario puede optar por subir una foto de perfil desde la galería del dispositivo.",
    ],
  },
  {
    id: "3.2",
    title: "Almacenamiento Externo (Lectura):",
    content: [
      "Propósito: permitir al usuario seleccionar una imagen de perfil desde la galería del dispositivo.",
      "Información adicional: HelpHub no accede a otros archivos fuera de la imagen seleccionada por el usuario.",
    ],
  },
  {
    id: "3.3",
    title: "Almacenamiento Externo (Escritura):",
    content: [
      "Propósito: permitir la descarga de datos de la aplicación o almacenamiento de configuraciones específicas en el dispositivo del usuario (si corresponde).",
      "Nota: este permiso se solicita solo si la funcionalidad requiere guardar archivos o configuraciones locales en el dispositivo.",
    ],
  },
];
