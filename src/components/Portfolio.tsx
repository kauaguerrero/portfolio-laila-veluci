import Reveal from "./Reveal";
import Section from "./Section";
import InstagramEmbed from "./InstagramEmbed";
import SocialCards from "./ui/card-fan-carousel";
import { portfolioItems, videoEmbeds } from "../data/content";

export default function Portfolio() {
  return (
    <Section
      id="portfolio"
      className="bg-white"
      eyebrow="Trabalhos"
      title="Portfólio"
      subtitle="Uma seleção de fotos e vídeos que mostram meu estilo de produção de conteúdo."
    >
      <SocialCards
        cards={portfolioItems.map((item) => ({
          imgUrl: item.src,
          alt: item.alt,
        }))}
      />

      {videoEmbeds.length > 0 && (
      <div className="mt-16">
        <Reveal>
          <h3 className="text-center font-light text-2xl text-ink mb-8">
            Vídeos
          </h3>
        </Reveal>
        <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {videoEmbeds.map((video, i) => (
            <Reveal key={video.id} delay={i * 0.1}>
              <div className="rounded-2xl overflow-hidden shadow-sm border border-mist/70 bg-cloud">
                <p className="text-center text-xs uppercase tracking-wider text-charcoal/50 pt-4 pb-2">
                  {video.label}
                </p>
                <InstagramEmbed url={video.url} caption={video.label} />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      )}
    </Section>
  );
}
