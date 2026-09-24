import Reveal from "./Reveal";
import Section from "./Section";
import { profile } from "../data/content";

export default function About() {
  return (
    <Section id="sobre" className="bg-white">
      <div className="grid md:grid-cols-2 gap-14 items-center">
        <Reveal>
          <div className="aspect-[4/5] rounded-3xl bg-cloud shadow-md overflow-hidden max-w-md mx-auto">
            <img
              src="/img/about-placeholder.jpeg"
              alt={`Foto de ${profile.name}`}
              className="w-full h-full object-cover"
            />
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <span className="uppercase tracking-[0.2em] text-xs font-medium text-blush-dark">
            Sobre mim
          </span>
          <h2 className="font-light text-3xl md:text-4xl text-ink mt-3 mb-6">
            Quem produz o conteúdo
          </h2>
          <div className="space-y-4 text-charcoal/80 leading-relaxed">
            {profile.aboutText.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
