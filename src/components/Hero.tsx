import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
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

export default function Hero() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [shakeInput, setShakeInput] = useState(false);
  const [showArrow, setShowArrow] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowArrow(window.scrollY < 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      const randomPhrase =
        MOTIVATIONAL_PHRASES[
          Math.floor(Math.random() * MOTIVATIONAL_PHRASES.length)
        ];
      const emailHTML = generateEmailHTML(randomPhrase);

      await supabase
        .from('subscribers')
        .upsert({ email: email }, { onConflict: 'email', ignoreDuplicates: true });

      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        to_email: email,
        subject: "📖 Tu libro está listo — El Mindset Innovador",
        message: emailHTML,
      });

      setSuccess(true);
    } catch (err: any) {
      console.error("Error sending email:", err);
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
  return (
    <section id="hero" className="relative mx-auto max-w-screen-xl overflow-hidden px-8 pb-40 pt-32">
      {/* Decorative Origami Icons (Simulated) */}
      <motion.div
        initial={{ opacity: 0, rotate: 0 }}
        animate={{ opacity: 0.2, rotate: 12 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="absolute right-20 top-20 text-brand-outline"
      >
        <svg
          width="64"
          height="64"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 2L11 13" />
          <path d="M22 2L15 22L11 13L2 9L22 2Z" />
        </svg>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, rotate: 0 }}
        animate={{ opacity: 0.2, rotate: -12 }}
        transition={{ duration: 1.5, delay: 0.7 }}
        className="absolute bottom-20 left-10 text-brand-outline"
      >
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 15l4 4l12-12" />
        </svg>
      </motion.div>

      <div className="relative z-10 grid grid-cols-1 items-center gap-16 md:grid-cols-12">
        <div className="md:col-span-7">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 font-sans text-xs font-bold uppercase tracking-[0.2em] text-brand-on-surface-variant"
          >
            por: Jesús A. Gaxiola
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8 font-serif text-6xl italic leading-[1.1] md:text-8xl"
            style={{ color: "#E8621A" }}
          >
            El Mindset <br /> Innovador
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-10 max-w-lg font-sans text-xl leading-relaxed text-brand-on-surface-variant opacity-80"
          >
            +100 frases sobre innovación que invitan a detenerse y reflexionar.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col gap-4 sm:flex-row"
          >
            <AnimatePresence mode="wait">
              {!success ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex w-full flex-col gap-4 sm:flex-row sm:flex-grow"
                >
                  {/* Email Input with Shake Animation */}
                  <motion.div
                    animate={
                      shakeInput
                        ? {
                            x: [-10, 10, -10, 10, -10, 0],
                          }
                        : { x: 0 }
                    }
                    transition={{ duration: 0.4 }}
                    className="flex-grow"
                  >
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError("");
                      }}
                      placeholder="Ingresa tu correo"
                      className={`w-full border-b bg-transparent py-4 font-sans text-lg text-brand-on-surface outline-none transition-colors placeholder:opacity-50 ${
                        error
                          ? "border-red-500 focus:border-red-500"
                          : "border-brand-outline-variant/40 focus:border-brand-primary"
                      }`}
                    />
                  </motion.div>

                  {/* Download Button */}
                  <button
                    onClick={handleDownload}
                    disabled={isLoading}
                    className={`gradient-btn whitespace-nowrap rounded-md px-8 py-4 font-sans text-sm font-semibold uppercase tracking-wider text-brand-surface-lowest shadow-lg transition-transform ${
                      isLoading
                        ? "opacity-70 cursor-not-allowed"
                        : "hover:scale-[1.02] active:scale-95"
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
                  className="relative flex w-full flex-col items-start gap-4 sm:gap-6"
                >
                  {/* Animated Paper Plane */}
                  <motion.div
                    animate={{ x: [0, 280, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-2 left-0 text-xl md:text-2xl"
                  >
                    ✈️
                  </motion.div>

                  {/* Success Message */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="relative z-10 w-full"
                  >
                    <h3 className="font-serif text-2xl italic text-brand-primary md:text-3xl">
                      📧 ¡Listo! Te enviamos el libro a tu correo
                    </h3>
                    <p className="mt-2 font-sans text-sm text-brand-on-surface-variant opacity-70">
                      Revisa tu bandeja de entrada o carpeta de spam.
                    </p>
                  </motion.div>

                  {/* Reset Button */}
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    onClick={handleReset}
                    className="font-sans text-sm text-brand-primary transition-opacity hover:opacity-80"
                  >
                    Descargar para otro correo
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Error Message */}
            <AnimatePresence>
              {error && !success && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="w-full font-sans text-sm text-red-500 sm:col-span-2"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="md:col-span-5"
        >
          <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-brand-surface-low p-8 shadow-ambient group">
            <img
              src="/images/book-cover.jpg"
              alt="Portada del libro El Mindset Innovador"
              className="absolute inset-0 h-full w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-surface/80 via-transparent to-transparent" />
            <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
              <div className="mb-6 h-1 w-16 rounded-full bg-brand-primary" />
              
            </div>
          </div>
        </motion.div>
      </div>

      {/* Animated Down Arrow */}
      <AnimatePresence>
        {showArrow && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown size={32} style={{ color: "#E8621A" }} strokeWidth={1.5} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
