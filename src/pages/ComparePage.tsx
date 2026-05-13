import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { phrases } from "../data/phrases";

interface ComparisonScore {
  phrase: typeof phrases[0];
}

interface ComparePageProps {
  onNavigate?: (page: "home" | "comparar") => void;
}

export default function ComparePage({ onNavigate }: ComparePageProps) {
  const [card1, setCard1] = useState<ComparisonScore | null>(null);
  const [card2, setCard2] = useState<ComparisonScore | null>(null);
  const [comparisonCount, setComparisonCount] = useState(0);
  const [flippingCard, setFlippingCard] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Initialize random phrases ensuring they're from different sections
  const initializeCards = useMemo(() => {
    return () => {
      const sections = [1, 2, 3, 4, 5];
      const shuffledSections = sections.sort(() => Math.random() - 0.5);

      const section1 = shuffledSections[0];
      const section2 = shuffledSections[1];

      const phrasesSection1 = phrases.filter((p) => p.section === section1);
      const phrasesSection2 = phrases.filter((p) => p.section === section2);

      const randomPhrase1 =
        phrasesSection1[Math.floor(Math.random() * phrasesSection1.length)];
      const randomPhrase2 =
        phrasesSection2[Math.floor(Math.random() * phrasesSection2.length)];

      return [
        { phrase: randomPhrase1 },
        { phrase: randomPhrase2 },
      ];
    };
  }, []);

  useEffect(() => {
    const [newCard1, newCard2] = initializeCards();
    setCard1(newCard1);
    setCard2(newCard2);
  }, [initializeCards]);

  const handleVote = async (winner: 1 | 2) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setFlippingCard(winner === 1 ? 2 : 1);

    // Simulate DB update
    setTimeout(() => {
      const [newCard1, newCard2] = initializeCards();

      if (winner === 1) {
        setCard1(newCard1);
      } else {
        setCard2(newCard2);
      }

      setComparisonCount((prev) => prev + 1);
      setFlippingCard(null);
      setIsAnimating(false);
    }, 600);
  };

  const handleBackHome = () => {
    if (onNavigate) {
      onNavigate("home");
    } else {
      window.location.href = "/";
    }
  };

  return (
    <div className="min-h-screen bg-brand-surface-lowest pt-32 pb-20">
      {/* Back to Home Link */}
      <div className="absolute right-8 top-32 z-20">
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={handleBackHome}
          className="font-sans text-sm font-medium text-brand-secondary transition-opacity hover:opacity-80"
        >
          ← Volver al inicio
        </motion.button>
      </div>

      {/* Page Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-4 text-center"
      >
        <h1 className="font-serif text-5xl italic leading-tight text-brand-primary md:text-6xl">
          ¿Cuál frase te inspira más?
        </h1>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-16 text-center font-sans text-sm text-brand-on-surface-variant opacity-70"
      >
        Elige la que más resuene contigo — no hay respuesta incorrecta.
      </motion.p>

      {/* Cards Container */}
      <div className="mx-auto max-w-screen-2xl px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
          <AnimatePresence mode="popLayout" initial={false}>
            {card1 && (
              <motion.div
                key={`card1-${card1.phrase.id}`}
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                }}
              >
                <PhraseCard
                  card={card1}
                  isFlipping={flippingCard === 1}
                  isWinner={false}
                  onVote={() => handleVote(1)}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="popLayout" initial={false}>
            {card2 && (
              <motion.div
                key={`card2-${card2.phrase.id}`}
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                  delay: 0.1,
                }}
              >
                <PhraseCard
                  card={card2}
                  isFlipping={flippingCard === 2}
                  isWinner={false}
                  onVote={() => handleVote(2)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Gamification Badge */}
      <AnimatePresence>
        {comparisonCount > 5 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed bottom-8 right-8 z-30 flex items-center gap-2 rounded-full bg-brand-primary/10 px-4 py-3 shadow-lg"
          >
            <span className="text-xl">🔥</span>
            <span className="font-sans text-sm font-semibold text-brand-primary">
              ¡Llevas {comparisonCount} comparaciones!
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface PhraseCardProps {
  card: { phrase: (typeof phrases)[0] };
  isFlipping: boolean;
  isWinner: boolean;
  onVote: () => void;
}

function PhraseCard({ card, isFlipping, isWinner, onVote }: PhraseCardProps) {
  const phrase = card.phrase;

  return (
    <motion.div
      animate={
        isFlipping
          ? { rotateY: 180, opacity: 0 }
          : isWinner
            ? { scale: [1, 1.05, 1] }
            : { rotateY: 0, opacity: 1 }
      }
      transition={{
        duration: isFlipping ? 0.6 : isWinner ? 0.5 : 0.3,
      }}
      style={{ perspective: 1000 }}
    >
      <div className="relative overflow-hidden rounded-xl bg-brand-surface-lowest p-8 shadow-ambient transition-all hover:shadow-lg hover:-translate-y-1 md:p-12 md:min-h-[400px] flex flex-col items-center justify-center">
        {/* Phrase Text in Section Color - Italic Serif */}
        <div className="mb-8 text-center flex-1 flex items-center">
          <p className={`font-serif text-3xl italic leading-relaxed ${phrase.colorClass} md:text-4xl`}>
            {phrase.text}
          </p>
        </div>

        {/* Divider Line */}
        <div className="my-6 h-1 w-12 rounded-full bg-brand-outline-variant/20" />

        {/* Section Info */}
        <div className="mb-8 text-center">
          <p className="font-sans text-xs font-bold uppercase tracking-widest text-brand-on-surface-variant">
            Sección {phrase.section} · Página XX
          </p>
          <p className={`font-sans text-xs font-semibold tracking-wider ${phrase.colorClass} opacity-75`}>
            {phrase.sectionName}
          </p>
        </div>

        {/* Vote Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onVote}
          disabled={isFlipping}
          className="gradient-btn rounded-lg px-8 py-3 font-sans text-sm font-semibold uppercase tracking-wider text-brand-surface-lowest shadow-lg transition-opacity disabled:opacity-50"
        >
          ✨ Esta me inspira
        </motion.button>
      </div>
    </motion.div>
  );
}
