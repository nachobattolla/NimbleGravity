export const es = {
  common: {
    brand: "Nimble Gravity",
  },
  emailStep: {
    title: "Nimble Gravity — Postulación",
    description:
      "Ingresa tu email para ver las posiciones abiertas y enviar tu postulación.",
    emailLabel: "Email",
    placeholder: "tu@email.com",
    errorRequired: "Por favor, ingresa tu email.",
    errorInvalid: "Por favor, ingresa un email válido.",
    loading: "Cargando...",
    continue: "Continuar",
    errorFetch: "Error al obtener datos.",
  },
  jobsStep: {
    back: "Volver",
    greeting: "Hola, {{name}}",
    openPositions: "Posiciones abiertas",
    searchLabel: "Buscar por nombre de posición",
    searchPlaceholder: "Ej: Fullstack, Chef...",
    noResults: "Ninguna posición coincide con la búsqueda.",
    noPositions: "No hay posiciones disponibles.",
    loadError: "Error al cargar las posiciones.",
    retry: "Reintentar",
  },
  jobCard: {
    repoLabel: "URL del repositorio (GitHub)",
    repoPlaceholder: "https://github.com/tu-usuario/tu-repo",
    errorRequired: "Por favor, ingresa la URL del repositorio.",
    errorInvalidUrl:
      "Ingresa una URL de GitHub válida (ej: https://github.com/tu-usuario/tu-repo).",
    sending: "Enviando...",
    submit: "Submit",
    sent: "Enviado",
    successMessage: "Postulación enviada correctamente.",
    errorSend: "Error al enviar.",
  },
} as const;
