const categoryKeywords = {
  presupuesto: [
    'presupuesto',
    'precio',
    'costo',
    'cotización',
    'cuánto cuesta',
    'valor',
    'inversión',
    'plan',
    'paquete',
  ],
  contacto: [
    'información',
    'más info',
    'contacto',
    'interesado',
    'consulta',
    'hola',
    'quiero',
    'necesito',
    'ayuda',
  ],
  soporte: [
    'problema',
    'error',
    'bug',
    'no funciona',
    'fallo',
    'técnico',
    'soporte',
    'ayuda urgente',
    'crasheo',
  ],
};

export function detectCategory(subject = '', text = '') {
  const combined = `${subject} ${text}`.toLowerCase();

  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    for (const keyword of keywords) {
      if (combined.includes(keyword)) {
        return category;
      }
    }
  }

  return 'otro';
}

export const categoryResponses = {
  presupuesto: `Gracias por tu interés. Te enviaremos una cotización detallada según tus necesidades. ¿Cuál es el alcance principal de tu proyecto? Responde y nos pondremos en contacto en menos de 24h.`,
  contacto: `¡Hola! Hemos recibido tu mensaje. Nos pondremos en contacto pronto. Mientras tanto, puedes escribirnos por WhatsApp: +34 633 833 407`,
  soporte: `Gracias por reportar. Nuestro equipo técnico revisará esto inmediatamente. Te contactaremos en la próxima hora con una solución.`,
  otro: `Hemos recibido tu correo. Te responderemos lo antes posible.`,
};
