import { useEffect, useState } from "react";

const links = [
  { href: "#inicio", label: "Início" },
  { href: "#sobre", label: "Sobre" },
  { href: "#servicos", label: "Serviços" },
  { href: "#portfolio", label: "Portfólio" },
  { href: "#experiencias", label: "Experiências" },
  { href: "#contato", label: "Contato" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-2">
        <a href="#inicio" className="shrink-0">
          <img
            src="/logo.svg"
            alt="Laila Veluci"
            className="h-16 md:h-20 w-auto"
          />
        </a>

        <ul className="hidden md:flex items-center gap-8 text-sm text-charcoal">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="hover:text-blush-dark transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Abrir menu"
        >
          <span className="w-6 h-0.5 bg-ink block" />
          <span className="w-6 h-0.5 bg-ink block" />
          <span className="w-6 h-0.5 bg-ink block" />
        </button>
      </nav>

      {open && (
        <ul className="md:hidden bg-white/95 backdrop-blur-md px-6 pb-6 flex flex-col gap-4 text-sm shadow-sm">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-1 hover:text-blush-dark transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
