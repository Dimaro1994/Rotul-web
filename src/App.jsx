import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";

const auditItems = [
  {
    icon: "UX",
    title: "Mensaje y propuesta de valor",
    description:
      "Detectamos si tu web deja claro qué haces, para quién y por qué deberían elegirte.",
  },
  {
    icon: "CVR",
    title: "Estructura y conversión",
    description:
      "Analizamos flujo, llamadas a la acción y fricciones que están frenando tus contactos.",
  },
  {
    icon: "LEAD",
    title: "Captación y seguimiento de leads",
    description:
      "Revisamos formularios, WhatsApp y puntos de fuga para que no pierdas oportunidades.",
  },
];

const portfolioItems = [
  {
    id: "clinica-dental",
    name: "Web corporativa para clínica dental",
    metric: { value: 62, prefix: "+", suffix: "%", label: "solicitudes" },
    before: {
      title: "Web corporativa para clínica dental",
      eyebrow: "Antes",
      result: "0 recorrido claro",
      image: "/assets/case-dental-before.svg",
      imageAlt: "Captura recreada de la web antigua de una clínica dental",
      summary: "La web parecía correcta, pero no llevaba al usuario a pedir cita.",
      points: ["Mensaje confuso", "Sin CTA visible", "Formulario oculto", "Poco contenido"],
    },
    after: {
      title: "Landing para captar pacientes",
      eyebrow: "Después",
      result: "+62% solicitudes",
      image: "/assets/case-dental-after.svg",
      imageAlt: "Captura recreada de la nueva landing de una clínica dental",
      summary: "Creamos una landing con promesa clara, prueba social y contacto inmediato.",
      points: ["CTA visible", "Mensaje claro", "Formulario optimizado", "Más confianza"],
    },
    detailTitle: "Cómo desbloqueamos la conversión",
    detailPoints: [
      "Reordenamos la hero para que el servicio, el beneficio y el CTA se entendieran en segundos.",
      "Quitamos fricción en el contacto con un formulario corto y acceso visible a WhatsApp.",
      "Añadimos prueba social y una propuesta de valor más concreta para elevar confianza.",
    ],
  },
  {
    id: "decoracion",
    name: "Tienda online del sector decoración",
    metric: { value: 41, prefix: "+", suffix: "%", label: "ventas" },
    before: {
      title: "Ecommerce de decoración",
      eyebrow: "Antes",
      result: "Compra con fricción",
      image: "/assets/case-deco-before.svg",
      imageAlt: "Captura recreada de un ecommerce antiguo de decoración",
      summary: "El catálogo tenía producto, pero el recorrido hacia la compra se sentía pesado.",
      points: ["Categorías confusas", "Fichas sin jerarquía", "CTA débil", "Checkout largo"],
    },
    after: {
      title: "Ecommerce optimizado",
      eyebrow: "Después",
      result: "+41% ventas",
      image: "/assets/case-deco-after.svg",
      imageAlt: "Captura recreada de un ecommerce optimizado de decoración",
      summary: "Simplificamos búsqueda, fichas y compra para que el usuario avanzara sin dudas.",
      points: ["Filtros claros", "Producto protagonista", "CTA persistente", "Compra más corta"],
    },
    detailTitle: "Dónde estaba el cuello de botella",
    detailPoints: [
      "Simplificamos categorias y filtros para que el usuario encontrara producto sin perderse.",
      "Rehicimos fichas y CTAs para reducir dudas antes de comprar.",
      "Limpiamos el recorrido de compra para recortar pasos y mejorar la conversión final.",
    ],
  },
  {
    id: "negocio-local",
    name: "Negocio local de servicios",
    metric: { value: 3, prefix: "", suffix: "x", label: "leads" },
    before: {
      title: "Web local sin estrategia",
      eyebrow: "Antes",
      result: "Leads impredecibles",
      image: "/assets/case-local-before.svg",
      imageAlt: "Captura recreada de una web antigua para negocio local",
      summary: "La web funcionaba como folleto, no como una herramienta para conseguir contactos.",
      points: ["Oferta genérica", "Sin prueba social", "Anuncios desconectados", "Contacto al final"],
    },
    after: {
      title: "Landing local de conversión",
      eyebrow: "Después",
      result: "3x leads cualificados",
      image: "/assets/case-local-after.svg",
      imageAlt: "Captura recreada de una landing optimizada para negocio local",
      summary: "Alineamos oferta, anuncios y landing para convertir visitas en solicitudes reales.",
      points: ["Oferta específica", "Reseñas visibles", "Mensaje alineado", "Contacto inmediato"],
    },
    detailTitle: "Cómo se construyó el resultado",
    detailPoints: [
      "Definimos una oferta más clara para que el tráfico entendiera rápido el valor.",
      "Creamos una landing enfocada a contacto con una estructura pensada para cerrar leads.",
      "Alineamos anuncios, mensaje y captación para que todo empujara al mismo objetivo.",
    ],
  },
];

const testimonials = [
  {
    quote:
      "+63% más contactos en 2 meses tras clarificar mensaje, CTA y estructura.",
    author: "Laura G. - Reformas y hogar en Málaga",
    avatar: "https://i.pravatar.cc/100?img=44",
  },
  {
    quote:
      "Pasamos de no recibir contactos a tener reuniones cada semana con clientes reales.",
    author: "Marta P. - Clínica estética en Málaga",
    avatar: "https://i.pravatar.cc/100?img=32",
  },
  {
    quote:
      "Nos ayudaron a ordenar marca, web y publicidad. Ahora todo trabaja en la misma dirección.",
    author: "Daniel R. - Tienda local en Marbella",
    avatar: "https://i.pravatar.cc/100?img=12",
  },
  {
    quote:
      "El nuevo diseño transmite confianza y ahora convertimos muchas más visitas en clientes.",
    author: "Sergio M. - Asesoría profesional en Fuengirola",
    avatar: "https://i.pravatar.cc/100?img=51",
  },
  {
    quote:
      "Teníamos una web antigua que no funcionaba. Ahora tenemos una herramienta de ventas real.",
    author: "Ana V. - Centro de estética en Torremolinos",
    avatar: "https://i.pravatar.cc/100?img=5",
  },
  {
    quote:
      "El proceso fue claro y rápido. Desde el lanzamiento empezamos a recibir contactos de calidad.",
    author: "Jose R. - Empresa local en Mijas",
    avatar: "https://i.pravatar.cc/100?img=68",
  },
  {
    quote:
      "Antes teníamos visitas pero nadie escribía. Ahora recibimos solicitudes todas las semanas.",
    author: "Paula M. - Centro de fisioterapia en Madrid",
    avatar: "https://i.pravatar.cc/100?img=11",
  },
  {
    quote:
      "En un mes pasamos de depender del boca a boca a tener leads constantes desde la web.",
    author: "Ivan L. - Reformas integrales en Valencia",
    avatar: "https://i.pravatar.cc/100?img=19",
  },
  {
    quote:
      "Nos ayudaron a ordenar el mensaje y ahora el cliente entiende rápido lo que ofrecemos.",
    author: "Nuria C. - Clínica dental en Barcelona",
    avatar: "https://i.pravatar.cc/100?img=29",
  },
  {
    quote:
      "El cambio en conversión fue evidente desde la primera semana tras aplicar las mejoras.",
    author: "Ruben A. - Academia online en Sevilla",
    avatar: "https://i.pravatar.cc/100?img=35",
  },
];

const processSteps = [
  { title: "Contacto", benefit: "Analizo tu caso" },
  { title: "Análisis", benefit: "Detecto qué falla" },
  { title: "Diseño", benefit: "Planteo la solución" },
  { title: "Implementación", benefit: "Aplicamos los cambios" },
  { title: "Optimización", benefit: "Escalamos resultados" },
];

const heroSignals = [
  {
    label: "Mensaje",
    note: "En segundos se entiende lo que vendes",
    before: 26,
    after: 88,
  },
  {
    label: "CTA",
    note: "El siguiente paso deja de esconderse",
    before: 31,
    after: 91,
  },
  {
    label: "Confianza",
    note: "Pruebas y autoridad aparecen donde importan",
    before: 39,
    after: 84,
  },
];

const impactMetrics = [
  {
    value: 63,
    prefix: "+",
    suffix: "%",
    label: "más contactos cuando el mensaje y el CTA por fin empujan juntos",
  },
  {
    value: 5,
    suffix: " min",
    label: "para detectar el bloqueo principal y ordenar prioridades",
  },
  {
    value: 24,
    suffix: "h",
    label: "de respuesta con diagnóstico claro y siguientes pasos",
  },
];

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 26, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

function fadeIn(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.55, delay },
  };
}

function AnimatedMetric({ value, prefix = "", suffix = "", label }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.7 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!inView) {
      return undefined;
    }

    let frameId = 0;
    let startTime = 0;
    const duration = 1400;

    const update = (timestamp) => {
      if (!startTime) {
        startTime = timestamp;
      }

      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setDisplayValue(Math.round(value * eased));

      if (progress < 1) {
        frameId = window.requestAnimationFrame(update);
      }
    };

    frameId = window.requestAnimationFrame(update);

    return () => window.cancelAnimationFrame(frameId);
  }, [inView, value]);

  return (
    <div className="impact-card" ref={ref}>
      <p className="impact-value">
        {prefix}
        {displayValue}
        {suffix}
      </p>
      <p className="impact-label">{label}</p>
    </div>
  );
}

function AnimatedPortfolioMetric({ metric, active }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!active) {
      setDisplayValue(0);
      return undefined;
    }

    let frameId = 0;
    let startTime = 0;
    const duration = 900;

    const update = (timestamp) => {
      if (!startTime) {
        startTime = timestamp;
      }

      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setDisplayValue(Math.round(metric.value * eased));

      if (progress < 1) {
        frameId = window.requestAnimationFrame(update);
      }
    };

    frameId = window.requestAnimationFrame(update);

    return () => window.cancelAnimationFrame(frameId);
  }, [active, metric.value]);

  return (
    <span className="portfolio-metric">
      {metric.prefix}
      {displayValue}
      {metric.suffix} {metric.label}
    </span>
  );
}

function PortfolioCard({ item, onOpen }) {
  const [activeView, setActiveView] = useState("before");
  const content = activeView === "before" ? item.before : item.after;
  const isAfter = activeView === "after";

  return (
    <motion.article
      className={`card portfolio-card portfolio-card-${activeView}`}
      variants={staggerItem}
      layout
    >
      <div className="portfolio-mockup">
        <AnimatePresence mode="wait">
          <motion.img
            key={content.image}
            src={content.image}
            alt={content.imageAlt}
            initial={{ opacity: 0, scale: 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.015 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </AnimatePresence>
      </div>

      <div className="portfolio-card-head">
        <div>
          <span className={`compare-pill compare-pill-${activeView}`}>{content.eyebrow}</span>
          <h3>{content.title}</h3>
          <p className="result">
            {isAfter ? (
              <AnimatedPortfolioMetric metric={item.metric} active={isAfter} />
            ) : (
              content.result
            )}
          </p>
        </div>
      </div>

      <div className="portfolio-switch" role="group" aria-label={`Comparar ${item.name}`}>
        <button
          type="button"
          className={activeView === "before" ? "is-active" : ""}
          aria-pressed={activeView === "before"}
          onClick={() => setActiveView("before")}
        >
          Antes
        </button>
        <button
          type="button"
          className={activeView === "after" ? "is-active" : ""}
          aria-pressed={activeView === "after"}
          onClick={() => setActiveView("after")}
        >
          Después
        </button>
        <i aria-hidden="true" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeView}
          className="portfolio-dynamic"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <p>{content.summary}</p>
          <div className="portfolio-points">
            {content.points.map((point) => (
              <span key={point}>{point}</span>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="portfolio-actions">
        <button
          type="button"
          className="btn btn-secondary portfolio-case-button"
          onClick={() => onOpen(item)}
        >
          Ver resultado completo
        </button>
      </div>
    </motion.article>
  );
}

function PortfolioModal({ item, onClose }) {
  useEffect(() => {
    if (!item) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.classList.add("modal-open");
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [item, onClose]);

  return (
    <motion.div
      className="portfolio-modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <motion.article
        className="portfolio-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="portfolio-modal-title"
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 18, scale: 0.98 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="portfolio-modal-close"
          aria-label="Cerrar caso completo"
          onClick={onClose}
        >
          Cerrar
        </button>
        <div className="portfolio-modal-media">
          <img src={item.after.image} alt={item.after.imageAlt} />
        </div>
        <div className="portfolio-modal-copy">
          <p className="section-kicker">Caso completo</p>
          <h2 id="portfolio-modal-title">{item.name}</h2>
          <p className="portfolio-modal-result">{item.after.result}</p>
          <p>{item.detailTitle}</p>
          <div className="portfolio-detail-list">
            {item.detailPoints.map((point) => (
              <p className="portfolio-detail-item" key={point}>
                {point}
              </p>
            ))}
          </div>
          <a href="#contacto" className="btn btn-primary" onClick={onClose}>
            Quiero una auditoría parecida
          </a>
        </div>
      </motion.article>
    </motion.div>
  );
}

function App() {
  const testimonialLoop = [...testimonials, ...testimonials];
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);

  return (
    <>
      <header className="topbar">
        <a className="brand" href="#inicio">
          <span className="brand-wordmark">ROTULWEB</span>
        </a>
        <nav>
          <a href="#portfolio">Proyectos</a>
          <a href="#contacto" className="nav-cta">
            Auditoria gratuita
          </a>
        </nav>
      </header>

      <main>
        <section className="hero" id="inicio">
          <div className="hero-noise" />
          <div className="hero-bg-shape hero-bg-shape-1" />
          <div className="hero-bg-shape hero-bg-shape-2" />

          <motion.div className="hero-copy" {...fadeIn(0.05)}>
            <p className="eyebrow">Diagnóstico real de conversión</p>
            <h1>Tu web no vende. Te digo por qué ocurre y cómo solucionarlo.</h1>
            <p className="subtitle subtitle-strong">
              En 5 minutos detecto qué está frenando tus ventas y qué deberías
              cambiar primero para conseguir más clientes.
            </p>
            <p className="subtitle subtitle-hook">
              Sin rehacer toda tu web. Sin humo. Sin perder meses.
            </p>
            <div className="hero-cta">
              <a className="btn btn-primary btn-pulse" href="#contacto">
                Quiero saber por qué mi web no vende
              </a>
              <a className="btn btn-secondary" href="#portfolio">
                Ver resultados reales
              </a>
            </div>
            <p className="hero-mini-proof">
              +50 negocios ya han mejorado su conversión
            </p>
            <p className="hero-mini-proof">
              Respuesta personal en menos de 24h
            </p>
            <div className="cta-microcopy">
              <span>Sin llamadas comerciales</span>
              <span>Te respondo personalmente</span>
              <span>Prioridades claras desde el primer mensaje</span>
            </div>
            <p className="hero-note">
              Solo analizo 2 webs nuevas esta semana.
            </p>
          </motion.div>

          <motion.div className="hero-stage" {...fadeIn(0.18)}>
            <div className="hero-stage-card">
              <div className="hero-stage-top">
                <p className="hero-stage-title">Radiografía de conversión</p>
                <span className="hero-stage-live">En marcha</span>
              </div>

              <div className="impact-grid">
                {impactMetrics.map((metric) => (
                  <AnimatedMetric
                    key={metric.label}
                    value={metric.value}
                    prefix={metric.prefix}
                    suffix={metric.suffix}
                    label={metric.label}
                  />
                ))}
              </div>

              <div className="hero-signal-board">
                {heroSignals.map((signal) => (
                  <div className="signal-row" key={signal.label}>
                    <div className="signal-copy">
                      <p>{signal.label}</p>
                      <span>{signal.note}</span>
                    </div>
                    <div className="signal-bars" aria-hidden="true">
                      <div className="signal-track signal-track-before">
                        <span
                          className="signal-fill"
                          style={{ width: `${signal.before}%` }}
                        />
                      </div>
                      <div className="signal-track signal-track-after">
                        <span
                          className="signal-fill"
                          style={{ width: `${signal.after}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="hero-stage-footer">
                <span>Antes: fuga silenciosa</span>
                <span>Despues: recorrido que empuja a contactar</span>
              </div>
            </div>
          </motion.div>
        </section>

        <motion.section
          className="section section-showcase"
          id="portfolio"
          {...fadeIn()}
        >
          <div className="section-heading">
            <p className="section-kicker">Antes / después con contraste real</p>
            <h2>Portfolio y trabajos</h2>
            <p className="section-intro">
              Casos con enfoque en conversión para demostrar impacto real.
            </p>
            <p className="section-intro section-intro-strong">
              No hacemos webs bonitas. Hacemos webs que generan resultados.
            </p>
            <p className="section-intro">
              Haz clic en "Antes" y "Después" para ver cómo cambia una web
              cuando se diseña para convertir.
            </p>
          </div>

          <motion.div
            className="grid portfolio-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.18 }}
            variants={staggerContainer}
          >
            {portfolioItems.map((item) => (
              <PortfolioCard
                item={item}
                key={item.id}
                onOpen={setSelectedPortfolio}
              />
            ))}
          </motion.div>
        </motion.section>

        <motion.section
          className="section section-plain testimonials-section"
          id="testimonios"
          {...fadeIn()}
        >
          <div className="section-heading section-heading-split">
            <div>
              <p className="section-kicker">Prueba social en movimiento</p>
              <h2>Testimonios</h2>
              <p className="section-intro">
                Más de 50 negocios ya están consiguiendo clientes con nosotros.
              </p>
            </div>
          </div>

          <div className="sectors-proof">
            <span>Clínica</span>
            <span>Inmobiliaria</span>
            <span>Ecommerce</span>
            <span>Negocio local</span>
          </div>

          <div className="testimonials-marquee">
            <div className="testimonials-track">
              {testimonialLoop.map((item, index) => (
                <article
                  className="card testimonial-card testimonial-card-marquee"
                  key={`${item.author}-${index}`}
                >
                  <div className="testimonial-head">
                    <img src={item.avatar} alt={item.author} />
                    <div>
                      <p className="author">{item.author}</p>
                      <p className="stars">5 estrellas</p>
                    </div>
                  </div>
                  <p className="quote">"{item.quote}"</p>
                </article>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section className="section section-timeline process" {...fadeIn()}>
          <div className="section-heading">
            <p className="section-kicker">Como trabajamos</p>
            <h2>Un proceso que se siente vivo</h2>
            <p className="section-intro">
              Detectamos bloqueos, priorizamos cambios y los convertimos en una
              ruta clara para vender mejor.
            </p>
          </div>

          <motion.div
            className="process-line"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.18 }}
            variants={staggerContainer}
          >
            {processSteps.map((step, index) => (
              <motion.article className="step" key={step.title} variants={staggerItem}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p className="step-title">{step.title}</p>
                <p className="step-benefit">{step.benefit}</p>
              </motion.article>
            ))}
          </motion.div>
        </motion.section>

        <motion.section className="section section-highlight" id="servicios" {...fadeIn()}>
          <div className="section-heading">
            <p className="section-kicker">Revisión accionable</p>
            <h2>Qué revisamos en tu auditoría</h2>
            <p className="section-intro">
              En 5 minutos te señalo los bloqueos que están frenando tus
              contactos y qué cambiar para empezar a convertir mejor.
            </p>
          </div>

          <motion.div
            className="grid services-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.18 }}
            variants={staggerContainer}
          >
            {auditItems.map((service) => (
              <motion.article
                key={service.title}
                className="card service-card"
                variants={staggerItem}
              >
                <span className="service-icon">{service.icon}</span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </motion.article>
            ))}
          </motion.div>
        </motion.section>

        <motion.section className="section section-split reasons" {...fadeIn()}>
          <div className="section-heading">
            <p className="section-kicker">Lo que suele estar frenando la venta</p>
            <h2>Esto es lo que vemos en el 90% de webs</h2>
            <p className="section-intro">
              Cada semana sin convertir es dinero que ya estás perdiendo.
            </p>
          </div>

          <div className="grid reasons-grid">
            <article className="card reasons-card reasons-card-alert">
              <h3>Problemas que hunden la conversión</h3>
              <p>El usuario entra y no entiende qué vendes.</p>
              <p>Lee, duda y se va sin dar el siguiente paso.</p>
              <p>El formulario aparece tarde o pide demasiado.</p>
            </article>
            <article className="card reasons-card reasons-card-proof">
              <h3>Autoridad y revisión personal</h3>
              <p>
                He analizado y optimizado más de 50 webs de negocios reales.
                Sé exactamente qué hace que una web convierta y qué la está
                frenando.
              </p>
              <p>
                Te digo qué está fallando y qué tocar primero para notar
                resultados.
              </p>
            </article>
          </div>

          <div className="trust-bullets">
            <span>Sin humo</span>
            <span>Diagnóstico accionable</span>
            <span>Prioridades claras</span>
          </div>
        </motion.section>

        <motion.section className="section section-plain" id="fit" {...fadeIn()}>
          <div className="section-heading">
            <p className="section-kicker">Encaje real</p>
            <h2>Para quién es esto</h2>
            <p className="section-intro">
              Encaja especialmente bien cuando ya existe negocio real y el
              cuello de botella está en la web, no en la intención de compra.
            </p>
          </div>

          <div className="grid audience-grid">
            <article className="card audience-card">
              <h3>Esto es para ti si</h3>
              <p className="audience-item audience-item-positive">
                Ya tienes tráfico pero no conviertes.
              </p>
              <p className="audience-item audience-item-positive">
                Recibes visitas pero pocos contactos.
              </p>
              <p className="audience-item audience-item-positive">
                Tu web no refleja el valor real de tu negocio.
              </p>
            </article>
            <article className="card audience-card">
              <h3>No es para ti si</h3>
              <p className="audience-item audience-item-negative">
                Buscas solo diseño bonito.
              </p>
              <p className="audience-item audience-item-negative">
                No tienes un negocio validado.
              </p>
              <p className="audience-item audience-item-negative">
                No quieres aplicar cambios orientados a resultado.
              </p>
            </article>
          </div>
        </motion.section>

        <motion.section className="section cta-strong" id="contacto" {...fadeIn()}>
          <p className="section-kicker">Cierre directo</p>
          <h2>Solicita tu auditoría</h2>
          <p className="reply-time">Respuesta en menos de 24h</p>
          <p>Pega tu web y te digo qué está fallando.</p>
          <form className="contact-form">
            <p className="form-helper">Solo necesito tu web. El resto es opcional.</p>
            <label htmlFor="name">Nombre</label>
            <input id="name" name="name" type="text" placeholder="Tu nombre" />
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" placeholder="tu@email.com" />
            <label htmlFor="message">URL de tu web</label>
            <textarea
              id="message"
              name="message"
              rows="3"
              placeholder="Pega aquí tu web y te digo qué está fallando."
            />
            <p className="form-commitment">
              Sin compromiso. Te respondemos en menos de 24h.
            </p>
            <button type="submit" className="btn btn-primary">
              Analiza mi web
            </button>
            <p className="form-note">
              Te responderé personalmente con mejoras claras y accionables.
            </p>
            <p className="form-note">
              Prefieres algo rápido. Hablamos por WhatsApp y lo vemos contigo.
            </p>
            <p className="form-authority">
              Solo trabajo con negocios que ya están facturando o quieren
              crecer en serio.
            </p>
          </form>
        </motion.section>

        <motion.section className="section decision-strip" {...fadeIn()}>
          <p className="decision-copy">
            Si tu web ya tiene tráfico pero no genera clientes, aquí es donde
            estás perdiendo dinero.
          </p>
          <div className="hero-cta">
            <a className="btn btn-primary" href="#contacto">
              Quiero saber por qué mi web no vende
            </a>
            <a
              className="btn btn-secondary"
              href="https://wa.me/34633833407?text=Hola%2C%20quiero%20que%20revises%20mi%20web"
              target="_blank"
              rel="noreferrer"
            >
              Hablar por WhatsApp
            </a>
          </div>
        </motion.section>

        <motion.section className="section final-close" {...fadeIn()}>
          <h2>Solo analizo 2 webs nuevas esta semana.</h2>
          <p>Reserva tu revisión antes de cerrar agenda.</p>
          <p>
            Cada semana que tu web no convierte, estás perdiendo clientes que ya
            podrías tener.
          </p>
          <div className="hero-cta">
            <a className="btn btn-primary" href="#contacto">
              Quiero saber por qué mi web no vende
            </a>
          </div>
          <div className="cta-microcopy">
            <span>Sin llamadas comerciales</span>
            <span>Te respondo personalmente</span>
          </div>
        </motion.section>
      </main>

      <footer className="footer">
        <div className="footer-links">
          <div className="footer-contact">
            <div className="footer-contact-row">
              <a href="mailto:info@rotulweb.com">info@rotulweb.com</a>
              <a href="tel:+34633833407">+34 633 833 407</a>
            </div>
            <span>Málaga · España</span>
          </div>
        </div>
        <div className="footer-trust">
          <span>Trabajamos con negocios en toda España</span>
          <span>+50 proyectos realizados</span>
          <span>Respuesta en menos de 24h</span>
        </div>
        <div className="footer-legal">
          <span>© Rotulweb 2026</span>
          <a href="#aviso-legal">Aviso legal</a>
          <a href="#privacidad">Privacidad</a>
        </div>
      </footer>

      <a
        className="whatsapp-float"
        href="https://wa.me/34633833407?text=Hola%2C%20quiero%20informacion%20sobre%20una%20web%20para%20mi%20negocio"
        target="_blank"
        rel="noreferrer"
        aria-label="Contactar por WhatsApp"
        data-tooltip="Habla con nosotros ahora"
      >
        WhatsApp
      </a>

      <a className="mobile-sticky-cta" href="#contacto">
        Auditoria gratuita
      </a>

      <AnimatePresence>
        {selectedPortfolio ? (
          <PortfolioModal
            item={selectedPortfolio}
            onClose={() => setSelectedPortfolio(null)}
          />
        ) : null}
      </AnimatePresence>
    </>
  );
}

export default App;
