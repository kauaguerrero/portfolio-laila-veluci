import { FaInstagram, FaTiktok, FaEnvelope } from "react-icons/fa";
import Reveal from "./Reveal";
import Section from "./Section";
import { profile } from "../data/content";

export default function Contact() {
  return (
    <Section
      id="contato"
      className="bg-blush-light"
      eyebrow="Vamos conversar?"
      title="Contato"
      subtitle="Aberta a parcerias com lojas da região e marcas de qualquer lugar do Brasil ou do exterior."
    >
      <Reveal>
        <div className="max-w-lg mx-auto bg-white rounded-3xl p-10 shadow-md border border-mist/60 text-center">
          <h3 className="font-medium text-xl text-ink mb-1">
            {profile.name}
          </h3>
          <p className="text-charcoal/60 text-sm mb-8">UGC Creator</p>

          <div className="flex flex-col gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center justify-center gap-2 rounded-full bg-ink text-white px-6 py-3 text-sm font-medium hover:bg-charcoal transition-colors"
            >
              <FaEnvelope /> {profile.email}
            </a>
            <a
              href={profile.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 rounded-full border border-mist px-6 py-3 text-sm hover:border-blush-dark hover:text-blush-dark transition-colors"
            >
              <FaInstagram /> {profile.instagram}
            </a>
            <a
              href={profile.tiktokUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 rounded-full border border-mist px-6 py-3 text-sm hover:border-blush-dark hover:text-blush-dark transition-colors"
            >
              <FaTiktok /> {profile.tiktok}
            </a>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
