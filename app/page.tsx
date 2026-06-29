"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

/* ------------------------------------------------------------------ */
/*  Paleta — DataGob (modo oscuro / consola)                            */
/*  Carbón:    #0E1412   (fondo base — carbón con tinte verde, no negro */
/*              puro, conserva el ADN institucional)                   */
/*  Marfil:    #F5F1E8   (texto principal)                              */
/*  Verde-T:   #3D9B7C   (acento primario — "terminal", procesos vivos)*/
/*  Ámbar:     #D97A4D   (acento secundario — folios, alertas)         */
/*  Línea:     #2A3530   (bordes y divisores sobre el fondo oscuro)    */
/*  Atenuado:  #8A9690   (texto secundario / terciario)                */
/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/*  Contenido                                                          */
/* ------------------------------------------------------------------ */

const SERVICIOS = [
  {
    folio: "DG-01 / ING",
    tag: "Pipelines",
    nombre: "Ingeniería de datos",
    descripcion:
      "Diseño y construcción de pipelines ETL/ELT y bodegas de datos en AWS, GCP o Azure. Tomamos los datos donde nacen — ERP, planillas, plataformas de soporte — y los dejamos en un formato confiable, documentado y con monitoreo de fallas, listo para reportes y modelos.",
  },
  {
    folio: "DG-02 / GOB",
    tag: "Trazabilidad",
    nombre: "Gobierno y calidad de datos",
    descripcion:
      "Catalogación, linaje y control de acceso. Definimos quién puede ver, editar y aprobar cada conjunto de datos, y dejamos trazabilidad de origen y transformaciones — la base que toda auditoría y todo modelo de IA necesita para ser confiable.",
  },
  {
    folio: "DG-03 / ML",
    tag: "Modelos predictivos",
    nombre: "Machine Learning y data science",
    descripcion:
      "Modelos predictivos, de clasificación y de detección de anomalías entrenados sobre tus datos reales — demanda, riesgo de fuga, mantenimiento predictivo. Incluye validación estadística y un plan de monitoreo para que el modelo no se degrade en producción.",
  },
  {
    folio: "DG-04 / BI",
    tag: "Tableros en vivo",
    nombre: "Reportería e inteligencia de negocio",
    descripcion:
      "Tableros en Power BI, Looker o Tableau conectados directamente a tus fuentes, con métricas definidas una sola vez y consistentes en toda la organización. Reemplazamos el reporte armado a mano cada lunes por un dashboard que se actualiza solo.",
  },
  {
    folio: "DG-05 / NLP",
    tag: "Pregunta y responde",
    nombre: "Consultas en lenguaje natural",
    descripcion:
      "Capa conversacional sobre tus datos: preguntas escritas en español que se traducen a consultas reales sobre tus bases y tableros, con la fuente y el cálculo siempre visibles. Pensado para quien necesita una cifra, no para quien quiere construir un reporte.",
  },
  {
    folio: "DG-06 / AUT",
    tag: "Flujos sin fricción",
    nombre: "Automatización de procesos",
    descripcion:
      "Flujos que ejecutan tareas repetitivas sobre tus sistemas — conciliaciones, alertas, generación de documentos, actualización de planillas — con reglas claras, registro de cada ejecución y un punto de revisión humana donde corresponda.",
  },
  {
    folio: "DG-07 / EST",
    tag: "Hoja de ruta",
    nombre: "Estrategia de datos",
    descripcion:
      "Diagnóstico del estado actual de tus datos y una hoja de ruta priorizada — qué construir primero, con qué equipo y con qué retorno esperado. Para directorios y gerencias que necesitan decidir antes de contratar.",
  },
];

const METRICAS = [
  { valor: "100+", label: "Clientes activos" },
  { valor: "99.9%", label: "Disponibilidad de pipelines" },
  { valor: "24/7", label: "Monitoreo" },
  { valor: "5M+", label: "Registros procesados / día" },
];

const PROCESO = [
  {
    etapa: "Diagnóstico",
    descripcion:
      "Revisamos tus fuentes actuales, su calidad y quién las usa hoy. Salimos con un inventario real, no una propuesta genérica.",
  },
  {
    etapa: "Diseño",
    descripcion:
      "Arquitectura de datos y gobierno definidos antes de escribir una línea de código — para no reconstruir todo en seis meses.",
  },
  {
    etapa: "Implementación",
    descripcion:
      "Pipelines, tableros y automatizaciones en producción, con pruebas y monitoreo desde el primer despliegue.",
  },
  {
    etapa: "Operación",
    descripcion:
      "Soporte continuo, ajustes y nuevas fuentes a medida que tu negocio cambia. El dato no es un proyecto que termina.",
  },
];

/* ------------------------------------------------------------------ */
/*  Sello de validación — el elemento de firma de la página.           */
/*  Se "estampa" sobre la ficha al entrar en el viewport: una marca     */
/*  de gobierno de datos, no un efecto decorativo.                     */
/* ------------------------------------------------------------------ */

function SelloValidacion({ texto = "VERIFICADO" }: { texto?: string }) {
  return (
    <motion.div
      className="pointer-events-none absolute bottom-5 right-5 md:bottom-6 md:right-6"
      initial={{ opacity: 0, scale: 1.6, rotate: -18 }}
      whileInView={{ opacity: 1, scale: 1, rotate: -12 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
    >
      <svg width="64" height="64" viewBox="0 0 76 76" className="opacity-[0.7]">
        <circle cx="38" cy="38" r="34" fill="none" stroke="#D97A4D" strokeWidth="1.5" />
        <circle
          cx="38"
          cy="38"
          r="28"
          fill="none"
          stroke="#D97A4D"
          strokeWidth="1"
          strokeDasharray="2 3"
        />
        <text
          x="38"
          y="34"
          textAnchor="middle"
          fill="#D97A4D"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          letterSpacing="1"
        >
          {texto}
        </text>
        <text
          x="38"
          y="46"
          textAnchor="middle"
          fill="#D97A4D"
          fontSize="6"
          fontFamily="ui-monospace, monospace"
          letterSpacing="1.5"
        >
          DATAGOB
        </text>
      </svg>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero — diagrama de flujo de datos de extremo a extremo.             */
/*  Seis etapas reales (fuentes → ingesta → gobierno → bodega →         */
/*  modelos → salidas), con paquetes de datos que viajan en cascada     */
/*  por cada tramo — no una sola línea punteada, sino el recorrido      */
/*  completo en movimiento.                                             */
/* ------------------------------------------------------------------ */

type NodoFlujo = {
  id: string;
  x: number;
  y: number;
  w?: number;
  variante?: "fuente" | "proceso" | "modelo" | "salida";
};

const COL_FUENTE = 36;
const COL_INGESTA = 178;
const COL_GOBIERNO = 178;
const COL_BODEGA = 330;
const COL_MODELO = 470;
const COL_SALIDA = 604;

const NODOS_FLUJO: NodoFlujo[] = [
  { id: "ERP", x: COL_FUENTE, y: 26, variante: "fuente" },
  { id: "CRM", x: COL_FUENTE, y: 80, variante: "fuente" },
  { id: "Planillas", x: COL_FUENTE, y: 134, variante: "fuente" },
  { id: "Soporte", x: COL_FUENTE, y: 188, variante: "fuente" },

  { id: "Ingesta", x: COL_INGESTA, y: 53, variante: "proceso" },
  { id: "Calidad y gobierno", x: COL_GOBIERNO, y: 161, w: 116, variante: "proceso" },

  { id: "Bodega de datos", x: COL_BODEGA, y: 107, w: 110, variante: "proceso" },

  { id: "Modelos ML", x: COL_MODELO, y: 60, w: 96, variante: "modelo" },
  { id: "Data science", x: COL_MODELO, y: 154, w: 96, variante: "modelo" },

  { id: "BI", x: COL_SALIDA, y: 26, variante: "salida" },
  { id: "Lenguaje natural", x: COL_SALIDA, y: 80, w: 100, variante: "salida" },
  { id: "Automatización", x: COL_SALIDA, y: 134, w: 100, variante: "salida" },
  { id: "Alertas", x: COL_SALIDA, y: 188, variante: "salida" },
];

/* Tramos del recorrido: cada uno es un segmento recto entre dos puntos,
   con un "lote" de datos que viaja a lo largo a un ritmo y desfase propio,
   para que el conjunto se lea como flujo continuo en cascada. */
const TRAMOS: { from: [number, number]; to: [number, number]; delay: number }[] = [
  { from: [COL_FUENTE + 34, 26], to: [COL_INGESTA - 40, 53], delay: 0 },
  { from: [COL_FUENTE + 34, 80], to: [COL_INGESTA - 40, 53], delay: 0.3 },
  { from: [COL_FUENTE + 34, 134], to: [COL_GOBIERNO - 50, 161], delay: 0.15 },
  { from: [COL_FUENTE + 34, 188], to: [COL_GOBIERNO - 50, 161], delay: 0.45 },

  { from: [COL_INGESTA + 40, 53], to: [COL_BODEGA - 48, 107], delay: 0.6 },
  { from: [COL_GOBIERNO + 50, 161], to: [COL_BODEGA - 48, 107], delay: 0.75 },

  { from: [COL_BODEGA + 48, 107], to: [COL_MODELO - 42, 60], delay: 0.95 },
  { from: [COL_BODEGA + 48, 107], to: [COL_MODELO - 42, 154], delay: 1.1 },

  { from: [COL_MODELO + 42, 60], to: [COL_SALIDA - 30, 26], delay: 1.3 },
  { from: [COL_MODELO + 42, 60], to: [COL_SALIDA - 44, 80], delay: 1.42 },
  { from: [COL_MODELO + 42, 154], to: [COL_SALIDA - 44, 134], delay: 1.5 },
  { from: [COL_MODELO + 42, 154], to: [COL_SALIDA - 30, 188], delay: 1.62 },
];

function colorNodo(variante: NodoFlujo["variante"]) {
  switch (variante) {
    case "modelo":
      return "#3D9B7C";
    case "salida":
      return "#D97A4D";
    default:
      return "#4A5650";
  }
}

function PaqueteDatos({
  from,
  to,
  delay,
}: {
  from: [number, number];
  to: [number, number];
  delay: number;
}) {
  return (
    <motion.circle
      r="3"
      fill="#3D9B7C"
      initial={{ opacity: 0 }}
      animate={{
        cx: [from[0], to[0]],
        cy: [from[1], to[1]],
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration: 1.8,
        delay,
        repeat: Infinity,
        repeatDelay: 1.6,
        ease: "easeInOut",
        times: [0, 0.15, 0.85, 1],
      }}
    />
  );
}

function DiagramaFlujo() {
  return (
    <svg viewBox="0 0 640 220" className="h-auto w-full max-w-3xl" aria-hidden="true">
      {/* líneas estáticas de cada tramo, debajo de los paquetes animados */}
      {TRAMOS.map((t, i) => {
        const [x1, y1] = t.from;
        const [x2, y2] = t.to;

        const path = `
              M ${x1} ${y1}
              C ${x1 + 40} ${y1},
                ${x2 - 40} ${y2},
                ${x2} ${y2}
            `;

        return (
          <path
            key={i}
            d={path}
            fill="none"
            stroke="#3A453F"
            strokeWidth="2"
            strokeLinecap="round"
          />
        );
      })}

      {/* paquetes de datos viajando por cada tramo, en cascada */}
      {TRAMOS.map((t, i) => (
        <PaqueteDatos key={i} from={t.from} to={t.to} delay={t.delay} />
      ))}


      {/* nodos */}
      {NODOS_FLUJO.map((n) => {
        const x = Number(n.x);
        const y = Number(n.y);
        const w = n.w ?? 64;

        if (isNaN(x) || isNaN(y)) return null;

        return (
          <g key={n.id}>
            <rect
              x={x - w / 2}
              y={y - 16}
              width={w}
              height="32"
              rx="999"
              ry="999"
              fill="rgba(18, 25, 23, 0.72)"
              stroke="rgba(73, 214, 163, 0.35)"
              strokeWidth="1"
              filter="url(#softGlow)"
            />

            <text
              x={x}
              y={y + 4}
              textAnchor="middle"
              fontFamily="ui-sans-serif, system-ui"
              fontSize="10"
              fill="#F5F1E8"
            >
              {n.id}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Íconos de servicio — trazo lineal de 1.5px, heredan color vía       */
/*  currentColor para reaccionar al hover de cada card sin lógica       */
/*  adicional. Un ícono por disciplina, no genéricos de librería.       */
/* ------------------------------------------------------------------ */

const ICONOS_SERVICIO: Record<string, (props: { className?: string }) => React.ReactElement> = {
  ING: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M3 7h6l2 3h8M3 17h6l2-3h8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="20" cy="7" r="1.6" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="20" cy="17" r="1.6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  GOB: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M12 3l7 3v5c0 5-3.2 8-7 10-3.8-2-7-5-7-10V6l7-3z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M9 12l2 2 4-4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  ML: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="5" cy="6" r="1.6" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="5" cy="18" r="1.6" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="1.8" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="19" cy="7" r="1.6" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="19" cy="17" r="1.6" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M6.4 7.1L10.6 11M6.4 16.9L10.6 13M13.6 11l4-3.2M13.6 13l4 3.2"
        stroke="currentColor"
        strokeWidth="1.3"
      />
    </svg>
  ),
  BI: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M4 20V10M11 20V4M18 20v-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M3 20h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  NLP: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M4 5h16v10H9l-4 4v-4H4V5z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M8 9.5h8M8 12.5h5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  ),
  AUT: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M12 4v3M12 17v3M4 12h3M17 12h3M6.3 6.3l2.1 2.1M15.6 15.6l2.1 2.1M6.3 17.7l2.1-2.1M15.6 8.4l2.1-2.1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  EST: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M4 19l5-5 4 3 7-9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M15 8h5v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

function iconoClave(folio: string): string {
  return folio.split("/")[1]?.trim() ?? "";
}

/* ------------------------------------------------------------------ */
/*  Sección de contacto                                                */
/* ------------------------------------------------------------------ */

const CAMPOS_FORM = [
  { id: "nombre", label: "Nombre", type: "text", autoComplete: "given-name" },
  { id: "apellido", label: "Apellido", type: "text", autoComplete: "family-name" },
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
      className="relative z-10 border-b border-[#2A3530] px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-3 font-mono text-xs uppercase tracking-wider text-[#D97A4D]">
          DG-09 / CONTACTO
        </div>
        <div className="mb-14 flex flex-col gap-4 border-b border-[#2A3530] pb-10 md:flex-row md:items-end md:justify-between">
          <h2 className="font-serif text-4xl font-medium tracking-tight text-[#F5F1E8] md:text-5xl">
            Solicita una evaluación
            <br className="hidden md:block" /> de tus datos
          </h2>
          <p className="max-w-sm text-sm text-[#8A9690]">
            Cuéntanos qué proceso o reporte hoy te quita tiempo. Respondemos
            dentro de un día hábil con una propuesta concreta.
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
                  className="font-mono text-xs uppercase tracking-wider text-[#8A9690]"
                >
                  {campo.label}*
                </label>
                <input
                  id={campo.id}
                  name={campo.id}
                  type={campo.type}
                  autoComplete={campo.autoComplete}
                  required
                  className="border-b border-[#2A3530] bg-transparent py-2.5 text-[#F5F1E8] placeholder:text-[#8A9690]/40 focus:border-[#3D9B7C] focus:outline-none"
                />
              </div>
            ))}

            <div className="flex flex-col gap-2 sm:col-span-2">
              <label
                htmlFor="mensaje"
                className="font-mono text-xs uppercase tracking-wider text-[#8A9690]"
              >
                Mensaje / consulta*
              </label>
              <textarea
                id="mensaje"
                name="mensaje"
                required
                rows={4}
                className="resize-none border-b border-[#2A3530] bg-transparent py-2.5 text-[#F5F1E8] placeholder:text-[#8A9690]/40 focus:border-[#3D9B7C] focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={enviando || enviado}
                className="bg-[#3D9B7C] px-9 py-3.5 font-mono text-sm uppercase tracking-wider text-[#0E1412] transition-colors hover:bg-[#2E7A60] disabled:opacity-50"
              >
                {enviado
                  ? "Mensaje enviado"
                  : enviando
                    ? "Enviando..."
                    : "Enviar consulta"}
              </motion.button>
              {enviado && (
                <p className="mt-3 text-sm text-[#3D9B7C]">
                  Gracias — un especialista te contactará pronto.
                </p>
              )}
              {error && <p className="mt-3 text-sm text-[#D97A4D]">{error}</p>}
            </div>
          </motion.form>

          {/* Datos de contacto */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-8 border-t border-[#2A3530] pt-8 md:border-t-0 md:border-l md:pl-12 md:pt-0"
          >
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-[#8A9690]">
                Oficinas
              </span>
              <p className="mt-2 text-lg text-[#F5F1E8]">Santiago, Chile</p>
            </div>

            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-[#8A9690]">
                Email
              </span>
              <p className="mt-2 text-lg text-[#F5F1E8]">
                <a
                  href="mailto:contacto@datagob.cl"
                  className="transition-colors hover:text-[#3D9B7C]"
                >
                  contacto@datagob.cl
                </a>
              </p>
            </div>

            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-[#8A9690]">
                Teléfono
              </span>
              <p className="mt-2 text-lg text-[#F5F1E8]">
                <a
                  href="tel:+56229402358"
                  className="transition-colors hover:text-[#3D9B7C]"
                >
                  +56 2 2940 2358
                </a>
              </p>
            </div>

            <div className="mt-auto border-t border-[#2A3530] pt-6">
              <p className="font-mono text-xs uppercase tracking-wider text-[#8A9690]">
                Plazo de respuesta: 1 día hábil
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
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const headerBackground = useTransform(
    scrollYProgress,
    [0, 0.2],
    ["rgba(16,23,21,0)", "rgba(16,23,21,.85)"]
  );

  const headerPadding = useTransform(
    scrollYProgress,
    [0, 0.2],
    [24, 14]
  );

  const headerWidth = useTransform(
    scrollYProgress,
    [0, 0.2],
    ["100%", "92%"]
  );

  const headerRadius = useTransform(
    scrollYProgress,
    [0, 0.2],
    [0, 20]
  );

  return (
    <main className="bg-[#0E1412] text-[#F5F1E8]">
      {/* ---------------------------------------------------------- */}
      {/* Header — membrete                                            */}
      {/* ---------------------------------------------------------- */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#101715]/80 backdrop-blur-xl"
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

          {/* Logo */}
          <a href="#" className="group flex items-center gap-3">

            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.6 }}
              className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-[#3D9B7C]/30 bg-[#3D9B7C]/10"
            >
              <div className="absolute h-1.5 w-1.5 rounded-full bg-[#3D9B7C]" />
              <div className="absolute left-2 top-2 h-1.5 w-1.5 rounded-full bg-[#3D9B7C]" />
              <div className="absolute right-2 bottom-2 h-1.5 w-1.5 rounded-full bg-[#3D9B7C]" />

              <div className="absolute h-px w-5 rotate-45 bg-[#3D9B7C]/70" />
              <div className="absolute h-px w-5 -rotate-45 bg-[#3D9B7C]/70" />
            </motion.div>

            <div className="flex flex-col leading-none">
              <span className="font-serif text-xl font-semibold tracking-tight text-white">
                DATA<span className="text-[#3D9B7C]">GOB</span>
              </span>

              <span className="text-[10px] uppercase tracking-[0.35em] text-[#8A9690]">
                Data Engineering · AI
              </span>
            </div>

          </a>

          {/* Navegación */}
          <nav className="hidden items-center gap-8 md:flex">
            {[
              "Servicios",
              "Cómo trabajamos",
              "Resultados",
              "Contacto",
            ].map((item, index) => (
              <a
                key={index}
                href={
                  item === "Servicios"
                    ? "#servicios"
                    : item === "Cómo trabajamos"
                      ? "#proceso"
                      : item === "Resultados"
                        ? "#metricas"
                        : "#contacto"
                }
                className="group relative font-mono text-[11px] uppercase tracking-[0.22em] text-[#9BA8A2] transition-colors hover:text-white"
              >
                {item}

                <span className="absolute -bottom-2 left-0 h-px w-0 bg-[#3D9B7C] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* CTA */}
          <motion.a
            href="#contacto"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            className="rounded-full bg-[#3D9B7C] px-4 py-2 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-white transition-all hover:bg-[#46b18d]"
          >
            Agenda una consultoría
          </motion.a>

        </div>
      </motion.header>

      {/* ---------------------------------------------------------- */}
      {/* Hero — tesis directa + diagrama de linaje                    */}
      {/* ---------------------------------------------------------- */}
      <section
        ref={heroRef}
        className="relative z-10 border-b border-[#2A3530] px-6 pb-20 pt-16 md:pb-28 md:pt-20"
      >
        <motion.div style={{ opacity: heroOpacity, y: heroY }} className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p className="mb-5 font-mono text-xs uppercase tracking-wider text-[#D97A4D]">
              Ingeniería de datos, BI, ML y automatización — Santiago, Chile
            </p>

            <h1 className="max-w-3xl font-serif text-4xl font-medium leading-[1.15] tracking-tight md:text-6xl">
              Impulsa tu empresa con Ingeniería de Datos, Analítica Avanzada y Automatización Inteligente.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#8A9690]">
              Trabajamos con empresas cuyos datos viven repartidos entre un
              ERP, planillas y sistemas de soporte. Diseñamos la arquitectura,
              definimos quién es dueño de cada dato y construimos, sobre esa
              base, modelos de machine learning, tableros de BI, consultas en
              lenguaje natural y procesos automatizados — sin reescribir todo
              cada vez que el negocio cambia.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <motion.a
                href="#contacto"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#3D9B7C] px-7 py-3.5 font-mono text-sm uppercase tracking-wider text-[#0E1412] shadow-[0_0_28px_-6px_rgba(61,155,124,0.55)] transition-all hover:bg-[#2E7A60] hover:shadow-[0_0_36px_-4px_rgba(61,155,124,0.7)]"
              >
                Solicitar evaluación
              </motion.a>
              <a
                href="#servicios"
                className="border border-[#F5F1E8]/25 px-7 py-3.5 font-mono text-sm uppercase tracking-wider transition-colors hover:border-[#3D9B7C] hover:text-[#3D9B7C]"
              >
                Ver servicios
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative mt-20 overflow-hidden rounded-2xl border border-[#3D9B7C]/15 bg-gradient-to-br from-[#111815] via-[#141B18] to-[#0F1513] shadow-[0_20px_80px_-30px_rgba(61,155,124,0.35)]"
          >
            {/* Glow */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#3D9B7C] to-transparent opacity-60" />

            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/5 px-8 py-5">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#3D9B7C]">
                  Data Pipeline
                </p>

                <h3 className="mt-2 text-lg font-semibold text-[#F5F1E8]">
                  Flujo de datos end-to-end
                </h3>

                <p className="mt-1 text-sm text-[#8A9690]">
                  Desde las fuentes de datos hasta dashboards y analítica avanzada.
                </p>
              </div>

              <div className="flex items-center gap-2 rounded-full border border-[#3D9B7C]/20 bg-[#3D9B7C]/10 px-4 py-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#3D9B7C]" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#3D9B7C]" />
                </span>

                <span className="font-mono text-[11px] uppercase tracking-wider text-[#3D9B7C]">
                  Pipeline Activo
                </span>
              </div>
            </div>

            {/* Diagram */}
            <div className="relative p-8">
              <DiagramaFlujo />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Servicios                                                    */}
      {/* ---------------------------------------------------------- */}
      <section id="servicios" className="relative z-10 border-b border-[#2A3530] px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#D97A4D]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#D97A4D] opacity-50" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#D97A4D]" />
            </span>
            DG-02 / SERVICIOS
          </div>
          <div className="mb-16 flex flex-col gap-4 border-b border-[#2A3530] pb-10 md:flex-row md:items-end md:justify-between">
            <h2 className="font-serif text-4xl font-medium tracking-tight md:text-5xl">
              Siete disciplinas, un mismo expediente
            </h2>
            <p className="max-w-sm text-sm text-[#8A9690]">
              Cada servicio puede contratarse por separado, pero está
              diseñado para encajar con los demás sobre la misma base de
              datos.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {SERVICIOS.map((s, i) => {
              const clave = iconoClave(s.folio);
              const Icono = ICONOS_SERVICIO[clave];
              const destacado = clave === "ML" || clave === "GOB";

              return (
                <motion.div
                  key={s.folio}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.45, delay: (i % 3) * 0.07 }}
                  className={`group relative overflow-hidden rounded-lg border border-[#2A3530] bg-[#141B18] p-7 transition-colors duration-300 hover:border-[#3D9B7C]/50 ${destacado ? "md:col-span-2 md:row-span-1" : ""
                    } ${i === 0 ? "pb-16" : ""}`}
                >
                  {/* glow de hover, oculto por defecto */}
                  <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#3D9B7C] opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-[0.12]" />

                  {i === 0 && <SelloValidacion />}

                  <div className="relative flex items-start justify-between gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-[#2A3530] text-[#8A9690] transition-colors duration-300 group-hover:border-[#3D9B7C]/60 group-hover:text-[#3D9B7C]">
                      {Icono ? <Icono className="h-5 w-5" /> : null}
                    </div>
                    <span className="rounded-sm border border-[#2A3530] px-2 py-1 font-mono text-[10px] tracking-wider text-[#8A9690] transition-colors duration-300 group-hover:border-[#D97A4D]/40 group-hover:text-[#D97A4D]">
                      {s.folio}
                    </span>
                  </div>

                  <p className="relative mt-5 font-mono text-[11px] uppercase tracking-wider text-[#3D9B7C]">
                    {s.tag}
                  </p>
                  <h3 className="relative mt-2 font-serif text-xl font-medium leading-snug">
                    {s.nombre}
                  </h3>
                  <p className="relative mt-3 text-sm leading-relaxed text-[#8A9690]">
                    {s.descripcion}
                  </p>

                  <div className="relative mt-6 h-px w-8 bg-[#2A3530] transition-all duration-300 group-hover:w-14 group-hover:bg-[#3D9B7C]" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Cómo trabajamos — proceso en cuatro etapas                   */}
      {/* ---------------------------------------------------------- */}
      <section id="proceso" className="relative z-10 border-b border-[#2A3530] px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-3 font-mono text-xs uppercase tracking-wider text-[#D97A4D]">
            DG-05 / METODOLOGÍA
          </div>
          <h2 className="mb-14 max-w-2xl font-serif text-4xl font-medium tracking-tight md:text-5xl">
            Cómo trabajamos
          </h2>

          <div className="grid gap-0 md:grid-cols-4">
            {PROCESO.map((p, i) => (
              <motion.div
                key={p.etapa}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className={`border-t border-[#3D9B7C]/60 py-6 pr-6 ${i > 0 ? "md:border-l md:border-t-0 md:border-[#2A3530] md:pl-6" : ""
                  }`}
              >
                <span className="font-mono text-xs text-[#8A9690]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-serif text-lg font-medium">{p.etapa}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#8A9690]">{p.descripcion}</p>
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
        className="relative z-10 border-b border-[#2A3530] bg-[#141B18] px-6 py-20"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mb-3 font-mono text-xs uppercase tracking-wider text-[#D97A4D]">
            DG-07 / RESULTADOS
          </div>
          <div className="grid grid-cols-2 gap-10 border-t border-[#2A3530] pt-10 md:grid-cols-4">
            {METRICAS.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
              >
                <h3 className="font-serif text-4xl font-medium tabular-nums text-[#3D9B7C] md:text-5xl">
                  {m.valor}
                </h3>
                <p className="mt-2 font-mono text-xs uppercase tracking-wider text-[#8A9690]">
                  {m.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/* Contacto                                                     */}
      {/* ---------------------------------------------------------- */}
      <ContactSection />

      <footer className="relative z-10 px-6 py-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 font-mono text-xs text-[#8A9690] md:flex-row md:justify-between">
          <span>DATAGOB — Santiago, Chile</span>
          <span>© {new Date().getFullYear()} Todos los derechos reservados</span>
        </div>
      </footer>
    </main>
  );
}