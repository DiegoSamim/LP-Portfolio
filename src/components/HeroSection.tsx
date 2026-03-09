import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { heroContent } from "@/lib/content";
import { playSound } from "@/lib/sfx";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--border)/0.2)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--border)/0.2)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black_40%,transparent_100%)]" />

      <div className="relative z-10 container mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        {/* Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          <div className="w-56 h-56 lg:w-72 lg:h-72 rounded-full overflow-hidden border-2 border-border/80 glow-primary">
            <img src={heroContent.photo} alt={heroContent.photoAlt} className="w-full h-full object-cover" />
          </div>
          <div className="absolute -inset-2 rounded-full bg-white/5 blur-2xl -z-10" />
        </motion.div>

        {/* Text */}
        <div className="text-center lg:text-left">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground font-mono text-sm mb-3 tracking-wider"
          >
            {heroContent.greeting}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl lg:text-7xl font-bold mb-4 text-glow-primary"
          >
            <span className="text-foreground">{heroContent.firstName} </span>
            <span className="text-foreground/85">{heroContent.lastName}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl lg:text-2xl text-muted-foreground mb-8"
          >
            {heroContent.role}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-4 justify-center lg:justify-start"
          >
            <Button variant="heroOutline" size="lg" className="hover:glow-primary" asChild>
                <a
                  href={heroContent.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => playSound("buttonHover", { volume: 0.2, debounceMs: 90 })}
                >
                <Github className="mr-2 h-5 w-5" /> GitHub
              </a>
            </Button>
            <Button variant="heroOutline" size="lg" className="hover:glow-primary" asChild>
              <a
                href={heroContent.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => playSound("buttonHover", { volume: 0.2, debounceMs: 90 })}
              >
                <Linkedin className="mr-2 h-5 w-5" /> LinkedIn
              </a>
            </Button>
            <Button variant="heroOutline" size="lg" className="hover:glow-primary" asChild>
              <a href="#contact" onMouseEnter={() => playSound("buttonHover", { volume: 0.2, debounceMs: 90 })}>
                <Mail className="mr-2 h-5 w-5" /> Contato
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
