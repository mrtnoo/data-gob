"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

/* ------------------------------------------------------------------ */
/*  Contenido                                                          */
/* ------------------------------------------------------------------ */

const SERVICIOS = [
  {
    id: "01",
    nombre: "Data Engineering Cloud",
    resumen: "Pipelines que no se caen el viernes a las 6pm.",
    detalle:
      "Arquitecturas de datos en AWS, GCP o Azure — o las tres a la vez. ETL/ELT, orquestación y bodegas listas para escalar sin reescribir todo en un año.",
  },
  {
    id: "02",
    nombre: "Data Governance",
    resumen: "Que cada dato tenga dueño, origen y nivel de confianza.",
    detalle:
      "Linaje, calidad y catalogación de datos, control de acceso y cumplimiento — para que la IA y los reportes se construyan sobre información en la que se puede confiar.",
  },
  {
    id: "03",
    nombre: "Agentes de IA",
    resumen: "Agentes que ejecutan tareas, no solo responden preguntas.",
    detalle:
      "Automatización de procesos de datos con agentes que consultan, cruzan y actúan sobre tus sistemas — con supervisión y trazabilidad de cada paso.",
  },
  {
    id: "04",
    nombre: "Reportería con IA",
    resumen: "Reportes que se explican solos, en lenguaje natural.",
    detalle:
      "Dashboards que además de mostrar el número, explican por qué cambió y qué conviene revisar — generados y actualizados con IA conectada a tus datos.",
  },
];

const METRICAS = [
  { valor: "100+", label: "Clientes activos" },
  { valor: "99.9%", label: "Disponibilidad" },
  { valor: "24/7", label: "Soporte" },
  { valor: "5M+", label: "Registros / día" },
];

/* ------------------------------------------------------------------ */
/*  Fondo de partículas — paquetes de datos flotando lentamente,       */
/*  reemplaza la grilla estática. Posiciones fijas (no random en cada  */
/*  render) para evitar mismatch de hidratación SSR/cliente.           */
/* ------------------------------------------------------------------ */

const PARTICULAS = [
  { x: "6%", y: "18%", size: 3, duration: 18, delay: 0 },
  { x: "18%", y: "62%", size: 2, duration: 22, delay: 2 },
  { x: "32%", y: "30%", size: 4, duration: 16, delay: 4 },
  { x: "47%", y: "78%", size: 2, duration: 20, delay: 1 },
  { x: "58%", y: "15%", size: 3, duration: 24, delay: 6 },
  { x: "68%", y: "55%", size: 2, duration: 17, delay: 3 },
  { x: "76%", y: "85%", size: 3, duration: 21, delay: 5 },
  { x: "84%", y: "28%", size: 2, duration: 19, delay: 2.5 },
  { x: "91%", y: "65%", size: 4, duration: 23, delay: 0.5 },
  { x: "12%", y: "90%", size: 2, duration: 15, delay: 7 },
  { x: "40%", y: "8%", size: 3, duration: 20, delay: 4.5 },
  { x: "63%", y: "95%", size: 2, duration: 18, delay: 1.5 },
];

function DataParticles() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {PARTICULAS.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-mint/70"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            boxShadow: "0 0 6px 1px rgba(16,240,192,0.5)",
          }}
          animate={{
            y: [0, -22, 0],
            opacity: [0.15, 0.65, 0.15],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Línea de "flujo de datos" que recorre el borde de una card al      */
/*  entrar en viewport — la firma de las cards de servicio             */
/* ------------------------------------------------------------------ */

function PulseBorder() {
  return (
    <motion.div
      className="pointer-events-none absolute inset-0 rounded-2xl"
      style={{
        background:
          "linear-gradient(90deg, transparent, rgba(124,58,237,0.9), transparent)",
        backgroundSize: "200% 100%",
      }}
      initial={{ opacity: 0 }}
      whileInView={{
        opacity: [0, 1, 0],
        backgroundPositionX: ["0%", "200%"],
      }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.4, ease: "easeInOut" }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Sección de contacto — formulario + datos, inspirada en el          */
/*  formato "form + ficha de contacto" típico de consultoras B2B       */
/* ------------------------------------------------------------------ */

const CAMPOS_FORM = [
  { id: "nombre", label: "Nombre", type: "text", autoComplete: "given-name" },
  {
    id: "apellido",
    label: "Apellido",
    type: "text",
    autoComplete: "family-name",
  },
  { id: "email", label: "E-mail", type: "email", autoComplete: "email" },
  { id: "telefono", label: "Teléfono", type: "tel", autoComplete: "tel" },
  {
    id: "empresa",
    label: "Nombre de la empresa",
    type: "text",
    autoComplete: "organization",
  },
  { id: "asunto", label: "Asunto", type: "text", autoComplete: "off" },
];

function ContactSection() {
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEnviando(true);
    setError("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("No se pudo enviar");

      setEnviado(true);
      form.reset();
    } catch {
      setError(
        "Algo salió mal al enviar tu mensaje. Intenta de nuevo o escríbenos directo por email."
      );
    } finally {
      setEnviando(false);
    }
  }

  return (
    <section
      id="contacto"
      className="relative z-10 border-b border-white/10 px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2 className="font-serif text-4xl font-medium tracking-tight md:text-5xl">
            Planifica tu próximo
            <br className="hidden md:block" /> proyecto de datos
          </h2>
          <p className="max-w-sm text-sm text-white/45">
            Cuéntanos qué estás tratando de resolver. Te respondemos dentro
            de un día hábil.
          </p>
        </div>

        <div className="grid gap-16 md:grid-cols-[1.3fr_1fr]">
          {/* Formulario */}
          <motion.form
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-x-6 gap-y-7 sm:grid-cols-2"
          >
            {CAMPOS_FORM.map((campo) => (
              <div key={campo.id} className="flex flex-col gap-2">
                <label
                  htmlFor={campo.id}
                  className="font-mono text-xs uppercase tracking-wider text-white/50"
                >
                  {campo.label}*
                </label>
                <input
                  id={campo.id}
                  name={campo.id}
                  type={campo.type}
                  autoComplete={campo.autoComplete}
                  required
                  className="border-b border-white/20 bg-transparent py-2.5 text-white placeholder:text-white/25 focus:border-violet focus:outline-none"
                />
              </div>
            ))}

            <div className="flex flex-col gap-2 sm:col-span-2">
              <label
                htmlFor="mensaje"
                className="font-mono text-xs uppercase tracking-wider text-white/50"
              >
                Mensaje / consulta*
              </label>
              <textarea
                id="mensaje"
                name="mensaje"
                required
                rows={4}
                className="resize-none border-b border-white/20 bg-transparent py-2.5 text-white placeholder:text-white/25 focus:border-violet focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                disabled={enviando || enviado}
                className="bg-violet px-9 py-3.5 font-mono text-sm uppercase tracking-wider text-white shadow-[0_0_24px_-4px_rgba(124,58,237,0.7)] transition-opacity disabled:opacity-50"
              >
                {enviado
                  ? "Mensaje enviado"
                  : enviando
                    ? "Enviando..."
                    : "Enviar consulta"}
              </motion.button>
              {enviado && (
                <p className="mt-3 text-sm text-mint/90">
                  Gracias — un especialista te contactará pronto.
                </p>
              )}
              {error && (
                <p className="mt-3 text-sm text-red-400">{error}</p>
              )}
            </div>
          </motion.form>

          {/* Datos de contacto */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-8 border-t border-white/10 pt-8 md:border-t-0 md:border-l md:pl-12 md:pt-0"
          >
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-white/40">
                Oficinas
              </span>
              <p className="mt-2 text-lg text-white/80">
                Santiago, Chile
              </p>
            </div>

            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-white/40">
                Email
              </span>
              <p className="mt-2 text-lg text-white/80">
                <a
                  href="mailto:hola@dataco.com"
                  className="transition-colors hover:text-violet"
                >
                  hola@dataco.com
                </a>
              </p>
            </div>

            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-white/40">
                Teléfono
              </span>
              <p className="mt-2 text-lg text-white/80">
                <a
                  href="tel:+56229402358"
                  className="transition-colors hover:text-violet"
                >
                  +56 2 2940 2358
                </a>
              </p>
            </div>

            <div className="mt-auto">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-mint" />
              </span>
              <p className="mt-3 font-mono text-xs uppercase tracking-wider text-white/40">
                Respuesta dentro de 24h hábiles
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <main className="bg-void text-white">
      {/* ---------------------------------------------------------- */}
      {/* Fondo plano + partículas de datos en movimiento lento       */}
      {/* ---------------------------------------------------------- */}
      <DataParticles />

      {/* ---------------------------------------------------------- */}
      {/* Header                                                       */}
      {/* ---------------------------------------------------------- */}
      <header className="relative z-10 border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <span className="font-mono text-sm tracking-tight">
            DATA<span className="text-violet">/</span>CO
          </span>
          <nav className="hidden gap-8 font-mono text-xs uppercase tracking-wider text-white/55 md:flex">
            <a href="#servicios" className="transition-colors hover:text-white">
              Servicios
            </a>
            <a href="#metricas" className="transition-colors hover:text-white">
              Resultados
            </a>
            <a href="#contacto" className="transition-colors hover:text-white">
              Contacto
            </a>
          </nav>
          <a
            href="#contacto"
            className="border border-white/20 px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors hover:border-violet hover:text-violet"
          >
            Agendar demo
          </a>
        </div>
      </header>

      {/* ---------------------------------------------------------- */}
      {/* Hero                                                         */}
      {/* ---------------------------------------------------------- */}
      <section
        ref={heroRef}
        className="relative z-10 border-b border-white/10 px-6 pb-24 pt-14 md:pb-36 md:pt-20"
      >
        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="mx-auto max-w-6xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h1 className="max-w-3xl font-serif text-5xl font-medium leading-[1.05] tracking-tight md:text-7xl">
              Tienes los datos.
              <br />
              <span className="text-violet">Te falta la respuesta.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/60">
              Ventas en un ERP, inventario en una planilla, soporte en otra
              plataforma. Ordenamos ese desorden en pipelines y dashboards
              que responden qué está pasando y qué hacer al respecto — antes
              de la próxima reunión, no el próximo trimestre.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <motion.a
                href="#contacto"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="bg-violet px-7 py-3.5 font-mono text-sm uppercase tracking-wider text-white shadow-[0_0_24px_-4px_rgba(124,58,237,0.7)] transition-shadow hover:shadow-[0_0_36px_-2px_rgba(124,58,237,0.9)]"
              >
                Solicitar demo
              </motion.a>
              <a
                href="#servicios"
                className="border border-white/20 px-7 py-3.5 font-mono text-sm uppercase tracking-wider transition-colors hover:border-white/50"
              >
                Ver servicios
              </a>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Servicios                                                    */}
      {/* ---------------------------------------------------------- */}
      <section
        id="servicios"
        className="relative z-10 border-b border-white/10 px-6 py-24"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2 className="font-serif text-4xl font-medium tracking-tight md:text-5xl">
              Lo que hacemos
            </h2>
            <p className="max-w-sm text-sm text-white/45">
              Cuatro disciplinas, un mismo objetivo: que el dato deje de ser
              un reporte y empiece a ser una palanca.
            </p>
          </div>

          <p className="mb-14 font-mono text-xs uppercase tracking-wider text-white/35">
            Stack multicloud — AWS · Google Cloud · Azure
          </p>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {SERVICIOS.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-7"
              >
                <PulseBorder />
                <span className="font-mono text-xs text-white/35">
                  {s.id}
                </span>
                <h3 className="mt-4 font-serif text-xl font-medium">
                  {s.nombre}
                </h3>
                <p className="mt-3 text-white/80">{s.resumen}</p>
                <p className="mt-3 text-sm leading-relaxed text-white/45">
                  {s.detalle}
                </p>
                <span className="mt-6 inline-block h-px w-8 bg-violet transition-all group-hover:w-16" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Métricas                                                     */}
      {/* ---------------------------------------------------------- */}
      <section
        id="metricas"
        className="relative z-10 border-b border-white/10 bg-white/[0.02] px-6 py-20"
      >
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
            {METRICAS.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
              >
                <h3 className="font-serif text-4xl font-medium tabular-nums text-mint md:text-5xl">
                  {m.valor}
                </h3>
                <p className="mt-2 font-mono text-xs uppercase tracking-wider text-white/45">
                  {m.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Contacto — formulario + datos, estilo informe de proyecto    */}
      {/* ---------------------------------------------------------- */}
      <ContactSection />

      <footer className="relative z-10 border-t border-white/10 px-6 py-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 font-mono text-xs text-white/35 md:flex-row md:justify-between">
          <span>DATA/CO — Santiago, Chile</span>
          <span>
            © {new Date().getFullYear()} Todos los derechos reservados
          </span>
        </div>
      </footer>
    </main>
  );
}