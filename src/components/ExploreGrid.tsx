import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Lightbulb, Flame, Zap, Rocket, Brain, MoveRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { phrases } from "../data/phrases";

interface Step {
  id: number;
  title: string;
  description?: string;
  icon: any;
  color: string;
  className: string;
}

interface Content {
  text: string;
}

const steps: Step[] = [
  {
    id: 1,
    title: "Antes de Innovar: La Semilla",
    description: "Preparando el terreno mental. Desafiando suposiciones y construyendo la resiliencia necesaria para el cambio.",
    icon: Lightbulb,
    color: "#2D6A4F",
    className: "md:col-span-8 bg-brand-surface-low h-[400px]",
  },
  {
    id: 2,
    title: "Encender la Chispa: Ideación y Exploración",
    icon: Flame,
    color: "#D99B2A",
    className: "md:col-span-4 bg-brand-surface-low h-[400px]",
  },
  {
    id: 3,
    title: "En Acción: Desarrollo y Validación",
    icon: Zap,
    color: "#1D4ED8",
    className: "md:col-span-4 bg-brand-surface-low h-[300px]",
  },
  {
    id: 4,
    title: "Lanzar e Impactar: Implementación y Escalabilidad",
    icon: Rocket,
    color: "#EA580C",
    className: "md:col-span-4 bg-brand-surface-low h-[300px]",
  },
  {
    id: 5,
    title: "Después de Innovar: Aprendizaje y Evolución",
    icon: Brain,
    color: "#6D28D9",
    className: "md:col-span-4 bg-brand-surface-low h-[300px]",
  },
];

export default function ExploreGrid() {
  const [selectedSection, setSelectedSection] = useState<number | null>(null);
  const [contentIndex, setContentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Generate random section content on component mount
  const randomSectionContent = useMemo(() => {
    const content: Record<number, Content[]> = {};
    
    for (let section = 1; section <= 5; section++) {
      const sectionPhrases = phrases.filter(p => p.section === section);
      
      // Fisher-Yates shuffle
      const shuffled = [...sectionPhrases];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      
      // Take first 3 shuffled phrases
      content[section] = shuffled.slice(0, 3).map(phrase => ({ text: phrase.text }));
    }
    
    return content;
  }, []); // Empty dependency array - runs once on component mount

  const handleExplore = (stepId: number) => {
    setSelectedSection(stepId);
    setContentIndex(0);
  };

  const handleClose = () => {
    setSelectedSection(null);
    setContentIndex(0);
  };

  const handleNext = () => {
    if (selectedSection) {
      setDirection(1);
      setContentIndex((prev) => (prev + 1) % (randomSectionContent[selectedSection]?.length || 1));
    }
  };

  const handlePrev = () => {
    if (selectedSection) {
      setDirection(-1);
      setContentIndex((prev) => (prev - 1 + (randomSectionContent[selectedSection]?.length || 1)) % (randomSectionContent[selectedSection]?.length || 1));
    }
  };

  const currentStep = steps.find(s => s.id === selectedSection);
  const currentContent = selectedSection ? randomSectionContent[selectedSection]?.[contentIndex] : null;

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  return (
    <section id="explorar" className="mx-auto max-w-screen-2xl px-8 py-40">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="mb-20 md:w-1/2">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-6 font-serif text-5xl italic leading-tight text-brand-on-surface"
        >
          Explora a tu ritmo
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-sans text-xl leading-relaxed text-brand-on-surface-variant opacity-80"
        >
          El camino de la innovación no es lineal. Sumérgete en las fases que resonan contigo hoy.
        </motion.p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.03, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.15)" }}
            className={`group relative flex flex-col justify-between overflow-hidden rounded-xl p-10 shadow-sm transition-all cursor-pointer ${step.className}`}
            onClick={() => handleExplore(step.id)}
          >
            {/* Background Number Ornament */}
            <div
              className={`absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 font-serif text-[12rem] font-bold leading-none opacity-[0.05]`}
              style={{ color: step.color }}
            >
              {step.id}
            </div>

            <div className="relative z-10">
              <step.icon size={32} style={{ color: step.color }} className="mb-6" />
              <h3
                className="mb-4 font-serif text-3xl leading-tight"
                style={{ color: step.color }}
              >
                {step.title}
              </h3>
              {step.description && (
                <p className="max-w-md font-sans text-brand-on-surface-variant opacity-70">
                  {step.description}
                </p>
              )}
            </div>

            <button
              className="relative z-10 mt-8 flex w-fit items-center gap-2 font-sans text-xs font-bold uppercase tracking-widest transition-opacity hover:opacity-70"
              style={{ color: step.color }}
              onClick={(e) => {
                e.stopPropagation();
                handleExplore(step.id);
              }}
            >
              Explorar <MoveRight size={16} />
            </button>

            {/* Hover Hint */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileHover={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-6 left-10 right-10 text-center"
              style={{ color: step.color }}
            >
              <p className="font-sans text-sm font-semibold">Explorar →</p>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Modal de Contenido Dinámico */}
      <AnimatePresence>
        {selectedSection && currentStep && currentContent && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={handleClose}
            >
              <div
                className="relative w-full max-w-2xl rounded-2xl bg-brand-surface-lowest p-8 shadow-xl md:p-12"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Botón Cerrar */}
                <button
                  onClick={handleClose}
                  className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-brand-surface-low transition-all hover:scale-110 text-brand-on-surface"
                >
                  <X size={24} />
                </button>

                {/* Header */}
                <div className="mb-8">
                  <div className="mb-4 inline-flex items-center gap-3">
                    <currentStep.icon size={32} style={{ color: currentStep.color }} />
                    <h2
                      className="font-serif text-3xl italic"
                      style={{ color: currentStep.color }}
                    >
                      {currentStep.title}
                    </h2>
                  </div>
                  <p className="text-sm font-medium text-brand-on-surface-variant">
                    {contentIndex + 1} de {randomSectionContent[selectedSection].length}
                  </p>
                </div>

                {/* Contenido con Animación */}
                <div className="relative min-h-[300px] overflow-hidden flex items-center justify-center">
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={contentIndex}
                      custom={direction}
                      variants={variants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 },
                      }}
                      className="absolute inset-0 flex flex-col items-center justify-center text-center px-8"
                    >
                      <p
                        className="font-serif text-3xl italic leading-relaxed md:text-4xl"
                        style={{ color: currentStep.color }}
                      >
                        {currentContent.text}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Navegación */}
                <div className="mt-12 flex items-center justify-between border-t border-brand-outline-variant/10 pt-8">
                  <button
                    onClick={handlePrev}
                    className="flex h-12 w-12 items-center justify-center rounded-full transition-all hover:scale-110 active:scale-95"
                    style={{ backgroundColor: currentStep.color + "20", color: currentStep.color }}
                  >
                    <ChevronLeft size={24} />
                  </button>

                  <div className="flex gap-2">
                    {randomSectionContent[selectedSection].map((_, idx) => (
                      <motion.button
                        key={idx}
                        onClick={() => {
                          setDirection(idx > contentIndex ? 1 : -1);
                          setContentIndex(idx);
                        }}
                        className="h-2 rounded-full transition-all"
                        animate={{
                          width: idx === contentIndex ? 24 : 8,
                        }}
                        style={{ backgroundColor: idx === contentIndex ? currentStep.color : currentStep.color + "40" }}
                      />
                    ))}
                  </div>

                  <button
                    onClick={handleNext}
                    className="flex h-12 w-12 items-center justify-center rounded-full transition-all hover:scale-110 active:scale-95"
                    style={{ backgroundColor: currentStep.color + "20", color: currentStep.color }}
                  >
                    <ChevronRight size={24} />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
