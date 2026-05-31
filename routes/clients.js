import express from 'express';
import Client from '../models/Client.js';
import Task from '../models/Task.js';
import { notifyNewClient, notifyStatusChange, notifyTaskAssigned } from '../notifications.js';

const router = express.Router();

// ========== CLIENTES ==========

// Obtener todos los clientes
router.get('/clients', async (req, res) => {
  try {
    const clients = await Client.find().sort({ createdAt: -1 });
    res.json(clients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener un cliente específico
router.get('/clients/:id', async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) return res.status(404).json({ error: 'Cliente no encontrado' });
    res.json(client);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear nuevo cliente
router.post('/clients', async (req, res) => {
  try {
    const newClient = new Client(req.body);
    await newClient.save();

    // Enviar notificación por email
    await notifyNewClient(newClient);

    res.status(201).json(newClient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Actualizar cliente
router.put('/clients/:id', async (req, res) => {
  try {
    const client = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!client) return res.status(404).json({ error: 'Cliente no encontrado' });
    res.json(client);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Actualizar progreso de proyecto
router.patch('/clients/:id/progress', async (req, res) => {
  try {
    const { designProgress, developmentProgress } = req.body;
    const client = await Client.findByIdAndUpdate(
      req.params.id,
      { designProgress, developmentProgress, updatedAt: new Date() },
      { new: true }
    );
    res.json(client);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Cambiar estado del proyecto
router.patch('/clients/:id/status', async (req, res) => {
  try {
    const { projectStatus } = req.body;
    const client = await Client.findByIdAndUpdate(
      req.params.id,
      { projectStatus, updatedAt: new Date() },
      { new: true }
    );

    // Enviar notificación por email
    if (client && ['in-progress', 'review', 'completed'].includes(projectStatus)) {
      await notifyStatusChange(client, projectStatus);
    }

    res.json(client);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar cliente
router.delete('/clients/:id', async (req, res) => {
  try {
    await Client.findByIdAndDelete(req.params.id);
    await Task.deleteMany({ clientId: req.params.id });
    res.json({ message: 'Cliente eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ========== TAREAS ==========

// Obtener tareas de un cliente
router.get('/clients/:clientId/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({ clientId: req.params.clientId }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear tarea
router.post('/clients/:clientId/tasks', async (req, res) => {
  try {
    const task = new Task({ ...req.body, clientId: req.params.clientId });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Actualizar tarea
router.put('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar tarea
router.delete('/tasks/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Tarea eliminada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ========== ESTADÍSTICAS ==========

// Dashboard stats
router.get('/dashboard/stats', async (req, res) => {
  try {
    const totalClients = await Client.countDocuments();
    const clientsInProgress = await Client.countDocuments({ projectStatus: 'in-progress' });
    const clientsCompleted = await Client.countDocuments({ projectStatus: 'completed' });
    const totalBudget = await Client.aggregate([
      { $group: { _id: null, total: { $sum: '$budget' } } },
    ]);

    res.json({
      totalClients,
      clientsInProgress,
      clientsCompleted,
      totalBudget: totalBudget[0]?.total || 0,
      pendingPayments: await Client.countDocuments({ paymentStatus: { $ne: 'completed' } }),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
