import React, { useState, useEffect, useRef } from 'react';
import './WhatsAppWidget.css';

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const messagesEndRef = useRef(null);

  // Auto-scroll al último mensaje
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!input.trim() || !userPhone.trim()) {
      alert('Por favor completa el número de teléfono y el mensaje');
      return;
    }

    // Agregar mensaje del usuario
    const newMessage = {
      id: Date.now(),
      text: input,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages([...messages, newMessage]);
    setInput('');

    try {
      // Enviar mensaje al backend
      const response = await fetch('http://localhost:5000/api/whatsapp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone_number: userPhone,
          message_text: newMessage.text,
        }),
      });

      const data = await response.json();

      if (data.success) {
        console.log('✅ Mensaje enviado');
        // Agregar confirmación
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            text: 'Mensaje enviado ✓',
            sender: 'system',
            timestamp: new Date().toLocaleTimeString(),
          },
        ]);
      }
    } catch (error) {
      console.error('Error enviando mensaje:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: 'Error al enviar mensaje',
          sender: 'error',
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    }
  };

  return (
    <>
      {/* Botón flotante */}
      <button
        className="whatsapp-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Abrir WhatsApp chat"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.892 1.242c-1.527.738-2.846 1.823-3.916 3.172-1.07 1.35-1.91 2.927-2.458 4.57-.547 1.643-.82 3.379-.82 5.155 0 .713.057 1.42.169 2.115.124.742.304 1.466.538 2.155.12.348.37.757.755 1.125.385.368.868.664 1.425.872.557.208 1.182.31 1.85.31h.003a9.884 9.884 0 004.938-1.258c1.54-.755 2.888-1.855 3.965-3.237 1.077-1.382 1.922-3.006 2.473-4.718.551-1.712.828-3.527.828-5.42 0-.71-.053-1.414-.16-2.1a8.434 8.434 0 00-.523-2.11 7.51 7.51 0 00-.738-1.094 7.27 7.27 0 00-1.436-.876 8.03 8.03 0 00-1.85-.31z" />
        </svg>
      </button>

      {/* Widget de chat */}
      {isOpen && (
        <div className="whatsapp-widget">
          <div className="whatsapp-header">
            <h3>💬 WhatsApp Chat</h3>
            <button onClick={() => setIsOpen(false)} className="close-btn">
              ✕
            </button>
          </div>

          <div className="whatsapp-messages">
            {messages.length === 0 && (
              <div className="welcome-message">
                <p>¡Hola! Ingresa tu número de WhatsApp para comenzar</p>
              </div>
            )}
            {messages.map((msg) => (
              <div key={msg.id} className={`message message-${msg.sender}`}>
                <span className="message-text">{msg.text}</span>
                <span className="message-time">{msg.timestamp}</span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="whatsapp-form">
            <input
              type="tel"
              placeholder="Tu número WhatsApp (ej: +1234567890)"
              value={userPhone}
              onChange={(e) => setUserPhone(e.target.value)}
              className="phone-input"
            />
            <div className="input-group">
              <input
                type="text"
                placeholder="Escribe tu mensaje..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="message-input"
              />
              <button type="submit" className="send-btn">
                Enviar
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
