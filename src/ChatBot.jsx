import { useEffect, useRef, useState } from "react";
import { LEAD_CAPTURE_CONFIG } from "./leadCaptureConfig";

const WEBHOOK_URL = import.meta.env.VITE_LEAD_WEBHOOK_URL || "/api/lead.php";

const initialLead = {
  service: "",
  businessType: "",
  hasWebsite: "",
  goal: "",
  name: "",
  email: "",
  phone: "",
};

function getLeadScore(lead) {
  let score = 5;
  if (lead.hasWebsite === "No") score += 3;
  if (lead.businessType) score += 1;
  if (lead.email) score += 1;
  if (lead.phone) score += 1;
  return Math.min(score, 10);
}

async function saveLead(lead) {
  const payload = {
    ...lead,
    brand: LEAD_CAPTURE_CONFIG.brand,
    source: "rotulweb-chatbot",
    createdAt: new Date().toISOString(),
    score: getLeadScore(lead),
  };

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (response.ok) return { ok: true, delivered: true };
  } catch {
    // Use local fallback below if the server cannot be reached.
  }

  try {
    const existing = JSON.parse(localStorage.getItem("rotulweb_leads") || "[]");
    localStorage.setItem("rotulweb_leads", JSON.stringify([payload, ...existing].slice(0, 100)));
  } catch {
    // localStorage may be unavailable in restricted browser contexts.
  }
  return { ok: false, delivered: false };
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [stage, setStage] = useState("welcome");
  const [lead, setLead] = useState(initialLead);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const bottomRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowNotif(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([
        { from: "bot", text: `👋 ¡Hola! Soy el asistente de ${LEAD_CAPTURE_CONFIG.brand}. Puedo orientarte sobre una web para tu negocio.` },
        { from: "bot", text: "¿Qué necesitas?" },
      ]);
    }
  }, [open, messages.length]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function addBot(text) { setMessages((prev) => [...prev, { from: "bot", text }]); }
  function addUser(text) { setMessages((prev) => [...prev, { from: "user", text }]); }

  function choose(field, value, next, reply) {
    addUser(value);
    setLead((prev) => ({ ...prev, [field]: value }));
    setStage(next);
    setTimeout(() => addBot(reply), 300);
  }

  async function submitField(field, next, reply) {
    const value = input.trim();
    if (!value) return;
    addUser(value);
    const updated = { ...lead, [field]: value };
    setLead(updated);
    setInput("");
    setStage(next);

    if (next === "done") {
      const result = await saveLead(updated);
      addBot(
        `¡Gracias, ${updated.name}! Ya tengo la información. ${
          result.delivered
            ? "Hemos recibido tus datos y te contactaremos para preparar una propuesta. 🚀"
            : "Hemos guardado tus datos temporalmente; te contactaremos en cuanto se procese la solicitud. 🚀"
        }`
      );
      return;
    }
    setTimeout(() => addBot(reply), 300);
  }

  const options = {
    welcome: [
      ["Quiero una web nueva", "service", "web"],
      ["Mejorar mi web actual", "service", "web"],
      ["Saber cuánto cuesta", "service", "price"],
    ],
    web: [
      ...LEAD_CAPTURE_CONFIG.idealClients.slice(0, 8).map((type) => [type, "businessType", "website"]),
      ["Otro negocio", "businessType", "website"],
    ],
    price: [
      ["Quiero presupuesto", "service", "web"],
      ["Solo quiero información", "service", "web"],
    ],
    website: [["Sí", "hasWebsite", "goal"], ["No", "hasWebsite", "goal"]],
    goal: [
      ["Conseguir más clientes", "goal", "name"],
      ["Dar una imagen profesional", "goal", "name"],
      ["Reservas / citas / contactos", "goal", "name"],
      ["Automatizar procesos con IA", "goal", "name"],
    ],
  };

  const replies = {
    web: "Perfecto. ¿Qué tipo de negocio tienes?",
    price: `Trabajamos con proyectos desde ${LEAD_CAPTURE_CONFIG.startingPrice}€ y hasta ${LEAD_CAPTURE_CONFIG.maxPrice}€, según lo que necesite el negocio. ¿Quieres que valoremos tu caso?`,
    website: "¿Tienes actualmente una página web?",
    goal: "¿Qué te gustaría conseguir principalmente con la nueva web?",
    name: "Genial. ¿Cómo te llamas?",
  };

  function handleChoice(label, field, next) {
    if (next === "web") return choose(field, label, next, replies.web);
    if (next === "price") return choose(field, label, "web", replies.price);
    if (next === "website") return choose(field, label, next, replies.website);
    if (next === "goal") return choose(field, label, next, replies.goal);
    if (next === "name") return choose(field, label, next, replies.name);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (stage === "name") return submitField("name", "email", "¿Cuál es tu email?");
    if (stage === "email") return submitField("email", "phone", "¿Cuál es el mejor teléfono para contactarte?");
    if (stage === "phone") return submitField("phone", "done", "");
  }

  const buttons = options[stage] || [];
  const inputPlaceholder = stage === "name" ? "Tu nombre..." : stage === "email" ? "tu@email.com" : "Tu teléfono...";
  const needsInput = ["name", "email", "phone"].includes(stage);

  return (
    <>
      <button className="chatbot-toggle" onClick={() => { setOpen((current) => !current); setShowNotif(false); }} aria-label="Abrir chat de atención">
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"/></svg>
        )}
        {showNotif && !open && <span className="chatbot-notif">1</span>}
      </button>

      {showNotif && !open && (
        <div className="chatbot-bubble" onClick={() => { setOpen(true); setShowNotif(false); }}>
          👋 ¿Quieres una web para conseguir más clientes?
        </div>
      )}

      {open && (
        <div className="chatbot-window" role="dialog" aria-label="Asistente de Rótul Web">
          <div className="chatbot-header">
            <div className="chatbot-avatar">R</div>
            <div><p className="chatbot-name">Asistente Rótul Web</p><p className="chatbot-status">🟢 Disponible</p></div>
            <button className="chatbot-close" onClick={() => setOpen(false)} aria-label="Cerrar chat">✕</button>
          </div>
          <div className="chatbot-messages">
            {messages.map((message, index) => <div key={index} className={`chatbot-msg chatbot-msg--${message.from}`}>{message.text}</div>)}
            {buttons.length > 0 && <div className="chatbot-options">{buttons.map(([label, field, next]) => <button key={label} className="chatbot-option" onClick={() => handleChoice(label, field, next)}>{label}</button>)}</div>}
            {needsInput && (
              <form className="chatbot-input-row" onSubmit={handleSubmit}>
                <input type={stage === "email" ? "email" : stage === "phone" ? "tel" : "text"} value={input} onChange={(event) => setInput(event.target.value)} placeholder={inputPlaceholder} required autoFocus />
                <button type="submit">→</button>
              </form>
            )}
            <div ref={bottomRef} />
          </div>
        </div>
      )}
    </>
  );
}
