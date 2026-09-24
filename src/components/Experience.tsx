import { FaCheck } from "react-icons/fa";
import Reveal from "./Reveal";
import Section from "./Section";
import { experiences } from "../data/content";

export default function Experience() {
  return (
    <Section
      id="experiencias"
      className="bg-blush-light"
      eyebrow="Trajetória"
      title="Experiências"
    >
      <div className="max-w-2xl mx-auto space-y-4">
        {experiences.map((item, i) => (
          <Reveal key={item} delay={i * 0.06}>
            <div className="flex items-start gap-4 bg-white rounded-2xl p-5 shadow-sm border border-mist/60">
              <span className="mt-1 w-6 h-6 shrink-0 rounded-full bg-blush flex items-center justify-center text-ink text-xs">
                <FaCheck />
              </span>
              <p className="text-charcoal/85 leading-relaxed">{item}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
