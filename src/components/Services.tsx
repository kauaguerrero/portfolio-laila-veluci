import {
  FaVideo,
  FaCamera,
  FaTiktok,
  FaInstagram,
  FaBoxOpen,
  FaStar,
  FaBullhorn,
  FaMagic,
} from "react-icons/fa";
import { GiHanger } from "react-icons/gi";
import { HiOutlineFilm } from "react-icons/hi2";
import Reveal from "./Reveal";
import Section from "./Section";
import { services } from "../data/content";

const iconMap: Record<string, React.ReactNode> = {
  video: <FaVideo />,
  hanger: <GiHanger />,
  camera: <FaCamera />,
  reel: <HiOutlineFilm />,
  tiktok: <FaTiktok />,
  instagram: <FaInstagram />,
  box: <FaBoxOpen />,
  star: <FaStar />,
  megaphone: <FaBullhorn />,
  sparkles: <FaMagic />,
};

export default function Services() {
  return (
    <Section
      id="servicos"
      className="bg-blush-light"
      eyebrow="O que eu faço"
      title="Serviços"
      subtitle="Conteúdo pensado para valorizar produtos e aproximar marcas do público através de vídeos e fotos autênticas."
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
        {services.map((service, i) => (
          <Reveal key={service.title} delay={i * 0.05}>
            <div className="bg-white rounded-2xl p-6 h-full shadow-sm hover:shadow-md transition-shadow border border-mist/60 flex flex-col items-center text-center gap-3">
              <div className="w-12 h-12 rounded-full bg-blush-light flex items-center justify-center text-blush-dark text-xl">
                {iconMap[service.icon]}
              </div>
              <p className="font-medium text-ink text-sm">{service.title}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
