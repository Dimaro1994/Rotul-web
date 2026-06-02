import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, '..', 'data');
const leadsFile = path.join(dataDir, 'instagram-leads.json');

// Crear directorio si no existe
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Inicializar archivo si no existe
if (!fs.existsSync(leadsFile)) {
  fs.writeFileSync(leadsFile, JSON.stringify({ leads: [], nextId: 1 }, null, 2));
}

class LeadStore {
  constructor() {
    this.file = leadsFile;
  }

  readData() {
    try {
      const data = fs.readFileSync(this.file, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return { leads: [], nextId: 1 };
    }
  }

  writeData(data) {
    fs.writeFileSync(this.file, JSON.stringify(data, null, 2));
  }

  add(leadData) {
    const data = this.readData();
    const lead = {
      id: data.nextId++,
      ...leadData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    data.leads.push(lead);
    this.writeData(data);
    return lead;
  }

  findById(id) {
    const data = this.readData();
    return data.leads.find(l => l.id === id);
  }

  findByUsername(username) {
    const data = this.readData();
    return data.leads.find(l => l.instagramUsername.toLowerCase() === username.toLowerCase());
  }

  findAll(filters = {}) {
    const data = this.readData();
    let results = data.leads;

    if (filters.status) {
      results = results.filter(l => l.status === filters.status);
    }
    if (filters.leadQuality) {
      results = results.filter(l => l.leadQuality === filters.leadQuality);
    }

    return results.sort((a, b) => (filters.sortBy === 'leadScore' ? b.leadScore - a.leadScore : b.createdAt.localeCompare(a.createdAt)));
  }

  update(id, updates) {
    const data = this.readData();
    const index = data.leads.findIndex(l => l.id === id);
    if (index === -1) return null;

    data.leads[index] = {
      ...data.leads[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    this.writeData(data);
    return data.leads[index];
  }

  delete(id) {
    const data = this.readData();
    data.leads = data.leads.filter(l => l.id !== id);
    this.writeData(data);
  }

  getStats() {
    const data = this.readData();
    const leads = data.leads;

    return {
      total: leads.length,
      converted: leads.filter(l => l.convertedToClient).length,
      byStatus: leads.reduce((acc, l) => {
        acc[l.status] = (acc[l.status] || 0) + 1;
        return acc;
      }, {}),
      byQuality: leads.reduce((acc, l) => {
        acc[l.leadQuality] = (acc[l.leadQuality] || 0) + 1;
        return acc;
      }, {}),
      avgLeadScore: leads.length > 0 ? (leads.reduce((sum, l) => sum + l.leadScore, 0) / leads.length).toFixed(2) : 0
    };
  }
}

export default new LeadStore();
