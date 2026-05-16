import { useRef } from "react";
import { motion, useInView } from "motion/react";

const stats = [
  { number: "150+", label: "Conferencias" },
  { number: "100+", label: "Talleres" },
  { number: "4", label: "Empresas fundadas" },
];

export default function AuthorSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="autor"
      ref={sectionRef}
      style={{ backgroundColor: "#1B3D2F", minHeight: "520px" }}
      className="relative overflow-visible py-20 md:py-28"
    >
      <div className="mx-auto max-w-screen-xl px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16" style={{ alignItems: "end" }}>

          {/* ── Left Column: Text Content ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="order-2 md:order-1 pb-4"
          >
            {/* Label */}
            <span
              className="mb-4 inline-block font-sans text-xs font-bold uppercase tracking-widest"
              style={{ color: "#E8621A" }}
            >
              Sobre el autor
            </span>

            {/* Author Name */}
            <h2
              className="mb-6 font-serif text-5xl italic leading-tight text-white md:text-6xl"
            >
              Jesús A. Gaxiola
            </h2>

            {/* Bio */}
            <p
              className="mb-10 font-sans text-lg leading-relaxed"
              style={{ color: "rgba(255,255,255,0.82)" }}
            >
              Maestro universitario, coach de negocios y emprendedores. Fundador
              de Sahuarolabs, Yaqui Valley y Be-Analítica. Más de 150 conferencias
              en México, Colombia, Perú y España, y más de 100 talleres sobre
              innovación y pensamiento creativo.
            </p>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="mb-10 flex flex-wrap gap-8"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                  className="flex flex-col"
                >
                  <span className="font-sans text-3xl font-bold text-white md:text-4xl">
                    {stat.number}
                  </span>
                  <span
                    className="mt-1 font-sans text-xs font-semibold uppercase tracking-wider"
                    style={{ color: "#E8621A" }}
                  >
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.a
              href="https://buymeacoffee.com/jesusgaxiola/extras"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03, opacity: 0.88 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className="inline-block rounded-md px-8 py-3 font-sans text-sm font-semibold uppercase tracking-widest text-white transition-opacity"
              style={{ backgroundColor: "#E8621A" }}
            >
              Conoce más del autor
            </motion.a>
          </motion.div>

          {/* ── Right Column: Author Photo ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
            className="order-1 md:order-2 flex items-end justify-center md:justify-end"
          >
            <img
              src="/images/Gaxiola_3.jpg-removebg-preview.png"
              alt="Jesús A. Gaxiola — Autor de El Mindset Innovador"
              className="relative z-10 w-full max-w-sm object-contain object-bottom md:max-w-md"
              style={{
                maxHeight: "90%",
                filter: "drop-shadow(0 20px 48px rgba(0,0,0,0.45))",
              }}
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
