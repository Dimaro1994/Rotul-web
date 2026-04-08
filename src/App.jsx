import { motion } from "framer-motion";
import ChatBot from "./ChatBot";

const services = [
  {
    icon: "DG",
    title: "Diseño gráfico que convierte en ventas",
    description:
      "Identidad visual, piezas publicitarias y creatividades pensadas para atraer y vender.",
    cta: "Analizar mi web gratis",
  },
  {
    icon: "WEB",
    title: "Webs optimizadas para captar clientes",
    description:
      "Webs rápidas, optimizadas para conversión y preparadas para crecer contigo.",
    cta: "Quiero más clientes",
  },
  {
    icon: "ADS",
    title: "Publicidad enfocada en generar clientes",
    description:
      "Campañas estratégicas para generar tráfico de calidad y clientes potenciales.",
    cta: "Ver cómo puedo conseguir clientes",
  },
];

const portfolioItems = [
  {
    name: "Web corporativa para clínica dental",
    result: "+62% más solicitudes en solo 90 días",
    before: "Web lenta y sin captación",
    after: "Landing optimizada con formulario y WhatsApp",
    image: "/assets/portfolio-dental.svg",
    imageAlt: "Vista previa de proyecto web para clínica dental",
  },
  {
    name: "Tienda online del sector decoración",
    result: "+41% más ventas en 3 meses",
    before: "Catálogo poco claro",
    after: "Ecommerce con UX de compra simplificada",
    image: "/assets/portfolio-decoracion.svg",
    imageAlt: "Vista previa de ecommerce de decoración",
  },
  {
    name: "Cómo conseguimos 3x más clientes para un negocio local",
    result: "3x más leads cualificados",
    before: "Sin estrategia digital",
    after: "Campañas + página orientada a conversión",
    image: "/assets/portfolio-local.svg",
    imageAlt: "Vista previa de landing para negocio local",
  },
];

const testimonials = [
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
      "En menos de dos meses duplicamos las solicitudes de presupuesto desde la web.",
    author: "Laura G. - Reformas y hogar en Málaga",
    avatar: "https://i.pravatar.cc/100?img=44",
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
    author: "José R. - Empresa local en Mijas",
    avatar: "https://i.pravatar.cc/100?img=68",
  },
  {
    quote:
      "Notamos un cambio enorme en la calidad de los leads. Ahora llegan clientes realmente interesados.",
    author: "Claudia T. - Inmobiliaria en Málaga",
    avatar: "https://i.pravatar.cc/100?img=47",
  },
  {
    quote:
      "Nuestra web por fin refleja el nivel de nuestra marca y nos está ayudando a cerrar más ventas.",
    author: "Iván C. - Tienda premium en Granada",
    avatar: "https://i.pravatar.cc/100?img=14",
  },
  {
    quote:
      "Pasamos de depender solo de recomendaciones a tener entradas constantes desde internet.",
    author: "Patricia L. - Clínica privada en Sevilla",
    avatar: "https://i.pravatar.cc/100?img=25",
  },
  {
    quote:
      "Nos gustó mucho la claridad del proceso y la rapidez de ejecución. Muy recomendables.",
    author: "Raúl N. - Servicios técnicos en Córdoba",
    avatar: "https://i.pravatar.cc/100?img=57",
  },
];

const processSteps = [
  { title: "Contacto", benefit: "Entendemos tu negocio" },
  { title: "Análisis", benefit: "Detectamos oportunidades de venta" },
  { title: "Diseño", benefit: "Creamos una web pensada para convertir" },
  { title: "Desarrollo", benefit: "La hacemos rápida y optimizada" },
  { title: "Lanzamiento", benefit: "Empiezas a recibir clientes" },
];

const audienceItems = [
  "Negocios locales que necesitan más clientes YA",
  "Empresas con una web que no está vendiendo",
  "Emprendedores que quieren empezar bien",
];

function fadeIn(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.55, delay },
  };
}

function App() {
  return (
    <>
      <header className="topbar">
        <a className="brand" href="#inicio">
          <img src="/assets/logo-nav-limpio.png" alt="Logo Rotulweb" />
        </a>
        <nav>
          <a href="#servicios">Servicios</a>
          <a href="#portfolio">Proyectos</a>
          <a href="#contacto">Contacto</a>
          <a href="#contacto" className="nav-cta">
            Presupuesto
          </a>
        </nav>
      </header>

      <main>
        <section className="hero" id="inicio">
          <div className="hero-bg-shape hero-bg-shape-1" />
          <div className="hero-bg-shape hero-bg-shape-2" />
          <motion.div className="hero-copy" {...fadeIn(0.05)}>
            <p className="eyebrow">Diseño, desarrollo y marketing digital</p>
            <h1>Convertimos visitas en clientes con webs diseñadas para vender</h1>
            <p className="subtitle">
              Para negocios locales y empresas que quieren dejar de perder
              clientes online.
            </p>
            <p className="subtitle subtitle-strong">
              Sin depender de recomendaciones ni perder oportunidades online.
            </p>
            <div className="hero-cta">
              <a className="btn btn-primary" href="#contacto">
                Quiero más clientes
              </a>
              <a className="btn btn-secondary" href="#contacto">
                Auditar mi web gratis
              </a>
            </div>
            <div className="hero-proof">
              <span>⭐ +50 proyectos realizados</span>
              <span>⭐ Clientes en toda España</span>
              <span>⚠️ Plazas limitadas cada mes</span>
            </div>
          </motion.div>

          <motion.div className="hero-visual" {...fadeIn(0.15)}>
            <div className="hero-logo-card">
              <div className="hero-logo-bg">
                <img src="/assets/logo-transparente.png" alt="Branding Rotulweb" />
              </div>
            </div>
          </motion.div>
        </section>

        <motion.section className="section" id="servicios" {...fadeIn()}>
          <h2>Servicios</h2>
          <p className="section-intro">
            Soluciones integradas para que tu marca avance con una sola
            estrategia.
          </p>
          <div className="grid services-grid">
            {services.map((service, index) => (
              <motion.article
                key={service.title}
                className="card service-card"
                {...fadeIn(index * 0.08)}
              >
                <span className="service-icon">{service.icon}</span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <a href="#contacto" className="text-link">
                  {service.cta}
                </a>
              </motion.article>
            ))}
          </div>
        </motion.section>

        <motion.section className="section reasons" {...fadeIn()}>
          <h2>Por qué elegir Rotulweb</h2>
          <div className="grid reasons-grid">
            <article className="card">
              <h3>Más de 10 años ayudando a negocios a conseguir clientes reales</h3>
              <p>Conocimiento real en proyectos de negocio y captación digital.</p>
            </article>
            <article className="card">
              <h3>Sabrás exactamente cuántos clientes te genera tu web</h3>
              <p>Trabajamos con objetivos concretos: leads, ventas y crecimiento.</p>
            </article>
            <article className="card">
              <h3>Enfoque en ventas</h3>
              <p>Todo lo que diseñamos tiene una función comercial clara.</p>
            </article>
            <article className="card">
              <h3>Trato personalizado</h3>
              <p>Estrategia adaptada a tu negocio, sin plantillas genéricas.</p>
            </article>
          </div>
          <div className="trust-bullets">
            <span>✔ Sin humo</span>
            <span>✔ Sin plantillas</span>
            <span>✔ Sin estrategias genéricas</span>
          </div>
        </motion.section>

        <motion.section className="section audience" {...fadeIn()}>
          <h2>¿Para quién es esto?</h2>
          <div className="grid audience-grid">
            {audienceItems.map((item) => (
              <article className="card audience-card" key={item}>
                <p>{item}</p>
              </article>
            ))}
          </div>
        </motion.section>

        <motion.section className="section" id="portfolio" {...fadeIn()}>
          <h2>Portfolio y trabajos</h2>
          <p className="section-intro">
            Casos con enfoque en conversión para demostrar impacto real.
          </p>
          <p className="section-intro section-intro-strong">
            No hacemos webs bonitas. Hacemos webs que generan resultados.
          </p>
          <div className="grid portfolio-grid">
            {portfolioItems.map((item) => (
              <article className="card portfolio-card" key={item.name}>
                <div className="portfolio-mockup">
                  <img src={item.image} alt={item.imageAlt} />
                </div>
                <h3>{item.name}</h3>
                <p className="result">{item.result}</p>
                <p>
                  <strong>Antes:</strong> {item.before}
                </p>
                <p>
                  <strong>Después:</strong> {item.after}
                </p>
                <div className="portfolio-actions">
                  <a href="#contacto" className="btn btn-secondary">
                    Ver estrategia completa
                  </a>
                  <a href="#contacto" className="text-link">
                    Ver cómo conseguimos estos resultados
                  </a>
                </div>
              </article>
            ))}
          </div>
        </motion.section>

        <motion.section className="section" {...fadeIn()}>
          <h2>Testimonios</h2>
          <p className="section-intro">
            Más de 50 negocios ya están consiguiendo clientes con nosotros.
          </p>
          <div className="grid testimonials-grid">
            {testimonials.map((item) => (
              <article className="card testimonial-card" key={item.author}>
                <div className="testimonial-head">
                  <img src={item.avatar} alt={item.author} />
                  <div>
                    <p className="author">{item.author}</p>
                    <p className="stars">⭐⭐⭐⭐⭐</p>
                  </div>
                </div>
                <p className="quote">"{item.quote}"</p>
              </article>
            ))}
          </div>
        </motion.section>

        <motion.section className="section process" {...fadeIn()}>
          <h2>Proceso de trabajo</h2>
          <p className="section-intro">
            Te acompañamos en todo el proceso para que no tengas que preocuparte
            de nada.
          </p>
          <div className="process-line">
            {processSteps.map((step, index) => (
              <div key={step.title} className="step">
                <span>{index + 1}</span>
                <p className="step-title">{step.title}</p>
                <p className="step-benefit">{step.benefit}</p>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section className="section pricing" {...fadeIn()}>
          <h2>Precios orientativos</h2>
          <p className="urgency-note">Solo aceptamos 5 proyectos nuevos al mes.</p>
          <div className="grid pricing-grid">
            <article className="card">
              <h3>Webs desde 500 EUR</h3>
              <p>
                Solución base para empezar a captar clientes con una web profesional.
              </p>
              <p>
                Ideal si quieres empezar a generar clientes sin una gran inversión.
              </p>
            </article>
            <article className="card">
              <h3>Proyectos a medida</h3>
              <p>
                Presupuesto personalizado según objetivos, sector y nivel de crecimiento.
              </p>
              <p>Para negocios que quieren escalar y dominar su sector.</p>
            </article>
          </div>
        </motion.section>

        <motion.section className="section cta-strong" id="contacto" {...fadeIn()}>
          <h2>Empieza a conseguir clientes hoy</h2>
          <p className="reply-time">Respuesta en menos de 24h</p>
          <p>
            Cuéntame tu objetivo y te propongo una estrategia clara para atraer
            más clientes.
          </p>
          <form className="contact-form">
            <label htmlFor="name">Nombre</label>
            <input id="name" name="name" type="text" placeholder="Tu nombre" />
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" placeholder="tu@email.com" />
            <label htmlFor="message">¿Qué necesitas?</label>
            <textarea
              id="message"
              name="message"
              rows="4"
              placeholder="¿Qué tipo de clientes quieres conseguir y qué estás haciendo ahora?"
            />
            <p className="form-commitment">
              🔒 Sin compromiso · Te respondemos en menos de 24h
            </p>
            <button type="submit" className="btn btn-primary">
              Quiero más clientes
            </button>
            <p className="form-note">
              Te diremos exactamente qué mejorar para conseguir más clientes.
            </p>
            <p className="form-authority">
              Solo trabajamos con proyectos que realmente podemos hacer crecer.
            </p>
          </form>
        </motion.section>

        <motion.section className="section final-close" {...fadeIn()}>
          <h2>Empieza a conseguir clientes de forma predecible</h2>
          <p>
            Si tu web no está generando clientes, no es un problema de tráfico.
            Es un problema de estrategia.
          </p>
          <a className="btn btn-primary" href="#contacto">
            Quiero más clientes
          </a>
        </motion.section>
      </main>

      <footer className="footer">
        <div className="footer-brand">
          <img src="/assets/logo-transparente.png" alt="Logo Rotulweb sin fondo" />
        </div>
        <div className="footer-links">
          <a href="mailto:info@rotulweb.com">info@rotulweb.com</a>
          <a href="tel:+34600000000">+34 600 00 00 00</a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            Instagram
          </a>
        </div>
      </footer>

      <a
        className="whatsapp-float"
        href="https://wa.me/34600000000?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20una%20web%20para%20mi%20negocio"
        target="_blank"
        rel="noreferrer"
        aria-label="Contactar por WhatsApp"
        data-tooltip="Habla con nosotros ahora"
      >
        WhatsApp
      </a>

      <a className="sticky-quote-cta" href="#contacto">
        Solicitar presupuesto
      </a>

      <ChatBot />
    </>
  );
}

export default App;
