import Reveal from "./Reveal";
import Section from "./Section";

export default function HowItWorks() {
  return (
    <Section id="como-funciona" className="bg-white">
      <Reveal>
        <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-blush-light to-white rounded-3xl p-10 md:p-14 shadow-sm border border-mist/60">
          <span className="uppercase tracking-[0.2em] text-xs font-medium text-blush-dark">
            Como funciona
          </span>
          <h2 className="font-light text-3xl md:text-4xl text-ink mt-3 mb-6">
            Cada projeto, um plano sob medida
          </h2>
          <p className="text-charcoal/75 leading-relaxed">
            Cada projeto é desenvolvido conforme a necessidade da empresa. O
            orçamento varia conforme quantidade de conteúdos, tempo de
            gravação e objetivo da campanha. Atendo empresas locais e também
            marcas de outras cidades ou países.
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
