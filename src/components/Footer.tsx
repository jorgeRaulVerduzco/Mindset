import { Linkedin, Twitter, Globe, Youtube } from "lucide-react";

export default function Footer() {
  const socialLinks = [
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/jesusgaxiola/",
      icon: Linkedin,
    },
    {
      name: "Twitter/X",
      url: "https://x.com/jesusgaxiola",
      icon: Twitter,
    },
    {
      name: "Website",
      url: "https://jesusgaxiola.com",
      icon: Globe,
    },
    {
      name: "YouTube",
      url: "https://youtube.com/@jesusgaxiola",
      icon: Youtube,
    },
  ];

  return (
    <footer className="bg-brand-secondary text-brand-surface-lowest">
      <div className="mx-auto max-w-screen-2xl px-12 py-16">
        <div className="mb-12 flex flex-col items-center gap-8 md:flex-row md:justify-between">
          {/* Book Cover & Info */}
          <div className="flex items-center gap-8">
            <div className="h-24 w-16 overflow-hidden rounded shadow-ambient">
              <img
                src="/images/book-cover.jpg"
                alt="Book thumbnail"
                className="h-full w-full object-cover opacity-80"
              />
            </div>
            <div>
              <div className="mb-2 font-serif text-2xl italic leading-none">
                El Mindset Innovador
              </div>
              <p className="mb-3 font-sans text-sm tracking-widest opacity-70">
                por Jesús A. Gaxiola
              </p>
              <p className="font-sans text-xs opacity-60">
                © 2025 Yaqui Valley · El Mindset Innovador · Más del autor:{" "}
                <a
                  href="https://jesusgaxiola.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  jesusgaxiola.com
                </a>
              </p>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex flex-col items-center gap-4">
            <p className="font-sans text-sm font-medium tracking-wide">Sígueme en:</p>
            <div className="flex gap-6">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={social.name}
                    className="transition-all hover:scale-125 hover:opacity-100 opacity-70"
                  >
                    <Icon size={24} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Navigation Link */}
        <div className="border-t border-brand-surface-lowest/20 pt-8 text-center">
          <a
            href="https://jesusgaxiola.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-sm font-medium tracking-wide opacity-70 transition-opacity hover:opacity-100"
          >
            Conoce más del autor
          </a>
        </div>
      </div>
    </footer>
  );
}
