import { Link } from "@tanstack/react-router";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Pause, Play } from "lucide-react";
import { lazy, Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/editorial";
import bathroom from "@/assets/lesbest-clean-bathroom.webp";
import industrial from "@/assets/lesbest-clean-industrial.webp";
import kitchen from "@/assets/lesbest-deep-clean-kitchen.webp";
import bedroom from "@/assets/lesbest-clean-bedroom.webp";
import teamIntro from "@/assets/lesbest-team-intro.webp";

const ShaderBackground = lazy(() => import("@/components/effects/shader-background").then((m) => ({ default: m.ShaderBackground })));

const DELAY = 7000;
const wrap = "mx-auto max-w-[1500px] px-5 md:px-10";

const slides = [
  {
    image: teamIntro, position: "50% 0%", alt: "Three Lesbest cleaning professionals with floor-care equipment in a luxury living room",
    eyebrow: "Cleaning and property care in Uyo, Akwa Ibom",
    line: "Every space,", accent: "properly cared for.",
    body: "From private homes to offices and production floors, we deliver thorough, consistent cleaning that leaves every space ready to use.",
    primary: { label: "Request a quote", to: "/contact" }, secondary: { label: "Explore services", to: "/services" },
  },
  {
    image: bathroom, position: "50% 43%", alt: "A Lesbest cleaner polishing the floor of a luxury bathroom",
    eyebrow: "Home cleaning · Uyo, Akwa Ibom",
    line: "Room by room,", accent: "beautifully kept.",
    body: "Reliable cleaning for apartments, family homes and private residences, with careful attention to kitchens, bathrooms and your finishes.",
    primary: { label: "Request a quote", to: "/contact" }, secondary: { label: "Home cleaning", slug: "home" },
  },
  {
    image: industrial, position: "50% 45%", alt: "Lesbest team cleaning a food-and-beverage production facility",
    eyebrow: "Industrial & commercial cleaning",
    line: "Where business happens,", accent: "spotless.",
    body: "Scheduled programmes for offices, factories and production floors, built around your operating hours.",
    primary: { label: "Request a quote", to: "/contact" }, secondary: { label: "Industrial cleaning", slug: "industrial" },
  },
  {
    image: kitchen, position: "50% 0%", alt: "Two Lesbest cleaners wiping a stone counter and vacuuming the floor of a modern Nigerian kitchen",
    eyebrow: "Deep cleaning",
    line: "Reset every surface,", accent: "top to bottom.",
    body: "For move-ins, post-renovation spaces and seasonal resets: detailed work on every finish and fitting.",
    primary: { label: "Request a quote", to: "/contact" }, secondary: { label: "Deep cleaning", slug: "deep-cleaning" },
  },
  {
    image: bedroom, position: "50% 20%", alt: "A Lesbest cleaner dusting a bedside table in a calm master bedroom",
    eyebrow: "Resident cleaning",
    line: "A familiar team,", accent: "every visit.",
    body: "Ongoing care for estates, residences and serviced apartments, from a consistent team who know your property, on a schedule that suits you.",
    primary: { label: "Request a quote", to: "/contact" }, secondary: { label: "Resident cleaning", slug: "resident" },
  },
] as const;

const container = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } }, exit: { opacity: 0, transition: { duration: 0.25 } } };
const rise = { hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.2, 0.7, 0.2, 1] as const } } };

export function HeroSlider() {
  const reduce = useReducedMotion();
  const [playing, setPlaying] = useState(true);
  const autoplay = useMemo(() => Autoplay({ delay: DELAY, stopOnInteraction: false, stopOnMouseEnter: true }), []);
  const [viewportRef, embla] = useEmblaCarousel({ loop: true, duration: 30 }, [Fade(), autoplay]);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!embla) return;
    const onSelect = () => setSelected(embla.selectedScrollSnap());
    embla.on("select", onSelect);
    return () => { embla.off("select", onSelect); };
  }, [embla]);

  // Autoplay stays off for visitors who ask for reduced motion, and follows the pause button otherwise.
  useEffect(() => {
    if (!embla) return;
    const ap = embla.plugins().autoplay;
    if (!ap) return;
    if (reduce || !playing) ap.stop(); else ap.play();
  }, [embla, reduce, playing]);

  const goTo = useCallback((i: number) => embla?.scrollTo(i), [embla]);
  const s = slides[selected] ?? slides[0];
  const running = playing && !reduce;

  return (
    <section className="relative min-h-[62vh] overflow-hidden bg-primary text-primary-foreground md:min-h-[calc(100vh-4.5rem)]" aria-roledescription="carousel" aria-label="Featured services">
      <Suspense fallback={null}><ShaderBackground className="opacity-60" /></Suspense>
      <div className="absolute inset-0" ref={viewportRef}>
        <div className="flex h-full">
          {slides.map((slide, i) => (
            <div key={slide.image} className="relative h-full min-w-0 flex-[0_0_100%]" aria-roledescription="slide" aria-label={`${i + 1} of ${slides.length}`}>
              <img
                src={slide.image} alt={slide.alt} style={{ objectPosition: slide.position, transformOrigin: slide.image === kitchen ? "50% 0%" : undefined }} width={slide.image === industrial || slide.image === teamIntro || slide.image === kitchen ? 1536 : 1024} height={slide.image === industrial || slide.image === teamIntro || slide.image === kitchen ? 1024 : 1536}
                loading={i === 0 ? "eager" : "lazy"} fetchPriority={i === 0 ? "high" : "auto"}
                className={`absolute inset-0 h-full w-full object-cover opacity-75 ease-out ${!reduce && i === selected ? "scale-110 duration-[9000ms]" : "scale-100 duration-[1600ms]"} transition-transform`}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/25 to-primary/35" />

      <div className={`${wrap} pointer-events-none relative flex min-h-[62vh] flex-col justify-end pb-24 md:min-h-[calc(100vh-4.5rem)] md:pb-28`}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={selected} variants={container} initial="hidden" animate="show" exit="exit" className="pointer-events-auto">
            <motion.div variants={rise}><Eyebrow light>{s.eyebrow}</Eyebrow></motion.div>
            <motion.h1 variants={rise} className="max-w-5xl text-5xl leading-[.9] md:text-8xl lg:text-[8.5rem]">
              {s.line}<br /><em className="text-accent">{s.accent}</em>
            </motion.h1>
            <div className="mt-7 flex max-w-4xl flex-col gap-6 border-t border-primary-foreground/40 pt-5 md:flex-row md:items-end md:justify-between">
              <motion.p variants={rise} className="max-w-lg text-sm leading-7 text-primary-foreground/85">{s.body}</motion.p>
              <motion.div variants={rise} className="flex flex-wrap gap-3">
                <Button asChild className="bg-primary-foreground text-primary hover:bg-accent"><Link to={s.primary.to}>{s.primary.label}</Link></Button>
                <Button asChild variant="light">{"slug" in s.secondary ? <Link to="/services/$serviceSlug" params={{ serviceSlug: s.secondary.slug }}>{s.secondary.label}</Link> : <Link to={s.secondary.to}>{s.secondary.label}</Link>}</Button>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className={`${wrap} absolute inset-x-0 bottom-0 pb-6 max-md:pr-[5.5rem] md:pb-9`}>
        <div className="flex items-center gap-4">
          <span className="font-display text-sm tabular-nums text-primary-foreground/80" aria-hidden="true">0{selected + 1} / 0{slides.length}</span>
          <div className="flex flex-1 gap-2 md:max-w-md">
            {slides.map((slide, i) => (
              <button key={slide.image} onClick={() => goTo(i)} aria-label={`Go to slide ${i + 1}`} aria-current={i === selected} className="group relative h-6 flex-1">
                <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-primary-foreground/35 transition-all group-hover:h-[2px]" />
                {i === selected && (
                  <motion.span
                    key={`${selected}-${running}`}
                    className="absolute left-0 top-1/2 h-[2px] -translate-y-1/2 bg-accent"
                    initial={{ width: running ? "0%" : "100%" }}
                    animate={{ width: "100%" }}
                    transition={running ? { duration: DELAY / 1000, ease: "linear" } : { duration: 0 }}
                  />
                )}
              </button>
            ))}
          </div>
          {!reduce && (
            <button onClick={() => setPlaying((p) => !p)} aria-label={playing ? "Pause slideshow" : "Play slideshow"} className="text-primary-foreground/80 transition-colors hover:text-accent">
              {playing ? <Pause size={16} /> : <Play size={16} />}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
