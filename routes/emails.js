import express from 'express';
import Email from '../models/Email.js';

const router = express.Router();

// Obtener todos los emails
router.get('/', async (req, res) => {
  try {
    const { archived = false, read, category } = req.query;

    const filter = { archived };
    if (read !== undefined) filter.read = read === 'true';
    if (category) filter.category = category;

    const emails = await Email.find(filter)
      .sort({ timestamp: -1 })
      .limit(50);

    res.json(emails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener estadísticas
router.get('/stats/summary', async (req, res) => {
  try {
    const total = await Email.countDocuments({ archived: false });
    const processed = await Email.countDocuments({
      archived: false,
      processed: true,
    });
    const responded = await Email.countDocuments({
      archived: false,
      responseStatus: 'sent',
    });
    const failed = await Email.countDocuments({
      archived: false,
      responseStatus: 'failed',
    });
    const byCategory = await Email.aggregate([
      { $match: { archived: false } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
    ]);

    res.json({
      total,
      processed,
      responded,
      failed,
      pending: total - processed,
      byCategory: Object.fromEntries(
        byCategory.map((c) => [c._id, c.count])
      ),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener email específico
router.get('/:id', async (req, res) => {
  try {
    const email = await Email.findById(req.params.id);
    if (!email) return res.status(404).json({ error: 'Email no encontrado' });

    email.read = true;
    await email.save();

    res.json(email);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Marcar como leído
router.put('/:id/read', async (req, res) => {
  try {
    const email = await Email.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    res.json(email);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Archivar email
router.delete('/:id', async (req, res) => {
  try {
    await Email.findByIdAndUpdate(req.params.id, { archived: true });
    res.json({ message: 'Email archivado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
