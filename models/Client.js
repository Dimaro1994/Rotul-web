import mongoose from 'mongoose';

const clientSchema = new mongoose.Schema(
  {
    // Información básica
    companyName: { type: String, required: true },
    contactName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },

    // Proyecto
    projectType: { type: String, required: true }, // 'website', 'design', 'both'
    projectDescription: { type: String },
    targetAudience: { type: String },

    // Diseño
    colorPreferences: { type: String },
    designStyle: { type: String }, // 'minimalist', 'professional', 'creative', 'corporate', 'modern'
    brandElements: { type: String },
    logo: { type: String }, // URL de logo si tienen

    // Funcionalidades
    requiredFeatures: { type: [String], default: [] }, // e-commerce, blog, formulario, etc
    integrations: { type: [String], default: [] }, // redes sociales, stripe, etc

    // Contenido
    pages: { type: [String], default: [] }, // inicio, servicios, contacto, etc
    content: { type: String }, // contenido a incluir

    // Técnico
    domain: { type: String },
    hosting: { type: String },

    // Comercial
    budget: { type: Number },
    deadline: { type: Date },
    paymentStatus: { type: String, enum: ['pending', 'partial', 'completed'], default: 'pending' },

    // Proyecto
    projectStatus: { type: String, enum: ['new', 'in-progress', 'review', 'completed'], default: 'new' },
    designProgress: { type: Number, default: 0 }, // 0-100%
    developmentProgress: { type: Number, default: 0 }, // 0-100%

    // Comunicación
    preferredContact: { type: String, enum: ['email', 'whatsapp', 'phone'], default: 'email' },
    notes: { type: String },
    attachments: { type: [String], default: [] },

    // Asignación
    assignedTo: { type: String }, // nombre del diseñador/desarrollador

    // Timestamps
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model('Client', clientSchema);
