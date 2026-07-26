"use client";

import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useInView,
} from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { Menu, X } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  THEME — colores centralizados                                     */
/* ------------------------------------------------------------------ */

const THEME = {
  primary: "#0EA5E9",
  primaryHover: "#0284C7",
  secondary: "#2563EB",
  slate: {
    50: "#F8FAFC",
    100: "#F1F5F9",
    200: "#E2E8F0",
    300: "#CBD5E1",
    400: "#94A3B8",
    500: "#64748B",
    600: "#475569",
    700: "#334155",
    800: "#1E293B",
    900: "#0F172A",
  },
  white: "#FFFFFF",
} as const;

/* ------------------------------------------------------------------ */
/*  Contenido                                                         */
/* ------------------------------------------------------------------ */

const TECH_PILLS: Record<string, string[]> = {
  ING: ["AWS Glue", "BigQuery", "Azure Synapse", "Airflow", "dbt"],
  GOB: ["DataHub", "Collibra", "Great Expectations", "dbt tests", "OpenMetadata"],
  ML: ["scikit-learn", "XGBoost", "PyTorch", "MLflow", "SageMaker"],
  BI: ["Power BI", "Looker", "Tableau", "QuickSight", "dbt metrics"],
  AUT: ["UiPath", "Selenium", "n8n", "Python"],
  EST: ["DMMI", "ISO 27001", "Roadmap"],
};

const SERVICIOS = [
  {
    folio: "DG-01 / ING",
    tag: "Lakehouse & Data Warehouse",
    nombre: "Ingeniería de datos",
    descripcion:
      "Diseñamos e implementamos plataformas de datos modernas, Data Warehouses y arquitecturas Lakehouse. Construimos pipelines ETL/ELT escalables que integran información desde múltiples fuentes, garantizando calidad, disponibilidad y rendimiento para analítica, reportería e inteligencia artificial.",
  },
  {
    folio: "DG-02 / BI",
    tag: "Dashboards & KPIs",
    nombre: "Reportería y BI",
    descripcion:
      "Creamos dashboards ejecutivos, indicadores clave (KPIs) y modelos analíticos que entregan visibilidad en tiempo real del negocio. Transformamos datos complejos en información clara para mejorar el seguimiento y la toma de decisiones.",
  },
  {
    folio: "DG-03 / GOB",
    tag: "Calidad y Gobierno",
    nombre: "Gobierno y calidad de datos",
    descripcion:
      "Implementamos procesos de gobierno de datos que aseguran calidad, trazabilidad, seguridad y cumplimiento normativo. Definimos estándares, catálogos y controles que permiten confiar en la información utilizada por toda la organización.",
  },
  {
    folio: "DG-04 / ML",
    tag: "Data Science",
    nombre: "Machine Learning y Data Science",
    descripcion:
      "Desarrollamos soluciones de inteligencia artificial, modelos predictivos y analítica avanzada para optimizar procesos, detectar oportunidades y anticipar escenarios. Llevamos los modelos desde la experimentación hasta ambientes productivos con monitoreo continuo.",
  },
  {
    folio: "DG-05 / AUT",
    tag: "RPA & Integraciones",
    nombre: "Automatización de procesos",
    descripcion:
      "Automatizamos procesos de negocio mediante RPA, APIs e integraciones inteligentes utilizando herramientas como UiPath, Selenium y n8n. Reducimos tiempos operativos, minimizamos errores y aumentamos la eficiencia mediante flujos seguros y escalables.",
  },
  {
    folio: "DG-06 / EST",
    tag: "Consultoría Estratégica",
    nombre: "Estrategia de datos",
    descripcion:
      "Diseñamos estrategias de datos alineadas con los objetivos del negocio. Evaluamos la madurez tecnológica, identificamos oportunidades de mejora y definimos una hoja de ruta para maximizar el valor de la información y acelerar la transformación digital.",
  },
];

const METRICAS = [
  { valor: 100, sufijo: "+", label: "Clientes activos" },
  { valor: 99.9, sufijo: "%", label: "Disponibilidad de pipelines" },
  { valor: 24, sufijo: "/7", label: "Monitoreo" },
  { valor: 5, sufijo: "M+", label: "Registros procesados / día" },
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

const TESTIMONIOS = [
  {
    nombre: "Carlos Méndez",
    cargo: "CIO, Grupo Financiero Andes",
    texto:
      "DataGob transformó nuestra infraestructura de datos en 8 semanas. Pasamos de reportes manuales a dashboards en tiempo real.",
  },
  {
    nombre: "María José Riquelme",
    cargo: "Directora de Operaciones, RetailPro",
    texto:
      "La automatización de procesos nos ahorra 40 horas semanales. La calidad del dato mejoró drásticamente desde el primer mes.",
  },
  {
    nombre: "Andrés Fuentes",
    cargo: "Head of Analytics, SaludDigital",
    texto:
      "Su gobierno de datos nos permitió cumplir normativas sin fricción. Ahora confiamos ciegamente en nuestros pipelines.",
  },
];

/* ------------------------------------------------------------------ */
/*  Sello de validación                                               */
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
      <svg width="64" height="64" viewBox="0 0 76 76" className="opacity-50">
        <circle cx="38" cy="38" r="34" fill="none" stroke={THEME.secondary} strokeWidth="1.5" />
        <circle
          cx="38"
          cy="38"
          r="28"
          fill="none"
          stroke={THEME.secondary}
          strokeWidth="1"
          strokeDasharray="2 3"
        />
        <text
          x="38"
          y="34"
          textAnchor="middle"
          fill={THEME.secondary}
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
          fill={THEME.secondary}
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
/*  Diagrama de flujo — desktop complejo, mobile simplificado         */
/* ------------------------------------------------------------------ */

type NodoFlujo = {
  id: string;
  x: number;
  y: number;
  w?: number;
};

const COL_FUENTE = 36;
const COL_INGESTA = 178;
const COL_GOBIERNO = 178;
const COL_BODEGA = 330;
const COL_MODELO = 470;
const COL_SALIDA = 604;

const NODOS_FLUJO: NodoFlujo[] = [
  { id: "ERP", x: COL_FUENTE, y: 26 },
  { id: "CRM", x: COL_FUENTE, y: 80 },
  { id: "Planillas", x: COL_FUENTE, y: 134 },
  { id: "Soporte", x: COL_FUENTE, y: 188 },
  { id: "Ingesta", x: COL_INGESTA, y: 53 },
  { id: "Calidad y gobierno", x: COL_GOBIERNO, y: 161, w: 116 },
  { id: "Almacen de datos", x: COL_BODEGA, y: 107, w: 110 },
  { id: "Modelos ML", x: COL_MODELO, y: 60, w: 96 },
  { id: "Data science", x: COL_MODELO, y: 154, w: 96 },
  { id: "BI", x: COL_SALIDA, y: 26 },
  { id: "Lenguaje natural", x: COL_SALIDA, y: 80, w: 100 },
  { id: "Automatización", x: COL_SALIDA, y: 134, w: 100 },
  { id: "Alertas", x: COL_SALIDA, y: 188 },
];

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
      fill={THEME.primary}
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

function DiagramaFlujoDesktop() {
  return (
    <svg
      viewBox="0 0 700 250"
      className="hidden md:block h-auto w-full max-w-4xl mx-auto"
      aria-hidden="true"
    >
      <defs>
        <filter id="softGlow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="flowStroke" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={THEME.slate[300]} stopOpacity="0.2" />
          <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.6" />
          <stop offset="100%" stopColor={THEME.slate[300]} stopOpacity="0.2" />
        </linearGradient>
      </defs>

      {TRAMOS.map((t, i) => {
        const [x1, y1] = t.from;
        const [x2, y2] = t.to;
        const cx1 = x1 + (x2 - x1) * 0.35;
        const cx2 = x1 + (x2 - x1) * 0.65;
        const path = `M ${x1} ${y1} C ${cx1} ${y1 - 35}, ${cx2} ${y2 + 35}, ${x2} ${y2}`;
        return (
          <path
            key={i}
            d={path}
            fill="none"
            stroke="url(#flowStroke)"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        );
      })}

      {TRAMOS.map((t, i) => (
        <PaqueteDatos key={i} from={t.from} to={t.to} delay={t.delay} />
      ))}

      {NODOS_FLUJO.map((n) => {
        const x = Number(n.x);
        const y = Number(n.y);
        const w = n.w ?? 72;
        if (isNaN(x) || isNaN(y)) return null;
        const fill = "rgba(255, 255, 255, 0.9)";
        const stroke = "rgba(14, 165, 233, 0.4)";
        return (
          <g key={n.id} filter="url(#softGlow)">
            <rect
              x={x - w / 2}
              y={y - 18}
              width={w}
              height="36"
              rx="14"
              ry="14"
              fill={fill}
              stroke={stroke}
              strokeWidth="1.2"
            />
            <circle cx={x - w / 2 + 10} cy={y} r="3" fill={stroke} opacity="0.8" />
            <text
              x={x}
              y={y + 4}
              textAnchor="middle"
              fontFamily="ui-sans-serif, system-ui"
              fontSize="11"
              fill={THEME.slate[900]}
              opacity="0.95"
            >
              {n.id}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function DiagramaFlujoMobile() {
  const pasos = [
    { label: "Fuentes", items: ["ERP", "CRM", "Planillas", "Soporte"] },
    { label: "Ingesta & Gobierno", items: ["Ingesta", "Calidad y gobierno"] },
    { label: "Almacén", items: ["Data Warehouse / Lakehouse"] },
    { label: "Modelos", items: ["ML", "Data Science"] },
    { label: "Salidas", items: ["BI", "NLP", "Automatización", "Alertas"] },
  ];
  return (
    <div className="md:hidden flex flex-col gap-4">
      {pasos.map((paso, i) => (
        <motion.div
          key={paso.label}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="rounded-xl border border-slate-200 bg-white/60 p-4"
        >
          <p className="font-mono text-[10px] uppercase tracking-wider text-[#0EA5E9] mb-2">
            {String(i + 1).padStart(2, "0")} — {paso.label}
          </p>
          <div className="flex flex-wrap gap-2">
            {paso.items.map((item) => (
              <span
                key={item}
                className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700"
              >
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Íconos de servicio                                                */
/* ------------------------------------------------------------------ */

const ICONOS_SERVICIO: Record<string, (props: { className?: string }) => React.ReactElement> = {
  ING: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M3 7h6l2 3h8M3 17h6l2-3h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="20" cy="7" r="1.6" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="20" cy="17" r="1.6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  GOB: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 3l7 3v5c0 5-3.2 8-7 10-3.8-2-7-5-7-10V6l7-3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  ML: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="5" cy="6" r="1.6" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="5" cy="18" r="1.6" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="1.8" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="19" cy="7" r="1.6" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="19" cy="17" r="1.6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6.4 7.1L10.6 11M6.4 16.9L10.6 13M13.6 11l4-3.2M13.6 13l4 3.2" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  ),
  BI: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M4 20V10M11 20V4M18 20v-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M3 20h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  AUT: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 4v3M12 17v3M4 12h3M17 12h3M6.3 6.3l2.1 2.1M15.6 15.6l2.1 2.1M6.3 17.7l2.1-2.1M15.6 8.4l2.1-2.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  EST: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M4 19l5-5 4 3 7-9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 8h5v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

function iconoClave(folio: string): string {
  return folio.split("/")[1]?.trim() ?? "";
}

/* ------------------------------------------------------------------ */
/*  Contador animado de métricas                                      */
/* ------------------------------------------------------------------ */

function ContadorMetrica({ valor, sufijo }: { valor: number; sufijo: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 30, stiffness: 100 });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (isInView) {
      motionValue.set(valor);
    }
  }, [isInView, valor, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (Number.isInteger(valor)) {
        setDisplay(Math.floor(latest).toString());
      } else {
        setDisplay(latest.toFixed(1));
      }
    });
    return unsubscribe;
  }, [springValue, valor]);

  return (
    <span ref={ref} className="font-serif text-4xl font-medium tabular-nums text-[#0EA5E9] md:text-5xl">
      {display}{sufijo}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Testimonios                                                       */
/* ------------------------------------------------------------------ */

function TestimoniosSection() {
  return (
    <section className="relative z-10 border-b border-[#E2E8F0] bg-white px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-3 font-mono text-xs uppercase tracking-wider text-slate-400">
          DG-08 / TESTIMONIOS
        </div>
        <h2 className="mb-14 max-w-2xl font-serif text-4xl font-medium tracking-tight md:text-5xl">
          Lo que dicen nuestros clientes
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {TESTIMONIOS.map((t, i) => (
            <motion.div
              key={t.nombre}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative rounded-xl border border-slate-100 bg-[#F8FAFC] p-6"
            >
              <SelloValidacion texto="CLIENTE" />
              <svg className="mb-4 h-6 w-6 text-[#0EA5E9]/40" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-sm leading-relaxed text-slate-600">{t.texto}</p>
              <div className="mt-6 border-t border-slate-200 pt-4">
                <p className="font-medium text-slate-900">{t.nombre}</p>
                <p className="text-xs text-slate-500">{t.cargo}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Sección de contacto — con validación y a11y                       */
/* ------------------------------------------------------------------ */

const CAMPOS_FORM = [
  { id: "nombre", label: "Nombre", type: "text", autoComplete: "given-name" },
  { id: "apellido", label: "Apellido", type: "text", autoComplete: "family-name" },
  { id: "email", label: "E-mail", type: "email", autoComplete: "email" },
  { id: "telefono", label: "Teléfono", type: "tel", autoComplete: "tel" },
  { id: "empresa", label: "Nombre de la empresa", type: "text", autoComplete: "organization" },
  { id: "asunto", label: "Asunto", type: "text", autoComplete: "off" },
];

function ContactSection() {
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState("");
  const [errores, setErrores] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);

  function validarCampo(id: string, value: string): string {
    if (!value.trim()) return "Este campo es obligatorio";
    if (id === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) return "Ingresa un email válido";
    }
    if (id === "telefono") {
      const telRegex = /^[+]?[\d\s-]{7,}$/;
      if (!telRegex.test(value)) return "Ingresa un teléfono válido";
    }
    return "";
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { id, value } = e.target;
    const err = validarCampo(id, value);
    setErrores((prev) => ({ ...prev, [id]: err }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEnviando(true);
    setError("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;

    const nuevosErrores: Record<string, string> = {};
    CAMPOS_FORM.forEach((c) => {
      const err = validarCampo(c.id, data[c.id] as string);
      if (err) nuevosErrores[c.id] = err;
    });
    const errMensaje = validarCampo("mensaje", data.mensaje as string);
    if (errMensaje) nuevosErrores.mensaje = errMensaje;

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      setEnviando(false);
      return;
    }

    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("No se pudo enviar");
      setEnviado(true);
      form.reset();
      setErrores({});
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
      className="relative z-10 border-b border-[#E2E8F0] px-6 py-24 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-3 font-mono text-xs uppercase tracking-wider text-slate-400">
          DG-09 / CONTACTO
        </div>
        <div className="mb-14 flex flex-col gap-4 border-b border-[#E2E8F0] pb-10 md:flex-row md:items-end md:justify-between">
          <h2 className="font-serif text-4xl font-medium tracking-tight text-slate-900 md:text-5xl">
            Solicita una evaluación
            <br className="hidden md:block" /> de tus datos
          </h2>
          <p className="max-w-sm text-sm text-slate-500">
            Cuéntanos qué proceso o reporte hoy te quita tiempo. Respondemos
            dentro de un día hábil con una propuesta concreta.
          </p>
        </div>

        <div className="grid gap-16 md:grid-cols-[1.3fr_1fr]">
          <motion.form
            ref={formRef}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-x-6 gap-y-7 sm:grid-cols-2"
            noValidate
          >
            {CAMPOS_FORM.map((campo) => (
              <div key={campo.id} className="flex flex-col gap-2">
                <label
                  htmlFor={campo.id}
                  className="font-mono text-xs uppercase tracking-wider text-slate-500"
                >
                  {campo.label}*
                </label>
                <input
                  id={campo.id}
                  name={campo.id}
                  type={campo.type}
                  autoComplete={campo.autoComplete}
                  required
                  aria-invalid={!!errores[campo.id]}
                  aria-describedby={errores[campo.id] ? `err-${campo.id}` : undefined}
                  onBlur={handleBlur}
                  className="border-b border-[#E2E8F0] bg-transparent py-2.5 text-slate-900 placeholder:text-slate-400/60 focus:border-[#0EA5E9] focus:outline-none"
                />
                {errores[campo.id] && (
                  <p id={`err-${campo.id}`} className="text-xs text-red-500">
                    {errores[campo.id]}
                  </p>
                )}
              </div>
            ))}

            <div className="flex flex-col gap-2 sm:col-span-2">
              <label
                htmlFor="mensaje"
                className="font-mono text-xs uppercase tracking-wider text-slate-500"
              >
                Mensaje / consulta*
              </label>
              <textarea
                id="mensaje"
                name="mensaje"
                required
                rows={4}
                aria-invalid={!!errores.mensaje}
                aria-describedby={errores.mensaje ? "err-mensaje" : undefined}
                onBlur={handleBlur}
                className="resize-none border-b border-[#E2E8F0] bg-transparent py-2.5 text-slate-900 placeholder:text-slate-400/60 focus:border-[#0EA5E9] focus:outline-none"
              />
              {errores.mensaje && (
                <p id="err-mensaje" className="text-xs text-red-500">
                  {errores.mensaje}
                </p>
              )}
            </div>

            <div className="sm:col-span-2">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={enviando || enviado}
                className="bg-[#0EA5E9] px-9 py-3.5 font-mono text-sm uppercase tracking-wider text-white transition-colors hover:bg-[#0284C7] disabled:opacity-50"
              >
                {enviado
                  ? "Mensaje enviado"
                  : enviando
                    ? "Enviando..."
                    : "Enviar consulta"}
              </motion.button>

              <div aria-live="polite" className="sr-only">
                {enviado && "Mensaje enviado correctamente. Un especialista te contactará pronto."}
                {error && error}
              </div>

              {enviado && (
                <p className="mt-3 text-sm text-[#0EA5E9]">
                  Gracias — un especialista te contactará pronto.
                </p>
              )}
              {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
            </div>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-8 border-t border-[#E2E8F0] pt-8 md:border-t-0 md:border-l md:pl-12 md:pt-0"
          >
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-slate-500">
                Oficinas
              </span>
              <p className="mt-2 text-lg text-slate-900">Santiago, Chile</p>
            </div>
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-slate-500">
                Email
              </span>
              <p className="mt-2 text-lg text-slate-900">
                <a
                  href="mailto:contacto@datagob.cl"
                  className="transition-colors hover:text-[#0284C7]"
                >
                  contacto@datagob.cl
                </a>
              </p>
            </div>
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-slate-500">
                Teléfono
              </span>
              <p className="mt-2 text-lg text-slate-900">
                <a
                  href="tel:+56229402358"
                  className="transition-colors hover:text-[#0284C7]"
                >
                  +56 2 2940 2358
                </a>
              </p>
            </div>
            <div className="mt-auto border-t border-[#E2E8F0] pt-6">
              <p className="font-mono text-xs uppercase tracking-wider text-slate-500">
                Plazo de respuesta: 1 día hábil
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Header — con scroll transform y focus trap móvil                  */
/* ------------------------------------------------------------------ */

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const lastFocusedElement = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll();
  const headerBackground = useTransform(
    scrollYProgress,
    [0, 0.02],
    ["rgba(255,255,255,0)", "rgba(255,255,255,0.95)"]
  );
  const headerBorder = useTransform(
    scrollYProgress,
    [0, 0.02],
    ["rgba(226,232,240,0)", "rgba(226,232,240,1)"]
  );
  const headerShadow = useTransform(
    scrollYProgress,
    [0, 0.02],
    ["0 0 0 rgba(0,0,0,0)", "0 4px 20px rgba(0,0,0,0.05)"]
  );

  /* Focus trap para menú móvil */
  useEffect(() => {
    if (!menuOpen) return;
    lastFocusedElement.current = document.activeElement as HTMLElement;
    const menu = menuRef.current;
    if (!menu) return;

    const focusable = menu.querySelectorAll<HTMLElement>(
      'a[href], button, textarea, input[type="text"], input[type="email"], input[type="tel"], select'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    first?.focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setMenuOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      lastFocusedElement.current?.focus();
    };
  }, [menuOpen]);

  const navItems = [
    { label: "Servicios", href: "#servicios" },
    { label: "Cómo trabajamos", href: "#proceso" },
    { label: "Resultados", href: "#metricas" },
    { label: "Contacto", href: "#contacto" },
  ];

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={{
        backgroundColor: headerBackground,
        borderBottomColor: headerBorder,
        boxShadow: headerShadow,
      }}
      className="fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-xl"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <a href="#" className="group flex items-center gap-3">
          <motion.img
            src="/logo_datagob.png"
            alt="DataGob"
            whileHover={{ rotate: 8, scale: 1.05 }}
            transition={{ duration: 0.4 }}
            className="h-10 w-10 rounded-xl object-contain"
          />
          <div className="flex flex-col leading-none">
            <span className="font-serif text-xl font-semibold tracking-tight text-slate-900">
              DATA<span className="text-[#0EA5E9]">GOB</span>
            </span>
            <span className="text-[10px] uppercase tracking-[0.35em] text-slate-500">
              Data Engineering · AI
            </span>
          </div>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Navegación principal">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="group relative font-mono text-[11px] uppercase tracking-[0.22em] text-slate-500 transition-colors hover:text-[#0EA5E9]"
            >
              {item.label}
              <span className="absolute -bottom-2 left-0 h-px w-0 bg-[#0EA5E9] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <motion.a
            href="#contacto"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            className="hidden md:inline-flex rounded-full bg-[#0EA5E9] px-4 py-2 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-white transition-all hover:bg-[#0284C7]"
          >
            Agenda una consultoría
          </motion.a>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-900 md:hidden"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            ref={menuRef}
            id="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="border-t border-slate-200 bg-white/95 backdrop-blur-xl shadow-lg md:hidden"
          >
            <div className="flex flex-col px-6 py-6">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="border-b border-white/5 py-4 font-mono text-sm uppercase tracking-[0.18em] text-slate-500 transition hover:text-slate-900"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#contacto"
                onClick={() => setMenuOpen(false)}
                className="mt-6 rounded-full bg-[#0EA5E9] py-3 text-center font-mono text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-[#0284C7]"
              >
                Agenda una consultoría
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero                                                              */
/* ------------------------------------------------------------------ */

function HeroSection() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section
      ref={heroRef}
      className="relative z-10 border-b border-[#E2E8F0] px-6 pb-20 pt-16 md:pb-28 md:pt-20"
    >
      <motion.div style={{ opacity: heroOpacity, y: heroY }} className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="mb-5 font-mono text-xs uppercase tracking-wider text-slate-400">
            Ingeniería de datos, BI, ML y automatización — Santiago, Chile
          </p>
          <h1 className="max-w-3xl font-serif text-4xl font-medium leading-[1.15] tracking-tight md:text-6xl">
            Impulsa tu empresa basado en datos e inteligencia artificial.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-500">
            Convierte tus datos en una ventaja competitiva mediante
            soluciones de Ingeniería de Datos,Analítica e Inteligencia Artificial.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <motion.a
              href="#contacto"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-[#0EA5E9] px-7 py-3.5 font-mono text-sm uppercase tracking-wider text-white shadow-[0_0_28px_-6px_rgba(14,165,233,0.45)] transition-all hover:bg-[#0284C7] hover:shadow-[0_0_36px_-4px_rgba(14,165,233,0.55)]"
            >
              Solicitar evaluación
            </motion.a>
            <a
              href="#servicios"
              className="border border-slate-300 px-7 py-3.5 font-mono text-sm uppercase tracking-wider transition-colors hover:border-[#0EA5E9] hover:text-[#0284C7]"
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
          className="relative mt-20 overflow-hidden rounded-2xl border border-[#0EA5E9]/25 bg-gradient-to-br from-[#F0F9FF] via-[#E0F2FE] to-[#DBEAFE] shadow-[0_20px_80px_-20px_rgba(14,165,233,0.25)]"
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#38BDF8] to-transparent opacity-40" />
          <div className="flex items-center justify-between border-b border-slate-200 px-8 py-5">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#0284C7]">
                Data Pipeline
              </p>
              <h3 className="mt-2 text-lg font-semibold text-slate-900">
                Flujo de datos end-to-end
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Desde las fuentes de datos hasta dashboards y analítica avanzada.
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-[#0EA5E9]/20 bg-[#0EA5E9]/10 px-4 py-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#0EA5E9]" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#0EA5E9]" />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#0EA5E9]">
                Activo
              </span>
            </div>
          </div>
          <div className="relative p-8">
            <DiagramaFlujoDesktop />
            <DiagramaFlujoMobile />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Servicios                                                         */
/* ------------------------------------------------------------------ */

function ServiciosSection() {
  return (
    <section id="servicios" className="relative z-10 border-b border-[#E2E8F0] px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-slate-400">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2563EB] opacity-50" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#2563EB]" />
          </span>
          DG-02 / SERVICIOS
        </div>
        <div className="mb-16 flex flex-col gap-4 border-b border-[#E2E8F0] pb-10 md:flex-row md:items-end md:justify-between">
          <h2 className="font-serif text-4xl font-medium tracking-tight md:text-5xl">
            Distintos servicios, para potenciar
          </h2>
          <p className="max-w-sm text-sm text-slate-500">
            Comienza por el servicio que genere mayor impacto y expande tu plataforma de datos a medida que evolucionan las necesidades de tu organización.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {SERVICIOS.map((s, i) => {
            const clave = iconoClave(s.folio);
            const Icono = ICONOS_SERVICIO[clave];
            const usaColorSecundario = clave === "BI" || clave === "AUT" || clave === "EST";
            const color = usaColorSecundario ? THEME.secondary : THEME.primary;

            return (
              <motion.div
                key={s.folio}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.45, delay: (i % 2) * 0.07 }}
                className={`group relative overflow-hidden rounded-xl border bg-white p-6 transition-all duration-300
                  ${usaColorSecundario ? "border-slate-100 hover:border-[#2563EB]/30" : "border-slate-100 hover:border-[#0EA5E9]/40"}
                  hover:-translate-y-0.5`}
              >
                <div className={`absolute left-0 top-4 bottom-4 w-0.5 rounded-r-sm transition-opacity duration-300 opacity-40 group-hover:opacity-100`}
                  style={{ backgroundColor: color }}
                />
                <div className={`pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full blur-3xl transition-opacity duration-500 opacity-0 group-hover:opacity-[0.15]`}
                  style={{ backgroundColor: color }}
                />
                <span className="absolute right-4 top-3.5 font-mono text-[9px] tracking-[0.15em] text-slate-300 transition-colors duration-300 group-hover:text-[#0EA5E9]/50">
                  {s.folio}
                </span>
                <div className={`mb-5 flex h-9 w-9 items-center justify-center rounded-lg border transition-all duration-300
                  ${usaColorSecundario
                    ? "border-slate-100 text-slate-400 group-hover:border-[#2563EB]/40 group-hover:bg-[#2563EB]/5 group-hover:text-[#2563EB]"
                    : "border-slate-100 text-slate-400 group-hover:border-[#0EA5E9]/40 group-hover:bg-[#0EA5E9]/5 group-hover:text-[#0EA5E9]"
                  }`}>
                  {Icono ? <Icono className="h-4 w-4" /> : null}
                </div>
                <p className="font-mono text-[10px] uppercase tracking-wider" style={{ color }}>
                  {s.tag}
                </p>
                <h3 className="mt-1.5 font-serif text-[17px] font-medium leading-snug text-slate-900">
                  {s.nombre}
                </h3>
                <p className="mt-2.5 text-[12px] leading-relaxed text-slate-500 transition-colors duration-300 group-hover:text-slate-500">
                  {s.descripcion}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {(TECH_PILLS[clave] ?? []).map((t) => (
                    <span key={t} className="rounded border border-slate-200 px-2 py-0.5 font-mono text-[9.5px] tracking-wide text-slate-400 transition-colors duration-300 group-hover:border-slate-300 group-hover:text-[#0EA5E9]">
                      {t}
                    </span>
                  ))}
                </div>
                <div className={`mt-5 h-px w-6 transition-all duration-300 group-hover:w-12`}
                  style={{ backgroundColor: "#E2E8F0" }}
                />
                <div className={`mt-5 h-px w-6 transition-all duration-300 group-hover:w-12`}
                  style={{ backgroundColor: color }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Proceso                                                           */
/* ------------------------------------------------------------------ */

function ProcesoSection() {
  return (
    <section id="proceso" className="relative z-10 border-b border-[#E2E8F0] px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-3 font-mono text-xs uppercase tracking-wider text-slate-400">
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
              className={`border-t border-[#0EA5E9]/60 py-6 pr-6 ${i > 0 ? "md:border-l md:border-t-0 md:border-[#E2E8F0] md:pl-6" : ""}`}
            >
              <span className="font-mono text-xs text-slate-500">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 font-serif text-lg font-medium">{p.etapa}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">{p.descripcion}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Métricas — con contadores animados                                */
/* ------------------------------------------------------------------ */

function MetricasSection() {
  return (
    <section
      id="metricas"
      className="relative z-10 border-b border-[#E2E8F0] bg-[#EFF6FF] px-6 py-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-3 font-mono text-xs uppercase tracking-wider text-slate-400">
          DG-07 / RESULTADOS
        </div>
        <div className="grid grid-cols-2 gap-10 border-t border-[#E2E8F0] pt-10 md:grid-cols-4">
          {METRICAS.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
            >
              <ContadorMetrica valor={m.valor} sufijo={m.sufijo} />
              <p className="mt-2 font-mono text-xs uppercase tracking-wider text-slate-500">
                {m.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Footer mejorado                                                   */
/* ------------------------------------------------------------------ */

function Footer() {
  return (
    <footer className="relative z-10 border-t border-slate-200 bg-white px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:justify-between md:items-center">
        <div className="flex items-center gap-3">
          <img src="/logo_datagob.png" alt="DataGob" className="h-8 w-8 rounded-lg object-contain" />
          <div className="flex flex-col gap-0.5">
            <span className="font-serif text-lg font-semibold text-slate-900">
              DATA<span className="text-[#0EA5E9]">GOB</span>
            </span>
            <span className="font-mono text-xs text-slate-500">
              Santiago, Chile
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2 md:text-right">
          <div className="flex gap-6 font-mono text-xs text-slate-500">
            <a href="mailto:contacto@datagob.cl" className="hover:text-[#0284C7] transition-colors">
              contacto@datagob.cl
            </a>
            <a href="tel:+56229402358" className="hover:text-[#0284C7] transition-colors">
              +56 2 2940 2358
            </a>
          </div>
          <span className="font-mono text-xs text-slate-400">
            © {new Date().getFullYear()} Todos los derechos reservados
          </span>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  Skip link — accesibilidad                                         */
/* ------------------------------------------------------------------ */

function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-[#0EA5E9] focus:px-4 focus:py-2 focus:text-white focus:font-mono focus:text-sm"
    >
      Saltar al contenido principal
    </a>
  );
}

/* ------------------------------------------------------------------ */
/*  Página principal                                                  */
/* ------------------------------------------------------------------ */

export default function Home() {
  return (
    <>
      <SkipLink />
      <main id="main" className="bg-[#F8FAFC] text-slate-900">
        <Header />
        <HeroSection />
        <ServiciosSection />
        <ProcesoSection />
        <MetricasSection />
        <TestimoniosSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
}