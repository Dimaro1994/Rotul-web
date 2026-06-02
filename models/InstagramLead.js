import mongoose from 'mongoose';

const instagramLeadSchema = new mongoose.Schema(
  {
    // Datos de Instagram
    instagramUsername: { type: String, required: true, unique: true },
    instagramUserId: { type: String },
    followerCount: { type: Number, default: 0 },
    followingCount: { type: Number, default: 0 },
    isFollowing: { type: Boolean, default: false },
    isFollower: { type: Boolean, default: false },
    profileUrl: { type: String },
    profileImage: { type: String },
    bio: { type: String },

    // Calificación del Lead
    leadScore: { type: Number, default: 0 }, // 0-100
    leadSource: { type: String, enum: ['hashtag', 'location', 'competitor', 'manual', 'follower'], default: 'manual' },
    leadQuality: { type: String, enum: ['cold', 'warm', 'hot'], default: 'cold' },
    industry: { type: String }, // Industria estimada del lead

    // Interacción
    lastInteractionDate: { type: Date },
    interactionCount: { type: Number, default: 0 },
    messagesSent: { type: Number, default: 0 },
    messageResponses: { type: Number, default: 0 },
    lastMessage: { type: String },
    lastMessageDate: { type: Date },

    // Conversión
    convertedToClient: { type: Boolean, default: false },
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
    conversionDate: { type: Date },

    // Notas
    notes: { type: String },
    tags: { type: [String], default: [] }, // ['prospect', 'interested', 'quoted', 'rejected']
    reminderDate: { type: Date },
    reminderMessage: { type: String },

    // Status
    status: {
      type: String,
      enum: ['new', 'contacted', 'interested', 'quoted', 'converted', 'rejected', 'inactive'],
      default: 'new'
    },

    // Timestamps
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Índices para búsquedas rápidas
instagramLeadSchema.index({ instagramUsername: 1 });
instagramLeadSchema.index({ leadScore: -1 });
instagramLeadSchema.index({ status: 1 });
instagramLeadSchema.index({ lastInteractionDate: -1 });

export default mongoose.model('InstagramLead', instagramLeadSchema);
