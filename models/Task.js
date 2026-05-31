import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
    title: { type: String, required: true },
    description: { type: String },
    category: { type: String, enum: ['design', 'development', 'content', 'review', 'revision'] },
    status: { type: String, enum: ['pending', 'in-progress', 'completed', 'blocked'], default: 'pending' },
    priority: { type: String, enum: ['low', 'medium', 'high', 'urgent'], default: 'medium' },
    assignedTo: { type: String },
    dueDate: { type: Date },
    completedAt: { type: Date },
    notes: { type: String },
    attachments: { type: [String], default: [] },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model('Task', taskSchema);
