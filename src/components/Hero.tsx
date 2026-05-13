import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [shakeInput, setShakeInput] = useState(false);
  const [showArrow, setShowArrow] = useState(true);

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
                    className="gradient-btn whitespace-nowrap rounded-md px-8 py-4 font-sans text-sm font-semibold uppercase tracking-wider text-brand-surface-lowest shadow-lg transition-transform hover:scale-[1.02] active:scale-95"
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
