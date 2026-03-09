import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, Github, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { projectsContent } from "@/lib/content";
import { playSound } from "@/lib/sfx";

type Project = (typeof projectsContent)[number];
const projects = projectsContent;
const projectAssetImages = import.meta.glob("/src/assets/*", { eager: true, import: "default" }) as Record<string, string>;
const DEFAULT_PROJECT_ICON = "🏆";

const resolveProjectAsset = (assetPath?: string) => {
  if (!assetPath) return null;
  if (assetPath.startsWith("http://") || assetPath.startsWith("https://") || assetPath.startsWith("data:") || assetPath.startsWith("/")) {
    return assetPath;
  }
  const normalizedPath = assetPath.startsWith("/") ? assetPath : `/${assetPath}`;
  return projectAssetImages[normalizedPath] ?? null;
};

const DeviceFrame = ({
  src,
  alt,
  device,
  onError,
}: {
  src: string;
  alt: string;
  device: "pc" | "mobile";
  onError: () => void;
}) => {
  if (device === "mobile") {
    return (
      <div className="mx-auto w-[250px] h-[460px] rounded-[2.2rem] p-3 bg-zinc-800 border border-zinc-500/40 shadow-[0_20px_40px_rgba(0,0,0,0.55)] relative">
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-4 rounded-b-xl bg-zinc-900" />
        <div className="w-full h-full rounded-[1.6rem] overflow-hidden bg-black">
          <img src={src} alt={alt} className="w-full h-full object-cover" onError={onError} />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full rounded-2xl p-3 bg-zinc-800 border border-zinc-500/40 shadow-[0_20px_40px_rgba(0,0,0,0.55)]">
      <div className="h-4 flex items-center gap-1.5 px-2">
        <span className="w-2 h-2 rounded-full bg-zinc-500" />
        <span className="w-2 h-2 rounded-full bg-zinc-500" />
        <span className="w-2 h-2 rounded-full bg-zinc-500" />
      </div>
      <div className="w-full h-[300px] rounded-xl overflow-hidden bg-black">
        <img src={src} alt={alt} className="w-full h-full object-cover" onError={onError} />
      </div>
    </div>
  );
};

const Podium = ({
  project,
  position,
  hovering,
  onHoverStart,
  onHoverEnd,
  onClick,
}: {
  project: Project;
  position: "center" | "side";
  hovering: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  onClick: () => void;
}) => {
  const isCenter = position === "center";
  const isLit = isCenter && hovering;
  const [logoHasError, setLogoHasError] = useState(false);
  const logoSrc = resolveProjectAsset(project.logo ?? project.image);

  useEffect(() => {
    setLogoHasError(false);
  }, [project.id]);

  return (
    <motion.div
      layout
      className="relative flex flex-col items-center"
      style={{
        perspective: "600px",
        width: isCenter ? "220px" : "160px",
        cursor: isCenter ? "pointer" : "default",
      }}
      animate={{
        scale: isCenter ? 1 : 0.78,
        opacity: isCenter ? 1 : 0.45,
        zIndex: isCenter ? 10 : 5,
      }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      onClick={onClick}
    >
      {/* Spotlight beam */}
      {isCenter && (
        <motion.div
          className="absolute -top-20 left-1/2 -translate-x-1/2 pointer-events-none"
          initial={false}
          animate={{ opacity: hovering ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <div
            className="w-28 sm:w-32 h-56"
            style={{
              background: "linear-gradient(to bottom, hsl(var(--foreground) / 0.2), hsl(var(--foreground) / 0.05) 60%, transparent)",
              clipPath: "polygon(44% 0%, 56% 0%, 100% 100%, 0% 100%)",
              filter: "blur(12px)",
            }}
          />
          {/* Spotlight source dot */}
          <div
            className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full"
            style={{
              background: "hsl(var(--foreground) / 0.8)",
              boxShadow: "0 0 10px hsl(var(--foreground) / 0.35), 0 0 24px hsl(var(--foreground) / 0.15)",
            }}
          />
        </motion.div>
      )}

      {/* Floating logo */}
      <motion.div
        className="relative z-10 mb-4"
        animate={
          isLit
            ? { y: -6, filter: "brightness(1.1) drop-shadow(0 0 10px hsl(var(--foreground) / 0.2))" }
            : isCenter
              ? { y: 0, filter: "brightness(0.6)" }
              : { y: 0, filter: "brightness(0.3)" }
        }
        transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
      >
        {logoSrc && !logoHasError ? (
          <img
            src={logoSrc}
            alt={project.name}
            className={`${isCenter ? "w-20 h-20 sm:w-24 sm:h-24" : "w-14 h-14 sm:w-16 sm:h-16"} object-contain`}
            onError={() => setLogoHasError(true)}
          />
        ) : (
          <span className={`${isCenter ? "text-6xl sm:text-7xl" : "text-4xl sm:text-5xl"} select-none block`}>
            {DEFAULT_PROJECT_ICON}
          </span>
        )}
      </motion.div>

      {/* 3D Podium */}
      <div className="relative w-full" style={{ transformStyle: "preserve-3d" }}>
        {/* Top surface */}
        <motion.div
          className="relative w-full rounded-t-lg"
          style={{
            height: isCenter ? "12px" : "8px",
            background: isLit
              ? "linear-gradient(to right, hsl(var(--foreground) / 0.1), hsl(var(--foreground) / 0.16), hsl(var(--foreground) / 0.1))"
              : "linear-gradient(to right, hsl(var(--muted) / 0.6), hsl(var(--muted) / 0.8), hsl(var(--muted) / 0.6))",
            borderTop: "1px solid",
            borderColor: isLit ? "hsl(var(--foreground) / 0.24)" : "hsl(var(--border) / 0.5)",
          }}
          animate={{
            boxShadow: isLit
              ? "0 -8px 30px hsl(var(--foreground) / 0.11), inset 0 1px 0 hsl(var(--foreground) / 0.15)"
              : "none",
          }}
          transition={{ duration: 0.4 }}
        />

        {/* Front face of podium */}
        <motion.div
          className="relative w-full flex flex-col items-center justify-center overflow-hidden"
          style={{
            height: isCenter ? "100px" : "70px",
            background: "linear-gradient(180deg, hsl(var(--secondary)), hsl(var(--card)) 40%, hsl(var(--secondary) / 0.8))",
            borderLeft: "1px solid hsl(var(--border) / 0.3)",
            borderRight: "1px solid hsl(var(--border) / 0.3)",
            borderBottom: "1px solid hsl(var(--border) / 0.4)",
          }}
          animate={{
            boxShadow: isLit
              ? "inset 0 1px 20px hsl(var(--foreground) / 0.06)"
              : "none",
          }}
        >
          {/* Vertical line accents */}
          <div className="absolute left-2 top-0 bottom-0 w-px bg-border/20" />
          <div className="absolute right-2 top-0 bottom-0 w-px bg-border/20" />

          {/* Project name on front face */}
          <motion.div
            className="text-center px-3"
            animate={{ opacity: isLit ? 1 : isCenter ? 0.45 : 0.18 }}
            transition={{ duration: 0.35 }}
          >
            <p className={`font-mono font-semibold tracking-wider uppercase ${isCenter ? "text-xs" : "text-[10px]"}`}
              style={{
                color: isLit ? "hsl(var(--foreground) / 0.9)" : "hsl(var(--muted-foreground) / 0.45)",
                textShadow: isLit ? "0 0 10px hsl(var(--foreground) / 0.2)" : "none",
              }}
            >
              {project.name}
            </p>
            {isCenter && (
              <p
                className="text-[10px] mt-1 font-mono"
                style={{
                  color: isLit ? "hsl(var(--foreground) / 0.76)" : "hsl(var(--muted-foreground) / 0.25)",
                  textShadow: isLit ? "0 0 8px hsl(var(--foreground) / 0.16)" : "none",
                }}
              >
                {project.mainStack}
              </p>
            )}
          </motion.div>

          {/* Bottom edge highlight */}
          <div
            className="absolute bottom-0 inset-x-0 h-px"
            style={{
              background: isLit
                ? "linear-gradient(to right, transparent, hsl(var(--foreground) / 0.24), transparent)"
                : "hsl(var(--border) / 0.2)",
            }}
          />
        </motion.div>

        {/* Base / floor shadow */}
        <motion.div
          className="w-full h-2 rounded-b-sm"
          style={{
            background: "linear-gradient(to bottom, hsl(var(--secondary) / 0.6), transparent)",
          }}
        />
        <motion.div
          className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full pointer-events-none"
          style={{
            width: isCenter ? "90%" : "80%",
            height: "8px",
          }}
          animate={{
            background: isLit
              ? "radial-gradient(ellipse, hsl(var(--foreground) / 0.15), transparent 70%)"
              : "radial-gradient(ellipse, hsl(0 0% 0% / 0.3), transparent 70%)",
            boxShadow: isLit
              ? "0 0 20px hsl(var(--foreground) / 0.11)"
              : "0 4px 15px hsl(0 0% 0% / 0.4)",
          }}
          transition={{ duration: 0.4 }}
        />
      </div>
    </motion.div>
  );
};

const TrophyRoom = () => {
  const [centerIndex, setCenterIndex] = useState(0);
  const [selected, setSelected] = useState<Project | null>(null);
  const [hovering, setHovering] = useState(false);
  const [selectedImageHasError, setSelectedImageHasError] = useState(false);
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);

  const selectedMedia = selected
    ? (selected.media && selected.media.length > 0
      ? selected.media
      : [{ src: selected.image, device: "pc" as const, alt: selected.name }])
    : [];

  const currentMedia = selectedMedia[selectedMediaIndex] ?? null;
  const currentMediaSrc = currentMedia ? resolveProjectAsset(currentMedia.src) : null;
  const hasGallery = selectedMedia.length > 0;

  useEffect(() => {
    setSelectedImageHasError(false);
    setSelectedMediaIndex(0);
  }, [selected?.id]);

  const getIndex = (offset: number) =>
    ((centerIndex + offset) % projects.length + projects.length) % projects.length;

  const goLeft = useCallback(() => {
    playSound("clickSwitch", { volume: 0.28, debounceMs: 70 });
    setCenterIndex((prev) => ((prev - 1) + projects.length) % projects.length);
  }, []);

  const goRight = useCallback(() => {
    playSound("clickSwitch", { volume: 0.28, debounceMs: 70 });
    setCenterIndex((prev) => (prev + 1) % projects.length);
  }, []);

  return (
    <section className="py-24 px-4 overflow-hidden" id="trophies">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            <span className="text-muted-foreground font-mono text-lg block mb-2">{'// projetos'}</span>
            Tour pelos Projetos
          </h2>
          <p className="text-muted-foreground">Explore projetos selecionados com descrições e imagens.</p>
        </motion.div>

        {/* Carousel */}
        <div className="relative flex items-end justify-center gap-4 sm:gap-8 min-h-[380px] pt-16">
          {/* Nav arrows */}
          <Button
            variant="ghost"
            size="icon"
            onClick={goLeft}
            className="absolute left-0 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-secondary/80 backdrop-blur-sm hover:bg-secondary hover:text-foreground border border-border/50"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={goRight}
            className="absolute right-0 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-secondary/80 backdrop-blur-sm hover:bg-secondary hover:text-foreground border border-border/50"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>

          {/* Three podiums */}
          {[
            { project: projects[getIndex(-1)], position: "side" as const },
            { project: projects[centerIndex], position: "center" as const },
            { project: projects[getIndex(1)], position: "side" as const },
          ].map(({ project, position }, i) => (
            <Podium
              key={`${project.id}-${i}`}
              project={project}
              position={position}
              hovering={position === "center" ? hovering : false}
              onHoverStart={() => {
                if (position === "center") {
                  playSound("lightSwitch", { volume: 0.22, debounceMs: 220 });
                  setHovering(true);
                }
              }}
              onHoverEnd={() => position === "center" && setHovering(false)}
              onClick={() => {
                if (position === "center") {
                  playSound("openModal", { volume: 0.34, debounceMs: 120 });
                  setSelected(project);
                }
              }}
            />
          ))}
        </div>

        {/* Floor line */}
        <div className="max-w-lg mx-auto mt-2 h-px" style={{ background: "linear-gradient(to right, transparent, hsl(var(--border) / 0.4), transparent)" }} />

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                playSound("clickSwitch", { volume: 0.28, debounceMs: 70 });
                setCenterIndex(i);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${i === centerIndex ? "bg-foreground/80 w-6" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-md p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 40 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className={`glass rounded-2xl w-full p-8 relative ${hasGallery ? "max-w-6xl" : "max-w-lg"}`}
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelected(null)}
                onMouseEnter={() => playSound("buttonHover", { volume: 0.2, debounceMs: 90 })}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </Button>

              <div className={`${hasGallery ? "md:grid md:grid-cols-[1.3fr_1fr] md:gap-8" : ""}`}>
                <div className="text-center mb-6 md:mb-0">
                  {currentMediaSrc && !selectedImageHasError ? (
                    <div className="relative">
                      <DeviceFrame
                        src={currentMediaSrc}
                        alt={currentMedia?.alt ?? selected.name}
                        device={currentMedia?.device ?? "pc"}
                        onError={() => setSelectedImageHasError(true)}
                      />

                      {selectedMedia.length > 1 && (
                        <>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/70 border border-border/60"
                            onClick={() => {
                              playSound("clickSwitch", { volume: 0.28, debounceMs: 70 });
                              setSelectedMediaIndex((prev) => (prev - 1 + selectedMedia.length) % selectedMedia.length);
                            }}
                          >
                            <ChevronLeft className="h-4 w-4" />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/70 border border-border/60"
                            onClick={() => {
                              playSound("clickSwitch", { volume: 0.28, debounceMs: 70 });
                              setSelectedMediaIndex((prev) => (prev + 1) % selectedMedia.length);
                            }}
                          >
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  ) : (
                    <span className="text-5xl">{DEFAULT_PROJECT_ICON}</span>
                  )}
                  <h3 className="text-2xl font-bold mt-3">{selected.name}</h3>
                </div>

                <div className="space-y-4">
                <div>
                  <h4 className="text-foreground/85 font-mono text-sm mb-1">Objective</h4>
                  <p className="text-muted-foreground text-sm">{selected.objective}</p>
                </div>
                <div>
                  <h4 className="text-foreground/85 font-mono text-sm mb-1">Description</h4>
                  <p className="text-muted-foreground text-sm">{selected.description}</p>
                </div>
                <div>
                  <h4 className="text-foreground/85 font-mono text-sm mb-2">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {selected.techStack.map((tech) => (
                      <span key={tech} className="px-3 py-1 text-xs font-mono rounded-full bg-secondary/85 text-foreground/85 border border-border/70">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <Button variant="hero" size="sm" asChild>
                    <a
                      href={selected.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={() => playSound("buttonHover", { volume: 0.2, debounceMs: 90 })}
                    >
                      <Github className="mr-2 h-4 w-4" /> GitHub
                    </a>
                  </Button>
                  <Button variant="heroOutline" size="sm" asChild>
                    <a
                      href={selected.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={() => playSound("buttonHover", { volume: 0.2, debounceMs: 90 })}
                    >
                      <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                    </a>
                  </Button>
                </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default TrophyRoom;
