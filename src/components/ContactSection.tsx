import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

const links = [
  { icon: Mail, label: "Email", href: "mailto:john@example.com", value: "john@example.com" },
  { icon: Github, label: "GitHub", href: "https://github.com", value: "github.com/johndoe" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com", value: "linkedin.com/in/johndoe" },
];

const ContactSection = () => {
  return (
    <section className="py-24 px-4" id="contact">
      <div className="container mx-auto max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            <span className="text-muted-foreground font-mono text-lg block mb-2">{'// contact'}</span>
            Let's Connect
          </h2>
          <p className="text-muted-foreground mb-12">Always open to new opportunities and interesting conversations.</p>
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {links.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="glass rounded-xl px-6 py-4 flex items-center gap-3 hover:border-border transition-all duration-300"
            >
              <link.icon className="w-5 h-5 text-foreground/80" />
              <div className="text-left">
                <p className="text-xs text-muted-foreground font-mono">{link.label}</p>
                <p className="text-sm text-foreground">{link.value}</p>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-muted-foreground/50 text-sm font-mono"
        >
          © 2026 John Doe — Built with ❤️
        </motion.p>
      </div>
    </section>
  );
};

export default ContactSection;
