// Phrase data from the book's 5 sections
export interface Phrase {
  id: number;
  text: string;
  section: number;
  sectionName: string;
  likes: number;
  colorClass: string;
}

// Section color mapping
const sectionColorMap: Record<number, string> = {
  1: "text-blue-600",
  2: "text-orange-500",
  3: "text-cyan-500",
  4: "text-amber-500",
  5: "text-purple-500",
};

export const phrases: Phrase[] = [
  // Sección 1: Antes de Innovar: La Semilla
  { id: 1, text: "La curiosidad es el primer acto de rebelión contra lo establecido.", section: 1, sectionName: "Antes de Innovar: La Semilla", likes: 98, colorClass: sectionColorMap[1] },
  { id: 2, text: "La Innovación nace donde termina la zona de confort.", section: 1, sectionName: "Antes de Innovar: La Semilla", likes: 87, colorClass: sectionColorMap[1] },
  { id: 3, text: "Innovar es sembrar preguntas donde otros siembran respuestas.", section: 1, sectionName: "Antes de Innovar: La Semilla", likes: 76, colorClass: sectionColorMap[1] },
  { id: 4, text: "El primer paso no es tener una idea, es tener una pregunta.", section: 1, sectionName: "Antes de Innovar: La Semilla", likes: 92, colorClass: sectionColorMap[1] },
  { id: 5, text: "Antes de cambiar el mundo, cambia tu mirada sobre el mundo.", section: 1, sectionName: "Antes de Innovar: La Semilla", likes: 85, colorClass: sectionColorMap[1] },

  // Sección 2: Encender la Chispa: Ideación y Exploración
  { id: 6, text: "La primera versión de una idea no tiene que ser perfecta, solo tiene que existir.", section: 2, sectionName: "Encender la Chispa: Ideación y Exploración", likes: 94, colorClass: sectionColorMap[2] },
  { id: 7, text: "El juicio prematuro es el asesino silencioso de la innovación.", section: 2, sectionName: "Encender la Chispa: Ideación y Exploración", likes: 89, colorClass: sectionColorMap[2] },
  { id: 8, text: "Innovar es decir 'sí, y podríamos...' en lugar de 'no, pero...'", section: 2, sectionName: "Encender la Chispa: Ideación y Exploración", likes: 81, colorClass: sectionColorMap[2] },
  { id: 9, text: "La creatividad sin acción no es innovación, es imaginación.", section: 2, sectionName: "Encender la Chispa: Ideación y Exploración", likes: 77, colorClass: sectionColorMap[2] },
  { id: 10, text: "No busques la idea perfecta; busca la primera acción posible.", section: 2, sectionName: "Encender la Chispa: Ideación y Exploración", likes: 88, colorClass: sectionColorMap[2] },

  // Sección 3: En Acción: Desarrollo y Validación
  { id: 11, text: "El feedback del usuario es el GPS del innovador.", section: 3, sectionName: "En Acción: Desarrollo y Validación", likes: 72, colorClass: sectionColorMap[3] },
  { id: 12, text: "Pivotar no es rendirse, es evolucionar con datos e información.", section: 3, sectionName: "En Acción: Desarrollo y Validación", likes: 68, colorClass: sectionColorMap[3] },
  { id: 13, text: "Innovar no es controlar la incertidumbre, es aprender a bailar con ella.", section: 3, sectionName: "En Acción: Desarrollo y Validación", likes: 63, colorClass: sectionColorMap[3] },
  { id: 14, text: "El verdadero riesgo no es fallar, es quedarse quieto.", section: 3, sectionName: "En Acción: Desarrollo y Validación", likes: 79, colorClass: sectionColorMap[3] },
  { id: 15, text: "Un experimento pequeño hoy vale más que una gran idea mañana.", section: 3, sectionName: "En Acción: Desarrollo y Validación", likes: 71, colorClass: sectionColorMap[3] },

  // Sección 4: Lanzar e Impactar: Implementación y Escalabilidad
  { id: 16, text: "Una innovación no escala por tamaño, escala por sentido.", section: 4, sectionName: "Lanzar e Impactar: Implementación y Escalabilidad", likes: 59, colorClass: sectionColorMap[4] },
  { id: 17, text: "Un lanzamiento no es un evento, es el comienzo del aprendizaje.", section: 4, sectionName: "Lanzar e Impactar: Implementación y Escalabilidad", likes: 54, colorClass: sectionColorMap[4] },
  { id: 18, text: "Innovar es abrir puertas que otros no sabían que estaban cerradas.", section: 4, sectionName: "Lanzar e Impactar: Implementación y Escalabilidad", likes: 67, colorClass: sectionColorMap[4] },
  { id: 19, text: "La innovación se escala cuando deja de depender de una persona.", section: 4, sectionName: "Lanzar e Impactar: Implementación y Escalabilidad", likes: 52, colorClass: sectionColorMap[4] },
  { id: 20, text: "La mejor métrica de impacto es la sonrisa del usuario que percibe el valor entregado.", section: 4, sectionName: "Lanzar e Impactar: Implementación y Escalabilidad", likes: 61, colorClass: sectionColorMap[4] },

  // Sección 5: Después de Innovar: Aprendizaje y Evolución
  { id: 21, text: "El final de una innovación es el comienzo de la siguiente.", section: 5, sectionName: "Después de Innovar: Aprendizaje y Evolución", likes: 45, colorClass: sectionColorMap[5] },
  { id: 22, text: "No guardes tus lecciones, compártelas como semillas.", section: 5, sectionName: "Después de Innovar: Aprendizaje y Evolución", likes: 38, colorClass: sectionColorMap[5] },
  { id: 23, text: "La innovación no es un destino, es un hábito.", section: 5, sectionName: "Después de Innovar: Aprendizaje y Evolución", likes: 51, colorClass: sectionColorMap[5] },
  { id: 24, text: "El verdadero legado del innovador no es lo que creó, es lo que inspiró.", section: 5, sectionName: "Después de Innovar: Aprendizaje y Evolución", likes: 48, colorClass: sectionColorMap[5] },
  { id: 25, text: "El futuro pertenece a quienes aprenden, no a quienes solo saben.", section: 5, sectionName: "Después de Innovar: Aprendizaje y Evolución", likes: 55, colorClass: sectionColorMap[5] },
];