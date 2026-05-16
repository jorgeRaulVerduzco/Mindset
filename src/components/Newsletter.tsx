import { useState } from "react";
import { Star, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import emailjs from "@emailjs/browser";
import { supabase } from "../lib/supabase";

// Initialize EmailJS with your credentials
const EMAILJS_PUBLIC_KEY = "lbFrgh1lW7gzX1SME";
const EMAILJS_SERVICE_ID = "service_y1d559a";
const EMAILJS_TEMPLATE_ID = "template_9dokdnh";

// Initialize emailjs
emailjs.init(EMAILJS_PUBLIC_KEY);

const generateEmailHTML = (motivationalPhrase: string): string => {
  // Escape any special characters that might cause issues
  const safePhrase = motivationalPhrase.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  
  return `<div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #ffffff; padding: 40px;">
  
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="color: #E8621A; font-style: italic; font-size: 28px;">El Mindset Innovador</h1>
    <p style="color: #888; font-size: 13px;">por Jesús A. Gaxiola · Yaqui Valley</p>
  </div>

  <div style="border-left: 4px solid #E8621A; padding-left: 20px; margin: 30px 0;">
    <p style="color: #333; font-style: italic; font-size: 18px;">"${safePhrase}"</p>
  </div>

  <p style="color: #444; font-size: 15px; line-height: 1.7;">Gracias por unirte a la comunidad de innovadores. Tu copia de <strong>El Mindset Innovador</strong> está lista para ser leída.</p>

  <div style="text-align: center; margin: 40px 0;">
    <a href="https://drive.google.com/drive/folders/1eJL8IiGuktq77FRRhtoS9p9AFUIBoBS5" style="display: inline-block; background-color: #E8621A; color: #ffffff; padding: 16px 32px; text-decoration: none; border-radius: 6px; font-size: 15px; font-weight: bold;">📥 Descargar mi libro</a>
  </div>

  <p style="color: #999; font-size: 12px; text-align: center;">Si el botón no funciona, copia y pega este enlace en tu navegador:<br><a href="https://drive.google.com/drive/folders/1eJL8IiGuktq77FRRhtoS9p9AFUIBoBS5" style="color: #E8621A; text-decoration: none;">https://drive.google.com/drive/folders/1eJL8IiGuktq77FRRhtoS9p9AFUIBoBS5</a></p>

  <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
  <p style="color: #bbb; font-size: 11px; text-align: center;">El Mindset Innovador · por Jesús A. Gaxiola · Yaqui Valley</p>
</div>`;
};

const MOTIVATIONAL_PHRASES = [
  "La curiosidad es el primer acto de rebelión contra lo establecido.",
  "La innovación no es un destino, es un viaje continuo de transformación.",
  "El mindset innovador surge cuando cuestionamos lo que creemos saber.",
  "La creatividad es la capacidad de conectar puntos que nadie más ve.",
  "Transformar tu mentalidad es el primer paso para transformar el mundo.",
];

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [shakeInput, setShakeInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showEmailInModal, setShowEmailInModal] = useState(false);

  // Log on component mount

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleDownload = async () => {

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
    setIsLoading(true);

    try {
      // Get a random motivational phrase
      const randomPhrase =
        MOTIVATIONAL_PHRASES[
          Math.floor(Math.random() * MOTIVATIONAL_PHRASES.length)
        ];
      const emailHTML = generateEmailHTML(randomPhrase);

      await supabase
        .from('subscribers')
        .upsert({ email: email }, { onConflict: 'email', ignoreDuplicates: true });

      // Send email using EmailJS
      const response = await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        to_email: email,
        subject: "📖 Tu libro está listo — El Mindset Innovador",
        message: emailHTML,
      });

      setSuccess(true);
    } catch (err: any) {
      console.error("❌ Error completo al enviar email:", err);
      
      setError("Hubo un problema al enviar el correo. Intenta de nuevo.");
      setShakeInput(true);
      setTimeout(() => setShakeInput(false), 500);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setEmail("");
    setSuccess(false);
    setIsLoading(false);
  };

  const handleCloseReview = () => {
    setShowReview(false);
    setShowEmailInModal(false);
  };

  const handleDownloadFromModal = async () => {

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
    setIsLoading(true);

    try {
      const randomPhrase =
        MOTIVATIONAL_PHRASES[
          Math.floor(Math.random() * MOTIVATIONAL_PHRASES.length)
        ];
      const emailHTML = generateEmailHTML(randomPhrase);

      await supabase
        .from('subscribers')
        .upsert({ email: email }, { onConflict: 'email', ignoreDuplicates: true });

      const response = await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        to_email: email,
        subject: "📖 Tu libro está listo — El Mindset Innovador",
        message: emailHTML,
      });

      setSuccess(true);
      setShowReview(false);
      setShowEmailInModal(false);
    } catch (err: any) {
      console.error("❌ Error completo al enviar email:", err);
      
      setError("Hubo un problema al enviar el correo. Intenta de nuevo.");
      setShakeInput(true);
      setTimeout(() => setShakeInput(false), 500);
    } finally {
      setIsLoading(false);
    }
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
                  disabled={isLoading}
                  className={`gradient-btn w-full rounded-md py-5 font-sans text-sm font-semibold uppercase tracking-widest text-brand-surface-lowest shadow-lg transition-transform ${
                    isLoading
                      ? "opacity-70 cursor-not-allowed"
                      : "hover:scale-[1.01] active:scale-95"
                  }`}
                >
                  {isLoading ? "Enviando... 📧" : "Descargar gratis"}
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

                {/* Mostrar email input en el modal */}
                {!showEmailInModal ? (
                  <button
                    onClick={() => setShowEmailInModal(true)}
                    className="gradient-btn w-full rounded-md py-4 font-sans text-sm font-semibold uppercase tracking-widest text-brand-surface-lowest shadow-lg transition-transform hover:scale-[1.01] active:scale-95"
                  >
                    Descargar mi copia
                  </button>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col space-y-4"
                  >
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError("");
                      }}
                      placeholder="Tu correo electrónico"
                      className={`w-full border-b bg-transparent py-4 text-center font-sans text-lg text-brand-on-surface outline-none transition-colors placeholder:opacity-50 ${
                        error
                          ? "border-red-500 focus:border-red-500"
                          : "border-brand-outline-variant/40 focus:border-brand-primary"
                      }`}
                    />
                    
                    {error && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center font-sans text-sm text-red-500"
                      >
                        {error}
                      </motion.p>
                    )}

                    <button
                      onClick={handleDownloadFromModal}
                      disabled={isLoading}
                      className={`gradient-btn w-full rounded-md py-4 font-sans text-sm font-semibold uppercase tracking-widest text-brand-surface-lowest shadow-lg transition-transform ${
                        isLoading
                          ? "opacity-70 cursor-not-allowed"
                          : "hover:scale-[1.01] active:scale-95"
                      }`}
                    >
                      {isLoading ? "Enviando... 📧" : "Descargar gratis"}
                    </button>

                    <button
                      onClick={() => setShowEmailInModal(false)}
                      className="text-sm text-brand-on-surface-variant transition-opacity hover:opacity-60"
                    >
                      Cancelar
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
