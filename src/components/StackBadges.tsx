import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skillsContent } from "@/lib/content";
import { playSound } from "@/lib/sfx";

const allBadges = skillsContent;

const W = 420;
const H = 340;
const SKILLS_PER_PAGE = 12;

/* ─── shared depth tokens ─── */
const CASE_BG = "linear-gradient(180deg, #181818 0%, #111111 58%, #0b0b0b 100%)";
const CASE_INNER = "linear-gradient(180deg, #080808 0%, #050505 100%)";
const LID_BG = "linear-gradient(165deg, #1b1b1b 0%, #121212 52%, #0b0b0b 100%)";
const ACCENT = "rgba(208, 208, 214, 0.72)";

export default function StackBadges() {
  const [isOpen, setIsOpen] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [selectedBadge, setSelectedBadge] = useState<(typeof allBadges)[number] | null>(null);
  const [page, setPage] = useState(0);

  const totalPages = Math.max(1, Math.ceil(allBadges.length / SKILLS_PER_PAGE));
  const startIndex = page * SKILLS_PER_PAGE;
  const visibleBadges = allBadges.slice(startIndex, startIndex + SKILLS_PER_PAGE);

  useEffect(() => {
    if (!isOpen) {
      setSelectedBadge(null);
      setHovered(null);
    }
  }, [isOpen]);

  useEffect(() => {
    if (page > totalPages - 1) {
      setPage(Math.max(0, totalPages - 1));
    }
  }, [page, totalPages]);

  useEffect(() => {
    setSelectedBadge(null);
    setHovered(null);
  }, [page]);

  return (
    <motion.section
      animate={{ minHeight: isOpen ? "150vh" : "120vh" }}
      transition={{ type: "spring", stiffness: 60, damping: 18 }}
      style={{
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "flex-start",
        padding: "24px 20px 60px",
        fontFamily: "'DM Mono', 'Fira Code', monospace",
        overflow: "hidden",
      }}>

      {/* ── header ── */}
      <div style={{ textAlign: "center", marginBottom: 34 }}>
        <p style={{
          color: "rgba(210,210,214,0.62)", fontFamily: "inherit",
          fontSize: 11, letterSpacing: "0.32em", marginBottom: 10,
          textTransform: "uppercase",
        }}>
          // habilidades
        </p>
        <h2 style={{
          color: "#ececf0", fontSize: 30, fontWeight: 600, margin: 0,
          letterSpacing: "-0.02em",
          textShadow: "0 0 24px rgba(0,0,0,0.5)",
        }}>
          Habilidades
        </h2>
        <motion.p
          key={isOpen ? "open" : "closed"}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ color: "rgba(215,215,220,0.44)", fontSize: 13, marginTop: 10 }}
        >
          Principais competências e tecnologias
        </motion.p>
      </div>

      {/* ── perspective wrapper ── */}
      <div style={{
        perspective: "1000px",
        perspectiveOrigin: "50% 50%",
        width: "100%",
        maxWidth: 980,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        flexWrap: "wrap",
      }}>

        {/* ── scene: tilts laterally when open ── */}
        <motion.div
          animate={isOpen
            ? { rotateY: -18, rotateX: 6, scale: 0.94, x: selectedBadge ? -80 : 20 }
            : { rotateY: -7, rotateX: 2, scale: 1, x: 0 }
          }
          transition={{ type: "spring", stiffness: 52, damping: 17, mass: 1.1 }}
          style={{ position: "relative", width: W, transformStyle: "preserve-3d" }}
        >

          {/* ── contact shadow ── */}
          <motion.div
            animate={isOpen
              ? { scaleX: 1.06, opacity: 0.18, y: 20, scaleY: 0.55 }
              : { scaleX: 1, opacity: 0.55, y: 8, scaleY: 1 }
            }
            transition={{ type: "spring", stiffness: 52, damping: 17 }}
            style={{
              position: "absolute", bottom: -26, left: "8%", right: "8%",
              height: 36, borderRadius: "50%",
              background: "radial-gradient(ellipse, rgba(0,0,0,0.7) 0%, transparent 70%)",
              filter: "blur(14px)", zIndex: 0, pointerEvents: "none",
            }}
          />

          {/* ══════════════════════════════════════
              BODY — the case bottom with badges
          ══════════════════════════════════════ */}
          <div style={{
            position: "relative", zIndex: 1,
            width: W, height: H,
            background: CASE_BG,
            border: "1.5px solid rgba(255,255,255,0.08)",
            borderRadius: 10,
            /* layered box-shadow for real depth */
            boxShadow: `
              0 0 0 1px rgba(255,255,255,0.03) inset,
              0 1px 0 rgba(255,255,255,0.08) inset,
              0 -1px 0 rgba(0,0,0,0.55) inset,
              0 40px 100px rgba(0,0,0,0.85),
              0 12px 30px rgba(0,0,0,0.6),
              0 2px 6px rgba(0,0,0,0.4)
            `,
            overflow: "hidden",
          }}>

            {/* subtle matte grain on outer frame */}
            <div style={{
              position: "absolute", inset: 0,
              backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.016) 1px, transparent 1px)",
              backgroundSize: "3px 3px",
              opacity: 0.7,
              pointerEvents: "none",
            }} />

            {/* side-panel edge illusion — left rim light */}
            <div style={{
              position: "absolute", left: 0, top: "10%", bottom: "10%", width: 1,
              background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.2), transparent)",
              pointerEvents: "none",
            }} />

            {/* velvet interior */}
            <div style={{
              margin: 10, borderRadius: 12, height: "calc(100% - 20px)",
              background: CASE_INNER,
              boxShadow: `
                inset 0 6px 24px rgba(0,0,0,0.9),
                inset 0 1px 0 rgba(255,255,255,0.035),
                inset 0 -1px 0 rgba(0,0,0,0.4)
              `,
              position: "relative", overflow: "visible",
            }}>
              {/* micro dot velvet texture */}
              <div style={{
                position: "absolute", inset: 0, borderRadius: 12,
                backgroundImage: `
                  radial-gradient(circle, rgba(255,255,255,0.05) 0.7px, transparent 0.7px),
                  radial-gradient(circle at 60% 40%, rgba(255,255,255,0.03) 0.8px, transparent 0.8px)
                `,
                backgroundSize: "3px 3px, 5px 5px",
                opacity: 0.45,
                pointerEvents: "none",
              }} />

              {/* badges grid */}
              <div style={{
                padding: "20px 16px",
                display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14,
                position: "relative",
              }}>
                {visibleBadges.map((badge, i) => (
                  <motion.div
                    key={badge.name}
                    initial={false}
                    animate={isOpen
                      ? { opacity: 1, scale: 1, y: 0 }
                      : { opacity: 0, scale: 0.86, y: 2 }
                    }
                    transition={isOpen
                      ? {
                        delay: 0.3 + i * 0.04,
                        type: "spring", stiffness: 360, damping: 24,
                      }
                      : {
                        duration: 0.08,
                        ease: "linear",
                      }
                    }
                    onMouseEnter={() => {
                      if (isOpen) {
                        playSound("badgeHover", { volume: 0.2, debounceMs: 140 });
                        setHovered(badge.name);
                      }
                    }}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => {
                      if (isOpen) {
                        playSound("openBadgeInterface", { volume: 0.33, debounceMs: 120 });
                        setSelectedBadge(badge);
                      }
                    }}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "center",
                      position: "relative",
                      cursor: isOpen ? "pointer" : "default",
                    }}
                  >
                    {/* foam cutout depression */}
                    <div style={{
                      width: 72, height: 72, borderRadius: 14,
                      background: "radial-gradient(ellipse at 38% 32%, #060606, #000)",
                      boxShadow: `
                        inset 0 5px 14px rgba(0,0,0,0.98),
                        inset 0 2px 4px rgba(0,0,0,0.7),
                        inset 0 -1px 0 rgba(255,255,255,0.02),
                        0 1px 0 rgba(255,255,255,0.07)
                      `,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      position: "relative",
                    }}>

                      {/* badge pin */}
                      <motion.div
                        animate={hovered === badge.name
                          ? {
                            y: -7, scale: 1.13,
                            boxShadow: `
                                0 16px 36px rgba(0,0,0,0.8),
                                0 0 0 1.5px rgba(255,255,255,0.35),
                                0 0 16px rgba(255,255,255,0.16),
                                inset 0 1px 0 rgba(255,255,255,0.25)
                              `
                          }
                          : {
                            y: 0, scale: 1,
                            boxShadow: `
                                0 5px 14px rgba(0,0,0,0.8),
                                inset 0 1px 0 rgba(255,255,255,0.12),
                                inset 0 -1px 0 rgba(0,0,0,0.3)
                              `
                          }
                        }
                        transition={{ type: "spring", stiffness: 440, damping: 22 }}
                        style={{
                          width: 54, height: 54, borderRadius: 12,
                          /* metallic conic shine */
                          background: "conic-gradient(from 35deg at 50% 50%, #2a2a2a, #454545, #2f2f2f, #4a4a4a, #2a2a2a)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          position: "relative", overflow: "hidden",
                        }}
                      >
                        {/* top specular */}
                        <div style={{
                          position: "absolute", top: 0, left: 0, right: 0, height: "45%",
                          background: "linear-gradient(to bottom, rgba(255,255,255,0.1), transparent)",
                          borderRadius: "12px 12px 50% 50%",
                          pointerEvents: "none",
                        }} />

                        {/* shine sweep on hover */}
                        <motion.div
                          animate={hovered === badge.name ? { x: "150%" } : { x: "-150%" }}
                          initial={{ x: "-150%" }}
                          transition={{ duration: 0.38, ease: "easeOut" }}
                          style={{
                            position: "absolute", inset: 0,
                            background: "linear-gradient(108deg, transparent 28%, rgba(255,255,255,0.25) 50%, transparent 72%)",
                            pointerEvents: "none",
                          }}
                        />

                        {/* inner recess */}
                        <div style={{
                          width: "68%", height: "68%", borderRadius: 8,
                          background: "linear-gradient(145deg, #141414, #0d0d0d)",
                          boxShadow: "inset 0 3px 6px rgba(0,0,0,0.7), inset 0 1px 2px rgba(0,0,0,0.5)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: 20, userSelect: "none",
                        }}>
                          {badge.iconUrl ? (
                            <img
                              src={badge.iconUrl}
                              alt={badge.name}
                              style={{ width: 24, height: 24, objectFit: "contain" }}
                            />
                          ) : (
                            badge.emoji
                          )}
                        </div>
                      </motion.div>

                      {/* glow halo on hover */}
                      <motion.div
                        animate={hovered === badge.name ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        style={{
                          position: "absolute", inset: -4, borderRadius: 18,
                          background: "radial-gradient(circle, rgba(255,255,255,0.14), transparent 65%)",
                          pointerEvents: "none",
                        }}
                      />
                    </div>

                    {/* tooltip */}
                    <AnimatePresence>
                      {hovered === badge.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 6, scale: 0.93 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.93 }}
                          transition={{ duration: 0.14 }}
                          style={{
                            position: "absolute", top: "calc(100% + 10px)", left: "50%",
                            transform: "translateX(-50%)", zIndex: 40,
                            background: "rgba(14,14,14,0.96)",
                            border: "1px solid rgba(255,255,255,0.18)",
                            borderRadius: 8, padding: "5px 11px",
                            textAlign: "center", whiteSpace: "nowrap",
                            backdropFilter: "blur(10px)",
                            boxShadow: "0 8px 24px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.03)",
                            pointerEvents: "none",
                          }}
                        >
                          <p style={{ color: "#ededed", fontSize: 11, fontWeight: 600, margin: 0, letterSpacing: "0.02em" }}>{badge.name}</p>
                          <p style={{ color: "rgba(198,198,202,0.72)", fontSize: 10, margin: "2px 0 0" }}>{badge.description}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>

              {totalPages > 1 && (
                <div style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  zIndex: 5,
                }}>
                  <button
                    type="button"
                    onClick={() => {
                      playSound("clickSwitch", { volume: 0.28, debounceMs: 70 });
                      setPage((prev) => (prev - 1 + totalPages) % totalPages);
                    }}
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: 999,
                      border: "1px solid rgba(255,255,255,0.16)",
                      background: "rgba(18,18,18,0.7)",
                      color: "rgba(235,235,240,0.9)",
                      cursor: "pointer",
                      lineHeight: 1,
                    }}
                    aria-label="Página anterior"
                  >
                    ‹
                  </button>

                  <span style={{ color: "rgba(210,210,214,0.72)", fontSize: 10, letterSpacing: "0.12em" }}>
                    {page + 1}/{totalPages}
                  </span>

                  <button
                    type="button"
                    onClick={() => {
                      playSound("clickSwitch", { volume: 0.28, debounceMs: 70 });
                      setPage((prev) => (prev + 1) % totalPages);
                    }}
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: 999,
                      border: "1px solid rgba(255,255,255,0.16)",
                      background: "rgba(18,18,18,0.7)",
                      color: "rgba(235,235,240,0.9)",
                      cursor: "pointer",
                      lineHeight: 1,
                    }}
                    aria-label="Próxima página"
                  >
                    ›
                  </button>
                </div>
              )}

            </div>
          </div>

          {/* ══════════════════════════════════════════════════
              LID — identical animation logic, richer visuals
              transformOrigin: "bottom center" → hinge at base
              rotateX(-122deg) → opens upward/backward
          ══════════════════════════════════════════════════ */}
          <motion.div
            animate={isOpen ? { rotateX: -122, y: -4 } : { rotateX: 0, y: 0 }}
            transition={{ type: "spring", stiffness: 46, damping: 11, mass: 1.6 }}
            style={{
              position: "absolute",
              inset: 0,
              transformOrigin: "bottom center",
              transformStyle: "preserve-3d",
              zIndex: 2,
            }}
          >

            {/* ─── LID THICKNESS edge (visible during animation) ─── */}
            <div style={{
              position: "absolute",
              bottom: 0, left: 0, right: 0,
              height: 12,
              background: "linear-gradient(to bottom, #141414, #0a0a0a)",
              border: "1.5px solid rgba(255,255,255,0.08)",
              borderTop: "none",
              transform: "rotateX(-90deg)",
              transformOrigin: "bottom center",
              backfaceVisibility: "hidden",
            }} />

            {/* ─── FACE EXTERNA (front, shown when closed) ─── */}
            <div
              onClick={() => {
                const nextOpen = !isOpen;
                playSound(nextOpen ? "openCase" : "closeCase", { volume: 0.32, debounceMs: 120 });
                setIsOpen(nextOpen);
              }}
              style={{
                position: "absolute", inset: 0,
                borderRadius: 10, overflow: "hidden",
                background: LID_BG,
                border: "1.5px solid rgba(255,255,255,0.11)",
                boxShadow: `
                  inset 0 1px 0 rgba(255,255,255,0.11),
                  inset 0 -1px 0 rgba(0,0,0,0.5),
                  inset 1px 0 0 rgba(255,255,255,0.04),
                  0 2px 8px rgba(0,0,0,0.5)
                `,
                backfaceVisibility: "hidden",
                cursor: "pointer",
              }}
            >
              <div style={{
                position: "absolute", inset: 0,
                backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.012) 1px, transparent 1px)",
                backgroundSize: "3px 3px",
                pointerEvents: "none",
              }} />

              {/* top gloss band */}
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: "30%",
                background: "linear-gradient(to bottom, rgba(255,255,255,0.09), transparent)",
                borderRadius: "10px 10px 60% 60%",
                pointerEvents: "none",
              }} />

              {/* diagonal shimmer */}
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(135deg, rgba(255,255,255,0.035) 0%, transparent 44%, rgba(255,255,255,0.02) 100%)",
                pointerEvents: "none",
              }} />

              {/* bottom rim glow */}
              <div style={{
                position: "absolute", bottom: 0, left: "10%", right: "10%", height: 1,
                background: "linear-gradient(to right, transparent, rgba(255,255,255,0.35), transparent)",
                pointerEvents: "none",
              }} />

              {/* center emblem */}
              <div style={{
                position: "absolute", inset: 0,
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center", gap: 14,
              }}>
                {/* pulsing outer ring */}
                <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <motion.div
                    animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.3, 0.15] }}
                    transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                      position: "absolute",
                      width: 90, height: 90, borderRadius: "50%",
                      background: "radial-gradient(circle, rgba(255,255,255,0.18), transparent 70%)",
                      pointerEvents: "none",
                    }}
                  />
                  <motion.div
                    animate={{
                      boxShadow: [
                        "0 0 0 0 rgba(255,255,255,0), 0 0 14px rgba(255,255,255,0.16)",
                        "0 0 0 6px rgba(255,255,255,0.08), 0 0 28px rgba(255,255,255,0.24)",
                        "0 0 0 0 rgba(255,255,255,0), 0 0 14px rgba(255,255,255,0.16)",
                      ]
                    }}
                    transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                      width: 68, height: 68, borderRadius: "50%",
                      background: "radial-gradient(circle at 36% 28%, #515151, #2a2a2a, #111111)",
                      border: "1.5px solid rgba(255,255,255,0.3)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 30,
                      position: "relative",
                      color: "#f0f0f0",
                      textShadow: "0 0 10px rgba(255,255,255,0.3)",
                    }}
                  >
                    {/* emblem top specular */}
                    <div style={{
                      position: "absolute", top: 6, left: "20%", right: "20%", height: "30%",
                      background: "linear-gradient(to bottom, rgba(255,255,255,0.14), transparent)",
                      borderRadius: "50%",
                      pointerEvents: "none",
                    }} />
                    💻
                  </motion.div>
                </div>

                <motion.span
                  animate={{ opacity: [0.2, 0.55, 0.2] }}
                  transition={{ duration: 2.6, repeat: Infinity }}
                  style={{
                    color: "rgba(224,224,228,0.52)", fontSize: 9,
                    fontFamily: "inherit", letterSpacing: "0.3em", textTransform: "uppercase",
                  }}
                >
                  Clique para abrir
                </motion.span>
              </div>
            </div>

            {/* ─── FACE INTERNA (shown when open) ─── */}
            <div
              style={{
                position: "absolute", inset: 0,
                borderRadius: 10, overflow: "hidden",
                /* rich satin inner lining */
                background: `
                  repeating-linear-gradient(
                    -45deg,
                    rgba(255,255,255,0.008) 0px, rgba(255,255,255,0.008) 1px,
                    transparent 1px, transparent 8px
                  ),
                  linear-gradient(170deg, #0f0f0f 0%, #070707 100%)
                `,
                border: "1.5px solid rgba(255,255,255,0.09)",
                boxShadow: `
                  inset 0 4px 20px rgba(0,0,0,0.7),
                  inset 0 1px 0 rgba(255,255,255,0.03)
                `,
                transform: "rotateX(180deg)",
                backfaceVisibility: "hidden",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer",
              }}
              onClick={() => {
                playSound("closeCase", { volume: 0.32, debounceMs: 120 });
                setIsOpen(false);
              }}
            >
              {/* inner lid center recess */}
              <div style={{
                position: "absolute",
                width: "60%", height: "40%",
                borderRadius: 12,
                background: "radial-gradient(ellipse, rgba(0,0,0,0.4), transparent)",
                boxShadow: "inset 0 2px 8px rgba(0,0,0,0.5)",
              }} />

              <AnimatePresence>
                {isOpen && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.82, y: 8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.82 }}
                    transition={{ delay: 0.44, type: "spring", stiffness: 280, damping: 22 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      playSound("closeCase", { volume: 0.32, debounceMs: 120 });
                      setIsOpen(false);
                      setSelectedBadge(null);
                    }}
                    style={{
                      position: "relative", zIndex: 1,
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.24)",
                      borderRadius: 10,
                      color: "rgba(230,230,232,0.8)",
                      fontFamily: "inherit", fontSize: 11,
                      cursor: "pointer", letterSpacing: "0.18em",
                      padding: "9px 24px",
                      transition: "all 0.18s",
                      outline: "none",
                      textTransform: "uppercase",
                      boxShadow: "0 2px 12px rgba(0,0,0,0.4)",
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = "rgba(255,255,255,0.18)";
                      e.currentTarget.style.color = "rgba(255,255,255,0.96)";
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)";
                      e.currentTarget.style.boxShadow = "0 0 18px rgba(255,255,255,0.15), 0 2px 12px rgba(0,0,0,0.4)";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                      e.currentTarget.style.color = "rgba(230,230,232,0.8)";
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.24)";
                      e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.4)";
                    }}
                  >
                    X
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

          </motion.div>{/* end LID */}

        </motion.div>{/* end scene */}

        <AnimatePresence>
          {isOpen && selectedBadge && (
            <motion.aside
              initial={{ opacity: 0, x: 52, y: 10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: 46, y: 8 }}
              transition={{ duration: 0.36, ease: "easeOut" }}
              style={{
                width: 320,
                background: "linear-gradient(175deg, rgba(18,18,18,0.95) 0%, rgba(10,10,10,0.96) 100%)",
                border: "1.5px solid rgba(255,255,255,0.1)",
                borderRadius: 12,
                padding: "18px 16px",
                boxShadow: "0 24px 54px rgba(0,0,0,0.62), inset 0 1px 0 rgba(255,255,255,0.05)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div style={{
                position: "absolute", inset: 0,
                backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.02) 1px, transparent 1px)",
                backgroundSize: "3px 3px",
                pointerEvents: "none",
              }} />

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08, duration: 0.28, ease: "easeOut" }}
                style={{ position: "relative", zIndex: 1 }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.14, duration: 0.26, ease: "easeOut" }}
                  style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}
                >
                  <div style={{
                    width: 42,
                    height: 42,
                    borderRadius: 10,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "linear-gradient(145deg, #2c2c2c, #161616)",
                    border: "1px solid rgba(255,255,255,0.14)",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08), 0 8px 18px rgba(0,0,0,0.45)",
                  }}>
                    {selectedBadge.iconUrl ? (
                      <img
                        src={selectedBadge.iconUrl}
                        alt={selectedBadge.name}
                        style={{ width: 22, height: 22, objectFit: "contain" }}
                      />
                    ) : (
                      selectedBadge.emoji
                    )}
                  </div>
                  <div>
                    <p style={{ margin: 0, color: "#efefef", fontSize: 16, fontWeight: 600 }}>{selectedBadge.name}</p>
                    <p style={{ margin: "2px 0 0", color: "rgba(210,210,214,0.74)", fontSize: 11 }}>
                      {selectedBadge.description}
                    </p>
                  </div>
                </motion.div>

                <p style={{
                  margin: "12px 0 8px",
                  color: ACCENT,
                  fontSize: 10,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                }}>
                  tópicos
                </p>

                <div style={{ display: "grid", gap: 8 }}>
                  {selectedBadge.topics.map((topic) => (
                    <motion.div
                      key={topic}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: 8,
                        padding: "8px 10px",
                        color: "rgba(226,226,230,0.88)",
                        fontSize: 12,
                        lineHeight: 1.45,
                      }}
                    >
                      • {topic}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
} 