import { useState } from "react";
import { Star, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [shakeInput, setShakeInput] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleDownload = () => {
    if (!email.trim()) {
      setError("Ingresa un correo válido para continuar");
      setShakeInput(true);
      setTimeout(() => setShakeInput(false), 500);
      return;
    }

    if (!validateEmail(email)) {
      setError("Ingresa un correo válido para continuar");
      setShakeInput(true);
      setTimeout(() => setShakeInput(false), 500);
      return;
    }

    setError("");
    setSuccess(true);
  };

  const handleReset = () => {
    setEmail("");
    setSuccess(false);
  };

  const handleCloseReview = () => {
    setShowReview(false);
  };

  return (
    <section id="descargar" className="bg-brand-surface-lowest py-40">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mx-auto max-w-screen-md px-8 text-center"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6 font-serif text-5xl italic leading-tight text-brand-on-surface"
        >
          Llévate el libro completo
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mb-12 font-sans text-xl text-brand-on-surface-variant opacity-80"
        >
          Únete a la comunidad de innovadores que ya están transformando su mentalidad.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mx-auto max-w-lg rounded-xl bg-brand-surface-low p-8 shadow-ambient"
        >
          <AnimatePresence mode="wait">
            {!success ? (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col space-y-6"
              >
                {/* Email Input with Shake Animation on Error */}
                <motion.div
                  animate={
                    shakeInput
                      ? {
                          x: [-10, 10, -10, 10, -10, 0],
                        }
                      : { x: 0 }
                  }
                  transition={{ duration: 0.4 }}
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                    placeholder="Tu mejor correo electrónico"
                    className={`w-full border-b bg-transparent py-4 text-center font-sans text-lg text-brand-on-surface outline-none transition-colors placeholder:opacity-50 ${
                      error
                        ? "border-red-500 focus:border-red-500"
                        : "border-brand-outline-variant/40 focus:border-brand-primary"
                    }`}
                  />
                </motion.div>

                {/* Error Message */}
                <AnimatePresence>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="text-center font-sans text-sm text-red-500"
                    >
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>

                {/* Download Button */}
                <button
                  onClick={handleDownload}
                  className="gradient-btn w-full rounded-md py-5 font-sans text-sm font-semibold uppercase tracking-widest text-brand-surface-lowest shadow-lg transition-transform hover:scale-[1.01] active:scale-95"
                >
                  Descargar gratis
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="relative flex flex-col items-center space-y-8 py-8"
              >
                {/* Animated Paper Plane */}
                <motion.div
                  animate={{ x: [0, 320, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-0 left-0 text-2xl"
                >
                  ✈️
                </motion.div>

                {/* Success Message */}
                <div className="relative z-10 flex flex-col items-center gap-4">
                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="font-serif text-3xl italic text-brand-primary md:text-4xl"
                  >
                    📧 ¡Listo! Te enviamos el libro a tu correo
                  </motion.h3>

                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="font-sans text-sm text-brand-on-surface-variant opacity-70"
                  >
                    Revisa tu bandeja de entrada o carpeta de spam.
                  </motion.p>
                </div>

                {/* Reset Button for Demo */}
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  onClick={handleReset}
                  className="mt-4 font-sans text-sm text-brand-primary transition-opacity hover:opacity-80"
                >
                  Descargar para otro correo
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <div className="mt-12 flex flex-col items-center gap-4">
          <div className="flex text-brand-primary">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} size={20} fill="currentColor" stroke="none" />
            ))}
          </div>
          <p className="font-sans text-sm font-medium text-brand-on-surface-variant opacity-60">
            Valorado por cientos de lectores
          </p>
        </div>
      </motion.div>

      {/* Modal de Reseña */}
      <AnimatePresence>
        {showReview && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseReview}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={handleCloseReview}
            >
              <div
                className="relative w-full max-w-2xl rounded-2xl bg-brand-surface-lowest p-8 shadow-xl md:p-12"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Botón Cerrar */}
                <button
                  onClick={handleCloseReview}
                  className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-brand-surface-low transition-all hover:scale-110 text-brand-on-surface"
                >
                  <X size={24} />
                </button>

                {/* Contenido de Reseña */}
                <div className="mb-8">
                  <h3 className="mb-4 font-serif text-3xl italic text-brand-primary">
                    Reseña
                  </h3>
                  <p className="mb-6 font-sans text-lg leading-relaxed text-brand-on-surface-variant">
                    "El Mindset Innovador" es una obra transformadora que desafía la forma tradicional de pensar sobre la innovación. A través de cinco fases claramente estructuradas, Jesús A. Gaxiola guía al lector no de un extremo a otro del libro, sino a través de un universo de ideas que puede ser explorado libremente.
                  </p>
                  <p className="mb-6 font-sans text-lg leading-relaxed text-brand-on-surface-variant">
                    Cada frase en este libro es una semilla de inspiración diseñada para germinar en tu mente en el momento preciso que la necesites. La estructura no lineal del contenido permite que cada lector encuentre exactamente lo que busca, cuando lo necesita.
                  </p>
                  <p className="font-sans text-lg leading-relaxed text-brand-on-surface-variant">
                    Perfecto para emprendedores, líderes y cualquier persona que busque transformar su mentalidad hacia la innovación continua. Una lectura que no solo inspira, sino que equipa al lector con un nuevo marco mental para abordar los desafíos del siglo XXI.
                  </p>
                </div>

                {/* Estrellas */}
                <div className="mb-8 flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      size={28}
                      fill="currentColor"
                      stroke="none"
                      className="text-brand-primary"
                    />
                  ))}
                </div>

                {/* Botón de Descarga */}
                <button
                  onClick={handleCloseReview}
                  className="gradient-btn w-full rounded-md py-4 font-sans text-sm font-semibold uppercase tracking-widest text-brand-surface-lowest shadow-lg transition-transform hover:scale-[1.01] active:scale-95"
                >
                  Descargar mi copia
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}