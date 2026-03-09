import { motion } from "framer-motion";
import { Code2, Rocket, Terminal } from "lucide-react";

const AboutSection = () => {
  const highlights = [
    { icon: Terminal, title: "Clean Code", desc: "Writing maintainable, scalable code" },
    { icon: Code2, title: "Open Source", desc: "Contributing to the community" },
    { icon: Rocket, title: "Ship Fast", desc: "From idea to production, quickly" },
  ];

  return (
    <section className="py-24 px-4" id="about">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            <span className="text-muted-foreground font-mono text-lg block mb-2">{'// about'}</span>
            About Me
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
            I'm a passionate software developer focused on building impactful digital products.
            I love crafting elegant solutions to complex problems, contributing to open-source,
            and constantly pushing the boundaries of what's possible with modern web technologies.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {highlights.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="glass rounded-xl p-6 text-center group transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-lg bg-secondary/80 flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary transition-colors border border-border/70">
                <item.icon className="w-6 h-6 text-foreground/80" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
