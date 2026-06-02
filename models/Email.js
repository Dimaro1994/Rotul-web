import mongoose from 'mongoose';

const emailSchema = new mongoose.Schema(
  {
    from: {
      type: String,
      required: true,
      index: true,
    },
    to: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
      index: true,
    },
    text: String,
    html: String,
    category: {
      type: String,
      enum: ['presupuesto', 'contacto', 'soporte', 'otro'],
      default: 'otro',
    },
    processed: {
      type: Boolean,
      default: false,
    },
    responseStatus: {
      type: String,
      enum: ['pending', 'sent', 'failed'],
      default: 'pending',
    },
    aiResponse: String,
    responseError: String,
    whatsappNotified: {
      type: Boolean,
      default: false,
    },
    read: {
      type: Boolean,
      default: false,
    },
    archived: {
      type: Boolean,
      default: false,
    },
    timestamp: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Email', emailSchema);
