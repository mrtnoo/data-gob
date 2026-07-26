"use client";

import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle2, Layers, Zap, Shield, BarChart3, Brain, Bot, Compass } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Datos enriquecidos por servicio                                   */
/* ------------------------------------------------------------------ */

export type ServicioDetalle = {
    slug: string;
    folio: string;
    clave: string;
    nombre: string;
    tag: string;
    descripcion: string;
    color: string;
    icono: React.ReactNode;
    queHacemos: string[];
    tecnologias: string[];
    beneficios: { titulo: string; desc: string }[];
    proceso: { paso: string; desc: string }[];
    metricas: { valor: string; label: string }[];
    cta: string;
};

export const SERVICIOS_DETALLE: ServicioDetalle[] = [
    {
        slug: "ingenieria-de-datos",
        folio: "DG-01 / ING",
        clave: "ING",
        nombre: "Ingeniería de datos",
        tag: "Lakehouse & Data Warehouse",
        descripcion:
            "Diseñamos e implementamos plataformas de datos modernas, Data Warehouses y arquitecturas Lakehouse. Construimos pipelines ETL/ELT escalables que integran información desde múltiples fuentes, garantizando calidad, disponibilidad y rendimiento para analítica, reportería e inteligencia artificial.",
        color: "#0EA5E9",
        icono: <Layers className="h-6 w-6" />,
        queHacemos: [
            "Diseño de arquitecturas Lakehouse y Data Warehouse",
            "Construcción de pipelines ETL/ELT escalables",
            "Integración de fuentes heterogéneas (APIs, bases de datos, archivos)",
            "Optimización de rendimiento y costos en la nube",
            "Migración de sistemas legacy a plataformas modernas",
        ],
        tecnologias: ["AWS Glue", "BigQuery", "Azure Synapse", "Airflow", "dbt", "Spark", "Kafka", "Snowflake"],
        beneficios: [
            { titulo: "Datos centralizados", desc: "Toda tu información en un solo lugar, accesible y consistente." },
            { titulo: "Escalabilidad", desc: "Tu plataforma crece con tu negocio sin reconstruir desde cero." },
            { titulo: "Menor costo", desc: "Optimización de recursos cloud y eliminación de procesos manuales." },
        ],
        proceso: [
            { paso: "Inventario", desc: "Mapeamos todas tus fuentes de datos actuales." },
            { paso: "Arquitectura", desc: "Diseñamos la solución técnica óptima para tu caso." },
            { paso: "Implementación", desc: "Construimos pipelines con pruebas y monitoreo." },
            { paso: "Entrega", desc: "Documentación, capacitación y pase a producción." },
        ],
        metricas: [
            { valor: "< 2h", label: "Latencia de ingestión" },
            { valor: "99.9%", label: "Disponibilidad" },
            { valor: "-40%", label: "Reducción de costos" },
        ],
        cta: "Quiero modernizar mi plataforma de datos",
    },
    {
        slug: "reporteria-y-bi",
        folio: "DG-02 / BI",
        clave: "BI",
        nombre: "Reportería y BI",
        tag: "Dashboards & KPIs",
        descripcion:
            "Creamos dashboards ejecutivos, indicadores clave (KPIs) y modelos analíticos que entregan visibilidad en tiempo real del negocio. Transformamos datos complejos en información clara para mejorar el seguimiento y la toma de decisiones.",
        color: "#2563EB",
        icono: <BarChart3 className="h-6 w-6" />,
        queHacemos: [
            "Diseño de dashboards ejecutivos y operativos",
            "Definición de KPIs alineados a objetivos de negocio",
            "Modelado semántico y capa de métricas",
            "Reportes automatizados por email/Slack",
            "Self-service analytics para equipos no técnicos",
        ],
        tecnologias: ["Power BI", "Looker", "Tableau", "QuickSight", "dbt metrics", "Metabase", "Superset"],
        beneficios: [
            { titulo: "Decisiones en tiempo real", desc: "Deja de esperar reportes semanales. Actúa hoy." },
            { titulo: "Una sola verdad", desc: "Todos ven los mismos números, sin discrepancias." },
            { titulo: "Autonomía", desc: "Los equipos de negocio exploran datos sin depender de TI." },
        ],
        proceso: [
            { paso: "Descubrimiento", desc: "Entendemos qué decisiones necesitas tomar y con qué frecuencia." },
            { paso: "Modelado", desc: "Construimos el modelo de datos y las métricas clave." },
            { paso: "Visualización", desc: "Diseñamos dashboards claros, sin ruido visual." },
            { paso: "Adopción", desc: "Capacitamos a tu equipo y medimos el uso." },
        ],
        metricas: [
            { valor: "< 3s", label: "Tiempo de carga" },
            { valor: "50+", label: "KPIs definidos" },
            { valor: "100%", label: "Adopción equipo" },
        ],
        cta: "Quiero dashboards que hablen por sí solos",
    },
    {
        slug: "gobierno-y-calidad-de-datos",
        folio: "DG-03 / GOB",
        clave: "GOB",
        nombre: "Gobierno y calidad de datos",
        tag: "Calidad y Gobierno",
        descripcion:
            "Implementamos procesos de gobierno de datos que aseguran calidad, trazabilidad, seguridad y cumplimiento normativo. Definimos estándares, catálogos y controles que permiten confiar en la información utilizada por toda la organización.",
        color: "#0EA5E9",
        icono: <Shield className="h-6 w-6" />,
        queHacemos: [
            "Implementación de catálogos de datos (DataHub, Collibra)",
            "Definición de políticas de calidad y linaje",
            "Automatización de tests de calidad (Great Expectations)",
            "Gestión de metadatos y documentación",
            "Cumplimiento normativo (ISO 27001, GDPR)",
        ],
        tecnologias: ["DataHub", "Collibra", "Great Expectations", "dbt tests", "OpenMetadata", "Monte Carlo"],
        beneficios: [
            { titulo: "Confianza", desc: "Todos en la empresa confían en los mismos datos." },
            { titulo: "Trazabilidad", desc: "Sabes de dónde viene cada dato y quién lo modificó." },
            { titulo: "Cumplimiento", desc: "Auditorías sin estrés, normativas al día." },
        ],
        proceso: [
            { paso: "Diagnóstico", desc: "Evaluamos la madurez de gobierno actual." },
            { paso: "Políticas", desc: "Definimos reglas de calidad, ownership y acceso." },
            { paso: "Automatización", desc: "Tests automáticos en cada pipeline." },
            { paso: "Monitoreo", desc: "Alertas proactivas ante anomalías de calidad." },
        ],
        metricas: [
            { valor: "98%", label: "Calidad de datos" },
            { valor: "0", label: "Incidentes críticos" },
            { valor: "100%", label: "Cobertura de linaje" },
        ],
        cta: "Quiero datos en los que pueda confiar",
    },
    {
        slug: "machine-learning-y-data-science",
        folio: "DG-04 / ML",
        clave: "ML",
        nombre: "Machine Learning y Data Science",
        tag: "Data Science",
        descripcion:
            "Desarrollamos soluciones de inteligencia artificial, modelos predictivos y analítica avanzada para optimizar procesos, detectar oportunidades y anticipar escenarios. Llevamos los modelos desde la experimentación hasta ambientes productivos con monitoreo continuo.",
        color: "#0EA5E9",
        icono: <Brain className="h-6 w-6" />,
        queHacemos: [
            "Modelos predictivos de churn, demanda y riesgo",
            "Segmentación de clientes con clustering",
            "Procesamiento de lenguaje natural (NLP)",
            "Computer vision para automatización",
            "MLOps: despliegue y monitoreo en producción",
        ],
        tecnologias: ["scikit-learn", "XGBoost", "PyTorch", "MLflow", "SageMaker", "TensorFlow", "HuggingFace"],
        beneficios: [
            { titulo: "Anticipación", desc: "Predice problemas antes de que ocurran." },
            { titulo: "Automatización", desc: "Decisiones inteligentes sin intervención humana." },
            { titulo: "Ventaja competitiva", desc: "Descubre patrones que nadie más ve." },
        ],
        proceso: [
            { paso: "Exploración", desc: "Análisis exploratorio y definición del problema." },
            { paso: "Experimentación", desc: "Entrenamiento y validación de modelos." },
            { paso: "Producción", desc: "Despliegue con APIs y monitoreo de drift." },
            { paso: "Mejora", desc: "Retraining automático y optimización continua." },
        ],
        metricas: [
            { valor: "95%", label: "Accuracy promedio" },
            { valor: "< 200ms", label: "Latencia predicción" },
            { valor: "3x", label: "ROI proyectado" },
        ],
        cta: "Quiero modelos predictivos para mi negocio",
    },
    {
        slug: "automatizacion-de-procesos",
        folio: "DG-05 / AUT",
        clave: "AUT",
        nombre: "Automatización de procesos",
        tag: "RPA & Integraciones",
        descripcion:
            "Automatizamos procesos de negocio mediante RPA, APIs e integraciones inteligentes utilizando herramientas como UiPath, Selenium y n8n. Reducimos tiempos operativos, minimizamos errores y aumentamos la eficiencia mediante flujos seguros y escalables.",
        color: "#2563EB",
        icono: <Bot className="h-6 w-6" />,
        queHacemos: [
            "Automatización de reportes y envíos recurrentes",
            "Integración de sistemas mediante APIs y webhooks",
            "RPA para tareas repetitivas en aplicaciones legacy",
            "Workflows inteligentes con lógica condicional",
            "Orquestación de procesos end-to-end",
        ],
        tecnologias: ["UiPath", "Selenium", "n8n", "Python", "Zapier", "Make", "Power Automate"],
        beneficios: [
            { titulo: "Velocidad", desc: "Procesos que tomaban horas, ahora minutos." },
            { titulo: "Precisión", desc: "Elimina errores humanos en tareas repetitivas." },
            { titulo: "Escalabilidad", desc: "Los bots trabajan 24/7 sin fatiga." },
        ],
        proceso: [
            { paso: "Mapeo", desc: "Documentamos el proceso actual paso a paso." },
            { paso: "Diseño", desc: "Diseñamos el flujo automatizado con excepciones." },
            { paso: "Desarrollo", desc: "Construimos el bot o workflow." },
            { paso: "Go-live", desc: "Pruebas, ajustes y monitoreo continuo." },
        ],
        metricas: [
            { valor: "-80%", label: "Tiempo operativo" },
            { valor: "0", label: "Errores manuales" },
            { valor: "24/7", label: "Disponibilidad" },
        ],
        cta: "Quiero automatizar mis procesos repetitivos",
    },
    {
        slug: "estrategia-de-datos",
        folio: "DG-06 / EST",
        clave: "EST",
        nombre: "Estrategia de datos",
        tag: "Consultoría Estratégica",
        descripcion:
            "Diseñamos estrategias de datos alineadas con los objetivos del negocio. Evaluamos la madurez tecnológica, identificamos oportunidades de mejora y definimos una hoja de ruta para maximizar el valor de la información y acelerar la transformación digital.",
        color: "#2563EB",
        icono: <Compass className="h-6 w-6" />,
        queHacemos: [
            "Evaluación de madurez de datos (DMMI)",
            "Diseño de hoja de ruta tecnológica",
            "Definición de arquitectura de datos target",
            "Assessment de seguridad y cumplimiento",
            "Capacitación y change management",
        ],
        tecnologias: ["DMMI", "ISO 27001", "Roadmap", "OKRs", "Lean Data"],
        beneficios: [
            { titulo: "Dirección clara", desc: "Sabes exactamente hacia dónde ir y en qué orden." },
            { titulo: "Inversión inteligente", desc: "Priorizas lo que genera mayor impacto." },
            { titulo: "Alineación", desc: "TI y negocio hablan el mismo idioma." },
        ],
        proceso: [
            { paso: "Diagnóstico", desc: "Evaluamos madurez, gaps y oportunidades." },
            { paso: "Visión", desc: "Definimos el estado objetivo a 12-24 meses." },
            { paso: "Roadmap", desc: "Priorizamos iniciativas por impacto/esfuerzo." },
            { paso: "Acompañamiento", desc: "Te guiamos en la ejecución paso a paso." },
        ],
        metricas: [
            { valor: "+3", label: "Niveles DMMI" },
            { valor: "6 meses", label: "Primeros resultados" },
            { valor: "100%", label: "Alineación TI-Negocio" },
        ],
        cta: "Quiero una hoja de ruta para mis datos",
    },
];

export function getServicioBySlug(slug: string): ServicioDetalle | undefined {
    return SERVICIOS_DETALLE.find((s) => s.slug === slug);
}