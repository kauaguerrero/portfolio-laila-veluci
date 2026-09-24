import Reveal from "./Reveal";
import Section from "./Section";
import { audience } from "../data/content";

export default function Audience() {
  return (
    <Section
      id="publico"
      className="bg-white"
      eyebrow="Nichos atendidos"
      title="Para quem é meu trabalho"
      subtitle="Atendendo negócios de todos os tamanhos."
    >
      <div className="flex flex-wrap justify-center gap-3">
        {audience.map((item, i) => (
          <Reveal key={item} delay={i * 0.03}>
            <span className="inline-block rounded-full border border-mist bg-cloud px-5 py-2 text-sm text-charcoal hover:bg-blush-light hover:border-blush transition-colors">
              {item}
            </span>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
