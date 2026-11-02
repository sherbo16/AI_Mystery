import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  investigationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Investigation', required: true },
  evidenceId: mongoose.Schema.Types.ObjectId,
  content: { type: String, required: true, maxlength: 5000 },
}, { timestamps: true });

export default mongoose.model('Note', noteSchema);
