import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote, Heart, Share2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { phrases } from "../data/phrases";

export default function QuoteCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [framesRead, setFramesRead] = useState(0);
  const [showQuoteLabel, setShowQuoteLabel] = useState(() => {
    const today = new Date().toDateString();
    const lastQuoteLabelDate = localStorage.getItem("quoteLabeljosDate");
    return lastQuoteLabelDate !== today;
  });
  const [likedPhrases, setLikedPhrases] = useState<Set<number>>(new Set());
  const [phraseLikes, setPhraseLikes] = useState<Record<number, number>>({});
  const [animatingHeartId, setAnimatingHeartId] = useState<number | null>(null);

  // Load likes from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("framesRead");
    if (saved) {
      setFramesRead(parseInt(saved));
    }

    const savedLikes = localStorage.getItem("likedPhrases");
    if (savedLikes) {
      try {
        setLikedPhrases(new Set(JSON.parse(savedLikes)));
      } catch (e) {
        console.error("Failed to load liked phrases", e);
      }
    }

    const savedPhraseLikes = localStorage.getItem("phraseLikes");
    if (savedPhraseLikes) {
      try {
        setPhraseLikes(JSON.parse(savedPhraseLikes));
      } catch (e) {
        console.error("Failed to load phrase likes", e);
      }
    }
  }, []);

  // Initialize phrase likes if not already in localStorage
  useEffect(() => {
    const hasInitialized = localStorage.getItem("phraseLikesInitialized");
    if (!hasInitialized) {
      const initialLikes: Record<number, number> = {};
      phrases.forEach((phrase) => {
        initialLikes[phrase.id] = phrase.likes;
      });
      setPhraseLikes(initialLikes);
      localStorage.setItem("phraseLikes", JSON.stringify(initialLikes));
      localStorage.setItem("phraseLikesInitialized", "true");
    }
  }, []);

  // Save "Frase del Día" date label
  useEffect(() => {
    if (showQuoteLabel) {
      const timer = setTimeout(() => {
        setShowQuoteLabel(false);
        const today = new Date().toDateString();
        localStorage.setItem("quoteLabeljosDate", today);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showQuoteLabel]);

  // Increment counter when viewing a phrase
  useEffect(() => {
    const updated = framesRead + 1;
    setFramesRead(updated);
    localStorage.setItem("framesRead", updated.toString());
  }, [currentIndex]);

  const nextQuote = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % phrases.length);
  };

  const prevQuote = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + phrases.length) % phrases.length);
  };

  const handleLike = (phraseId: number) => {
    setAnimatingHeartId(phraseId);
    setTimeout(() => setAnimatingHeartId(null), 600);

    const isLiked = likedPhrases.has(phraseId);
    const newLikedPhrases = new Set(likedPhrases);
    const newPhraseLikes = { ...phraseLikes };

    if (isLiked) {
      newLikedPhrases.delete(phraseId);
      newPhraseLikes[phraseId] = (newPhraseLikes[phraseId] || 0) - 1;
    } else {
      newLikedPhrases.add(phraseId);
      newPhraseLikes[phraseId] = (newPhraseLikes[phraseId] || 0) + 1;
    }

    setLikedPhrases(newLikedPhrases);
    setPhraseLikes(newPhraseLikes);
    localStorage.setItem("likedPhrases", JSON.stringify(Array.from(newLikedPhrases)));
    localStorage.setItem("phraseLikes", JSON.stringify(newPhraseLikes));
  };

  const currentPhrase = phrases[currentIndex];
  const currentLikeCount = phraseLikes[currentPhrase.id] || currentPhrase.likes;
  const isLiked = likedPhrases.has(currentPhrase.id);

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
    <section id="frase" className="bg-brand-surface-low py-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mx-auto max-w-screen-md px-8 text-center"
      >
        <div className="mb-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full bg-brand-surface-lowest px-4 py-2 shadow-ambient"
          >
            <span className="text-xl">🔥</span>
            <span className="font-sans text-sm font-medium text-brand-on-surface">
              Llevas 3 días seguidos leyendo
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 rounded-full bg-brand-primary/10 px-4 py-2 shadow-ambient"
          >
            <span className="text-xl">📚</span>
            <span className="font-sans text-sm font-medium text-brand-primary">
              {framesRead} frase{framesRead !== 1 ? 's' : ''} leída{framesRead !== 1 ? 's' : ''}
            </span>
          </motion.div>
        </div>

        <div className="relative flex items-center justify-center">
          <button
            onClick={prevQuote}
            className="absolute -left-4 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-brand-surface-lowest text-brand-on-surface shadow-ambient transition-all hover:scale-110 hover:text-brand-primary active:scale-95 md:-left-16 md:h-14 md:w-14"
          >
            <ChevronLeft size={24} />
          </button>

          <div className="relative min-h-[400px] w-full overflow-hidden rounded-xl bg-brand-surface-lowest p-12 shadow-ambient">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="absolute inset-0 flex flex-col items-center justify-center p-12"
              >
                {showQuoteLabel && (
                  <p className="mb-8 font-serif text-xl italic text-brand-on-surface-variant opacity-60">
                    Frase del Día
                  </p>
                )}
                <Quote size={48} className={`mb-8 opacity-30 ${currentPhrase.colorClass}`} />
                <h2 className={`mb-8 font-serif text-3xl italic leading-tight md:text-5xl ${currentPhrase.colorClass}`}>
                  {currentPhrase.text}
                </h2>
                <p className="mb-2 font-sans text-xs font-bold uppercase tracking-[0.2em] text-brand-on-surface-variant">
                  {`Sección ${currentPhrase.section} · Página XX`}
                </p>
                <p className={`font-sans text-xs font-semibold tracking-[0.1em] ${currentPhrase.colorClass} opacity-75`}>
                  {currentPhrase.sectionName}
                </p>

                <div className="mt-10 flex w-full justify-center gap-8 border-t border-brand-outline-variant/10 pt-8">
                  <motion.button
                    onClick={() => handleLike(currentPhrase.id)}
                    className={`group flex items-center gap-2 transition-colors ${
                      isLiked ? "text-brand-primary" : "text-brand-on-surface-variant hover:text-brand-primary"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      animate={
                        animatingHeartId === currentPhrase.id
                          ? {
                              scale: [1, 1.3, 0.9, 1],
                            }
                          : { scale: 1 }
                      }
                      transition={{ duration: 0.6 }}
                    >
                      <Heart
                        size={18}
                        className={`transition-all ${isLiked ? "fill-brand-primary" : "group-hover:fill-brand-primary/50"}`}
                      />
                    </motion.div>
                    <span className="font-sans text-sm font-medium">
                      {currentLikeCount > 0 ? currentLikeCount : "Me gusta"}
                    </span>
                  </motion.button>
                  <button className="group flex items-center gap-2 text-brand-on-surface-variant transition-colors hover:text-brand-primary">
                    <Share2 size={18} />
                    <span className="font-sans text-sm font-medium">Compartir</span>
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            onClick={nextQuote}
            className="absolute -right-4 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-brand-surface-lowest text-brand-on-surface shadow-ambient transition-all hover:scale-110 hover:text-brand-primary active:scale-95 md:-right-16 md:h-14 md:w-14"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </motion.div>
    </section>
  );
}
