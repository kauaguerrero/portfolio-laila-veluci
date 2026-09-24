import { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";

export interface CardItem {
  imgUrl: string;
  alt?: string;
  linkUrl?: string;
}

interface SocialCardsProps {
  cards: CardItem[];
}

const MAX_VISIBLE = 7;
const HALF = 3;

const FAN_POSITIONS = [
  { rot: -21, scale: 0.7756, x: -30, y: 7.3, zIndex: 1 },
  { rot: -14, scale: 0.8498, x: -22, y: 4.0, zIndex: 2 },
  { rot: -7, scale: 0.9346, x: -11, y: 1.3, zIndex: 3 },
  { rot: 0, scale: 1.0, x: 0, y: 0.0, zIndex: 10 },
  { rot: 7, scale: 0.9346, x: 11, y: 1.3, zIndex: 3 },
  { rot: 14, scale: 0.8498, x: 22, y: 4.0, zIndex: 2 },
  { rot: 21, scale: 0.7756, x: 30, y: 7.3, zIndex: 1 },
];

function getResponsiveMultiplier(width: number) {
  if (width < 480) return 0.28;
  if (width < 640) return 0.38;
  if (width < 768) return 0.5;
  if (width < 1024) return 0.75;
  return 1.0;
}

/**
 * Returns a multiplier (0..1] that scales y-offsets and entry animation
 * distances when the viewport is too short for the ideal layout height.
 */
function getHeightMultiplier(width: number) {
  let idealPx: number;
  if (width < 480) idealPx = 18 * 16;
  else if (width < 640) idealPx = 21 * 16;
  else if (width < 768) idealPx = 23 * 16;
  else if (width < 1024) idealPx = 28 * 16;
  else idealPx = 32 * 16;

  const available = window.innerHeight * 0.7;
  if (available >= idealPx) return 1;
  return available / idealPx;
}

// Reference half-spread used to normalize the fan curve — kept fixed
// (matching the 7-slot FAN_POSITIONS table's own half-width) instead of
// scaling with the actual card count, so the step size per slot stays
// consistent regardless of how many cards are showing.
const SPREAD_NORM = 3;

function getSlotConfig(totalCards: number, slot: number) {
  if (totalCards >= MAX_VISIBLE) return FAN_POSITIONS[slot];
  // `center` is always an integer slot — the active/selected card is
  // mapped to exactly this slot (see getVisibleMap), so anchoring the
  // distance calc here (rather than a fractional true-center) guarantees
  // the selected card always renders at x=0, dead center. The trade-off
  // with an even card count is the two edges reach slightly different
  // extremes (one side has one more step than the other) — much less
  // noticeable than the selected card itself sitting off-center.
  const center = totalCards >> 1;
  const step = slot - center;
  const distance = step / SPREAD_NORM;
  const absDistance = Math.abs(distance);
  return {
    rot: distance * 21,
    scale: 1.0 - 0.2244 * absDistance * absDistance,
    x: distance * 30,
    y: absDistance * absDistance * 7.3,
    zIndex: 10 - Math.abs(step),
  };
}

const ARROW_CLASSES =
  "relative flex items-center justify-center rounded-full border border-mist bg-white text-ink cursor-pointer shrink-0 z-30 outline-none shadow-md hover:border-blush-dark hover:text-blush-dark active:opacity-70 transition-colors duration-300";

export default function SocialCards({ cards }: SocialCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);
  const hasEntered = useRef(false);
  const directionRef = useRef<"left" | "right" | null>(null);
  const prevVisible = useRef<Set<number>>(new Set());

  const totalCards = cards.length;
  const needsPagination = totalCards > MAX_VISIBLE;
  const [centerIndex, setCenterIndex] = useState(
    needsPagination ? HALF : totalCards >> 1,
  );

  const getVisibleMap = useCallback(
    (center: number) => {
      const map = new Map<number, number>();
      if (!needsPagination) {
        // All cards stay visible; their slot rotates around the center like
        // a wheel so the hovered/selected card always lands in the middle.
        const centerSlot = totalCards >> 1;
        for (let i = 0; i < totalCards; i++) {
          const slot =
            (((i - center + centerSlot) % totalCards) + totalCards) %
            totalCards;
          map.set(i, slot);
        }
        return map;
      }
      for (let slot = 0; slot < MAX_VISIBLE; slot++) {
        map.set(
          (((center + slot - HALF) % totalCards) + totalCards) % totalCards,
          slot,
        );
      }
      return map;
    },
    [totalCards, needsPagination],
  );

  const cycle = useCallback(
    (direction: "left" | "right") => {
      if (isAnimating.current || totalCards < 2) return;
      isAnimating.current = true;
      directionRef.current = direction;
      setCenterIndex((prev) =>
        direction === "right"
          ? (prev + 1) % totalCards
          : (prev - 1 + totalCards) % totalCards,
      );
    },
    [totalCards],
  );

  const jumpTo = useCallback(
    (targetIndex: number) => {
      // Cards physically slide across each other during the rotation, which
      // means a stationary cursor ends up over a *different* card mid-flight
      // and re-triggers mouseenter — without this gate that turns into an
      // infinite retrigger loop that never lets the wheel settle.
      if (isAnimating.current || targetIndex === centerIndex) return;
      isAnimating.current = true;
      let diff = targetIndex - centerIndex;
      if (diff > totalCards / 2) diff -= totalCards;
      if (diff < -totalCards / 2) diff += totalCards;
      directionRef.current = diff >= 0 ? "right" : "left";
      setCenterIndex(targetIndex);
    },
    [centerIndex, totalCards],
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !totalCards) return;

    const cardElements = Array.from(
      container.querySelectorAll<HTMLElement>(".fan-card"),
    );
    if (!cardElements.length) return;

    const visibleMap = getVisibleMap(centerIndex);
    const previouslyVisible = prevVisible.current;
    const direction = directionRef.current;
    const isFirstMount = !hasEntered.current;
    const multiplier = getResponsiveMultiplier(window.innerWidth);
    const hMult = getHeightMultiplier(window.innerWidth);
    const slotCount = needsPagination ? MAX_VISIBLE : totalCards;
    const config = (slot: number) => getSlotConfig(slotCount, slot);

    if (isFirstMount) isAnimating.current = true;

    let completedCount = 0;
    const visibleCount = visibleMap.size;
    const onCardDone = () => {
      if (++completedCount >= visibleCount) {
        isAnimating.current = false;
        if (isFirstMount) hasEntered.current = true;
      }
    };

    const slotCenter = slotCount >> 1;

    cardElements.forEach((card, cardIndex) => {
      const slot = visibleMap.get(cardIndex);
      const wasVisible = previouslyVisible.has(cardIndex);

      if (slot !== undefined) {
        const { x, y, rot, scale, zIndex } = config(slot);
        const isNewCenter = cardIndex === centerIndex;
        // A little extra lift + pop on the card becoming the center gives
        // the "coming forward" zoom feel instead of a flat reposition.
        const target = {
          x: `${x * multiplier}rem`,
          y: `${(isNewCenter ? y - 2 : y) * multiplier * hMult}rem`,
          xPercent: -50,
          yPercent: -50,
          rotation: rot,
          scale: isNewCenter ? scale * 1.04 : scale,
          opacity: 1,
          zIndex,
        };
        const distanceFromCenter = Math.abs(slot - slotCenter);

        if (isFirstMount) {
          gsap.set(card, {
            x: 0,
            y: `${12 * hMult}rem`,
            xPercent: -50,
            yPercent: -50,
            rotation: 0,
            scale: 0.5,
            opacity: 0,
          });
          gsap.to(card, {
            ...target,
            duration: 1.2,
            ease: "elastic.out(1.05,.78)",
            delay: 0.2 + slot * 0.06,
            onComplete: onCardDone,
          });
        } else if (!wasVisible) {
          const enterX = direction === "right" ? 40 : -40;
          gsap.set(card, {
            x: `${enterX}rem`,
            y: `${y * multiplier * hMult}rem`,
            xPercent: -50,
            yPercent: -50,
            rotation: direction === "right" ? 30 : -30,
            scale: 0.5,
            opacity: 0,
          });
          gsap.to(card, {
            ...target,
            duration: 0.5,
            ease: "back.out(1.6)",
            onComplete: onCardDone,
          });
        } else {
          gsap.to(card, {
            ...target,
            duration: 0.65,
            delay: distanceFromCenter * 0.05,
            ease: "power3.out",
            overwrite: "auto",
            onComplete: onCardDone,
          });
        }
      } else if (wasVisible) {
        const exitX = direction === "right" ? -40 : 40;
        gsap.to(card, {
          x: `${exitX}rem`,
          xPercent: -50,
          yPercent: -50,
          opacity: 0,
          scale: 0.5,
          rotation: direction === "right" ? -30 : 30,
          duration: 0.4,
          ease: "power2.in",
          zIndex: 0,
        });
      } else if (isFirstMount) {
        gsap.set(card, {
          opacity: 0,
          scale: 0.3,
          x: 0,
          y: 0,
          xPercent: -50,
          yPercent: -50,
          zIndex: 0,
        });
      }
    });

    prevVisible.current = new Set(visibleMap.keys());

    const visibleEntries: { el: HTMLElement; slot: number; cardIndex: number }[] =
      [];
    cardElements.forEach((el, i) => {
      const slot = visibleMap.get(i);
      if (slot !== undefined) visibleEntries.push({ el, slot, cardIndex: i });
    });

    const applyLayout = () => {
      if (isAnimating.current) return;
      const mult = getResponsiveMultiplier(window.innerWidth);
      const hM = getHeightMultiplier(window.innerWidth);
      visibleEntries.forEach(({ el, slot }) => {
        const base = config(slot);
        gsap.to(el, {
          x: `${base.x * mult}rem`,
          y: `${base.y * mult * hM}rem`,
          xPercent: -50,
          yPercent: -50,
          rotation: base.rot,
          scale: base.scale,
          zIndex: base.zIndex,
          duration: 0.3,
          ease: "power2.out",
          overwrite: "auto",
        });
      });
    };
    window.addEventListener("resize", applyLayout);

    return () => {
      window.removeEventListener("resize", applyLayout);
    };
  }, [centerIndex, totalCards, getVisibleMap, needsPagination]);

  if (!totalCards) return null;

  const chevron = (direction: "left" | "right") => (
    <svg
      className="relative z-[2] w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points={direction === "left" ? "15 18 9 12 15 6" : "9 18 15 12 9 6"} />
    </svg>
  );

  return (
    <section className="flex flex-col items-center w-full py-4 lg:py-8 px-4 md:px-8 relative z-20">
      <div className="flex items-center justify-center w-full max-w-[90rem]">
        <div
          ref={containerRef}
          className="fan-layout flex relative justify-center items-center w-full max-w-[80rem]"
        >
          {cards.map((card, index) => {
            const isActive = index === centerIndex;
            const image = (
              <div className="relative w-full h-full overflow-hidden">
                <img
                  src={card.imgUrl}
                  loading="lazy"
                  alt={card.alt || `Card ${index}`}
                  className="absolute inset-0 w-full h-full object-cover z-10"
                />
              </div>
            );
            return card.linkUrl ? (
              <a
                key={index}
                href={card.linkUrl}
                target={card.linkUrl.startsWith("http") ? "_blank" : "_self"}
                rel="noopener noreferrer"
                className={`fan-card block cursor-pointer ${isActive ? "is-active" : ""}`}
              >
                {image}
              </a>
            ) : (
              <div
                key={index}
                onClick={() => jumpTo(index)}
                className={`fan-card cursor-pointer ${isActive ? "is-active" : ""}`}
              >
                {image}
              </div>
            );
          })}
        </div>
      </div>

      {totalCards > 1 && (
        <div className="flex items-center justify-center gap-4 mt-8 md:mt-6 z-30">
          <button
            className={`${ARROW_CLASSES} w-10 h-10 md:w-12 md:h-12`}
            onClick={() => cycle("left")}
            aria-label="Anterior"
          >
            {chevron("left")}
          </button>
          <div className="flex items-center gap-2">
            {cards.map((_, i) => (
              <button
                key={i}
                onClick={() => jumpTo(i)}
                aria-label={`Ir para foto ${i + 1}`}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === centerIndex
                    ? "bg-ink scale-[1.3]"
                    : "bg-ink/20 hover:bg-ink/40"
                }`}
              />
            ))}
          </div>
          <button
            className={`${ARROW_CLASSES} w-10 h-10 md:w-12 md:h-12`}
            onClick={() => cycle("right")}
            aria-label="Próxima"
          >
            {chevron("right")}
          </button>
        </div>
      )}
    </section>
  );
}
