import { motion } from "framer-motion";
import { profile } from "../data/content";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center pt-28 pb-16 px-6 bg-gradient-to-b from-blush-light to-white overflow-hidden"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center w-full">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span className="uppercase tracking-[0.2em] text-xs font-medium text-blush-dark">
            Portfólio &amp; Media Kit
          </span>
          <h1 className="font-light text-4xl md:text-6xl text-ink mt-4 leading-tight">
            {profile.name}
          </h1>
          <p className="text-charcoal/80 text-lg mt-3">{profile.title}</p>
          <p className="text-charcoal/70 mt-6 leading-relaxed max-w-md">
            {profile.heroText}
          </p>

          <div className="flex flex-wrap gap-4 mt-10">
            <a
              href="#portfolio"
              className="rounded-full bg-ink text-white px-7 py-3 text-sm font-medium hover:bg-charcoal transition-colors shadow-sm"
            >
              Ver Portfólio
            </a>
            <a
              href="#contato"
              className="rounded-full border border-ink/20 text-ink px-7 py-3 text-sm font-medium hover:border-blush-dark hover:text-blush-dark transition-colors"
            >
              Entrar em Contato
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          className="relative"
        >
          <div className="aspect-[4/5] rounded-[2rem] bg-gradient-to-br from-blush to-blush-light shadow-xl overflow-hidden flex items-center justify-center">
            <img
              src="/img/hero-placeholder.jpeg"
              alt={profile.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 w-28 h-28 rounded-full bg-white shadow-lg hidden md:block" />
        </motion.div>
      </div>
    </section>
  );
}
