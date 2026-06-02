import leadStore from './services/leadStore.js';

class InstagramLeadAgent {
  constructor() {
    this.name = 'Instagram Lead Manager';
  }

  calculateLeadScore(leadData) {
    let score = 0;

    if (leadData.followerCount > 1000) score += 20;
    else if (leadData.followerCount > 500) score += 15;
    else if (leadData.followerCount > 100) score += 10;

    if (leadData.bio && this.hasBusinessIntent(leadData.bio)) {
      score += 25;
    }

    if (leadData.isFollower) score += 15;

    if (leadData.industry && this.isTargetIndustry(leadData.industry)) {
      score += 20;
    }

    return Math.min(score, 100);
  }

  hasBusinessIntent(bio) {
    const keywords = [
      'empresa', 'negocio', 'business', 'tienda', 'shop', 'freelance',
      'consultor', 'agencia', 'diseño', 'marketing', 'digital', 'emprendedor',
      'startup', 'comercio', 'venta', 'marca', 'profesional'
    ];
    return keywords.some(k => bio.toLowerCase().includes(k));
  }

  isTargetIndustry(industry) {
    const target = [
      'diseño', 'marketing', 'e-commerce', 'agencia', 'retail',
      'turismo', 'restaurante', 'belleza', 'fitness', 'negocio'
    ];
    return target.some(i => industry.toLowerCase().includes(i));
  }

  addNewLead(leadData) {
    const existing = leadStore.findByUsername(leadData.instagramUsername);
    if (existing) {
      console.log(`Lead ${leadData.instagramUsername} ya existe`);
      return existing;
    }

    const lead = leadStore.add({
      ...leadData,
      leadScore: this.calculateLeadScore(leadData),
      status: 'new',
      leadQuality: 'cold',
      interactionCount: 0,
      messagesSent: 0,
      messageResponses: 0
    });

    console.log(`✅ Lead ${leadData.instagramUsername} agregado (Puntuación: ${lead.leadScore})`);
    return lead;
  }

  getLeadsByStatus(status, limit = 20) {
    const leads = leadStore.findAll({ status }).slice(0, limit);
    return leads;
  }

  getTopLeads(limit = 10) {
    return leadStore.findAll({ sortBy: 'leadScore' }).slice(0, limit);
  }

  markAsContacted(leadId, messageInfo) {
    const lead = leadStore.findById(leadId);
    if (!lead) throw new Error('Lead no encontrado');

    const updated = leadStore.update(leadId, {
      status: 'contacted',
      lastInteractionDate: new Date().toISOString(),
      messagesSent: lead.messagesSent + 1,
      lastMessage: messageInfo.message,
      lastMessageDate: new Date().toISOString(),
      interactionCount: lead.interactionCount + 1
    });

    console.log(`✅ Lead ${lead.instagramUsername} marcado como contactado`);
    return updated;
  }

  logResponse(leadId, response) {
    const lead = leadStore.findById(leadId);
    if (!lead) throw new Error('Lead no encontrado');

    const updated = leadStore.update(leadId, {
      messageResponses: lead.messageResponses + 1,
      lastInteractionDate: new Date().toISOString(),
      leadQuality: response.isInterested ? 'warm' : 'cold',
      interactionCount: lead.interactionCount + 1
    });

    console.log(`✅ Respuesta registrada para ${lead.instagramUsername}`);
    return updated;
  }

  setReminder(leadId, reminderDate, message) {
    const lead = leadStore.findById(leadId);
    if (!lead) throw new Error('Lead no encontrado');

    const updated = leadStore.update(leadId, {
      reminderDate: new Date(reminderDate).toISOString(),
      reminderMessage: message
    });

    console.log(`✅ Recordatorio establecido para ${lead.instagramUsername}`);
    return updated;
  }

  getUpcomingReminders(daysAhead = 7) {
    const now = new Date();
    const futureDate = new Date(now.getTime() + daysAhead * 24 * 60 * 60 * 1000);

    return leadStore.findAll().filter(l =>
      l.reminderDate &&
      new Date(l.reminderDate) >= now &&
      new Date(l.reminderDate) <= futureDate
    ).sort((a, b) => new Date(a.reminderDate) - new Date(b.reminderDate));
  }

  getLeadStats() {
    return leadStore.getStats();
  }

  getDailyReport() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const allLeads = leadStore.findAll();

    return {
      date: today.toISOString(),
      remindersToday: allLeads.filter(l =>
        l.reminderDate &&
        new Date(l.reminderDate) >= today &&
        new Date(l.reminderDate) < tomorrow
      ),
      newLeadsToday: allLeads.filter(l =>
        new Date(l.createdAt) >= today &&
        new Date(l.createdAt) < tomorrow
      ),
      responses: allLeads.filter(l =>
        l.lastInteractionDate &&
        new Date(l.lastInteractionDate) >= today &&
        new Date(l.lastInteractionDate) < tomorrow
      ),
      stats: this.getLeadStats()
    };
  }

  convertToClient(leadId, clientData) {
    const lead = leadStore.findById(leadId);
    if (!lead) throw new Error('Lead no encontrado');

    const updated = leadStore.update(leadId, {
      convertedToClient: true,
      status: 'converted',
      conversionDate: new Date().toISOString()
    });

    console.log(`✅ Lead convertido a cliente: ${lead.instagramUsername}`);
    return { lead: updated, client: { ...clientData, linkedLead: leadId } };
  }
}

export default new InstagramLeadAgent();
