import express from 'express';
import InstagramLead from '../models/InstagramLead.js';
import instagramLeadAgent from '../instagramLeadAgent.js';

const router = express.Router();

// Obtener todos los leads
router.get('/', async (req, res) => {
  try {
    const { status, limit = 20, sortBy = 'leadScore' } = req.query;
    let query = {};
    if (status) query.status = status;

    const leads = await InstagramLead.find(query)
      .sort({ [sortBy]: -1 })
      .limit(parseInt(limit));

    res.json(leads);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener leads principales (top score)
router.get('/top/leads', async (req, res) => {
  try {
    const leads = await instagramLeadAgent.getTopLeads(10);
    res.json(leads);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Búsqueda por username
router.get('/search/:username', async (req, res) => {
  try {
    const leads = await InstagramLead.find({
      instagramUsername: { $regex: req.params.username, $options: 'i' }
    });
    res.json(leads);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener un lead específico
router.get('/:id', async (req, res) => {
  try {
    const lead = await InstagramLead.findById(req.params.id);
    if (!lead) return res.status(404).json({ error: 'Lead no encontrado' });
    res.json(lead);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener estadísticas
router.get('/stats/summary', async (req, res) => {
  try {
    const stats = await instagramLeadAgent.getLeadStats();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener recordatorios próximos
router.get('/reminders/upcoming', async (req, res) => {
  try {
    const { days = 7 } = req.query;
    const reminders = await instagramLeadAgent.getUpcomingReminders(parseInt(days));
    res.json(reminders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener reporte diario
router.get('/report/daily', async (req, res) => {
  try {
    const report = await instagramLeadAgent.getDailyReport();
    res.json(report);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Agregar nuevo lead
router.post('/', async (req, res) => {
  try {
    const lead = await instagramLeadAgent.addNewLead(req.body);
    res.status(201).json(lead);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Marcar lead como contactado
router.post('/:id/contacted', async (req, res) => {
  try {
    const lead = await instagramLeadAgent.markAsContacted(req.params.id, req.body);
    res.json(lead);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Registrar respuesta del lead
router.post('/:id/response', async (req, res) => {
  try {
    const lead = await instagramLeadAgent.logResponse(req.params.id, req.body);
    res.json(lead);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Establecer recordatorio
router.post('/:id/reminder', async (req, res) => {
  try {
    const { reminderDate, message } = req.body;
    const lead = await instagramLeadAgent.setReminder(req.params.id, reminderDate, message);
    res.json(lead);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Convertir lead en cliente
router.post('/:id/convert', async (req, res) => {
  try {
    const result = await instagramLeadAgent.convertToClient(req.params.id, req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar lead
router.put('/:id', async (req, res) => {
  try {
    const lead = await InstagramLead.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(lead);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Cambiar estado
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const lead = await InstagramLead.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: new Date() },
      { new: true }
    );
    res.json(lead);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar lead
router.delete('/:id', async (req, res) => {
  try {
    await InstagramLead.findByIdAndDelete(req.params.id);
    res.json({ message: 'Lead eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
