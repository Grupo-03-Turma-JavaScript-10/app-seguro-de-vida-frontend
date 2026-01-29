import React from "react";
import { ShieldCheck, Target, Sparkles, HeartHandshake } from "lucide-react";

export default function Sobre() {
  return (
    <main className="min-h-screen bg-[#020e27] text-white">
      {/* brilho de fundo */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-0 opacity-60">
          <div className="absolute -top-24 left-10 h-72 w-72 rounded-full bg-[#bae8b0]/10 blur-3xl" />
          <div className="absolute top-24 right-10 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        </div>

        <section className="relative mx-auto w-[90%] max-w-6xl py-16">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/80">
            <Sparkles className="h-4 w-4 text-[#bae8b0]" />
            Conheça a SeguraLife
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
            Sobre{" "}
            <span className="text-[#bae8b0] drop-shadow-[0_0_25px_rgba(186,232,176,0.25)]">
              Nós
            </span>
          </h1>

          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-white/80">
            Na <span className="font-semibold text-white">SeguraLife</span>, acreditamos que
            proteger o presente é a melhor forma de garantir um futuro tranquilo. Oferecemos
            soluções completas em seguros de vida, saúde e previdência, com transparência,
            cuidado e confiança.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <GlowCard
              icon={<Target className="h-5 w-5 text-[#bae8b0]" />}
              title="Nossa Missão"
            >
              Oferecer proteção acessível e confiável, ajudando pessoas a viverem com mais
              segurança e tranquilidade em todas as etapas da vida.
            </GlowCard>

            <GlowCard
              icon={<ShieldCheck className="h-5 w-5 text-[#bae8b0]" />}
              title="Nossa Visão"
            >
              Ser referência em soluções de seguros, reconhecida pela confiança, inovação e
              compromisso com o bem-estar dos nossos clientes.
            </GlowCard>

            <GlowCard
              icon={<Sparkles className="h-5 w-5 text-[#bae8b0]" />}
              title="Nossos Valores"
            >
              <ul className="mt-2 space-y-2 text-white/80">
                <li className="transition group-hover:translate-x-1">• Confiança e transparência</li>
                <li className="transition group-hover:translate-x-1">• Responsabilidade com pessoas e famílias</li>
                <li className="transition group-hover:translate-x-1">• Segurança em cada detalhe</li>
                <li className="transition group-hover:translate-x-1">• Evolução e melhoria contínua</li>
              </ul>
            </GlowCard>
          </div>

          <div className="mt-10 rounded-2xl border border-white/10 bg-gradient-to-r from-white/5 to-[#bae8b0]/10 p-6 transition hover:scale-[1.01] hover:border-white/20">
            <div className="flex items-start gap-3">
              <HeartHandshake className="h-6 w-6 text-[#bae8b0]" />
              <p className="text-lg leading-relaxed text-white/85">
                Na SeguraLife, cuidamos do que realmente importa:{" "}
                <span className="font-semibold text-white">você e quem você ama</span>.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

/**
 * Card com “mouse-follow glow”:
 * - captura posição do mouse
 * - usa CSS vars (--x, --y)
 * - aplica radial-gradient seguindo o cursor
 */
function GlowCard({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  const ref = React.useRef<HTMLDivElement | null>(null);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    el.style.setProperty("--x", `${x}px`);
    el.style.setProperty("--y", `${y}px`);
  }

  function onLeave() {
    const el = ref.current;
    if (!el) return;

    // centraliza quando sai (opcional)
    el.style.setProperty("--x", `50%`);
    el.style.setProperty("--y", `50%`);
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      // defaults das vars
      style={
        {
          ["--x" as any]: "50%",
          ["--y" as any]: "50%",
        } as React.CSSProperties
      }
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6
                 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02]
                 hover:border-white/20 hover:bg-white/10 hover:shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
    >
      {/* glow que segue o mouse */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(600px circle at var(--x) var(--y), rgba(186,232,176,0.18), transparent 40%)",
        }}
      />

      {/* “borda” iluminada suave */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10 transition group-hover:ring-white/20" />

      <div className="relative flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 transition duration-300 group-hover:rotate-6 group-hover:scale-105">
          {icon}
        </div>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>

      <div className="relative mt-3 leading-relaxed text-white/80">{children}</div>

      {/* barrinha que cresce */}
      <div className="relative mt-5 h-[2px] w-0 bg-[#bae8b0]/80 transition-all duration-300 group-hover:w-full" />
    </div>
  );
}
