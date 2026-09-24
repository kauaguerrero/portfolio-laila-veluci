import Reveal from "./Reveal";
import Section from "./Section";

export default function FuturePartners() {
  return (
    <Section id="parceiros" className="bg-white">
      <Reveal>
        <div className="max-w-3xl mx-auto text-center border-2 border-dashed border-mist rounded-3xl p-10 md:p-14">
          <span className="uppercase tracking-[0.2em] text-xs font-medium text-blush-dark">
            Em breve
          </span>
          <h2 className="font-light text-2xl md:text-3xl text-ink mt-3 mb-4">
            Marcas Parceiras &amp; Resultados
          </h2>
          <p className="text-charcoal/60 leading-relaxed">
            Espaço reservado para logos de marcas parceiras, depoimentos de
            clientes, prints de resultados e estatísticas de campanhas
            realizadas.
          </p>
        </div>
      </Reveal>
    </Section>
  );
}
