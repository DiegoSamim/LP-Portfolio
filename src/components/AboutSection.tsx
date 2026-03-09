import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Award,
  BookOpen,
  Briefcase,
  Calendar,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  type LucideIcon,
} from "lucide-react";
import { aboutContent, AboutCardIcon, AboutCardType } from "@/lib/content";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { playSound } from "@/lib/sfx";

const AboutSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCardId, setActiveCardId] = useState<number | null>(null);
  const [certificationIndex, setCertificationIndex] = useState(0);

  const activeCard = useMemo(
    () => aboutContent.cards.find((card) => card.id === activeCardId) ?? null,
    [activeCardId],
  );

  const iconMap: Record<AboutCardIcon, LucideIcon> = {
    [AboutCardIcon.CERTIFICATE]: Award,
    [AboutCardIcon.COURSE]: BookOpen,
    [AboutCardIcon.COLLEGE]: GraduationCap,
    [AboutCardIcon.EXPERIENCE]: Briefcase,
  };

  const certificationItem = aboutContent.certifications[certificationIndex];

  const handleOpenCard = (cardId: number) => {
    playSound("openModal", { volume: 0.36, debounceMs: 120 });
    setActiveCardId(cardId);
    setIsModalOpen(true);
  };

  const handleOpenChange = (open: boolean) => {
    setIsModalOpen(open);
  };

  const goToPreviousCertification = () => {
    playSound("clickSwitch", { volume: 0.28, debounceMs: 80 });
    setCertificationIndex((prev) => (prev - 1 + aboutContent.certifications.length) % aboutContent.certifications.length);
  };

  const goToNextCertification = () => {
    playSound("clickSwitch", { volume: 0.28, debounceMs: 80 });
    setCertificationIndex((prev) => (prev + 1) % aboutContent.certifications.length);
  };

  return (
    <section className="py-24 px-4" id="about">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            <span className="text-muted-foreground font-mono text-lg block mb-2">{aboutContent.tag}</span>
            {aboutContent.title}
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl mx-auto">{aboutContent.description}</p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {aboutContent.cards.map((item, i) => {
            const Icon = iconMap[item.icon] ?? Award;

            return (
              <motion.button
                type="button"
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.55 }}
                onMouseEnter={() => playSound("buttonHover", { volume: 0.17, debounceMs: 90 })}
                onClick={() => handleOpenCard(item.id)}
                className="glass rounded-2xl p-6 text-left group transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_16px_45px_rgba(0,0,0,0.34)]"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-secondary/90 border border-border/70 flex items-center justify-center transition-colors group-hover:bg-secondary">
                    <Icon className="w-6 h-6 text-foreground/90" />
                  </div>
                  <span className="font-mono text-[11px] tracking-wider text-muted-foreground uppercase">Detalhes</span>
                </div>

                <h3 className="font-semibold text-lg mb-2 leading-tight">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
              </motion.button>
            );
          })}
        </div>

        <Dialog
          open={isModalOpen}
          onOpenChange={handleOpenChange}
        >
          <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto border-border/80 bg-card/95 backdrop-blur-2xl p-7 sm:p-8">
            <DialogHeader className="space-y-3 border-b border-border/70 pb-5">
              <DialogTitle className="text-2xl">{activeCard?.title}</DialogTitle>
              <DialogDescription className="text-sm leading-relaxed max-w-2xl">
                {activeCard?.description}
              </DialogDescription>
            </DialogHeader>

            {activeCard?.type === AboutCardType.CERTIFICATIONS && certificationItem && (
              <div className="space-y-6 pt-2">
                <div className="flex items-center justify-between rounded-xl border border-border/70 bg-secondary/40 px-4 py-3">
                  <span className="text-xs uppercase tracking-wider text-muted-foreground font-mono">
                    Certificado {certificationIndex + 1}/{aboutContent.certifications.length}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={goToPreviousCertification}
                      aria-label="Certificação anterior"
                      className="h-9 w-9 rounded-full border border-border/70 bg-secondary/90 hover:bg-secondary transition-colors flex items-center justify-center"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={goToNextCertification}
                      aria-label="Próxima certificação"
                      className="h-9 w-9 rounded-full border border-border/70 bg-secondary/90 hover:bg-secondary transition-colors flex items-center justify-center"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="rounded-2xl border border-border/70 bg-background/40 p-5 space-y-4">
                  <div className="space-y-2">
                    <h4 className="text-lg font-semibold">{certificationItem.name}</h4>
                    <p className="text-sm text-muted-foreground">{certificationItem.issuer}</p>
                  </div>

                  <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-secondary/80 px-3 py-1 text-xs text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    {certificationItem.date}
                  </div>

                  <p className="text-sm leading-relaxed text-muted-foreground">{certificationItem.details}</p>

                  {certificationItem.credentialImageUrl && (
                    <div className="rounded-xl border border-border/70 bg-secondary/20 p-4 flex items-center justify-center min-h-40">
                      <img
                        src={certificationItem.credentialImageUrl}
                        alt={certificationItem.credentialImageAlt ?? `Credencial ${certificationItem.name}`}
                        loading="lazy"
                        className="max-h-52 w-auto max-w-full object-contain"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeCard?.type === AboutCardType.COURSES && (
              <div className="space-y-4 pt-2">
                {aboutContent.courses.map((course) => (
                  <article
                    key={`${course.name}-${course.date}`}
                    className="rounded-xl border border-border/70 bg-background/40 p-4"
                  >
                    <h4 className="font-semibold">{course.name}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{course.provider}</p>
                    <p className="text-xs text-muted-foreground font-mono mt-2">{course.date}</p>
                    <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{course.details}</p>
                  </article>
                ))}
              </div>
            )}

            {activeCard?.type === AboutCardType.EDUCATION && (
              <div className="pt-2 space-y-5">
                {aboutContent.educationTimeline.map((item, index) => (
                  <div key={`${item.title}-${item.date}`} className="relative pl-8">
                    <span className="absolute left-0 top-1.5 h-3 w-3 rounded-full bg-primary/80 ring-4 ring-primary/15" />
                    {index < aboutContent.educationTimeline.length - 1 && (
                      <span className="absolute left-[5px] top-5 h-[calc(100%+8px)] w-px bg-border/80" />
                    )}

                    <article className="rounded-xl border border-border/70 bg-background/40 p-4">
                      <h4 className="font-semibold">{item.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{item.institution}</p>
                      <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground font-mono">
                        <span className="rounded-full border border-border/70 bg-secondary/80 px-2.5 py-1">{item.period}</span>
                        <span>{item.date}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{item.details}</p>
                    </article>
                  </div>
                ))}
              </div>
            )}

            {activeCard?.type === AboutCardType.EXPERIENCE && (
              <div className="space-y-4 pt-2">
                {aboutContent.experiences.map((experience) => (
                  <article
                    key={`${experience.title}-${experience.date}`}
                    className="rounded-xl border border-border/70 bg-background/40 p-4"
                  >
                    <h4 className="font-semibold">{experience.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{experience.context}</p>
                    <p className="text-xs text-muted-foreground font-mono mt-2">{experience.date}</p>
                    <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{experience.details}</p>
                  </article>
                ))}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default AboutSection;
