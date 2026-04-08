import { useState, useEffect, useRef } from "react";

const BOT_STEPS = [
  {
    id: "welcome",
    message:
      "He analizado muchas webs como la tuya. La mayoría pierde clientes sin saberlo. ¿Quieres que te diga si te está pasando?",
    options: [
      { label: "Si, revisala", next: "mejora" },
      { label: "Quiero una web nueva", next: "web" },
      { label: "Quiero mas clientes con publicidad", next: "ads" },
      { label: "Quiero saber precio", next: "precio" },
    ],
  },
  {
    id: "web",
    message:
      "Perfecto. Una web nueva bien enfocada puede cambiar tus resultados rapido. Tienes ya negocio en marcha?",
    options: [
      { label: "Si, negocio en marcha", next: "nombre" },
      { label: "Estoy empezando", next: "nombre" },
    ],
  },
  {
    id: "mejora",
    message:
      "Entendido. Muchas webs no convierten por estructura, copy o propuesta. Cual es el mayor problema ahora?",
    options: [
      { label: "No recibo contactos", next: "nombre" },
      { label: "La web se ve antigua", next: "nombre" },
      { label: "La web va lenta", next: "nombre" },
    ],
  },
  {
    id: "ads",
    message:
      "La publicidad bien montada multiplica resultados. Tienes web actualmente?",
    options: [
      { label: "Si, tengo web", next: "nombre" },
      { label: "No tengo web", next: "nombre" },
    ],
  },
  {
    id: "precio",
    message:
      "Trabajamos desde 500 EUR en adelante, segun objetivos y alcance. Quieres un presupuesto personalizado?",
    options: [
      { label: "Si, quiero presupuesto", next: "nombre" },
      { label: "Primero quiero una auditoria", next: "mejora" },
    ],
  },
  {
    id: "nombre",
    message:
      "Genial. Como te llamas para atenderte de forma personalizada?",
    input: true,
    inputPlaceholder: "Tu nombre...",
    next: "final",
  },
  {
    id: "final",
    message: (name) =>
      `Perfecto, ${name}. Te ayudo personalmente con mejoras concretas para tu negocio. Si prefieres, abrimos WhatsApp ahora.`,
    options: [
      {
        label: "Abrir WhatsApp",
        action: () =>
          window.open(
            "https://wa.me/34600000000?text=Hola%2C%20quiero%20informacion%20sobre%20una%20web%20para%20mi%20negocio",
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

  useEffect(() => {
    const t = setTimeout(() => setShowNotif(true), 5000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (open && messages.length === 0) {
      const step = getStep("welcome");
      setMessages([{ from: "bot", text: step.message, step: "welcome" }]);
    }
  }, [open, messages.length]);

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
    }, 450);
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

      if (window.$crisp) {
        window.$crisp.push(["set", "user:nickname", [name]]);
      }
    }, 450);
  }

  const step = getStep(currentStep);

  return (
    <>
      <button
        className="chatbot-toggle"
        onClick={() => {
          setOpen((o) => !o);
          setShowNotif(false);
        }}
        aria-label="Abrir chat de atencion"
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 2H4a2 2 0 00-2 2v18l4-4h14a2 2 0 002-2V4a2 2 0 00-2-2z" />
          </svg>
        )}
        {showNotif && !open && <span className="chatbot-notif">1</span>}
      </button>

      {showNotif && !open && (
        <div
          className="chatbot-bubble"
          onClick={() => {
            setOpen(true);
            setShowNotif(false);
          }}
        >
          Creo que tu web esta perdiendo clientes. Quieres saber por que?
        </div>
      )}

      {open && (
        <div className="chatbot-window" role="dialog" aria-label="Chat de atencion al cliente">
          <div className="chatbot-header">
            <div className="chatbot-avatar">R</div>
            <div>
              <p className="chatbot-name">Asesor Rotulweb</p>
              <p className="chatbot-status">En linea ahora</p>
            </div>
            <button className="chatbot-close" onClick={() => setOpen(false)} aria-label="Cerrar chat">
              x
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chatbot-msg chatbot-msg--${msg.from}`}>
                {msg.text}
              </div>
            ))}

            {step && step.options && currentStep === messages[messages.length - 1]?.step && (
              <div className="chatbot-options">
                {step.options.map((opt) => (
                  <button key={opt.label} className="chatbot-option" onClick={() => handleOption(opt)}>
                    {opt.label}
                  </button>
                ))}
              </div>
            )}

            {step?.input && currentStep === messages[messages.length - 1]?.step && (
              <form className="chatbot-input-row" onSubmit={handleInput}>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={step.inputPlaceholder}
                  autoFocus
                />
                <button type="submit">-&gt;</button>
              </form>
            )}

            <div ref={bottomRef} />
          </div>
        </div>
      )}
    </>
  );
}

