import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `Eres un agente de atención al cliente profesional para Rotulweb, una agencia que desarrolla webs y auditorías de conversión.

Tu rol es:
1. Responder consultas de forma profesional y directa
2. Identificar el tipo de consulta (presupuesto, contacto, soporte, etc)
3. Proporcionar guía clara y pasos siguientes específicos
4. Mantener tono profesional pero cercano
5. Incluir CTA (llamada a la acción) clara

Respuestas deben ser:
- Máximo 300 caracteres
- En español
- Directas y accionables
- Sin florituras innecesarias`;

export async function generateSmartReply(email) {
  try {
    // Timeout de 5 segundos
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('AI timeout')), 5000)
    );

    const aiPromise = client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 300,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: `Remitente: ${email.from}
Asunto: ${email.subject}
Mensaje: ${email.text?.substring(0, 500) || 'Sin contenido'}

Genera una respuesta automática profesional que ayude al cliente.`,
        },
      ],
    });

    const response = await Promise.race([aiPromise, timeoutPromise]);

    if (response.content[0].type === 'text') {
      return {
        success: true,
        response: response.content[0].text,
      };
    }

    return {
      success: false,
      error: 'Invalid response format',
    };
  } catch (error) {
    console.error('❌ Error en IA:', error.message);
    return {
      success: false,
      error: error.message,
    };
  }
}

export async function categorizeMail(email) {
  try {
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('AI timeout')), 3000)
    );

    const aiPromise = client.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 50,
      system: 'Categoriza el email en una de estas categorías: presupuesto, contacto, soporte, otro. Responde solo la categoría.',
      messages: [
        {
          role: 'user',
          content: `Asunto: ${email.subject}\nMensaje: ${email.text?.substring(0, 200) || ''}`,
        },
      ],
    });

    const response = await Promise.race([aiPromise, timeoutPromise]);
    const category = response.content[0].text.toLowerCase().trim();

    const validCategories = ['presupuesto', 'contacto', 'soporte', 'otro'];
    return validCategories.includes(category) ? category : 'otro';
  } catch (error) {
    console.error('Error categorizando:', error.message);
    return 'otro';
  }
}
