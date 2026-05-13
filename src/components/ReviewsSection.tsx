import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Star, Send } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Review {
  id: number;
  text: string;
  rating: number;
  author: string;
  city: string;
  section: string;
  hasStreakBadge: boolean;
  approved: boolean;
}

// Mock review data
const mockReviews: Review[] = [
  {
    id: 1,
    text: "Esta obra cambió completamente mi perspectiva sobre la innovación. Cada frase me dejó reflexionando durante días.",
    rating: 5,
    author: "María",
    city: "G.",
    section: "Sección 2",
    hasStreakBadge: true,
    approved: true,
  },
  {
    id: 2,
    text: "Un libro que desafía las creencias tradicionales y abre puertas a nuevas formas de pensar. Altamente recomendable.",
    rating: 5,
    author: "Carlos",
    city: "M.",
    section: "Sección 1",
    hasStreakBadge: false,
    approved: true,
  },
  {
    id: 3,
    text: "Jesús tiene la capacidad de convertir conceptos complejos en frases simples pero profundas. Inspirador.",
    rating: 4,
    author: "Andrea",
    city: "L.",
    section: "Sección 3",
    hasStreakBadge: true,
    approved: true,
  },
  {
    id: 4,
    text: "Perfecto para emprendedores que buscan salir de su zona de confort y pensar diferente.",
    rating: 5,
    author: "Diego",
    city: "R.",
    section: "Sección 4",
    hasStreakBadge: false,
    approved: true,
  },
  {
    id: 5,
    text: "Una lectura que requiere atención y reflexión. Cada página tiene algo valioso.",
    rating: 4,
    author: "Sofía",
    city: "V.",
    section: "Sección 5",
    hasStreakBadge: true,
    approved: true,
  },
];

export default function ReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    rating: 0,
    text: "",
  });
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const autoAdvanceRef = useRef<NodeJS.Timeout>();

  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    if (!isHovering && !expandedCard) {
      autoAdvanceRef.current = setTimeout(() => {
        nextReview();
      }, 5000);
    }
    return () => {
      if (autoAdvanceRef.current) clearTimeout(autoAdvanceRef.current);
    };
  }, [currentIndex, isHovering, expandedCard]);

  const nextReview = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % mockReviews.length);
  };

  const prevReview = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + mockReviews.length) % mockReviews.length);
  };

  // Get visible cards (3 on desktop, 1 on mobile)
  const getVisibleCards = () => {
    return [
      mockReviews[(currentIndex) % mockReviews.length],
      mockReviews[(currentIndex + 1) % mockReviews.length],
      mockReviews[(currentIndex + 2) % mockReviews.length],
    ];
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Success animation
    setShowSuccessAnimation(true);
    setFormData({ email: "", rating: 0, text: "" });
    setTimeout(() => {
      setShowSuccessAnimation(false);
      setShowForm(false);
    }, 2000);
  };

  return (
    <section
      id="resenas"
      className="relative overflow-hidden bg-brand-surface-lowest py-32"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Section Title with Origami Decoration */}
        <div className="mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-4"
        >
          {/* Origami Paper Plane */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="text-brand-secondary"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 2L11 13" />
              <path d="M22 2L15 22L11 13L2 9L22 2Z" />
            </svg>
          </motion.div>

          <h2 className="font-serif text-5xl italic text-brand-secondary md:text-6xl">
            Lo que dicen nuestros lectores
          </h2>

          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="text-brand-secondary"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 2L11 13" />
              <path d="M22 2L15 22L11 13L2 9L22 2Z" />
            </svg>
          </motion.div>
        </motion.div>
      </div>

      {/* Review Carousel */}
      <div className="mx-auto max-w-screen-xl px-8">
        <div
          className="relative flex items-center"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Left Arrow */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={prevReview}
            className="absolute -left-6 z-20 hidden h-14 w-14 items-center justify-center rounded-full border-2 border-brand-primary text-brand-primary transition-all hover:bg-brand-primary hover:text-brand-surface-lowest md:flex lg:-left-20"
          >
            <ChevronLeft size={28} />
          </motion.button>

          {/* Cards Container */}
          <div className="w-full overflow-hidden">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
              <AnimatePresence mode="popLayout" initial={false}>
                {getVisibleCards().map((review, idx) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction < 0 ? 100 : -100 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="hidden md:block"
                  >
                    <ReviewCard
                      review={review}
                      isExpanded={expandedCard === review.id}
                      onToggleExpand={() =>
                        setExpandedCard(
                          expandedCard === review.id ? null : review.id
                        )
                      }
                    />
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Mobile - Show only first visible card */}
              <motion.div
                key={`mobile-${mockReviews[currentIndex].id}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="md:hidden"
              >
                <ReviewCard
                  review={mockReviews[currentIndex]}
                  isExpanded={expandedCard === mockReviews[currentIndex].id}
                  onToggleExpand={() =>
                    setExpandedCard(
                      expandedCard === mockReviews[currentIndex].id
                        ? null
                        : mockReviews[currentIndex].id
                    )
                  }
                />
              </motion.div>
            </div>
          </div>

          {/* Right Arrow */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={nextReview}
            className="absolute -right-6 z-20 hidden h-14 w-14 items-center justify-center rounded-full border-2 border-brand-primary text-brand-primary transition-all hover:bg-brand-primary hover:text-brand-surface-lowest md:flex lg:-right-20"
          >
            <ChevronRight size={28} />
          </motion.button>
        </div>

        {/* Mobile Navigation Dots */}
        <div className="mt-8 flex justify-center gap-2 md:hidden">
          {mockReviews.map((_, idx) => (
            <motion.button
              key={idx}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              className={`h-2 rounded-full transition-all ${
                idx === currentIndex ? "w-8 bg-brand-primary" : "w-2 bg-brand-outline/30"
              }`}
              whileHover={{ scale: 1.2 }}
            />
          ))}
        </div>
      </div>

      {/* Leave a Review Section */}
      <div className="mx-auto mt-20 max-w-2xl px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl bg-brand-surface-low p-8 shadow-ambient md:p-12"
        >
          <h3 className="mb-8 text-center font-serif text-3xl italic text-brand-on-surface">
            Deja tu reseña
          </h3>

          {!showForm ? (
            <div className="text-center">
              <p className="mb-6 font-sans text-brand-on-surface-variant">
                Comparte tu experiencia sin necesidad de crear una cuenta.
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowForm(true)}
                className="gradient-btn rounded-lg px-8 py-3 font-sans font-semibold text-brand-surface-lowest shadow-lg"
              >
                Escribir reseña
              </motion.button>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-6">
              {/* Email Input */}
              <div>
                <label className="mb-2 block font-sans text-sm font-semibold text-brand-on-surface">
                  Tu correo
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="tu@email.com"
                  className="w-full border-b border-brand-outline-variant/40 bg-transparent py-3 font-sans text-brand-on-surface outline-none transition-colors focus:border-brand-primary placeholder:opacity-50"
                />
              </div>

              {/* Star Rating */}
              <div>
                <label className="mb-2 block font-sans text-sm font-semibold text-brand-on-surface">
                  ¿Cuántas estrellas?
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <motion.button
                      key={star}
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, rating: star })
                      }
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.95 }}
                      className="transition-all"
                    >
                      <Star
                        size={32}
                        className={`transition-all ${
                          star <= formData.rating
                            ? "fill-brand-primary text-brand-primary"
                            : "text-brand-outline/40"
                        }`}
                      />
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Review Text */}
              <div>
                <label className="mb-2 block font-sans text-sm font-semibold text-brand-on-surface">
                  Tu reseña
                </label>
                <textarea
                  required
                  value={formData.text}
                  onChange={(e) =>
                    setFormData({ ...formData, text: e.target.value })
                  }
                  placeholder="¿Qué frase o sección te impactó más?"
                  rows={4}
                  className="w-full rounded-lg border border-brand-outline-variant/30 bg-brand-surface-lowest p-4 font-sans text-brand-on-surface outline-none transition-colors focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/20 placeholder:opacity-50"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-4">
                <motion.button
                  type="submit"
                  disabled={!formData.email || !formData.rating || !formData.text}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="gradient-btn flex-1 rounded-lg py-3 font-sans font-semibold text-brand-surface-lowest shadow-lg transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Send size={18} />
                  Enviar reseña
                </motion.button>
                <motion.button
                  type="button"
                  onClick={() => setShowForm(false)}
                  whileHover={{ scale: 1.02 }}
                  className="rounded-lg border-2 border-brand-outline/20 px-8 py-3 font-sans font-semibold text-brand-on-surface transition-colors hover:bg-brand-surface-low"
                >
                  Cancelar
                </motion.button>
              </div>
            </form>
          )}
        </motion.div>
      </div>

      {/* Success Animation - Paper Plane Flying */}
      <AnimatePresence>
        {showSuccessAnimation && (
          <motion.div
            initial={{ x: -100, y: 0, opacity: 0, rotate: -20 }}
            animate={{ x: 1000, y: -500, opacity: 1, rotate: 45 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeIn" }}
            className="pointer-events-none fixed left-1/2 top-1/2 z-50 text-4xl"
          >
            ✈️
          </motion.div>
        )}
      </AnimatePresence>
      </motion.div>
    </section>
  );
}

interface ReviewCardProps {
  review: Review;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

function ReviewCard({ review, isExpanded, onToggleExpand }: ReviewCardProps) {
  const displayText = isExpanded
    ? review.text
    : review.text.split(" ").slice(0, 20).join(" ") +
      (review.text.split(" ").length > 20 ? "..." : "");

  return (
    <motion.div
      layoutId={`card-${review.id}`}
      whileHover={{ y: -8 }}
      click={() => onToggleExpand()}
      className="group h-full cursor-pointer rounded-xl bg-brand-surface-lowest p-6 shadow-ambient transition-shadow hover:shadow-lg"
    >
      {/* Stars */}
      <div className="mb-4 flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={18}
            className={`transition-all ${
              star <= review.rating
                ? "fill-brand-primary text-brand-primary"
                : "text-brand-outline/20"
            }`}
          />
        ))}
      </div>

      {/* Review Text */}
      <motion.p
        layout
        className="mb-4 min-h-[80px] font-serif text-base italic text-brand-on-surface-variant leading-relaxed"
      >
        "{displayText}"
      </motion.p>

      {/* Bottom Section */}
      <div className="flex items-end justify-between">
        {/* Author & City */}
        <div>
          <div className="font-sans text-sm font-bold text-brand-on-surface">
            {review.author} {review.city}
          </div>
          <div className="mt-1 flex items-center gap-2">
            <span className="font-sans text-xs text-brand-secondary font-medium">
              {review.section}
            </span>
            {review.hasStreakBadge && (
              <span className="ml-1 inline-flex items-center gap-1 rounded-full bg-brand-primary/10 px-2 py-1">
                <span className="text-xs">🔥</span>
                <span className="text-xs font-semibold text-brand-primary">
                  Lector frecuente
                </span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Expand Indicator */}
      {!isExpanded && review.text.split(" ").length > 20 && (
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="mt-4 text-center text-xs text-brand-outline/60"
        >
          Haz clic para leer más
        </motion.div>
      )}

      {isExpanded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 text-center text-xs text-brand-outline/60"
        >
          Haz clic para contraer
        </motion.div>
      )}
    </motion.div>
  );
}
