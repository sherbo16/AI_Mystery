import mongoose from 'mongoose';

const accusationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  investigationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Investigation', required: true },
  selectedSuspectId: { type: mongoose.Schema.Types.ObjectId, required: true },
  reasoning: { type: String, maxlength: 5000 },
  isCorrect: Boolean, actualCulpritId: mongoose.Schema.Types.ObjectId,
  submittedAt: { type: Date, default: Date.now },
}, { timestamps: true });
accusationSchema.index({ userId: 1, investigationId: 1 }, { unique: true });
export default mongoose.model('Accusation', accusationSchema);
