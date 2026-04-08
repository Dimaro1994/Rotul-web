import { useState, useEffect, useRef } from "react";

const BOT_STEPS = [
  {
    id: "welcome",
    message: "👋 ¡Hola! Soy el asistente de Rotulweb. ¿En qué puedo ayudarte hoy?",
    options: [
      { label: "Quiero una web nueva", next: "web" },
      { label: "Mejorar mi web actual", next: "mejora" },
      { label: "Publicidad y más clientes", next: "ads" },
      { label: "Saber el precio", next: "precio" },
    ],
  },
  {
    id: "web",
    message: "Perfecto, una web nueva puede cambiar todo. ¿Tienes ya negocio en marcha o estás empezando?",
    options: [
      { label: "Negocio en marcha", next: "nombre" },
      { label: "Estoy empezando", next: "nombre" },
    ],
  },
  {
    id: "mejora",
    message: "Entendido. Muchas webs pierden clientes sin saberlo. ¿Cuál es el mayor problema ahora mismo?",
    options: [
      { label: "No recibo contactos", next: "nombre" },
      { label: "Se ve anticuada", next: "nombre" },
      { label: "Va muy lenta", next: "nombre" },
    ],
  },
  {
    id: "ads",
    message: "La publicidad bien hecha multiplica los resultados. ¿Tienes web actualmente?",
    options: [
      { label: "Sí, tengo web", next: "nombre" },
      { label: "No tengo web", next: "nombre" },
    ],
  },
  {
    id: "precio",
    message: "Nuestras webs empiezan desde 500€. El precio final depende de tu proyecto. ¿Quieres que un asesor te prepare un presupuesto personalizado?",
    options: [
      { label: "Sí, quiero presupuesto", next: "nombre" },
      { label: "Primero tengo dudas", next: "welcome" },
    ],
  },
  {
    id: "nombre",
    message: "Genial. ¿Cómo te llamas para que tu asesor pueda atenderte de forma personalizada?",
    input: true,
    inputPlaceholder: "Tu nombre...",
    next: "final",
  },
  {
    id: "final",
    message: (name) =>
      `¡Perfecto, ${name}! Un asesor de Rotulweb te atenderá ahora mismo por el chat. Si prefieres, también puedes escribirnos por WhatsApp. 🚀`,
    options: [
      {
        label: "💬 Abrir WhatsApp",
        action: () =>
          window.open(
            "https://wa.me/34600000000?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20una%20web%20para%20mi%20negocio",
            "_blank"
          ),
      },
      { label: "Seguir por el chat", action: () => {} },
    ],
  },
];

function getStep(id) {
  return BOT_STEPS.find((s) => s.id === id);
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [currentStep, setCurrentStep] = useState("welcome");
  const [inputValue, setInputValue] = useState("");
  const [userName, setUserName] = useState("");
  const [showNotif, setShowNotif] = useState(false);
  const bottomRef = useRef(null);

  // Notificación de bienvenida tras 5 segundos
  useEffect(() => {
    const t = setTimeout(() => setShowNotif(true), 5000);
    return () => clearTimeout(t);
  }, []);

  // Inicializar con mensaje de bienvenida al abrir
  useEffect(() => {
    if (open && messages.length === 0) {
      const step = getStep("welcome");
      setMessages([{ from: "bot", text: step.message, step: "welcome" }]);
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleOption(option) {
    setMessages((prev) => [...prev, { from: "user", text: option.label }]);

    if (option.action) {
      option.action();
      return;
    }

    const nextStep = getStep(option.next);
    if (!nextStep) return;

    setTimeout(() => {
      const msg =
        typeof nextStep.message === "function"
          ? nextStep.message(userName)
          : nextStep.message;
      setMessages((prev) => [...prev, { from: "bot", text: msg, step: nextStep.id }]);
      setCurrentStep(nextStep.id);
    }, 500);
  }

  function handleInput(e) {
    e.preventDefault();
    if (!inputValue.trim()) return;
    const name = inputValue.trim();
    setUserName(name);
    setMessages((prev) => [...prev, { from: "user", text: name }]);
    setInputValue("");

    const nextStep = getStep("final");
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: nextStep.message(name), step: "final" },
      ]);
      setCurrentStep("final");

      // Pasar nombre a Crisp si está disponible
      if (window.$crisp) {
        window.$crisp.push(["set", "user:nickname", [name]]);
      }
    }, 500);
  }

  const step = getStep(currentStep);

  return (
    <>
      {/* Botón flotante */}
      <button
        className="chatbot-toggle"
        onClick={() => { setOpen((o) => !o); setShowNotif(false); }}
        aria-label="Abrir chat de atención"
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4a2 2 0 00-2 2v18l4-4h14a2 2 0 002-2V4a2 2 0 00-2-2z"/></svg>
        )}
        {showNotif && !open && <span className="chatbot-notif">1</span>}
      </button>

      {/* Burbuja de notificación */}
      {showNotif && !open && (
        <div className="chatbot-bubble" onClick={() => { setOpen(true); setShowNotif(false); }}>
          👋 ¿Necesitas más clientes? ¡Hablemos!
        </div>
      )}

      {/* Ventana del chat */}
      {open && (
        <div className="chatbot-window" role="dialog" aria-label="Chat de atención al cliente">
          <div className="chatbot-header">
            <div className="chatbot-avatar">R</div>
            <div>
              <p className="chatbot-name">Asesor Rotulweb</p>
              <p className="chatbot-status">🟢 En línea ahora</p>
            </div>
            <button className="chatbot-close" onClick={() => setOpen(false)} aria-label="Cerrar chat">✕</button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chatbot-msg chatbot-msg--${msg.from}`}>
                {msg.text}
              </div>
            ))}

            {/* Opciones del paso actual */}
            {step && step.options && currentStep === messages[messages.length - 1]?.step && (
              <div className="chatbot-options">
                {step.options.map((opt) => (
                  <button key={opt.label} className="chatbot-option" onClick={() => handleOption(opt)}>
                    {opt.label}
                  </button>
                ))}
              </div>
            )}

            {/* Input de nombre */}
            {step?.input && currentStep === messages[messages.length - 1]?.step && (
              <form className="chatbot-input-row" onSubmit={handleInput}>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={step.inputPlaceholder}
                  autoFocus
                />
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
