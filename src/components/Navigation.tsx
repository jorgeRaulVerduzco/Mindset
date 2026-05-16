import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const navLinks = [
  { name: "Inicio", href: "#hero", type: "anchor" },
  { name: "Frase del Día", href: "#frase", type: "anchor" },
  { name: "¿Cuál te inspira Mas?", href: "/comparar", type: "page" },
  { name: "Explorar", href: "#explorar", type: "anchor" },
  { name: "Sobre el autor", href: "#autor", type: "anchor" },
];

interface NavigationProps {
  onNavigate?: (page: "home" | "comparar") => void;
  currentPage?: "home" | "comparar";
}

export default function Navigation({ onNavigate, currentPage }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent, link: (typeof navLinks)[0]) => {
    if (link.type === "page" && onNavigate) {
      e.preventDefault();
      const page = link.href === "/comparar" ? "comparar" : "home";
      onNavigate(page);
      setIsMenuOpen(false);
    } else if (link.type === "anchor") {
      if (currentPage === "comparar" && onNavigate) {
        e.preventDefault();
        onNavigate("home");
        setIsMenuOpen(false);
        setTimeout(() => {
          const target = document.querySelector(link.href);
          if (target) {
            target.scrollIntoView({ behavior: "smooth" });
          } else {
            window.location.hash = link.href;
          }
        }, 100);
      } else {
        setIsMenuOpen(false);
      }
    }
  };

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "glass-nav py-3 shadow-ambient" : "py-6"
      }`}
    >
      <div className="mx-auto flex max-w-screen-2xl items-center justify-between px-8">
        <button
          onClick={() => {
            if (onNavigate) {
              onNavigate("home");
            } else {
              window.location.href = "/";
            }
          }}
          className="font-serif text-2xl font-medium italic text-brand-on-surface transition-opacity hover:opacity-80"
        >
          Yaqui Valley
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            link.type === "page" ? (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link)}
                className={`font-sans text-sm font-medium tracking-wide transition-colors ${
                  currentPage === "comparar" && link.href === "/comparar"
                    ? "text-brand-on-surface"
                    : "text-brand-on-surface-variant hover:text-brand-on-surface"
                }`}
              >
                {link.name}
              </a>
            ) : (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link)}
                className="font-sans text-sm font-medium tracking-wide text-brand-on-surface-variant transition-colors hover:text-brand-on-surface"
              >
                {link.name}
              </a>
            )
          ))}
          <a
            href="#descargar"
            onClick={(e) => handleNavClick(e, { name: "Descargar", href: "#descargar", type: "anchor" })}
            className="rounded-md px-6 py-2.5 text-xs font-semibold uppercase tracking-widest text-white shadow-sm hover:opacity-90 active:scale-95 transition-all"
            style={{ backgroundColor: "#E8621A" }}
          >
            Descargar
          </a>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="p-2 text-brand-on-surface md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute left-0 top-full w-full bg-brand-surface-lowest px-8 py-6 shadow-ambient md:hidden"
          >
            <nav className="flex flex-col gap-6">
              {navLinks.map((link) => (
                link.type === "page" ? (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link)}
                    className="font-sans text-lg font-medium text-brand-on-surface-variant"
                  >
                    {link.name}
                  </a>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link)}
                    className="font-sans text-lg font-medium text-brand-on-surface-variant"
                  >
                    {link.name}
                  </a>
                )
              ))}
              <a
                href="#descargar"
                onClick={(e) => handleNavClick(e, { name: "Descargar", href: "#descargar", type: "anchor" })}
                className="w-full rounded-md py-4 text-center text-sm font-semibold uppercase tracking-widest text-white"
                style={{ backgroundColor: "#E8621A" }}
              >
                Descargar
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
