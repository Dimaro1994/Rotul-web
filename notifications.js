import dotenv from 'dotenv';
import { createEmailTransporter } from './services/emailService.js';

dotenv.config();

// Configuración SMTP
const transporter = createEmailTransporter();

// Notificación cuando se crea un nuevo cliente
export async function notifyNewClient(client) {
  try {
    const emailContent = `
Hola ${client.contactName},

¡Gracias por contactarnos! Hemos recibido tu solicitud para un nuevo proyecto.

📋 RESUMEN DE TU PROYECTO
─────────────────────────
Empresa: ${client.companyName}
Tipo: ${client.projectType}
Presupuesto: €${client.budget || 'Por confirmar'}
Plazo: ${client.deadline ? new Date(client.deadline).toLocaleDateString('es-ES') : 'Por confirmar'}

🎯 PRÓXIMOS PASOS
─────────────────────────
1. Revisaremos tu solicitud en detalle
2. Nos pondremos en contacto dentro de 24 horas
3. Confirmaremos los detalles del proyecto
4. Iniciaremos el trabajo según el plazo acordado

📞 CONTACTO RÁPIDO
─────────────────────────
Email: info@rotulweb
Teléfono: +34 633 833 407
WhatsApp: https://wa.me/34633833407

Si tienes alguna pregunta, no dudes en escribirnos.

¡Gracias por confiar en nosotros!

Saludos,
Equipo Rotulweb
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: client.email,
      subject: `✅ Hemos recibido tu solicitud - ${client.companyName}`,
      html: emailContent.replace(/\n/g, '<br>'),
    });

    console.log(`✉️ Correo de confirmación enviado a ${client.email}`);
  } catch (error) {
    console.error('❌ Error enviando correo de confirmación:', error.message);
  }
}

// Notificación cuando cambia el estado del proyecto
export async function notifyStatusChange(client, newStatus) {
  try {
    const statusMessages = {
      'in-progress': '🚀 Tu proyecto ha comenzado',
      review: '👀 Tu proyecto está en revisión',
      completed: '✅ ¡Tu proyecto está completado!',
    };

    const statusEmoji = {
      'in-progress': '🚀',
      review: '👀',
      completed: '✅',
    };

    const message = statusMessages[newStatus] || 'Tu proyecto se ha actualizado';

    const emailContent = `
Hola ${client.contactName},

${message}

📊 ESTADO DE TU PROYECTO
─────────────────────────
Proyecto: ${client.projectType}
Estado: ${newStatus}
Progreso Diseño: ${client.designProgress}%
Progreso Desarrollo: ${client.developmentProgress}%

${
  newStatus === 'completed'
    ? `
🎉 ¡TU PROYECTO ESTÁ LISTO!

Tu proyecto ha sido completado exitosamente.
Te enviamos los archivos finales por separado.

Pasos finales:
1. Revisa todos los archivos
2. Realiza pruebas en tu dominio
3. Confirma que todo funciona correctamente
4. Realiza el último pago si falta

Si encuentras algún problema, avísanos y lo solucionamos.
    `
    : `
En las próximas horas recibirás actualizaciones sobre el progreso.
Puedes revisar el estado en tiempo real en tu panel de cliente.
    `
}

📞 PREGUNTAS
─────────────────────────
Si tienes dudas sobre el progreso, escríbenos:
Email: info@rotulweb
WhatsApp: https://wa.me/34633833407

Saludos,
Equipo Rotulweb
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: client.email,
      subject: `${statusEmoji[newStatus]} ${message}`,
      html: emailContent.replace(/\n/g, '<br>'),
    });

    console.log(`✉️ Notificación de estado enviada a ${client.email}`);
  } catch (error) {
    console.error('❌ Error enviando notificación:', error.message);
  }
}

// Notificación de tarea asignada
export async function notifyTaskAssigned(client, task) {
  try {
    const emailContent = `
Hola ${client.contactName},

Se ha asignado una nueva tarea a tu proyecto.

📝 DETALLES DE LA TAREA
─────────────────────────
Título: ${task.title}
Categoría: ${task.category}
Prioridad: ${task.priority}
Fecha límite: ${task.dueDate ? new Date(task.dueDate).toLocaleDateString('es-ES') : 'Por definir'}

${task.description ? `Descripción: ${task.description}` : ''}

📊 PROGRESO
─────────────────────────
Proyecto: ${client.projectType}
Progreso actual: ${(client.designProgress + client.developmentProgress) / 2}%

Si tienes preguntas sobre esta tarea, contáctanos:
Email: info@rotulweb
WhatsApp: https://wa.me/34633833407

Saludos,
Equipo Rotulweb
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: client.email,
      subject: `📝 Nueva tarea asignada: ${task.title}`,
      html: emailContent.replace(/\n/g, '<br>'),
    });

    console.log(`✉️ Notificación de tarea enviada a ${client.email}`);
  } catch (error) {
    console.error('❌ Error enviando notificación de tarea:', error.message);
  }
}

// Recordatorio de plazo cercano
export async function notifyUpcomingDeadline(client) {
  try {
    const daysUntilDeadline = Math.ceil(
      (new Date(client.deadline) - new Date()) / (1000 * 60 * 60 * 24)
    );

    if (daysUntilDeadline > 0 && daysUntilDeadline <= 3) {
      const emailContent = `
Hola ${client.contactName},

⏰ RECORDATORIO: Tu proyecto tiene un plazo cercano

📅 FECHAS IMPORTANTES
─────────────────────────
Plazo de entrega: ${new Date(client.deadline).toLocaleDateString('es-ES')}
Días restantes: ${daysUntilDeadline}

🎯 ESTADO ACTUAL
─────────────────────────
Progreso Diseño: ${client.designProgress}%
Progreso Desarrollo: ${client.developmentProgress}%

Estamos trabajando para entregar tu proyecto a tiempo.
Si necesitas algo, avísanos:

📞 CONTACTO
─────────────────────────
Email: info@rotulweb
WhatsApp: https://wa.me/34633833407

Saludos,
Equipo Rotulweb
      `;

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: client.email,
        subject: `⏰ Recordatorio: Tu proyecto vence en ${daysUntilDeadline} días`,
        html: emailContent.replace(/\n/g, '<br>'),
      });

      console.log(`✉️ Recordatorio de plazo enviado a ${client.email}`);
    }
  } catch (error) {
    console.error('❌ Error enviando recordatorio:', error.message);
  }
}

// Test de envío
export async function testEmail() {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: '✅ Test - Sistema de notificaciones funcionando',
      html: '<p>El sistema de notificaciones está funcionando correctamente.</p>',
    });
    console.log('✅ Email de test enviado correctamente');
    return true;
  } catch (error) {
    console.error('❌ Error en test de email:', error.message);
    return false;
  }
}
